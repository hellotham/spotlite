import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('about.astro layout', () => {
  const layoutPath = path.resolve(__dirname, './about.astro')
  const content = fs.readFileSync(layoutPath, 'utf-8')

  it('should display the description from frontmatter', () => {
    // Current layout doesn't explicitly render frontmatter.description in the body
    // except passing it to Layout component
    expect(content).toContain('{frontmatter.description}')
  })

  it('should style the description correctly', () => {
    // Expected classes based on design alignment (Rosely accent color is morningGlory)
    expect(content).toContain('text-morningGlory')
    expect(content).toContain('italic')
    expect(content).toContain('text-xl')
  })

  it('should wrap markdown content in an article with prose class', () => {
    expect(content).toContain('<article')
    expect(content).toContain('prose')
    expect(content).toContain('<slot />')
    expect(content).toContain('</article>')
  })
})
