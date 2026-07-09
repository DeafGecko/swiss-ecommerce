import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ProductGrid } from '@/components/ProductGrid'
import { Image as ImageIcon } from 'lucide-react'

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
                Monochrome Studio<br />
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
            
            <div
              className="order-1 md:order-2 aspect-video bg-[var(--color-background-alt)] border border-[var(--color-border)] rounded-lg flex items-center justify-center"
              role="img"
              aria-label="Monochrome Studio hero image"
            >
              <span className="text-[var(--color-text-muted)] text-sm" aria-hidden="true">Hero Image</span>
            </div>
          </div>

{/* Popular Products Strip */}
          {popular.length > 0 && (
            <div className="mt-6 sm:mt-8 md:mt-12">
              <h2 className="font-mono text-xs sm:text-sm text-[var(--color-text-secondary)] mb-3 sm:mb-4">
                POPULAR
              </h2>
              <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 sm:pb-4">
                {popular.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`} className="flex-shrink-0 w-16 sm:w-20 md:w-24 text-center group">
                    <div className="aspect-square bg-[var(--color-background-alt)] border border-[var(--color-border)] group-hover:border-[var(--color-border-dark)] rounded-full flex items-center justify-center transition-colors" aria-hidden="true">
                      <ImageIcon size={14} className="text-[var(--color-text-muted)]" aria-hidden="true" />
                    </div>
                    <p className="text-[10px] sm:text-xs mt-1 sm:mt-2 truncate group-hover:underline">{product.name}</p>
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