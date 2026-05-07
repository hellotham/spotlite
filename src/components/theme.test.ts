import { describe, it, expect, beforeEach, vi } from 'vitest'
import { fireEvent } from '@testing-library/dom'

describe('Theme Switcher', () => {
  let button: HTMLButtonElement
  let menu: HTMLElement
  let autoBtn: HTMLElement
  let lightBtn: HTMLElement
  let darkBtn: HTMLElement

  beforeEach(() => {
    // Set up a mock DOM environment matching theme.astro
    document.body.innerHTML = `
      <button id="theme-toggle-button">Toggle</button>
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
  })

  it('should toggle the menu when the button is clicked', async () => {
    // We'll need to manually import/run the script logic here in the actual implementation
    // For the failing test, we'll just check if the current script works as expected (it won't because it calls reload)
    
    // Simulate the current theme switcher logic (simplified for the test)
    const runScript = () => {
      const btn = document.getElementById('theme-toggle-button')
      const m = document.getElementById('theme-menu')
      btn?.addEventListener('click', () => m?.classList.toggle('hidden'))
      
      document.getElementById('theme-light')?.addEventListener('click', () => {
        localStorage.theme = 'light'
        window.location.reload()
      })
    }

    runScript()

    fireEvent.click(button)
    expect(menu.classList.contains('hidden')).toBe(false)

    fireEvent.click(lightBtn)
    expect(localStorage.theme).toBe('light')
    expect(window.location.reload).toHaveBeenCalled() // Current behavior: RELOADS
  })

  it('should NOT reload the page when switching themes (FAILING TEST FOR TDD)', async () => {
    // This test will fail with the current implementation
    const runScript = () => {
      document.getElementById('theme-dark')?.addEventListener('click', () => {
        localStorage.theme = 'dark'
        window.location.reload() // Current logic
      })
    }
    runScript()

    fireEvent.click(darkBtn)
    expect(localStorage.theme).toBe('dark')
    // The requirement is NO RELOAD
    expect(window.location.reload).not.toHaveBeenCalled()
  })
})
