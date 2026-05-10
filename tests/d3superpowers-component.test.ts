import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

describe('D3Superpowers Component', () => {
  it('d3superpowers.astro component should exist and contain D3 rendering logic', () => {
    const filePath = path.join(rootDir, 'src/components/d3superpowers.astro')
    expect(fs.existsSync(filePath)).toBe(true)
    
    const content = fs.readFileSync(filePath, 'utf8')
    
    // Check for essential DOM elements
    expect(content).toMatch(/id=['"]superpowers-container['"]/)
    
    // Check for D3 import and usage
    expect(content).toContain("import * as d3 from 'd3'")
    expect(content).toMatch(/d3\s*\.select\(['"]#superpowers-container['"]\)/)
    
    // Check for data presence (imported from JSON)
    expect(content).toContain('import superpowers from \'../superpowers.json\'')
    expect(content).toContain('data-superpowers={JSON.stringify(superpowers)}')
    
    // Check for sorting logic
    expect(content).toMatch(/data\.map\(\(?[^)]*\)?\s*=>\s*[^)]*\.title\)/)
    expect(content).toContain('localeCompare')
    
    // Check for scales and axes
    expect(content).toMatch(/d3\s*\.scaleLinear\(\)/)
    expect(content).toMatch(/d3\s*\.scaleBand(<[^>]*>)?\(\)/)
    expect(content).toMatch(/d3\s*\.axisBottom/)
    expect(content).toMatch(/d3\s*\.axisLeft/)
    
    // Check for responsiveness
    expect(content).toContain('window.addEventListener(\'resize\', renderChart)')
  })
})
