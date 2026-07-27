import { defineConfig, fontProviders } from 'astro/config'
import UnoCSS from 'unocss/astro'
import sitemap from '@astrojs/sitemap'
import mermaid from 'astro-mermaid'

// https://astro.build/config
export default defineConfig({
  site: 'https://hellotham.com',
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
      // The /cv/ routes exist only as a rendering source for the PDFs; they duplicate
      // site content and are marked noindex, so keep them out of the sitemap too.
      filter: (page) =>
        page !== 'https://hellotham.com/spotlite/404/' && !page.includes('/spotlite/cv/')
    })
  ]
})
