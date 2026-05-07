import { describe, it, expect, beforeEach } from 'vitest'

describe('SEO Meta Tags', () => {
  beforeEach(() => {
    document.head.innerHTML = ''
  })

  const renderMeta = (title: string, description: string, ogImage?: string, article?: boolean) => {
    document.title = title
    
    const metaDesc = document.createElement('meta')
    metaDesc.name = 'description'
    metaDesc.content = description
    document.head.appendChild(metaDesc)

    const ogTitle = document.createElement('meta')
    ogTitle.setAttribute('property', 'og:title')
    ogTitle.content = title
    document.head.appendChild(ogTitle)

    const ogDesc = document.createElement('meta')
    ogDesc.setAttribute('property', 'og:description')
    ogDesc.content = description
    document.head.appendChild(ogDesc)

    const ogType = document.createElement('meta')
    ogType.setAttribute('property', 'og:type')
    ogType.content = article ? 'article' : 'website'
    document.head.appendChild(ogType)

    if (ogImage) {
      const ogImg = document.createElement('meta')
      ogImg.setAttribute('property', 'og:image')
      ogImg.content = ogImage
      document.head.appendChild(ogImg)
    }
  }

  it('should have a title and description', () => {
    renderMeta('Test Title', 'Test Description')
    expect(document.title).toBe('Test Title')
    const desc = document.querySelector('meta[name="description"]')
    expect(desc?.getAttribute('content')).toBe('Test Description')
  })

  it('should have OpenGraph tags', () => {
    renderMeta('Test Title', 'Test Description', '/og-image.png')
    
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    const ogType = document.querySelector('meta[property="og:type"]')
    const ogImg = document.querySelector('meta[property="og:image"]')
    
    expect(ogTitle?.getAttribute('content')).toBe('Test Title')
    expect(ogDesc?.getAttribute('content')).toBe('Test Description')
    expect(ogType?.getAttribute('content')).toBe('website')
    expect(ogImg?.getAttribute('content')).toBe('/og-image.png')
  })

  it('should have og:type article when specified', () => {
    renderMeta('Article Title', 'Article Desc', undefined, true)
    const ogType = document.querySelector('meta[property="og:type"]')
    expect(ogType?.getAttribute('content')).toBe('article')
  })
})
