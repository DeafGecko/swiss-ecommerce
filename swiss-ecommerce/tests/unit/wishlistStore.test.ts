import { beforeEach, describe, expect, it } from 'vitest'
import { useWishlistStore } from '@/store/wishlistStore'

const lamp = { id: 'p1', name: 'Desk Lamp', price: 150, image: 'lamp.jpg' }
const clock = { id: 'p2', name: 'Wall Clock', price: 89 }

describe('wishlistStore', () => {
  beforeEach(() => {
    useWishlistStore.setState({ items: [] })
    localStorage.clear()
  })

  it('starts empty', () => {
    expect(useWishlistStore.getState().items).toEqual([])
    expect(useWishlistStore.getState().getTotalItems()).toBe(0)
  })

  it('adds a product with its image and a unique line id', () => {
    useWishlistStore.getState().addItem(lamp)
    const [item] = useWishlistStore.getState().items

    expect(item).toMatchObject({ productId: 'p1', name: 'Desk Lamp', price: 150, image: 'lamp.jpg' })
    expect(item.id).toEqual(expect.any(String))
  })

  it('does not add the same product twice', () => {
    const { addItem } = useWishlistStore.getState()
    addItem(lamp)
    addItem(lamp)

    expect(useWishlistStore.getState().items).toHaveLength(1)
    expect(useWishlistStore.getState().getTotalItems()).toBe(1)
  })

  it('reports membership with isInWishlist', () => {
    useWishlistStore.getState().addItem(lamp)

    expect(useWishlistStore.getState().isInWishlist('p1')).toBe(true)
    expect(useWishlistStore.getState().isInWishlist('p2')).toBe(false)
  })

  it('removes an item by productId', () => {
    const { addItem, removeItem } = useWishlistStore.getState()
    addItem(lamp)
    addItem(clock)
    removeItem('p1')

    expect(useWishlistStore.getState().items.map((i) => i.productId)).toEqual(['p2'])
  })

  it('toggleItem adds a missing product and removes an existing one', () => {
    const { toggleItem } = useWishlistStore.getState()

    toggleItem(lamp)
    expect(useWishlistStore.getState().isInWishlist('p1')).toBe(true)

    toggleItem(lamp)
    expect(useWishlistStore.getState().isInWishlist('p1')).toBe(false)
    expect(useWishlistStore.getState().items).toEqual([])
  })

  it('clears the wishlist', () => {
    const { addItem, clearWishlist } = useWishlistStore.getState()
    addItem(lamp)
    addItem(clock)
    clearWishlist()

    expect(useWishlistStore.getState().items).toEqual([])
  })

  it('persists items to localStorage under wishlist-storage', () => {
    useWishlistStore.getState().addItem(lamp)

    const saved = JSON.parse(localStorage.getItem('wishlist-storage') ?? '{}')
    expect(saved.state.items[0].productId).toBe('p1')
  })
})
