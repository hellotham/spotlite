// @vitest-environment jsdom

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { runAstroInlineScript } from './helpers/astro-script'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const componentPath = (relativePath: string) => path.join(rootDir, relativePath)

describe('navbar interaction behavior', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <button id="mobile-menu-button" class="mobile-menu-button" type="button" aria-expanded="false" aria-controls="mobile-menu"></button>
        <div id="mobile-menu" class="opacity-0 pointer-events-none scale-95"></div>
      </div>
    `
  })

  it('toggles menu visibility and closes when clicking outside', () => {
    runAstroInlineScript(componentPath('src/components/navbar.astro'), window)

    const button = document.getElementById('mobile-menu-button') as HTMLButtonElement
    const menu = document.getElementById('mobile-menu') as HTMLDivElement

    button.click()
    expect(button.getAttribute('aria-expanded')).toBe('true')
    expect(menu.classList.contains('opacity-100')).toBe(true)
    expect(menu.classList.contains('opacity-0')).toBe(false)

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(button.getAttribute('aria-expanded')).toBe('false')
    expect(menu.classList.contains('opacity-0')).toBe(true)
  })
})

describe('theme menu behavior', () => {
  beforeEach(() => {
    document.documentElement.className = ''
    localStorage.clear()

    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    }) as unknown as typeof window.matchMedia

    document.body.innerHTML = `
      <div>
        <button id="theme-toggle-button" aria-expanded="false"></button>
        <div id="theme-menu" class="hidden"></div>
        <div id="theme-auto" role="option"></div>
        <div id="theme-light" role="option"></div>
        <div id="theme-dark" role="option"></div>

        <span id="theme-auto-check" class="hidden"></span>
        <span id="theme-light-check" class="hidden"></span>
        <span id="theme-dark-check" class="hidden"></span>

        <div id="theme-auto-div" class=""></div>
        <span id="theme-light-span" class=""></span>
        <span id="theme-dark-span" class=""></span>
      </div>
    `
  })

  it('opens menu and applies selected dark theme', () => {
    runAstroInlineScript(componentPath('src/components/theme.astro'), window)

    const button = document.getElementById('theme-toggle-button') as HTMLButtonElement
    const menu = document.getElementById('theme-menu') as HTMLDivElement
    const darkOption = document.getElementById('theme-dark') as HTMLDivElement

    button.click()
    expect(button.getAttribute('aria-expanded')).toBe('true')
    expect(menu.classList.contains('hidden')).toBe(false)

    darkOption.click()
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(button.getAttribute('aria-expanded')).toBe('false')
    expect(menu.classList.contains('hidden')).toBe(true)
  })
})

describe('search panel behavior', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    document.body.innerHTML = `
      <div data-pagefind-search>
        <button data-search-toggle aria-expanded="false"></button>
        <div data-search-panel class="hidden">
          <input data-search-input />
          <p data-search-status>Type at least 2 characters.</p>
          <ul data-search-results><li>stale</li></ul>
        </div>
      </div>
    `
  })

  it('opens panel and handles short query without remote search', async () => {
    const fetchMock = vi.fn()
    globalThis.fetch = fetchMock as typeof fetch

    runAstroInlineScript(componentPath('src/components/search.astro'), window)

    const button = document.querySelector('[data-search-toggle]') as HTMLButtonElement
    const panel = document.querySelector('[data-search-panel]') as HTMLDivElement
    const input = document.querySelector('[data-search-input]') as HTMLInputElement
    const status = document.querySelector('[data-search-status]') as HTMLParagraphElement
    const list = document.querySelector('[data-search-results]') as HTMLUListElement

    button.click()
    expect(button.getAttribute('aria-expanded')).toBe('true')
    expect(panel.classList.contains('hidden')).toBe(false)

    input.value = 'a'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    await vi.advanceTimersByTimeAsync(200)

    expect(status.textContent).toBe('Type at least 2 characters.')
    expect(list.children.length).toBe(0)
    expect(fetchMock).not.toHaveBeenCalled()

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(panel.classList.contains('hidden')).toBe(true)
    expect(button.getAttribute('aria-expanded')).toBe('false')
  })
})
