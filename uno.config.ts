// uno.config.ts
import { defineConfig, presetIcons, presetAttributify, presetTypography, presetUno } from 'unocss'
import { presetForms } from '@julr/unocss-preset-forms'

export default defineConfig({
  presets: [
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
        // ...
      }
    }),
    presetAttributify(), // required when using attributify mode
    presetUno(), // required
    presetForms(),
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
