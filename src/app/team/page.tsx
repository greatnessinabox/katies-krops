import type { Metadata } from 'next'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { TEAM_MEMBERS_QUERY } from '@/sanity/lib/queries'
import type { TEAM_MEMBERS_QUERY_RESULT } from '@/sanity/types'
import { urlFor } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: "Our Team | Katie's Krops",
  description:
    "Meet the dedicated team behind Katie's Krops who work every day to empower youth gardeners and feed communities in need.",
  openGraph: {
    title: "Our Team | Katie's Krops",
    description:
      "Meet the dedicated team behind Katie's Krops who empower youth gardeners and feed communities in need.",
    url: 'https://katieskrops.com/team',
    siteName: "Katie's Krops",
    type: 'website',
  },
}

export default async function TeamPage() {
  const { data: members } = await sanityFetch({
    query: TEAM_MEMBERS_QUERY,
  })

  const teamMembers = (members ?? []) as TEAM_MEMBERS_QUERY_RESULT

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest px-4 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-20" />
        <div className="relative mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Our Team
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Meet the passionate people who make Katie&apos;s Krops possible
            &mdash; from our founding family to the dedicated staff and
            volunteers who help young growers thrive.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {teamMembers.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <div
                  key={member._id}
                  className="rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Photo */}
                  {member.image?.asset?.url ? (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                      <Image
                        src={urlFor(member.image)
                          .width(600)
                          .height(450)
                          .auto('format')
                          .url()}
                        alt={member.image.alt || member.name || 'Team member'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                    <div className="flex aspect-[4/3] items-center justify-center rounded-t-2xl bg-sage-light/30">
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
                  <div className="p-6">
                    <h2 className="font-display text-xl font-bold text-stone-900">
                      {member.name}
                    </h2>
                    {member.role && (
                      <p className="mt-1 text-sm font-medium text-terracotta">
                        {member.role}
                      </p>
                    )}
                    {member.bio && (
                      <p className="mt-3 text-sm leading-relaxed text-stone-600">
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

      {/* Join the Team CTA */}
      <section className="bg-sage-light/30 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
