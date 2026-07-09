import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="font-mono text-2xl">Product Not Found</h1>
      <p className="text-[var(--color-text-secondary)] mt-2">
        The product you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 mt-6 px-6 py-3 bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-hover)] transition-colors"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        Back to Products
      </Link>
    </div>
  )
}
