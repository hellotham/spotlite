import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

/**
 * Renders the CV print routes to PDF.
 *
 * The documents are ordinary Astro routes (/cv/onepage and /cv/full) built from the
 * same content collections as the site, so there is a single source of truth. They are
 * served over a real HTTP server rather than from the filesystem because the site is
 * built with `base: '/spotlite/'` and every asset URL is base-prefixed — loading the
 * page directly would 404 them all and silently produce an unstyled PDF.
 *
 * Pagination is Chrome's own. An earlier version used Paged.js for CSS margin boxes,
 * but its at-rule parser broke on ordinary CSS (single-quoted strings, some @media
 * queries) in ways that hung generation rather than failing loudly. Chrome handles the
 * break/orphan/widow rules that actually matter for a CV, and the page numbers come
 * from its header/footer templates.
 */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')

/** A4 minus the @page margins declared in cv-print.css. */
const PRINTABLE_MM = 297 - 16 - 14
/** A trailing page emptier than this reads as an accident rather than a page. */
const MIN_LAST_PAGE_FILL = 0.35
/**
 * Progressively denser retries. Fine steps first: content often overflows a page
 * boundary by only a few millimetres, and a 1% reduction that saves a page is far
 * preferable to a 9% one. The last value is as cramped as the full CV should get.
 */
const DENSITY_STEPS = [0.99, 0.98, 0.97, 0.95, 0.93, 0.91]
/** Below this the type becomes too small to read comfortably in print. */
const MIN_FIT_SCALE = 0.8

const readBase = () => {
  const config = fs.readFileSync(path.join(rootDir, 'astro.config.mjs'), 'utf8')
  return config.match(/base:\s*'([^']*)'/)?.[1] ?? '/'
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon'
}

const startServer = (base) =>
  new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        let urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
        if (base !== '/' && urlPath.startsWith(base)) {
          urlPath = urlPath.slice(base.length - 1)
        }

        let filePath = path.resolve(path.join(distDir, urlPath))
        if (urlPath.endsWith('/')) filePath = path.join(filePath, 'index.html')
        // Contain requests to dist/ regardless of what the page asks for. Compared with
        // a trailing separator: distDir has none, so a bare startsWith also accepted any
        // sibling whose name merely begins with "dist" — <root>/dist-backup/x passed a
        // guard whose whole job is to reject it.
        if (filePath !== distDir && !filePath.startsWith(distDir + path.sep)) {
          res.writeHead(403).end('Forbidden')
          return
        }
        if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
          filePath = path.join(filePath, 'index.html')
        }
        if (!fs.existsSync(filePath)) {
          res.writeHead(404).end('Not found')
          return
        }

        res.writeHead(200, {
          'Content-Type': MIME[path.extname(filePath)] ?? 'application/octet-stream'
        })
        fs.createReadStream(filePath).pipe(res)
      } catch (error) {
        res.writeHead(500).end(String(error))
      }
    })

    server.on('error', reject)
    server.listen(0, '127.0.0.1', () => resolve(server))
  })

/** Count pages without a PDF parser: each page object appears once in the output. */
const countPages = (pdfPath) => {
  const contents = fs.readFileSync(pdfPath).toString('latin1')
  return (contents.match(/\/Type\s*\/Page[^s]/g) ?? []).length
}

/**
 * Page numbering for the multi-page CV, drawn by Chrome into the @page bottom margin.
 * The one-pager gets none: "1 of 1" on a single sheet is noise.
 */
const footerOptions = (numbered) =>
  numbered
    ? {
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate:
          '<div style="width:100%;text-align:center;font-family:sans-serif;' +
          'font-size:8pt;color:#55555f;">' +
          '<span class="pageNumber"></span> of <span class="totalPages"></span></div>'
      }
    : {}

