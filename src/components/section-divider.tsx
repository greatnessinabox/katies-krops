/**
 * Full-width SVG section transitions.
 * Creates visual variety between page sections instead of hard color cuts.
 *
 * Variants:
 * - 'wave' — Gentle organic wave
 * - 'organic' — Hand-drawn squiggly line
 * - 'angle' — Subtle diagonal cut
 */

type DividerVariant = 'wave' | 'organic' | 'angle'

interface SectionDividerProps {
  variant?: DividerVariant
  className?: string
  fill?: string
  flip?: boolean
}

export function SectionDivider({
  variant = 'wave',
  className = '',
  fill = 'var(--color-cream)',
  flip = false,
}: SectionDividerProps) {
  return (
    <div
      className={`relative w-full leading-[0] ${flip ? 'rotate-180' : ''} ${className}`}
      aria-hidden="true"
    >
      {variant === 'wave' && <WaveSVG fill={fill} />}
      {variant === 'organic' && <OrganicSVG fill={fill} />}
      {variant === 'angle' && <AngleSVG fill={fill} />}
    </div>
  )
}

function WaveSVG({ fill }: { fill: string }) {
  return (
    <svg
      className="block h-12 w-full sm:h-16 lg:h-20"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
        fill={fill}
      />
    </svg>
  )
}

function OrganicSVG({ fill }: { fill: string }) {
  return (
    <svg
      className="block h-10 w-full sm:h-14 lg:h-16"
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,30 C120,45 180,15 300,28 C420,41 480,12 600,25 C720,38 780,8 900,22 C1020,36 1080,10 1200,26 C1320,42 1380,18 1440,30 L1440,60 L0,60 Z"
        fill={fill}
      />
    </svg>
  )
}

function AngleSVG({ fill }: { fill: string }) {
  return (
    <svg
      className="block h-8 w-full sm:h-12 lg:h-16"
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="0,60 1440,0 1440,60" fill={fill} />
    </svg>
  )
}
