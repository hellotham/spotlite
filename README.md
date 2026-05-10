# Spotlite - Personal Web Site Astro Starter

![screenshot](https://github.com/hellotham/spotlite/blob/main/src/assets/screenshot.png?raw=true)

Spotlite is a beautiful personal website template built with Astro and UnoCSS, inspired by
a similar sounding template from the Tailwind CSS team. Best of all, it's open
source (MIT licence) so feel free to use and modify it!

[![Deploy To Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/hellotham/spotlite&utm_medium=social&utm_source=github)

It uses the following technologies:

- [Astro](https://astro.build)
- [Typescript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Vitest](https://vitest.dev/) for unit and component testing
- [UnoCSS](https://unocss.dev/)
- [D3.js](https://d3js.org/) for interactive data visualisations
- `@astrojs/sitemap` and `@astrojs/rss` preintegrated
- Heroicons and SVG Logos preloaded via [Iconify](https://iconify.design/)
- [Pagefind](https://pagefind.app/) for static full-site search
- [PhotoSwipe](https://photoswipe.com/) for image lightbox galleries

It features:

- A homepage featuring photos, links to blog articles, career history, and interactive superpowers.
- An About page that can be edited in Markdown and featuring a profile photo
  and social media links.
- An Articles page linking to blog articles.
- A Projects page showcasing a portfolio of items with descriptions, images and
  links.
- A Superpowers page featuring interactive D3 data visualisations and detailed skill modals.
- A Creations page showcasing linkable artefacts.
- A Passions page providing a list of products and tools used.
- Header search with Pagefind indexing for production builds.
- Automated CV PDF generation from content collections.
- Development search fallback powered by a local JSON endpoint.
- Click-to-zoom image galleries on homepage cards and featured page images.

Spotlite uses all the latest and greatest features in Astro (>v6) including:

- optimised assets
- data and content collections
- endpoints
- sitemap
- RSS
- static search indexing

It’s production-ready and easy to customise, making it the perfect starting point for your own personal website.

It's also simple to deploy on Netlify or similar.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── astro.config.mjs
├── netlify.toml
├── package.json
├── uno.config.ts
├── public/
│   ├── robots.txt
│   └── site.webmanifest
├── scripts/                # Utility scripts (e.g. PDF generation)
└── src/
  ├── components/           # UI components (header, search, D3 charts, modals)
  ├── content/              # Markdown collections (article, page, project, work, education)
  ├── layouts/              # Page layouts
  ├── pages/                # Routes and API endpoints
  │   ├── [...page].astro
  │   ├── article/[...id].astro
  │   ├── api/search.json.ts
  │   └── rss.xml.js
  ├── content.config.ts
  ├── menu.json
  ├── social.json
  └── superpowers.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server (default: `localhost:4321`) |
| `pnpm run build`           | Builds site, generates PDF, and Pagefind index in `./dist/pagefind/` |
| `pnpm run pdf`             | Manually trigger CV PDF generation               |
| `pnpm run search:index`    | Runs Pagefind indexing against `./dist/`         |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run test`            | Run Vitest test suite once                        |
| `pnpm run test:watch`      | Run Vitest in watch mode                          |
| `pnpm run test:coverage`   | Run tests with v8 coverage report                 |
| `pnpm run lint`            | Run Prettier and ESLint with auto-fixes           |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |

## 🔎 Search Notes

- Production and preview builds use Pagefind assets generated during `pnpm run build`.
- During local development, search falls back to `src/pages/api/search.json.ts` so search still works without prebuilt Pagefind files.
