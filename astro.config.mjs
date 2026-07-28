import { defineConfig, fontProviders } from 'astro/config'
import UnoCSS from 'unocss/astro'
import sitemap from '@astrojs/sitemap'
import mermaid from 'astro-mermaid'
import { satteri } from '@astrojs/markdown-satteri'
import { katexPlugin } from './src/utils/katex-mdast.ts'
import { roselyLight, roselyDark } from './src/styles/shiki-rosely.ts'

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
    // Astro 7's default Rust processor. `features.math` parses $...$ and $$...$$ into
    // maths nodes; katexPlugin typesets them at the mdast phase, which is the only phase
    // where they still exist as maths — see src/utils/katex-mdast.ts.
    processor: satteri({
      features: { math: true },
      mdastPlugins: [katexPlugin()]
    }),
    // Rosely syntax highlighting, one palette per colour scheme. `defaultColor: 'light'`
    // inlines the light theme and emits the dark one as --shiki-dark custom properties,
    // which src/styles/mermaid.css swaps in under `.dark` — so code blocks recolour with
    // the page instead of staying dark on a cream background as they did before.
    //
    // Contrast is enforced, not assumed: see src/styles/shiki-rosely.ts and
    // tests/shiki-theme.test.ts. Astro's own default (`github-dark`) put comments at
    // 3.04:1, which is how this started.
    shikiConfig: {
      themes: { light: roselyLight, dark: roselyDark },
      defaultColor: 'light'
    }
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
        /*
         * Pin the drawing width instead of letting Mermaid measure the container.
         *
         * Gantt and xychart size themselves from the element they are rendered into, and
         * that measurement is only correct once layout has settled. astro-mermaid renders
         * from a deferred module, so occasionally it measures too early and falls back to
         * a 300px canvas: the chart comes out squashed, with the bar labels and the axis
         * numbers overlapping each other. It is intermittent, roughly one load in six
         * here, which is why refreshing the page appeared to fix it.
         *
         * A fixed useWidth removes the measurement from the equation. `useMaxWidth` stays
         * on, so the SVG still scales down to whatever column it lands in — the diagram is
         * responsive, its internal geometry just no longer depends on render timing.
         */
        gantt: { useWidth: 1000, useMaxWidth: true },
        xyChart: { width: 900, height: 500 },
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
