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
