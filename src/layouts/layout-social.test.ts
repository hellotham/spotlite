import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Layout.astro Social Links', () => {
  const layoutPath = path.resolve(__dirname, './layout.astro')
  const content = fs.readFileSync(layoutPath, 'utf-8')

  it('should import getCollection from astro:content', () => {
    expect(content).toContain("import { getCollection } from 'astro:content'")
  })

  it('should fetch the social collection', () => {
    expect(content).toContain("const social = await getCollection('social')")
  })

  it('should not contain hardcoded social links', () => {
    const hardcodedLinks = [
      'https://www.facebook.com/chris1tham',
      'https://github.com/ChristineTham',
      'https://www.instagram.com/chris1tham',
      'https://www.linkedin.com/in/christham'
    ]
    hardcodedLinks.forEach((link) => {
      expect(content).not.toContain(link)
    })
  })

  it('should dynamically generate sameAs array', () => {
    // This is a rough check for the mapping logic
    expect(content).toContain('sameAs: social')
    expect(content).toContain('.map')
  })
})
