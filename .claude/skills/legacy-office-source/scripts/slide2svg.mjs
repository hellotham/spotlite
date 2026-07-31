// Pull one slide out of LibreOffice's presentation SVG as a standalone figure.
//
// `soffice --convert-to svg` on a deck emits every slide into a single file, wrapped in
// visibility toggles and a navigation script, carrying the clip paths and gradients for all
// slides at once. A figure taken from it needs the other slides removed, its own ancestors
// un-hidden, a crop to its content, and the unreferenced definitions stripped — which is most
// of the bytes: one figure went from 252 KB to 25 KB on that step alone.
//
// The work happens in a real browser so that getBBox() reports honest geometry with clip paths
// and transforms resolved. It needs `puppeteer` resolvable, so run it from a directory where
// that is installed, or point NODE_PATH at one.
//
//   node slide2svg.mjs deck.svg id24 figure-4.svg
//   node slide2svg.mjs deck.svg id24 figure-4.svg --drop "OSF Distributed,Great white hope"
//   node slide2svg.mjs deck.svg id24 figure-4.svg --rotate "Security,Management"
//   node slide2svg.mjs deck.svg --list
//
// --drop removes text shapes whose content contains any of the given phrases. A slide's title
// and bullets are presentation furniture; a paper prints the diagram alone.
//
// --rotate turns the named labels back upright. libmwaw's PowerPoint import does not carry
// text rotation, so vertical labels arrive lying flat across the diagram. Whatever raster you
// are replacing is the authority for which labels those are.

import puppeteer from 'puppeteer'
import { readFileSync, writeFileSync } from 'fs'

const args = process.argv.slice(2)
const flag = (name) => {
  const i = args.indexOf(name)
  return i === -1 ? null : args[i + 1]
}
const [src, slideId, out] = args.filter(
  (a, i) => !a.startsWith('--') && (i === 0 || !args[i - 1].startsWith('--'))
)
const drop = (flag('--drop') || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)
const rotate = (flag('--rotate') || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)
const listOnly = args.includes('--list')

if (!src) {
  console.error(
    'usage: slide2svg.mjs <deck.svg> <slide-id> <out.svg> [--drop "a,b"] [--rotate "a,b"]'
  )
  process.exit(1)
}

const browser = await puppeteer.launch({
  headless: 'shell',
  args: ['--disable-gpu', '--no-sandbox']
})
const page = await browser.newPage()
await page.setViewport({ width: 1200, height: 900 })
await page.setContent(
  `<body style="margin:0;background:#fff">${readFileSync(src, 'utf8').replace(/<\?xml[^>]*\?>\s*/, '')}</body>`,
  { waitUntil: 'load' }
)

if (listOnly) {
  const slides = await page.evaluate(() =>
    [...document.querySelectorAll('g.Slide')].map((g) => ({
      id: g.id,
      // Each run appears in three nested tspans, so take only the innermost and drop
      // consecutive repeats; otherwise every title is listed three times over.
      text: [...g.querySelectorAll('tspan:not(:has(tspan))')]
        .map((t) => t.textContent.trim())
        .filter(Boolean)
        .filter((s, i, a) => s !== a[i - 1])
        .slice(0, 6)
        .join(' | ')
        .slice(0, 90)
    }))
  )
  for (const s of slides) console.log(`${s.id.padEnd(8)} ${s.text}`)
  await browser.close()
  process.exit(0)
}

