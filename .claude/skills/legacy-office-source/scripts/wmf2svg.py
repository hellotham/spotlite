#!/usr/bin/env python3
"""Convert a Windows Metafile to SVG.

Word cached a WMF rendering of each embedded OLE object so it could draw the figure without
launching the application that owned it. Nothing on macOS reads WMF, so this walks the
metafile's GDI records directly and writes the equivalent SVG: real paths and real text.

Only the records these documents actually use are implemented. Anything else is counted and
reported on stderr rather than skipped silently, because the failure mode that matters here is
a picture that comes out plausible and wrong. See references/wmf-traps.md.

    wmf2svg.py figure.wmf [alt text] > figure.svg
"""

import collections
import math
import re
import struct
import sys

# Records present in these files. Names from the MS-WMF record enumeration.
EOF, SAVEDC, RESTOREDC = 0x0000, 0x001E, 0x0127
SETBKMODE, SETMAPMODE, SETROP2, SETPOLYFILLMODE = 0x0102, 0x0103, 0x0104, 0x0106
SETSTRETCHBLTMODE, SELECTOBJECT, SETTEXTALIGN = 0x0107, 0x012D, 0x012E
SETBKCOLOR, SETTEXTCOLOR, SETTEXTJUSTIFICATION = 0x0201, 0x0209, 0x020A
SETWINDOWORG, SETWINDOWEXT = 0x020B, 0x020C
LINETO, MOVETO = 0x0213, 0x0214
SELECTPALETTE, REALIZEPALETTE, CREATEPALETTE = 0x0234, 0x0035, 0x00F7
DELETEOBJECT = 0x01F0
CREATEPENINDIRECT, CREATEFONTINDIRECT, CREATEBRUSHINDIRECT = 0x02FA, 0x02FB, 0x02FC
POLYGON, POLYLINE, ESCAPE = 0x0324, 0x0325, 0x0626
ELLIPSE, RECTANGLE, ROUNDRECT = 0x0418, 0x041B, 0x061C
POLYPOLYGON, EXTTEXTOUT, TEXTOUT = 0x0538, 0x0A32, 0x0521
EXCLUDECLIPRECT, INTERSECTCLIPRECT = 0x0415, 0x0416
PIE = 0x081A

# Ignorable for a static drawing: palette handling, raster/clip modes, printer escapes.
IGNORE = {SETMAPMODE, SETROP2, SETSTRETCHBLTMODE, SETBKCOLOR, SETTEXTJUSTIFICATION,
          SELECTPALETTE, REALIZEPALETTE, ESCAPE,
          # Subtracting a rect from the clip has no direct SVG equivalent; these 12 punch
          # holes that only matter for overlap, so leaving them in is safer than guessing.
          EXCLUDECLIPRECT}

PS_DASH = {1: '4,3', 2: '1,3', 3: '4,3,1,3', 4: '4,3,1,3,1,3'}


def colour(v):
    return '#%02x%02x%02x' % (v & 0xFF, (v >> 8) & 0xFF, (v >> 16) & 0xFF)


def esc(s):
    return (s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
             .replace('"', '&quot;'))


class Pen:
    def __init__(self, style, width, col):
        self.style, self.width, self.colour = style & 0xF, max(width, 1), colour(col)

    def stroke(self, sx):
        if self.style == 5:                      # PS_NULL
            return 'stroke:none'
        w = max(self.width * sx, 0.9)
        d = PS_DASH.get(self.style)
        return (f'stroke:{self.colour};stroke-width:{w:.2f}'
                + (f';stroke-dasharray:{d}' if d else ''))


class Brush:
    def __init__(self, style, col, hatch):
        self.style, self.colour, self.hatch = style, colour(col), hatch

    def fill(self):
        return 'fill:none' if self.style == 1 else f'fill:{self.colour}'   # BS_NULL


class Font:
    def __init__(self, height, weight, italic, underline, face, esc=0):
        self.height, self.weight = abs(height), weight
        self.italic, self.underline, self.face = italic, underline, face
        # lfEscapement, tenths of a degree. MS Graph sets 2700 on the vertical axis titles.
        # Ignored, the title is drawn horizontally at the anchor and then almost entirely
        # removed by the narrow clip strip MS Graph sets around it -- the label simply is not
        # in the picture, and nothing errors.
        self.esc = esc


