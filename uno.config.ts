import { defineConfig, presetIcons, presetTypography, presetWebFonts, presetWind4 } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      // Rosely palette - Greys
      blackBeauty: '#27272a',
      graniteGray: '#615f5f',
      opalGray: '#a49e9e',
      sugarSwizzle: '#f4eee8',
      // Rosely palette - Pinks
      morningGlory: '#ec809e',
      roseQuartz: '#f7caca',
      barelyPink: '#F8D7DD',
      heavenlyPink: '#f4dede',
      // Rosely palette - Purples
      grapeade: '#85677b',
      radiantOrchid: '#b565a7',
      lupine: '#be9cc1',
      lavenderFog: '#D2C4D6',
      // Rosely palette - Colourful
      raspberrySorbet: '#d2386c',
      spearmint: '#64bfa4',
      aquarius: '#3CADD4',
      meadowlark: '#eada4f',
      // Functional mappings
      border: '#a49e9e' // Opal Gray
    }
  },
  presets: [
    presetWind4({
      preflights: {
        reset: true
      }
    }),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Noto Sans',
        serif: 'Noto Serif',
        mono: 'Noto Sans Mono'
      }
    })
  ],
  safelist: [
    'rotate-2',
    '-rotate-2',
    'i-logos-twitter',
    'i-logos-facebook',
    'i-logos-instagram-icon',
    'i-logos-github-icon',
    'i-logos-linkedin-icon'
  ]
})
