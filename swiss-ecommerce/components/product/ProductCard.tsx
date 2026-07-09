'use client'

import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  category: string
}

export function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()
  const [wishlisted, setWishlisted] = useState(false)

  useEffect(() => {
    setWishlisted(isInWishlist(product.id))
  }, [isInWishlist, product.id])

  return (
    <div className="group border border-[var(--color-border)] rounded-lg overflow-hidden hover:shadow-[var(--box-shadow-hover)] transition-all">
      <Link href={`/product/${product.id}`} aria-label={`View ${product.name}`}>
        <div
          className="aspect-square bg-[var(--color-background-alt)] flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-3xl" aria-hidden="true">📷</span>
        </div>
      </Link>

      <div className="p-3">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-mono text-xs truncate hover:underline">{product.name}</h3>
        </Link>
        <p className="text-sm font-medium mt-1">${product.price.toFixed(2)}</p>

        <div className="flex items-center gap-2 mt-3">
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => {
              addToCart({ id: product.id, name: product.name, price: product.price })
              toast.success('Added to cart!')
            }}
            className="flex-1 px-2 py-1 text-xs font-mono border border-[var(--color-border)] hover:border-[var(--color-border-dark)] hover:bg-[var(--color-background-alt)] transition-colors rounded flex items-center justify-center gap-1"
          >
            <ShoppingCart size={12} aria-hidden="true" />
            Add
          </button>

          <button
            type="button"
            aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            onClick={() => {
              toggleItem({ id: product.id, name: product.name, price: product.price })
              setWishlisted(!wishlisted)
              toast.success(wishlisted ? 'Removed from wishlist' : 'Saved to wishlist!')
            }}
            className="p-1.5 border border-[var(--color-border)] hover:border-[var(--color-error)] transition-colors rounded"
          >
            <Heart
              size={14}
              aria-hidden="true"
              className={wishlisted ? 'fill-[var(--color-heart)] text-[var(--color-heart)]' : 'text-[var(--color-text-muted)]'}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
