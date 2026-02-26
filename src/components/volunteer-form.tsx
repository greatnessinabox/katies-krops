'use client'

import { useState } from 'react'

export function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-forest/20 bg-forest/5 p-6 text-center">
        <svg
          className="mx-auto h-10 w-10 text-forest"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-3 font-display text-lg font-semibold text-forest">
          Thank you for signing up!
        </h3>
        <p className="mt-2 text-sm text-stone-600">
          We&apos;ll be in touch with upcoming volunteer opportunities.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="volunteer-name"
          className="mb-1.5 block text-sm font-medium text-stone-700"
        >
          Name <span className="text-terracotta">*</span>
        </label>
        <input
          id="volunteer-name"
          name="name"
          type="text"
          required
          placeholder="Your full name"
          className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-stone-700 transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20"
        />
      </div>

      <div>
        <label
          htmlFor="volunteer-email"
          className="mb-1.5 block text-sm font-medium text-stone-700"
        >
          Email <span className="text-terracotta">*</span>
        </label>
        <input
          id="volunteer-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          inputMode="email"
          className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-stone-700 transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20"
        />
      </div>

      <fieldset>
        <legend className="mb-1.5 block text-sm font-medium text-stone-700">
          Availability <span className="text-terracotta">*</span>
        </legend>
        <div className="flex flex-wrap gap-4">
          {['Weekdays', 'Weekends', 'Either'].map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-sm text-stone-700"
            >
              <input
                type="checkbox"
                name="availability"
                value={option}
                className="h-4 w-4 rounded border-border text-forest focus:ring-forest/20"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label
          htmlFor="volunteer-notes"
          className="mb-1.5 block text-sm font-medium text-stone-700"
        >
          Notes <span className="text-stone-400">(optional)</span>
        </label>
        <textarea
          id="volunteer-notes"
          name="notes"
          rows={4}
          placeholder="Tell us a little about yourself or any questions you have..."
          className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-stone-700 transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-terracotta px-8 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-terracotta-dark sm:w-auto"
      >
        Sign Up to Volunteer
      </button>

      <p className="text-sm text-stone-500">
        No commitment required &mdash; we&apos;ll notify you of upcoming
        opportunities.
      </p>
    </form>
  )
}
