import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

describe('D3BubbleChart Component', () => {
  it('d3bubblechart.astro component should exist and contain bubble chart logic', () => {
    const filePath = path.join(rootDir, 'src/components/d3bubblechart.astro')
    expect(fs.existsSync(filePath)).toBe(true)
    
    const content = fs.readFileSync(filePath, 'utf8')
    
    // Check for essential DOM elements
    expect(content).toMatch(/id=['"]bubblechart-container['"]/)
    expect(content).toMatch(/id=['"]bubblechart-tooltip['"]/)
    
    // Check for D3 import and usage
    expect(content).toContain("import * as d3 from 'd3'")
    expect(content).toMatch(/d3\s*\.select\(['"]#bubblechart-container['"]\)/)
    
    // Check for data presence (imported from JSON)
    expect(content).toContain("import superpowers from '../superpowers.json'")
    expect(content).toContain('data-superpowers={JSON.stringify(superpowers)}')
    
    // Check for simulation logic (characteristic of bubble charts)
    expect(content).toContain('d3.forceSimulation')
    expect(content).toContain('d3.forceManyBody')
    expect(content).toContain('d3.forceCollide')
    expect(content).toContain('d3.forceCenter')
    
    // Check for responsiveness
    expect(content).toContain("window.addEventListener('resize',")

    // Phase 2: SVG and Node generation
    expect(content).toContain('radiusScale')
    expect(content).toMatch(/\.append\(['"]circle['"]\)/)
    expect(content).toMatch(/\.append\(['"]text['"]\)/)
    
    // Check for word wrap logic (likely using tspan)
    expect(content).toMatch(/\.append\(['"]tspan['"]\)/)
  })
})
