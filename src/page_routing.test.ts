import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

describe('Page Routing Verification', () => {
  it('should have src/pages/[...slug].astro with correct collection query', () => {
    const routePath = path.resolve(__dirname, './pages/[...slug].astro')
    expect(fs.existsSync(routePath)).toBe(true)
    
    const content = fs.readFileSync(routePath, 'utf8')
    expect(content).toContain("getCollection('page')")
    expect(content).toContain('import.meta.glob')
  })
})
