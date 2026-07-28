import { defineConfig, fontProviders } from 'astro/config'
import UnoCSS from 'unocss/astro'
import sitemap from '@astrojs/sitemap'
import mermaid from 'astro-mermaid'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

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
  markdown: {
    // $inline$ and $$display$$ maths in content, rendered to HTML+MathML at build time
    // by KaTeX. Nothing ships to the browser except the stylesheet, which layout.astro
    // imports — there is no client-side typesetting pass and so no flash of raw LaTeX.
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { strict: false }]],
    // Not Astro's default `github-dark`, whose comment colour (#6a737d on #24292e) is
    // 3.05:1 — below the 4.5:1 body text needs, and comments are prose. The modern
    // GitHub dark palette takes the same tokens to 6.15:1 and looks near-identical.
    shikiConfig: { theme: 'github-dark-default' }
  },
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
