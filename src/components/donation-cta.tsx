interface DonationCtaProps {
  url: string
  compact?: boolean
}

export function DonationCta({ url, compact = false }: DonationCtaProps) {
  if (compact) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-terracotta-dark"
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
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        Donate
      </a>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta/10">
          <svg
            className="h-5 w-5 text-terracotta"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </div>
        <h3 className="font-display text-lg font-semibold text-stone-900">
          Support Our Mission
        </h3>
      </div>
      <p className="mb-4 text-sm text-stone-600">
        Your donation helps us grow healthy food and share it with those in need
        in our community.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-terracotta-dark"
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
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        Make a Donation
      </a>
      <p className="mt-3 text-center text-xs text-stone-400">
        You&apos;ll be taken to our secure payment portal &mdash; CharityProud
      </p>
    </div>
  )
}
