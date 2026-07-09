import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistItem {
  id: string
  productId: string
  name: string
  price: number
  image?: string
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (product: { id: string; name: string; price: number; image?: string }) => void
  removeItem: (productId: string) => void
  toggleItem: (product: { id: string; name: string; price: number; image?: string }) => void
  isInWishlist: (productId: string) => boolean
  getTotalItems: () => number
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (get().isInWishlist(product.id)) return
        set({
          items: [
            ...get().items,
            {
              id: crypto.randomUUID(),
              productId: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            },
          ],
        })
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.productId !== productId),
        })
      },

      toggleItem: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeItem(product.id)
        } else {
          get().addItem(product)
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.productId === productId)
      },

      getTotalItems: () => {
        return get().items.length
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-storage',
    }
  )
)
