import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HeroSection } from '@/components/hero-section'
import { LeafDivider } from '@/components/leaf-divider'
import { SectionDivider } from '@/components/section-divider'
import { AnimatedStat } from '@/components/animated-stat'

export const metadata: Metadata = {
  title: 'Our Story & Mission',
  description:
    "Learn how Katie Stagliano started Katie's Krops at age 9 with a single cabbage and grew it into a movement empowering youth across 30+ states.",
  robots: { index: true, follow: true },
  alternates: { canonical: '/about' },
  openGraph: {
    title: "About Katie's Krops | Our Story & Mission",
    description:
      "Learn how Katie Stagliano started Katie's Krops with a single cabbage and grew it into a movement empowering youth to feed their communities.",
    url: 'https://katieskrops.com/about',
    siteName: "Katie's Krops",
    type: 'website',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: "Katie's Krops — Growing for the Greater Good" }],
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
      {/* ── HERO ── warm/editorial */}
      <HeroSection
        variant="warm"
        kicker="Since 2009"
        title="Cultivating Compassion"
        highlight="Compassion"
        accentColor="terracotta"
        subtitle="What started with one young girl and a single cabbage has grown into a nationwide movement of youth-led gardens feeding communities in need."
      />

      {/* ── KATIE'S STORY — text + image side by side ── */}
      <section className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Text */}
            <div>
              <p className="kicker">The Beginning</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Katie&apos;s Story
              </h2>
              <div className="mt-8 space-y-6 text-lg leading-relaxed text-stone-600">
                <p>
                  In 2008, nine-year-old Katie Stagliano brought home a tiny
                  cabbage seedling from her school&apos;s Bonnie Plants Third
                  Grade Cabbage Program. She tended it carefully in her backyard
                  garden in Summerville, South Carolina, watching it grow day
                  after day.
                </p>
                <p>
                  Katie decided to donate her cabbage to Tri-County Family
                  Ministries, a soup kitchen in North Charleston. That single
                  cabbage, combined with other vegetables, helped feed 275
                  people.
                </p>
              </div>

              {/* Pull quote */}
              <blockquote className="pull-quote">
                That little seedling grew into a 40-pound cabbage &mdash; and
                helped feed 275 people at a local soup kitchen. One cabbage.
                275 lives touched.
              </blockquote>
            </div>

            {/* Image — Katie with harvest basket */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-stone-900/5">
                <Image
                  src="/images/about/garden-hero.webp"
                  alt="Katie Stagliano holding a basket of fresh produce from her garden"
                  width={800}
                  height={800}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-sage-light/30" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDING STORY CONTINUED ── */}
      <section className="px-4 pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-stone-600">
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
      </section>

      <LeafDivider variant="line" />

      {/* ── MISSION ── warm texture */}
      <section className="texture-mesh relative bg-cream px-4 py-20 sm:py-28">
        <div className="relative z-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kicker">Our Mission</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Growing Food, Growing Leaders
            </h2>
            <p className="mx-auto mt-8 max-w-2xl font-display text-2xl italic leading-relaxed text-stone-700 sm:text-3xl">
              Katie&apos;s Krops empowers youth to start and maintain vegetable
              gardens and donate the harvest to those in need &mdash; cultivating
              a generation of compassionate leaders who understand the power of
              giving back.
            </p>
          </div>
        </div>
      </section>

      {/* ── Transition to dark ── */}
      <SectionDivider variant="wave" fill="var(--color-forest-dark)" />

      {/* ── IMPACT STATS ── dark reversal for drama */}
      <section className="texture-grain relative bg-forest-dark px-4 py-20 sm:py-28">
        <div className="relative z-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-sage-light/80">
              Our Impact Since 2009
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The Numbers Speak
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {impactStats.map((stat, i) => (
              <AnimatedStat
                key={stat.label}
                value={stat.value}
                label={stat.label}
                delay={i * 150}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Transition back to light ── */}
      <SectionDivider variant="organic" fill="white" flip />

      {/* ── MOTHER-DAUGHTER — image left, text right ── */}
      <section className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Image collage */}
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-900/5">
                <Image
                  src="/images/about/katie-portrait.webp"
                  alt="Katie and Stacy Stagliano serving at a community dinner"
                  width={600}
                  height={750}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="mt-8 overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-900/5">
                <Image
                  src="/images/about/garden-scene.webp"
                  alt="Katie and Stacy Stagliano in the garden"
                  width={600}
                  height={450}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="kicker">A Family Effort</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Rooted in Service
              </h2>
              <div className="mt-8 space-y-6 text-lg leading-relaxed text-stone-600">
                <p>
                  From the very beginning, Katie&apos;s mother Stacy Stagliano
                  has been by her side &mdash; helping tend the gardens, driving
                  produce to donation sites, and building the organizational
                  foundation that allows Katie&apos;s Krops to thrive today.
                </p>
                <p>
                  Together, this mother-daughter team has turned a backyard
                  project into a nationally recognized nonprofit with more than
                  100 gardens across the country. Stacy&apos;s tireless
                  dedication behind the scenes and Katie&apos;s passion for
                  feeding the hungry have created a model for youth-led
                  community service that continues to inspire families
                  everywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RECOGNITION + VOLUNTEERS ── */}
      <section className="bg-cream px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="kicker">Recognition</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                A Growing Legacy
              </h2>
              <div className="mt-8 space-y-6 text-lg leading-relaxed text-stone-600">
                <p>
                  Katie&apos;s story has inspired millions. She&apos;s been
                  recognized by the Clinton Global Initiative, named a CNN Hero,
                  and featured on national media outlets. But for Katie, the real
                  reward is seeing the impact in her own community and in the
                  communities of growers across the country.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-900/5">
                <Image
                  src="/images/about/volunteers.webp"
                  alt="Katie and Stacy receiving an award at the Clinton Global Initiative"
                  width={500}
                  height={625}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="mt-8 overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-900/5">
                <Image
                  src="/images/about/volunteer-bg.webp"
                  alt="Katie's Krops volunteer team"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <LeafDivider variant="dots" />

      {/* ── CTA ── dark bookend */}
      <section className="texture-grain relative bg-forest px-4 py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-10" />
        <div className="relative z-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
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
