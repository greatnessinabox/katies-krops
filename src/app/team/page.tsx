import type { Metadata } from 'next'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { TEAM_MEMBERS_QUERY } from '@/sanity/lib/queries'
import type { TEAM_MEMBERS_QUERY_RESULT } from '@/sanity/types'
import { urlFor } from '@/sanity/lib/image'
import { HeroSection } from '@/components/hero-section'
import { YouTubeEmbed } from '@/components/youtube-embed'
import { SectionDivider } from '@/components/section-divider'

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

export default async function TeamPage() {
  const { data: members } = await sanityFetch({
    query: TEAM_MEMBERS_QUERY,
  })

  const teamMembers = (members ?? []) as TEAM_MEMBERS_QUERY_RESULT

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

      {/* ── TEAM GRID ── */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {teamMembers.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <div
                  key={member._id}
                  className={`card-lifted overflow-hidden ${
                    index === 0
                      ? 'sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-0 lg:col-span-2'
                      : ''
                  }`}
                >
                  {/* Photo */}
                  {member.image?.asset?.url ? (
                    <div
                      className={`relative overflow-hidden bg-sage-light/20 ${
                        index === 0
                          ? 'aspect-square sm:aspect-auto sm:h-full'
                          : 'aspect-square'
                      }`}
                    >
                      <Image
                        src={urlFor(member.image)
                          .width(index === 0 ? 600 : 400)
                          .height(index === 0 ? 600 : 400)
                          .auto('format')
                          .url()}
                        alt={member.image.alt || member.name || 'Team member'}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes={
                          index === 0
                            ? '(max-width: 640px) 100vw, 50vw'
                            : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                        }
                        placeholder={
                          member.image.asset.metadata?.lqip
                            ? 'blur'
                            : 'empty'
                        }
                        blurDataURL={
                          member.image.asset.metadata?.lqip ?? undefined
                        }
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-square items-center justify-center bg-sage-light/30">
                      <svg
                        className="h-16 w-16 text-sage"
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

                  {/* Info */}
                  <div className={`p-6 ${index === 0 ? 'flex flex-col justify-center sm:p-8' : ''}`}>
                    {index === 0 && (
                      <p className="kicker mb-2">Founder</p>
                    )}
                    <h2
                      className={`font-display font-bold text-stone-900 ${
                        index === 0 ? 'text-2xl sm:text-3xl' : 'text-xl'
                      }`}
                    >
                      {member.name}
                    </h2>
                    {member.role && (
                      <p className="mt-1 text-sm font-medium text-terracotta">
                        {member.role}
                      </p>
                    )}
                    {member.bio && (
                      <p
                        className={`mt-3 leading-relaxed text-stone-600 ${
                          index === 0 ? 'text-base' : 'text-sm'
                        }`}
                      >
                        {member.bio}
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
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
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
      <section className="texture-paper relative bg-cream px-4 py-16 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Want to Make a Difference?
            </h2>
            <p className="mt-4 text-lg text-stone-600">
              We&apos;re always looking for passionate people to join our
              mission. Whether you volunteer, mentor a young grower, or support
              us with a donation, every bit helps.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/get-involved/volunteer"
                className="rounded-full bg-forest px-8 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-forest-dark"
              >
                Volunteer With Us
              </a>
              <a
                href="/contact"
                className="rounded-full border border-forest bg-white px-8 py-3.5 font-semibold text-forest shadow-sm transition-all hover:bg-forest/5"
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
