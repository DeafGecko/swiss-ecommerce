import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-light)] bg-[var(--color-background-alt)] mt-8 sm:mt-12">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <span className="font-mono text-xs sm:text-sm flex items-center gap-1.5">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-10 -10 200 200"
              width="18"
              height="18"
            >
              <rect x="-10" y="-10" width="200" height="200" rx="36" fill="#232323" />
              <text
                x="90"
                y="132"
                fontFamily="Inter, system-ui, sans-serif"
                fontSize="110"
                fontWeight="700"
                textAnchor="middle"
                fill="#ffffff"
              >m</text>
            </svg>
            MONOCHROME
          </span>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <a href="/about" className="hover:underline">About</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
          </nav>
          <small className="text-[10px] sm:text-xs text-[var(--color-text-muted)]">
            © 2024 Monochrome Studio
          </small>
        </div>
      </div>
    </footer>
  )
}