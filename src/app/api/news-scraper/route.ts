import { NextResponse } from 'next/server'
import { client, writeClient } from '@/sanity/lib/client'

const CRON_SECRET = process.env.CRON_SECRET

interface ParsedArticle {
  title: string
  url: string
  source: string
  publishedAt: string
  excerpt: string
}

/**
 * GET /api/news-scraper
 *
 * Cron-triggered endpoint that searches Google News RSS for recent
 * mentions of "Katie's Krops" or "Katie Stagliano", deduplicates
 * against existing Sanity newsItem documents, and creates new ones.
 *
 * Protected by CRON_SECRET bearer token.
 */
export async function GET(request: Request) {
  // ── Auth ────────────────────────────────────────────────────────
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // ── 1. Fetch Google News RSS feeds ──────────────────────────
    const searchTerms = [
      'Katie%27s+Krops',
      'Katie+Stagliano+garden',
    ]

    const allArticles: ParsedArticle[] = []

    for (const term of searchTerms) {
      const rssUrl = `https://news.google.com/rss/search?q=${term}&hl=en-US&gl=US&ceid=US:en`

      const response = await fetch(rssUrl, {
        next: { revalidate: 0 },
        headers: { 'User-Agent': 'KatiesKrops-NewsScraper/1.0' },
      })

      if (!response.ok) {
        console.warn(`RSS fetch failed for term "${term}": ${response.status}`)
        continue
      }

      const xml = await response.text()

      // ── 2. Parse RSS XML with regex (no external deps) ──────
      const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || []

      for (const item of items) {
        const title =
          item.match(/<title>(.*?)<\/title>/)?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, '') ?? ''
        const link =
          item.match(/<link>(.*?)<\/link>/)?.[1] ??
          item.match(/<link\/>\s*(.*?)\s*<guid/)?.[1] ??
          ''
        const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? ''
        const source =
          item
            .match(/<source.*?>(.*?)<\/source>/)?.[1]
            ?.replace(/<!\[CDATA\[|\]\]>/g, '') ?? ''
        const description =
          item
            .match(/<description>(.*?)<\/description>/)?.[1]
            ?.replace(/<!\[CDATA\[|\]\]>/g, '')
            .replace(/<[^>]*>/g, '') ?? ''

        if (title && link) {
          allArticles.push({
            title: title.trim(),
            url: link.trim(),
            source: source.trim() || 'News',
            publishedAt: pubDate
              ? new Date(pubDate).toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0],
            excerpt: description.trim().slice(0, 300),
          })
        }
      }
    }

    // ── 3. Deduplicate within this batch by URL ─────────────────
    const uniqueArticles = allArticles.filter(
      (article, index, self) => index === self.findIndex((a) => a.url === article.url),
    )

    // ── 4. Check existing Sanity newsItems to skip duplicates ───
    const existingUrls = await client.fetch<string[]>(
      `*[_type == "newsItem" && defined(url)].url`,
    )
    const existingUrlSet = new Set(existingUrls)

    const newArticles = uniqueArticles.filter((a) => !existingUrlSet.has(a.url))

    // ── 5. Create new newsItem documents (max 5 per run) ────────
    const created: string[] = []

    for (const article of newArticles.slice(0, 5)) {
      const doc = await writeClient.create({
        _type: 'newsItem',
        title: article.title,
        url: article.url,
        source: article.source,
        publishedAt: article.publishedAt,
        excerpt: article.excerpt,
      })
      created.push(doc._id)
    }

    // ── 6. Return summary ───────────────────────────────────────
    return NextResponse.json({
      success: true,
      found: uniqueArticles.length,
      new: newArticles.length,
      created: created.length,
      createdIds: created,
    })
  } catch (error) {
    console.error('News scraper error:', error)
    return NextResponse.json(
      {
        error: 'Scraper failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
