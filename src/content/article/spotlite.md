---
title: 'Spotlite: three years, two AI agents, and a CV that maintains itself'
pubDate: 2026-07-28
description: How a small hand-coded Astro template from 2023 became a CV generator — rebuilt in 2026 first with Google Antigravity, then with Claude Code.
---

![screenshot](../../assets/screenshot.png)

The site you are reading is built with [Spotlite](https://github.com/hellotham/spotlite), an
Astro template I first wrote in May 2023. It has changed almost beyond recognition since,
and most of that change happened in 2026, in two bursts, neither of which I typed myself.

This is the story of what it was, what it is now, and what it was like to hand a codebase to
an AI agent — twice.

## What it does now

Spotlite generates a **professional CV — two print-ready PDFs and a browsable site — from a
single set of Markdown files**. A role lives in exactly one place, `src/content/work/`, and
from there it feeds the one-page résumé, the full curriculum vitae, the work history pages,
the career timeline, the word cloud and the search index.

That single-source rule is the whole idea. A CV is a document of record, and the failure mode
of keeping one is drift: the PDF you email says something different from the site you link
to, because you updated one and forgot the other. If there is only one copy of each fact,
that cannot happen.

The curation is deliberately mechanical — recency, seniority, and a few explicit per-entry
flags. Nothing in the pipeline rewords or infers a career fact. The one-pager measures itself
and scales to fit exactly one page, failing loudly rather than quietly spilling onto a second.
Both PDFs are single column with selectable text, because multi-column CVs and sidebars get
read out of order by applicant tracking systems.

## 2023: hand-coded

The original was a weekend project. Eleven commits in May 2023 took it from `Initial commit`
to something I was happy to put my name on: Astro 2, UnoCSS, Alpine.js for the interactive
bits, and a layout inspired by a similar-sounding template from the Tailwind CSS team. It was
a personal website template, and a fairly plain one.

Then it sat. Across 2024 and 2025 it received eight commits — package bumps, an Astro 4
upgrade, an Astro 5 upgrade, a hover colour I never liked. Maintenance, not development. That
is the honest fate of most side projects, and I had no particular plan to change it.

## May 2026: Google Antigravity

In May I pointed **Google Antigravity** (Gemini) at the repository, working through a
track-based workflow where each piece of work got a written specification and plan before any
code was touched. Over about eleven days it produced **463 commits across 25 tracks**.

The scale is less impressive than it sounds — roughly 300 of those commits were the
workflow's own bookkeeping, marking tasks complete. But the substance was real, and it is
most of what the site is today:

- **Alpine.js removed entirely**, its mobile menu and theme switcher rewritten in plain
  JavaScript.
- **A test suite**, from nothing. Vitest arrived alongside a genuine test-first discipline —
  several tracks open with a commit adding failing tests.
- **The Rosely design system**: the warm, low-contrast palette this site still uses, applied
  across every component, and written down in `DESIGN.md`.
- **SEO**: dynamic meta tags, OpenGraph and Twitter cards, JSON-LD structured data, sitemap
  and `robots.txt`.
- **Content collections** for pages, work, education, creations and passions — the migration
  that made everything else possible.
- **Motion**: Astro's `ClientRouter` for SPA-like navigation, entrance animations, hover and
  focus transitions.
- **Pagefind** static search and **PhotoSwipe** lightbox galleries.
- **An accessibility audit** with fixes for ARIA, landmarks, focus indicators and contrast.
- **Three D3 visualisations** — the career timeline, the superpowers bar chart, and the
  bubble chart, which took twenty-odd commits to get from "overlapping circles" to the
  Brownian motion it does now.
- **The first CV PDF generation**, which is where the project's centre of gravity started to
  shift.

## July 2026: Claude Code

In late July I handed the same repository to **Claude Code**, running Opus 5. Sixteen commits
over two days, and a different character of work: less building outward, more going back over
what was there.

The CV was the main event. I asked for a proper redesign — the existing PDF was essentially a
printout of the website, complete with charts and navigation. It came back as two documents
built from a deterministic curation engine, rendered through dedicated print-only routes by
Puppeteer, with a one-pager that measures itself and refuses to overflow.

Then a full-codebase review, run as seven parallel reviewers over separate dimensions with
every finding adversarially verified before being reported. **119 findings survived**. Some
were embarrassing:

- Two UnoCSS shortcuts, `focus-ring` and `hover-accent`, that **emitted no CSS at all**.
  UnoCSS resolves `variant-utility` before it consults the shortcut table, so `focus-ring`
  had been parsed as the `focus:` variant applied to `ring` — for months, eleven elements had
  no proper focus indicator and the theme menu had no hover state. No build error, ever.
- The home page headline **clipped mid-word at 320px**, hidden by `overflow-x: hidden`.
- A personal résumé PDF, complete with my home address, sitting in a public repository.

The rest of the two days: an animated word cloud on the work page, weighted by how many roles
each tag appears in; company and institution logos unified into one component; the 1991 USENIX
paper I co-wrote [reproduced as an article](/spotlite/article/crypt-usenix91/), transcribed
from a scan with its figures redrawn as Mermaid diagrams; Rosely themes for Mermaid and for
syntax highlighting, in both light and dark, with the contrast enforced by a test; and a
migration of the whole Markdown pipeline onto Astro 7's new Rust processor.

## What I actually learned

**Both agents were more useful going back than going forward.** The genuinely valuable work in
both bursts was finding things that were already broken — a shortcut emitting nothing, a
headline clipped at mobile width, a contrast ratio of 3.04 where 4.5 was needed. None of it
was visible. All of it had been shipped.

**Confident and wrong is the failure mode to watch.** Claude told me twice, with reasoning,
that Astro's new Markdown processor could not render maths at build time. It could — it
needed a plugin at a different phase, and a rehype plugin passed to the wrong hook had been
accepted and silently ignored, which is what produced the false conclusion. It only came out
because I pushed back and asked whether it had actually checked. That silent-ignore behaviour
is now [an open issue](https://github.com/bruits/satteri/issues/180) against the processor.

**Verification is where the value is.** "Lighthouse says 100" turned out to mean "100 in light
mode", because Lighthouse follows the machine's colour scheme and every run had landed the
same way. Two real dark-mode contrast failures had been sitting underneath several clean
reports. The lesson is not that the tool lied — it is that a number is only as good as the
conditions you ran it under, and it is worth asking what those were.

**Write the reasons down.** The most durable artefacts from both phases are `DESIGN.md` and
`AGENTS.md` — the second of which is mostly a list of traps, each one describing a failure
that actually happened and cost real time. Future agents read it before they touch anything.

## The stack

- [Astro](https://astro.build) 7, with the Sätteri Rust Markdown processor
- [TypeScript](https://www.typescriptlang.org/) and [UnoCSS](https://unocss.dev/)
- [Puppeteer](https://pptr.dev/) rendering the CV PDFs from print-only routes
- [Vitest](https://vitest.dev/) — 27 test files, several asserting against the built output
- [D3.js](https://d3js.org/) for the timeline, superpowers and word cloud
- [Mermaid](https://mermaid.js.org/) for diagrams and [KaTeX](https://katex.org/) for maths,
  both themed to Rosely and rendered at build time
- [Pagefind](https://pagefind.app/) for search, [PhotoSwipe](https://photoswipe.com/) for
  galleries
- Deployed to GitHub Pages on every push to `main`

It is open source under the MIT licence. If you would like your CV and your portfolio to stop
disagreeing with each other, [help yourself](https://github.com/hellotham/spotlite).
