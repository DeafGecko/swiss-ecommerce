import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-light)] bg-[var(--color-background-alt)] mt-8 sm:mt-12">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <span className="phase-name-p1 font-mono text-xs sm:text-sm">SWISS</span>
          <span className="phase-name-p2 inline-flex items-center gap-2">
            <span className="brand-icon inline-flex items-center justify-center w-6 h-6 bg-[#1a1a1a] text-white rounded-md flex-shrink-0" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '0.9rem', fontWeight: 400, lineHeight: '1' }}>M</span>
            <span className="brand-name text-sm font-semibold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '0.04em', lineHeight: '1' }}>Monolith</span>
          </span>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <a href="/about" className="hover:underline">About</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
          </nav>
          <small className="text-[10px] sm:text-xs text-[var(--color-text-muted)]">
            Copyright © 2026 09 Labs
          </small>
        </div>
      </div>
    </footer>
  )
}