import { prisma } from '@/lib/prisma'
import { ProductGrid } from '@/components/ProductGrid'
import Link from 'next/link'

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const category = params?.category

  const where = category ? { category } : {}

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  const categories = await prisma.product.findMany({
    select: { category: true },
    distinct: ['category'],
  })

  const uniqueCategories = categories
    .map((c) => c.category)
    .filter((c): c is string => Boolean(c))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-mono text-2xl">
            {category ? category : 'All Products'}
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
        </div>
      </div>

      {uniqueCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <Link
            href="/products"
            className={`px-3 py-1 text-xs font-mono rounded-full border transition-colors ${
              !category
                ? 'bg-[var(--color-primary)] text-[var(--color-text-inverse)] border-[var(--color-primary)]'
                : 'border-[var(--color-border)] hover:border-[var(--color-border-dark)]'
            }`}
          >
            All
          </Link>
          {uniqueCategories.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}`}
              className={`px-3 py-1 text-xs font-mono rounded-full border transition-colors ${
                category === cat
                  ? 'bg-[var(--color-primary)] text-[var(--color-text-inverse)] border-[var(--color-primary)]'
                  : 'border-[var(--color-border)] hover:border-[var(--color-border-dark)]'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[var(--color-text-muted)]">No products found in this category.</p>
          <Link
            href="/products"
            className="inline-block mt-4 text-sm text-[var(--color-primary)] hover:underline"
          >
            View all products →
          </Link>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  )
}
