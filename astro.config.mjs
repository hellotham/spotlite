import { defineConfig, fontProviders } from 'astro/config'
import UnoCSS from 'unocss/astro'
import sitemap from '@astrojs/sitemap'
import mermaid from 'astro-mermaid'
import { unified } from '@astrojs/markdown-remark'
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
    // $inline$ and $$display$$ maths, rendered to HTML+MathML at build time by KaTeX.
    // Nothing ships to the browser but the stylesheet, which layout.astro imports, so
    // there is no client-side typesetting pass and no flash of raw LaTeX.
    //
    // This selects the unified processor in place of Astro 7's default Sätteri. Sätteri
    // does have a `math` feature, but it only *parses* $...$ into math nodes — it has no
    // renderer, so the equations come out as a plaintext code block full of raw LaTeX,
    // and its `hastPlugins` are a bespoke visitor API that silently ignores a rehype
    // plugin like rehype-katex. Rendering at build time needs unified.
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { strict: false }]]
    }),
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
