import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Get Involved',
  description:
    "Join Katie's Krops — volunteer, start a garden, or become a grower. Help us grow food and feed communities across the country.",
  openGraph: {
    title: "Get Involved | Katie's Krops",
    description:
      "Join Katie's Krops — volunteer, start a garden, or become a grower.",
  },
}

const pathways = [
  {
    title: 'Volunteer',
    description:
      'Help with events, gardens, and community dinners. Whether you have an hour or a day, there are plenty of ways to lend a hand at our Summerville, SC location.',
    href: '/get-involved/volunteer',
    external: false,
    icon: (
      <svg
        className="h-8 w-8 text-forest"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Start a Garden',
    description:
      "Apply for a Katie's Krops garden grant. We provide seeds, supplies, and mentorship to youth ages 9\u201316 who want to grow food for those in need. Applications open in January for the following growing season.",
    href: 'https://form.jotform.com/233192373498062',
    external: true,
    icon: (
      <svg
        className="h-8 w-8 text-forest"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
        />
      </svg>
    ),
  },
  {
    title: 'Become a Grower',
    description:
      'Join our nationwide network of youth growers who are making a difference in their communities. See what our growers are up to and get inspired.',
    href: '/get-involved/growers',
    external: false,
    icon: (
      <svg
        className="h-8 w-8 text-forest"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
    ),
  },
]

export default function GetInvolvedPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest px-4 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-20" />
        <div className="relative mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Get Involved
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Join us in growing food and feeding communities
          </p>
        </div>
      </section>

      {/* Pathways */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {pathways.map((pathway) => (
              <div
                key={pathway.title}
                className="group relative flex flex-col rounded-2xl border border-border bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-forest/5">
                  {pathway.icon}
                </div>
                <h2 className="font-display text-2xl font-bold text-stone-900">
                  {pathway.title}
                </h2>
                <p className="mt-3 flex-1 text-stone-600">
                  {pathway.description}
                </p>
                <div className="mt-6">
                  {pathway.external ? (
                    <a
                      href={pathway.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-terracotta-dark"
                    >
                      Apply Now
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
                  ) : (
                    <Link
                      href={pathway.href}
                      className="inline-flex items-center gap-2 rounded-full border-2 border-forest bg-white px-8 py-3.5 font-semibold text-forest transition-all hover:bg-forest/5"
                    >
                      Learn More
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
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-cream px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Or support us with a donation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
            Every dollar helps us grow more food and feed more people. Your
            generosity makes a direct impact in communities across the country.
          </p>
          <div className="mt-8">
            <Link
              href="/support/donate"
              className="inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-terracotta-dark hover:shadow-xl"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              Donate Now
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
