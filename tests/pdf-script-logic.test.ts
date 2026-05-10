import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

describe('PDF Generation Script Logic', () => {
  it('should include the home page title in generate-pdf.js', () => {
    const scriptPath = path.join(rootDir, 'scripts/generate-pdf.js')
    const content = fs.readFileSync(scriptPath, 'utf8')
    
    // Check that src/pages/index.md is handled
    expect(content).toContain('src/pages/index.md')
  })

  it('should enable headers and footers in generate-pdf.js', () => {
    const scriptPath = path.join(rootDir, 'scripts/generate-pdf.js')
    const content = fs.readFileSync(scriptPath, 'utf8')
    
    expect(content).toContain('displayHeaderFooter: true')
    expect(content).toContain('headerTemplate')
    expect(content).toContain('footerTemplate')
  })

  it('should enable CSS margins in generate-pdf.js', () => {
    const scriptPath = path.join(rootDir, 'scripts/generate-pdf.js')
    const content = fs.readFileSync(scriptPath, 'utf8')
    
    expect(content).toContain("preferCSSPageSize: true")
    expect(content).toContain("margin: 0")
  })
})
