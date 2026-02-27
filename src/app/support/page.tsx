import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: "Support Us | Katie's Krops",
  description:
    "Support Katie's Krops with a donation, Amazon Wishlist purchase, or by spreading the word. Help us grow food and feed communities.",
  openGraph: {
    title: "Support Us | Katie's Krops",
    description:
      "Support Katie's Krops — donate, shop our Amazon Wishlist, or spread the word to help us grow food and feed communities.",
    url: 'https://katieskrops.com/support',
    siteName: "Katie's Krops",
    type: 'website',
  },
}

const waysToGive = [
  {
    title: 'Donate',
    description:
      'Make a direct financial contribution to support our gardens, community dinners, and youth programs. Every dollar makes a difference.',
    href: '/support/donate',
    external: false,
    ctaLabel: 'Make a Donation',
    icon: (
      <svg
        className="h-8 w-8 text-terracotta"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
  },
  {
    title: 'Amazon Wishlist',
    description:
      'Purchase supplies we need directly from our Amazon Wishlist. From gardening tools to seeds and soil, every item helps our growers succeed.',
    href: 'https://www.amazon.com/hz/wishlist/ls/HBOGMDXC68Z4',
    external: true,
    ctaLabel: 'Shop Our Wishlist',
    icon: (
      <svg
        className="h-8 w-8 text-terracotta"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
        />
      </svg>
    ),
  },
  {
    title: 'Spread the Word',
    description:
      'Share our mission with your friends, family, and followers on social media. The more people know about Katie\'s Krops, the more communities we can reach.',
    href: '#',
    external: false,
    ctaLabel: 'Follow Us',
    icon: (
      <svg
        className="h-8 w-8 text-terracotta"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
        />
      </svg>
    ),
  },
]

export default async function SupportPage() {
  const { data: settings } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
  })

  const stats = settings?.impactStats ?? []

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest px-4 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-20" />
        <div className="relative mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Support Katie&apos;s Krops
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Help us grow food and feed communities across the country
          </p>
        </div>
      </section>

      {/* Ways to Give */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {waysToGive.map((way) => (
              <div
                key={way.title}
                className="group flex flex-col rounded-2xl border border-border bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-terracotta/10">
                  {way.icon}
                </div>
                <h2 className="font-display text-2xl font-bold text-stone-900">
                  {way.title}
                </h2>
                <p className="mt-3 flex-1 text-stone-600">{way.description}</p>
                <div className="mt-6">
                  {way.external ? (
                    <a
                      href={way.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-terracotta-dark"
                    >
                      {way.ctaLabel}
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </a>
                  ) : way.href === '#' ? (
                    <span className="inline-flex items-center gap-2 rounded-full border-2 border-forest bg-white px-8 py-3.5 font-semibold text-forest">
                      {way.ctaLabel}
                    </span>
                  ) : (
                    <Link
                      href={way.href}
                      className="inline-flex items-center gap-2 rounded-full border-2 border-forest bg-white px-8 py-3.5 font-semibold text-forest transition-all hover:bg-forest/5"
                    >
                      {way.ctaLabel}
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-cream px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Your Support Helps Us Grow
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
              Every contribution &mdash; whether financial, material, or simply
              sharing our mission &mdash; helps us empower more young people to
              feed their communities.
            </p>
          </div>
          {stats.length > 0 && (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map(
                (stat: { label?: string; value?: string }, i: number) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm"
                  >
                    <p className="font-display text-3xl font-bold text-forest sm:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm text-stone-600">{stat.label}</p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
