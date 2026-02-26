import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { EVENTS_QUERY, EVENT_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import type { EVENTS_QUERY_RESULT } from '@/sanity/types'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@/components/portable-text'
import { formatDate, formatTime } from '@/lib/utils'

export async function generateStaticParams() {
  const events = await client.fetch<EVENTS_QUERY_RESULT>(
    EVENTS_QUERY,
    {},
    { perspective: 'published' }
  )
  return (events ?? [])
    .filter((event) => event.slug?.current)
    .map((event) => ({ slug: event.slug!.current! }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data: event } = await sanityFetch({
    query: EVENT_BY_SLUG_QUERY,
    params: { slug },
  })
  if (!event) return {}

  const imageUrl = event.image?.asset
    ? urlFor(event.image).width(1200).height(630).url()
    : undefined

  return {
    title: event.title,
    description:
      `Join us for ${event.title} at Katie's Krops.`,
    openGraph: {
      title: event.title || undefined,
      description:
        `Join us for ${event.title} at Katie's Krops.`,
      ...(imageUrl && {
        images: [{ url: imageUrl, width: 1200, height: 630 }],
      }),
    },
  }
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

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data: event } = await sanityFetch({
    query: EVENT_BY_SLUG_QUERY,
    params: { slug },
  })

  if (!event) notFound()

  const imageUrl = event.image?.asset
    ? urlFor(event.image).width(1200).height(800).url()
    : null
  const lqip = event.image?.asset?.metadata?.lqip

  const categoryLabel =
    categoryLabels[event.category ?? 'other'] ?? 'Event'
  const categoryColor =
    categoryColors[event.category ?? 'other'] ?? categoryColors.other

  const locationStr = event.location
    ? [
        event.location.name,
        event.location.address,
        event.location.city,
        event.location.state,
      ]
        .filter(Boolean)
        .join(', ')
    : null

  const isUpcoming = event.date
    ? new Date(event.date) >= new Date(new Date().toDateString())
    : false

  return (
    <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-stone-500">
          <li>
            <Link href="/" className="hover:text-forest">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/events" className="hover:text-forest">
              Events
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-stone-800" aria-current="page">
            {event.title}
          </li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Image */}
          {imageUrl && (
            <div className="relative mb-8 aspect-[3/2] overflow-hidden rounded-2xl">
              <Image
                src={imageUrl}
                alt={event.image?.alt || event.title || ''}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority
                {...(lqip
                  ? { placeholder: 'blur', blurDataURL: lqip }
                  : {})}
              />
            </div>
          )}

          {/* Title + Category */}
          <div className="mb-6 flex flex-wrap items-start gap-3">
            <h1 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              {event.title}
            </h1>
            <span
              className={`mt-1 shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${categoryColor}`}
            >
              {categoryLabel}
            </span>
          </div>

          {/* Description */}
          {event.description && (
            <div className="prose prose-stone max-w-none">
              <PortableText value={event.description} />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Details Card */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-display text-lg font-semibold text-stone-900">
                Event Details
              </h2>

              <dl className="space-y-4 text-sm">
                {/* Date */}
                {event.date && (
                  <div className="flex items-start gap-3">
                    <dt className="sr-only">Date</dt>
                    <svg
                      className="h-5 w-5 shrink-0 text-forest"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                      />
                    </svg>
                    <dd className="text-stone-700">
                      {formatDate(event.date)}
                      {event.endDate && event.endDate !== event.date && (
                        <>
                          <br />
                          <span className="text-stone-500">
                            through {formatDate(event.endDate)}
                          </span>
                        </>
                      )}
                    </dd>
                  </div>
                )}

                {/* Time */}
                {event.date && (
                  <div className="flex items-start gap-3">
                    <dt className="sr-only">Time</dt>
                    <svg
                      className="h-5 w-5 shrink-0 text-forest"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <dd className="text-stone-700">
                      {formatTime(event.date)}
                      {event.endDate && (
                        <> &ndash; {formatTime(event.endDate)}</>
                      )}
                    </dd>
                  </div>
                )}

                {/* Location */}
                {locationStr && (
                  <div className="flex items-start gap-3">
                    <dt className="sr-only">Location</dt>
                    <svg
                      className="h-5 w-5 shrink-0 text-forest"
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
                    <dd className="text-stone-700">{locationStr}</dd>
                  </div>
                )}
              </dl>

              {/* Registration CTA */}
              {event.eventUrl && isUpcoming && (
                <div className="mt-6">
                  <a
                    href={event.eventUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-3 text-center font-semibold text-white shadow-sm transition-all hover:bg-terracotta-dark"
                  >
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
                    Register / Learn More
                  </a>
                </div>
              )}

              {!isUpcoming && (
                <p className="mt-6 text-center text-sm text-stone-400">
                  This event has passed.
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Back Link */}
      <div className="mt-16 border-t border-border pt-8">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-forest transition-colors hover:text-forest-dark"
        >
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
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Events
        </Link>
      </div>
    </article>
  )
}