/** Rendered height of the CV content, in millimetres. */
const measureContentMm = (page) =>
  page.evaluate(() => {
    const pxPerMm = 96 / 25.4
    return document.querySelector('.cv').getBoundingClientRect().height / pxPerMm
  })

const openPage = async (browser, url) => {
  const page = await browser.newPage()
  const problems = []
  page.on('pageerror', (error) => problems.push(`page error: ${error.message}`))
  page.on('requestfailed', (request) =>
    problems.push(`failed request: ${request.url()} (${request.failure()?.errorText})`)
  )

  // Measure in print media: the document is laid out for print, and screen rules would
  // size a different box than the one being printed.
  await page.emulateMediaType('print')

  const response = await page.goto(url, { waitUntil: 'networkidle0', timeout: 60_000 })
  if (!response || !response.ok()) {
    throw new Error(`${url} returned ${response ? response.status() : 'no response'}`)
  }
  // Fonts must be resolved before measuring, or metrics shift and pagination moves.
  await page.evaluate(() => document.fonts.ready)

  return { page, problems }
}

const printTo = (page, output, numbered) =>
  page.pdf({
    path: output,
    format: 'A4',
    printBackground: true,
    // The stylesheet owns page size and margins via @page.
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    ...footerOptions(numbered)
  })

/**
 * Scale the one-pager down just enough to fit a single page.
 *
 * Hand-tuned font sizes silently overflow the moment content grows, so measure and
 * scale instead. Returns the applied scale, or null if one page is unreachable above
 * the legibility floor.
 */
const fitOnePage = async (page) => {
  const applyScale = (scale) =>
    page.evaluate((value) => {
      document.documentElement.style.setProperty('--cv-fit', String(value))
    }, scale)

  let scale = 1
  // Several passes: the first ratio is near-exact, later ones correct for reflow as
  // line breaking changes.
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const contentMm = await measureContentMm(page)
    if (contentMm <= PRINTABLE_MM) return scale

    const required = scale * (PRINTABLE_MM / contentMm)
    // Shave a little extra so a borderline fit does not tip over into two pages.
    scale = Math.max(MIN_FIT_SCALE, required * 0.995)
    if (scale <= MIN_FIT_SCALE) {
      await applyScale(MIN_FIT_SCALE)
      return (await measureContentMm(page)) <= PRINTABLE_MM ? MIN_FIT_SCALE : null
    }
    await applyScale(scale)
  }

  return (await measureContentMm(page)) <= PRINTABLE_MM ? scale : null
}

const renderOnePager = async (browser, { url, output, label }) => {
  const { page, problems } = await openPage(browser, url)
  try {
    const scale = await fitOnePage(page)
    if (scale === null) {
      throw new Error(
        `${label}: content cannot be fitted to one page above the ${MIN_FIT_SCALE} legibility ` +
          'floor. Reduce onePage.maxRoles / maxBulletsPerRole in src/content/cv/profile.md,' +
          ' or trim content.'
      )
    }
    console.log(`  ${label}: fitted at ${(scale * 100).toFixed(1)}% scale`)
    await printTo(page, output, false)
  } finally {
    await page.close()
  }
  return problems
}

/**
 * Render the multi-page CV, retrying denser when the final page would carry only a
 * line or two.
 *
 * Each attempt is judged from the PDF Chrome actually produced rather than from a
 * height estimate: break-inside rules push content across boundaries, so an estimate
 * can be a whole page optimistic.
 */
