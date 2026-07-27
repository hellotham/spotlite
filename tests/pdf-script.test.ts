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

  it('should generate cv.pdf when run', async () => {
    // Generate into a temp dir rather than deleting and rewriting the tracked
    // public/cv.pdf: that left the repo dirty after every run, and left the file
    // missing entirely whenever generation failed.
    const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'spotlite-pdf-'))
    const outputPath = path.join(outDir, 'cv.pdf')

    try {
      const { execSync } = await import('node:child_process')
      const scriptPath = path.join(rootDir, 'scripts/generate-pdf.js')
      execSync(`node ${scriptPath}`, { env: { ...process.env, CV_PDF_OUTPUT: outputPath } })

      expect(fs.existsSync(outputPath)).toBe(true)
      expect(fs.statSync(outputPath).size).toBeGreaterThan(0)
    } finally {
      fs.rmSync(outDir, { recursive: true, force: true })
    }
  })
})
