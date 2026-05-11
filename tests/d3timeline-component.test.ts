import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

describe('D3Timeline Component', () => {
  it('d3timeline.astro component should exist and contain basic structure', () => {
    const filePath = path.join(rootDir, 'src/components/d3timeline.astro')
    expect(fs.existsSync(filePath)).toBe(true)
    
    const content = fs.readFileSync(filePath, 'utf8')
    
    // Check for essential DOM elements
    expect(content).toMatch(/id=['"]timeline-container['"]/)
    expect(content).toMatch(/id=['"]timeline-tooltip['"]/)
    
    // Check for D3 import
    expect(content).toContain("import * as d3 from 'd3'")
    
    // Verify it appends an SVG
    expect(content).toMatch(/\.append\(['"]svg['"]\)/)
  })
})

describe('D3Timeline Component - Phase 2', () => {
  it('should contain D3 scale and axis logic', () => {
    const filePath = path.join(rootDir, 'src/components/d3timeline.astro')
    const content = fs.readFileSync(filePath, 'utf8')
    
    // Check for scales
    expect(content).toMatch(/d3\.scaleLinear\(\)/)
    expect(content).toMatch(/d3\.scaleBand\(\)/)
    
    // Check for axes
    expect(content).toMatch(/d3\.axisBottom/)
  })

  it('should render rect elements for timeline entries', () => {
    const filePath = path.join(rootDir, 'src/components/d3timeline.astro')
    const content = fs.readFileSync(filePath, 'utf8')
    
    // Check for rect appending (using join or append)
    expect(content).toMatch(/\.(append|join)\(['"]rect['"]\)/)
    
    // Check for attributes
    expect(content).toMatch(/\.attr\(['"]x['"]/)
    expect(content).toMatch(/\.attr\(['"]width['"]/)
    expect(content).toMatch(/\.attr\(['"]y['"]/)
    expect(content).toMatch(/\.attr\(['"]height['"]/)
  })
})
