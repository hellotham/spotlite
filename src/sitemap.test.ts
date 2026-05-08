/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import config from '../astro.config.mjs'

describe('Sitemap Integration', () => {
  it('should have sitemap integration in astro.config.mjs', () => {
    const integrations = config.integrations || []
    const hasSitemap = integrations.some((i: any) => i.name === '@astrojs/sitemap')
    expect(hasSitemap).toBe(true)
  })

  it('should have a site URL configured', () => {
    expect(config.site).toBeDefined()
    expect(config.site).toContain('https://')
  })
})
