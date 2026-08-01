# Traps in metafile and LibreOffice conversion

Read this when a converted figure comes out _nearly_ right. Every entry below is something that
happened while converting a real PowerPoint 4.0 deck, and each produced a picture that looked reasonable
enough to ship while being wrong. None of them raised an error.

## Contents

- [Windows Metafile, via wmf2svg.py](#windows-metafile)
- [LibreOffice's presentation SVG](#libreoffices-presentation-svg)
- [Checking a figure honestly](#checking-a-figure-honestly)

---

## Windows Metafile

### Every object-creating record consumes a table slot, including ones that draw nothing

`SELECTOBJECT` indexes a table that grows as objects are created. `CREATEPALETTE` draws nothing,
so it is tempting to ignore it — but it still takes a slot. Ignoring it shifts every later index
by one, and the picture comes out with the brushes and pens swapped from that point on.

The symptom was subtle: grey bars lost their fill, so their white labels vanished against white,
and four of five arrows lost their colour. Text was all present in the file. Nothing errored.

Anything in the create family (`CREATEPENINDIRECT`, `CREATEBRUSHINDIRECT`, `CREATEFONTINDIRECT`,
`CREATEPALETTE`, `CREATEREGION`, `DIBCREATEPATTERNBRUSH`) must occupy a slot even when unhandled.
Push a placeholder.

### `DELETEOBJECT` frees a slot that the next creation reuses

The lowest free index is reused, so the table is not append-only. Track holes.

### A negative window extent mirrors the whole picture

Charts embedded from Microsoft Graph declare a **negative** y extent in `SETWINDOWEXT`, meaning
logical y grows upward rather than down. Read literally, the whole chart is mirrored top to
bottom: the axis labels descend, the bars hang off the wrong side of the axis, and the picture is
entirely plausible if you have not seen the original. Nothing errors.

Map logical y into SVG's y-down space when the extent is negative, and leave it alone when it is
not:

```python
fbase = (2 * orgY + extY) if extY < 0 else None      # recompute on every SETWINDOWORG/EXT
y_svg = y_logical if fbase is None else fbase - y_logical
```

Clip rectangles need the same treatment, or the flipped drawing is clipped by unflipped
rectangles and pieces disappear.

This is worth checking for explicitly, because a document can hold both kinds at once. In the
AUUG'93 paper ten of the eleven figures are MS Graph charts with inverted windows, and the
eleventh, a logo pasted from PowerPoint, has a normal one. A converter that assumes either
convention gets ten right and one wrong, or the reverse.

Nor is it a charting habit. The AUUG'94 manuscript holds one inverted picture among eight, and it
is a pasted architecture diagram containing no chart at all — that document has no MS Graph object
anywhere in it. Test the extent, never the producing application. A mirrored picture is also easy
to write off as an unusable cache when it is nothing of the sort, which cost that figure a
publication cycle as a slide-derived substitute.

### Rotated text needs `lfEscapement`, and MS Graph clips what it rotates

`CREATEFONTINDIRECT` carries `lfEscapement` in tenths of a degree; MS Graph sets 2700 on vertical
axis titles. Ignore it and the title is drawn horizontally at its anchor point, where MS Graph's
narrow clip strip around the axis then removes almost all of it. The label does not appear as
rotated-wrongly, it simply is not in the picture.

### Clipping is what makes arrows the right length

These decks draw an arrow as a long shaft plus a head and clip the shaft. Ignore
`INTERSECTCLIPRECT` and shafts run the full height of the slide. Honour it and the drawing snaps
into place.

The clip is part of the device context, so `SAVEDC` and `RESTOREDC` must save and restore it
along with pen, brush, font and text colour.

### A clipped straight line has zero extent on one axis

Testing whether an element survives clipping with `x1 <= x0 || y1 <= y0` deletes every
axis-aligned line, since a vertical line has zero width by definition. That removed 117 elements
including both arrow shafts. Use strict `<`.

### The window is the canvas, and shapes run past it

Content is routinely drawn outside the window; GDI clips it at the edge, which is why arrows
meet the border in the original exports. Clip to the window and let nothing outside it widen the
crop, or the figure acquires a large empty margin.

A shape covering essentially the whole window with no fill is the object frame, not content.
Drop it before computing the crop.

### Coordinate order is reversed

`RECTANGLE`, `ELLIPSE` and `INTERSECTCLIPRECT` take **bottom, right, top, left**. Reading them as
left, top, right, bottom yields rectangles that are plausible but transposed.

### Colours are `COLORREF`, not RGB

`0x00BBGGRR`. Blue and red swap if read the other way round, which is easy to miss on a greyscale
figure and obvious on a coloured one.

### Text alignment decides what the y coordinate means

`SETTEXTALIGN` selects whether y is the baseline or the top of the cell. Getting it wrong shifts
every label by about one line height — enough to look like a font problem rather than a
positioning one.

### Emphasis around punctuation is export noise

A lone italicised full stop is a Word artefact, not authorial intent. Dropping emphasis whose
content has no alphanumerics avoids emitting meaningless markup.

---

## LibreOffice's presentation SVG

### The slide is hidden by its ancestors

Each slide sits inside `<g visibility="hidden"><g id="container-idN">`. Clearing visibility on
the slide alone leaves it hidden and the extracted file renders blank. Walk up to the root.

### The text wrapper is `TextShape`, not `com.sun.star.drawing.TextShape`

Drawn shapes use the `com.sun.star.*` class names; text shapes do not. A selector matching only
the former removes nothing, and a counter that logs matches rather than removals will report
success anyway. Count what is actually detached.

### The export carries every slide's definitions

Clip paths and gradients for all slides ride along in each extracted figure. Stripping the
unreferenced ones took a figure from 252 KB to 25 KB with no visual change. Iterate, since
removing one definition can orphan another.

### libmwaw's import drops text rotation

Vertical labels arrive horizontal, lying across the middle of the diagram. Confirmed by exporting
PDF as well and finding no rotated text matrices there either, which places the fault in the
import rather than the SVG writer — so no choice of output format avoids it.

### libmwaw re-wraps text to LibreOffice's metrics

Words break mid-way where the original fitted on one line. The wrap is baked in as two
positioned tspans, so it cannot be undone by styling; rebuild the text element.

### Modern PowerPoint fails silently on PowerPoint 4.0

The AppleScript `open` returns with zero presentations rather than raising an error. A test that
only checks for an exception will report success.

---

## Checking a figure honestly

The raster you are replacing is the authority. Compare against it deliberately rather than by
glancing:

- **Palette.** A GIF's colour table is a short list; read it directly and compare with the fill
  colours in the SVG. That is how the three separate colourings of these diagrams were found —
  and it distinguishes a conversion bug from a genuinely different revision of the artwork.
- **Element counts.** Count text runs in the source and `<text>` elements in the output. Equal
  counts with something visually missing points at fill or colour, not at loss.
- **Zero text runs can be correct.** Some metafiles draw their lettering as filled outlines rather
  than as `TEXTOUT`, so the file carries no text record and no `CREATEFONTINDIRECT` at all. The
  two figure 4s here differ on exactly this: the OpenWorld cache sets 16 text runs, the AUUG'94
  cache outlines the same labels into polygons. Count the source's text records before reading an
  empty `<text>` count as catastrophic loss — and compare fills against the **brush colours the
  metafile declares**, not against the replaced raster's table, which may come from another
  revision of the artwork with a finer shading ramp.
- **Both sides of every boundary.** For text flow, check that the words either side of each
  figure survive; alt text sitting between them will otherwise read as a loss in any coverage
  test.
- **Not the authority on aspect ratio.** A batch export usually sits on one fixed canvas — all
  four AUUG'94 GIFs are 480x360, an aspect matching none of the four figures. Word writes a `PICF`
  header immediately before each picture whose `xExt`/`yExt` give the printed size, and on every
  figure here its ratio matches the metafile window to five decimal places. Trust that pair, and
  do not "correct" a near-square figure standing among landscape ones.

When a checker and a picture disagree, suspect the checker first. In practice it has been wrong
more often than the conversion — a contrast audit once reported callout titles at 1.02:1,
which would have meant invisible text on a page that plainly rendered, and the fault was the
audit dropping the alpha channel on a translucent background.
