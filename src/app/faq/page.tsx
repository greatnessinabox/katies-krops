import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { FAQ_ITEMS_QUERY } from '@/sanity/lib/queries'
import type { FAQ_ITEMS_QUERY_RESULT } from '@/sanity/types'
import { FaqAccordion } from '@/components/faq-accordion'

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Katie's Krops",
  description:
    "Find answers to common questions about Katie's Krops, starting a garden, volunteering, donations, and our programs.",
  openGraph: {
    title: "Frequently Asked Questions | Katie's Krops",
    description:
      "Find answers to common questions about Katie's Krops, starting a garden, volunteering, and donations.",
    url: 'https://katieskrops.com/faq',
    siteName: "Katie's Krops",
    type: 'website',
  },
}

const categoryConfig: Record<string, string> = {
  general: 'General',
  'outdoor-classroom': 'Outdoor Classroom',
  volunteering: 'Volunteering',
  donations: 'Donations',
  grants: 'Grants',
}

export default async function FaqPage() {
  const { data: faqItems } = await sanityFetch({
    query: FAQ_ITEMS_QUERY,
  })

  const items = (faqItems ?? []) as FAQ_ITEMS_QUERY_RESULT

  // Group by category
  const grouped = items.reduce<
    Record<string, FAQ_ITEMS_QUERY_RESULT>
  >((acc, item) => {
    const cat = item.category || 'general'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {})

  // Build ordered categories
  const categoryOrder = [
    'general',
    'outdoor-classroom',
    'volunteering',
    'donations',
    'grants',
  ]

  const categories = categoryOrder
    .filter((cat) => grouped[cat]?.length)
    .map((cat) => ({
      name: cat,
      label: categoryConfig[cat] || cat,
      items: grouped[cat].map((item) => ({
        _id: item._id,
        question: item.question,
        answer: item.answer,
        category: item.category,
      })),
    }))

  // Build JSON-LD FAQPage schema
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items
      .filter((item) => item.question && item.answer)
      .map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: extractPlainText(item.answer),
        },
      })),
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-forest px-4 py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-20" />
        <div className="relative mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Have questions? We have answers. Browse by category below.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          {categories.length === 0 ? (
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
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
              <h3 className="mt-4 font-display text-lg font-semibold text-stone-800">
                No FAQs yet
              </h3>
              <p className="mt-2 text-stone-500">
                Check back soon for answers to common questions.
              </p>
            </div>
          ) : (
            <FaqAccordion categories={categories} />
          )}
        </div>
      </section>
    </>
  )
}

/**
 * Extract plain text from Portable Text blocks for JSON-LD
 */
function extractPlainText(blocks: any): string {
  if (!blocks || !Array.isArray(blocks)) return ''
  return blocks
    .filter((block: any) => block._type === 'block')
    .map((block: any) =>
      (block.children ?? [])
        .map((child: any) => child.text ?? '')
        .join('')
    )
    .join(' ')
}
