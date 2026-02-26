'use client'

import { useState, useTransition } from 'react'

interface WaitlistFormProps {
  classTitle: string
}

export function WaitlistForm({ classTitle }: WaitlistFormProps) {
  const [isPending, startTransition] = useTransition()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    startTransition(async () => {
      try {
        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            classTitle,
          }),
        })
        if (!res.ok) throw new Error('Failed to submit')
        setSubmitted(true)
        setError(null)
      } catch {
        setError('Something went wrong. Please try again.')
      }
    })
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-forest/20 bg-forest/5 p-4 text-center">
        <svg
          className="mx-auto h-8 w-8 text-forest"
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
        <p className="mt-2 font-semibold text-forest">
          You&apos;re on the list!
        </p>
        <p className="mt-1 text-sm text-stone-600">
          We&apos;ll email you if a spot opens up.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm font-medium text-stone-700">
        Join the waitlist for this class:
      </p>

      <div>
        <label htmlFor="waitlist-name" className="sr-only">
          Name
        </label>
        <input
          id="waitlist-name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-stone-700 transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20"
        />
      </div>

      <div>
        <label htmlFor="waitlist-email" className="sr-only">
          Email
        </label>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          required
          placeholder="Your email"
          inputMode="email"
          className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-stone-700 transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20"
        />
      </div>

      <div>
        <label htmlFor="waitlist-phone" className="sr-only">
          Phone (optional)
        </label>
        <input
          id="waitlist-phone"
          name="phone"
          type="tel"
          placeholder="Phone (optional)"
          inputMode="tel"
          className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-stone-700 transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20"
        />
      </div>

      {error && (
        <p className="text-sm text-terracotta" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-sun/80 px-4 py-3 font-semibold text-soil shadow-sm transition-all hover:bg-sun disabled:opacity-50"
      >
        {isPending ? 'Joining...' : 'Join Waitlist'}
      </button>

      <p className="text-center text-xs text-stone-400">
        We&apos;ll only contact you about this class.
      </p>
    </form>
  )
}
