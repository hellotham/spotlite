import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Page Animations', () => {
  it('index page should have entrance animation classes', () => {
    const filePath = path.resolve(__dirname, './pages/index.astro')
    const content = fs.readFileSync(filePath, 'utf-8')
    expect(content).toContain('animate-fade-in-up')
  })

  it('projects page should have entrance animation classes', () => {
    const filePath = path.resolve(__dirname, './layouts/ProjectsLayout.astro')
    const content = fs.readFileSync(filePath, 'utf-8')
    expect(content).toContain('animate-fade-in-up')
  })
})
