import { describe, it, expect } from 'vitest'
import config from '../uno.config'

describe('UnoCSS Configuration', () => {
  it('should have custom animations defined', () => {
    expect(config.theme?.animation).toBeDefined()
    const animation = config.theme?.animation as any
    expect(animation.keyframes?.['fade-in-up']).toBeDefined()
  })

  it('should have prefers-reduced-motion preflight', () => {
    expect(config.preflights).toBeDefined()
    const preflights = config.preflights as any[]
    const hasReducedMotion = preflights.some(p => 
      typeof p.getCSS === 'function' && p.getCSS().includes('prefers-reduced-motion: reduce')
    )
    expect(hasReducedMotion).toBe(true)
  })
})
