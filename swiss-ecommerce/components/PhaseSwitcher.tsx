'use client'

import { useState, useEffect, useRef } from 'react'
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

  useEffect(() => {
    const saved = localStorage.getItem('theme-preference')
    if (saved && PHASES.some(p => p.id === saved)) {
      setActive(saved)
      loadTheme(saved)
    } else {
      loadTheme('grayscale')
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const loadTheme = (themeId: string) => {
    document.querySelectorAll('link[data-theme]').forEach(el => el.remove())
    const phase = PHASES.find(p => p.id === themeId)
    if (!phase) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = phase.file
    link.dataset.theme = themeId
    document.head.appendChild(link)
    setActive(themeId)
    localStorage.setItem('theme-preference', themeId)
    setIsOpen(false)
  }

  const activePhase = PHASES.find(p => p.id === active)
  const ActiveIcon = activePhase?.icon

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-[var(--color-border)] rounded-full hover:bg-[var(--color-background-alt)] transition-colors"
      >
        {ActiveIcon && <ActiveIcon size={14} strokeWidth={1.8} aria-hidden="true" />}
        <span>{activePhase?.label}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            marginTop: '8px',
            width: '200px',
            backgroundColor: '#ffffff',
            border: '1px solid #d4d4d4',
            borderRadius: '8px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            zIndex: 9999,
            overflow: 'hidden',
          }}
        >
          {PHASES.map((phase) => {
            const isActive = active === phase.id
            const PhaseIcon = phase.icon
            return (
              <button
                key={phase.id}
                onClick={() => loadTheme(phase.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '10px 16px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  background: isActive ? '#1a1a1a' : 'transparent',
                  color: isActive ? '#ffffff' : '#1a1a1a',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = '#f5f5f5'
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <PhaseIcon size={18} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontWeight: 500 }}>{phase.label}</div>
                  <div style={{ fontSize: '12px', opacity: isActive ? 0.8 : 0.6 }}>
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