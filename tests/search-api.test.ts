import { beforeEach, describe, expect, it, vi } from 'vitest'

const { getCollectionMock } = vi.hoisted(() => ({
  getCollectionMock: vi.fn()
}))

vi.mock('astro:content', () => ({
  getCollection: getCollectionMock
}))

import {
  GET,
  normalizeArticleUrl,
  normalizePageUrl,
  normalizeText,
  toExcerpt
} from '../src/pages/api/search.json'

describe('search API helpers', () => {
  it('normalizes text by removing markdown, html, and extra whitespace', () => {
    const value = '## Hello <b>World</b> `code` [link](https://example.com)'

    expect(normalizeText(value)).toBe('Hello World')
  })

  it('creates excerpts with ellipsis for long values', () => {
    const value = 'a'.repeat(220)

    expect(toExcerpt(value, 20)).toBe('aaaaaaaaaaaaaaaaaaaa...')
  })

  it('normalizes page URLs with index handling', () => {
    expect(normalizePageUrl('about')).toBe('/about/')
    expect(normalizePageUrl('/projects/index/')).toBe('/projects/')
    expect(normalizePageUrl('/')).toBe('/')
  })

  it('normalizes article URLs', () => {
    expect(normalizeArticleUrl('spotlite')).toBe('/article/spotlite/')
    expect(normalizeArticleUrl('/unix-50-celebration/')).toBe('/article/unix-50-celebration/')
  })
})

describe('GET /api/search.json', () => {
  beforeEach(() => {
    getCollectionMock.mockReset()

    const dataset = {
      article: [
        {
          id: 'spotlite',
          body: 'Article body content about Astro and UnoCSS',
          data: { title: 'Spotlite', description: 'Template for personal site' }
        }
      ],
      page: [
        {
          id: 'about',
          body: 'About page body',
          data: { title: 'About', description: 'About page', draft: false }
        },
        {
          id: 'secret',
          body: 'Draft page body',
          data: { title: 'Secret', description: 'Should not appear', draft: true }
        }
      ],
      project: [
        {
          id: 'hello-astro',
          body: '',
          data: {
            title: 'Hello Astro',
            description: 'An Astro starter project',
            link: 'https://example.com/hello-astro'
          }
        }
      ]
    }

    getCollectionMock.mockImplementation(
      async (collectionName: 'article' | 'page' | 'project', filter?: (item: unknown) => boolean) => {
        const entries = dataset[collectionName]
        return typeof filter === 'function' ? entries.filter((entry) => filter(entry)) : entries
      }
    )
  })

  it('returns combined searchable items and excludes draft pages', async () => {
    const response = await GET({} as never)
    const body = (await response.json()) as {
      items: Array<{ url: string; title: string; keywords?: string[] }>
    }

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('application/json')
    expect(response.headers.get('cache-control')).toBe('public, max-age=60')

    expect(body.items).toHaveLength(3)
    expect(body.items.map((item) => item.title)).toEqual(['Spotlite', 'About', 'Hello Astro'])
    expect(body.items.find((item) => item.title === 'Secret')).toBeUndefined()

    expect(body.items[0]).toMatchObject({
      url: '/article/spotlite/',
      keywords: ['article']
    })

    expect(body.items[1]).toMatchObject({
      url: '/about/',
      keywords: ['page']
    })

    expect(body.items[2]).toMatchObject({
      url: 'https://example.com/hello-astro',
      keywords: ['project']
    })
  })
})
