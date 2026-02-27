import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { formatDate, formatTime, formatPrice } from '@/lib/utils'
import { AddToCalendar } from './add-to-calendar'
import type { OUTDOOR_CLASSES_QUERY_RESULT } from '@/sanity/types'

type ClassCardProps = OUTDOOR_CLASSES_QUERY_RESULT[number]

const statusColors: Record<string, string> = {
  upcoming: 'bg-forest/10 text-forest',
  full: 'bg-terracotta/10 text-terracotta',
  waitlist: 'bg-sun/20 text-soil',
  cancelled: 'bg-stone-200 text-stone-500',
}

export function ClassCard({ ...cls }: ClassCardProps) {
  const slug = cls.slug?.current
  if (!slug) return null

  const title = cls.title ?? 'Untitled Class'
  const date = cls.date ?? ''
  const imageUrl = cls.image?.asset
    ? urlFor(cls.image).width(600).height(400).url()
    : null
  const lqip = cls.image?.asset?.metadata?.lqip

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:shadow-md">
      {/* Image */}
      <Link
        href={`/outdoor-classroom/${slug}`}
        className="relative aspect-[3/2] overflow-hidden bg-sage-light/30"
        aria-label={`View ${title}`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={cls.image?.alt ?? title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            {...(lqip ? { placeholder: 'blur' as const, blurDataURL: lqip } : {})}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-sage-light/30">
            <svg className="h-12 w-12 text-sage" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25a1.5 1.5 0 001.5 1.5z" />
            </svg>
          </div>
        )}

        {/* Status Badge */}
        {cls.status && cls.status !== 'upcoming' && (
          <span
            className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${
              statusColors[cls.status] || 'bg-stone-100 text-stone-600'
            }`}
          >
            {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Category + Age */}
        <div className="flex flex-wrap gap-2">
          {cls.category && (
            <span className="rounded-full bg-sage-light/40 px-2.5 py-0.5 text-xs font-medium text-forest-dark">
              {cls.category}
            </span>
          )}
          {cls.ageGroup && (
            <span className="rounded-full bg-sky/20 px-2.5 py-0.5 text-xs font-medium text-forest-dark">
              {cls.ageGroup}
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/outdoor-classroom/${slug}`}>
          <h3 className="font-display text-lg font-semibold leading-tight text-stone-900 transition-colors group-hover:text-forest">
            {title}
          </h3>
        </Link>

        {/* Date & Time */}
        {date && (
          <p className="text-sm text-stone-600">
            {formatDate(date)}
            {cls.endTime && (
              <>
                <br />
                {formatTime(date)} – {formatTime(cls.endTime)}
              </>
            )}
          </p>
        )}

        {/* Instructor */}
        {cls.instructor && (
          <p className="text-sm text-stone-500">
            with <span className="font-medium text-stone-700">{cls.instructor.name}</span>
          </p>
        )}

        {/* Price */}
        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="text-lg font-bold text-forest">
            {formatPrice(cls.price ?? 0)}
          </span>
          {cls.scholarshipAvailable && (
            <span className="rounded bg-sun/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-soil">
              Scholarship
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 border-t border-border pt-3">
          {cls.status === 'waitlist' ? (
            <Link
              href={`/outdoor-classroom/${slug}#waitlist`}
              className="flex-1 rounded-full bg-sun/80 px-4 py-2.5 text-center text-sm font-semibold text-soil shadow-sm transition-all hover:bg-sun"
            >
              Join Waitlist
            </Link>
          ) : cls.status !== 'full' && cls.status !== 'cancelled' ? (
            cls.registrationUrl ? (
              <a
                href={cls.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full bg-terracotta px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-terracotta-dark"
              >
                Register
              </a>
            ) : (
              <Link
                href={`/outdoor-classroom/${slug}`}
                className="flex-1 rounded-full bg-terracotta px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-terracotta-dark"
              >
                View Details
              </Link>
            )
          ) : null}
          <AddToCalendar
            title={title}
            startDate={date}
            endDate={cls.endTime ?? undefined}
            location={
              cls.location
                ? [cls.location.name, cls.location.address].filter(Boolean).join(', ')
                : undefined
            }
          />
        </div>
      </div>
    </article>
  )
}
