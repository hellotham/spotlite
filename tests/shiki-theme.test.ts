import { describe, expect, it } from 'vitest'
import { roselyPalettes, roselyLight, roselyDark } from '../src/styles/shiki-rosely'

/**
 * Syntax highlighting is prose as far as WCAG is concerned — a comment is a sentence,
 * and a string literal is text. Astro's default `github-dark` shipped comments at
 * #6a737d on #24292e, which measures 3.04:1 against the 4.5:1 body text requires, and
 * nothing in the build complained. These tests recompute the ratios from the palettes
 * the themes are actually built from, so a colour tweak cannot quietly undo that fix.
 */

const relativeLuminance = (hex: string) => {
  const value = hex.replace('#', '')
  const channels = [0, 2, 4].map((offset) => {
    const raw = parseInt(value.slice(offset, offset + 2), 16) / 255
    return raw <= 0.03928 ? raw / 12.92 : Math.pow((raw + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

const contrast = (a: string, b: string) => {
  const [hi, lo] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

describe('Rosely syntax highlighting', () => {
  for (const [name, palette] of Object.entries(roselyPalettes)) {
    describe(`${name} theme`, () => {
      const { bg, ...foregrounds } = palette

      for (const [token, colour] of Object.entries(foregrounds)) {
        it(`renders ${token} at 4.5:1 or better`, () => {
          expect(contrast(colour, bg)).toBeGreaterThanOrEqual(4.5)
        })
      }

      it('keeps every token distinguishable from the plain foreground', () => {
        // Highlighting that collapses to one colour is not highlighting. Comments are
        // exempt: being visually quieter than code is the whole point of them.
        const distinct = new Set(
          Object.entries(foregrounds)
            .filter(([token]) => token !== 'comment' && token !== 'punctuation')
            .map(([, colour]) => colour)
        )
        expect(distinct.size).toBeGreaterThanOrEqual(6)
      })
    })
  }

  it('builds both themes with the background and foreground Shiki needs', () => {
    for (const theme of [roselyLight, roselyDark]) {
      expect(theme.colors?.['editor.background']).toMatch(/^#[0-9a-f]{6}$/i)
      expect(theme.colors?.['editor.foreground']).toMatch(/^#[0-9a-f]{6}$/i)
      expect(theme.settings?.length).toBeGreaterThan(5)
    }
    expect(roselyLight.type).toBe('light')
    expect(roselyDark.type).toBe('dark')
  })

  it('uses different palettes per scheme rather than one shared set', () => {
    // A single palette cannot clear 4.5:1 on both a cream and a near-black background;
    // if these ever converge, one of the two schemes has silently lost its contrast.
    expect(roselyPalettes.light.bg).not.toBe(roselyPalettes.dark.bg)
    expect(roselyPalettes.light.keyword).not.toBe(roselyPalettes.dark.keyword)
  })
})
