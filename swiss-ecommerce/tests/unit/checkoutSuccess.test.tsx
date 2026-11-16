import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { useCartStore } from '@/store/cartStore'

const push = vi.fn()
let sessionParam: string | null = 'ORD-20260101-AB12'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => ({ get: (key: string) => (key === 'session_id' ? sessionParam : null) }),
}))

vi.mock('react-hot-toast', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

const { default: SuccessPage } = await import('@/app/checkout/success/page')

function savedOrders() {
  return JSON.parse(localStorage.getItem('mock-orders') ?? '[]')
}

describe('checkout success page', () => {
  beforeEach(() => {
    localStorage.clear()
    push.mockReset()
    sessionParam = 'ORD-20260101-AB12'
    useCartStore.setState({ items: [] })
  })

  it('saves the cart as an order and clears the cart', async () => {
    useCartStore.setState({
      items: [{ id: 'l1', productId: 'p1', name: 'Lamp', price: 100, quantity: 2 }],
    })
    localStorage.setItem('cart-storage', JSON.stringify({ state: { items: useCartStore.getState().items }, version: 0 }))

    render(<SuccessPage />)

    await waitFor(() => expect(savedOrders()).toHaveLength(1))
    const [order] = savedOrders()
    expect(order.id).toBe('ORD-20260101-AB12')
    expect(order.items).toEqual([{ name: 'Lamp', quantity: 2, price: 100 }])
    expect(order.total).toBeCloseTo(200 * 1.08, 2)
    expect(useCartStore.getState().items).toEqual([])
  })

  it('does not save a $0 order when there is no cart behind the visit', async () => {
    render(<SuccessPage />)

    await waitFor(() => expect(screen.getByText('Order Confirmed!', { exact: false })).toBeTruthy())
    expect(savedOrders()).toEqual([])
  })

  it('does not duplicate an order when the page is reloaded', async () => {
    localStorage.setItem('cart-storage', JSON.stringify({ state: { items: [{ name: 'Lamp', quantity: 1, price: 10 }] }, version: 0 }))
    localStorage.setItem('mock-orders', JSON.stringify([{ id: 'ORD-20260101-AB12', items: [], total: 10.8, date: '' }]))

    render(<SuccessPage />)

    await waitFor(() => expect(screen.getByText('Order Confirmed!', { exact: false })).toBeTruthy())
    expect(savedOrders()).toHaveLength(1)
  })

  it('redirects home when session_id is missing', async () => {
    sessionParam = null
    render(<SuccessPage />)

    await waitFor(() => expect(push).toHaveBeenCalledWith('/'))
  })
})
