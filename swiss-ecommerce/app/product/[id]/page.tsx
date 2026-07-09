import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductActions } from './ProductActions'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params

  const product = await prisma.product.findUnique({ where: { id } })

  if (!product) notFound()

  return (
    <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors inline-flex items-center gap-1"
        >
          ← Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div
          className="aspect-square bg-[var(--color-background-alt)] border border-[var(--color-border)] rounded-lg flex items-center justify-center"
          role="img"
          aria-label={`Product image for ${product.name}`}
        >
          <span className="text-6xl" aria-hidden="true">📷</span>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          {product.category && (
            <p className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest">
              {product.category}
            </p>
          )}

          <h1 className="font-mono text-2xl sm:text-3xl font-bold">{product.name}</h1>

          <p className="font-mono text-2xl">${product.price.toFixed(2)}</p>

          {product.description && (
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              {product.description}
            </p>
          )}

          <div className="border-t border-[var(--color-border-light)] pt-4 mt-2">
            <ProductActions product={{ id: product.id, name: product.name, price: product.price }} />
          </div>

          {product.sku && (
            <p className="text-xs text-[var(--color-text-muted)] font-mono mt-2">
              SKU: {product.sku}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
