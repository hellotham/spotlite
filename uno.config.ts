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
      spearmint: '#64bfa4',
      aquarius: '#3CADD4',
      meadowlark: '#eada4f',
      // Semantic color mappings
      primary: 'var(--color-primary, #27272a)',
      secondary: 'var(--color-secondary, #615f5f)',
      accent: 'var(--color-accent, #ec809e)',
      muted: 'var(--color-muted, #a49e9e)',
      border: '#a49e9e', // Opal Gray
    }
  },
  shortcuts: {
    // Glass morphism effect
    'glass': 'bg-sugarSwizzle/90 backdrop-blur ring-1 ring-opalGray/20 shadow-md dark:bg-blackBeauty/90 dark:ring-opalGray/20',
    'glass-hover': 'glass hover:ring-opalGray/30 transition',
    
    // Text colors
    'text-primary': 'text-blackBeauty dark:text-sugarSwizzle',
    'text-secondary': 'text-graniteGray dark:text-opalGray',
    'text-accent': 'text-morningGloryDark dark:text-morningGlory',
    'text-muted': 'text-opalGray dark:text-graniteGray',
    
    // Border colors
    'border-primary': 'border-border dark:border-border/40',
    
    // Button styles
    'btn-base': 'px-3 py-2 rounded-md font-medium transition inline-flex items-center justify-center gap-2',
    'btn-primary': 'btn-base text-sugarSwizzle bg-blackBeauty dark:bg-grapeade hover:bg-grapeade dark:hover:bg-grapeade/80 active:text-sugarSwizzle/70',
    'btn-secondary': 'btn-base text-primary border border-primary hover:bg-morningGlory/10',
    'btn-ghost': 'btn-base text-primary hover:text-accent',
    'btn-sm': 'btn-base text-xs px-2 py-1',
    
    // Input styles
    'input-base': 'px-3 py-2 rounded-md border border-border/10 bg-sugarSwizzle dark:bg-blackBeauty/15 text-primary placeholder:text-secondary focus:outline-none focus:border-morningGlory focus:ring-4 focus:ring-morningGlory/10 transition',
    
    // Card styles
    'card': 'rounded-lg border border-primary bg-white dark:bg-blackBeauty shadow-sm',
    'card-hover': 'card hover:shadow-md hover:-translate-y-0.5 transition-all',
    'card-interactive': 'card cursor-pointer transition hover:shadow-md hover:-translate-y-1',
    
    // Container styles
    'surface': 'bg-sugarSwizzle dark:bg-blackBeauty',
    'surface-subtle': 'bg-sugarSwizzle/50 dark:bg-blackBeauty/50',
    
    // Interactive states
    'hover-accent': 'hover:text-accent transition',
    'focus-ring': 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morningGlory focus-visible:ring-offset-2 dark:focus-visible:ring-offset-blackBeauty',
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
    presetTypography()
  ],
  preflights: [
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
