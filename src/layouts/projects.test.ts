import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('projects.astro layout', () => {
  const layoutPath = path.resolve(__dirname, './projects.astro')
  const content = fs.readFileSync(layoutPath, 'utf-8')

  it('should display the description from frontmatter', () => {
    expect(content).toContain('{frontmatter.description}')
  })

  it('should style the description correctly', () => {
    expect(content).toContain('text-xl')
    expect(content).toContain('italic')
    expect(content).toContain('text-morningGlory')
  })

  it('should wrap markdown content in a div with prose class', () => {
    expect(content).toContain('<div')
    expect(content).toContain('prose')
    expect(content).toContain('<slot />')
    expect(content).toContain('</div>')
  })
})
