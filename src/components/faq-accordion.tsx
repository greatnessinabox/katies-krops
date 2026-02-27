'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { PortableText } from '@/components/portable-text'

interface FaqItem {
  _id: string
  question: string | null
  answer: any
  category: string | null
}

interface FaqCategory {
  name: string
  label: string
  items: FaqItem[]
}

interface FaqAccordionProps {
  categories: FaqCategory[]
}

export function FaqAccordion({ categories }: FaqAccordionProps) {
  const [openItems, setOpenItems] = useState<Record<string, string | null>>({})

  const toggleItem = useCallback(
    (category: string, itemId: string) => {
      setOpenItems((prev) => ({
        ...prev,
        [category]: prev[category] === itemId ? null : itemId,
      }))
    },
    []
  )

  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <section key={category.name}>
          <div className="mb-6 flex items-center gap-3">
            <svg
              className="h-6 w-6 text-forest"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
              />
            </svg>
            <h2 className="font-display text-2xl font-bold text-stone-900">
              {category.label}
            </h2>
          </div>
          <div className="space-y-3">
            {category.items.map((item, index) => (
              <AccordionItem
                key={item._id}
                item={item}
                index={index}
                isOpen={openItems[category.name] === item._id}
                onToggle={() => toggleItem(category.name, item._id)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  const panelId = `faq-panel-${item._id}`
  const buttonId = `faq-button-${item._id}`

  // Alternating green / gold accent
  const isEven = index % 2 === 0
  const accentBorder = isEven ? 'border-l-forest' : 'border-l-sun'
  const hoverBg = isEven ? 'hover:bg-forest/5' : 'hover:bg-sun/5'
  const iconColor = isEven ? 'text-forest' : 'text-sun-dark'

  return (
    <div
      className={`overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md ${
        isOpen ? `border-l-4 ${accentBorder}` : ''
      }`}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors ${hoverBg}`}
        >
          <span className="font-display text-base font-semibold text-stone-900 sm:text-lg">
            {item.question}
          </span>
          {/* Plus / Minus icon */}
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
              isOpen
                ? `${isEven ? 'bg-forest' : 'bg-sun'} text-white`
                : `${isEven ? 'bg-forest/10' : 'bg-sun/10'} ${iconColor}`
            }`}
            aria-hidden="true"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
              )}
            </svg>
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        style={{ height }}
        className={`overflow-hidden transition-[height] duration-200 ${isOpen ? 'ease-out' : 'ease-in'}`}
      >
        <div ref={contentRef} className="px-6 pb-6">
          <div className="prose prose-stone max-w-none text-stone-600 prose-p:leading-relaxed">
            {item.answer ? (
              typeof item.answer === 'string' ? (
                <p>{item.answer}</p>
              ) : Array.isArray(item.answer) ? (
                <PortableText value={item.answer} />
              ) : (
                <p>No answer provided yet.</p>
              )
            ) : (
              <p>No answer provided yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