class Converter:
    def __init__(self, data):
        self.d = data
        self.objects = []
        self.pen = Pen(0, 1, 0)
        self.brush = Brush(1, 0xFFFFFF, 0)
        self.font = Font(-200, 400, 0, 0, 'Helvetica')
        self.textcol, self.bkmode, self.align = '#000000', 2, 0
        self.pos = (0, 0)
        self.org, self.ext = (0, 0), (1000, 1000)
        # MS Graph writes an inverted window: windowExt y is negative, so logical y grows
        # UPWARD. Read literally, every chart comes out mirrored top-to-bottom -- axis labels
        # descending, bars hanging off the wrong side -- with no error and a plausible picture.
        # fbase maps logical y to SVG's y-down space:  y_svg = 2*orgY + extY - y_logical.
        self.fbase = None
        self.polyfill = 1
        self.clip = None      # (x0, y0, x1, y1) in logical units
        self.stack = []
        self.items = []                          # (svg element, (x0, y0, x1, y1))
        self.unhandled = collections.Counter()

    def emit(self, el, xs, ys):
        self.items.append((el, (min(xs), min(ys), max(xs), max(ys)), self.clip))

    @property
    def out(self):
        raise AssertionError('use emit(), so every element records its bounds')

    # -- object table -------------------------------------------------------
    def add(self, obj):
        for i, o in enumerate(self.objects):
            if o is None:
                self.objects[i] = obj
                return
        self.objects.append(obj)

    def select(self, i):
        if 0 <= i < len(self.objects):
            o = self.objects[i]
            if isinstance(o, Pen):
                self.pen = o
            elif isinstance(o, Brush):
                self.brush = o
            elif isinstance(o, Font):
                self.font = o

    # -- geometry -----------------------------------------------------------
    def style(self, filled=True):
        s = self.pen.stroke(1.0)
        return (self.brush.fill() + ';' + s) if filled else ('fill:none;' + s)

    def poly(self, pts, closed, filled=True):
        if len(pts) < 2:
            return
        d = 'M' + ' L'.join(f'{x},{y}' for x, y in pts) + (' Z' if closed else '')
        rule = ';fill-rule:evenodd' if (filled and self.polyfill == 0) else ''
        self.emit(f'<path d="{d}" style="{self.style(filled)}{rule}"/>',
                  [x for x, _ in pts], [y for _, y in pts])

    # -- main loop ----------------------------------------------------------
    def run(self):
        d = self.d
        p = 18
        while p + 6 <= len(d):
            size, func = struct.unpack_from('<IH', d, p)
            if size < 3:
                break
            a = p + 6                              # first parameter word
            n = (size - 3)                         # parameter count, in words
            self.record(func, a, n)
            if func == EOF:
                break
            p += size * 2
        return self

    def fy(self, v):
        return v if self.fbase is None else self.fbase - v

    def setwin(self):
        self.fbase = (2 * self.org[1] + self.ext[1]) if self.ext[1] < 0 else None

    def w(self, a, i):
        return struct.unpack_from('<h', self.d, a + i * 2)[0]

    def dw(self, a, i):
        return struct.unpack_from('<I', self.d, a + i * 2)[0]

    def record(self, func, a, n):
        if func in IGNORE or func == EOF or func == SAVEDC and False:
            return
        if func == SETWINDOWORG:
            self.org = (self.w(a, 1), self.w(a, 0))
            self.setwin()
        elif func == SETWINDOWEXT:
            self.ext = (self.w(a, 1), self.w(a, 0))
            self.setwin()
        elif func == SETBKMODE:
            self.bkmode = self.w(a, 0)
        elif func == SETPOLYFILLMODE:
            self.polyfill = self.w(a, 0)
        elif func == SETTEXTCOLOR:
            self.textcol = colour(self.dw(a, 0))
        elif func == SETTEXTALIGN:
            self.align = self.w(a, 0)
        elif func == INTERSECTCLIPRECT:
            b, r, t, l = (self.w(a, i) for i in range(4))
            b, t = self.fy(b), self.fy(t)
            n_ = (min(l, r), min(t, b), max(l, r), max(t, b))
            c = self.clip
            self.clip = n_ if c is None else (max(c[0], n_[0]), max(c[1], n_[1]),
                                              min(c[2], n_[2]), min(c[3], n_[3]))
        elif func == SAVEDC:
            self.stack.append((self.pen, self.brush, self.font, self.textcol,
                               self.align, self.bkmode, self.polyfill, self.clip))
        elif func == RESTOREDC:
            if self.stack:
                (self.pen, self.brush, self.font, self.textcol,
                 self.align, self.bkmode, self.polyfill, self.clip) = self.stack.pop()
        elif func == CREATEPALETTE:
            # Nothing to draw, but it still consumes an object-table slot. Skipping it
            # shifts every later SELECTOBJECT index by one, which silently swaps the brushes
            # and pens for the rest of the picture.
            self.add(object())
        elif func == CREATEPENINDIRECT:
            self.add(Pen(self.w(a, 0), self.w(a, 1), self.dw(a, 3)))
        elif func == CREATEBRUSHINDIRECT:
            self.add(Brush(self.w(a, 0), self.dw(a, 1), self.w(a, 3)))
        elif func == CREATEFONTINDIRECT:
            face = self.d[a + 18: a + 18 + 32].split(b'\0')[0].decode('latin-1')
            flags = struct.unpack_from('<BBB', self.d, a + 10)
            self.add(Font(self.w(a, 0), self.w(a, 4), flags[0], flags[1],
                          face or 'Helvetica', self.w(a, 2)))
        elif func == SELECTOBJECT:
            self.select(self.w(a, 0))
        elif func == DELETEOBJECT:
            i = self.w(a, 0)
            if 0 <= i < len(self.objects):
                self.objects[i] = None
        elif func == MOVETO:
            self.pos = (self.w(a, 1), self.fy(self.w(a, 0)))
        elif func == LINETO:
            x, y = self.w(a, 1), self.fy(self.w(a, 0))
            self.emit(f'<path d="M{self.pos[0]},{self.pos[1]} L{x},{y}" '
                      f'style="fill:none;{self.pen.stroke(1.0)}"/>',
                      [self.pos[0], x], [self.pos[1], y])
            self.pos = (x, y)
        elif func == RECTANGLE:
            b, r, t, l = (self.w(a, i) for i in range(4))
            b, t = self.fy(b), self.fy(t)
            self.emit(f'<rect x="{min(l,r)}" y="{min(t,b)}" width="{abs(r-l)}" '
                      f'height="{abs(b-t)}" style="{self.style()}"/>', [l, r], [t, b])
        elif func == ROUNDRECT:
            eh, ew, b, r, t, l = (self.w(a, i) for i in range(6))
            b, t = self.fy(b), self.fy(t)
            self.emit(f'<rect x="{min(l,r)}" y="{min(t,b)}" width="{abs(r-l)}" '
                      f'height="{abs(b-t)}" rx="{abs(ew)//2}" ry="{abs(eh)//2}" '
                      f'style="{self.style()}"/>', [l, r], [t, b])
        elif func == ELLIPSE:
            b, r, t, l = (self.w(a, i) for i in range(4))
            b, t = self.fy(b), self.fy(t)
            self.emit(f'<ellipse cx="{(l+r)/2}" cy="{(t+b)/2}" rx="{abs(r-l)/2}" '
                      f'ry="{abs(b-t)/2}" style="{self.style()}"/>', [l, r], [t, b])
        elif func in (POLYGON, POLYLINE):
            cnt = self.w(a, 0)
            pts = [(self.w(a, 1 + 2 * i), self.fy(self.w(a, 2 + 2 * i)))
                   for i in range(cnt)]
            self.poly(pts, func == POLYGON, func == POLYGON)
        elif func == POLYPOLYGON:
            npoly = self.w(a, 0)
            counts = [self.w(a, 1 + i) for i in range(npoly)]
            o = 1 + npoly
            segs = []
            for c in counts:
                pts = [(self.w(a, o + 2 * i), self.fy(self.w(a, o + 1 + 2 * i)))
                       for i in range(c)]
                o += 2 * c
                if len(pts) > 1:
                    segs.append('M' + ' L'.join(f'{x},{y}' for x, y in pts) + ' Z')
            if segs:
                allpts = [tuple(map(float, q.split(','))) for seg in segs
                          for q in re.findall(r'-?[\d.]+,-?[\d.]+', seg)]
                self.emit(f'<path d="{" ".join(segs)}" '
                          f'style="{self.style()};fill-rule:evenodd"/>',
                          [q[0] for q in allpts], [q[1] for q in allpts])
        elif func == PIE:
            # yRadial2, xRadial2, yRadial1, xRadial1, bottom, right, top, left
            y2, x2, y1, x1, b, r, t, l = (self.w(a, i) for i in range(8))
            y2, y1, b, t = self.fy(y2), self.fy(y1), self.fy(b), self.fy(t)
            cx, cy, rx, ry = (l + r) / 2, (t + b) / 2, abs(r - l) / 2, abs(b - t) / 2
            def on_arc(px, py):
                ang = math.atan2(py - cy, px - cx)
                return cx + rx * math.cos(ang), cy + ry * math.sin(ang)
            ax, ay = on_arc(x1, y1)
            bx, by = on_arc(x2, y2)
            # GDI sweeps counter-clockwise from radial 1 to radial 2; y grows downward here,
            # so that is the sweep-flag 0 direction in SVG's coordinate system.
            a1 = math.atan2(ay - cy, ax - cx)
            a2 = math.atan2(by - cy, bx - cx)
            large = 1 if ((a1 - a2) % (2 * math.pi)) > math.pi else 0
            sweep = 0 if self.fbase is None else 1     # a flipped window reverses the sweep
            self.emit(
                f'<path d="M{cx:.1f},{cy:.1f} L{ax:.1f},{ay:.1f} '
                f'A{rx:.1f},{ry:.1f} 0 {large} {sweep} {bx:.1f},{by:.1f} Z" '
                f'style="{self.style()}"/>', [l, r], [t, b])
        elif func in (EXTTEXTOUT, TEXTOUT):
            self.text(func, a, n)
        else:
            self.unhandled[func] += 1

    def text(self, func, a, n):
        if func == TEXTOUT:
            ln = self.w(a, 0)
            s = self.d[a + 2: a + 2 + ln]
            y, x = self.fy(self.w(a, 1 + (ln + 1) // 2)), self.w(a, 2 + (ln + 1) // 2)
        else:
            y, x, ln, flags = (self.fy(self.w(a, 0)), self.w(a, 1),
                               self.w(a, 2), self.w(a, 3))
            off = 4 + (4 if (flags & 0x0006) else 0)     # ETO_OPAQUE/ETO_CLIPPED add a rect
            s = self.d[a + off * 2: a + off * 2 + ln]
        txt = s.decode('latin-1').replace('\r', ' ').replace('\n', ' ').rstrip('\0')
        if not txt.strip():
            return
        anchor = {0: 'start', 2: 'end', 6: 'middle'}.get(self.align & 6, 'start')
        va = self.align & 24
        # TA_TOP means the y given is the top of the cell, not the baseline.
        dy = f' dy="{self.font.height * 0.78:.0f}"' if va == 0 else ''
        f = self.font
        st = (f'font-family:&quot;{esc(f.face)}&quot;,Helvetica,sans-serif;'
              f'font-size:{f.height}px;fill:{self.textcol}')
        if f.weight >= 600:
            st += ';font-weight:bold'
        if f.italic:
            st += ';font-style:italic'
        if f.underline:
            st += ';text-decoration:underline'
        # Width is estimated: 0.5 em per character is close for the proportional faces here,
        # and only the crop depends on it.
        wid = 0.5 * f.height * len(txt)
        x0 = {'start': x, 'middle': x - wid / 2, 'end': x - wid}[anchor]
        top = y if va == 0 else y - f.height * 0.78
        rot = ''
        bx, by = [x0, x0 + wid], [top, top + f.height]
        if f.esc:
            # Escapement is measured against the device, so the window flip does not mirror
            # it: a flipped window turns 2700 into SVG's rotate(270) == 90 degrees anti-
            # clockwise, which is the bottom-to-top axis title the GIF exports show.
            ang = (f.esc / 10.0) if self.fbase is not None else (-f.esc / 10.0)
            rot = f' transform="rotate({ang:.1f} {x} {y})"'
            r = math.radians(ang)
            cs, sn = math.cos(r), math.sin(r)
            pts = [(px - x, py - y) for px in bx for py in by]
            bx = [x + px * cs - py * sn for px, py in pts]
            by = [y + px * sn + py * cs for px, py in pts]
        self.emit(f'<text x="{x}" y="{y}"{dy} text-anchor="{anchor}"{rot} '
                  f'style="{st}">{esc(txt)}</text>', bx, by)

    def svg(self, title=''):
        ox, oy = self.org
        ew, eh = self.ext

        # The metafile covers the whole PowerPoint slide, but the drawing occupies a corner of
        # it and the 1994 GIF exports were cropped to the drawing. Crop the same way, and drop
        # any element that spans essentially the whole slide: that is the object frame
        # PowerPoint draws round the embedded object, which the GIF exports do not show.
        # Shapes run past the window — the arrows in figure 1 are drawn far longer than the
        # slide and GDI clipped them at its edge, which is why they meet the border in the
        # 1994 exports. Clip the same way, and let nothing outside the window widen the crop.
        wx0, wy0 = min(ox, ox + ew), min(oy, oy + eh)
        wx1, wy1 = max(ox, ox + ew), max(oy, oy + eh)
        clamp = lambda v, lo, hi: max(lo, min(hi, v))

        clips, keep, xs, ys = {}, [], [], []
        for el, (x0, y0, x1, y1), clip in self.items:
            if (x1 - x0) >= 0.98 * abs(ew) and (y1 - y0) >= 0.98 * abs(eh) and clip is None:
                continue
            # An element only reaches as far as its clip does.
            cx0, cy0, cx1, cy1 = clip if clip else (wx0, wy0, wx1, wy1)
            x0, y0 = max(x0, cx0), max(y0, cy0)
            x1, y1 = min(x1, cx1), min(y1, cy1)
            # Strict, not <=: a horizontal or vertical line has zero extent on one axis and
            # is perfectly visible. Testing <= here silently deleted every straight line in
            # the drawing, the arrow shafts among them.
            if x1 < x0 or y1 < y0:
                continue                                   # clipped away entirely
            # Runs of elements sharing a clip go in one group rather than one each.
            if clip:
                cid = clips.setdefault(clip, f'c{len(clips)}')
                if keep and keep[-1][0] == cid:
                    keep[-1][1].append(el)
                else:
                    keep.append((cid, [el]))
            elif keep and keep[-1][0] is None:
                keep[-1][1].append(el)
            else:
                keep.append((None, [el]))
            xs += [clamp(x0, wx0, wx1), clamp(x1, wx0, wx1)]
            ys += [clamp(y0, wy0, wy1), clamp(y1, wy0, wy1)]
        if not xs:
            xs, ys = [wx0, wx1], [wy0, wy1]

        pad = max(max(xs) - min(xs), max(ys) - min(ys)) * 0.02
        vx, vy = max(min(xs) - pad, wx0), max(min(ys) - pad, wy0)
        vw = min(max(xs) + pad, wx1) - vx
        vh = min(max(ys) + pad, wy1) - vy
        head = (f'<svg xmlns="http://www.w3.org/2000/svg" '
                f'viewBox="{vx:.0f} {vy:.0f} {vw:.0f} {vh:.0f}" '
                f'role="img" aria-label="{esc(title)}">')
        defs = [f'<clipPath id="w"><rect x="{wx0}" y="{wy0}" '
                f'width="{wx1 - wx0}" height="{wy1 - wy0}"/></clipPath>']
        for (a0, b0, a1, b1), cid in clips.items():
            defs.append(f'<clipPath id="{cid}"><rect x="{a0}" y="{b0}" '
                        f'width="{a1 - a0}" height="{b1 - b0}"/></clipPath>')
        body = []
        for cid, els in keep:
            body.append('\n'.join(els) if cid is None
                        else f'<g clip-path="url(#{cid})">' + ''.join(els) + '</g>')
        return (head + '\n<defs>' + ''.join(defs) + '</defs>\n<g clip-path="url(#w)">\n'
                + '\n'.join(body) + '\n</g>\n</svg>\n')


if __name__ == '__main__':
    c = Converter(open(sys.argv[1], 'rb').read()).run()
    if c.unhandled:
        print('UNHANDLED: ' + ', '.join(f'0x{k:04X}x{v}' for k, v in c.unhandled.items()),
              file=sys.stderr)
    sys.stdout.write(c.svg(sys.argv[2] if len(sys.argv) > 2 else ''))
