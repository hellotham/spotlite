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
  it('menu entries have valid structure, unique ids, and sorted order', () => {
    const menu = readJson<MenuItem[]>('src/menu.json')

    expect(menu.length).toBeGreaterThan(0)

    const ids = new Set<string>()
    let previousOrder = Number.NEGATIVE_INFINITY

    for (const item of menu) {
      expect(item.id).toMatch(/^[a-z0-9-]+$/)
      expect(item.title.length).toBeGreaterThan(0)
      expect(item.link.startsWith('/')).toBe(true)
      expect(ids.has(item.id)).toBe(false)
      expect(item.order).toBeGreaterThan(previousOrder)

      ids.add(item.id)
      previousOrder = item.order
    }
  })

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
})
