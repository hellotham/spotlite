import { defineConfig, fontProviders } from 'astro/config'
import UnoCSS from 'unocss/astro'
import sitemap from '@astrojs/sitemap'
import mermaid from 'astro-mermaid'

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-spotlite.netlify.app',
  base: '/spotlite/',
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
    mermaid(),
    UnoCSS(),
    sitemap({
      filter: (page) => page !== 'https://astro-spotlite.netlify.app/404/'
    })
  ]
})
