import { describe, it, expect } from 'vitest'
import fs from 'node:fs'

describe('Layout Alignment', () => {
  it('header.astro should use Rosely palette colors', () => {
    const content = fs.readFileSync('src/components/header.astro', 'utf-8')
    expect(content).toContain('bg-sugarSwizzle')
    expect(content).toContain('ring-opalGray')
  })

  it('headerhome.astro should use Rosely palette colors', () => {
    const content = fs.readFileSync('src/components/headerhome.astro', 'utf-8')
    expect(content).toContain('bg-sugarSwizzle')
    expect(content).toContain('ring-opalGray')
  })

  it('footer.astro should use Rosely palette colors', () => {
    const content = fs.readFileSync('src/components/footer.astro', 'utf-8')
    expect(content).toContain('border-border')
    expect(content).toContain('text-blackBeauty')
    expect(content).toContain('hover:text-morningGlory')
  })

  it('navbar.astro should use Rosely palette colors', () => {
    const content = fs.readFileSync('src/components/navbar.astro', 'utf-8')
    expect(content).toContain('bg-sugarSwizzle')
    expect(content).toContain('hover:text-morningGlory')
  })

  it('navmenu.astro should use Rosely palette colors', () => {
    const content = fs.readFileSync('src/components/navmenu.astro', 'utf-8')
    expect(content).toContain('bg-sugarSwizzle')
    expect(content).toContain('text-morningGlory')
  })

  it('theme.astro should use Rosely palette colors', () => {
    const content = fs.readFileSync('src/components/theme.astro', 'utf-8')
    expect(content).toContain('bg-sugarSwizzle')
    expect(content).toContain('text-morningGlory')
  })
})