const renderFullCv = async (browser, { url, output, label }) => {
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'spotlite-cv-'))

  const attempt = async (density) => {
    const target = density ? `${url}?density=${density}` : url
    const { page, problems } = await openPage(browser, target)
    try {
      const probe = path.join(scratch, `probe-${density ?? 'base'}.pdf`)
      await printTo(page, probe, true)
      const pages = countPages(probe)
      const contentMm = await measureContentMm(page)
      // Fill of the final page, derived from the real page count.
      const fill = Math.min(1, Math.max(0, (contentMm - (pages - 1) * PRINTABLE_MM) / PRINTABLE_MM))
      return { density, pages, fill, problems, probe }
    } finally {
      await page.close()
    }
  }

  try {
    let best = await attempt(null)

    if (best.pages > 1 && best.fill < MIN_LAST_PAGE_FILL) {
      console.log(
        `  ${label}: last page only ${Math.round(best.fill * 100)}% full, trying denser layouts`
      )
      // Try every step rather than stopping at the first that fails to help: a small
      // reduction may not move a break that a slightly larger one does.
      for (const density of DENSITY_STEPS) {
        const candidate = await attempt(density)
        const better =
          candidate.pages < best.pages ||
          (candidate.pages === best.pages && candidate.fill > best.fill)
        if (better) best = candidate
        if (best.fill >= MIN_LAST_PAGE_FILL && best.pages <= candidate.pages) break
      }
    }

    // The accepted probe is already the exact document; no need to re-render it.
    fs.copyFileSync(best.probe, output)
    console.log(
      `  ${label}: ${best.pages} page(s), last page ~${Math.round(best.fill * 100)}% full` +
        (best.density ? ` (density ${best.density})` : '')
    )
    return best.problems
  } finally {
    fs.rmSync(scratch, { recursive: true, force: true })
  }
}

const generate = async () => {
  if (!fs.existsSync(path.join(distDir, 'cv', 'full', 'index.html'))) {
    console.error('dist/cv/full/index.html not found. Run `pnpm run build` first.')
    process.exit(1)
  }

  const base = readBase()
  const server = await startServer(base)
  const { port } = server.address()
  const origin = `http://127.0.0.1:${port}${base}`

  const outDir = process.env.CV_PDF_OUTDIR || path.join(rootDir, 'public')
  const onepageOutput = process.env.CV_PDF_ONEPAGE || path.join(outDir, 'cv-onepage.pdf')
  const fullOutput = process.env.CV_PDF_OUTPUT || path.join(outDir, 'cv.pdf')

  const browser = await puppeteer.launch({ headless: true })
  let failed = false

  try {
    fs.mkdirSync(path.dirname(onepageOutput), { recursive: true })
    fs.mkdirSync(path.dirname(fullOutput), { recursive: true })

    console.log('Rendering one-pager...')
    const onepageProblems = await renderOnePager(browser, {
      url: `${origin}cv/onepage/`,
      output: onepageOutput,
      label: 'one-pager'
    })

    const onepagePages = countPages(onepageOutput)
    console.log(
      `  one-pager: ${onepagePages} page(s), ` +
        `${(fs.statSync(onepageOutput).size / 1024).toFixed(0)} KB -> ${onepageOutput}`
    )
    // A one-pager that spills onto a second page is a failure, not a warning: it is
    // the entire point of the document.
    if (onepagePages !== 1) {
      console.error(`  ERROR: one-pager must be exactly 1 page but is ${onepagePages}.`)
      failed = true
    }

    console.log('Rendering full CV...')
    const fullProblems = await renderFullCv(browser, {
      url: `${origin}cv/full/`,
      output: fullOutput,
      label: 'full CV'
    })
    console.log(
      `  full CV: ${(fs.statSync(fullOutput).size / 1024).toFixed(0)} KB -> ${fullOutput}`
    )

    for (const [label, problems] of [
      ['one-pager', onepageProblems],
      ['full CV', fullProblems]
    ]) {
      if (problems.length > 0) {
        console.warn(`  ${label}: ${problems.length} rendering problem(s):`)
        for (const problem of problems.slice(0, 5)) console.warn(`    - ${problem}`)
      }
    }
  } finally {
    await browser.close()
    server.close()
  }

  if (failed) process.exit(1)
  console.log('Done.')
}

generate().catch((error) => {
  console.error('Error generating PDF:', error)
  process.exit(1)
})
