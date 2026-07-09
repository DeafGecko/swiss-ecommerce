'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Package, ChevronRight, ChevronDown, Trash2 } from 'lucide-react'

interface Order {
  id: string
  items: Array<{ name: string; quantity: number; price: number }>
  total: number
  date: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  useEffect(() => {
    const saved = localStorage.getItem('mock-orders')
    if (saved) {
      try {
        const parsed: Order[] = JSON.parse(saved)
        const seen = new Set<string>()
        const deduped = parsed.filter((o) => {
          if (seen.has(o.id)) return false
          seen.add(o.id)
          return true
        })
        if (deduped.length !== parsed.length) {
          localStorage.setItem('mock-orders', JSON.stringify(deduped))
        }
        setOrders(deduped)
      } catch {
        // leave orders empty, don't overwrite localStorage
      }
    }
    setIsMounted(true)
  }, [])

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const deleteOrder = (id: string) => {
    const updated = orders.filter((o) => o.id !== id)
    setOrders(updated)
    localStorage.setItem('mock-orders', JSON.stringify(updated))
  }

  const clearAllOrders = () => {
    if (confirm('Remove all order history?')) {
      setOrders([])
      localStorage.removeItem('mock-orders')
    }
  }

  if (!isMounted) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package size={48} className="mx-auto text-[var(--color-text-muted)]" aria-hidden="true" />
        <h1 className="font-mono text-2xl mt-4">No Orders Yet</h1>
        <p className="text-[var(--color-text-secondary)] mt-2">Start shopping to see your orders here</p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          Browse Products →
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-mono text-2xl sm:text-3xl">Order History</h1>
        <button
          type="button"
          onClick={clearAllOrders}
          className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 border border-red-300 text-red-600 hover:bg-red-50 transition-colors rounded"
        >
          <Trash2 size={13} aria-hidden="true" /> Clear All
        </button>
      </div>
      <div className="space-y-4">
        {orders.map((order) => {
          const isExpanded = expanded.has(order.id)
          const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0)
          const tax = order.total - subtotal

          return (
            <div
              key={order.id}
              className="border border-[var(--color-border)] rounded-lg p-6 hover:shadow-[var(--box-shadow-hover)] transition-all"
            >
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <p className="font-mono text-sm text-[var(--color-text-secondary)]">
                    Order #{order.id}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xl font-bold">
                    ${order.total.toFixed(2)}
                  </p>
                  <span className="inline-block mt-1 text-xs px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full">
                    Delivered
                  </span>
                </div>
              </div>

              {/* Collapsed preview */}
              {!isExpanded && (
                <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                  <div className="flex flex-wrap gap-4">
                    {order.items.slice(0, 3).map((item, index) => (
                      <div key={index} className="text-sm">
                        <span className="text-[var(--color-text-secondary)]">{item.quantity}x</span>
                        <span className="ml-2">{item.name}</span>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <span className="text-sm text-[var(--color-text-muted)]">
                        +{order.items.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Expanded detail */}
              {isExpanded && (
                <div id={`order-details-${order.id}`} className="mt-4 pt-4 border-t border-[var(--color-border)]">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-[var(--color-text-secondary)] font-mono text-xs border-b border-[var(--color-border)]">
                        <th className="text-left pb-2">Item</th>
                        <th className="text-center pb-2">Qty</th>
                        <th className="text-right pb-2">Unit</th>
                        <th className="text-right pb-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={index} className="border-b border-[var(--color-border)] last:border-0">
                          <td className="py-2 pr-4">{item.name}</td>
                          <td className="py-2 text-center text-[var(--color-text-secondary)]">{item.quantity}</td>
                          <td className="py-2 text-right text-[var(--color-text-secondary)]">${item.price.toFixed(2)}</td>
                          <td className="py-2 text-right font-mono">${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="font-mono text-sm">
                      <tr>
                        <td colSpan={3} className="pt-3 text-right text-[var(--color-text-secondary)]">Subtotal</td>
                        <td className="pt-3 text-right">${subtotal.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="text-right text-[var(--color-text-secondary)]">Tax (8%)</td>
                        <td className="text-right">${tax.toFixed(2)}</td>
                      </tr>
                      <tr className="font-bold border-t border-[var(--color-border)]">
                        <td colSpan={3} className="pt-2 text-right">Total</td>
                        <td className="pt-2 text-right">${order.total.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                {isExpanded ? (
                  <button
                    type="button"
                    aria-expanded="true"
                    aria-controls={`order-details-${order.id}`}
                    onClick={() => toggleExpanded(order.id)}
                    className="text-sm font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors flex items-center gap-1"
                  >
                    Hide Details <ChevronDown size={14} aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    aria-expanded="false"
                    aria-controls={`order-details-${order.id}`}
                    onClick={() => toggleExpanded(order.id)}
                    className="text-sm font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors flex items-center gap-1"
                  >
                    View Details <ChevronRight size={14} aria-hidden="true" />
                  </button>
                )}
                <button
                  type="button"
                  aria-label={`Remove order #${order.id}`}
                  onClick={() => deleteOrder(order.id)}
                  className="flex items-center gap-1 text-xs font-mono text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={13} aria-hidden="true" /> Remove
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
