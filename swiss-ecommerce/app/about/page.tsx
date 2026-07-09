import Link from 'next/link'
import { Zap, Target, Recycle } from 'lucide-react'

export default function AboutPage() {
      return (
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
            {/* Header */}
            <div className="mb-8">
            <Link
            href="/"
            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors inline-flex items-center gap-1"
            >
            ← Back to Home
            </Link>
            </div>

            {/* Hero Section */}
            <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
            <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  About Monochrome Studio
            </h1>
            <div className="w-12 h-0.5 bg-[var(--color-primary)] mx-auto mt-4" aria-hidden="true"></div>
            </div>

            {/* Brand Story */}
            <div className="space-y-6 text-[var(--color-text-secondary)] leading-relaxed">
            <p className="text-lg">
                  Monochrome Studio is a minimalist design brand inspired by{' '}
                  <span className="text-[var(--color-text)] font-medium">Swiss industrial precision</span>.
                  We believe that great design is timeless, functional, and honest.
            </p>

            <p>
                  Every product in our collection is carefully crafted to bring simplicity and elegance
                  into your daily life. We work with skilled artisans and use premium materials to ensure
                  each piece meets the highest standards of quality.
            </p>

            <div className="border-l-4 border-[var(--color-primary)] pl-4 py-2 my-6">
                  <p className="text-[var(--color-text)] font-mono text-lg">
                  "Form follows function."
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">— Our design philosophy</p>
            </div>

            <p>
                  From desk lamps to leather goods, each item is designed to be both beautiful and
                  purposeful. We don't follow trends — we create timeless pieces that you'll cherish
                  for years to come.
            </p>
            </div>

            {/* Values Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-[var(--color-border-light)]">
            <div className="text-center">
                  <div className="flex justify-center mb-2">
                  <Zap size={32} strokeWidth={1.5} className="text-[var(--color-primary)]" aria-hidden="true" />
                  </div>
                  <h3 className="font-mono text-sm font-medium">Quality</h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Premium materials, expert craftsmanship</p>
            </div>
            <div className="text-center">
                  <div className="flex justify-center mb-2">
                  <Target size={32} strokeWidth={1.5} className="text-[var(--color-primary)]" aria-hidden="true" />
                  </div>
                  <h3 className="font-mono text-sm font-medium">Simplicity</h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Clean lines, minimal design</p>
            </div>
            <div className="text-center">
                  <div className="flex justify-center mb-2">
                  <Recycle size={32} strokeWidth={1.5} className="text-[var(--color-primary)]" aria-hidden="true" />
                  </div>
                  <h3 className="font-mono text-sm font-medium">Sustainability</h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Built to last, responsibly sourced</p>
            </div>
            </div>

            {/* Team / Studio Section */}
            <div className="mt-12 pt-8 border-t border-[var(--color-border-light)]">
            <h2 className="font-mono text-lg mb-4">Our Studio</h2>
            <p className="text-[var(--color-text-secondary)] text-sm">
                  Founded in 2024, Monochrome Studio is a small team of designers, makers, and dreamers
                  based in the heart of the Pacific Northwest. We're passionate about creating products
                  that make everyday life more beautiful.
            </p>
            </div>

            {/* CTA Section */}
            <div className="mt-12 pt-8 border-t border-[var(--color-border-light)] text-center">
            <p className="text-[var(--color-text-secondary)] text-sm">
                  Discover our collection of minimalist essentials.
            </p>
            <Link
                  href="/products"
                  className="inline-block mt-4 px-6 py-3 bg-[var(--color-primary)] text-[var(--color-text-inverse)] font-mono text-sm hover:bg-[var(--color-primary-hover)] transition-colors"
            >
                  Explore Collection →
            </Link>
            </div>
            </div>
      </div>
      )
}