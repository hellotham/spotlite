import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

describe('Work Component', () => {
  it('work.astro component should use clickable cards', () => {
    const filePath = path.join(rootDir, 'src/components/work.astro')
    expect(fs.existsSync(filePath)).toBe(true)
    
    const content = fs.readFileSync(filePath, 'utf8')
    // Check that it's no longer just an <li> with some text
    // but an <a> tag wrapping content.
    expect(content).toContain('<a')
    expect(content).toContain('href')
    expect(content).toContain('group')
    expect(content).toContain('transition')
    expect(content).toContain('focus-ring')
  })
})
