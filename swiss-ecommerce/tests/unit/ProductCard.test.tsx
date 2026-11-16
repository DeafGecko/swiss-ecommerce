import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { ProductCard } from '@/components/product/ProductCard'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'

vi.mock('react-hot-toast', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

const product = {
  id: 'p1',
  name: 'Desk Lamp',
  price: 149.99,
  images: ['lamp.jpg'],
  category: 'Lighting',
}

describe('ProductCard', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
    useWishlistStore.setState({ items: [] })
    localStorage.clear()
  })

  it('renders the name and price to two decimals', () => {
    render(<ProductCard product={product} />)

    expect(screen.getByRole('heading', { name: 'Desk Lamp' })).toBeTruthy()
    expect(screen.getByText('$149.99')).toBeTruthy()
  })

  it('renders the first image with the product name as alt text', () => {
    render(<ProductCard product={product} />)

    const img = screen.getByAltText('Desk Lamp') as HTMLImageElement
    expect(img.getAttribute('src')).toBe('lamp.jpg')
  })

  it('does not throw when the product has no images', () => {
    expect(() =>
      render(<ProductCard product={{ ...product, images: [] }} />)
    ).not.toThrow()
  })

  it('adds the product to the cart when Add is clicked', () => {
    render(<ProductCard product={product} />)

    fireEvent.click(screen.getByRole('button', { name: 'Add Desk Lamp to cart' }))

    const items = useCartStore.getState().items
    expect(items).toHaveLength(1)
    expect(items[0]).toMatchObject({ productId: 'p1', price: 149.99, quantity: 1 })
  })

  it('saves the product image with cart and wishlist entries', () => {
    render(<ProductCard product={product} />)

    fireEvent.click(screen.getByRole('button', { name: 'Save Desk Lamp to wishlist' }))
    fireEvent.click(screen.getByRole('button', { name: 'Add Desk Lamp to cart' }))

    expect(useWishlistStore.getState().items[0].image).toBe('lamp.jpg')
    expect(useCartStore.getState().items[0].image).toBe('lamp.jpg')
  })

  it('toggles the wishlist and updates the button label', () => {
    render(<ProductCard product={product} />)

    fireEvent.click(screen.getByRole('button', { name: 'Save Desk Lamp to wishlist' }))
    expect(useWishlistStore.getState().isInWishlist('p1')).toBe(true)
    expect(screen.getByRole('button', { name: 'Remove Desk Lamp from wishlist' })).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Remove Desk Lamp from wishlist' }))
    expect(useWishlistStore.getState().isInWishlist('p1')).toBe(false)
    expect(screen.getByRole('button', { name: 'Save Desk Lamp to wishlist' })).toBeTruthy()
  })

  it('shows as wishlisted when the product is already saved', () => {
    useWishlistStore.getState().addItem({ id: 'p1', name: 'Desk Lamp', price: 149.99 })

    render(<ProductCard product={product} />)

    expect(screen.getByRole('button', { name: 'Remove Desk Lamp from wishlist' })).toBeTruthy()
  })
})
