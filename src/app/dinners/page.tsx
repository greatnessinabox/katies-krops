import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroSection } from '@/components/hero-section'
import { LeafDivider } from '@/components/leaf-divider'
import { SectionDivider } from '@/components/section-divider'

export const metadata: Metadata = {
  title: 'Community Dinners',
  description:
    "Katie's Krops hosts free community dinners using fresh produce from our gardens. Join us in Summerville, SC for a meal prepared with love.",
  robots: { index: true, follow: true },
  alternates: { canonical: '/dinners' },
  openGraph: {
    title: "Community Dinners | Katie's Krops",
    description:
      "Free community dinners using fresh produce from Katie's Krops gardens in Summerville, SC.",
    url: 'https://katieskrops.com/dinners',
    siteName: "Katie's Krops",
    type: 'website',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: "Katie's Krops — Growing for the Greater Good" }],
  },
}

const waysToHelp = [
  {
    title: 'Cook',
    description:
      'Help prepare meals using fresh produce from our gardens. No professional experience required — just a willingness to help.',
    accentBg: 'bg-terracotta/10',
    icon: (
      <svg className="h-8 w-8 text-terracotta" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.468 5.99 5.99 0 00-1.925 3.547 5.975 5.975 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
      </svg>
    ),
  },
  {
    title: 'Serve',
    description:
      'Welcome guests, serve meals, and help create a warm and inviting atmosphere for everyone who attends.',
    accentBg: 'bg-forest/10',
    icon: (
      <svg className="h-8 w-8 text-forest" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: 'Donate Ingredients',
    description:
      'Contribute fresh produce, pantry staples, or other ingredients to help us prepare nourishing meals for the community.',
    accentBg: 'bg-sun/10',
    icon: (
      <svg className="h-8 w-8 text-sun-dark" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
]

export default function DinnersPage() {
  return (
    <>
      {/* ── HERO ── */}
      <HeroSection
        variant="forest"
        kicker="Free &amp; Open to All"
        title="Community Dinners"
        highlight="Dinners"
        accentColor="sun"
        subtitle="Free meals prepared with love, using produce from our gardens."
      />

      {/* ── ABOUT ── */}
      <section className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="kicker">Sharing the Harvest</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              A Table for Everyone
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-stone-600">
              <p>
                Since 2014, Katie&apos;s Krops has been hosting free community
                dinners using fresh produce grown in our gardens. What started as
                a simple idea &mdash; sharing the harvest with neighbors &mdash;
                has become a beloved tradition that brings people together around
                the table.
              </p>
              <p>
                Our dinners are free and open to anyone in the community. No
                reservations needed, no questions asked. Just come as you are and
                enjoy a wholesome meal with your neighbors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section className="bg-cream px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="card-editorial p-8 sm:p-10">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage-light/50">
                  <svg className="h-6 w-6 text-forest" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-stone-900">
                    Dinner Schedule
                  </h2>
                  <p className="mt-2 text-lg text-stone-600">
                    Dinners are held monthly from{' '}
                    <strong className="text-stone-800">5:30 &ndash; 7:00 PM</strong>
                  </p>
                  <p className="mt-1 text-sm text-stone-500">
                    Check our <a href="/events" className="font-medium text-forest underline decoration-forest/30 underline-offset-2 hover:decoration-forest">events page</a> for upcoming dates.
                  </p>
                </div>
              </div>
              <hr className="my-6 border-border" />
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage-light/50">
                  <svg className="h-6 w-6 text-forest" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-stone-900">
                    Location
                  </h3>
                  <p className="mt-1 text-lg text-stone-600">
                    Summerville Baptist Church
                  </p>
                  <p className="text-stone-500">
                    407 S. Main St., Summerville, SC 29483
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Transition to dark ── */}
      <SectionDivider variant="wave" fill="var(--color-forest-dark)" />

      {/* ── IMPACT ── dark drama */}
      <section className="texture-grain relative bg-forest-dark px-4 py-20 sm:py-28">
        <div className="relative z-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-sage-light/80">
              Our Impact
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Nourishing Our Community
            </h2>
          </div>
          <div className="mt-12 flex justify-center">
            <div className="text-center">
              <p className="stat-hero text-white">105,000+</p>
              <p className="mt-3 text-lg font-medium text-sage-light/70">
                Meals Served Since 2014
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="organic" fill="white" flip />

      {/* ── HOW TO HELP ── */}
      <section className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="kicker">Get Involved</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              How You Can Help
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
              Our community dinners rely on volunteers like you.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {waysToHelp.map((way, i) => (
              <div
                key={way.title}
                className="card-lifted animate-fade-up p-6"
                style={{ '--delay': `${i * 100}ms` } as React.CSSProperties}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${way.accentBg}`}>
                  {way.icon}
                </div>
                <h3 className="font-display text-xl font-semibold text-stone-900">
                  {way.title}
                </h3>
                <p className="mt-2 text-stone-600">{way.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LeafDivider variant="line" />

      {/* ── CTA ── */}
      <section className="texture-grain relative bg-forest px-4 py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-10" />
        <div className="relative z-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Volunteer for a Dinner
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Whether you can cook, serve, or donate ingredients, your help makes
              our community dinners possible.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/get-involved/volunteer"
                className="rounded-full bg-terracotta px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-terracotta-dark hover:shadow-xl"
              >
                Volunteer for a Dinner
              </Link>
              <Link
                href="/support/donate"
                className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur transition-all hover:border-white/50 hover:bg-white/20"
              >
                Donate Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
