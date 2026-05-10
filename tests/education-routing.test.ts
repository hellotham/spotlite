import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

describe('Education Routing', () => {
  it('dynamic route file should exist and have getStaticPaths', () => {
    const filePath = path.join(rootDir, 'src/pages/education/[id].astro')
    // This will fail initially
    expect(fs.existsSync(filePath)).toBe(true)
    
    const content = fs.readFileSync(filePath, 'utf8')
    expect(content).toContain('export async function getStaticPaths()')
    expect(content).toContain("getCollection('education')")
  })

  it('education layout should exist', () => {
    const filePath = path.join(rootDir, 'src/layouts/education.astro')
    // This will fail initially
    expect(fs.existsSync(filePath)).toBe(true)
  })

  it('education page entry should exist', () => {
    const filePath = path.join(rootDir, 'src/content/page/education.md')
    // This will fail initially
    expect(fs.existsSync(filePath)).toBe(true)
  })
})
