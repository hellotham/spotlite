import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

describe('PDF Stylesheet', () => {
  it('should have a pdf-theme.css file', () => {
    const cssPath = path.join(rootDir, 'scripts/pdf-theme.css')
    expect(fs.existsSync(cssPath)).toBe(true)
  })

  it('should use black and white values only', () => {
    const cssPath = path.join(rootDir, 'scripts/pdf-theme.css')
    if (!fs.existsSync(cssPath)) return // Skip if file not created yet
    const content = fs.readFileSync(cssPath, 'utf8')
    
    // Check for hex colors that are not #000, #fff, #eee, #f9f9f9, etc.
    // This is a simple check for common color patterns.
    const colorMatches = content.match(/#[0-9a-fA-F]{3,6}/g)
    if (colorMatches) {
      for (const color of colorMatches) {
        const hex = color.slice(1)
        let isGrayscale = false
        if (hex.length === 3) {
          isGrayscale = hex[0] === hex[1] && hex[1] === hex[2]
        } else if (hex.length === 6) {
          isGrayscale = hex.slice(0, 2) === hex.slice(2, 4) && hex.slice(2, 4) === hex.slice(4, 6)
        }
        expect(isGrayscale, `Color ${color} is not grayscale`).toBe(true)
      }
    }
  })
})
