import { defineMdastPlugin } from 'satteri'

/**
 * GitHub-flavoured alerts: a blockquote whose first line is `[!NOTE]` becomes a
 * callout rather than a quotation.
 *
 * ```markdown
 * > [!NOTE]
 * > Something worth setting apart from the prose.
 * ```
 *
 * Sätteri parses the blockquote but has no notion of the marker, so without this the
 * literal `[!NOTE]` renders as the first line of an ordinary quote. The node stays a
 * blockquote through the tree and is only renamed on the way to hast, which means the
 * body keeps its normal Markdown — links, emphasis and lists all still work inside.
 *
 * Styling lives in src/styles/alert.css.
 */

const TITLES = {
  NOTE: 'Note',
  TIP: 'Tip',
  IMPORTANT: 'Important',
  WARNING: 'Warning',
  CAUTION: 'Caution',
  // Not one of GitHub's five. Added for language reference material, where a syntax
  // form wants to be set apart from the prose but is not a code listing.
  SYNTAX: 'Syntax'
} as const

type Kind = keyof typeof TITLES

// The marker owns its whole line. `[!NOTE] text` on one line is not an alert on
// GitHub either, so the newline is required rather than optional.
const MARKER = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|SYNTAX)\][ \t]*(?:\r?\n|$)/

export const alertPlugin = () =>
  defineMdastPlugin({
    name: 'gfm-alert',
    blockquote: (node, ctx) => {
      const first = node.children?.[0]
      if (first?.type !== 'paragraph') return
      const lead = first.children?.[0]
      if (lead?.type !== 'text') return

      const match = MARKER.exec(lead.value)
      if (!match) return
      const kind = match[1] as Kind

      const rest = lead.value.slice(match[0].length)
      if (rest === '' && first.children.length === 1) {
        // The marker was the entire first paragraph; drop it rather than leave a blank.
        ctx.removeNode(first)
      } else {
        ctx.setProperty(lead, 'value', rest)
      }

      ctx.setProperty(node, 'data', {
        hName: 'div',
        hProperties: { className: ['alert', `alert-${kind.toLowerCase()}`] }
      })
      ctx.prependChild(node, {
        rawHtml: `<p class="alert-title">${TITLES[kind]}</p>`
      })
    }
  })
