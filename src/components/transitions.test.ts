import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Navigation Transitions', () => {
  it('navbar button should have transition classes', () => {
    const filePath = path.resolve(__dirname, './navbar.astro')
    const content = fs.readFileSync(filePath, 'utf-8')
    expect(content).toContain('transition')
    expect(content).toContain('duration-200')
  })

  it('navmenu links should have explicit transition classes', () => {
    const filePath = path.resolve(__dirname, './navmenu.astro')
    const content = fs.readFileSync(filePath, 'utf-8')
    expect(content).toContain('transition-colors')
    expect(content).toContain('duration-200')
  })
})
