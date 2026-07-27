import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

describe('PDF Generation Script', () => {
  it('should have a generate-pdf.js script', () => {
    const scriptPath = path.join(rootDir, 'scripts/generate-pdf.js')
    expect(fs.existsSync(scriptPath)).toBe(true)
  })

  it('generates both CV documents when run', async () => {
    // Generate into a temp dir rather than rewriting the tracked PDFs in public/.
    // ALL THREE output variables must be redirected: leaving any unset sends that
    // document to public/ and leaves the repo dirty after every test run.
    const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'spotlite-pdf-'))
    const fullPath = path.join(outDir, 'cv.pdf')
    const onepagePath = path.join(outDir, 'cv-onepage.pdf')

    try {
      const { execSync } = await import('node:child_process')
      const scriptPath = path.join(rootDir, 'scripts/generate-pdf.js')
      execSync(`node ${scriptPath}`, {
        env: {
          ...process.env,
          CV_PDF_OUTDIR: outDir,
          CV_PDF_OUTPUT: fullPath,
          CV_PDF_ONEPAGE: onepagePath
        },
        stdio: 'pipe'
      })

      for (const output of [fullPath, onepagePath]) {
        expect(fs.existsSync(output)).toBe(true)
        expect(fs.statSync(output).size).toBeGreaterThan(0)
      }
    } finally {
      fs.rmSync(outDir, { recursive: true, force: true })
    }
    // Renders two documents in a real browser, re-paginating the full CV when the
    // last page comes out sparse, so the default 5s budget is nowhere near enough.
  }, 180_000)
})
