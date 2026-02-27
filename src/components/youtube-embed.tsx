'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'

interface YouTubeEmbedProps {
  videoId: string
  title?: string
  className?: string
}

/**
 * Thumbnail-first YouTube embed.
 * Shows a styled thumbnail with play button overlay, loads iframe on click.
 * Better CLS, faster page load, and more visually appealing than a raw iframe.
 */
export function YouTubeEmbed({
  videoId,
  title = 'Video',
  className = '',
}: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
  }, [])

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-stone-900/5 ${className}`}
    >
      <div className="relative aspect-video bg-stone-900">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex cursor-pointer items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-light focus-visible:ring-offset-2"
            aria-label={`Play ${title}`}
          >
            {/* Thumbnail */}
            <Image
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={`${title} thumbnail`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px"
              priority={false}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/20 to-transparent transition-opacity group-hover:opacity-90" />

            {/* Play button */}
            <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-terracotta shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-terracotta-dark sm:h-24 sm:w-24">
              <svg
                className="ml-1.5 h-8 w-8 text-white sm:h-10 sm:w-10"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="font-display text-lg font-semibold text-white drop-shadow-lg sm:text-xl">
                {title}
              </p>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}
