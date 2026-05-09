# Spotlite - Astro Personal Web Site Template

Spotlite is a modern, production-ready personal website template built with **Astro** and **UnoCSS**. It is designed to be highly performant, easy to customise, and simple to deploy on platforms like Netlify.

## 🛠 Tech Stack

- **Package Manager:** [pnpm](https://pnpm.io/)
- **Framework:** [Astro](https://astro.build) (using Content Layer API)
- **Styling:** [UnoCSS](https://unocss.dev/) with Wind4, Typography, and Icons presets
- **Type Safety:** [TypeScript](https://www.typescriptlang.org/)
- **Linting & Formatting:** [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)
- **Testing:** [Vitest](https://vitest.dev/) with `jsdom` and `v8` coverage
- **Image Processing:** [Sharp](https://sharp.pixelplumbing.com/)
- **Lightbox:** [PhotoSwipe](https://photoswipe.com/) for click-to-zoom image galleries
- **Search Indexing:** [Pagefind](https://pagefind.app/) for static full-site search

## 🚀 Key Commands

| Command | Action |
| :--- | :--- |
| `pnpm install` | Install dependencies |
| `pnpm run dev` | Start local development server (default: `localhost:4321`) |
| `pnpm run build` | Build the production site and generate Pagefind assets in `./dist/pagefind/` |
| `pnpm run search:index` | Run Pagefind indexing against `./dist/` |
| `pnpm run preview` | Preview the production build locally |
| `pnpm run test` | Run the Vitest test suite once |
| `pnpm run test:watch` | Run Vitest in watch mode |
| `pnpm run test:coverage` | Run tests and generate a v8 coverage report |
| `pnpm run lint` | Run both Prettier and ESLint checks with auto-fixes |
| `pnpm run lint:prettier` | Format files with Prettier |
| `pnpm run lint:eslint` | Lint and fix files with ESLint |
| `pnpm run refresh` | Upgrade Astro and all dependencies to latest versions |

## 📂 Project Structure

- `src/pages/`: Contains the site's routes. Uses file-based routing.
- `src/components/`: Reusable Astro components.
- `src/layouts/`: Common page structures (e.g., `Layout.astro`).
- `src/content/`: Source files for content collections (Articles, Projects, Work history).
- `src/assets/`: Dynamic assets processed by Astro (images).
- `public/`: Static assets served directly from the root.
- `src/content.config.ts`: Defines schemas and loaders for content collections.
- `src/components/search.astro`: Header search UI and client logic.
- `src/components/imagecards.astro`: Homepage image card gallery with PhotoSwipe lightbox.
- `src/components/pagecontent.astro`: Featured page image with PhotoSwipe lightbox support.
- `src/pages/api/search.json.ts`: Development fallback search index endpoint.

## 📝 Content Management

This project uses the **Astro Content Layer API** (v6+) for managing data:

- **Articles:** Managed in `src/content/article/` as Markdown files.
- **Projects:** Managed in `src/content/project/` with Markdown and associated images.
- **Work History:** Managed in `src/content/work/` with Markdown and images.
- **Data Collections:** `src/menu.json` and `src/social.json` are loaded as JSON collections.

## 🎨 Styling Conventions

- **UnoCSS:** Use utility classes directly in `.astro` components.
- **Presets:** `presetWind4`, `presetIcons` (Iconify), and `presetTypography` are pre-configured.
- **Custom Config:** Modifications to styling, safelisting, or theme can be made in `uno.config.ts`.

## 🚢 Deployment

The project is pre-configured for **Netlify** via `netlify.toml`. It generates a static site by default (SSG).

## 🔎 Search Behavior

- Production search is powered by Pagefind and generated during `pnpm run build`.
- Local development search falls back to `/api/search.json` so search works even when `/pagefind/*` files are not present.
