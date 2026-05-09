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

const readJson = <T>(relativePath: string): T => {
  const filePath = path.join(rootDir, relativePath)
  const raw = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(raw) as T
}

describe('Work Navigation', () => {
  it('should have a "Work" entry in menu.json', () => {
    const menu = readJson<MenuItem[]>('src/menu.json')
    const workEntry = menu.find(item => item.id === 'work')
    
    expect(workEntry).toBeDefined()
    expect(workEntry?.title).toBe('Work')
    expect(workEntry?.link).toBe('/work')
  })

  it('should position "Work" after "Articles"', () => {
    const menu = readJson<MenuItem[]>('src/menu.json')
    const articlesIndex = menu.findIndex(item => item.id === 'articles')
    const workIndex = menu.findIndex(item => item.id === 'work')
    
    expect(articlesIndex).toBeLessThan(workIndex)
    // Optional: check if it's immediately after if that's strictly required
    // expect(workIndex).toBe(articlesIndex + 1)
  })
})
