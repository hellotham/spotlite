import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

describe('Work Routing', () => {
  it('dynamic route file should exist and have getStaticPaths', () => {
    const filePath = path.join(rootDir, 'src/pages/work/[...id].astro')
    expect(fs.existsSync(filePath)).toBe(true)
    
    const content = fs.readFileSync(filePath, 'utf8')
    expect(content).toContain('export async function getStaticPaths()')
    expect(content).toContain("getCollection('work')")
  })
})
