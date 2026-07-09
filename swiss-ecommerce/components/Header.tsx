'use client'

import Link from 'next/link'
import { ShoppingCart, Heart, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import { PhaseSwitcher } from './PhaseSwitcher'
import { CategoriesDropdown } from './CategoriesDropdown'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const itemCount = useCartStore((state) => state.getTotalItems())
  const wishlistCount = useWishlistStore((state) => state.getTotalItems())

  useEffect(() => {
    setIsMounted(true)
    // Fetch categories
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
        setIsLoading(false)
      })
      .catch(() => {
        setCategories([])
        setIsLoading(false)
      })
  }, [])

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-background)] sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-mono text-base sm:text-xl font-bold tracking-tight">
          <img src="/favicon.svg" alt="Monochrome logo" width={28} height={28} className="rounded-md" />
          <span>MONOCHROME</span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-1.5"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <CategoriesDropdown categories={categories} />
          <Link href="/about" className="text-xs lg:text-sm hover:underline">About</Link>
          <Link href="/orders" className="text-xs lg:text-sm hover:underline">Orders</Link>
        </nav>

        {/* Right side icons */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <Link href="/wishlist" className="relative p-1.5">
            <Heart size={18} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
            {isMounted && wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-[var(--color-text-inverse)] text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative p-1.5">
            <ShoppingCart size={18} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
            {isMounted && itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-[var(--color-text-inverse)] text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          <PhaseSwitcher />
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-background)]">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-2">
            <Link href="/products" className="text-sm hover:underline py-1.5">All Products</Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="text-sm hover:underline py-1.5 pl-4 text-[var(--color-text-secondary)]"
                onClick={() => setIsMenuOpen(false)}
              >
                {category}
              </Link>
            ))}
            <div className="border-t border-[var(--color-border-light)] my-2"></div>
            <Link href="/about" className="text-sm hover:underline py-1.5">About</Link>
            <Link href="/orders" className="text-sm hover:underline py-1.5">Orders</Link>
          </div>
        </div>
      )}
    </header>
  )
}