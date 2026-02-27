import type { Metadata } from 'next'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { TEAM_MEMBERS_QUERY } from '@/sanity/lib/queries'
import type { TEAM_MEMBERS_QUERY_RESULT } from '@/sanity/types'
import { urlFor } from '@/sanity/lib/image'
import { HeroSection } from '@/components/hero-section'
import { YouTubeEmbed } from '@/components/youtube-embed'
import { SectionDivider } from '@/components/section-divider'
import { LeafDivider } from '@/components/leaf-divider'

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    "Meet the dedicated team behind Katie's Krops who work every day to empower youth gardeners and feed communities in need.",
  robots: { index: true, follow: true },
  alternates: { canonical: '/team' },
  openGraph: {
    title: "Our Team | Katie's Krops",
    description:
      "Meet the dedicated team behind Katie's Krops who empower youth gardeners and feed communities in need.",
    url: 'https://katieskrops.com/team',
    siteName: "Katie's Krops",
    type: 'website',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: "Katie's Krops — Growing for the Greater Good" }],
  },
}

/* Accent colors that cycle per card */
const accents = [
  { bg: 'bg-forest/10', ring: 'ring-forest/20', text: 'text-forest' },
  { bg: 'bg-terracotta/10', ring: 'ring-terracotta/20', text: 'text-terracotta' },
  { bg: 'bg-sun/15', ring: 'ring-sun/25', text: 'text-sun-dark' },
  { bg: 'bg-leaf/10', ring: 'ring-leaf/20', text: 'text-leaf' },
  { bg: 'bg-sage/20', ring: 'ring-sage/30', text: 'text-forest' },
  { bg: 'bg-terracotta/10', ring: 'ring-terracotta/20', text: 'text-terracotta' },
  { bg: 'bg-forest/10', ring: 'ring-forest/20', text: 'text-forest' },
  { bg: 'bg-sun/15', ring: 'ring-sun/25', text: 'text-sun-dark' },
]

export default async function TeamPage() {
  const { data: members } = await sanityFetch({
    query: TEAM_MEMBERS_QUERY,
  })

  const teamMembers = (members ?? []) as TEAM_MEMBERS_QUERY_RESULT
  const founder = teamMembers[0]
  const rest = teamMembers.slice(1)

  return (
    <>
      {/* ── HERO ── warm/editorial */}
      <HeroSection
        variant="warm"
        kicker="Our People"
        title="The Team Behind the Gardens"
        highlight="Gardens"
        accentColor="leaf"
        subtitle="Meet the passionate people who make Katie's Krops possible — from our founding family to the dedicated staff and volunteers who help young growers thrive."
      />

      {/* ── VIDEO ── */}
      <section className="bg-cream px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="kicker">Watch Our Story</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              See How We Grow
            </h2>
          </div>
          <YouTubeEmbed
            videoId="8OllB3YQALE"
            title="Katie's Krops Story"
          />
        </div>
      </section>

      <SectionDivider variant="wave" fill="white" />

      {/* ── FOUNDER SPOTLIGHT ── */}
      {founder && (
        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="card-editorial overflow-hidden sm:grid sm:grid-cols-5 sm:gap-0">
                {/* Photo — constrained, circular on mobile, sidebar on desktop */}
                <div className="flex items-center justify-center bg-sage-light/20 p-8 sm:col-span-2 sm:p-0">
                  {founder.image?.asset?.url ? (
                    <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full shadow-lg ring-4 ring-white sm:h-full sm:w-full sm:rounded-none sm:ring-0">
                      <Image
                        src={urlFor(founder.image)
                          .width(500)
                          .height(500)
                          .auto('format')
                          .url()}
                        alt={founder.image.alt || founder.name || 'Founder'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 192px, 40vw"
                        placeholder={
                          founder.image.asset.metadata?.lqip ? 'blur' : 'empty'
                        }
                        blurDataURL={
                          founder.image.asset.metadata?.lqip ?? undefined
                        }
                      />
                    </div>
                  ) : (
                    <div className="flex h-48 w-48 items-center justify-center rounded-full bg-sage-light/40">
                      <svg className="h-20 w-20 text-sage" fill="none" viewBox="0 0 24 24" strokeWidth={0.75} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center p-8 sm:col-span-3 sm:p-10">
                  <p className="kicker mb-2">Founder</p>
                  <h2 className="font-display text-2xl font-bold text-stone-900 sm:text-3xl">
                    {founder.name}
                  </h2>
                  {founder.role && (
                    <p className="mt-1 text-sm font-medium text-terracotta">
                      {founder.role}
                    </p>
                  )}
                  {founder.bio && (
                    <p className="mt-4 text-base leading-relaxed text-stone-600">
                      {founder.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <LeafDivider variant="line" />

      {/* ── TEAM GRID — creative layout with circular avatars + color accents ── */}
      <section className="texture-paper relative px-4 py-16 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="kicker">The Team</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              People Who Make It Happen
            </h2>
          </div>

          {rest.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rest.map((member, index) => {
                const accent = accents[index % accents.length]
                return (
                  <div
                    key={member._id}
                    className={`animate-fade-up rounded-2xl ${accent.bg} p-6 text-center ring-1 ${accent.ring} transition-shadow hover:shadow-md`}
                    style={{ '--delay': `${index * 80}ms` } as React.CSSProperties}
                  >
                    {/* Circular avatar */}
                    {member.image?.asset?.url ? (
                      <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-3 ring-white shadow-md">
                        <Image
                          src={urlFor(member.image)
                            .width(200)
                            .height(200)
                            .auto('format')
                            .url()}
                          alt={member.image.alt || member.name || 'Team member'}
                          fill
                          className="object-cover"
                          sizes="96px"
                          placeholder={
                            member.image.asset.metadata?.lqip ? 'blur' : 'empty'
                          }
                          blurDataURL={
                            member.image.asset.metadata?.lqip ?? undefined
                          }
                        />
                      </div>
                    ) : (
                      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/60 ring-3 ring-white shadow-md">
                        <svg className="h-10 w-10 text-sage" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                    )}

                    <h3 className="mt-4 font-display text-lg font-bold text-stone-900">
                      {member.name}
                    </h3>
                    {member.role && (
                      <p className={`mt-1 text-sm font-semibold ${accent.text}`}>
                        {member.role}
                      </p>
                    )}
                    {member.bio && (
                      <p className="mt-3 text-sm leading-relaxed text-stone-600">
                        {member.bio}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="py-16 text-center">
              <svg className="mx-auto h-12 w-12 text-sage" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              <h3 className="mt-4 font-display text-lg font-semibold text-stone-800">
                Team members coming soon
              </h3>
              <p className="mt-2 text-stone-500">
                Check back shortly &mdash; we&apos;re updating our team page.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="texture-grain relative bg-forest px-4 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-10" />
        <div className="relative z-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Want to Make a Difference?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              We&apos;re always looking for passionate people to join our
              mission. Whether you volunteer, mentor a young grower, or support
              us with a donation, every bit helps.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/get-involved/volunteer"
                className="rounded-full bg-terracotta px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-terracotta-dark hover:shadow-xl"
              >
                Volunteer With Us
              </a>
              <a
                href="/contact"
                className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur transition-all hover:border-white/50 hover:bg-white/20"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
