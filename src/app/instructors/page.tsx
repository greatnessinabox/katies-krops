import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { INSTRUCTORS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

type Instructor = {
  _id: string
  _type: 'instructor'
  name: string | null
  bio: string | null
  specialties: string[] | null
  image: {
    asset?: {
      _id: string
      url: string | null
      metadata: { lqip: string | null; dimensions: unknown } | null
    } | null
    alt?: string | null
  } | null
}

export const metadata: Metadata = {
  title: 'Our Instructors',
  description:
    "Meet the educators who bring nature to life at Katie's Krops Outdoor Classroom. Our instructors lead hands-on classes in gardening, cooking, art, and nature.",
  openGraph: {
    title: "Our Instructors | Katie's Krops",
    description:
      "Meet the passionate educators behind Katie's Krops Outdoor Classroom programs.",
  },
}

export default async function InstructorsPage() {
  const { data: instructors } = await sanityFetch({
    query: INSTRUCTORS_QUERY,
  })

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest px-4 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-20" />
        <div className="relative mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Our
            <br />
            <span className="text-sun">Instructors</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Meet the educators who bring nature to life in our Outdoor
            Classroom.
          </p>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="mb-10">
            <Link
              href="/outdoor-classroom"
              className="inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-forest-dark"
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
              Back to Outdoor Classroom
            </Link>
          </div>

          {instructors && instructors.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {(instructors as Instructor[]).map((instructor) => (
                <div
                  key={instructor._id}
                  className="rounded-2xl border border-border bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Photo */}
                    <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-sage-light/50">
                      {instructor.image?.asset ? (
                        <Image
                          src={urlFor(instructor.image)
                            .width(256)
                            .height(256)
                            .fit('crop')
                            .url()}
                          alt={instructor.image?.alt || instructor.name || ''}
                          fill
                          className="object-cover"
                          sizes="128px"
                          placeholder={
                            instructor.image?.asset?.metadata?.lqip
                              ? 'blur'
                              : 'empty'
                          }
                          blurDataURL={
                            instructor.image?.asset?.metadata?.lqip || undefined
                          }
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-sage-light/30">
                          <svg
                            className="h-12 w-12 text-sage"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <h2 className="mt-4 font-display text-xl font-semibold text-stone-900">
                      {instructor.name}
                    </h2>

                    {/* Specialties */}
                    {instructor.specialties &&
                      instructor.specialties.length > 0 && (
                        <div className="mt-3 flex flex-wrap justify-center gap-2">
                          {instructor.specialties.map(
                            (specialty) => (
                              <span
                                key={specialty}
                                className="rounded-full bg-sage-light/50 px-3 py-1 text-xs font-medium text-forest"
                              >
                                {specialty}
                              </span>
                            )
                          )}
                        </div>
                      )}

                    {/* Bio */}
                    {instructor.bio && (
                      <p className="mt-4 text-sm leading-relaxed text-stone-600">
                        {instructor.bio}
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
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
              <h3 className="mt-4 font-display text-lg font-semibold text-stone-800">
                Instructor profiles coming soon
              </h3>
              <p className="mt-2 text-stone-500">
                Check back soon to meet the educators behind our Outdoor
                Classroom.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
