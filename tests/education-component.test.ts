import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

describe('Education Component', () => {
  it('education.astro component should exist and use clickable cards', () => {
    const filePath = path.join(rootDir, 'src/components/education.astro')
    // This will fail initially
    expect(fs.existsSync(filePath)).toBe(true)
    
    const content = fs.readFileSync(filePath, 'utf8')
    expect(content).toContain('<a')
    expect(content).toContain('href')
    expect(content).toContain('group')
    expect(content).toContain('transition')
    expect(content).toContain('focus-ring')
    
    // Check for education specific labels
    expect(content).toContain('institution')
    expect(content).toContain('degree')
  })
})
