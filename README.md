# Spotlite - Personal Web Site Astro Starter

![screenshot](https://github.com/hellotham/spotlite/blob/main/src/assets/screenshot.png?raw=true)

Spotlite is a beautiful personal website template built with Astro and UnoCSS, inspired by
a similar sounding template from the Tailwind CSS team. Best of all, it's open
source (MIT licence) so feel free to use and modify it!

It uses the following technologies:

- [Astro](https://astro.build)
- [TypeScript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Vitest](https://vitest.dev/) for unit and component testing
- [UnoCSS](https://unocss.dev/)
- [D3.js](https://d3js.org/) for interactive data visualisations
- [Mermaid](https://mermaid.js.org/) via `astro-mermaid` for diagrams
- `@astrojs/sitemap` and `@astrojs/rss` preintegrated
- Heroicons and SVG Logos preloaded via [Iconify](https://iconify.design/)
- [Pagefind](https://pagefind.app/) for static full-site search
- [PhotoSwipe](https://photoswipe.com/) for image lightbox galleries
- [Puppeteer](https://pptr.dev/) to render the CV PDFs from dedicated print routes

It features:

- A homepage featuring a profile photo, social links, photo galleries, links to blog
  articles, an interactive career timeline, and interactive superpowers. Its prose is
  edited in Markdown (`src/pages/index.md`).
- An Articles page linking to blog articles.
- A Projects page showcasing a portfolio of items with descriptions, images and
  links.
- A Superpowers page featuring interactive D3 data visualisations and detailed skill modals.
- A Work History page with an animated word cloud of the capabilities, domains and
  technologies across the career, and a detail page per role.
- An Education page with a detail page per qualification.
- A Creations page showcasing linkable artefacts.
- A Passions page providing a list of products and tools used.
- Support for diagrams and flowcharts via Mermaid.
- Header search with Pagefind indexing for production builds.
- Two print-ready CV PDFs generated from the content collections — a one-page résumé
  and a full curriculum vitae.
- Development search fallback powered by a local JSON endpoint.
- Click-to-zoom image galleries on homepage cards and featured page images.

Spotlite uses all the latest and greatest features in Astro (>v7) including:

- optimised assets
- data and content collections
- endpoints
- sitemap
- RSS
- static search indexing

It’s production-ready and easy to customise, making it the perfect starting point for your own personal website.

It is deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── astro.config.mjs
├── package.json
├── uno.config.ts
├── public/
│   ├── cv.pdf               # Generated: full CV
│   ├── cv-onepage.pdf       # Generated: one-page résumé
│   ├── cv-print.css         # Standalone CV stylesheet (not part of the site CSS)
│   ├── robots.txt
│   └── site.webmanifest
├── scripts/
│   └── generate-pdf.js      # Renders the /cv routes to PDF with Puppeteer
└── src/
  ├── components/            # UI components (header, search, D3 charts, modals)
  │   ├── entitylogo.astro   # Shared company/institution mark, all six surfaces
  │   └── wordcloud.astro    # Animated tag cloud on /work
  ├── content/               # Markdown collections (article, page, project, work,
  │                          # education, passion, creation)
  ├── layouts/               # Page layouts, including cv.astro for the print routes
  ├── pages/                 # Routes and API endpoints
  │   ├── [...page].astro
  │   ├── article/[...id].astro
  │   ├── work/[...id].astro
  │   ├── education/[id].astro
  │   ├── cv/                # Print-only routes rendered to PDF (noindex)
  │   │   ├── onepage.astro
  │   │   └── full.astro
  │   ├── api/search.json.ts # Search index used when Pagefind is unavailable
  │   └── rss.xml.js
  ├── utils/
  │   ├── cv.ts              # Deterministic CV curation
  │   └── timeline.ts
  ├── content.config.ts
  ├── config.json            # Site identity
  ├── cv.json                # CV contact details, headline, summary, curation limits
  ├── social.json
  └── superpowers.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                  | Action                                                 |
| :----------------------- | :----------------------------------------------------- |
| `pnpm install`           | Installs dependencies                                  |
| `pnpm run dev`           | Starts local dev server (default: `localhost:4321`)    |
| `pnpm run build`         | Builds site and Pagefind index in `./dist/pagefind/`   |
| `pnpm run pdf`           | Builds, then regenerates both CV PDFs into `./public/` |
| `pnpm run search:index`  | Runs Pagefind indexing against `./dist/`               |
| `pnpm run preview`       | Preview your build locally, before deploying           |
| `pnpm run test`          | Run Vitest test suite once                             |
| `pnpm run test:watch`    | Run Vitest in watch mode                               |
| `pnpm run test:coverage` | Run tests with v8 coverage report                      |
| `pnpm run lint`          | Run Prettier and ESLint with auto-fixes                |
| `pnpm astro ...`         | Run CLI commands like `astro add`, `astro check`       |
| `pnpm astro --help`      | Get help using the Astro CLI                           |

## 📄 CV PDFs

Two documents are generated from the same content collections that drive the site, so
there is a single source of truth — editing `src/content/work/*.md` updates both.

| File                    | Contents                                                                                  |
| :---------------------- | :---------------------------------------------------------------------------------------- |
| `public/cv-onepage.pdf` | Profile, key achievements, most recent roles, condensed earlier career, education, skills |
| `public/cv.pdf`         | Complete history with achievement bullets, education with awards, full competency list    |

Both are single column with selectable text. Multi-column layouts and sidebars are read
out of order by applicant tracking systems, so the design gets its structure from
typography rather than columns.

Run `pnpm run pdf` to regenerate. The one-pager measures itself and scales to fit exactly
one page, failing loudly rather than spilling onto a second; the full CV re-renders
slightly denser if the last page would otherwise carry only a line or two.

To customise:

- `src/cv.json` — contact details, professional headline, summary, key achievements, and
  the one-pager limits (`maxRoles`, `maxBulletsPerRole`, `maxEarlierRoles`).
- Per entry in the `work` and `education` collections: `cvPriority` to promote a role,
  `omitFromCv` to hide one, `oneLiner` for its condensed form.

Curation is deterministic — recency, seniority and those explicit flags. Nothing in the
pipeline rewords a career fact.

Preview either document in the browser at `/cv/onepage/` or `/cv/full/`. Both routes are
`noindex` and excluded from the sitemap and search index.

## 🏷️ Work Tags and the Word Cloud

Each entry in the `work` collection carries an optional `tags` array of capabilities,
domains and technologies. `src/components/wordcloud.astro` aggregates them across the
whole collection and renders the result on `/work/`, sizing each tag by **the number of
roles it appears in** — so the cloud shows where a career actually concentrated rather
than what any one entry claims.

That weighting only works if the vocabulary is reused deliberately between entries.
"Enterprise architecture" appearing in six roles is signal; the same idea spelled
"Enterprise architecture" in one entry and "EA" in another is two tags of weight one.
Distinct tags that happen to look similar (`IT strategy` vs `Technology strategy`) are
fine when the difference is real.

The cloud is decorative: it is `aria-hidden`, and the same tags are published beneath it
as a `sr-only` list with their counts, which is also what the search index picks up. It
honours `prefers-reduced-motion` by settling into a static layout.

## 🔎 Search Notes

- Production and preview builds use Pagefind assets generated during `pnpm run build`.
- Where Pagefind is unavailable, search falls back to `src/pages/api/search.json.ts`.
  That endpoint must cover **every** collection Pagefind indexes from the rendered
  pages: if one is missing, its content is silently unsearchable in that environment
  while production works fine.
- Use `pnpm run build`, not `astro build`. A bare `astro build` clears `dist/` without
  regenerating `dist/pagefind/`, so search quietly drops to the fallback with no error.
