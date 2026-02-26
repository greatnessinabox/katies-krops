import type { Metadata } from 'next'
import { VolunteerForm } from '@/components/volunteer-form'

export const metadata: Metadata = {
  title: 'Volunteer With Us',
  description:
    "Volunteer with Katie's Krops in Summerville, SC. Help with community dinners, garden maintenance, outdoor classroom events, and more.",
  openGraph: {
    title: "Volunteer With Us | Katie's Krops",
    description:
      "Volunteer with Katie's Krops — help with dinners, gardens, and events.",
  },
}

export default function VolunteerPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest px-4 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-20" />
        <div className="relative mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Volunteer With Us
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Lend a hand and help us grow food for those in need
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Info */}
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900">
                How You Can Help
              </h2>
              <p className="mt-4 text-lg text-stone-600">
                Katie&apos;s Krops relies on volunteers for community dinners,
                garden maintenance, outdoor classroom events, and more. We are
                located in Summerville, SC and always looking for friendly faces
                to join us.
              </p>

              <div className="mt-8 space-y-6">
                {[
                  {
                    title: 'Community Dinners',
                    description:
                      'Help prepare and serve healthy meals using vegetables grown in our gardens.',
                  },
                  {
                    title: 'Garden Maintenance',
                    description:
                      'Assist with planting, weeding, watering, and harvesting in our gardens.',
                  },
                  {
                    title: 'Outdoor Classroom Events',
                    description:
                      'Support our educational programs for kids and families.',
                  },
                  {
                    title: 'Special Events',
                    description:
                      'Help with fundraisers, SpringFest, and other community events throughout the year.',
                  },
                ].map((opportunity) => (
                  <div key={opportunity.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest/10">
                      <svg
                        className="h-5 w-5 text-forest"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-stone-900">
                        {opportunity.title}
                      </h3>
                      <p className="mt-1 text-stone-600">
                        {opportunity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
                <h2 className="mb-6 font-display text-2xl font-bold text-stone-900">
                  Sign Up to Volunteer
                </h2>
                <VolunteerForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
