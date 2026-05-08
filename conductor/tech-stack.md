# Technology Stack

## Core Framework & Language
- **pnpm:** The package manager used for dependency management.
- **Astro:** The primary web framework used for building the static site, leveraging the Content Layer API for data management.
- **TypeScript:** Used throughout the project for static type-checking and improved developer experience. Configured with strict rules and enforced across components, layouts, and tests.

## Styling & UI
- **UnoCSS:** A utility-first CSS engine used for styling, configured with the following presets:
    - `presetWind4`: For utility classes.
    - `presetTypography`: For styling markdown content.
    - `presetIcons`: For integrating Iconify icons.
    - `presetWebFonts`: For loading Google Fonts (Noto Sans, Noto Serif, Noto Sans Mono).

- **Rosely Design System:** A warm, low-contrast design system used for consistent styling across the site.
## Infrastructure & Tools
- **Netlify:** The deployment and hosting platform, configured for Static Site Generation (SSG).
- **@astrojs/sitemap:** Automatically generates XML sitemaps for improved search engine indexing.
- **Sharp:** High-performance image processing library used by Astro for optimized assets.
- **ESLint & Prettier:** For maintaining code quality and consistent formatting. Configured with strict accessibility rules (`jsx-a11y`) and optimized UnoCSS linting.
- **Vitest:** The primary testing framework for unit and component testing. Configured with `jsdom` for DOM manipulation tests and `v8` for code coverage.

## Content Management
- **Astro Content Layer:** Manages structured content from Markdown (`src/content/`) and JSON (`src/*.json`) files, with strict Zod schemas for all collections.
