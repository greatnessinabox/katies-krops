import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { EVENTS_QUERY } from '@/sanity/lib/queries'
import type { EVENTS_QUERY_RESULT } from '@/sanity/types'
import { urlFor } from '@/sanity/lib/image'
import { formatDate } from '@/lib/utils'
import { HeroSection } from '@/components/hero-section'
import { LeafDivider } from '@/components/leaf-divider'
import { SectionDivider } from '@/components/section-divider'

export const metadata: Metadata = {
  title: 'Events',
  description:
    "Upcoming events and gatherings at Katie's Krops. Join us for community dinners, fundraisers, volunteer days, and more in Summerville, SC.",
  robots: { index: true, follow: true },
  alternates: { canonical: '/events' },
  openGraph: {
    title: "Events | Katie's Krops",
    description:
      "Upcoming events and gatherings at Katie's Krops. Join us for dinners, fundraisers, volunteer days, and more.",
    url: 'https://katieskrops.com/events',
    siteName: "Katie's Krops",
    type: 'website',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: "Katie's Krops — Growing for the Greater Good" }],
  },
}

const categoryLabels: Record<string, string> = {
  dinner: 'Dinner',
  fundraiser: 'Fundraiser',
  volunteer: 'Volunteer',
  springfest: 'Spring Fest',
  other: 'Event',
}

const categoryColors: Record<string, string> = {
  dinner: 'bg-terracotta/10 text-terracotta',
  fundraiser: 'bg-sun/20 text-soil',
  volunteer: 'bg-forest/10 text-forest',
  springfest: 'bg-leaf/10 text-leaf',
  other: 'bg-sage/20 text-stone-700',
}

const categoryDots: Record<string, string> = {
  dinner: 'bg-terracotta',
  fundraiser: 'bg-sun',
  volunteer: 'bg-forest',
  springfest: 'bg-leaf',
  other: 'bg-sage',
}

function isUpcoming(dateStr: string | null): boolean {
  if (!dateStr) return false
  return new Date(dateStr) >= new Date(new Date().toDateString())
}

function formatShortDate(dateStr: string) {
  const d = new Date(dateStr)
  return {
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: d.getDate().toString(),
    weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
  }
}

