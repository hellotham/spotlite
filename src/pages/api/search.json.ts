import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

type SearchItem = {
  url: string
  title: string
  excerpt: string
  content?: string
  keywords?: string[]
}

const normalizeText = (value?: string) =>
  (value ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/[#>*_~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const toExcerpt = (value?: string, max = 180) => {
  const normalized = normalizeText(value)
  if (normalized.length <= max) return normalized
  return `${normalized.slice(0, max).trimEnd()}...`
}

const normalizePageUrl = (id: string) => {
  const normalized = id.replace(/^\/+|\/+$/g, '').replace(/\/index$/, '')
  return normalized.length ? `/${normalized}/` : '/'
}

const normalizeArticleUrl = (id: string) => {
  const normalized = id.replace(/^\/+|\/+$/g, '')
  return `/article/${normalized}/`
}

export const GET: APIRoute = async () => {
  const [articles, pages, projects] = await Promise.all([
    getCollection('article'),
    getCollection('page', ({ data }) => !data.draft),
    getCollection('project')
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
    }))
  ]

  return new Response(JSON.stringify({ items }), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=60'
    }
  })
}
