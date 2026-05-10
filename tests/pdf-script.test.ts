import fs from 'node:fs'
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
    const outputPath = path.join(rootDir, 'public/cv.pdf')
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath)
    }
    
    // Run the script using node
    const { execSync } = await import('node:child_process')
    const scriptPath = path.join(rootDir, 'scripts/generate-pdf.js')
    execSync(`node ${scriptPath}`)
    
    expect(fs.existsSync(outputPath)).toBe(true)
  })
})
