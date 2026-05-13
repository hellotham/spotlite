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
    expect(content).toMatch(/d3\.scaleLinear\(/)
    expect(content).toMatch(/d3\.scaleBand/)
    
    // Check for axes
    expect(content).toMatch(/d3\.axisBottom/)
  })

  it('should render rect elements for timeline entries', () => {
    const filePath = path.join(rootDir, 'src/components/d3timeline.astro')
    const content = fs.readFileSync(filePath, 'utf8')
    
    // Check for rect appending
    expect(content).toMatch(/\.(append|join)\(['"]rect['"]\)/)
    
    // Check for attributes
    expect(content).toMatch(/\.attr\(['"]x['"]/)
    expect(content).toMatch(/\.attr\(['"]width['"]/)
    expect(content).toMatch(/\.attr\(['"]y['"]/)
    expect(content).toMatch(/\.attr\(['"]height['"]/)
  })
})

describe('D3Timeline Component - Phase 3', () => {
  it('should apply color coding based on entry type', () => {
    const filePath = path.join(rootDir, 'src/components/d3timeline.astro')
    const content = fs.readFileSync(filePath, 'utf8')
    
    // Check for color mapping logic in fill attribute
    expect(content).toMatch(/\.attr\(['"]fill['"],\s*\(d\)\s*=>/)
    
    // Check for type strings being used in the component
    expect(content).toContain('education')
    expect(content).toContain('employment')
    expect(content).toContain('consulting')
  })

  it('should apply a visual indicator for ongoing entries', () => {
    const filePath = path.join(rootDir, 'src/components/d3timeline.astro')
    const content = fs.readFileSync(filePath, 'utf8')
    
    // Check for isOngoing check in the script
    expect(content).toContain('isOngoing')
    
    // Check for visual indicator application (e.g. gradient)
    expect(content).toMatch(/url\(#grad-/)
  })
})

describe('D3Timeline Component - Phase 4', () => {
  it('should handle tooltip interaction', () => {
    const filePath = path.join(rootDir, 'src/components/d3timeline.astro')
    const content = fs.readFileSync(filePath, 'utf8')
    
    // Check for mouse event listeners
    expect(content).toContain(".on('mouseover'")
    expect(content).toContain(".on('mouseout'")
    expect(content).toContain(".on('mousemove'")
    
    // Check for tooltip visibility logic (opacity)
    expect(content).toContain("tooltip.style('opacity', 1)")
    expect(content).toContain("tooltip.style('opacity', 0)")
  })

  it('should handle navigation on click', () => {
    const filePath = path.join(rootDir, 'src/components/d3timeline.astro')
    const content = fs.readFileSync(filePath, 'utf8')
    
    // Check for click event listener
    expect(content).toContain(".on('click'")
    
    // Check for navigation logic
    expect(content).toContain('window.location.href = d.slug')
  })
})

describe('D3Timeline Component - Phase 5', () => {
  it('should implement adaptive layout logic', () => {
    const filePath = path.join(rootDir, 'src/components/d3timeline.astro')
    const content = fs.readFileSync(filePath, 'utf8')
    
    // Check for resize listener
    expect(content).toContain("window.addEventListener('resize'")
    
    // Check for orientation switching logic (likely checking width or matchMedia)
    expect(content).toMatch(/width\s*<\s*\d+|matchMedia/)
  })
})
