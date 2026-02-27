/**
 * Canonical site URL used for SEO metadata, sitemaps, and robots.txt.
 *
 * IMPORTANT: For SEO-critical outputs (sitemap.xml, robots.txt, canonical URLs,
 * og:image), we always use the canonical production domain — never a Vercel
 * preview URL. NEXT_PUBLIC_SITE_URL is provided as an escape hatch for local
 * development or staging overrides, but the fallback is the real domain.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://katieskrops.com'
