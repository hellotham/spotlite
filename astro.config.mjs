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
    // Rosely-aligned Mermaid theming.
    //
    // `autoTheme` is off deliberately. The integration's theme switching is a hard-coded
    // map to Mermaid's own `default`/`dark` themes, applied by re-running
    // `mermaid.initialize({ ...config, theme })` — so it overrides `theme: 'base'` and
    // makes custom themeVariables impossible to vary per colour scheme. Turning it off
    // lets us render once with the Rosely light palette below and recolour for dark in
    // CSS (src/styles/mermaid.css), which is also instant on toggle rather than a
    // re-render, and sidesteps the integration's re-render bugs entirely.
    //
    // If you ever switch autoTheme back on, restore the `data-theme` mirroring in
    // layout.astro and theme.astro — the integration reads that attribute, not the
    // `dark` class this site actually uses.
    mermaid({
      theme: 'base',
      autoTheme: false,
      mermaidConfig: {
        themeVariables: {
          // Transparent so a diagram sits on the page or card it is placed in.
          background: 'transparent',
          fontFamily: "'Noto Sans', sans-serif",
          fontSize: '15px',

          // Nodes: heavenly pink fill, radiant orchid edge, near-black label.
          primaryColor: '#f4dede',
          primaryBorderColor: '#b565a7',
          primaryTextColor: '#27272a',
          mainBkg: '#f4dede',
          nodeBorder: '#b565a7',
          secondaryColor: '#d2c4d6',
          secondaryBorderColor: '#85677b',
          secondaryTextColor: '#27272a',
          tertiaryColor: '#f8d7dd',
          tertiaryBorderColor: '#b565a7',
          tertiaryTextColor: '#27272a',

          // Connectors: grapeade reaches 4:1 on the cream page, so arrows and their
          // labels stay legible outside the filled shapes.
          lineColor: '#85677b',
          textColor: '#27272a',
          edgeLabelBackground: '#f4eee8',

          clusterBkg: '#faf6f2',
          clusterBorder: '#a49e9e',
          titleColor: '#27272a',

          // Charts. Ordered so the first series is the strongest colour — this is what
          // the Big Five and crypt() performance bar charts pick up.
          xyChart: {
            backgroundColor: 'transparent',
            titleColor: '#27272a',
            xAxisLabelColor: '#27272a',
            xAxisTitleColor: '#27272a',
            xAxisTickColor: '#85677b',
            xAxisLineColor: '#85677b',
            yAxisLabelColor: '#27272a',
            yAxisTitleColor: '#27272a',
            yAxisTickColor: '#85677b',
            yAxisLineColor: '#85677b',
            plotColorPalette: '#b565a7, #3cadd4, #64bfa4, #c02d5a, #85677b, #eada4f'
          },

          // Gantt, used by the personality charts on the Superpowers page.
          sectionBkgColor: '#f8d7dd',
          altSectionBkgColor: '#faf6f2',
          sectionBkgColor2: '#d2c4d6',
          taskBkgColor: '#b565a7',
          taskTextColor: '#f4eee8',
          taskTextLightColor: '#27272a',
          taskTextOutsideColor: '#27272a',
          activeTaskBkgColor: '#ec809e',
          activeTaskBorderColor: '#c02d5a',
          doneTaskBkgColor: '#d2c4d6',
          doneTaskBorderColor: '#85677b',
          gridColor: '#a49e9e',

          // Quadrant chart, used by the Open Sex-Role Inventory plot.
          quadrant1Fill: '#f8d7dd',
          quadrant2Fill: '#f4dede',
          quadrant3Fill: '#faf6f2',
          quadrant4Fill: '#d2c4d6',
          quadrant1TextFill: '#27272a',
          quadrant2TextFill: '#27272a',
          quadrant3TextFill: '#27272a',
          quadrant4TextFill: '#27272a',
          quadrantPointFill: '#c02d5a',
          quadrantPointTextFill: '#27272a',
          quadrantXAxisTextFill: '#27272a',
          quadrantYAxisTextFill: '#27272a',
          quadrantTitleFill: '#27272a',
          quadrantInternalBorderStrokeFill: '#a49e9e',
          quadrantExternalBorderStrokeFill: '#85677b'
        }
      }
    }),
    UnoCSS(),
    sitemap({
      // The /cv/ routes exist only as a rendering source for the PDFs; they duplicate
      // site content and are marked noindex, so keep them out of the sitemap too.
      filter: (page) =>
        page !== 'https://hellotham.com/spotlite/404/' && !page.includes('/spotlite/cv/')
    })
  ]
})
