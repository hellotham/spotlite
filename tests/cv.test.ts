import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it, vi } from 'vitest'

// src/utils/cv.ts imports astro:content for buildCv; the pure helpers under test here
// do not touch it, but the module graph still has to resolve outside Astro.
vi.mock('astro:content', () => ({
  getCollection: vi.fn(async () => []),
  getEntry: vi.fn(async () => undefined)
}))

const { formatDateRange, renderInline, parseCvCopy } = await import('../src/utils/cv')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const readJson = (relativePath: string) =>
  JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), 'utf8'))

const readText = (relativePath: string) => fs.readFileSync(path.join(rootDir, relativePath), 'utf8')

describe('CV configuration', () => {
  // The parameters are frontmatter and the copy is prose in the body, so this asserts
  // against the built CV rather than the source format: what has to be true is that
  // these details reach the document, not how the file happens to store them.
  const rendered = readText('dist/cv/full/index.html')
  const profile = readText('src/content/cv/profile.md')

  it('supplies the contact details a professional CV requires', () => {
    // These do not exist anywhere else in the repo: the site config has no email,
    // phone or location, and its `title` is a website tagline, not a CV headline.
    for (const field of ['email', 'phone', 'location', 'linkedin']) {
      expect(profile).toMatch(new RegExp(`^\\s*${field}:\\s*\\S`, 'm'))
    }
    expect(rendered).toMatch(/@/)
    expect(rendered).toContain('Sydney')
    expect(rendered).toContain('linkedin.com/in/')
  })

  it('does not reuse the website tagline as the CV headline', () => {
    // "artist, consultant, cyclist, designer, musician, photographer, world traveller"
    // is site personality, not a professional headline.
    const siteConfig = readJson('src/config.json')
    const headline = /headline:\s*'?([^'\n]+)'?/.exec(profile)?.[1]
    expect(headline).toBeTruthy()
    expect(headline).not.toBe(siteConfig.title)
  })
})

