import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'hg1dwww9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-01',
  useCdn: true,
  stega: {
    studioUrl: '/studio',
  },
})

/**
 * Write-capable client for server-side mutations (e.g., news scraper cron job).
 * Requires SANITY_API_WRITE_TOKEN to be set in env.
 */
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'hg1dwww9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})
