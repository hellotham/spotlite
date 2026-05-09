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

  it('articlelist should have smooth transition for hover effect', () => {
    const filePath = path.resolve(__dirname, './articlelist.astro')
    const content = fs.readFileSync(filePath, 'utf-8')
    expect(content).toContain('duration-300')
  })

  it('imagecards should have hover transitions', () => {
    const filePath = path.resolve(__dirname, './imagecards.astro')
    const content = fs.readFileSync(filePath, 'utf-8')
    expect(content).toContain('transition-all')
    expect(content).toContain('hover:-translate-y-1')
  })

  it('work CV button should have duration class', () => {
    const filePath = path.resolve(__dirname, './work.astro')
    const content = fs.readFileSync(filePath, 'utf-8')
    expect(content).toContain('duration-200')
  })

  it('mobile menu should have transition classes', () => {
    const filePath = path.resolve(__dirname, './navbar.astro')
    const content = fs.readFileSync(filePath, 'utf-8')
    expect(content).toContain('transition')
    expect(content).toContain('duration-300')
    expect(content).toContain('opacity-0')
  })
})
