import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

describe('Package Scripts', () => {
  it('should have a pdf script', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'))
    expect(pkg.scripts.pdf).toContain('node scripts/generate-pdf.js')
    // The generator renders the built /cv routes, so it must build first: running it
    // against a stale dist would silently emit an outdated CV.
    expect(pkg.scripts.pdf).toContain('pnpm run build')
  })

  it('should have an updated build script', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'))
    expect(pkg.scripts.build).toContain('astro build')
    expect(pkg.scripts.build).toContain('pnpm run search:index')
    // PDF generation was deliberately removed from the build (see cc834b4); it needs
    // a headless Chrome and is run on demand via `pnpm run pdf`.
    expect(pkg.scripts.build).not.toContain('pnpm run pdf')
  })
})
