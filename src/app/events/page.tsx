import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { EVENTS_QUERY } from '@/sanity/lib/queries'
import type { EVENTS_QUERY_RESULT } from '@/sanity/types'
import { urlFor } from '@/sanity/lib/image'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Events',
  description:
    "Upcoming events and gatherings at Katie's Krops. Join us for dinners, fundraisers, volunteer days, and more.",
  openGraph: {
    title: "Events | Katie's Krops",
    description:
      "Upcoming events and gatherings at Katie's Krops.",
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

function isUpcoming(dateStr: string | null): boolean {
  if (!dateStr) return false
  return new Date(dateStr) >= new Date(new Date().toDateString())
}

export default async function EventsPage() {
  const { data: events } = await sanityFetch({
    query: EVENTS_QUERY,
  })

  const allEvents = (events ?? []) as EVENTS_QUERY_RESULT
  const upcoming = allEvents.filter((e) => isUpcoming(e.date))
  const past = allEvents.filter((e) => !isUpcoming(e.date))

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest px-4 py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-20" />
        <div className="relative mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Events
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Join us at upcoming gatherings, dinners, and community events.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {upcoming.length > 0 && (
            <>
              <h2 className="mb-8 font-display text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
                Upcoming Events
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            </>
          )}

          {upcoming.length === 0 && (
            <div className="py-16 text-center">
              <svg
                className="mx-auto h-12 w-12 text-sage"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              <h3 className="mt-4 font-display text-lg font-semibold text-stone-800">
                No upcoming events
              </h3>
              <p className="mt-2 text-stone-500">
                Check back soon for new events, or browse our past events below.
              </p>
            </div>
          )}

          {/* Past Events */}
          {past.length > 0 && (
            <div className={upcoming.length > 0 ? 'mt-16' : ''}>
              <h2 className="mb-8 font-display text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
                Past Events
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {past.map((event) => (
                  <EventCard key={event._id} event={event} isPast />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function EventCard({
  event,
  isPast = false,
}: {
  event: EVENTS_QUERY_RESULT[number]
  isPast?: boolean
}) {
  const imageUrl = event.image?.asset
    ? urlFor(event.image).width(800).height(500).url()
    : null
  const lqip = event.image?.asset?.metadata?.lqip

  const categoryLabel = categoryLabels[event.category ?? 'other'] ?? 'Event'
  const categoryColor =
    categoryColors[event.category ?? 'other'] ?? categoryColors.other

  const locationStr = event.location
    ? [event.location.name, event.location.city, event.location.state]
        .filter(Boolean)
        .join(', ')
    : null

  const content = (
    <div
      className={`group rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md ${isPast ? 'opacity-75' : ''}`}
    >
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden rounded-t-2xl bg-sage-light/20">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={event.image?.alt || event.title || ''}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            {...(lqip ? { placeholder: 'blur', blurDataURL: lqip } : {})}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <svg
              className="h-12 w-12 text-sage/50"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
          </div>
        )}

        {/* Category Badge */}
        <span
          className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold ${categoryColor}`}
        >
          {categoryLabel}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {event.date && (
          <time dateTime={event.date} className="text-sm text-stone-500">
            {formatDate(event.date)}
            {event.endDate && event.endDate !== event.date && (
              <> &ndash; {formatDate(event.endDate)}</>
            )}
          </time>
        )}
        <h3 className="mt-2 font-display text-xl font-semibold text-stone-900 transition-colors group-hover:text-forest">
          {event.title}
        </h3>
        {locationStr && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-stone-500">
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            {locationStr}
          </p>
        )}
      </div>
    </div>
  )

  if (event.slug?.current) {
    return <Link href={`/events/${event.slug.current}`}>{content}</Link>
  }

  return content
}
