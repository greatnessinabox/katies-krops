import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'https://katieskrops.com')

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/team`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/outdoor-classroom`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/instructors`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/events`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/faq`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/get-involved`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/get-involved/volunteer`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/get-involved/start-a-garden`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/get-involved/growers`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/support`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/support/donate`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/dinners`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/monarchs`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/springfest`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/gallery`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/news`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  // Dynamic pages from Sanity
  const [classes, events, blogPosts] = await Promise.all([
    client.fetch<Array<{ slug: { current: string }; _updatedAt: string }>>(
      `*[_type == "outdoorClass" && defined(slug.current)] { "slug": slug, _updatedAt }`
    ),
    client.fetch<Array<{ slug: { current: string }; _updatedAt: string }>>(
      `*[_type == "event" && defined(slug.current)] { "slug": slug, _updatedAt }`
    ),
    client.fetch<Array<{ slug: { current: string }; _updatedAt: string }>>(
      `*[_type == "blogPost" && defined(slug.current)] { "slug": slug, _updatedAt }`
    ),
  ])

  const classPages: MetadataRoute.Sitemap = (classes ?? []).map((c) => ({
    url: `${baseUrl}/outdoor-classroom/${c.slug.current}`,
    lastModified: new Date(c._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const eventPages: MetadataRoute.Sitemap = (events ?? []).map((e) => ({
    url: `${baseUrl}/events/${e.slug.current}`,
    lastModified: new Date(e._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const blogPages: MetadataRoute.Sitemap = (blogPosts ?? []).map((p) => ({
    url: `${baseUrl}/blog/${p.slug.current}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...classPages, ...eventPages, ...blogPages]
}
