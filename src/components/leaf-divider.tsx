/**
 * Decorative leaf/vine divider used between major page sections.
 * Adds warmth and personality matching the original site's garden theme.
 */
export function LeafDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-4 ${className}`} aria-hidden="true">
      <svg
        className="h-8 w-48 text-forest/20"
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
    </div>
  )
}
