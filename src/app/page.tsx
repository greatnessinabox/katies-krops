import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { OUTDOOR_CLASSES_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import type { OUTDOOR_CLASSES_QUERY_RESULT } from '@/sanity/types'
import { ClassCard } from '@/components/class-card'
import { DonationCta } from '@/components/donation-cta'
import { HeroSection } from '@/components/hero-section'
import { YouTubeEmbed } from '@/components/youtube-embed'
import { SectionDivider } from '@/components/section-divider'
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
      {/* ── HERO ── dark */}
      <HeroSection
        variant="forest"
        title="Growing for the Greater Good"
        highlight="Greater Good"
        subtitle="Katie's Krops empowers youth to start and maintain vegetable gardens and donate the harvest to help feed people in need in their community. One seed at a time, we're changing the world."
        actions={
          <>
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
          </>
        }
      />

      {/* ── IMPACT STATS ── dark (continues from hero, one dramatic opening) */}
      {stats.length > 0 && (
        <section className="texture-grain relative bg-forest-dark px-4 py-16 sm:py-20">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
              {stats.map(
                (stat: { label?: string; value?: string }, i: number) => (
                  <div
                    key={i}
                    className="animate-fade-up text-center"
                    style={{ '--delay': `${i * 100}ms` } as React.CSSProperties}
                  >
                    <p className="stat-hero text-white">{stat.value}</p>
                    <p className="mt-2 text-sm font-medium tracking-wide text-sage-light/80">
                      {stat.label}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Transition: dark → light ── */}
      <SectionDivider variant="wave" fill="var(--color-cream)" />

      {/* ── WATCH OUR STORY ── light/cream */}
      <section className="bg-cream px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="kicker">Our Story</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              One Cabbage Changed Everything
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
              From a single 40-pound cabbage to over 100 gardens nationwide
              &mdash; see how Katie&apos;s Krops is making a difference.
            </p>
          </div>
          <YouTubeEmbed
            videoId="8OllB3YQALE"
            title="Katie's Krops Story"
          />
        </div>
      </section>

      <LeafDivider variant="vine" />

      {/* ── UPCOMING CLASSES ── warm */}
      {upcomingClasses.length > 0 && (
        <section className="texture-paper relative px-4 py-16 sm:py-24">
          <div className="relative z-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="kicker">Outdoor Classroom</p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                  Upcoming Classes
                </h2>
                <p className="mt-2 max-w-lg text-stone-600">
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

      {/* ── Transition: warm → dark ── */}
      <SectionDivider variant="organic" fill="var(--color-forest)" />

      {/* ── CTA ── dark (bookend with hero) */}
      <section className="texture-grain relative bg-forest px-4 py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-10" />
        <div className="relative z-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-sage-light">
                Join the Movement
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                There&apos;s a place for you
                <br />
                <span className="text-sun">in our garden.</span>
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">
                Whether you volunteer your time, start a garden, or support with
                a donation, you help us grow healthy food and share it with those
                who need it most.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/get-involved/volunteer"
                  className="rounded-full bg-terracotta px-7 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-terracotta-dark hover:shadow-xl"
                >
                  Volunteer With Us
                </Link>
                <Link
                  href="/get-involved/start-a-garden"
                  className="rounded-full border-2 border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur transition-all hover:border-white/50 hover:bg-white/20"
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
