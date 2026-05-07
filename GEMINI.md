# Spotlite - Astro Personal Web Site Template

Spotlite is a modern, production-ready personal website template built with **Astro**, **Alpine.js**, and **UnoCSS**. It is designed to be highly performant, easy to customise, and simple to deploy on platforms like Netlify.

## 🛠 Tech Stack

- **Framework:** [Astro](https://astro.build) (using Content Layer API)
- **Styling:** [UnoCSS](https://unocss.dev/) with Wind4, Typography, and Icons presets
- **Interactivity:** [Alpine.js](https://alpinejs.dev/)
- **Type Safety:** [TypeScript](https://www.typescriptlang.org/)
- **Linting & Formatting:** [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)
- **Image Processing:** [Sharp](https://sharp.pixelplumbing.com/)

## 🚀 Key Commands

| Command | Action |
| :--- | :--- |
| `pnpm install` | Install dependencies |
| `pnpm run dev` | Start local development server (default: `localhost:4321`) |
| `pnpm run build` | Build the production site to `./dist/` |
| `pnpm run preview` | Preview the production build locally |
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
