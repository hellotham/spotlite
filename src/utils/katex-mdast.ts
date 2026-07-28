import katex from 'katex'
import { defineMdastPlugin } from 'satteri'

/**
 * Renders `$inline$` and `$$display$$` maths to HTML at build time with KaTeX.
 *
 * Sätteri's `features.math` is a *parser*: it recognises the delimiters and emits `math`
 * and `inlineMath` mdast nodes, exactly as remark-math does. Nothing then typesets them,
 * so without a plugin like this the equations reach the page as literal LaTeX.
 *
 * This has to run at the **mdast** phase. Those maths nodes only survive until
 * mdast→hast, after which they are indistinguishable from a fenced code block tagged
 * `language-math` — which is why rehype-katex cannot be retrofitted here, quite apart
 * from Sätteri's `hastPlugins` being a different interface to a rehype plugin.
 *
 * Written out rather than taking @nullpinter/satteri-katex: the useful part is twenty
 * lines, and this avoids a 0.1.x dependency whose declared peer range (satteri ^0.8.1)
 * does not cover the version in use.
 */

export interface KatexPluginOptions {
  /** Passed through to KaTeX. `displayMode` is set per node and cannot be overridden. */
  katexOptions?: Omit<katex.KatexOptions, 'displayMode'>
}

const render = (value: string, displayMode: boolean, options: KatexPluginOptions) => {
  try {
    return katex.renderToString(value, {
      ...options.katexOptions,
      displayMode,
      throwOnError: true
    })
  } catch (error) {
    // Fail loudly in the build log but still emit something readable, so one malformed
    // equation cannot take a page down. KaTeX's own error markup carries the reason.
    const reason = error instanceof Error ? error.message : String(error)
    console.warn(`[katex] could not render ${displayMode ? 'display' : 'inline'} maths: ${reason}`)
    return katex.renderToString(value, {
      ...options.katexOptions,
      displayMode,
      throwOnError: false,
      strict: 'ignore'
    })
  }
}

export const katexPlugin = (options: KatexPluginOptions = {}) =>
  defineMdastPlugin({
    name: 'katex',
    // Display maths replaces the block outright; inline maths becomes an html node so it
    // stays within the surrounding paragraph.
    math: (node) => ({ rawHtml: render(node.value, true, options) }),
    inlineMath: (node) => ({ type: 'html', value: render(node.value, false, options) })
  })
