import type { ReactNode } from 'react'

type HeroVariant = 'forest' | 'warm' | 'split' | 'minimal'
type AccentColor = 'sun' | 'terracotta' | 'leaf' | 'sky'

interface HeroSectionProps {
  variant?: HeroVariant
  kicker?: string
  title: string
  highlight?: string
  subtitle?: string
  accentColor?: AccentColor
  actions?: ReactNode
  children?: ReactNode
}

const accentColorMap: Record<AccentColor, string> = {
  sun: 'text-sun',
  terracotta: 'text-terracotta-light',
  leaf: 'text-leaf',
  sky: 'text-sky',
}

/**
 * Shared hero section component with 4 visual variants.
 * Replaces the copy-pasted forest hero across 17+ pages with a
 * consistent but visually diverse hero system.
 */
export function HeroSection({
  variant = 'forest',
  kicker,
  title,
  highlight,
  subtitle,
  accentColor = 'sun',
  actions,
  children,
}: HeroSectionProps) {
  const highlightClass = accentColorMap[accentColor]

  // Build title with optional highlighted word
  const titleContent = highlight ? (
    <>
      {title.split(highlight).map((part, i, arr) => (
        <span key={i}>
          {part}
          {i < arr.length - 1 && (
            <span className={highlightClass}>{highlight}</span>
          )}
        </span>
      ))}
    </>
  ) : (
    title
  )

  if (variant === 'forest') {
    return (
      <section className="texture-grain relative overflow-hidden bg-forest px-4 py-28 sm:py-36 lg:py-44">
        {/* Layered gradient mesh for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-forest-light)_0%,_transparent_40%)] opacity-15" />
        {/* Botanical accent — positioned decorative element */}
        <svg
          className="absolute right-0 top-1/2 hidden h-72 w-72 -translate-y-1/2 text-leaf/10 lg:block xl:h-96 xl:w-96"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M100 20 C100 20 40 60 40 120 C40 160 65 185 100 190 C135 185 160 160 160 120 C160 60 100 20 100 20Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <path
            d="M100 20 C100 20 100 190 100 190"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          <path
            d="M100 60 C80 50 60 55 50 70"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <path
            d="M100 90 C120 80 140 85 150 100"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <path
            d="M100 120 C80 110 60 115 50 130"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
        </svg>
        <div className="relative z-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-3xl lg:max-w-4xl">
            {kicker && (
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-sage-light">
                {kicker}
              </p>
            )}
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              {titleContent}
            </h1>
            {subtitle && (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
                {subtitle}
              </p>
            )}
            {actions && (
              <div className="mt-10 flex flex-wrap items-center gap-4">
                {actions}
              </div>
            )}
          </div>
        </div>
        {children}
      </section>
    )
  }

  if (variant === 'warm') {
    return (
      <section className="texture-paper relative overflow-hidden bg-cream px-4 py-24 sm:py-32">
        <div className="relative z-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {kicker && (
              <p className="kicker mb-4">{kicker}</p>
            )}
            <h1 className="font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              {titleContent}
            </h1>
            {subtitle && (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-600">
                {subtitle}
              </p>
            )}
            {actions && (
              <div className="mt-10 flex flex-wrap items-center gap-4">
                {actions}
              </div>
            )}
          </div>
        </div>
        {children}
      </section>
    )
  }

  if (variant === 'split') {
    return (
      <section className="relative overflow-hidden bg-forest px-4 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-leaf)_0%,_transparent_50%)] opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              {kicker && (
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-sage-light">
                  {kicker}
                </p>
              )}
              <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {titleContent}
              </h1>
              {subtitle && (
                <p className="mt-6 text-lg leading-relaxed text-white/80">
                  {subtitle}
                </p>
              )}
              {actions && (
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  {actions}
                </div>
              )}
            </div>
            {children && (
              <div className="flex justify-center lg:justify-end">
                {children}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // minimal variant
  return (
    <section className="border-b border-border bg-white px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {kicker && (
          <p className="kicker mb-3">{kicker}</p>
        )}
        <h1 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
          {titleContent}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-stone-600">
            {subtitle}
          </p>
        )}
        {actions && (
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {actions}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
