'use client'

import { useTransition, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const ageGroups = [
  { label: 'All Ages', value: 'all' },
  { label: 'K-2', value: 'K-2' },
  { label: '3-5', value: '3-5' },
  { label: 'All Ages', value: 'All Ages' },
  { label: 'Adults', value: 'Adults' },
]

const categories = [
  { label: 'All Topics', value: 'all' },
  { label: 'Nature', value: 'Nature' },
  { label: 'Cooking', value: 'Cooking' },
  { label: 'Art', value: 'Art' },
  { label: 'Literacy', value: 'Literacy' },
  { label: 'Gardening', value: 'Gardening' },
  { label: 'Wildlife', value: 'Wildlife' },
]

export function ClassFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentAgeGroup = searchParams.get('ageGroup') || 'all'
  const currentCategory = searchParams.get('category') || 'all'

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === 'all') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
      startTransition(() => {
        router.push(`/outdoor-classroom?${params.toString()}`, { scroll: false })
      })
    },
    [router, searchParams, startTransition]
  )

  return (
    <div className="space-y-4" role="search" aria-label="Filter classes">
      {/* Age Group Pills */}
      <div>
        <span className="mb-2 block text-sm font-medium text-stone-600">Age Group</span>
        <div className="flex flex-wrap gap-2">
          {ageGroups.map((group) => (
            <button
              key={group.value}
              onClick={() => updateFilter('ageGroup', group.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                currentAgeGroup === group.value
                  ? 'bg-forest text-white shadow-sm'
                  : 'bg-white text-stone-600 ring-1 ring-border hover:bg-sage-light/30 hover:text-forest-dark'
              }`}
              aria-pressed={currentAgeGroup === group.value}
            >
              {group.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Dropdown */}
      <div>
        <label htmlFor="category-filter" className="mb-2 block text-sm font-medium text-stone-600">
          Topic
        </label>
        <select
          id="category-filter"
          value={currentCategory}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-stone-700 transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20 sm:w-auto"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Pending indicator */}
      {isPending && (
        <div className="text-sm text-stone-400" aria-live="polite">
          Filtering...
        </div>
      )}
    </div>
  )
}
