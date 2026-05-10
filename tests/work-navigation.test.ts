import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const getPageOrder = (id: string): number => {
  const filePath = path.join(rootDir, 'src/content/page', `${id}.md`)
  const content = fs.readFileSync(filePath, 'utf8')
  const match = /^order:\s+(\d+)$/m.exec(content)
  return match ? parseInt(match[1], 10) : -1
}

describe('Work Navigation', () => {
  it('should have a "work.md" file with correct order', () => {
    const order = getPageOrder('work')
    expect(order).toBeGreaterThan(0)
  })

  it('should position "work" after "articles"', () => {
    const articlesOrder = getPageOrder('articles')
    const workOrder = getPageOrder('work')
    
    expect(articlesOrder).toBeLessThan(workOrder)
  })
})
