import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('ClientRouter', () => {
  it('should be present in layout.astro', () => {
    const layoutPath = path.resolve(__dirname, './layout.astro')
    const content = fs.readFileSync(layoutPath, 'utf-8')
    expect(content).toContain("import { ClientRouter } from 'astro:transitions'")
    expect(content).toContain('<ClientRouter />')
  })
})
