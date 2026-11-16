import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { PhaseSwitcher } from '@/components/PhaseSwitcher'

describe('PhaseSwitcher', () => {
  beforeEach(() => {
    localStorage.clear()
    document.head.innerHTML = ''
    document.body.removeAttribute('data-phase')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('defaults to Phase 1 when nothing is saved', () => {
    render(<PhaseSwitcher />)

    expect(screen.getByRole('button', { name: /Theme switcher — Grayscale/ })).toBeTruthy()
    expect(document.body.dataset.phase).toBe('grayscale')
    expect(document.head.querySelector('link[data-theme="grayscale"]')).not.toBeNull()
  })

  it('restores a saved valid phase', () => {
    localStorage.setItem('theme-preference', 'color')
    render(<PhaseSwitcher />)

    expect(document.body.dataset.phase).toBe('color')
    expect(screen.getByRole('button', { name: /Theme switcher — Color/ })).toBeTruthy()
  })

  it('falls back to Phase 1 when the saved value is unknown', () => {
    localStorage.setItem('theme-preference', 'neon')
    render(<PhaseSwitcher />)

    expect(document.body.dataset.phase).toBe('grayscale')
  })

  it('swaps the theme stylesheet and persists the choice on select', () => {
    render(<PhaseSwitcher />)

    fireEvent.click(screen.getByRole('button', { name: /Theme switcher/ }))
    fireEvent.click(screen.getByRole('option', { name: /Phase 3/ }))

    expect(localStorage.getItem('theme-preference')).toBe('animated')
    expect(document.body.dataset.phase).toBe('animated')
    const themeLinks = document.head.querySelectorAll('link[data-theme]')
    expect(themeLinks).toHaveLength(1)
    expect((themeLinks[0] as HTMLLinkElement).dataset.theme).toBe('animated')
  })

  it('loads the Google font only for phases 2 and 3', () => {
    render(<PhaseSwitcher />)
    expect(document.head.querySelector('link[data-font]')).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: /Theme switcher/ }))
    fireEvent.click(screen.getByRole('option', { name: /Phase 2/ }))

    expect(document.head.querySelector('link[data-font]')).not.toBeNull()
  })

  it('closes the listbox after selecting a phase', () => {
    render(<PhaseSwitcher />)

    fireEvent.click(screen.getByRole('button', { name: /Theme switcher/ }))
    expect(screen.getByRole('listbox')).toBeTruthy()

    fireEvent.click(screen.getByRole('option', { name: /Phase 2/ }))
    expect(screen.queryByRole('listbox')).toBeNull()
  })
})
