import { describe, expect, it, vi } from 'vitest'

const { getCollectionMock, rssMock } = vi.hoisted(() => ({
  getCollectionMock: vi.fn(),
  rssMock: vi.fn()
}))

vi.mock('astro:content', () => ({
  getCollection: getCollectionMock
}))

vi.mock('@astrojs/rss', () => ({
  default: rssMock
}))

import { GET } from '../src/pages/rss.xml.js'

describe('RSS route', () => {
  it('maps article collection data to rss items', async () => {
    getCollectionMock.mockResolvedValue([
      {
        id: 'spotlite',
        data: {
          title: 'Spotlite',
          pubDate: new Date('2026-01-01'),
          description: 'Site template',
          customData: '<author>Chris</author>'
        }
      }
    ])

    rssMock.mockReturnValue(new Response('<rss></rss>', { status: 200 }))

    const response = await GET({ site: 'https://spotlite.example' })

    expect(response.status).toBe(200)
    expect(getCollectionMock).toHaveBeenCalledWith('article')
    expect(rssMock).toHaveBeenCalledTimes(1)

    const payload = rssMock.mock.calls[0][0] as {
      title: string
      description: string
      site: string
      items: Array<{ title: string; link: string }>
    }

    expect(payload.title).toBe('Spotlite')
    expect(payload.description).toBe('Personal Web Site')
    expect(payload.site).toBe('https://spotlite.example')
    expect(payload.items).toEqual([
      {
        title: 'Spotlite',
        pubDate: new Date('2026-01-01'),
        description: 'Site template',
        customData: '<author>Chris</author>',
        link: '/blog/spotlite/'
      }
    ])
  })
})
