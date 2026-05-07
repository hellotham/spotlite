# Technology Stack

## Core Framework & Language
- **Astro:** The primary web framework used for building the static site, leveraging the Content Layer API for data management.
- **TypeScript:** Used throughout the project for static type-checking and improved developer experience.

## Styling & UI
- **UnoCSS:** A utility-first CSS engine used for styling, configured with the following presets:
    - `presetWind4`: For utility classes.
    - `presetTypography`: For styling markdown content.
    - `presetIcons`: For integrating Iconify icons.
## Infrastructure & Tools
- **Netlify:** The deployment and hosting platform, configured for Static Site Generation (SSG).
- **Sharp:** High-performance image processing library used by Astro for optimized assets.
- **ESLint & Prettier:** For maintaining code quality and consistent formatting. Configured with strict accessibility rules (`jsx-a11y`) and optimized UnoCSS linting.
- **Vitest:** The primary testing framework for unit and component testing. Configured with `jsdom` for DOM manipulation tests and `v8` for code coverage.

## Content Management
- **Astro Content Layer:** Manages structured content from Markdown (`src/content/`) and JSON (`src/*.json`) files.
