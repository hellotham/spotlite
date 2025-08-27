// uno.config.ts
import { defineConfig, presetIcons, presetTypography, presetWind4 } from 'unocss'

export default defineConfig({
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
        // ...
      }
    }),
    presetTypography()
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
