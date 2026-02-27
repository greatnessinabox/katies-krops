import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { OUTDOOR_CLASSES_QUERY, OUTDOOR_CLASS_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import type { OUTDOOR_CLASSES_QUERY_RESULT } from '@/sanity/types'
import { urlFor } from '@/sanity/lib/image'
import { formatDate, formatTime, formatPrice } from '@/lib/utils'
import { AddToCalendar } from '@/components/add-to-calendar'
import { WaitlistForm } from '@/components/waitlist-form'
import { DonationCta } from '@/components/donation-cta'
import { PortableText } from '@/components/portable-text'

export async function generateStaticParams() {
  const classes = await client.fetch<OUTDOOR_CLASSES_QUERY_RESULT>(
    OUTDOOR_CLASSES_QUERY,
    { ageGroup: 'all', category: 'all' },
    { perspective: 'published' }
  )
  return (classes ?? [])
    .filter((cls) => cls.slug?.current)
    .map((cls) => ({ slug: cls.slug!.current! }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data: cls } = await sanityFetch({
    query: OUTDOOR_CLASS_BY_SLUG_QUERY,
    params: { slug },
  })
  if (!cls) return {}

  const imageUrl = cls.image?.asset
    ? urlFor(cls.image).width(1200).height(630).url()
    : undefined

  const rawTitle = cls.seo?.title || cls.title || ''
  const metaTitle = rawTitle.length > 43
    ? rawTitle.slice(0, 40) + '...'
    : rawTitle

  return {
    title: metaTitle,
    description:
      cls.seo?.description ||
      `Join us for ${cls.title} at Katie's Krops Outdoor Classroom.`,
    robots: { index: true, follow: true },
    alternates: { canonical: `/outdoor-classroom/${slug}` },
    openGraph: {
      title: cls.seo?.title || cls.title,
      description:
        cls.seo?.description ||
        `Join us for ${cls.title} at Katie's Krops Outdoor Classroom.`,
      ...(imageUrl
        ? { images: [{ url: imageUrl, width: 1200, height: 630 }] }
        : { images: [{ url: '/images/og-default.png', width: 1200, height: 630 }] }),
    },
  }
}

const statusConfig: Record<string, { label: string; color: string }> = {
  upcoming: { label: 'Spots Available', color: 'bg-forest/10 text-forest' },
  full: { label: 'Class Full', color: 'bg-terracotta/10 text-terracotta' },
  waitlist: { label: 'Waitlist Open', color: 'bg-sun/20 text-soil' },
  cancelled: { label: 'Cancelled', color: 'bg-stone-200 text-stone-500' },
  completed: { label: 'Completed', color: 'bg-stone-200 text-stone-500' },
}

export default async function ClassDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data: cls } = await sanityFetch({
    query: OUTDOOR_CLASS_BY_SLUG_QUERY,
    params: { slug },
  })

  if (!cls) notFound()

  const imageUrl = cls.image?.asset
    ? urlFor(cls.image).width(1200).height(800).url()
    : null
  const lqip = cls.image?.asset?.metadata?.lqip
  const status = statusConfig[cls.status ?? 'upcoming'] ?? statusConfig.upcoming
  const policies = cls.policies?.length
    ? cls.policies
    : cls.siteSettings?.defaultPolicies ?? []
  const donationUrl = cls.siteSettings?.donationUrl

  const locationStr = cls.location
    ? [cls.location.name, cls.location.address, cls.location.city, cls.location.state]
        .filter(Boolean)
        .join(', ')
    : undefined

  return (
    <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-stone-500">
          <li>
            <a href="/" className="hover:text-forest">
              Home
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <a href="/outdoor-classroom" className="hover:text-forest">
              Outdoor Classroom
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-stone-800" aria-current="page">
            {cls.title}
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
                alt={cls.image?.alt || cls.title || ''}
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

          {/* Title + Status */}
          <div className="mb-6 flex flex-wrap items-start gap-3">
            <h1 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              {cls.title}
            </h1>
            <span
              className={`mt-1 shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${status.color}`}
            >
              {status.label}
            </span>
          </div>

          {/* Description */}
          {cls.description && (
            <div className="prose prose-stone mb-8 max-w-none">
              <PortableText value={cls.description} />
            </div>
          )}

          {/* Policies */}
          {policies.length > 0 && (
            <section className="mb-8 rounded-2xl border border-sun/30 bg-sun/10 p-6">
              <h2 className="mb-3 font-display text-lg font-semibold text-soil">
                Things to Know
              </h2>
              <ul className="space-y-2">
                {policies.map((policy: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-soil"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-terracotta"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {policy}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Instructor */}
          {cls.instructor && (
            <section className="mb-8">
              <h2 className="mb-3 font-display text-lg font-semibold text-stone-900">
                Your Instructor
              </h2>
              <div className="flex items-center gap-4">
                {cls.instructor.image?.asset && (
                  <Image
                    src={urlFor(cls.instructor.image).width(80).height(80).url()}
                    alt={cls.instructor.name || ''}
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-stone-900">
                    {cls.instructor.name}
                  </p>
                  {cls.instructor.bio && (
                    <p className="mt-1 text-sm text-stone-600">
                      {typeof cls.instructor.bio === 'string'
                        ? cls.instructor.bio
                        : 'Experienced outdoor educator'}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Details Card */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-baseline justify-between">
                <span className="font-display text-3xl font-bold text-forest">
                  {formatPrice(cls.price ?? 0)}
                </span>
                {cls.scholarshipAvailable && (
                  <span className="rounded bg-sun/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-soil">
                    Scholarship Available
                  </span>
                )}
              </div>

              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="sr-only">Date</dt>
                  <dd className="flex items-start gap-3 text-stone-700">
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
                    <span>
                      {cls.date && formatDate(cls.date)}
                      {cls.date && cls.endTime && (
                        <>
                          <br />
                          <span className="text-stone-500">
                            {formatTime(cls.date)} &ndash;{' '}
                            {formatTime(cls.endTime)}
                          </span>
                        </>
                      )}
                    </span>
                  </dd>
                </div>

                {cls.ageGroup && (
                  <div>
                    <dt className="sr-only">Age Group</dt>
                    <dd className="flex items-start gap-3 text-stone-700">
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
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                      <span>Ages: {cls.ageGroup}</span>
                    </dd>
                  </div>
                )}

                {cls.category && (
                  <div>
                    <dt className="sr-only">Category</dt>
                    <dd className="flex items-start gap-3 text-stone-700">
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
                          d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 6h.008v.008H6V6z"
                        />
                      </svg>
                      <span>{cls.category}</span>
                    </dd>
                  </div>
                )}

                {locationStr && (
                  <div>
                    <dt className="sr-only">Location</dt>
                    <dd className="flex items-start gap-3 text-stone-700">
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
                      <span>{locationStr}</span>
                    </dd>
                  </div>
                )}

                {cls.maxCapacity && (
                  <div>
                    <dt className="sr-only">Capacity</dt>
                    <dd className="flex items-start gap-3 text-stone-700">
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
                          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                        />
                      </svg>
                      <span>Max {cls.maxCapacity} students</span>
                    </dd>
                  </div>
                )}
              </dl>

              {/* CTA */}
              <div className="mt-6 space-y-3">
                {cls.status === 'waitlist' ? (
                  <div id="waitlist">
                    <WaitlistForm classTitle={cls.title || ''} />
                  </div>
                ) : cls.status !== 'full' &&
                  cls.status !== 'cancelled' &&
                  cls.status !== 'completed' ? (
                  cls.registrationUrl ? (
                    <a
                      href={cls.registrationUrl}
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
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                      Register Now
                    </a>
                  ) : null
                ) : null}

                {cls.status !== 'cancelled' && cls.status !== 'completed' && (
                  <div className="flex justify-center">
                    <AddToCalendar
                      title={cls.title || ''}
                      startDate={cls.date || ''}
                      endDate={cls.endTime ?? undefined}
                      description={`Outdoor Classroom at Katie's Krops`}
                      location={locationStr}
                    />
                    <span className="ml-2 text-sm text-stone-500">
                      Add to Calendar
                    </span>
                  </div>
                )}
              </div>

              {cls.registrationUrl && (
                <p className="mt-4 text-center text-xs text-stone-400">
                  You&apos;ll be taken to our secure payment portal &mdash;
                  CharityProud
                </p>
              )}
            </div>

            {/* Donation CTA */}
            {donationUrl && <DonationCta url={donationUrl} />}
          </div>
        </aside>
      </div>
    </article>
  )
}
