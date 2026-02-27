import Image from 'next/image'
import Link from 'next/link'
import { MobileNav } from './mobile-nav'
import { NavDropdown } from './nav-dropdown'

export interface NavChild {
  label: string
  href: string
  description?: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavChild[]
}

const navItems: NavItem[] = [
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Our Story', href: '/about', description: 'How it all started with one cabbage' },
      { label: 'Our Team', href: '/team', description: 'Meet the people behind Katie\'s Krops' },
      { label: 'Our Growers', href: '/get-involved/growers', description: 'Youth growers across the country' },
      { label: 'News & Press', href: '/news', description: 'Katie\'s Krops in the media' },
    ],
  },
  {
    label: 'Programs',
    href: '/outdoor-classroom',
    children: [
      { label: 'Outdoor Classroom', href: '/outdoor-classroom', description: 'Classes for kids and families' },
      { label: 'Community Dinners', href: '/dinners', description: 'Free monthly meals for the community' },
      { label: 'Team Monarch', href: '/monarchs', description: 'Youth butterfly conservation program' },
      { label: 'Springfest 2026', href: '/springfest', description: 'Our annual spring celebration' },
    ],
  },
  { label: 'Events', href: '/events' },
  {
    label: 'Get Involved',
    href: '/get-involved',
    children: [
      { label: 'Volunteer', href: '/get-involved/volunteer', description: 'Give your time to grow the mission' },
      { label: 'Start a Garden', href: '/get-involved/start-a-garden', description: 'Apply for a garden grant' },
      { label: 'Support Us', href: '/support', description: 'Donate or see our needs list' },
    ],
  },
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
          className="flex shrink-0 items-center"
          aria-label="Katie's Krops — Home"
        >
          <Image
            src="/images/logo.webp"
            alt="Katie's Krops logo"
            width={277}
            height={111}
            className="h-10 w-auto sm:h-12"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) =>
            item.children ? (
              <NavDropdown key={item.href} item={item} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-sage-light/40 hover:text-forest-dark"
              >
                {item.label}
              </Link>
            )
          )}
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
