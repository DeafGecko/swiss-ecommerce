import Link from 'next/link'
import { XCircle } from 'lucide-react'

export default function CancelPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-50 border border-red-200" aria-hidden="true">
        <XCircle size={48} className="text-red-600" aria-hidden="true" />
      </div>
      <h1 className="font-mono text-3xl mt-6">Payment Cancelled</h1>
      <p className="text-[var(--color-text-secondary)] mt-2 max-w-md mx-auto">
        Your payment was not completed. Nothing has been charged to your account.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Link
          href="/cart"
          className="px-6 py-3 bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-hover)] transition-colors rounded"
        >
          Return to Cart
        </Link>
        <Link
          href="/"
          className="px-6 py-3 border border-[var(--color-border)] hover:border-[var(--color-border-dark)] transition-colors rounded"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}