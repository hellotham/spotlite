import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import sitemap from "@astrojs/sitemap"

import alpinejs from "@astrojs/alpinejs"

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-spotlite.netlify.app',
  integrations: [UnoCSS({
    injectReset: true
  }), sitemap(), alpinejs()]
})
