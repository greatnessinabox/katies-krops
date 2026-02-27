'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import type { NavItem } from './header'

export function NavDropdown({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const open = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150)
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen])

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={open}
      onMouseLeave={close}
    >
      <button
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-sage-light/40 hover:text-forest-dark"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.label}
        <svg
          className={`h-3.5 w-3.5 transition-transform duration-200 ease-out ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Invisible bridge to fill hover gap between trigger and dropdown */}
      {isOpen && (
        <div
          className="absolute left-0 top-full z-40 h-2 w-full"
          onMouseEnter={open}
        />
      )}

      {isOpen && (
        <div
          className="absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2 animate-dropdown-in rounded-xl border border-border bg-white p-2 shadow-lg"
          onMouseEnter={open}
          onMouseLeave={close}
          role="menu"
        >
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              role="menuitem"
              className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-sage-light/40"
              onClick={() => setIsOpen(false)}
            >
              <span className="block text-sm font-medium text-stone-900">
                {child.label}
              </span>
              {child.description && (
                <span className="block text-xs text-stone-500">
                  {child.description}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
