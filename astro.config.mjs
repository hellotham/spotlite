import { defineConfig, fontProviders } from 'astro/config'
import UnoCSS from 'unocss/astro'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-spotlite.netlify.app',
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Noto Sans',
      cssVariable: '--font-noto-sans',
      fallbacks: ['sans-serif']
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Noto Serif',
      cssVariable: '--font-noto-serif',
      fallbacks: ['serif']
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Noto Sans Mono',
      cssVariable: '--font-noto-sans-mono',
      fallbacks: ['monospace']
    }
  ],
  integrations: [
    UnoCSS(),
    sitemap({
      filter: (page) => page !== 'https://astro-spotlite.netlify.app/404/'
    })
  ]
})
