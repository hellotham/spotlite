import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

describe('education collection', () => {
  it('src/content/education directory exists', () => {
    const educationDir = path.join(rootDir, 'src/content/education')
    expect(fs.existsSync(educationDir)).toBe(true)
  })

  it('education entries have required fields in frontmatter', () => {
    const educationDir = path.join(rootDir, 'src/content/education')
    if (!fs.existsSync(educationDir)) return

    const files = fs.readdirSync(educationDir).filter((f) => f.endsWith('.md'))
    expect(files.length).toBeGreaterThan(0)

    for (const file of files) {
      const filePath = path.join(educationDir, file)
      const content = fs.readFileSync(filePath, 'utf8')

      expect(content).toMatch(/^institution:\s+/m)
      expect(content).toMatch(/^degree:\s+/m)
      expect(content).toMatch(/^startyear:\s+\d+$/m)
      // `image` is deliberately NOT required. The schema marks it optional and EntityLogo
      // draws a monogram of the institution's initials when it is absent, which is how an
      // entity with no usable mark is meant to render. This assertion used to require one,
      // which only held because every entry happened to have a logo to hand.
      expect(content).toMatch(/^description:\s+/m)
      expect(content).toMatch(/^summary:$/m)
      expect(content).not.toMatch(/^datespan:/m)
    }
  })
})
