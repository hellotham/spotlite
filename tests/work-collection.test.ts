import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

describe('work collection contract', () => {
  it('work entries have valid numerical startyear and optional endyear', () => {
    const workDir = path.join(rootDir, 'src/content/work')
    const files = fs.readdirSync(workDir).filter(f => f.endsWith('.md'))
    
    expect(files.length).toBeGreaterThan(0)
    
    for (const file of files) {
      const filePath = path.join(workDir, file)
      const content = fs.readFileSync(filePath, 'utf8')
      
      // Check for 'startyear: [number]'
      const hasStartYear = /^startyear:\s+\d+$/m.test(content)
      expect(hasStartYear, `File ${file} is missing valid numerical 'startyear'`).toBe(true)

      // Check that 'datespan' is GONE
      const hasDatespan = /^datespan:/m.test(content)
      expect(hasDatespan, `File ${file} should NOT have 'datespan'`).toBe(false)
      
      // Check for 'type: employment | consulting'
      const hasType = /^type:\s+(employment|consulting)$/m.test(content)
      expect(hasType, `File ${file} is missing valid 'type' (employment|consulting)`).toBe(true)
    }
  })
})
