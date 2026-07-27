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
    // Formatting-tolerant: the condition spans several lines and is base-path aware.
    expect(content).toMatch(/aria-current=\{[\s\S]*?\?\s*'page'\s*:\s*undefined[\s\S]*?\}/)
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
    expect(content).toContain("lang='en'")
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

describe('Accessibility: Keyboard Navigability', () => {
  it('navbar button should have focus-ring', () => {
    const content = readComponent('src/components/navbar.astro')
    expect(content).toContain('focus-ring')
  })

  it('navmenu links should have focus-ring', () => {
    const content = readComponent('src/components/navmenu.astro')
    expect(content).toContain('focus-ring')
  })

  it('theme toggle button should have focus-ring', () => {
    const content = readComponent('src/components/theme.astro')
    expect(content).toContain('focus-ring')
  })

  it('ctaform link should have focus-ring', () => {
    const content = readComponent('src/components/ctaform.astro')
    expect(content).toMatch(/a[^>]*focus-ring/)
  })
})

describe('Accessibility: Color Contrast', () => {
  const relativeLuminance = (hex: string) => {
    const channels = [1, 3, 5]
      .map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255)
      .map((value) => (value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4)))
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
  }

  const contrastRatio = (foreground: string, background: string) => {
    const a = relativeLuminance(foreground)
    const b = relativeLuminance(background)
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
  }

  const config = readComponent('uno.config.ts')

  // Resolve a palette name (e.g. morningGlory) to its hex value in the theme block.
  const paletteColor = (name: string) => {
    const match = config.match(new RegExp(`\\b${name}:\\s*'(#[0-9a-fA-F]{6})'`))
    if (!match) throw new Error(`No hex defined for palette colour "${name}"`)
    return match[1]
  }

  // 'text-accent': 'text-<light> dark:text-<dark>'
  const accentShortcut = config.match(/'text-accent':\s*'text-([A-Za-z]+)\s+dark:text-([A-Za-z]+)'/)

  it('text-accent shortcut is defined with a light and dark colour', () => {
    expect(accentShortcut).not.toBeNull()
  })

  it('text-accent meets WCAG AA (4.5:1) against the surface in both modes', () => {
    const [, lightName, darkName] = accentShortcut!
    // `surface` is bg-sugarSwizzle dark:bg-blackBeauty.
    const lightRatio = contrastRatio(paletteColor(lightName), paletteColor('sugarSwizzle'))
    const darkRatio = contrastRatio(paletteColor(darkName), paletteColor('blackBeauty'))

    expect(lightRatio).toBeGreaterThanOrEqual(4.5)
    expect(darkRatio).toBeGreaterThanOrEqual(4.5)
  })
})
