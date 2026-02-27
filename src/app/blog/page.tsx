import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { BLOG_POSTS_QUERY } from '@/sanity/lib/queries'
import type { BLOG_POSTS_QUERY_RESULT } from '@/sanity/types'
import { urlFor } from '@/sanity/lib/image'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: "Blog | Katie's Krops",
  description:
    "Stories from the garden and beyond. Read the latest from Katie's Krops about youth gardening, community impact, and growing for the greater good.",
  openGraph: {
    title: "Blog | Katie's Krops",
    description:
      "Stories from the garden and beyond. Read the latest from Katie's Krops about youth gardening and community impact.",
    url: 'https://katieskrops.com/blog',
    siteName: "Katie's Krops",
    type: 'website',
  },
}

export default async function BlogPage() {
  const { data: posts } = await sanityFetch({
    query: BLOG_POSTS_QUERY,
  })

  const blogPosts = (posts ?? []) as BLOG_POSTS_QUERY_RESULT

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest px-4 py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-20" />
        <div className="relative mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Stories from the garden and beyond.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {blogPosts.length === 0 ? (
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
                No posts yet
              </h3>
              <p className="mt-2 text-stone-500">
                Check back soon for stories from the garden.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => {
                const imageUrl = post.image?.asset
                  ? urlFor(post.image).width(800).height(500).url()
                  : null
                const lqip = post.image?.asset?.metadata?.lqip

                return (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug?.current}`}
                    className="group rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    {/* Image */}
                    <div className="relative aspect-[3/2] overflow-hidden rounded-t-2xl bg-sage-light/20">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={post.image?.alt || post.title || ''}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          {...(lqip
                            ? { placeholder: 'blur', blurDataURL: lqip }
                            : {})}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <svg
                            className="h-12 w-12 text-sage/50"
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
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {post.publishedAt && (
                        <time
                          dateTime={post.publishedAt}
                          className="text-sm text-stone-500"
                        >
                          {formatDate(post.publishedAt)}
                        </time>
                      )}
                      <h2 className="mt-2 font-display text-xl font-semibold text-stone-900 transition-colors group-hover:text-forest">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-2 line-clamp-2 text-sm text-stone-600">
                          {post.excerpt}
                        </p>
                      )}
                      {post.author?.name && (
                        <p className="mt-3 text-sm font-medium text-forest">
                          {post.author.name}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
