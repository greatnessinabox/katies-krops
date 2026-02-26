import Link from 'next/link'
import { MobileNav } from './mobile-nav'

const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Outdoor Classroom', href: '/outdoor-classroom' },
  { label: 'Events', href: '/events' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-bold text-forest-dark"
          aria-label="Katie's Krops — Home"
        >
          <svg
            className="h-8 w-8 text-forest"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="16" cy="16" r="14" fill="currentColor" opacity="0.15" />
            <path
              d="M16 6c-2 4-6 6-6 10a6 6 0 0012 0c0-4-4-6-6-10z"
              fill="currentColor"
            />
          </svg>
          <span>
            Katie&apos;s <span className="text-forest">Krops</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-sage-light/40 hover:text-forest-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Donate CTA + Mobile Nav */}
        <div className="flex items-center gap-3">
          <Link
            href="/support/donate"
            className="hidden rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-terracotta-dark hover:shadow-md sm:inline-flex"
          >
            Donate
          </Link>
          <MobileNav items={navItems} />
        </div>
      </div>
    </header>
  )
}
