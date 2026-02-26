import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Team Monarch',
  description:
    "Team Monarch is Katie's Krops' youth leadership and mentorship program for teens ages 13-18. Build leadership skills, earn service hours, and make a difference.",
  openGraph: {
    title: "Team Monarch | Katie's Krops",
    description:
      "Katie's Krops' teen leadership program. Mentorship, community service, and leadership development for ages 13-18.",
  },
}

const benefits = [
  {
    title: 'Leadership Development',
    description:
      'Develop real-world leadership skills by planning events, managing projects, and mentoring younger growers.',
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
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    ),
  },
  {
    title: 'Community Service Hours',
    description:
      'Earn verified community service hours through meaningful volunteer work that looks great on college applications.',
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
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Mentorship',
    description:
      'Connect with experienced mentors and fellow Team Monarch members who share your passion for community service.',
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
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
  },
  {
    title: 'College Application Support',
    description:
      'Receive guidance on college essays, recommendation letters, and showcasing your community impact on applications.',
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
          d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
        />
      </svg>
    ),
  },
]

const requirements = [
  'Ages 13 to 18',
  'Committed to community service',
  'Passionate about fighting hunger',
  'Willing to attend regular meetings and events',
  "Able to mentor younger Katie's Krops growers",
]

export default function MonarchsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest px-4 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-20" />
        <div className="relative mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-4xl" aria-hidden="true">
            {/* Butterfly motif */}
            &#x1F98B;
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Team
            <br />
            <span className="text-sun">Monarch</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Our youth leadership program empowering the next generation of
            community leaders.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              What Is Team Monarch?
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-stone-600">
              <p>
                Team Monarch is Katie&apos;s Krops&apos; teen leadership and
                mentorship program. Named after the monarch butterfly &mdash; a
                symbol of transformation and resilience &mdash; the program helps
                young people develop into confident leaders who create lasting
                change in their communities.
              </p>
              <p>
                Members ages 13 to 18 serve as ambassadors for Katie&apos;s
                Krops, helping with events, mentoring younger growers, and
                leading community outreach efforts. Through hands-on experience
                and mentorship, Team Monarch members build the skills they need
                to make a real difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-cream px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-terracotta">
              Why Join
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Benefits of Membership
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="font-display text-xl font-semibold text-stone-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-stone-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-terracotta">
              Ready to Apply?
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              How to Join Team Monarch
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-stone-600">
              Applications are accepted on a rolling basis. If you&apos;re a
              teen who is passionate about fighting hunger and wants to grow as a
              leader, we&apos;d love to hear from you.
            </p>
            <div className="mt-8">
              <h3 className="font-display text-lg font-semibold text-stone-900">
                Requirements
              </h3>
              <ul className="mt-4 space-y-3">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-600">
                    <svg
                      className="mt-1 h-5 w-5 shrink-0 text-leaf"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Apply to Team Monarch
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Take the first step toward becoming a community leader. Fill out
              our application or reach out to learn more about the program.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/get-involved/volunteer"
                className="rounded-full bg-terracotta px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-terracotta-dark hover:shadow-xl"
              >
                Apply to Team Monarch
              </Link>
              <a
                href="mailto:katie@katieskrops.com"
                className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur transition-all hover:border-white/50 hover:bg-white/20"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
