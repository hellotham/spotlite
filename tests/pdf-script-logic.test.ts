import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

/**
 * The generator no longer concatenates markdown. It renders the /cv print routes with
 * Puppeteer, so these assertions cover the properties that make that output correct:
 * the page must be served over HTTP (the site has a base path), measured in print
 * media, and pagination must be awaited rather than guessed at.
 */
describe('PDF Generation Script', () => {
  const script = fs.readFileSync(path.join(rootDir, 'scripts/generate-pdf.js'), 'utf8')

  it('renders both CV documents', () => {
    expect(script).toContain('cv/onepage/')
    expect(script).toContain('cv/full/')
    expect(script).toContain('cv-onepage.pdf')
    expect(script).toContain('cv.pdf')
  })

  it('serves dist over HTTP at the configured base path', () => {
    // base: '/spotlite/' means every asset URL is base-prefixed; loading the page from
    // the filesystem would 404 them all and silently emit an unstyled PDF.
    expect(script).toContain('http.createServer')
    // The origin must carry the base, and the base must be read from the real config
    // rather than hardcoded.
    expect(script).toContain('readBase')
    expect(script).toMatch(/const origin = `http:\/\/127\.0\.0\.1:\$\{port\}\$\{base\}`/)
  })

  it('measures in print media', () => {
    // The stylesheet gives .cv screen-only padding, so measuring in screen media sizes
    // a different box than the one being printed.
    expect(script).toContain("emulateMediaType('print')")
  })

  it('waits for fonts before measuring', () => {
    // Metrics shift once webfonts resolve, which moves every page break.
    expect(script).toContain('document.fonts.ready')
    // No sleep-and-hope.
    expect(script).not.toMatch(/setTimeout\(\s*resolve/)
  })

  it('judges pagination from the produced PDF, not a height estimate', () => {
    // break-inside rules push content across boundaries, so a height/page-height
    // estimate can be a whole page optimistic.
    expect(script).toContain('countPages')
    expect(script).toContain('DENSITY_STEPS')
  })

  it('lets the stylesheet own page size and margins', () => {
    expect(script).toContain('preferCSSPageSize: true')
  })

  it('fails rather than silently emitting a two-page "one-pager"', () => {
    // The one-pager auto-fits, but only down to a legibility floor; past that it must
    // error out rather than quietly produce a second page.
    expect(script).toContain('MIN_FIT_SCALE')
    expect(script).toMatch(/must be exactly 1 page/)
    expect(script).toContain('process.exit(1)')
  })

  it('supports redirecting output so tests never overwrite tracked PDFs', () => {
    expect(script).toContain('CV_PDF_OUTPUT')
    expect(script).toContain('CV_PDF_ONEPAGE')
  })
})
