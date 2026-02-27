import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description:
    "Browse photos from Katie's Krops gardens, outdoor classes, community dinners, and events. Moments of growing, learning, and giving back.",
  robots: { index: true, follow: true },
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: "Photo Gallery | Katie's Krops",
    description:
      "Photos from our gardens, outdoor classes, community dinners, and events at Katie's Krops.",
    url: 'https://katieskrops.com/gallery',
    siteName: "Katie's Krops",
    type: 'website',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: "Katie's Krops — Growing for the Greater Good" }],
  },
}

const placeholderCategories = [
  'Gardens',
  'Community Dinners',
  'Outdoor Classroom',
  'Events',
]

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest px-4 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-20" />
        <div className="relative mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            <span className="text-sun">Gallery</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Moments from our gardens, classes, and community.
          </p>
        </div>
      </section>

      {/* Category Pills */}
      <section className="border-b border-border px-4 py-6">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-forest px-4 py-1.5 text-sm font-medium text-white">
              All
            </span>
            {placeholderCategories.map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-sage-light/50 px-4 py-1.5 text-sm font-medium text-forest"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid Placeholder */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Masonry-style grid using CSS columns */}
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
            {/* Placeholder cards with varying heights to simulate masonry */}
            {[
              'h-64',
              'h-48',
              'h-72',
              'h-56',
              'h-64',
              'h-80',
              'h-48',
              'h-64',
              'h-56',
              'h-72',
              'h-48',
              'h-64',
            ].map((height, i) => (
              <div
                key={i}
                className={`mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-white shadow-sm ${height}`}
              >
                <div className="flex h-full flex-col items-center justify-center bg-sage-light/20 p-6">
                  <svg
                    className="h-10 w-10 text-sage"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v13.5a1.5 1.5 0 001.5 1.5z"
                    />
                  </svg>
                  <p className="mt-3 text-xs text-stone-400">Photo {i + 1}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Coming soon notice */}
          <div className="mt-12 rounded-2xl border border-sun/30 bg-sun/10 p-8 text-center">
            <h2 className="font-display text-xl font-semibold text-soil">
              More Photos Coming Soon
            </h2>
            <p className="mt-2 text-stone-600">
              We&apos;re working on adding our full photo collection. Check back
              soon for pictures from our gardens, classes, dinners, and events.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
