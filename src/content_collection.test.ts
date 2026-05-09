import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

describe('Content Config Verification', () => {
  it('should have the "page" collection defined in content.config.ts', () => {
    const configPath = path.resolve(__dirname, 'content.config.ts')
    const configContent = fs.readFileSync(configPath, 'utf8')
    
    // Check if 'page' is defined and exported in 'collections'
    expect(configContent).toMatch(/const page = defineCollection/)
    expect(configContent).toMatch(/export const collections = {.*page.*}/)
  })
})
