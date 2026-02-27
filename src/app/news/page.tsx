import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { NEWS_ITEMS_QUERY } from '@/sanity/lib/queries'

type NewsItem = {
  _id: string
  _type: 'newsItem'
  title: string | null
  url: string | null
  source: string | null
  publishedAt: string | null
  excerpt: string | null
}

export const metadata: Metadata = {
  title: "News & Press | Katie's Krops",
  description:
    "Read the latest news, press coverage, and media features about Katie's Krops and our youth-led garden programs.",
  openGraph: {
    title: "News & Press | Katie's Krops",
    description:
      "The latest news and press coverage about Katie's Krops and our youth-led garden programs.",
    url: 'https://katieskrops.com/news',
    siteName: "Katie's Krops",
    type: 'website',
  },
}

function formatDate(dateString: string | null) {
  if (!dateString) return null
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function NewsPage() {
  const { data: newsItems } = await sanityFetch({
    query: NEWS_ITEMS_QUERY,
  })

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest px-4 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-20" />
        <div className="relative mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            News &amp;
            <br />
            <span className="text-sun">Press</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            The latest coverage and stories about Katie&apos;s Krops.
          </p>
        </div>
      </section>

      {/* News Items */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {newsItems && newsItems.length > 0 ? (
            <div className="mx-auto max-w-3xl">
              <div className="divide-y divide-border">
                {(newsItems as NewsItem[]).map((item) => (
                  <article key={item._id} className="py-8 first:pt-0 last:pb-0">
                    <div className="flex flex-wrap items-center gap-3">
                      {item.source && (
                        <span className="rounded-full bg-sage-light/50 px-3 py-1 text-xs font-medium text-forest">
                          {item.source}
                        </span>
                      )}
                      {item.publishedAt && (
                        <time
                          dateTime={item.publishedAt}
                          className="text-sm text-stone-400"
                        >
                          {formatDate(item.publishedAt)}
                        </time>
                      )}
                    </div>
                    <h2 className="mt-3 font-display text-xl font-semibold text-stone-900 sm:text-2xl">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-forest"
                        >
                          {item.title}
                          <span className="ml-2 inline-block" aria-hidden="true">
                            &rarr;
                          </span>
                        </a>
                      ) : (
                        item.title
                      )}
                    </h2>
                    {item.excerpt && (
                      <p className="mt-2 leading-relaxed text-stone-600">
                        {item.excerpt}
                      </p>
                    )}
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-forest-dark"
                      >
                        Read Article
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
                    )}
                  </article>
                ))}
              </div>
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
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                />
              </svg>
              <h3 className="mt-4 font-display text-lg font-semibold text-stone-800">
                Check Back Soon
              </h3>
              <p className="mt-2 text-stone-500">
                Check back soon for the latest news about Katie&apos;s Krops.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
