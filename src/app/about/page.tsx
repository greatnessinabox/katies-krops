import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description:
    "Learn how Katie Stagliano started Katie's Krops with a single cabbage and grew it into a movement empowering youth across 30+ states to feed their communities.",
  openGraph: {
    title: "About | Katie's Krops",
    description:
      "Learn how Katie Stagliano started Katie's Krops with a single cabbage and grew it into a movement empowering youth to feed their communities.",
  },
}

const impactStats = [
  { value: '100+', label: 'Youth-Led Gardens' },
  { value: '30+', label: 'States Nationwide' },
  { value: '500,000+', label: 'Lbs of Produce Donated' },
  { value: '105,000+', label: 'Meals Served' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest px-4 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-20" />
        <div className="relative mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Cultivating
            <br />
            <span className="text-sun">Compassion</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            What started with one young girl and a single cabbage has grown into
            a nationwide movement of youth-led gardens feeding communities in
            need.
          </p>
        </div>
      </section>

      {/* Katie's Story */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Katie&apos;s Story
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-stone-600">
              <p>
                In 2008, nine-year-old Katie Stagliano brought home a tiny
                cabbage seedling from her school&apos;s Bonnie Plants Third
                Grade Cabbage Program. She tended it carefully in her backyard
                garden in Summerville, South Carolina, watching it grow day after
                day.
              </p>
              <p>
                That little seedling grew into a 40-pound cabbage &mdash; far
                more than her family could ever eat. Katie decided to donate it
                to Tri-County Family Ministries, a soup kitchen in North
                Charleston. That single cabbage, combined with other vegetables,
                helped feed 275 people.
              </p>
              <p>
                Seeing the impact one vegetable garden could have on her
                community, Katie was inspired to do more. She started planting
                additional gardens and donating all of the harvest. Word spread,
                and other young people wanted to do the same. In 2009,
                Katie&apos;s Krops was officially founded to empower youth across
                the country to start their own gardens and feed those in need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-cream px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-terracotta">
              Our Mission
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Growing Food, Growing Leaders
            </h2>
            <p className="mt-6 text-xl leading-relaxed text-stone-600">
              Katie&apos;s Krops empowers youth to start and maintain vegetable
              gardens and donate the harvest to those in need &mdash; cultivating
              a generation of compassionate leaders who understand the power of
              giving back.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="border-y border-border bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-terracotta">
              Our Impact Since 2009
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              The Numbers Speak for Themselves
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-white p-8 text-center shadow-sm"
              >
                <p className="font-display text-4xl font-bold text-forest sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-stone-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mother-Daughter Partnership */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              A Family Rooted in Service
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-stone-600">
              <p>
                From the very beginning, Katie&apos;s mother Stacy Stagliano has
                been by her side &mdash; helping tend the gardens, driving
                produce to donation sites, and building the organizational
                foundation that allows Katie&apos;s Krops to thrive today.
              </p>
              <p>
                Together, this mother-daughter team has turned a backyard project
                into a nationally recognized nonprofit with more than 100 gardens
                across the country. Stacy&apos;s tireless dedication behind the
                scenes and Katie&apos;s passion for feeding the hungry have
                created a model for youth-led community service that continues to
                inspire families everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Join the Movement
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Whether you start a garden, volunteer your time, or make a
              donation, you can help us grow healthy food and share it with those
              who need it most.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/get-involved/start-a-garden"
                className="rounded-full bg-terracotta px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-terracotta-dark hover:shadow-xl"
              >
                Start a Garden
              </Link>
              <Link
                href="/support/donate"
                className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur transition-all hover:border-white/50 hover:bg-white/20"
              >
                Donate Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
