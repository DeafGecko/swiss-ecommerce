'use client'

import Link from 'next/link'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import { Heart, ShoppingCart, Image as ImageIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function WishlistPage() {
  const { items, removeItem, clearWishlist, getTotalItems } = useWishlistStore()
  const addToCart = useCartStore((state) => state.addItem)

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart size={48} className="mx-auto text-[var(--color-text-muted)]" aria-hidden="true" />
        <h1 className="font-mono text-2xl mt-4">Your Wishlist is Empty</h1>
        <p className="text-[var(--color-text-secondary)] mt-2">Start saving your favorite products</p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          Browse Products →
        </Link>
      </div>
    )
  }

  const totalItems = getTotalItems()

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-mono text-2xl sm:text-3xl">Wishlist</h1>
        <span className="text-sm text-[var(--color-text-secondary)]">
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item) => (
          <div key={item.id} className="border border-[var(--color-border)] rounded-lg overflow-hidden hover:shadow-[var(--box-shadow-hover)] transition-all">
            <Link href={`/product/${item.productId}`} tabIndex={-1} aria-hidden="true">
              <div className="aspect-square bg-[var(--color-background-alt)] flex items-center justify-center">
                <ImageIcon size={20} className="text-[var(--color-text-muted)]" aria-hidden="true" />
              </div>
            </Link>
            <div className="p-3">
              <Link href={`/product/${item.productId}`}>
                <h3 className="font-mono text-sm hover:underline truncate">{item.name}</h3>
              </Link>
              <p className="text-sm font-medium mt-1">${item.price.toFixed(2)}</p>

              <div className="flex items-center gap-2 mt-3">
                <button
                  aria-label={`Add ${item.name} to cart`}
                  onClick={() => {
                    addToCart({
                      id: item.productId,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                    })
                    toast.success('Added to cart!')
                  }}
                  className="flex-1 px-2 py-1 text-xs font-mono border border-[var(--color-border)] hover:border-[var(--color-border-dark)] hover:bg-[var(--color-background-alt)] transition-colors rounded"
                >
                  <ShoppingCart size={14} className="inline mr-1" aria-hidden="true" />
                  Add
                </button>
                <button
                  aria-label={`Remove ${item.name} from wishlist`}
                  onClick={() => {
                    removeItem(item.productId)
                    toast.success('Removed from wishlist')
                  }}
                  className="p-1.5 border border-[var(--color-border)] hover:border-[var(--color-error)] transition-colors rounded"
                >
                  <Heart size={14} className="fill-[var(--color-heart)] text-[var(--color-heart)]" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          clearWishlist()
          toast.success('Wishlist cleared')
        }}
        className="mt-6 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors underline"
      >
        Clear Wishlist
      </button>
    </div>
  )
}