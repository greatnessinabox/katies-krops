import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { DonationCta } from '@/components/donation-cta'

export const metadata: Metadata = {
  title: 'Donate',
  description:
    "Make a tax-deductible donation to Katie's Krops. Your generosity helps youth grow food and feed communities. EIN: 27-2456170.",
  openGraph: {
    title: "Donate | Katie's Krops",
    description:
      "Make a tax-deductible donation to Katie's Krops. EIN: 27-2456170.",
  },
}

export default async function DonatePage() {
  const { data: settings } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
  })

  const donationUrl = settings?.donationUrl

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest px-4 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-20" />
        <div className="relative mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Make a Donation
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Your generosity helps youth grow food and feed communities
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Info */}
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900">
                Every Dollar Grows a Brighter Future
              </h2>
              <p className="mt-4 text-lg text-stone-600">
                Katie&apos;s Krops is a 501(c)(3) nonprofit organization. All
                donations are tax-deductible to the fullest extent allowed by
                law.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cream px-4 py-2 text-sm font-medium text-stone-700">
                <svg
                  className="h-4 w-4 text-forest"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
                EIN: 27-2456170
              </div>

              <p className="mt-6 text-lg text-stone-600">
                Your donation directly supports our mission to empower youth to
                start and maintain vegetable gardens that feed people in need.
                Funds go toward garden grants, seeds, supplies, community
                dinners, and educational programs.
              </p>

              {/* How donations help */}
              <div className="mt-8 space-y-4">
                <h3 className="font-display text-xl font-semibold text-stone-900">
                  How Your Donation Helps
                </h3>
                {[
                  {
                    amount: '$25',
                    impact: 'Provides seeds and starter supplies for a new garden',
                  },
                  {
                    amount: '$50',
                    impact: 'Feeds a family at one of our community dinners',
                  },
                  {
                    amount: '$100',
                    impact: 'Supplies tools and soil for a youth grower',
                  },
                  {
                    amount: '$250',
                    impact: 'Funds a full garden grant for a young grower',
                  },
                ].map((level) => (
                  <div
                    key={level.amount}
                    className="flex items-start gap-3 rounded-lg border border-border bg-white p-4"
                  >
                    <span className="shrink-0 font-display text-lg font-bold text-forest">
                      {level.amount}
                    </span>
                    <span className="text-stone-600">{level.impact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Donation CTA */}
            <div>
              {donationUrl ? (
                <div className="sticky top-8">
                  <DonationCta url={donationUrl} />
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-sage bg-sage-light/20 p-8 text-center">
                  <p className="text-stone-500">
                    Donation link is being set up. Please check back soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="bg-cream px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Other Ways to Give
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Check */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-forest/10">
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
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg font-semibold text-stone-900">
                Donate by Check
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                Make checks payable to Katie&apos;s Krops and mail to:
              </p>
              <address className="mt-3 text-sm not-italic text-stone-600">
                Katie&apos;s Krops
                <br />
                {settings?.address || 'Summerville, SC'}
              </address>
            </div>

            {/* Recurring */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-forest/10">
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
                    d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg font-semibold text-stone-900">
                Recurring Giving
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                Set up a monthly donation to provide steady support for our
                programs. Even a small monthly gift makes a big impact over time.
              </p>
              {donationUrl && (
                <a
                  href={donationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-forest transition-colors hover:text-forest-dark"
                >
                  Set Up Monthly Giving &rarr;
                </a>
              )}
            </div>

            {/* Planned Giving */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-forest/10">
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
                    d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg font-semibold text-stone-900">
                Planned Giving
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                Include Katie&apos;s Krops in your estate plans to leave a
                lasting legacy. Contact us to learn more about planned giving
                options.
              </p>
              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="mt-4 inline-block text-sm font-semibold text-forest transition-colors hover:text-forest-dark"
                >
                  Contact Us &rarr;
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
