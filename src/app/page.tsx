import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'

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
import { OUTDOOR_CLASSES_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import type { OUTDOOR_CLASSES_QUERY_RESULT } from '@/sanity/types'
import { ClassCard } from '@/components/class-card'
import { DonationCta } from '@/components/donation-cta'

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
            community.
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
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      {stats.length > 0 && (
        <section className="border-b border-border bg-cream px-4 py-12">
          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(
              (stat: { label?: string; value?: string }, i: number) => (
                <div key={i} className="text-center">
                  <p className="font-display text-3xl font-bold text-forest sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-stone-600">{stat.label}</p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* Upcoming Classes */}
      {upcomingClasses.length > 0 && (
        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                  Upcoming Classes
                </h2>
                <p className="mt-2 text-stone-600">
                  Nature-based learning for curious minds of all ages.
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

      {/* CTA Section */}
      <section className="bg-sage-light/30 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Make a Difference in Your Community
              </h2>
              <p className="mt-4 text-lg text-stone-600">
                Whether you volunteer your time, start a garden, or support with
                a donation, you help us grow healthy food and share it with those
                who need it most.
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