export default async function EventsPage() {
  const { data: events } = await sanityFetch({
    query: EVENTS_QUERY,
  })

  const allEvents = (events ?? []) as EVENTS_QUERY_RESULT
  const upcoming = allEvents.filter((e) => isUpcoming(e.date)).sort(
    (a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime()
  )
  const past = allEvents
    .filter((e) => !isUpcoming(e.date))
    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
    .slice(0, 6)

  const featured = upcoming[0]
  const restUpcoming = upcoming.slice(1)

  return (
    <>
      {/* ── HERO ── */}
      <HeroSection
        variant="forest"
        kicker="Join Us"
        title="Upcoming Events"
        highlight="Events"
        accentColor="sun"
        subtitle="Community dinners, fundraisers, volunteer days, and more."
      />

      {/* ── FEATURED EVENT ── */}
      {featured && (
        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <FeaturedEventCard event={featured} />
          </div>
        </section>
      )}

      {/* ── UPCOMING EVENTS TIMELINE ── */}
      {restUpcoming.length > 0 && (
        <section className="bg-cream px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="kicker">Coming Up</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                More Events
              </h2>
            </div>
            <div className="space-y-4">
              {restUpcoming.map((event, i) => (
                <TimelineEventCard key={event._id} event={event} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {upcoming.length === 0 && (
        <section className="px-4 py-20">
          <div className="mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md">
              <svg className="mx-auto h-16 w-16 text-sage" fill="none" viewBox="0 0 24 24" strokeWidth={0.75} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <h2 className="mt-6 font-display text-2xl font-bold text-stone-900">
                No Upcoming Events
              </h2>
              <p className="mt-3 text-lg text-stone-600">
                Check back soon for new events, or browse our past events below.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── PAST EVENTS ── */}
      {past.length > 0 && (
        <>
          <LeafDivider variant="line" />
          <section className="px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="mb-10">
                <p className="kicker">Looking Back</p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
                  Past Events
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {past.map((event) => (
                  <CompactEventCard key={event._id} event={event} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── CTA ── */}
      <SectionDivider variant="wave" fill="var(--color-forest)" />
      <section className="texture-grain relative bg-forest px-4 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-10" />
        <div className="relative z-10 mx-auto max-w-2xl text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Don&apos;t Miss Out
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Follow us on social media to stay up to date with all our events and activities.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-terracotta px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-terracotta-dark hover:shadow-xl"
            >
              Get in Touch
            </Link>
            <Link
              href="/get-involved/volunteer"
              className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur transition-all hover:border-white/50 hover:bg-white/20"
            >
              Volunteer
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

/* ─── Featured Event Card ─── */
function FeaturedEventCard({ event }: { event: EVENTS_QUERY_RESULT[number] }) {
  const imageUrl = event.image?.asset
    ? urlFor(event.image).width(1200).height(600).url()
    : null
  const lqip = event.image?.asset?.metadata?.lqip
  const categoryLabel = categoryLabels[event.category ?? 'other'] ?? 'Event'
  const categoryColor = categoryColors[event.category ?? 'other'] ?? categoryColors.other
  const locationStr = event.location
    ? [event.location.name, event.location.city, event.location.state].filter(Boolean).join(', ')
    : null

  const card = (
    <div className="card-editorial group overflow-hidden sm:grid sm:grid-cols-2 sm:gap-0">
      {/* Image side */}
      <div className="relative aspect-[3/2] overflow-hidden bg-sage-light/20 sm:aspect-auto sm:h-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={event.image?.alt || event.title || ''}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            {...(lqip ? { placeholder: 'blur' as const, blurDataURL: lqip } : {})}
          />
        ) : (
          <div className="flex h-full min-h-[200px] items-center justify-center bg-sage-light/30">
            <svg className="h-16 w-16 text-sage/40" fill="none" viewBox="0 0 24 24" strokeWidth={0.75} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </div>
        )}
        <span className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold ${categoryColor}`}>
          {categoryLabel}
        </span>
      </div>

      {/* Info side */}
      <div className="flex flex-col justify-center p-8 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-terracotta">Next Up</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-stone-900 transition-colors group-hover:text-forest sm:text-3xl">
          {event.title}
        </h2>
        {event.date && (
          <p className="mt-3 flex items-center gap-2 text-lg text-stone-700">
            <svg className="h-5 w-5 shrink-0 text-forest" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <time dateTime={event.date}>{formatDate(event.date)}</time>
          </p>
        )}
        {locationStr && (
          <p className="mt-2 flex items-center gap-2 text-stone-600">
            <svg className="h-5 w-5 shrink-0 text-forest" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {locationStr}
          </p>
        )}
        {event.slug?.current && (
          <div className="mt-6">
            <span className="inline-flex items-center gap-2 font-semibold text-forest transition-colors group-hover:text-forest-dark">
              View Details
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </div>
        )}
      </div>
    </div>
  )

  if (event.slug?.current) {
    return <Link href={`/events/${event.slug.current}`}>{card}</Link>
  }
  return card
}

/* ─── Timeline Event Card ─── */
function TimelineEventCard({ event, index }: { event: EVENTS_QUERY_RESULT[number]; index: number }) {
  const categoryLabel = categoryLabels[event.category ?? 'other'] ?? 'Event'
  const dotColor = categoryDots[event.category ?? 'other'] ?? categoryDots.other
  const locationStr = event.location
    ? [event.location.name, event.location.city, event.location.state].filter(Boolean).join(', ')
    : null
  const dateParts = event.date ? formatShortDate(event.date) : null

  const card = (
    <div
      className="animate-fade-up group flex gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-stone-900/5 transition-all hover:shadow-md sm:gap-6 sm:p-6"
      style={{ '--delay': `${index * 60}ms` } as React.CSSProperties}
    >
      {/* Date badge */}
      {dateParts && (
        <div className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-cream py-2 text-center sm:w-16">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">{dateParts.month}</span>
          <span className="font-display text-2xl font-bold text-stone-900 sm:text-3xl">{dateParts.day}</span>
          <span className="text-[10px] font-medium text-stone-400">{dateParts.weekday}</span>
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${dotColor}`} />
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">{categoryLabel}</span>
        </div>
        <h3 className="mt-1 font-display text-lg font-bold text-stone-900 transition-colors group-hover:text-forest">
          {event.title}
        </h3>
        {locationStr && (
          <p className="mt-1 text-sm text-stone-500">{locationStr}</p>
        )}
      </div>

      {/* Arrow */}
      {event.slug?.current && (
        <div className="flex items-center">
          <svg className="h-5 w-5 text-stone-300 transition-all group-hover:translate-x-1 group-hover:text-forest" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      )}
    </div>
  )

  if (event.slug?.current) {
    return <Link href={`/events/${event.slug.current}`}>{card}</Link>
  }
  return card
}

/* ─── Compact Past Event Card ─── */
function CompactEventCard({ event }: { event: EVENTS_QUERY_RESULT[number] }) {
  const categoryLabel = categoryLabels[event.category ?? 'other'] ?? 'Event'
  const dotColor = categoryDots[event.category ?? 'other'] ?? categoryDots.other

  const card = (
    <div className="group flex items-center gap-4 rounded-xl border border-stone-200 bg-white/50 p-4 opacity-70 transition-all hover:opacity-100 hover:shadow-sm">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
          <span className="text-xs font-medium text-stone-400">{categoryLabel}</span>
        </div>
        <h3 className="mt-1 font-display text-sm font-semibold text-stone-700 transition-colors group-hover:text-stone-900">
          {event.title}
        </h3>
        {event.date && (
          <time dateTime={event.date} className="text-xs text-stone-400">
            {formatDate(event.date)}
          </time>
        )}
      </div>
    </div>
  )

  if (event.slug?.current) {
    return <Link href={`/events/${event.slug.current}`}>{card}</Link>
  }
  return card
}
