# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Read these first

`AGENTS.md` is the authoritative agent brief: what the project is, the full command table, the
content model, the CV pipeline, and a long **Traps** section where each entry is a real debugging
session. **It is not loaded automatically** — only this file is — so read it before changing
anything. `DESIGN.md` covers the Rosely visual system; `README.md` documents setup for a human.

This file holds only what those three do not, and should stay short so it does not drift from them.

## This repo is one of two copies

The same site is deployed twice from two **separate repositories with no shared history and no
merge path**:

|          | repo                                              | `site`                  | `base`       |
| :------- | :------------------------------------------------ | :---------------------- | :----------- |
| template | `hellotham/spotlite`                              | `https://hellotham.com` | `/spotlite/` |
| personal | `ChristineTham/cv` (`~/Repositories/Websites/cv`) | `https://christham.net` | `/cv/`       |

**Every content or code change lands in both, in the same turn**, or they silently diverge.
Verify with a base-normalised diff rather than by eye:

```bash
diff <(sed 's#/spotlite/#/BASE/#g' spotlite/src/content/article/x.md) <(sed 's#/cv/#/BASE/#g' cv/src/content/article/x.md)
```

Two ways this has gone wrong:

- **Rewriting the base path.** `spotlite` is also an article slug, so a blanket
  `s#/spotlite/#/cv/#g` turns `/spotlite/article/spotlite/` into `/cv/article/cv/`. Anchor on the
  link opener instead: `s#](/spotlite/#](/cv/#g`.
- **Copying config wholesale.** `astro.config.mjs` differs in `site` and `base`, and the two repos
  word some comments differently. Port the specific lines, not the file.

Both deploy to GitHub Pages on push to `main`. Wait for the run and check the SHA matches — and
note that a `cd` earlier in a compound command persists, so a `git push` labelled "spotlite" can
easily push `cv` twice. Confirm with `git log origin/main..HEAD` per repo.

## Markdown extensions live in `src/utils/*-mdast.ts`

Astro 7's Sätteri processor is configured in `astro.config.mjs` with
`mdastPlugins: [katexPlugin(), alertPlugin()]`. These are Sätteri visitors, **not** remark/rehype —
a unified plugin passed there is accepted and never runs. AGENTS.md explains why.

- `katex-mdast.ts` typesets `$…$` at the mdast phase.
- `alert-mdast.ts` renders GFM alerts (`> [!NOTE]`) as callouts, plus a non-GitHub `SYNTAX` kind for
  language reference material. It renames the blockquote on the way to hast, so the body keeps
  normal Markdown. Styling is `src/styles/alert.css`; the five-plus-one markers are allowlisted in
  `eslint.config.mjs` under `markdown/no-missing-label-refs`.

**`$` in prose is maths.** Currency in body text has to be escaped as `\$` or a paragraph's dollar
amounts pair into an inline equation, which blows the page width open with no build error.

## Reproduced historical documents

Several articles reproduce a published paper or thesis (`crypt-usenix91`, `suntech-1990`,
`optech-1990`, `rubato`). The house pattern: an italic preface stating what the source was and what
was changed, a link to the original in `public/`, and the document's own References or Bibliography
kept as it stood. A Sources section may sit alongside for provenance the original had no reason to
carry — `crypt-usenix91` has both — but never replaces it.

Where the source is a scan or a lossy conversion, **state every repair in the preface** and keep
them auditable — repair a named defect explicitly rather than inferring a general rule, unless the
defect really is general.

## Two traps that cost time in content work

**A tag-stripping regex eats real angle brackets.** `<[^>]+>` run over text containing `a<b` … `a>b`
matches from the first `<` to the next `>` and deletes everything between. This silently removed a
row of relational operators from the Rubato thesis, and then bit the verification script written to
check for exactly that kind of loss — three times. When processing content, strip a known tag list
(`</?(?:a|em|strong|code|…)\b[^>]*>`), never a wildcard.

**Markdown `_` and `**` will not open or close against a letter, or across an underscore inside a
word.** `_parameter_list_` and `_C_ompiler` both render literally. Emit `<em>`/`<strong>` in those
positions instead.

## Before calling anything done

```bash
pnpm lint && pnpm astro check && pnpm test && pnpm build
```

`pnpm lint` **writes** — it is `prettier --write .` then `eslint --fix .`, not a check. It reformats
anything not covered by `.prettierignore` or the eslint `ignores`, which is how a vendored 1998 HTML
bundle in `public/` got silently reindented. Add new vendored or generated material to both ignore
lists before running it.

Touching content, `src/cv.json` or `src/utils/cv.ts` also needs `pnpm run pdf` — the PDFs are
committed and go stale silently. `pnpm build`, never bare `astro build`.
