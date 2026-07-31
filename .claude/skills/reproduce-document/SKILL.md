---
name: reproduce-document
description: Add a published paper, thesis or article to src/content/article/ as a faithful reproduction. Use when converting a scan, HTML, troff or PDF of a historical document into an article, so it matches the house pattern the existing reproductions follow.
---

# Reproduce a historical document

Four articles already follow this pattern: `crypt-usenix91` (a scanned USENIX paper),
`suntech-1990` (a scanned magazine article), `optech-1990` (its pre-edit manuscript) and
`rubato` (a 1987 thesis converted from troff via HTML). Match them.

## The shape

1. **Frontmatter** — `title` as published, `description` in the site's voice, `pubDate` the
   publication date. Where only a season or year is known, use the first plausible day and
   keep every prose claim to what is actually known.
2. **An italic preface**, first thing in the body, stating:
   - what the source was and where it came from
   - who the co-authors were, linking the relevant `/work/` entry
   - **every repair made**, named individually
3. **A link to the original** in `public/`, as a bold line:
   `**[Download the original scanned paper (PDF, 647 KB)](/spotlite/crypt-usenix91.pdf)**`
4. **The document's own References or Bibliography, kept as it stood.** A `Sources` section
   may sit alongside for provenance the original had no reason to carry — `crypt-usenix91`
   has both — but never replaces it.
5. **Headings demoted one level.** The article title is the `h1`, so the document's own
   chapters become `##`.

## Repairs are named, never inferred

State each repair in the preface. Repair a **named defect explicitly** rather than inferring
a general rule from it — unless the defect really is general, in which case say that too.

Worked examples from the existing four:

- `suntech-1990` — two typesetting slips corrected. Verified by zooming into the scan to
  confirm `XII` really was set that way rather than being an OCR misreading of `X11`.
- `rubato` — four faults in a 1998 HTML conversion: an unterminated `href` quote, lists
  opened as one kind and closed as the other, footnote and reference numbering off by one,
  and two titles whose spaces were dropped. The last was repaired **by name**, because every
  other run of adjacent tags in that document was deliberate.

Where a source is a scan, prefer the author's own artwork if it survives: `optech-1990` uses
figures converted from the original PostScript rather than photographs of the printed page.

## Conversion traps

- **`$` in prose is maths.** Sätteri parses `$…$`; currency must be escaped as `\$` or a
  paragraph's dollar amounts pair into an inline equation and blow the page width open with
  no build error.
- **Markdown emphasis will not open or close against a letter,** nor across an underscore
  inside a word. `_parameter_list_` and `_C_ompiler` render literally. Emit `<em>` there.
- **Never strip tags with `<[^>]+>`.** Over text containing `a<b` … `a>b` it deletes
  everything between. Strip a known tag list.
- **Preserve the source's own anchors** as `<a id="…">` so its table of contents and
  cross-references keep working. Replace dots in ids with dashes — a dotted id needs escaping
  in every selector that touches it.
- **Long code lines and wide figures** need their own scroll box; check with the
  `responsive-contrast-auditor`.

## Before finishing

Run the `content-fidelity-verifier` agent against the source. Then the usual sequence in both
repositories, and add the source archive or scan to `public/` in both so the download works
from either site.

Finally, link the article from `src/content/page/education.md` if it is a published paper or
thesis — the existing entries link the reproduction and its scan side by side.
