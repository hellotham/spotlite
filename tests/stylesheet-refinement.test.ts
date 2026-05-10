import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

describe('PDF Stylesheet Refinement', () => {
  it('should not have padding in .markdown-body', () => {
    const cssPath = path.join(rootDir, 'scripts/pdf-theme.css')
    const content = fs.readFileSync(cssPath, 'utf8')
    
    // Check that .markdown-body does not have padding
    const paddingMatch = /\.markdown-body\s*{[^}]*padding:[^}]*}/.test(content)
    expect(paddingMatch).toBe(false)
  })
})
