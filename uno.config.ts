import { defineConfig, presetIcons, presetTypography, presetWind4 } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      // Rosely palette - Greys
      blackBeauty: '#27272a',
      graniteGray: '#615f5f',
      opalGray: '#a49e9e',
      sugarSwizzle: '#f4eee8',
      // Rosely palette - Pinks
      morningGlory: '#ec809e',
      roseQuartz: '#f7caca',
      barelyPink: '#F8D7DD',
      heavenlyPink: '#f4dede',
      // Rosely palette - Purples
      grapeade: '#85677b',
      radiantOrchid: '#b565a7',
      lupine: '#be9cc1',
      lavenderFog: '#D2C4D6',
      // Rosely palette - Colourful
      raspberrySorbet: '#d2386c',
      morningGloryDark: '#c02d5a', // Darker pink for light mode text contrast
      // Darker grapeade for the dark-mode primary button. Sugar Swizzle on plain
      // grapeade measures 4.31:1 — just under the 4.5:1 button text needs. Same
      // pattern, and same reason, as morningGloryDark above.
      grapeadeDark: '#7a5e70',
      spearmint: '#64bfa4',
      aquarius: '#3CADD4',
      meadowlark: '#eada4f',
      // Semantic color mappings
      primary: 'var(--color-primary, #27272a)',
      secondary: 'var(--color-secondary, #615f5f)',
      accent: 'var(--color-accent, #ec809e)',
      muted: 'var(--color-muted, #a49e9e)',
      border: '#a49e9e' // Opal Gray
    }
  },
  shortcuts: {
    // Glass morphism effect
    glass:
      'bg-sugarSwizzle/90 backdrop-blur ring-1 ring-opalGray/20 shadow-md dark:bg-blackBeauty/90 dark:ring-opalGray/20',
    'glass-hover': 'glass hover:ring-opalGray/30 transition',

    // Text colors
    'text-primary': 'text-blackBeauty dark:text-sugarSwizzle',
    'text-secondary': 'text-graniteGray dark:text-opalGray',
    'text-accent': 'text-morningGloryDark dark:text-morningGlory',
    'text-muted': 'text-opalGray dark:text-graniteGray',

    // Border colors
    'border-primary': 'border-border dark:border-border/40',

    // Button styles
    'btn-base':
      'px-3 py-2 rounded-md font-medium transition inline-flex items-center justify-center gap-2',
    'btn-primary':
      'btn-base text-sugarSwizzle bg-blackBeauty dark:bg-grapeadeDark hover:bg-grapeade dark:hover:bg-grapeade active:text-sugarSwizzle/70',
    // An outline button's border is its only boundary, so it has to meet WCAG 1.4.11's
    // 3:1 for non-text contrast on its own. The shared `border-primary` token is
    // #a49e9e, which is 2.6:1 on the light card and 2.1:1 on the dark one — fine for a
    // decorative card edge, not for the sole affordance of a control.
    'btn-secondary':
      'btn-base text-primary border border-graniteGray dark:border-opalGray hover:bg-morningGlory/10',
    'btn-ghost': 'btn-base text-primary hover:text-accent',
    // `!` on the size overrides: btn-sm composes btn-base and is itself composed with
    // btn-secondary, which re-expands btn-base's px-3 py-2. Same specificity, so the
    // later rule won and the "small" button rendered at full size.
    'btn-sm': 'btn-base text-xs px-2! py-1!',

    // Input styles
    // Focus uses the shared ui-focus-ring rather than removing the outline in favour of
    // a 10%-opacity ring, which was too faint to serve as a focus indicator.
    'input-base':
      'px-3 py-2 rounded-md border border-border/40 bg-sugarSwizzle dark:bg-blackBeauty/15 text-primary placeholder:text-secondary ui-focus-ring focus:border-morningGlory transition',

    // Card styles
    card: 'rounded-lg border border-primary bg-white dark:bg-blackBeauty shadow-sm',
    'card-hover': 'card hover:shadow-md hover:-translate-y-0.5 transition-all',
    'card-interactive': 'card cursor-pointer transition hover:shadow-md hover:-translate-y-1',

    // Container styles
    surface: 'bg-sugarSwizzle dark:bg-blackBeauty',
    'surface-subtle': 'bg-sugarSwizzle/50 dark:bg-blackBeauty/50',

    // Interactive states.
    //
    // The `ui-` prefix is load-bearing, not decoration. UnoCSS resolves `<variant>-<utility>`
    // before it consults the shortcut table, so the obvious names silently lost: `focus-ring`
    // parsed as the `focus:` variant applied to `ring`, emitting a 1px currentColor ring on
    // :focus instead of the 2px accent focus-visible ring declared here — and `hover-accent`
    // parsed as `hover:` + `accent`, which is not a utility, so it emitted nothing at all and
    // the theme menu rows had no hover affordance. `ui-` is not a variant, so these resolve as
    // shortcuts. Renaming either one back will reintroduce the bug without any build error.
    'ui-hover-accent': 'hover:text-accent transition',
    // morningGlory (#ec809e) is only 2.2:1 on the light surface — below the 3:1 WCAG 1.4.11
    // requires of a focus indicator, and it is the sole replacement for the outline suppressed
    // on the line above. The palette already carries a darker variant for exactly this.
    'ui-focus-ring':
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morningGloryDark focus-visible:ring-offset-2 dark:focus-visible:ring-morningGlory dark:focus-visible:ring-offset-blackBeauty'
  },
  presets: [
    presetWind4({
      preflights: {
        reset: true
      }
    }),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    }),
    presetTypography({
      cssExtend: {
        // presetTypography wraps every inline <code> in literal backticks via
        // ::before/::after content. On a page that names `crypt()`, `login(1)` and
        // `/etc/passwd` in nearly every sentence that reads as noise, and the marks are
        // redundant once the code is already set in mono on a tinted background.
        'code::before': { content: 'none' },
        'code::after': { content: 'none' }
      }
    })
  ],
  preflights: [
    {
      // The semantic colours below are declared as var(--color-*, fallback). Nothing
      // defined those variables, so the fallback always won and opacity variants such
      // as `border-primary/30` stayed near-black in dark mode, where they are all but
      // invisible. Defining them here makes the semantic tokens theme-aware.
      getCSS: () => `
        :root {
          --color-primary: #27272a;
          --color-secondary: #615f5f;
          --color-accent: #c02d5a;
          --color-muted: #a49e9e;
        }
        .dark {
          --color-primary: #f4eee8;
          --color-secondary: #a49e9e;
          --color-accent: #ec809e;
          --color-muted: #615f5f;
        }
      `
    },
    {
      getCSS: () => `
        @media (prefers-reduced-motion: reduce) {
          *, ::before, ::after {
            animation-delay: -1ms !important;
            animation-duration: 1ms !important;
            animation-iteration-count: 1 !important;
            background-attachment: initial !important;
            scroll-behavior: auto !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
          }
        }
      `
    }
  ],
  safelist: [
    'rotate-2',
    '-rotate-2',
    'animate-fade-in-up',
    '[animation-delay:200ms]',
    '[animation-delay:400ms]',
    'i-simple-icons-x',
    'i-simple-icons-facebook',
    'i-simple-icons-instagram',
    'i-simple-icons-github',
    'i-simple-icons-linkedin'
  ]
})
