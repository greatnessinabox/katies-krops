'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface GrowerCardProps {
  name: string | null
  gardenName: string | null
  location: string | null
  story: string | null
  imgSrc: string | null
  imgAlt: string
  lqip: string | null
  index: number
}

export function GrowerCard({
  name,
  gardenName,
  location,
  story,
  imgSrc,
  imgAlt,
  lqip,
  index,
}: GrowerCardProps) {
  const [expanded, setExpanded] = useState(false)
  const storyRef = useRef<HTMLDivElement>(null)
  const [needsExpand, setNeedsExpand] = useState(false)

  // Check if text is actually clamped (overflowing)
  useEffect(() => {
    const el = storyRef.current
    if (el && story) {
      // scrollHeight > clientHeight means the text is clamped
      setNeedsExpand(el.scrollHeight > el.clientHeight + 2)
    }
  }, [story])

  return (
    <div
      className="card-lifted animate-fade-up overflow-hidden"
      style={{ '--delay': `${index * 80}ms` } as React.CSSProperties}
    >
      {imgSrc ? (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            {...(lqip
              ? { placeholder: 'blur' as const, blurDataURL: lqip }
              : {})}
          />
        </div>
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center bg-sage-light/20">
          <svg
            className="h-12 w-12 text-sage/50"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            />
          </svg>
        </div>
      )}
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-stone-900">{name}</h3>
        {gardenName && (
          <p className="mt-1 text-sm font-medium text-forest">{gardenName}</p>
        )}
        {location && (
          <p className="mt-1 flex items-center gap-1 text-sm text-stone-500">
            <svg
              className="h-3.5 w-3.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            {location}
          </p>
        )}
        {story && (
          <>
            <div
              ref={storyRef}
              className={`mt-3 text-sm leading-relaxed text-stone-600 transition-all duration-300 ease-out ${
                expanded ? '' : 'line-clamp-3'
              }`}
            >
              {story}
            </div>
            {needsExpand && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-2 text-sm font-semibold text-forest transition-colors hover:text-forest-dark"
              >
                {expanded ? 'Show Less' : 'Read More'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