describe('CV copy parsing', () => {
  const body = readText('src/content/cv/profile.md').split(/^---$/m).slice(2).join('---')

  it('reads the profile, career and achievements out of the markdown body', () => {
    const copy = parseCvCopy(body)
    expect(copy.summary).toMatch(/Hello Tham/)
    expect(copy.career.intro).toMatch(/four decades/)
    expect(copy.career.decades).toHaveLength(4)
    expect(copy.career.decades[0]).toMatch(/first decade/)
    // Wrapped source lines must come back as one line, not with the newlines in them.
    expect(copy.career.decades[0]).not.toContain('\n')
    expect(copy.achievements.length).toBeGreaterThanOrEqual(3)
    expect(copy.achievements[0].title).toBeTruthy()
    expect(copy.achievements[0].detail).toMatch(/\S/)
  })

  it('fails loudly rather than shipping a CV with a hole in it', () => {
    // Each of these is a way the file can be edited into something that would other-
    // wise build a CV with a section silently missing.
    expect(() => parseCvCopy(body.replace(/^## Profile$/m, '## Summary'))).toThrow(/Profile/)
    expect(() => parseCvCopy(body.replace(/^## Key Achievements$/m, '## Other'))).toThrow(
      /Key Achievements/
    )
    expect(() => parseCvCopy(body.replace(/^- /gm, ''))).toThrow(/bulleted list/)
    expect(() => parseCvCopy(body.replace(/^### .*$/gm, ''))).toThrow(/###/)
  })
})

describe('CV inline rendering', () => {
  it('renders the inline markdown that appears in work bullets', () => {
    expect(renderInline('**"Flexible Edges"**: plug-in solutions')).toBe(
      '<strong>&quot;Flexible Edges&quot;</strong>: plug-in solutions'
    )
  })

  it('escapes HTML before applying markdown, so bullets cannot inject markup', () => {
    expect(renderInline('<img src=x onerror=alert(1)>')).not.toContain('<img')
    expect(renderInline('AT&T/NCR')).toBe('AT&amp;T/NCR')
  })

  it('formats date ranges the way a CV expects', () => {
    expect(formatDateRange(2016)).toBe('2016 – Present')
    expect(formatDateRange(2011, 2016)).toBe('2011 – 2016')
    expect(formatDateRange(2011, 2011)).toBe('2011')
  })
})

describe('CV print routes', () => {
  const onepage = readText('dist/cv/onepage/index.html')
  const full = readText('dist/cv/full/index.html')

  it('are excluded from search engines and the sitemap', () => {
    for (const html of [onepage, full]) {
      expect(html).toMatch(/<meta name="robots" content="noindex, nofollow">/)
    }
    // Assert the print routes specifically, not the bare substring `/cv/`. A site
    // deployed under a `/cv/` base has that substring in every URL, so the loose form
    // passed only for as long as the base happened to be something else.
    const sitemap = readText('dist/sitemap-0.xml')
    expect(sitemap).not.toMatch(/\/cv\/(onepage|full)\//)
    expect(sitemap).not.toMatch(/\/404\//)
  })

  it('omit website-only content that does not belong on a CV', () => {
    // The previous pipeline concatenated every page, so the PDF carried hi-fi gear,
    // cameras, music videos and blog listings.
    const forbidden = [
      'Things I use and love',
      'Things I have created',
      'outrageous actualiser',
      'AI Agents have skills',
      'Superpowers'
    ]
    for (const html of [onepage, full]) {
      for (const phrase of forbidden) {
        expect(html).not.toContain(phrase)
      }
    }
  })

  it('carry the substance a CV needs', () => {
    for (const html of [onepage, full]) {
      expect(html).toContain('Professional Experience')
      expect(html).toContain('Education')
      expect(html).toContain('Core Competencies')
      expect(html).toContain('Hello Tham')
    }
  })

  it('present the full history in the full CV and a curated subset in the one-pager', () => {
    const roleCount = (html: string) => (html.match(/class="cv-role"/g) ?? []).length
    expect(roleCount(full)).toBeGreaterThan(roleCount(onepage))
    // Nothing is silently dropped: the one-pager still accounts for earlier roles.
    expect(onepage).toContain('Earlier career')
  })

  it('keeps the print stylesheet free of media queries', () => {
    // The CV is a print-only document; @media rules here only ever caused trouble
    // (they crashed the previous pagination library) and the screen preview does not
    // need them.
    const css = readText('public/cv-print.css')
    expect(css).not.toMatch(/^@media/m)
  })

  it('keeps layout single-column for ATS parsing', () => {
    // Multi-column body layouts are read out of order by applicant tracking systems.
    // The competency grid is exempt: each item is a self-contained label/rating line.
    const css = readText('public/cv-print.css')
    const columnRules = css.match(/column-count:\s*\d+/g) ?? []
    expect(columnRules.length).toBe(1)
    expect(css).toContain('.cv-competencies')
  })
})

describe('Generated CV PDFs', () => {
  const pdfPath = (name: string) => path.join(rootDir, 'public', name)

  const pageCount = (name: string) => {
    const contents = fs.readFileSync(pdfPath(name)).toString('latin1')
    return (contents.match(/\/Type\s*\/Page[^s]/g) ?? []).length
  }

  it('produces both documents', () => {
    expect(fs.existsSync(pdfPath('cv-onepage.pdf'))).toBe(true)
    expect(fs.existsSync(pdfPath('cv.pdf'))).toBe(true)
  })

  it('keeps the one-pager to exactly one page', () => {
    expect(pageCount('cv-onepage.pdf')).toBe(1)
  })

  it('keeps the full CV to a sensible length', () => {
    const pages = pageCount('cv.pdf')
    expect(pages).toBeGreaterThan(1)
    // Five pages covers a fifteen-role career with detail on the recent ones. This
    // bound exists to catch unbounded growth, not to bless any length: if it fails,
    // trim content or tighten the one-pager limits rather than raising it again.
    expect(pages).toBeLessThanOrEqual(5)
  })

  // The tier table in src/utils/cv.ts is the whole curation policy, and it is easy to
  // "fix" a fitting problem by quietly changing a cell. These assertions restate it
  // independently and check it against the built HTML, so a change to the table has to
  // be a deliberate change here too.
  describe('the priority tiers', () => {
    const html = {
      full: readText('dist/cv/full/index.html'),
      onepage: readText('dist/cv/onepage/index.html')
    }
    // Squash to lowercase alphanumerics: markup and whitespace differ between the source
    // string and the rendered page, but the words do not. Two things must go first.
    // Entities: squashing "Bain &amp; Company" leaves "bainampcompany", and that "amp"
    // matches nothing. Tags: a bullet containing **FinvestLens** renders as <strong>, and
    // squashing leaves the tag name embedded mid-sentence. A named list, never a wildcard
    // `<[^>]+>` — that pattern eats real relational operators out of content.
    const TAGS = /<\/?(?:a|em|strong|code|span|p|ul|li|div|section|header|article|h[1-6])\b[^>]*>/gi
    const squash = (value: string) =>
      value
        .replace(TAGS, ' ')
        .replace(/&(?:[a-z]+|#\d+);/gi, ' ')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
    // Mirror renderInline on the source side: links become their text, emphasis vanishes.
    const asRendered = (text: string) =>
      text.replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1').replace(/\*\*|`/g, '')
    const carries = (variant: keyof typeof html, text: string) =>
      squash(html[variant]).includes(squash(asRendered(text)))

    const workDir = path.join(rootDir, 'src/content/work')
    // Logo images live alongside the entries in this directory, so filter by extension
    // rather than reading whatever is there.
    const files = fs.readdirSync(workDir).filter((file) => file.endsWith('.md'))
    const entries = files.map((file) => {
      const source = fs.readFileSync(path.join(workDir, file), 'utf8')
      const frontmatter = source.split(/^---$/m)[1]
      const body = source.split(/^---$/m).slice(2).join('---')
      return {
        slug: file.replace(/\.md$/, ''),
        company: frontmatter.match(/^company:\s*(.+)$/m)![1].trim(),
        priority: Number(frontmatter.match(/^priority:\s*(\d)/m)?.[1]),
        description: frontmatter.match(/^description:\s*['"](.+)['"]\s*$/m)?.[1],
        // A body bullet stands in for the body: present means the role rendered in
        // full. The LONGEST one, because a short bullet can be a substring of the
        // description that legitimately prints at priority 3 — HP's "Technology
        // infrastructure strategy" is inside its own description, so testing the first
        // bullet reported the body as present when only the one-line form was.
        longestBullet: (body.match(/^-\s+.+$/gm) ?? [])
          .map((line) => line.replace(/^-\s+/, ''))
          .sort((a, b) => b.length - a.length)[0],
        hasSummary: /^summary:/m.test(frontmatter)
      }
    })

    it('covers every role with a priority of 1, 2 or 3', () => {
      expect(entries.length).toBeGreaterThan(0)
      for (const entry of entries) expect([1, 2, 3]).toContain(entry.priority)
    })

    it('requires a summary at priority 1 and 2, and none at priority 3', () => {
      for (const entry of entries) {
        expect(entry.hasSummary, `${entry.slug} (priority ${entry.priority})`).toBe(
          entry.priority < 3
        )
      }
    })

    it('prints the body in the full CV only at priority 1', () => {
      for (const entry of entries) {
        if (!entry.longestBullet) continue
        expect(carries('full', entry.longestBullet), `${entry.slug} body in full CV`).toBe(
          entry.priority === 1
        )
      }
    })

    it('prints the description where the tier table says, and nowhere else', () => {
      for (const entry of entries) {
        if (!entry.description) continue
        const where = `${entry.slug} (priority ${entry.priority})`
        expect(carries('full', entry.description), `${where} description in full CV`).toBe(
          entry.priority === 3
        )
        expect(carries('onepage', entry.description), `${where} description on one-pager`).toBe(
          entry.priority === 2
        )
      }
    })

    it('names every role in both documents, whatever its tier', () => {
      // The tiers change how much is said about a role, never whether it is there.
      for (const entry of entries) {
        expect(carries('full', entry.company), `${entry.company} in full CV`).toBe(true)
        expect(carries('onepage', entry.company), `${entry.company} on one-pager`).toBe(true)
      }
    })
  })

  it('embeds real text rather than page images, so the PDFs can be parsed', () => {
    // The single most important ATS property: a scanned or rasterised CV extracts
    // nothing. Text-bearing PDFs carry font objects and text-showing operators.
    for (const name of ['cv-onepage.pdf', 'cv.pdf']) {
      const contents = fs.readFileSync(pdfPath(name)).toString('latin1')
      expect(contents).toMatch(/\/Type\s*\/Font/)
      expect(contents).not.toMatch(/\/Subtype\s*\/Image/)
    }
  })
})
