'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { CheckCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [orderSaved, setOrderSaved] = useState(false)
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    const id = searchParams.get('session_id')
    if (!id) {
      router.push('/')
      return
    }
    setSessionId(id)

    // Save order first, then clear the cart
    try {
      interface CartItem { name: string; quantity: number; price: number }
      const cartData = JSON.parse(localStorage.getItem('cart-storage') ?? '{"state":{"items":[]}}')
      const items: CartItem[] = cartData.state?.items ?? []

      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const order = {
        id,
        items: items.map(({ name, quantity, price }) => ({ name, quantity, price })),
        total: subtotal * 1.08,
        date: new Date().toISOString(),
      }

      // Get existing orders, skip if this session was already saved
      const existingOrders = JSON.parse(localStorage.getItem('mock-orders') || '[]')
      if (!existingOrders.some((o: { id: string }) => o.id === id)) {
        existingOrders.push(order)
        localStorage.setItem('mock-orders', JSON.stringify(existingOrders))
        setOrderSaved(true)
        toast.success('Order saved successfully!')
      }
    } catch (error) {
      console.error('Failed to save order:', error)
    }

    // Clear the cart after saving the order
    clearCart()
  }, [searchParams, router, clearCart])

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-50 border border-green-200" aria-hidden="true">
        <CheckCircle size={48} className="text-green-600" aria-hidden="true" />
      </div>
      <h1 className="font-mono text-3xl mt-6">Order Confirmed! <span aria-hidden="true">🎉</span></h1>
      <p className="text-[var(--color-text-secondary)] mt-2 max-w-md mx-auto">
        Thank you for your purchase. Your order has been confirmed and will be processed shortly.
      </p>
      {sessionId && (
        <div className="mt-4 p-4 bg-[var(--color-background-alt)] border border-[var(--color-border)] rounded-lg inline-block">
          <p className="text-xs font-mono text-[var(--color-text-muted)]">
            Order ID: <span className="text-[var(--color-text)]">{sessionId}</span>
          </p>
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Link
          href="/orders"
          className="px-6 py-3 bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-hover)] transition-colors rounded"
        >
          View Orders →
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