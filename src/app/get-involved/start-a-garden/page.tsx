import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start a Garden',
  description:
    "Apply for a Katie's Krops garden grant. We provide seeds, supplies, and mentorship to youth ages 9-16 who want to grow food for those in need.",
  robots: { index: true, follow: true },
  alternates: { canonical: '/get-involved/start-a-garden' },
  openGraph: {
    title: "Start a Garden | Katie's Krops",
    description:
      "Apply for a Katie's Krops garden grant. Seeds, supplies, and mentorship for youth ages 9-16 who want to grow food for those in need.",
    url: 'https://katieskrops.com/get-involved/start-a-garden',
    siteName: "Katie's Krops",
    type: 'website',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: "Katie's Krops — Growing for the Greater Good" }],
  },
}

const requirements = [
  {
    title: 'Be 9\u201316 years old',
    description:
      'Our garden grant program is designed for youth who want to make a difference.',
  },
  {
    title: 'Have an adult garden helper',
    description:
      'A parent, guardian, teacher, or mentor who can help supervise your garden.',
  },
  {
    title: 'Have access to land',
    description:
      'A backyard, school plot, community garden space, or other land where you can grow vegetables.',
  },
  {
    title: 'Commit to maintaining your garden',
    description:
      'Water, weed, and care for your garden throughout the growing season.',
  },
  {
    title: 'Donate the harvest',
    description:
      'All produce grown must be donated to help feed people in need in your community.',
  },
]

const steps = [
  {
    number: '1',
    title: 'Apply',
    description:
      'Applications open in January each year. Fill out our online application with help from your adult garden helper.',
  },
  {
    number: '2',
    title: 'Get Selected',
    description:
      'Our team reviews all applications and selects growers based on their plans, commitment, and community need.',
  },
  {
    number: '3',
    title: 'Receive Support',
    description:
      'Selected growers receive seeds, supplies, and ongoing mentorship from the Katie\'s Krops team.',
  },
  {
    number: '4',
    title: 'Grow & Give',
    description:
      'Grow your garden throughout the season and donate your harvest to those in need in your community.',
  },
]

export default function StartAGardenPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest px-4 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-20" />
        <div className="relative mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Start a Katie&apos;s Krops Garden
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Grow food for your community with our garden grant program
          </p>
        </div>
      </section>

      {/* Program Description */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              The Garden Grant Program
            </h2>
            <p className="mt-4 text-lg text-stone-600">
              Katie&apos;s Krops provides grants to youth ages 9&ndash;16 to
              start vegetable gardens in their communities. Our growers plant,
              tend, and harvest their gardens &mdash; then donate everything they
              grow to help feed those in need.
            </p>
            <p className="mt-4 text-lg text-stone-600">
              Since our founding, we&apos;ve supported hundreds of gardens across
              the country, empowering young people to make a real difference in
              their neighborhoods.
            </p>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="bg-cream px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Requirements
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-stone-600">
            To be eligible for a Katie&apos;s Krops garden grant, you must meet
            the following criteria:
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {requirements.map((req) => (
              <div
                key={req.title}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-leaf/10">
                  <svg
                    className="h-5 w-5 text-leaf"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-semibold text-stone-900">
                  {req.title}
                </h3>
                <p className="mt-2 text-sm text-stone-600">{req.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-stone-600">
            Applications open in January for the following growing season.
            Here&apos;s what to expect:
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-forest font-display text-xl font-bold text-white">
                  {step.number}
                </div>
                <h3 className="font-display text-lg font-semibold text-stone-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-stone-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sage-light/30 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Ready to Start Growing?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
            Applications open in January each year. Click below to fill out your
            garden grant application on JotForm.
          </p>
          <div className="mt-8">
            <a
              href="https://form.jotform.com/233192373498062"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-terracotta-dark hover:shadow-xl"
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
          </div>
        </div>
      </section>

      {/* Success Stories Placeholder */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Success Stories
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-stone-600">
            Hear from our growers about how their gardens have made an impact in
            their communities.
          </p>
          <div className="mt-10 rounded-2xl border border-dashed border-sage bg-sage-light/20 p-12 text-center">
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
            <p className="mt-4 font-display text-lg font-semibold text-stone-400">
              Success stories coming soon
            </p>
            <p className="mt-2 text-sm text-stone-400">
              Check back for inspiring stories from our garden grant recipients.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
