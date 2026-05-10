import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

type MenuItem = {
  id: string
  order: number
  title: string
  link: string
}

type SocialItem = MenuItem & {
  icon: string
}

const readJson = <T>(relativePath: string): T => {
  const filePath = path.join(rootDir, relativePath)
  const raw = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(raw) as T
}

describe('content data contracts', () => {
  it('social entries include valid links and icon classes', () => {
    const social = readJson<SocialItem[]>('src/social.json')

    expect(social.length).toBeGreaterThan(0)

    const ids = new Set<string>()

    for (const item of social) {
      expect(item.id.length).toBeGreaterThan(0)
      expect(item.link.startsWith('https://')).toBe(true)
      expect(item.icon.startsWith('i-')).toBe(true)
      expect(ids.has(item.id)).toBe(false)
      ids.add(item.id)
    }
  })

  it('page content entries have an order property in frontmatter', () => {
    const pagesDir = path.join(rootDir, 'src/content/page')
    const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.md'))
    
    expect(files.length).toBeGreaterThan(0)
    
    for (const file of files) {
      const filePath = path.join(pagesDir, file)
      const content = fs.readFileSync(filePath, 'utf8')
      
      // Check for 'order: [number]' in the frontmatter
      const hasOrder = /^order:\s+\d+$/m.test(content)
      expect(hasOrder, `File ${file} is missing 'order' in frontmatter`).toBe(true)
    }
  })
})
