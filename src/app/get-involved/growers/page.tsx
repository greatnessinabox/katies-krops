import type { Metadata } from 'next'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { GROWERS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
interface GrowerResult {
  _id: string
  _type: 'grower'
  name: string | null
  location: string | null
  gardenName: string | null
  story: string | null
  image: {
    asset: {
      _id: string
      url: string | null
      metadata: {
        lqip: string | null
        dimensions: { width: number; height: number; aspectRatio: number } | null
      } | null
    } | null
    alt?: string
    _type: 'image'
  } | null
}

export const metadata: Metadata = {
  title: 'Our Growers',
  description:
    "Meet the youth growers of Katie's Krops — young people across the country growing food and feeding communities.",
  openGraph: {
    title: "Our Growers | Katie's Krops",
    description:
      'Youth growers across the country growing food and feeding communities.',
  },
}

export default async function GrowersPage() {
  const { data: growers } = await sanityFetch({
    query: GROWERS_QUERY,
  })

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest px-4 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-20" />
        <div className="relative mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Our Growers
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Youth growers across the country growing food and feeding communities
          </p>
        </div>
      </section>

      {/* Growers Grid */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {growers && growers.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(growers as GrowerResult[]).map((grower) => (
                <div
                  key={grower._id}
                  className="rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  {grower.image?.asset?.url && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                      <Image
                        src={urlFor(grower.image)
                          .width(600)
                          .height(450)
                          .url()}
                        alt={grower.image?.alt || grower.name || 'Grower photo'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        {...(grower.image.asset?.metadata?.lqip
                          ? {
                              placeholder: 'blur' as const,
                              blurDataURL: grower.image.asset.metadata.lqip,
                            }
                          : {})}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-stone-900">
                      {grower.name}
                    </h3>
                    {grower.gardenName && (
                      <p className="mt-1 text-sm font-medium text-forest">
                        {grower.gardenName}
                      </p>
                    )}
                    {grower.location && (
                      <p className="mt-1 flex items-center gap-1 text-sm text-stone-500">
                        <svg
                          className="h-3.5 w-3.5"
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
                        {grower.location}
                      </p>
                    )}
                    {grower.story && (
                      <p className="mt-3 line-clamp-3 text-sm text-stone-600">
                        {grower.story}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
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
                  d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                />
              </svg>
              <h3 className="mt-4 font-display text-lg font-semibold text-stone-800">
                Grower profiles coming soon
              </h3>
              <p className="mt-2 text-stone-500">
                Check back to meet the inspiring youth growing food across the
                country.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Want to Become a Grower?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
            If you&apos;re between 9 and 16 years old and want to grow food for
            your community, apply for a Katie&apos;s Krops garden grant.
          </p>
          <div className="mt-8">
            <a
              href="https://form.jotform.com/233192373498062"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-terracotta-dark hover:shadow-xl"
            >
              Apply for a Garden Grant
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
          </div>
        </div>
      </section>
    </>
  )
}
