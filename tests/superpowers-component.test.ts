import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

describe('Superpowers Component', () => {
  it('superpowers.astro component should exist and contain list rendering logic', () => {
    const filePath = path.join(rootDir, 'src/components/superpowers.astro')
    expect(fs.existsSync(filePath)).toBe(true)
    
    const content = fs.readFileSync(filePath, 'utf8')
    
    // Check for essential DOM elements
    expect(content).toContain('class=\'p-6 card rounded-2xl\'')
    expect(content).toContain('id=\'superpowers-modal\'')
    
    // Check for JSON import
    expect(content).toContain("import superpowers from '../superpowers.json'")
    
    // Check for heroicons-bolt
    expect(content).toContain('i-heroicons-bolt')
    
    // Check for trigger class
    expect(content).toContain('class=\'superpower-trigger')
    
    // Check for modal fields
    expect(content).toContain('id=\'modal-title\'')
    expect(content).toContain('id=\'modal-description\'')
    expect(content).toContain('id=\'modal-level\'')
    expect(content).toContain('id=\'modal-comment\'')
    
    // Check for modal script logic
    expect(content).toContain('modal.showModal()')
    expect(content).toContain('modal.close()')
  })
})
