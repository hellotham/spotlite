/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Robots.txt', () => {
  it('should have robots.txt in public directory', () => {
    const robotsPath = path.resolve(process.cwd(), 'public/robots.txt')
    expect(fs.existsSync(robotsPath)).toBe(true)
  })

  it('should point to the sitemap', () => {
    const robotsPath = path.resolve(process.cwd(), 'public/robots.txt')
    if (fs.existsSync(robotsPath)) {
      const content = fs.readFileSync(robotsPath, 'utf-8')
      expect(content).toContain('Sitemap:')
      expect(content).toContain('sitemap-index.xml')
    } else {
      throw new Error('robots.txt does not exist')
    }
  })
})
