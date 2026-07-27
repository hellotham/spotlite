import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const walk = (dir: string, extension: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full, extension)
    return entry.name.endsWith(extension) ? [full] : []
  })

/**
 * astro.config.mjs sets `base: '/spotlite/'`, so every internal URL has to be built
 * from import.meta.env.BASE_URL. A root-relative literal such as href="/education/x"
 * resolves off the base and 404s in production.
 *
 * These are source-level checks on purpose: BASE_URL resolves to '/' under vitest, so
 * a test that merely renders a component and inspects the href would pass while the
 * deployed link is broken.
 */
describe('Base path discipline', () => {
  const astroFiles = walk(path.join(rootDir, 'src'), '.astro')

  it('finds astro source files to scan', () => {
    expect(astroFiles.length).toBeGreaterThan(0)
  })

  it('astro.config.mjs declares a base path', () => {
    const config = fs.readFileSync(path.join(rootDir, 'astro.config.mjs'), 'utf8')
    expect(config).toMatch(/base:\s*'\/[^']*\/'/)
  })

  it('no component hardcodes a root-relative internal href', () => {
    // Matches href="/foo" and href={'/foo' + x}, but not href="https://…",
    // href="#anchor", href="mailto:…" or anything interpolating BASE_URL.
    const hardcoded = /href=(?:'\/(?!\/)|"\/(?!\/)|\{'\/(?!\/)|\{"\/(?!\/))/

    const offenders = astroFiles
      .map((file) => ({
        file: path.relative(rootDir, file),
        lines: fs
          .readFileSync(file, 'utf8')
          .split('\n')
          .map((line, index) => ({ line: line.trim(), number: index + 1 }))
          .filter(({ line }) => hardcoded.test(line))
      }))
      .filter(({ lines }) => lines.length > 0)
      .map(({ file, lines }) => lines.map(({ number, line }) => `${file}:${number} ${line}`))
      .flat()

    expect(offenders).toEqual([])
  })

  it('the RSS route and timeline slugs build URLs from BASE_URL', () => {
    const rss = fs.readFileSync(path.join(rootDir, 'src/pages/rss.xml.js'), 'utf8')
    expect(rss).toContain('import.meta.env.BASE_URL')

    const timeline = fs.readFileSync(path.join(rootDir, 'src/utils/timeline.ts'), 'utf8')
    // Assignments only (slug: `…`), not the interface's `slug: string` declaration.
    const slugLines = timeline.split('\n').filter((line) => /slug:\s*`/.test(line))
    expect(slugLines.length).toBeGreaterThan(0)
    for (const line of slugLines) {
      expect(line).toContain('import.meta.env.BASE_URL')
    }
  })

  it('the web manifest is scoped to the configured base', () => {
    const config = fs.readFileSync(path.join(rootDir, 'astro.config.mjs'), 'utf8')
    const base = config.match(/base:\s*'([^']*)'/)?.[1]
    expect(base).toBeTruthy()

    const manifest = JSON.parse(
      fs.readFileSync(path.join(rootDir, 'public/site.webmanifest'), 'utf8')
    )

    expect(manifest.start_url).toBe(base)
    expect(manifest.scope).toBe(base)
    for (const icon of manifest.icons) {
      expect(icon.src.startsWith(base)).toBe(true)
      // The referenced file must actually exist in public/.
      const iconPath = path.join(rootDir, 'public', icon.src.slice(base!.length))
      expect(fs.existsSync(iconPath)).toBe(true)
    }
  })
})
