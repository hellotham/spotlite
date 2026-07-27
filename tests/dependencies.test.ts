import { describe, expect, it } from 'vitest'

describe('Dependencies', () => {
  // The CV PDFs are rendered from the Astro print routes by Puppeteer, using Chrome's
  // own pagination. md-to-pdf and gray-matter went with the markdown-concatenation
  // pipeline they served; Paged.js was dropped because its at-rule parser broke on
  // ordinary CSS in ways that hung generation.
  it('should have puppeteer installed', async () => {
    const puppeteer = await import('puppeteer')
    expect(puppeteer.default.launch).toBeTypeOf('function')
  })
})
