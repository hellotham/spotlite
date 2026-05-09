import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

describe('Content Migration Verification', () => {
  it('should have migrated about.md, creations.md, and uses.md', () => {
    const pagesDir = path.resolve(__dirname, './pages')
    const contentDir = path.resolve(__dirname, './content/page')
    
    expect(fs.existsSync(path.join(pagesDir, 'about.md'))).toBe(false)
    expect(fs.existsSync(path.join(pagesDir, 'creations.md'))).toBe(false)
    expect(fs.existsSync(path.join(pagesDir, 'uses.md'))).toBe(false)
    
    expect(fs.existsSync(path.join(contentDir, 'about.md'))).toBe(true)
    expect(fs.existsSync(path.join(contentDir, 'creations.md'))).toBe(true)
    expect(fs.existsSync(path.join(contentDir, 'uses.md'))).toBe(true)
  })

  it('should have migrated articles.astro and projects.astro to markdown', () => {
    const pagesDir = path.resolve(__dirname, './pages')
    const contentDir = path.resolve(__dirname, './content/page')
    
    expect(fs.existsSync(path.join(pagesDir, 'articles.astro'))).toBe(false)
    expect(fs.existsSync(path.join(pagesDir, 'projects.astro'))).toBe(false)
    
    expect(fs.existsSync(path.join(contentDir, 'articles.md'))).toBe(true)
    expect(fs.existsSync(path.join(contentDir, 'projects.md'))).toBe(true)
  })
})
