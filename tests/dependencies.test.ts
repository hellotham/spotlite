import { describe, expect, it } from 'vitest'

describe('Dependencies', () => {
  it('should have md-to-pdf installed', async () => {
    const mdToPdf = await import('md-to-pdf')
    expect(mdToPdf).toBeDefined()
  })

  it('should have gray-matter installed', async () => {
    const matter = await import('gray-matter')
    expect(matter).toBeDefined()
  })
})
