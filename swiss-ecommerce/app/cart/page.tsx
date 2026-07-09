'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { Trash2, Plus, Minus, Image as ImageIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function CartPage() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-mono text-2xl">Your Cart is Empty</h1>
        <p className="text-[var(--color-text-secondary)] mt-2">Start shopping to add items</p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          Browse Products →
        </Link>
      </div>
    )
  }

  const total = getTotalPrice()

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
        }),
      })
      const data = await response.json()
      if (data.url) {
        router.push(data.url)
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('Failed to start checkout.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h1 className="font-mono text-2xl sm:text-3xl mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border border-[var(--color-border)] rounded-lg hover:border-[var(--color-border-dark)] transition-colors"
              >
                <div className="w-16 h-16 bg-[var(--color-background-alt)] border border-[var(--color-border)] rounded flex items-center justify-center flex-shrink-0">
                  <ImageIcon size={20} className="text-[var(--color-text-muted)]" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-mono text-sm truncate">{item.name}</h3>
                  <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    aria-label={`Decrease quantity of ${item.name}`}
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="p-1 border border-[var(--color-border)] rounded hover:bg-[var(--color-background-alt)] transition-colors"
                  >
                    <Minus size={14} aria-hidden="true" />
                  </button>
                  <span className="w-8 text-center text-sm font-mono" aria-live="polite">{item.quantity}</span>
                  <button
                    aria-label={`Increase quantity of ${item.name}`}
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="p-1 border border-[var(--color-border)] rounded hover:bg-[var(--color-background-alt)] transition-colors"
                  >
                    <Plus size={14} aria-hidden="true" />
                  </button>
                </div>
                <button
                  aria-label={`Remove ${item.name} from cart`}
                  onClick={() => {
                    removeItem(item.productId)
                    toast.success('Removed from cart')
                  }}
                  className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors"
                >
                  <Trash2 size={18} aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              clearCart()
              toast.success('Cart cleared')
            }}
            className="mt-4 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors underline"
          >
            Clear Cart
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="border border-[var(--color-border)] rounded-lg p-6 sticky top-24">
            <h2 className="font-mono text-lg mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Tax</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-[var(--color-border)] pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(total * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full mt-4 px-6 py-3 bg-[var(--color-primary)] text-[var(--color-text-inverse)] font-mono text-sm hover:bg-[var(--color-primary-hover)] transition-colors rounded disabled:opacity-50"
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
