import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Springfest | Katie's Krops",
  description:
    "Springfest is Katie's Krops' annual outdoor celebration and fundraiser. Join us April 25, 2026 in Summerville, SC for live music, food, kids' activities, and more.",
  openGraph: {
    title: "Springfest 2026 | Katie's Krops",
    description:
      "Katie's Krops annual fundraiser — live music, food, kids' activities, garden tours, and silent auction. April 25, 2026.",
    url: 'https://katieskrops.com/springfest',
    siteName: "Katie's Krops",
    type: 'website',
  },
}

const activities = [
  {
    title: 'Live Entertainment',
    description:
      'Enjoy live music and performances throughout the day from local artists and community groups.',
    icon: (
      <svg
        className="h-8 w-8 text-terracotta"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
        />
      </svg>
    ),
  },
  {
    title: 'Local Food Vendors',
    description:
      'Savor delicious food from local restaurants and food trucks, plus fresh produce from our gardens.',
    icon: (
      <svg
        className="h-8 w-8 text-terracotta"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18a3.75 3.75 0 00.495-7.468 5.99 5.99 0 00-1.925 3.547 5.975 5.975 0 01-2.133-1.001A3.75 3.75 0 0012 18z"
        />
      </svg>
    ),
  },
  {
    title: "Kids' Activities",
    description:
      'Fun for the whole family with face painting, games, crafts, and hands-on garden activities for kids of all ages.',
    icon: (
      <svg
        className="h-8 w-8 text-terracotta"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
        />
      </svg>
    ),
  },
  {
    title: 'Garden Tours',
    description:
      "Take a guided tour of Katie's Krops garden and see firsthand where our produce is grown for the community.",
    icon: (
      <svg
        className="h-8 w-8 text-terracotta"
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
  {
    title: 'Silent Auction',
    description:
      'Bid on unique items and experiences donated by local businesses and supporters. All proceeds benefit our programs.',
    icon: (
      <svg
        className="h-8 w-8 text-terracotta"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
        />
      </svg>
    ),
  },
  {
    title: 'Raffle',
    description:
      'Enter our raffle for a chance to win exciting prizes while supporting youth-led gardens across the country.',
    icon: (
      <svg
        className="h-8 w-8 text-terracotta"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
        />
      </svg>
    ),
  },
]

export default function SpringfestPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest px-4 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-sun)_0%,_transparent_50%)] opacity-15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-20" />
        <div className="relative mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-sun/20 px-4 py-1.5 text-sm font-semibold text-sun">
            April 25, 2026
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Springfest
            <br />
            <span className="text-sun">2026</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Our annual outdoor celebration and fundraiser. Join us for a day of
            live music, food, fun, and community.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/support/donate"
              className="rounded-full bg-terracotta px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-terracotta-dark hover:shadow-xl"
            >
              Get Tickets
            </Link>
            <a
              href="#sponsorship"
              className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur transition-all hover:border-white/50 hover:bg-white/20"
            >
              Become a Sponsor
            </a>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              About Springfest
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-stone-600">
              <p>
                Springfest is Katie&apos;s Krops&apos; signature annual
                fundraiser and outdoor celebration. Held each spring in
                Summerville, South Carolina, the event brings together families,
                volunteers, sponsors, and community members for a day of fun
                while raising funds for our youth-led gardens and feeding
                programs.
              </p>
              <p>
                From live entertainment and local food to garden tours and
                kids&apos; activities, Springfest has something for everyone. All
                proceeds go directly to supporting Katie&apos;s Krops&apos;
                mission of empowering youth to grow food and feed their
                communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Date & Location */}
      <section className="bg-cream px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage-light/50">
                  <svg
                    className="h-6 w-6 text-forest"
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
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-stone-900">
                    Date
                  </h3>
                  <p className="mt-1 text-lg text-stone-600">
                    Saturday, April 25, 2026
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage-light/50">
                  <svg
                    className="h-6 w-6 text-forest"
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
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-stone-900">
                    Location
                  </h3>
                  <p className="mt-1 text-lg text-stone-600">
                    Katie&apos;s Krops Garden
                  </p>
                  <p className="text-stone-500">Summerville, SC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-terracotta">
              What to Expect
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Activities &amp; Highlights
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <div
                key={activity.title}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm"
              >
                <div className="mb-4">{activity.icon}</div>
                <h3 className="font-display text-xl font-semibold text-stone-900">
                  {activity.title}
                </h3>
                <p className="mt-2 text-stone-600">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship */}
      <section id="sponsorship" className="bg-cream px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-terracotta">
              Support the Event
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Become a Sponsor
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-stone-600">
              Springfest sponsorships are a wonderful way to support
              Katie&apos;s Krops while getting your brand in front of hundreds of
              community members. Sponsors receive prominent logo placement, event
              recognition, and the satisfaction of knowing they are making a real
              difference.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">
              For sponsorship inquiries, please contact us at{' '}
              <a
                href="mailto:katie@katieskrops.com"
                className="font-semibold text-forest underline underline-offset-2 hover:text-forest-dark"
              >
                katie@katieskrops.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Don&apos;t Miss Springfest 2026
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Mark your calendar for April 25, 2026. Bring the whole family for
              a day of fun, food, and community &mdash; all in support of
              youth-led gardens.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/support/donate"
                className="rounded-full bg-terracotta px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-terracotta-dark hover:shadow-xl"
              >
                Get Tickets
              </Link>
              <a
                href="mailto:katie@katieskrops.com"
                className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur transition-all hover:border-white/50 hover:bg-white/20"
              >
                Sponsorship Inquiries
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
