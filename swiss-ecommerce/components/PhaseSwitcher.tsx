'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Check, ChevronDown, Palette, Sparkles, Square } from 'lucide-react'

const PHASES = [
  { id: 'grayscale', label: 'Phase 1', sub: 'Grayscale', icon: Square, file: '/styles/themes/grayscale.css' },
  { id: 'color', label: 'Phase 2', sub: 'Color', icon: Palette, file: '/styles/themes/color-ui.css' },
  { id: 'animated', label: 'Phase 3', sub: 'Animated', icon: Sparkles, file: '/styles/themes/animated.css' },
]

export function PhaseSwitcher() {
  const [active, setActive] = useState('grayscale')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const loadTheme = useCallback((themeId: string) => {
    document.querySelectorAll('link[data-theme]').forEach((el) => el.remove())
    const phase = PHASES.find((p) => p.id === themeId)
    if (!phase) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = phase.file
    link.dataset.theme = themeId
    document.head.appendChild(link)
    setActive(themeId)
    localStorage.setItem('theme-preference', themeId)
    setIsOpen(false)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('theme-preference')
    const validSaved = saved && PHASES.some((p) => p.id === saved) ? saved : 'grayscale'
    loadTheme(validSaved)
  }, [loadTheme])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const activePhase = PHASES.find((p) => p.id === active)
  const ActiveIcon = activePhase?.icon

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-haspopup="listbox"
        aria-label={`Theme switcher — ${activePhase?.sub ?? 'Grayscale'}`}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-[var(--color-border)] rounded-full hover:bg-[var(--color-background-alt)] transition-colors"
      >
        {ActiveIcon && <ActiveIcon size={14} strokeWidth={1.8} aria-hidden="true" />}
        <span>{activePhase?.label}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Select theme"
          className="absolute right-0 top-full mt-2 w-48 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg shadow-[var(--box-shadow-hover)] overflow-hidden z-[var(--z-dropdown)]"
        >
          {PHASES.map((phase) => {
            const isActive = active === phase.id
            const PhaseIcon = phase.icon
            return (
              <button
                key={phase.id}
                type="button"
                role="option"
                aria-selected={isActive ? 'true' : 'false'}
                onClick={() => loadTheme(phase.id)}
                className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-mono text-left transition-colors ${
                  isActive
                    ? 'bg-[var(--color-primary)] text-[var(--color-text-inverse)]'
                    : 'text-[var(--color-text)] hover:bg-[var(--color-background-alt)]'
                }`}
              >
                <PhaseIcon size={16} strokeWidth={1.8} aria-hidden="true" />
                <div className="flex-1">
                  <div className="font-medium">{phase.label}</div>
                  <div className={`text-xs ${isActive ? 'opacity-80' : 'opacity-60'}`}>
                    {phase.sub}
                  </div>
                </div>
                {isActive && <Check size={14} strokeWidth={2.2} aria-hidden="true" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
