import { describe, it, expect } from 'vitest'
import fs from 'node:fs'

describe('UI Alignment', () => {
  it('articlelist.astro should use Rosely palette colors', () => {
    const content = fs.readFileSync('src/components/articlelist.astro', 'utf-8')
    expect(content).toContain('text-blackBeauty')
    expect(content).toContain('text-morningGlory')
    expect(content).toContain('bg-heavenlyPink')
  })

  it('imagecards.astro should use Rosely palette colors', () => {
    const content = fs.readFileSync('src/components/imagecards.astro', 'utf-8')
    expect(content).toContain('bg-sugarSwizzle')
    expect(content).toContain('ring-opalGray')
  })

  it('ctaform.astro should use Rosely palette colors', () => {
    const content = fs.readFileSync('src/components/ctaform.astro', 'utf-8')
    expect(content).toContain('bg-sugarSwizzle')
    expect(content).toContain('text-blackBeauty')
    expect(content).toContain('focus:ring-morningGlory')
  })

  it('hero.astro should use Rosely palette colors', () => {
    const content = fs.readFileSync('src/components/hero.astro', 'utf-8')
    expect(content).toContain('text-blackBeauty')
    expect(content).toContain('text-graniteGray')
  })

  it('work.astro should use Rosely palette colors', () => {
    const content = fs.readFileSync('src/components/work.astro', 'utf-8')
    expect(content).toContain('ring-opalGray')
    expect(content).toContain('text-blackBeauty')
  })
})
