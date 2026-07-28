---
title: 'Spotlite: A CV and Portfolio Template for Astro'
pubDate: 2023-05-25
description: An Astro template that generates a professional CV — two print-ready PDFs and a browsable portfolio site — from a single set of Markdown files.
---

![screenshot](../../assets/screenshot.png)

Spotlite generates a professional CV — as two print-ready PDFs and as a browsable site —
from a single set of Markdown files. It began as a personal website template inspired by a
similar sounding one from the Tailwind CSS team, and the portfolio site is still there; but
the CV is now the point. Open source under the MIT licence, so feel free to use and modify
it.

_This article was first written in 2023, when Spotlite was a fairly plain Astro 2 personal
website template. It has grown a great deal since, and its centre of gravity has moved to CV
generation — the description below reflects where it is now._

It uses the following technologies:

- [Astro](https://astro.build)
- [Typescript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Vitest](https://vitest.dev/) for unit and component testing
- [UnoCSS](https://unocss.dev/)
- [D3.js](https://d3js.org/) for interactive data visualisations
- [Mermaid](https://mermaid.js.org/) via `astro-mermaid` for diagrams
- [Pagefind](https://pagefind.app/) for static full-site search
- [PhotoSwipe](https://photoswipe.com/) for image lightbox galleries
- [Puppeteer](https://pptr.dev/) to render CV PDFs from dedicated print routes
- `@astrojs/sitemap` and `@astrojs/rss` preintegrated
- Heroicons and SVG Logos preloaded via [Iconify](https://iconify.design/)

It features:

- A homepage featuring photos, links to blog articles, an interactive career timeline,
  and a superpowers visualisation.
- An About page that can be edited in Markdown and featuring a profile photo
  and social media links.
- An Articles page linking to blog articles.
- A Projects page showcasing a portfolio of items with descriptions, images and
  links.
- A Superpowers page with D3 visualisations and detailed skill modals.
- A Work History page with a word cloud of capabilities and technologies, and a detail
  page per role.
- An Education page with a detail page per qualification.
- A Creations page showcasing linkable artefacts.
- A Passions page providing a list of products and tools used.
- Header search, backed by a Pagefind index built at deploy time.
- Two print-ready CV PDFs generated from the same content collections that drive the
  site — a one-page résumé and a full curriculum vitae.
- Support for diagrams and flowcharts via Mermaid.
- Click-to-zoom image galleries on homepage cards and featured page images.

Spotlite uses all the latest and greatest features in Astro (>v6) including:

- optimised assets
- data and content collections
- endpoints
- sitemap
- RSS
- static search indexing

## Everything comes from the content collections

The idea that has held up best is that there is exactly one source of truth for any fact.
A role lives in `src/content/work` as a Markdown file with frontmatter, and that single
entry feeds the home page timeline, the work list, its own detail page, the search index,
the word cloud, and both CV PDFs. Nothing is written twice, so nothing can disagree with
itself — which matters most for the CV, where a document of record has to match the site
it was generated from.

The CV generation is deliberately deterministic: it curates by recency, seniority and
explicit per-entry flags, and never rewords a career fact. The one-pager measures itself
and scales to fit exactly one page rather than quietly spilling onto a second, and both
documents are single-column with selectable text so applicant tracking systems can parse
them.

It's production-ready and easy to customise, making it a good starting point for anyone who
wants their CV and their portfolio to stay in step.

Deployment is a GitHub Actions workflow that builds the site, generates the Pagefind index
and publishes to GitHub Pages on every push to `main`.
