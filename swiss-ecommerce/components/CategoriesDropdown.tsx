'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface CategoriesDropdownProps {
  categories: string[]
}

export function CategoriesDropdown({ categories }: CategoriesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-xs lg:text-sm hover:underline"
      >
        Products
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg shadow-lg overflow-hidden z-50">
          <Link
            href="/products"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-[var(--color-background-alt)] transition-colors font-medium"
          >
            All Products
          </Link>
          <div className="border-t border-[var(--color-border-light)]"></div>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm hover:bg-[var(--color-background-alt)] transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
