import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { OUTDOOR_CLASSES_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import type { OUTDOOR_CLASSES_QUERY_RESULT } from '@/sanity/types'
import { ClassCard } from '@/components/class-card'
import { DonationCta } from '@/components/donation-cta'
import { LeafDivider } from '@/components/leaf-divider'

export const metadata: Metadata = {
  title: "Katie's Krops — Growing for the Greater Good",
  description:
    "Katie's Krops empowers youth to start vegetable gardens and donate the harvest to feed people in need. Founded by Katie Stagliano in Summerville, SC.",
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    title: "Katie's Krops — Growing for the Greater Good",
    description:
      "Youth-led nonprofit empowering kids to grow vegetable gardens and donate the harvest to feed people in need.",
    url: 'https://katieskrops.com',
    siteName: "Katie's Krops",
    type: 'website',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: "Katie's Krops — Growing for the Greater Good" }],
  },
}

/** Small garden-themed SVG icons for stats */
const statIcons = [
  // Garden/plant icon
  <svg key="garden" className="mx-auto mb-2 h-8 w-8 text-leaf" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-6m0 0c-2.485 0-4.5-4-4.5-8a4.5 4.5 0 019 0c0 4-2.015 8-4.5 8z" /></svg>,
  // People/community icon
  <svg key="people" className="mx-auto mb-2 h-8 w-8 text-terracotta" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
  // Heart icon
  <svg key="heart" className="mx-auto mb-2 h-8 w-8 text-sun" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>,
  // Sprout/leaf icon
  <svg key="leaf" className="mx-auto mb-2 h-8 w-8 text-forest" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" /></svg>,
]

export default async function HomePage() {
  const [{ data: classes }, { data: settings }] = await Promise.all([
    sanityFetch({
      query: OUTDOOR_CLASSES_QUERY,
      params: { ageGroup: 'all', category: 'all' },
    }),
    sanityFetch({
      query: SITE_SETTINGS_QUERY,
    }),
  ])

  const upcomingClasses = ((classes ?? []) as OUTDOOR_CLASSES_QUERY_RESULT).slice(0, 6)
  const stats = settings?.impactStats ?? []
  const donationUrl = settings?.donationUrl

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest px-4 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-20" />
        <div className="relative mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Growing for the
            <br />
            <span className="text-sun">Greater Good</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Katie&apos;s Krops empowers youth to start and maintain vegetable
            gardens and donate the harvest to help feed people in need in their
            community. One seed at a time, we&apos;re changing the world.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/outdoor-classroom"
              className="rounded-full bg-terracotta px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-terracotta-dark hover:shadow-xl"
            >
              Explore Classes
            </Link>
            <Link
              href="/get-involved"
              className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur transition-all hover:border-white/50 hover:bg-white/20"
            >
              Dig In &amp; Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* Watch Our Story — YouTube Video */}
      <section className="bg-cream px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Watch Our Story
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
              From a single 40-pound cabbage to over 100 gardens nationwide
              &mdash; see how Katie&apos;s Krops is making a difference.
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl shadow-lg">
            <div className="relative aspect-video">
              <iframe
                src="https://www.youtube.com/embed/8OllB3YQALE"
                title="Katie's Krops Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <LeafDivider />

      {/* Impact Stats */}
      {stats.length > 0 && (
        <section className="border-b border-border bg-white px-4 py-14">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-10 text-center font-display text-2xl font-bold text-stone-900 sm:text-3xl">
              Our Growing Impact
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map(
                (stat: { label?: string; value?: string }, i: number) => (
                  <div key={i} className="text-center">
                    {statIcons[i % statIcons.length]}
                    <p className="font-display text-3xl font-bold text-forest sm:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-stone-600">{stat.label}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      <LeafDivider />

      {/* Upcoming Classes */}
      {upcomingClasses.length > 0 && (
        <section className="bg-cream/50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                  Upcoming Classes
                </h2>
                <p className="mt-2 text-stone-600">
                  Nature-based learning for curious minds of all ages. Way to
                  grow!
                </p>
              </div>
              <Link
                href="/outdoor-classroom"
                className="hidden text-sm font-semibold text-forest transition-colors hover:text-forest-dark sm:block"
              >
                View All Classes &rarr;
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingClasses.map((cls) => (
                <ClassCard key={cls._id} {...cls} />
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/outdoor-classroom"
                className="text-sm font-semibold text-forest transition-colors hover:text-forest-dark"
              >
                View All Classes &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      <LeafDivider />

      {/* CTA Section */}
      <section className="bg-sage-light/30 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Ready to Make a Difference?
              </h2>
              <p className="mt-4 text-lg text-stone-600">
                Whether you volunteer your time, start a garden, or support with
                a donation, you help us grow healthy food and share it with those
                who need it most. Every little bit helps our gardens &mdash; and
                our communities &mdash; flourish.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/get-involved/volunteer"
                  className="rounded-full bg-forest px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-forest-dark"
                >
                  Volunteer With Us
                </Link>
                <Link
                  href="/get-involved/start-a-garden"
                  className="rounded-full border border-forest bg-white px-6 py-3 font-semibold text-forest shadow-sm transition-all hover:bg-forest/5"
                >
                  Start a Garden
                </Link>
              </div>
            </div>
            {donationUrl && (
              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-sm">
                  <DonationCta url={donationUrl} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
