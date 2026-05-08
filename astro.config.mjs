import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-spotlite.netlify.app',
  integrations: [
    UnoCSS(),
    sitemap({
      filter: (page) => page !== 'https://astro-spotlite.netlify.app/404/'
    })
  ]

})
