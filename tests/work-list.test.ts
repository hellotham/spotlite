import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

describe('Work History List Page', () => {
  it('Work History content page and layout should exist', () => {
    const contentPath = path.join(rootDir, 'src/content/page/work.md')
    const layoutPath = path.join(rootDir, 'src/layouts/work.astro')
    
    expect(fs.existsSync(contentPath)).toBe(true)
    expect(fs.existsSync(layoutPath)).toBe(true)
    
    const content = fs.readFileSync(layoutPath, 'utf8')
    expect(content).toContain("getCollection('work')")
    expect(content).toContain('role')
    expect(content).toContain('company')
    expect(content).toContain('datespan')
  })
})
