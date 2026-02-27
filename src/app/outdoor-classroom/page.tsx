import type { Metadata } from 'next'
import { Suspense } from 'react'
import { sanityFetch } from '@/sanity/lib/live'
import { OUTDOOR_CLASSES_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import type { OUTDOOR_CLASSES_QUERY_RESULT } from '@/sanity/types'
import { ClassCard } from '@/components/class-card'
import { ClassFilters } from '@/components/class-filters'

export const metadata: Metadata = {
  title: 'Outdoor Classroom',
  description:
    "Explore nature-based classes for kids and families at Katie's Krops Outdoor Classroom in Summerville, SC. Gardening, cooking, art, nature walks, and more.",
  robots: { index: true, follow: true },
  alternates: { canonical: '/outdoor-classroom' },
  openGraph: {
    title: "Outdoor Classroom | Katie's Krops",
    description:
      "Explore nature-based classes for kids and families at Katie's Krops Outdoor Classroom.",
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: "Katie's Krops — Growing for the Greater Good" }],
  },
}

async function ClassGrid({
  ageGroup,
  category,
}: {
  ageGroup: string
  category: string
}) {
  const { data: classes } = await sanityFetch({
    query: OUTDOOR_CLASSES_QUERY,
    params: { ageGroup, category },
  })

  if (!classes || classes.length === 0) {
    return (
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
          No classes found
        </h3>
        <p className="mt-2 text-stone-500">
          Try adjusting your filters or check back soon for new classes.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {(classes as OUTDOOR_CLASSES_QUERY_RESULT).map((cls) => (
        <ClassCard key={cls._id} {...cls} />
      ))}
    </div>
  )
}

export default async function OutdoorClassroomPage({
  searchParams,
}: {
  searchParams: Promise<{ ageGroup?: string; category?: string }>
}) {
  const params = await searchParams
  const ageGroup = params.ageGroup || 'all'
  const category = params.category || 'all'

  const { data: settings } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
  })

  const policies = settings?.defaultPolicies ?? []

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <header className="mb-10">
        <h1 className="font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          Outdoor Classroom
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-stone-600">
          Nature-based learning for curious minds. Explore gardening, cooking,
          art, wildlife, and more in our outdoor classroom at Summerville, SC.
        </p>
      </header>

      {/* Policies Banner */}
      {policies.length > 0 && (
        <div className="mb-8 rounded-2xl border border-sun/30 bg-sun/10 p-6">
          <h2 className="mb-3 font-display text-lg font-semibold text-soil">
            Before You Register
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {policies.map((policy: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-soil">
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
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
                {policy}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Filters */}
      <div className="mb-8">
        <ClassFilters />
      </div>

      {/* Class Grid */}
      <Suspense
        fallback={
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-border bg-white"
              >
                <div className="aspect-[3/2] bg-sage-light/30" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-1/3 rounded bg-stone-200" />
                  <div className="h-5 w-2/3 rounded bg-stone-200" />
                  <div className="h-4 w-1/2 rounded bg-stone-200" />
                  <div className="h-6 w-1/4 rounded bg-stone-200" />
                </div>
              </div>
            ))}
          </div>
        }
      >
        <ClassGrid ageGroup={ageGroup} category={category} />
      </Suspense>
    </div>
  )
}
