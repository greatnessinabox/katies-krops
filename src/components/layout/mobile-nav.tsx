'use client'

import { useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import type { NavItem } from './header'

/**
 * Mobile slide-out navigation.
 *
 * The overlay + panel are portalled to document.body so they escape the
 * header's `sticky z-50` stacking context and cover the full viewport.
 */
export function MobileNav({ items }: { items: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Only portal after hydration
  useEffect(() => setMounted(true), [])

  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])
  const close = useCallback(() => {
    setIsOpen(false)
    setExpandedItem(null)
  }, [])

  const toggleExpand = useCallback((label: string) => {
    setExpandedItem((prev) => (prev === label ? null : label))
  }, [])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, close])

  const drawer = (
    <>
      {/* Overlay — covers entire viewport */}
      <div
        className={`fixed inset-0 z-[9998] bg-stone-900/30 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Slide-out Panel */}
      <nav
        id="mobile-menu"
        className={`fixed right-0 top-0 z-[9999] flex h-full w-[min(20rem,85vw)] flex-col bg-cream shadow-2xl transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)' }}
        aria-label="Mobile navigation"
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <span className="font-display text-lg font-bold text-forest-dark">Menu</span>
          <button
            onClick={close}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-500 transition-colors hover:bg-sage-light/40 hover:text-stone-700"
            aria-label="Close menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {items.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  onClick={() => toggleExpand(item.label)}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-stone-700 transition-colors hover:bg-sage-light/40 hover:text-forest-dark"
                  aria-expanded={expandedItem === item.label}
                >
                  {item.label}
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ease-out ${
                      expandedItem === item.label ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {expandedItem === item.label && (
                  <div className="ml-4 flex flex-col gap-0.5 border-l-2 border-sage-light pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={close}
                        className="rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-sage-light/40 hover:text-forest-dark"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="rounded-lg px-4 py-3 text-base font-medium text-stone-700 transition-colors hover:bg-sage-light/40 hover:text-forest-dark"
              >
                {item.label}
              </Link>
            )
          )}
          <div className="mt-4 border-t border-border pt-4">
            <Link
              href="/support/donate"
              onClick={close}
              className="flex w-full items-center justify-center rounded-full bg-terracotta px-5 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-terracotta-dark"
            >
              Donate
            </Link>
          </div>
        </div>
      </nav>
    </>
  )

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggle}
        className="relative flex h-11 w-11 items-center justify-center rounded-lg text-stone-700 transition-colors hover:bg-sage-light/40"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
        </svg>
      </button>

      {/* Portal overlay + panel to body so they escape header stacking context */}
      {mounted && createPortal(drawer, document.body)}
    </div>
  )
}
