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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
            <div className="order-2 md:order-1">
              <h1 className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="phase-name-p1">Swiss Industrial</span><span className="phase-name-p2">Monolith</span><br />
                <span className="text-[var(--color-text-secondary)] text-lg sm:text-xl md:text-2xl lg:text-3xl">
                  Minimalist Design
                </span>
              </h1>
              <p className="text-[var(--color-text-secondary)] mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base max-w-md">
                Precision-crafted products for the modern minimalist.
              </p>
              <a
                href="#all-products"
                className="inline-block mt-3 sm:mt-4 md:mt-6 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[var(--color-primary)] text-[var(--color-text-inverse)] font-mono text-xs sm:text-sm hover:bg-[var(--color-primary-hover)] transition-colors"
              >
                Explore Collection
              </a>
            </div>
            
            <div className="order-1 md:order-2 aspect-video rounded-lg overflow-hidden border border-[var(--color-border)] relative bg-[var(--color-background-alt)]">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
                alt="Monolith — minimalist interior"
                className="phase-image w-full h-full object-cover"
              />
              <div className="phase-image-placeholder absolute inset-0 flex items-center justify-center text-[var(--color-text-muted)] text-sm border border-dashed border-[var(--color-border)]">
                Hero Image
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