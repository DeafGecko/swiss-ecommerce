'use client'

import { Heart, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'

interface Props {
  product: { id: string; name: string; price: number }
}

export function ProductActions({ product }: Props) {
  const addToCart = useCartStore((state) => state.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()
  const [wishlisted, setWishlisted] = useState(false)

  useEffect(() => {
    setWishlisted(isInWishlist(product.id))
  }, [isInWishlist, product.id])

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        type="button"
        aria-label={`Add ${product.name} to cart`}
        onClick={() => {
          addToCart({ id: product.id, name: product.name, price: product.price })
          toast.success('Added to cart!')
        }}
        className="flex-1 px-6 py-3 bg-[var(--color-primary)] text-[var(--color-text-inverse)] font-mono text-sm hover:bg-[var(--color-primary-hover)] transition-colors rounded flex items-center justify-center gap-2"
      >
        <ShoppingCart size={16} aria-hidden="true" />
        Add to Cart
      </button>

      <button
        type="button"
        aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        onClick={() => {
          toggleItem({ id: product.id, name: product.name, price: product.price })
          setWishlisted(!wishlisted)
          toast.success(wishlisted ? 'Removed from wishlist' : 'Saved to wishlist!')
        }}
        className={`px-4 py-3 border rounded transition-colors flex items-center justify-center gap-2 font-mono text-sm ${
          wishlisted
            ? 'border-[var(--color-error)] text-[var(--color-error)] hover:bg-red-50'
            : 'border-[var(--color-border)] hover:border-[var(--color-border-dark)]'
        }`}
      >
        <Heart
          size={16}
          aria-hidden="true"
          className={wishlisted ? 'fill-[var(--color-heart)] text-[var(--color-heart)]' : ''}
        />
        {wishlisted ? 'Wishlisted' : 'Wishlist'}
      </button>
    </div>
  )
}