const result = await page.evaluate(
  (id, dropList, rotateList) => {
    const root = document.querySelector('svg')
    root.querySelectorAll('script').forEach((n) => n.remove())
    root.querySelectorAll('g.Slide').forEach((g) => {
      if (g.id !== id) g.remove()
    })
    root.querySelectorAll('[id^="ooo:meta"]').forEach((n) => n.remove())

    const slide = root.querySelector('g.Slide')
    if (!slide) return { error: `slide ${id} not found` }

    // The slide sits inside <g visibility="hidden"><g id="container-..">, so clearing visibility
    // on the slide alone leaves it hidden by its own ancestors and the file renders blank.
    for (let n = slide; n && n !== root.parentNode; n = n.parentNode) {
      if (n.removeAttribute) n.removeAttribute('visibility')
    }
    root.querySelectorAll('g[id^="container-"]').forEach((g) => {
      if (!g.querySelector('g.Slide')) g.remove()
    })

    // The wrapper is class="TextShape", not the com.sun.star.* form used for drawn shapes;
    // matching only the latter silently removes nothing.
    const dropped = []
    for (const t of [...root.querySelectorAll('text')]) {
      const s = t.textContent.replace(/\s+/g, ' ').trim()
      if (!dropList.some((d) => s.includes(d))) continue
      const g = t.closest('g.TextShape, g[class^="com.sun.star"]')
      if (g) {
        g.remove()
        dropped.push(s.slice(0, 40))
      }
    }

    const rotated = []
    for (const t of [...root.querySelectorAll('text')]) {
      if (!rotateList.includes(t.textContent.trim())) continue
      const bb = t.getBBox()
      t.setAttribute(
        'transform',
        `rotate(-90 ${(bb.x + bb.width / 2).toFixed(0)} ${(bb.y + bb.height / 2).toFixed(0)})`
      )
      rotated.push(t.textContent.trim())
    }

    const bb = slide.getBBox()
    const pad = Math.max(bb.width, bb.height) * 0.02
    root.setAttribute(
      'viewBox',
      `${Math.round(bb.x - pad)} ${Math.round(bb.y - pad)} ` +
        `${Math.round(bb.width + 2 * pad)} ${Math.round(bb.height + 2 * pad)}`
    )
    root.removeAttribute('width')
    root.removeAttribute('height')

    // Strip what this slide does not reference. Several passes, because removing one definition
    // can orphan another that only it referred to.
    for (let pass = 0; pass < 3; pass++) {
      const used = new Set()
      for (const el of root.querySelectorAll('*')) {
        for (const a of el.attributes) {
          for (const m of a.value.matchAll(/url\(#([^)]+)\)/g)) used.add(m[1])
          if ((a.name === 'href' || a.name === 'xlink:href') && a.value.startsWith('#')) {
            used.add(a.value.slice(1))
          }
        }
      }
      root.querySelectorAll('defs > *').forEach((d) => {
        if (d.id && !used.has(d.id)) d.remove()
      })
    }
    root.querySelectorAll('defs').forEach((d) => {
      if (!d.children.length) d.remove()
    })
    root.querySelectorAll('rect.BoundingBox').forEach((r) => r.remove())
    for (const el of root.querySelectorAll('*')) {
      for (const a of [...el.attributes]) if (a.name.startsWith('ooo:')) el.removeAttribute(a.name)
    }
    for (let pass = 0; pass < 4; pass++) {
      for (const g of [...root.querySelectorAll('g')]) {
        if (!g.parentElement) continue
        if (!g.attributes.length) g.replaceWith(...g.childNodes)
        else if (g.attributes.length === 1 && g.hasAttribute('class'))
          g.replaceWith(...g.childNodes)
      }
    }
    return { xml: root.outerHTML, dropped, rotated, viewBox: root.getAttribute('viewBox') }
  },
  slideId,
  drop,
  rotate
)

await browser.close()

if (result.error) {
  console.error(result.error)
  process.exit(1)
}
writeFileSync(out, result.xml)
const before = readFileSync(src).length / 1024
console.log(
  `${out}  viewBox ${result.viewBox}  ${before.toFixed(0)} KB -> ${(result.xml.length / 1024).toFixed(1)} KB`
)
if (result.dropped.length) console.log(`  dropped: ${result.dropped.join(', ')}`)
if (result.rotated.length) console.log(`  rotated: ${result.rotated.join(', ')}`)
if (rotate.length && result.rotated.length !== rotate.length) {
  console.log(
    `  note: asked to rotate ${rotate.length} label(s), matched ${result.rotated.length};` +
      ' the text may be split across tspans or spelled differently'
  )
}
