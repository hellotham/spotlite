import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const readComponent = (relativePath: string) => {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf-8')
}

describe('NavMenu Implementation', () => {
  it('navmenu should use the page collection instead of the menu collection', () => {
    const content = readComponent('src/components/navmenu.astro')
    
    // Expect usage of 'page' collection
    expect(content).toContain("getCollection('page')")
    // Expect NO usage of 'menu' collection
    expect(content).not.toContain("getCollection('menu')")
  })

  it('navmenu should sort the collection by order', () => {
    const content = readComponent('src/components/navmenu.astro')
    expect(content).toMatch(/sort\(\(a, b\) => a\.data\.order - b\.data\.order\)/)
  })

  it('navmenu should derive the href dynamically from item.id', () => {
    const content = readComponent('src/components/navmenu.astro')
    expect(content).toContain('href={`/${item.id}`}')
  })
})

describe('Footer Implementation', () => {
  it('footer should use the page collection instead of the menu collection', () => {
    const content = readComponent('src/components/footer.astro')
    
    // Expect usage of 'page' collection
    expect(content).toContain("getCollection('page')")
    // Expect NO usage of 'menu' collection
    expect(content).not.toContain("getCollection('menu')")
  })

  it('footer should sort the collection by order', () => {
    const content = readComponent('src/components/footer.astro')
    expect(content).toMatch(/sort\(\(a, b\) => a\.data\.order - b\.data\.order\)/)
  })

  it('footer should derive the href dynamically from item.id', () => {
    const content = readComponent('src/components/footer.astro')
    expect(content).toContain('href={`/${item.id}`}')
  })
})
