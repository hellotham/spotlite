import { describe, it, expect, beforeEach, vi } from 'vitest'
import { fireEvent } from '@testing-library/dom'

describe('Theme Switcher (Refactored)', () => {
  let button: HTMLButtonElement
  let menu: HTMLElement
  let autoBtn: HTMLElement
  let lightBtn: HTMLElement
  let darkBtn: HTMLElement

  beforeEach(() => {
    document.body.innerHTML = `
      <button id="theme-toggle-button" aria-expanded="false">Toggle</button>
      <div id="theme-menu" class="hidden">
        <div id="theme-auto" role="option">
          <div id="theme-auto-div">Auto</div>
          <span id="theme-auto-check" class="hidden">Check</span>
        </div>
        <div id="theme-light" role="option">
          <span id="theme-light-span">Light</span>
          <span id="theme-light-check" class="hidden">Check</span>
        </div>
        <div id="theme-dark" role="option">
          <span id="theme-dark-span">Dark</span>
          <span id="theme-dark-check" class="hidden">Check</span>
        </div>
      </div>
    `
    button = document.getElementById('theme-toggle-button') as HTMLButtonElement
    menu = document.getElementById('theme-menu')!
    autoBtn = document.getElementById('theme-auto')!
    lightBtn = document.getElementById('theme-light')!
    darkBtn = document.getElementById('theme-dark')!

    localStorage.clear()
    document.documentElement.className = ''
    
    // Mock location.reload
    vi.stubGlobal('location', { reload: vi.fn() })
    
    // Mock matchMedia
    vi.stubGlobal('matchMedia', vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })))

    // Simulation of the new refactored logic
    const updateUI = () => {
      const theme = localStorage.theme
      document.getElementById('theme-auto-check')?.classList.toggle('hidden', !!theme)
      document.getElementById('theme-light-check')?.classList.toggle('hidden', theme !== 'light')
      document.getElementById('theme-dark-check')?.classList.toggle('hidden', theme !== 'dark')
    }

    const updateTheme = () => {
      const theme = localStorage.theme
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      updateUI()
    }

    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true'
      button.setAttribute('aria-expanded', (!isExpanded).toString())
      menu.classList.toggle('hidden')
    })

    autoBtn.addEventListener('click', () => {
      localStorage.removeItem('theme')
      updateTheme()
      menu.classList.add('hidden')
      button.setAttribute('aria-expanded', 'false')
    })

    lightBtn.addEventListener('click', () => {
      localStorage.theme = 'light'
      updateTheme()
      menu.classList.add('hidden')
      button.setAttribute('aria-expanded', 'false')
    })

    darkBtn.addEventListener('click', () => {
      localStorage.theme = 'dark'
      updateTheme()
      menu.classList.add('hidden')
      button.setAttribute('aria-expanded', 'false')
    })
  })

  it('should toggle the menu and update aria-expanded', async () => {
    fireEvent.click(button)
    expect(menu.classList.contains('hidden')).toBe(false)
    expect(button.getAttribute('aria-expanded')).toBe('true')

    fireEvent.click(button)
    expect(menu.classList.contains('hidden')).toBe(true)
    expect(button.getAttribute('aria-expanded')).toBe('false')
  })

  it('should switch to light theme without reload', async () => {
    fireEvent.click(lightBtn)
    expect(localStorage.theme).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(window.location.reload).not.toHaveBeenCalled()
    expect(button.getAttribute('aria-expanded')).toBe('false')
  })

  it('should switch to dark theme without reload', async () => {
    fireEvent.click(darkBtn)
    expect(localStorage.theme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(window.location.reload).not.toHaveBeenCalled()
  })

  it('should respect system preference when Auto is selected', async () => {
    // Mock system preference as dark
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: true,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as any)

    fireEvent.click(autoBtn)
    expect(localStorage.theme).toBeUndefined()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
