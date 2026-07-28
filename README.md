# Spotlite — CV and Portfolio Template for Astro

![screenshot](https://github.com/hellotham/spotlite/blob/main/src/assets/screenshot.png?raw=true)

Spotlite generates a **professional CV — as two print-ready PDFs and as a browsable site —
from a single set of Markdown files**. Write each role once; the one-page résumé, the full
curriculum vitae, the work history pages, the career timeline and the search index all
follow from it.

Built with Astro and UnoCSS, and open source under the MIT licence.

**Fork it, clear out the demo content, and make it yours.** The live demo is
[hellotham.com/spotlite](https://hellotham.com/spotlite/) — everything you see there, including
the CV PDFs, is generated from the Markdown files in `src/content/`.

## Why it works this way

A CV is a document of record. The failure mode of maintaining one is drift: the PDF you
email says something different from the site you link to, because you updated one and not
the other.

Spotlite removes the opportunity. `src/content/work/*.md` is the only place a role exists,
and **curation is deterministic** — recency, seniority, and explicit per-entry flags.
Nothing in the pipeline rewords, summarises or infers a career fact; editorial copy lives in
`src/cv.json` where a human can review it.

The PDFs are built for applicant tracking systems as well as people: single column,
selectable text, no layout tables. Multi-column CVs and sidebars are read out of order by
ATS parsers, so the design takes its structure from typography instead.

## The two documents

| File                    | Contents                                                                                  |
| :---------------------- | :---------------------------------------------------------------------------------------- |
| `public/cv-onepage.pdf` | Profile, key achievements, most recent roles, condensed earlier career, education, skills |
| `public/cv.pdf`         | Complete history with achievement bullets, education with awards, full competency list    |

Run `pnpm run pdf` to regenerate. The one-pager measures itself and scales to fit exactly one
page, **failing loudly** rather than spilling onto a second; the full CV re-renders slightly
denser if the last page would otherwise carry only a line or two.

To customise:

- `src/cv.json` — contact details, professional headline, summary, key achievements, and the
  one-pager limits (`maxRoles`, `maxBulletsPerRole`, `maxEarlierRoles`).
- Per entry in the `work` and `education` collections: `cvPriority` to promote a role,
  `omitFromCv` to hide one, `oneLiner` for its condensed form.

Preview either document in the browser at `/cv/onepage/` or `/cv/full/`. Both routes are
`noindex` and excluded from the sitemap and search index.

## The site around it

The same collections drive a portfolio site, so a recruiter following the link finds the
detail the PDF had to leave out:

- **Work History** — every role, with an animated word cloud of the capabilities, domains and
  technologies across the career, and a detail page per role.
- **Education** — qualifications with a detail page each.
- **Superpowers** — self-assessed competencies as interactive D3 visualisations, with detail
  modals. Feeds the CV's competency list.
- **Home** — profile photo, social links, photo galleries, an interactive career timeline, and
  the key achievements that open the CV. Prose is edited in `src/pages/index.md`; the
  fork-this-template card at the foot is `src/components/templatecta.astro`, and is the first
  thing to delete when you make the site your own.
- **Articles** — long-form writing, with Mermaid diagrams and KaTeX maths available.
- **Projects**, **Creations**, **Passions** — portfolio items, linkable artefacts, and tools of
  the trade.
- **Search** across the lot, via a Pagefind index built at deploy time.

## Built with

- [Astro](https://astro.build) (v7, Sätteri Markdown processor)
- [TypeScript](https://www.typescriptlang.org/)
- [UnoCSS](https://unocss.dev/)
- [Puppeteer](https://pptr.dev/) to render the CV PDFs from dedicated print routes
- [Vitest](https://vitest.dev/) for unit and component testing
- [D3.js](https://d3js.org/) for interactive data visualisations
- [Mermaid](https://mermaid.js.org/) via `astro-mermaid` for diagrams
- [KaTeX](https://katex.org/) for maths in Markdown, rendered at build time and self-hosted
- [Pagefind](https://pagefind.app/) for static full-site search
- [PhotoSwipe](https://photoswipe.com/) for image lightbox galleries
- [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/)
- `@astrojs/sitemap` and `@astrojs/rss` preintegrated
- Heroicons and SVG Logos preloaded via [Iconify](https://iconify.design/)

Astro features used throughout: optimised assets, content collections, endpoints, sitemap, RSS
and static search indexing. Accessibility is treated as a requirement rather than a polish
pass — see `DESIGN.md`.

It is deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## 🚀 Project Structure

```text
/
├── astro.config.mjs
├── package.json
├── uno.config.ts
├── AGENTS.md                 # Working notes for coding agents, incl. known traps
├── DESIGN.md                 # The Rosely design system
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
  ├── styles/
  │   ├── mermaid.css        # Rosely theme for diagrams, both schemes
  │   └── shiki-rosely.ts    # Rosely syntax highlighting, light and dark
  ├── utils/
  │   ├── cv.ts              # Deterministic CV curation
  │   ├── katex-mdast.ts     # Build-time maths rendering
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

Note that `build` does **not** regenerate the PDFs — that is `pnpm run pdf`.

## 🏷️ Work Tags and the Word Cloud

Each entry in the `work` collection carries an optional `tags` array of capabilities, domains
and technologies. `src/components/wordcloud.astro` aggregates them across the whole collection
and renders the result on `/work/`, sizing each tag by **the number of roles it appears in** —
so the cloud shows where a career actually concentrated rather than what any one entry claims.

That weighting only works if the vocabulary is reused deliberately between entries.
"Enterprise architecture" appearing in six roles is signal; the same idea spelled "Enterprise
architecture" in one entry and "EA" in another is two tags of weight one. Distinct tags that
happen to look similar (`IT strategy` vs `Technology strategy`) are fine when the difference is
real.

The cloud is decorative: it is `aria-hidden`, and the same tags are published beneath it as an
`sr-only` list with their counts, which is also what the search index picks up. It honours
`prefers-reduced-motion` by settling into a static layout.

## 📐 Responsive and Contrast Bar

The site is verified from **320px to 1536px in both colour schemes**: nothing may extend past
the viewport at any width, and all text meets WCAG AA against its actual background.

Two things make this easy to get wrong, and both are worth knowing before you change layout:

- `html` clips horizontal overflow, so a page broken at 320px still _looks_ composed — the
  excess is sliced off the right edge with no scrollbar. Compare `documentElement.scrollWidth`
  against `clientWidth` rather than trusting your eyes.
- The theme is authored in `oklch`, so `getComputedStyle().color` returns `oklch(...)`. Reading
  those numbers as RGB produces confident nonsense. Resolve colours by painting them to a
  canvas and reading the pixel back.

Content that genuinely cannot fit a narrow column gets its own `overflow-x: auto` box — code
blocks, diagrams and prose tables all do — so it scrolls inside itself instead of pushing the
page.

## 🔎 Search Notes

- Production and preview builds use Pagefind assets generated during `pnpm run build`.
- Where Pagefind is unavailable, search falls back to `src/pages/api/search.json.ts`. That
  endpoint must cover **every** collection Pagefind indexes from the rendered pages: if one is
  missing, its content is silently unsearchable in that environment while production works fine.
- Use `pnpm run build`, not `astro build`. A bare `astro build` clears `dist/` without
  regenerating `dist/pagefind/`, so search quietly drops to the fallback with no error.
