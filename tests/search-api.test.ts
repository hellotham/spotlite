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

    // Code content and link text are kept: both are rendered text, and Pagefind
    // indexes them, so dropping them here would make the two backends disagree.
    expect(normalizeText(value)).toBe('Hello World code link')
  })

  it('keeps the text Pagefind would index from rendered markdown', () => {
    // Fenced code: the fence goes, the code stays.
    expect(normalizeText('```swift\nlet portal = ServiceNow()\n```')).toBe(
      'let portal = ServiceNow()'
    )
    // Images contribute nothing; their alt text is not body copy.
    expect(normalizeText('before ![alt text](/img.png) after')).toBe('before after')
    // Link text survives, the URL does not.
    expect(normalizeText('see [the report](https://example.com/x)')).toBe('see the report')
  })

  it('does not mangle hyphenated or snake_case technical terms', () => {
    // The previous blanket [#>*_~-] strip split these apart.
    expect(normalizeText('service-oriented architecture')).toBe('service-oriented architecture')
    expect(normalizeText('call fast_api_client now')).toBe('call fast_api_client now')
    // Emphasis still comes off when it is genuinely emphasis.
    expect(normalizeText('**bold** and _italic_ and ~~struck~~')).toBe('bold and italic and struck')
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
      ],
      work: [
        {
          id: 'tfnsw',
          body: '- Built a native iOS app in Swift talking to a ServiceNow portal.',
          data: {
            company: 'Transport for NSW',
            role: 'Principal Consultant',
            type: 'consulting',
            startyear: 2016
          }
        }
      ],
      education: [
        {
          id: 'macquarie',
          body: 'Awarded the Institute Prize.',
          data: {
            institution: 'Macquarie University',
            degree: 'Master of Applied Finance',
            startyear: 1994
          }
        }
      ],
      passion: [
        {
          id: 'leica-m10',
          body: '',
          data: { section: 'Photography', item: 'Leica M10', description: 'Rangefinder camera' }
        }
      ],
      creation: [
        {
          id: 'winter-music',
          body: '',
          data: { section: 'Music', item: 'Winter Music', description: 'A piano piece' }
        }
      ]
    }

    getCollectionMock.mockImplementation(
      async (collectionName: keyof typeof dataset, filter?: (item: unknown) => boolean) => {
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

    expect(body.items).toHaveLength(7)
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

  /**
   * `astro dev` never serves dist/pagefind, so this index is the ONLY search backend in
   * development. When it covered just article/page/project, the entire work history was
   * silently unsearchable in dev while production worked fine — searching "swift" or
   * "servicenow" returned nothing.
   */
  it('covers every collection rendered into searchable pages', async () => {
    const response = await GET({} as never)
    const body = (await response.json()) as {
      items: Array<{ url: string; title: string; content?: string; keywords?: string[] }>
    }

    const kinds = new Set(body.items.map((item) => item.keywords?.[0]))
    expect(kinds).toEqual(
      new Set(['article', 'page', 'project', 'work', 'education', 'passion', 'creation'])
    )

    const work = body.items.find((item) => item.keywords?.[0] === 'work')
    expect(work?.url).toBe('/work/tfnsw/')
    expect(work?.title).toBe('Principal Consultant, Transport for NSW')
    // Body text is what makes terms like these findable at all.
    expect(work?.content).toContain('Swift')
    expect(work?.content).toContain('ServiceNow')

    const education = body.items.find((item) => item.keywords?.[0] === 'education')
    expect(education?.url).toBe('/education/macquarie/')
    expect(education?.title).toContain('Macquarie University')

    // No detail routes for these; they must point at their list pages.
    expect(body.items.find((item) => item.keywords?.[0] === 'passion')?.url).toBe('/passions/')
    expect(body.items.find((item) => item.keywords?.[0] === 'creation')?.url).toBe('/creations/')
  })
})
