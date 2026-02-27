import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import {
  BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
} from '@/sanity/lib/queries'
import type { BLOG_POSTS_QUERY_RESULT } from '@/sanity/types'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@/components/portable-text'
import { formatDate } from '@/lib/utils'

export async function generateStaticParams() {
  const posts = await client.fetch<BLOG_POSTS_QUERY_RESULT>(
    BLOG_POSTS_QUERY,
    {},
    { perspective: 'published' }
  )
  return (posts ?? [])
    .filter((post) => post.slug?.current)
    .map((post) => ({ slug: post.slug!.current! }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data: post } = await sanityFetch({
    query: BLOG_POST_BY_SLUG_QUERY,
    params: { slug },
  })
  if (!post) return {}

  const imageUrl = post.image?.asset
    ? urlFor(post.image).width(1200).height(630).url()
    : undefined

  const truncatedTitle = post.title && post.title.length > 50
    ? post.title.slice(0, 47) + '...'
    : post.title

  return {
    title: truncatedTitle,
    description:
      post.excerpt ||
      `Read "${post.title}" on the Katie's Krops blog.`,
    robots: { index: true, follow: true },
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${post.title} | Katie's Krops`,
      description:
        post.excerpt ||
        `Read "${post.title}" on the Katie's Krops blog.`,
      url: `https://katieskrops.com/blog/${slug}`,
      siteName: "Katie's Krops",
      type: 'article',
      ...(post.publishedAt && { publishedTime: post.publishedAt }),
      ...(imageUrl
        ? { images: [{ url: imageUrl, width: 1200, height: 630 }] }
        : { images: [{ url: '/images/og-default.png', width: 1200, height: 630 }] }),
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data: post } = await sanityFetch({
    query: BLOG_POST_BY_SLUG_QUERY,
    params: { slug },
  })

  if (!post) notFound()

  const imageUrl = post.image?.asset
    ? urlFor(post.image).width(1200).height(800).url()
    : null
  const lqip = post.image?.asset?.metadata?.lqip

  const authorImageUrl = post.author?.image?.asset
    ? urlFor(post.author.image).width(48).height(48).url()
    : null

  return (
    <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-stone-500">
          <li>
            <Link href="/" className="hover:text-forest">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/blog" className="hover:text-forest">
              Blog
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-stone-800" aria-current="page">
            {post.title}
          </li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mx-auto max-w-3xl text-center">
        {post.publishedAt && (
          <time
            dateTime={post.publishedAt}
            className="text-sm font-medium text-forest"
          >
            {formatDate(post.publishedAt)}
          </time>
        )}
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-4 text-lg text-stone-600">{post.excerpt}</p>
        )}

        {/* Author */}
        {post.author && (
          <div className="mt-6 flex items-center justify-center gap-3">
            {authorImageUrl && (
              <Image
                src={authorImageUrl}
                alt={post.author.name || ''}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            )}
            <span className="text-sm font-medium text-stone-700">
              {post.author.name}
            </span>
          </div>
        )}
      </header>

      {/* Cover Image */}
      {imageUrl && (
        <div className="relative mx-auto mt-10 aspect-[16/9] max-w-4xl overflow-hidden rounded-2xl">
          <Image
            src={imageUrl}
            alt={post.image?.alt || post.title || ''}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            priority
            {...(lqip ? { placeholder: 'blur', blurDataURL: lqip } : {})}
          />
        </div>
      )}

      {/* Body */}
      {post.body && (
        <div className="prose prose-stone mx-auto mt-12 max-w-3xl prose-headings:font-display prose-a:text-forest prose-a:decoration-forest/30 hover:prose-a:decoration-forest prose-img:rounded-lg">
          <PortableText value={post.body} />
        </div>
      )}

      {/* Back Link */}
      <div className="mx-auto mt-16 max-w-3xl border-t border-border pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-forest transition-colors hover:text-forest-dark"
        >
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
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Blog
        </Link>
      </div>
    </article>
  )
}
