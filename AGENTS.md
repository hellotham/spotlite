# Spotlite - Astro Personal Web Site Template

Spotlite is a modern, production-ready personal website template built with **Astro** and **UnoCSS**. It is designed to be highly performant, easy to customise, and simple to deploy as a static site.

`README.md` documents the project for a human setting it up. This file is for coding agents: what the project is, how it is put together, and — in the Traps section — the specific things that have cost real debugging time. `DESIGN.md` covers the visual system.

## 🎯 What this project is

Two audiences at once, and the tension between them explains most design decisions:

- **A professional record.** Employers and recruiters read the work history, and two CV PDFs are generated from the same content. Career facts are a document of record — nothing in the pipeline may reword, summarise or infer one.
- **A reusable MIT-licensed template.** Anything hard-coded to one person's biography is a defect in the template. Content lives in collections; the code stays generic.

Tone is professional but not corporate-bland. All prose is **Australian English**.

## 🛠 Tech Stack

- **Package Manager:** [pnpm](https://pnpm.io/) — pinned via `packageManager`; never npm or yarn
- **Framework:** [Astro](https://astro.build) 7, static output, `base: '/spotlite/'`, Content Layer API
- **Styling:** [UnoCSS](https://unocss.dev/) with Wind4, Typography, and Icons presets
- **Fonts:** Astro's `fonts` integration via the fontsource provider (Noto Sans / Serif / Sans Mono)
- **Type Safety:** [TypeScript](https://www.typescriptlang.org/), `astro/tsconfigs/strict`
- **Linting & Formatting:** [ESLint](https://eslint.org/) (flat config, `jsx-a11y` strict) and [Prettier](https://prettier.io/)
- **Testing:** [Vitest](https://vitest.dev/) with `jsdom` and `v8` coverage
- **Image Processing:** [Sharp](https://sharp.pixelplumbing.com/)
- **Lightbox:** [PhotoSwipe](https://photoswipe.com/) for click-to-zoom image galleries
- **Visualisations:** [D3.js](https://d3js.org/) for interactive data-driven components and [Mermaid](https://mermaid.js.org/) via `astro-mermaid` for diagrams
- **Maths:** `remark-math` + `rehype-katex`, rendered at build time; `@astrojs/markdown-remark` supplies the unified processor they need
- **Search Indexing:** [Pagefind](https://pagefind.app/) for static full-site search
- **PDF Generation:** [Puppeteer](https://pptr.dev/) driving dedicated print-only routes

**Not Netlify.** Support was deliberately removed — do not reintroduce it.

## 🚀 Key Commands

| Command                  | Action                                                          |
| :----------------------- | :-------------------------------------------------------------- |
| `pnpm install`           | Install dependencies (postinstall fetches Chrome for Puppeteer) |
| `pnpm run dev`           | Start local development server (default: `localhost:4321`)      |
| `pnpm run build`         | Build production site **and** the Pagefind index                |
| `pnpm run pdf`           | Build, then regenerate both CV PDFs into `./public/`            |
| `pnpm run search:index`  | Run Pagefind indexing against `./dist/`                         |
| `pnpm run preview`       | Preview the production build locally                            |
| `pnpm run test`          | Run the Vitest test suite once                                  |
| `pnpm run test:watch`    | Run Vitest in watch mode                                        |
| `pnpm run test:coverage` | Run tests and generate a v8 coverage report                     |
| `pnpm run lint`          | Run both Prettier and ESLint checks with auto-fixes             |
| `pnpm astro check`       | Type and diagnostic check across `.astro` files                 |
| `pnpm run refresh`       | Upgrade Astro and all dependencies to latest versions           |

Note that `build` does **not** generate the PDFs — that is `pnpm run pdf`.

Before calling any change done: `pnpm lint && pnpm astro check && pnpm test && pnpm build`. If you touched content, `src/cv.json` or `src/utils/cv.ts`, run `pnpm run pdf` as well — the PDFs are committed and go stale silently.

Prefer non-interactive commands. Watch-mode tools need `CI=true` or their single-run form.

## 📂 Project Structure

- `src/pages/`: Site routes. File-based routing.
- `src/components/`: Reusable Astro components (including D3 charts and modals).
- `src/layouts/`: Page structures. `layout.astro` is the shell every page passes through; the rest are per-section.
- `src/content/`: Source files for content collections.
- `src/assets/`: Dynamic assets processed by Astro (images).
- `public/`: Static assets served directly, copied verbatim into the build.
- `scripts/generate-pdf.js`: Renders the `/cv/` routes to PDF with Puppeteer.
- `src/content.config.ts`: Schemas and loaders for content collections.
- `src/utils/cv.ts`: Deterministic CV curation.
- `src/utils/timeline.ts`: Normalises work and education into timeline entries.
- `src/components/entitylogo.astro`: Shared company/institution mark across all six surfaces.
- `src/components/wordcloud.astro`: Animated tag cloud on `/work`.
- `src/components/search.astro`: Header search UI and client logic.
- `src/pages/api/search.json.ts`: Fallback search index endpoint.
- `tests/`: 26 Vitest files. Several assert against built output in `dist/`, so a broken build fails tests.

## 📝 Content Management

This project uses the **Astro Content Layer API**. Collections are `article`, `project`, `work`, `education`, `social`, `page`, `creation`, `passion`, all with strict Zod schemas in `src/content.config.ts`.

Navigation is **inferred from the `page` collection** (`order`, `shorttitle`), so adding a page is a Markdown file, not a route. There is no menu data file.

Structured non-Markdown data lives in `src/social.json`, `src/superpowers.json`, `src/config.json` (site identity) and `src/cv.json` (CV contact details, headline, summary, curation limits).

Fields worth understanding before you edit them:

- **`work.tags`** — feeds the `/work` word cloud, where a tag's size is _how many roles carry it_. That only works if the vocabulary is reused deliberately across entries; rewording per entry silently destroys the weighting.
- **`description`** on `work` and `education` — the list-page teaser and the detail page's meta description. Without it the fallback takes the body's first line, which produced fragments like "Awarded".
- **`image` / `logo` / `logoBackground`** — square mark, extended wordmark, and the tile colour that makes a mark read as a seamless circle. All optional; a missing `image` falls back to an initials monogram.
- **`cvPriority` / `omitFromCv` / `oneLiner`** — CV curation only. The site ignores them.

### The CV pipeline

`src/utils/cv.ts` builds both documents from the same collections that drive the site, so there is one source of truth for every career fact. **Curation is deterministic and must stay that way** — recency, seniority, and the explicit per-entry flags above. Editorial copy lives in `src/cv.json` where a human can review it.

`scripts/generate-pdf.js` serves `dist` over a local HTTP server and drives Puppeteer. The one-pager measures itself and scales to fit exactly one page, **failing loudly** below 80% rather than spilling onto a second. The full CV re-renders denser if the last page would otherwise carry only a line or two. `public/cv-print.css` is deliberately outside the site's CSS pipeline and deliberately contains no `@media` blocks.

Both PDFs are committed, because `public/` is copied verbatim into the build and the site links to them.

## ⚠️ Traps

Each of these was a real debugging session. They are documented at their call sites too.

### The `.astro` cache lies to you

Adding a frontmatter field or editing `src/content.config.ts` will **not** appear in dev, and **restarting the dev server is not enough**:

```bash
rm -rf .astro
```

If components come back blank instead, Vite's cache is also stale and is never touched by clearing `.astro`:

```bash
rm -rf .astro node_modules/.vite
```

### `pnpm build`, never bare `astro build`

`astro build` wipes `dist/` without regenerating `dist/pagefind/`. Search then silently falls back to the JSON endpoint, with no error anywhere.

### UnoCSS resolves variants before shortcuts

A shortcut named `<variant>-<utility>` never fires — the variant wins, and your shortcut is dead code that produces no CSS and no error. `focus-ring` parsed as `focus:` + `ring` and emitted a 1px `currentColor` ring instead of the declared 2px accent focus-visible ring, on eleven elements. `hover-accent` parsed as `hover:` + a non-utility and emitted **nothing at all**.

Component shortcuts are therefore prefixed **`ui-`** (`ui-focus-ring`, `ui-hover-accent`), because `ui-` is not a variant. Renaming them back reintroduces the bug silently. After changing a shortcut, confirm it emitted:

```bash
grep -o "\.ui-focus-ring[^{]*{[^}]*}" dist/_astro/*.css
```

### Scoped `<style>` does not reach script-created DOM

Astro scopes styles by stamping an attribute onto elements **in the template**. Anything D3 creates at runtime never gets it, so scoped rules never match. Use `<style is:global>` with every selector anchored to a component-owned `id`.

### ClientRouter re-runs every inline script

View transitions swap the DOM on navigation, so `dataset.initialized` guards cannot see the previous element, and listeners on `document`/`window`, `requestAnimationFrame` loops and `IntersectionObserver`s **survive the swap** and keep writing into detached nodes.

Every component with an inline script must tear down:

```js
document.addEventListener('astro:before-swap', () => {
  teardown?.()
  teardown = null
})
```

Prefer an `AbortController` with `{ signal }` on each listener so one `abort()` drops the lot. `d3bubblechart.astro` is the reference implementation.

### The search fallback must match Pagefind's coverage

`src/pages/api/search.json.ts` must index **every** collection Pagefind picks up from rendered pages. When it drifted, four collections were unsearchable in dev while production worked perfectly — searching "swift" or "servicenow" returned nothing.

### `astro-mermaid` keys off `data-theme`, not a class

The site's theme is a `.dark` class, but the integration watches `html[data-theme]`. Both are set, in `layout.astro`'s pre-paint script and in `theme.astro` — keep them in step, or diagrams render light-themed on a dark background with near-black text.

The integration also double-initialises on load and can overwrite a diagram's stored source with its own rendered SVG, which only fails later when a re-render is requested. `layout.astro` stamps `data-diagram` during parse to pre-empt this. Don't remove that script.

### Remark and rehype plugins need `@astrojs/markdown-remark`

Astro 7 ships a new default Markdown processor, and `markdown.remarkPlugins` /
`markdown.rehypePlugins` are silently unsupported by it — the build fails outright with a
message telling you to install `@astrojs/markdown-remark`. Installing that package swaps
the whole site back to the unified processor, so treat it as a site-wide change and
re-check existing pages, not just the one you added a plugin for.

### Shiki's default theme fails contrast on comments

Astro's default `github-dark` renders comments at #6a737d on #24292e — 3.05:1, below the
4.5:1 that body text requires, and a code comment is prose. `shikiConfig.theme` is set to
`github-dark-default`, which takes the same tokens to 6.15:1. This only shows up on pages
with substantial commented code, so it can hide for a long time.

### SVG has no intrinsic size without width/height

An SVG declaring only a `viewBox` collapses to 0×0 under `h-auto w-auto`. Always set a definite dimension on one axis and let the other follow — this is why `entitylogo.astro` passes only `height`.

## 🎨 Styling Conventions

- **UnoCSS:** Use utility classes directly in `.astro` components.
- **Presets:** `presetWind4`, `presetIcons` (Iconify), and `presetTypography` are pre-configured.
- **Custom Config:** Theme, shortcuts, safelist and preflights in `uno.config.ts`.
- **Theme:** The **Rosely** palette (warm, low-contrast). See `DESIGN.md`.

## 🧑‍💻 Code Conventions

**Formatting is Prettier's job** (`prettier.config.cjs`): single quotes, **no semicolons**, no trailing commas, 100 columns, 2-space indent, and double quotes in CSS. Don't hand-format — run `pnpm lint`.

**Naming:** `UpperCamelCase` for types and interfaces, `lowerCamelCase` for variables and functions, `CONSTANT_CASE` for module-level constants. Kebab-case filenames.

**Language:** `const` by default, `let` only when reassigned, never `var`. Strict equality. Avoid `any` — prefer `unknown` or a real type. Avoid type assertions and non-null assertions; where one is unavoidable, justify it in a comment.

**Comments explain _why_.** The prevailing style is a short comment naming the failure the code prevents, not a restatement of what the line does. Match it — several traps above are documented at their call sites precisely so they don't recur.

**Simplicity and consistency win.** Follow existing patterns; prefer the simple solution; minimise coupling and dependencies.

## ♿ Accessibility

A requirement, not a polish pass. Target is **WCAG 2.2 Level AA**. In practice:

- Semantic landmarks and a logical heading hierarchy with no skipped levels.
- Every interactive element keyboard-operable, with a visible focus ring (`ui-focus-ring`).
- `prefers-reduced-motion` honoured by **JavaScript animation too** — the CSS preflight only tames CSS transitions; a `requestAnimationFrame` loop keeps running regardless.
- Anything that moves indefinitely needs a pause control (WCAG 2.2.2).
- Decorative images inside a labelled link take `alt=''`; don't repeat the link text.
- Hover-revealed content must be dismissible without moving the pointer (Escape).
- Contrast checked against the actual background, per theme — a token that passes on cream usually fails on near-black.
- Never use colour as the sole carrier of meaning.

## 🧪 Testing

Vitest, 26 files, `jsdom` environment. Tests cover collection contracts, routing, base-path handling, component behaviour, the search endpoint, the RSS route, the PDF script and the generated PDFs themselves.

Write the test first where you can, and add one whenever you fix a bug a test could have caught. Aim for >80% coverage on new code (`pnpm run test:coverage`).

## 🚢 Deployment

Deployed to **GitHub Pages** via `.github/workflows/deploy.yml` (`withastro/action`) on every push to `main`. Static output served from the `/spotlite/` base path.

**The repository is public.** Anything committed is published, including git history — do not commit personal data.

## 🔎 Search Behaviour

- Production and preview search is powered by Pagefind, generated during `pnpm run build`.
- Where Pagefind assets are absent, search falls back to `/api/search.json`.
- `src/pages/cv/*` are print-only routes: `noindex`, and excluded from both the sitemap and the search index.
