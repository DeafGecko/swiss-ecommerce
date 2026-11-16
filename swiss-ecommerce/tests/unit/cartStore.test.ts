import { beforeEach, describe, expect, it } from 'vitest'
import { useCartStore } from '@/store/cartStore'

const lamp = { id: 'p1', name: 'Desk Lamp', price: 150 }
const clock = { id: 'p2', name: 'Wall Clock', price: 89 }

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
    localStorage.clear()
  })

  it('starts empty', () => {
    expect(useCartStore.getState().items).toEqual([])
    expect(useCartStore.getState().getTotalItems()).toBe(0)
    expect(useCartStore.getState().getTotalPrice()).toBe(0)
  })

  it('adds a new product with quantity 1 and a unique line id', () => {
    useCartStore.getState().addItem(lamp)
    const [item] = useCartStore.getState().items

    expect(useCartStore.getState().items).toHaveLength(1)
    expect(item).toMatchObject({ productId: 'p1', name: 'Desk Lamp', price: 150, quantity: 1 })
    expect(item.id).toEqual(expect.any(String))
    expect(item.id).not.toBe('')
  })

  it('increments quantity instead of duplicating an existing product', () => {
    const { addItem } = useCartStore.getState()
    addItem(lamp)
    addItem(lamp)

    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0].quantity).toBe(2)
  })

  it('keeps separate lines for different products', () => {
    const { addItem } = useCartStore.getState()
    addItem(lamp)
    addItem(clock)

    expect(useCartStore.getState().items.map((i) => i.productId)).toEqual(['p1', 'p2'])
  })

  it('computes totals across quantities', () => {
    const { addItem, updateQuantity } = useCartStore.getState()
    addItem(lamp)
    addItem(clock)
    updateQuantity('p1', 3)

    expect(useCartStore.getState().getTotalItems()).toBe(4)
    expect(useCartStore.getState().getTotalPrice()).toBe(150 * 3 + 89)
  })

  it('removes an item by productId', () => {
    const { addItem, removeItem } = useCartStore.getState()
    addItem(lamp)
    addItem(clock)
    removeItem('p1')

    expect(useCartStore.getState().items.map((i) => i.productId)).toEqual(['p2'])
  })

  it('removes the item when quantity drops to zero', () => {
    const { addItem, updateQuantity } = useCartStore.getState()
    addItem(lamp)
    updateQuantity('p1', 0)

    expect(useCartStore.getState().items).toEqual([])
  })

  it('removes the item when quantity goes negative', () => {
    const { addItem, updateQuantity } = useCartStore.getState()
    addItem(lamp)
    updateQuantity('p1', -1)

    expect(useCartStore.getState().items).toEqual([])
  })

  it('clears the cart', () => {
    const { addItem, clearCart } = useCartStore.getState()
    addItem(lamp)
    addItem(clock)
    clearCart()

    expect(useCartStore.getState().items).toEqual([])
  })

  it('persists items to localStorage under cart-storage', () => {
    useCartStore.getState().addItem(lamp)

    const saved = JSON.parse(localStorage.getItem('cart-storage') ?? '{}')
    expect(saved.state.items[0].productId).toBe('p1')
  })
})
