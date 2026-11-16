import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Header } from '@/components/Header'

function mockFetchResponse(body: unknown, ok = true) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ ok, json: () => Promise.resolve(body) })
  )
}

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('lists categories returned by the API in the Products dropdown', async () => {
    mockFetchResponse(['Lighting', 'Decor'])
    render(<Header />)

    fireEvent.click(screen.getByRole('button', { name: /Products/ }))

    expect(await screen.findByRole('link', { name: 'Lighting' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Decor' })).toBeTruthy()
  })

  it('does not crash when the categories API returns an error object', async () => {
    mockFetchResponse({ error: 'Failed to fetch categories' }, false)
    render(<Header />)

    await waitFor(() => expect(fetch).toHaveBeenCalled())
    fireEvent.click(screen.getByRole('button', { name: /Products/ }))

    expect(screen.getByRole('link', { name: 'All Products' })).toBeTruthy()
    expect(screen.queryByRole('link', { name: 'Lighting' })).toBeNull()
  })

  it('does not crash when the categories request rejects', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    render(<Header />)

    await waitFor(() => expect(fetch).toHaveBeenCalled())
    fireEvent.click(screen.getByRole('button', { name: /Products/ }))

    expect(screen.getByRole('link', { name: 'All Products' })).toBeTruthy()
  })

  it('shows the cart count badge from the cart store', async () => {
    mockFetchResponse([])
    localStorage.setItem(
      'cart-storage',
      JSON.stringify({
        state: { items: [{ id: 'l1', productId: 'p1', name: 'Lamp', price: 10, quantity: 3 }] },
        version: 0,
      })
    )
    const { useCartStore } = await import('@/store/cartStore')
    await useCartStore.persist.rehydrate()

    render(<Header />)

    expect(await screen.findByRole('link', { name: 'Shopping cart (3 items)' })).toBeTruthy()
  })
})
