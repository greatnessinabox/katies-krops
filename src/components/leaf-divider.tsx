/**
 * Decorative leaf/vine divider used between major page sections.
 * Adds warmth and personality matching the garden theme.
 *
 * Variants:
 * - 'line' (default) — Simple horizontal rule with centered leaf motif
 * - 'vine' — Full vine with leaves and center flower
 * - 'dots' — Three organic dots, minimal and modern
 */

type LeafVariant = 'vine' | 'line' | 'dots'

interface LeafDividerProps {
  className?: string
  variant?: LeafVariant
}

export function LeafDivider({ className = '', variant = 'line' }: LeafDividerProps) {
  return (
    <div
      className={`flex items-center justify-center py-6 ${className}`}
      aria-hidden="true"
    >
      {variant === 'vine' && <VineDivider />}
      {variant === 'line' && <LineDivider />}
      {variant === 'dots' && <DotsDivider />}
    </div>
  )
}

/** Simple horizontal rule with a centered leaf motif — refined and elegant */
function LineDivider() {
  return (
    <div className="flex w-full max-w-md items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-forest/25 to-forest/25" />
      <svg
        className="h-5 w-5 shrink-0 text-forest/40"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10 2C10 2 4 7 4 12c0 2.5 2.5 5 6 6 3.5-1 6-3.5 6-6C16 7 10 2 10 2zm0 13c-1.5-.5-3-2-3-3.5C7 9 9 5.5 10 4c1 1.5 3 5 3 7.5 0 1.5-1.5 3-3 3.5z" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-forest/25 to-forest/25" />
    </div>
  )
}

/** Three organic dots — minimal and modern */
function DotsDivider() {
  return (
    <div className="flex items-center gap-3">
      <span className="h-1.5 w-1.5 rounded-full bg-sage" />
      <span className="h-2 w-2 rounded-full bg-forest/40" />
      <span className="h-1.5 w-1.5 rounded-full bg-sage" />
    </div>
  )
}

/** Full vine SVG with leaves and center flower — for special moments */
function VineDivider() {
  return (
    <svg
      className="h-10 w-64 text-forest/40"
      viewBox="0 0 200 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left vine */}
      <path
        d="M10 16 C30 16, 40 10, 60 14 C70 16, 75 12, 85 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Left leaves */}
      <path
        d="M30 14 C28 8, 35 6, 38 12"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <path
        d="M55 12 C52 6, 60 5, 62 11"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.3"
      />
      {/* Center flower/sprout */}
      <circle cx="100" cy="16" r="3" fill="currentColor" fillOpacity="0.4" />
      <path
        d="M100 13 C98 7, 102 7, 100 13"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <path
        d="M97 14 C91 11, 93 8, 97 14"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <path
        d="M103 14 C109 11, 107 8, 103 14"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.3"
      />
      {/* Right vine */}
      <path
        d="M115 16 C125 12, 130 16, 140 14 C160 10, 170 16, 190 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Right leaves */}
      <path
        d="M138 12 C140 6, 145 5, 142 11"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <path
        d="M165 14 C162 8, 170 6, 170 12"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.3"
      />
    </svg>
  )
}
