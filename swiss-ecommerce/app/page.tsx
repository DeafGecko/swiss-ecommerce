import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ProductGrid } from '@/components/ProductGrid'

export default async function HomePage() {
  const products = await prisma.product.findMany({
    take: 50,
    orderBy: { createdAt: 'desc' }
  })

  const popular = await prisma.product.findMany({
    where: { isPopular: true },
    take: 5
  })

  return (
    <div className="min-h-screen">
{/* Hero Section */}
        <section className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
          {/* Phase 1 hero — two column layout */}
          <div className="phase-name-p1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
              <div>
                <h1 className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Swiss Industrial
                </h1>
                <p className="text-[var(--color-text-secondary)] text-lg sm:text-xl font-mono mt-1">
                  Objects built to last.
                </p>
                <p className="text-[var(--color-text-secondary)] mt-3 text-sm sm:text-base max-w-md leading-relaxed">
                  Industrial-grade home and office goods. No ornamentation. No compromise. Just the object, done right.
                </p>
                <a href="#all-products" className="inline-block mt-6 px-5 py-2.5 bg-[var(--color-primary)] text-[var(--color-text-inverse)] font-mono text-xs sm:text-sm hover:bg-[var(--color-primary-hover)] transition-colors">
                  Browse Collection →
                </a>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden border border-dashed border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] text-sm bg-[var(--color-background-alt)]">
                Hero Image
              </div>
            </div>
          </div>

          {/* Phase 2 & 3 hero — two column: text left, image right */}
          <div className="phase-name-p2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="brand-icon flex items-center justify-center w-14 h-14 bg-[#1a1a1a] text-white rounded-lg flex-shrink-0" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '2rem', fontWeight: 400 }}>
                  M
                </div>
                <h1 className="brand-name text-5xl sm:text-6xl font-semibold leading-none" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  Monolith
                </h1>
                <p className="text-xs tracking-[0.25em] uppercase text-[var(--color-text-secondary)]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                  Where Form Meets Function.
                </p>
                <div className="w-10 h-px bg-[var(--color-text-secondary)]" />
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-sm" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                  A curated collection of objects designed to bring quiet precision to your home and workspace. Each piece selected for craftsmanship, longevity, and restraint.
                </p>
                <a href="#all-products" className="inline-block px-8 py-3 bg-[var(--color-primary)] text-[var(--color-text-inverse)] text-xs tracking-widest uppercase hover:bg-[var(--color-primary-hover)] transition-colors" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                  Shop the Collection
                </a>
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden pr-8 md:pr-12">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
                  alt="Monolith — minimalist interior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

{/* Popular Products Strip */}
          {popular.length > 0 && (
            <div className="mt-6 sm:mt-8 md:mt-12">
              <h2 className="font-mono text-xs sm:text-sm text-[var(--color-text-secondary)] mb-3 sm:mb-4">
                POPULAR
              </h2>
              <div className="grid grid-cols-5 gap-4">
                {popular.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`} className="group">
                    <div className="border border-[var(--color-border)] rounded-xl p-3 flex flex-col items-center gap-2 bg-[var(--color-background-alt)] hover:border-[var(--color-border-dark)] hover:shadow-[var(--box-shadow-hover)] transition-all">
                      <div className="w-full aspect-square overflow-hidden rounded-lg">
                        <img
                          src={product.images[0] ?? ''}
                          alt={product.name}
                          className="phase-image w-full h-full object-cover"
                        />
                        <div className="phase-image-placeholder w-full h-full border border-dashed border-[var(--color-border)] rounded-lg" aria-hidden="true" />
                      </div>
                      <p className="text-[10px] sm:text-xs text-center font-mono leading-tight group-hover:underline line-clamp-2">{product.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Product Grid */}
        <section id="all-products" className="container mx-auto px-3 sm:px-4 md:px-6 pb-6 sm:pb-8 md:pb-12">
          <h2 className="font-mono text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 md:mb-6">All Products</h2>
          <ProductGrid products={products} />
        </section>
    </div>
  )
}