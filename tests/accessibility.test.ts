// @vitest-environment jsdom

import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

const rootDir = path.resolve(__dirname, '..')

const readComponent = (relativePath: string) => {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf-8')
}

describe('Accessibility: ARIA attributes', () => {
  it('navbar mobile-menu-button should have aria-controls', () => {
    const content = readComponent('src/components/navbar.astro')
    expect(content).toMatch(/aria-controls=['"]mobile-menu['"]/)
  })

  it('navmenu links should support aria-current', () => {
    const content = readComponent('src/components/navmenu.astro')
    expect(content).toContain("aria-current={current == item.data.link ? 'page' : undefined}")
  })

  it('search status should have aria-live and role', () => {
    const content = readComponent('src/components/search.astro')
    expect(content).toMatch(/aria-live=['"]polite['"]/)
    expect(content).toMatch(/role=['"]status['"]/)
  })
})

describe('Accessibility: Semantic HTML and Landmarks', () => {
  it('layout should have a lang attribute on html', () => {
    const content = readComponent('src/layouts/layout.astro')
    expect(content).toContain('lang=\'en\'')
  })

  it('pagecontent should not wrap main content slot in header', () => {
    const content = readComponent('src/components/pagecontent.astro')
    // Ensure no header element contains the slot
    expect(content).not.toMatch(/<header>(?:(?!<\/header>)[\s\S])*<slot \/>/)
  })

  it('home layout should use semantic sections for main blocks', () => {
    const content = readComponent('src/layouts/home.astro')
    // Expect at least some sections to be used for the grid content
    expect(content).toContain('<section')
  })
})
