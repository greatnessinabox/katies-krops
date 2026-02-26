'use client'

import { useState } from 'react'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Server action will be added later
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-stone-900"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          className="mt-2 block w-full rounded-xl border border-border bg-white px-4 py-3 text-stone-900 shadow-sm placeholder:text-stone-400 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-stone-900"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="mt-2 block w-full rounded-xl border border-border bg-white px-4 py-3 text-stone-900 shadow-sm placeholder:text-stone-400 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-stone-900"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="How can we help you?"
          className="mt-2 block w-full rounded-xl border border-border bg-white px-4 py-3 text-stone-900 shadow-sm placeholder:text-stone-400 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-full bg-terracotta px-8 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-terracotta-dark hover:shadow-md sm:w-auto"
      >
        Send Message
      </button>
    </form>
  )
}
