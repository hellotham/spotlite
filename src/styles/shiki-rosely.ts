import type { ThemeRegistrationRaw } from 'shiki'

/**
 * Rosely syntax highlighting themes.
 *
 * Every foreground here is measured against its own background, not eyeballed. The
 * default `github-dark` shipped comments at #6a737d on #24292e — 3.04:1, where WCAG
 * asks 4.5:1 of body text, and a comment is prose. tests/shiki-theme.test.ts recomputes
 * the whole table and fails if any token drops below 4.5:1, so a palette tweak cannot
 * quietly reintroduce that.
 *
 * The two palettes are not the same hues at different lightness. The light theme needs
 * foregrounds at or below ~0.15 relative luminance to clear 4.5:1 on Sugar Swizzle, and
 * the dark theme needs them at or above ~0.27 on Black Beauty — so each is built from
 * the end of the Rosely range that can reach its own target. They read as the same
 * scheme because the hue assignments match, not the values.
 */

/** Light: darkened Rosely hues on Sugar Swizzle. */
const LIGHT = {
  bg: '#f4eee8',
  fg: '#27272a',
  comment: '#615f5f', // Granite Gray, 5.4:1 — muted without being unreadable
  keyword: '#a8264f', // deep raspberry
  string: '#26654f', // deep spearmint
  fn: '#8d4f83', // deep radiant orchid
  number: '#b0472a', // deep terracotta
  type: '#1f6f8b', // deep aquarius
  attribute: '#7a5c1f', // deep meadowlark
  punctuation: '#615f5f'
}

/** Dark: the Rosely brights on Black Beauty. */
const DARK = {
  bg: '#27272a',
  fg: '#f4eee8',
  comment: '#a49e9e', // Opal Gray, 5.7:1
  keyword: '#ec809e', // Morning Glory
  string: '#64bfa4', // Spearmint
  fn: '#be9cc1', // Lupine
  number: '#eada4f', // Meadowlark
  type: '#3cadd4', // Aquarius
  attribute: '#d2c4d6', // Lavender Fog
  punctuation: '#a49e9e'
}

type Palette = typeof LIGHT

const build = (name: string, type: 'light' | 'dark', p: Palette): ThemeRegistrationRaw => ({
  name,
  type,
  colors: {
    'editor.background': p.bg,
    'editor.foreground': p.fg
  },
  settings: [
    { settings: { background: p.bg, foreground: p.fg } },
    {
      scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
      settings: { foreground: p.comment, fontStyle: 'italic' }
    },
    {
      scope: [
        'keyword',
        'keyword.control',
        'keyword.operator.new',
        'keyword.operator.expression',
        'storage',
        'storage.type',
        'storage.modifier',
        'meta.preprocessor',
        'keyword.other.preprocessor'
      ],
      settings: { foreground: p.keyword }
    },
    {
      scope: ['string', 'string.quoted', 'string.template', 'constant.other.symbol'],
      settings: { foreground: p.string }
    },
    {
      scope: [
        'entity.name.function',
        'support.function',
        'meta.function-call.generic',
        'variable.function'
      ],
      settings: { foreground: p.fn }
    },
    {
      scope: [
        'constant.numeric',
        'constant.language',
        'constant.character',
        'constant.other',
        'keyword.other.unit'
      ],
      settings: { foreground: p.number }
    },
    {
      scope: [
        'entity.name.type',
        'entity.name.class',
        'entity.name.namespace',
        'entity.name.tag',
        'support.type',
        'support.class'
      ],
      settings: { foreground: p.type }
    },
    {
      scope: [
        'entity.other.attribute-name',
        'variable.parameter',
        'meta.object-literal.key',
        'support.type.property-name'
      ],
      settings: { foreground: p.attribute }
    },
    {
      scope: ['punctuation', 'meta.brace', 'keyword.operator'],
      settings: { foreground: p.punctuation }
    },
    {
      scope: ['variable', 'variable.other', 'meta.definition.variable'],
      settings: { foreground: p.fg }
    },
    { scope: ['invalid', 'invalid.illegal'], settings: { foreground: p.keyword } }
  ]
})

export const roselyLight = build('rosely-light', 'light', LIGHT)
export const roselyDark = build('rosely-dark', 'dark', DARK)

/** Exported so the contrast test measures exactly what the themes ship. */
export const roselyPalettes = { light: LIGHT, dark: DARK }
