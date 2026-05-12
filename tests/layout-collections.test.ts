import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

describe('Layout Collections', () => {
  it('creations.astro layout should use getCollection', () => {
    const filePath = path.join(rootDir, 'src/layouts/creations.astro')
    expect(fs.existsSync(filePath)).toBe(true)
    
    const content = fs.readFileSync(filePath, 'utf8')
    expect(content).toContain('getCollection(\'creation\')')
    expect(content).toContain('creations.filter')
  })

  it('passions.astro layout should use getCollection', () => {
    const filePath = path.join(rootDir, 'src/layouts/passions.astro')
    expect(fs.existsSync(filePath)).toBe(true)
    
    const content = fs.readFileSync(filePath, 'utf8')
    expect(content).toContain('getCollection(\'passion\')')
    expect(content).toContain('passions.filter')
  })
})
