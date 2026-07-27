import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

type SearchItem = {
  url: string
  title: string
  excerpt: string
  content?: string
  keywords?: string[]
}

/**
 * Reduce markdown to the plain text a reader sees.
 *
 * Deliberately mirrors what Pagefind indexes from the rendered page, because these two
 * indexes back the same search box. Anything dropped here but kept by Pagefind is
 * findable in production and silently missing from the fallback.
 */
export const normalizeText = (value?: string) =>
  (value ?? '')
    // Images carry no body text. Handled before links so ![alt](src) cannot leave a
    // stray "!alt" behind.
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    // Keep link text, drop the target: the text is what is rendered and read.
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    // Keep code CONTENT, dropping only the fences and any language tag. Code blocks
    // are rendered text, so discarding them hid technical terms from this index.
    .replace(/^[ \t]*```[^\n]*$/gm, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/<[^>]*>/g, ' ')
    // Structural markers, only where they are markup: at the start of a line.
    .replace(/^[ \t]*#{1,6}[ \t]+/gm, '')
    .replace(/^[ \t]*>[ \t]?/gm, '')
    .replace(/^[ \t]*[-*+][ \t]+/gm, '')
    // Paired emphasis. Matching the pairs rather than stripping the characters keeps
    // hyphenated terms ("service-oriented") and snake_case identifiers intact, which
    // the previous blanket [#>*_~-] strip broke.
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*\n]+)\*/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1')
    .replace(/(?<!\w)_([^_\n]+)_(?!\w)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()

export const toExcerpt = (value?: string, max = 180) => {
  const normalized = normalizeText(value)
  if (normalized.length <= max) return normalized
  return `${normalized.slice(0, max).trimEnd()}...`
}

export const normalizePageUrl = (id: string) => {
  const normalized = id.replace(/^\/+|\/+$/g, '').replace(/\/index$/, '')
  return normalized.length ? `${import.meta.env.BASE_URL}${normalized}/` : import.meta.env.BASE_URL
}

export const normalizeArticleUrl = (id: string) => {
  const normalized = id.replace(/^\/+|\/+$/g, '')
  return `${import.meta.env.BASE_URL}article/${normalized}/`
}

/** URL of a collection entry that has its own detail route, e.g. /work/nab/. */
export const normalizeEntryUrl = (segment: string, id: string) => {
  const normalized = id.replace(/^\/+|\/+$/g, '')
  return `${import.meta.env.BASE_URL}${segment}/${normalized}/`
}

/**
 * This index backs search wherever Pagefind is unavailable — notably `astro dev`,
 * which never serves dist/pagefind. It must therefore cover the same collections
 * Pagefind indexes from the built pages: omitting one makes that content silently
 * unsearchable in development while working fine in production.
 */
export const GET: APIRoute = async () => {
  const [articles, pages, projects, work, education, passions, creations] = await Promise.all([
    getCollection('article'),
    getCollection('page', ({ data }) => !data.draft),
    getCollection('project'),
    getCollection('work'),
    getCollection('education'),
    getCollection('passion'),
    getCollection('creation')
  ])

  const items: SearchItem[] = [
    ...articles.map((article) => ({
      url: normalizeArticleUrl(article.id),
      title: article.data.title || 'Untitled article',
      excerpt: toExcerpt(`${article.data.description || ''} ${article.body || ''}`),
      content: normalizeText(article.body || ''),
      keywords: ['article']
    })),
    ...pages.map((page) => ({
      url: normalizePageUrl(page.id),
      title: page.data.title,
      excerpt: toExcerpt(`${page.data.description || ''} ${page.body || ''}`),
      content: normalizeText(page.body || ''),
      keywords: ['page']
    })),
    ...projects.map((project) => ({
      url: project.data.link,
      title: project.data.title,
      excerpt: toExcerpt(project.data.description || ''),
      content: normalizeText(project.data.description || ''),
      keywords: ['project']
    })),
    ...work.map((role) => ({
      url: normalizeEntryUrl('work', role.id),
      title: `${role.data.role}, ${role.data.company}`,
      excerpt: toExcerpt(role.body || ''),
      content: normalizeText(role.body || ''),
      // Company and role are searchable in their own right, not just via the body.
      keywords: ['work', role.data.company, role.data.role, role.data.type]
    })),
    ...education.map((entry) => ({
      url: normalizeEntryUrl('education', entry.id),
      title: `${entry.data.degree}, ${entry.data.institution}`,
      excerpt: toExcerpt(entry.body || ''),
      content: normalizeText(entry.body || ''),
      keywords: ['education', entry.data.institution, entry.data.degree]
    })),
    // Passions and creations have no detail routes; they render on their list pages.
    ...passions.map((passion) => ({
      url: normalizePageUrl('passions'),
      title: passion.data.item,
      excerpt: toExcerpt(passion.data.description),
      content: normalizeText(`${passion.data.section} ${passion.data.description}`),
      keywords: ['passion', passion.data.section]
    })),
    ...creations.map((creation) => ({
      url: normalizePageUrl('creations'),
      title: creation.data.item,
      excerpt: toExcerpt(creation.data.description),
      content: normalizeText(`${creation.data.section} ${creation.data.description}`),
      keywords: ['creation', creation.data.section]
    }))
  ]

  return new Response(JSON.stringify({ items }), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=60'
    }
  })
}
