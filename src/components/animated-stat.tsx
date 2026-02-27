'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedStatProps {
  value: string
  label: string
  delay?: number
}

/**
 * Scroll-triggered animated stat counter.
 * Parses numeric portion from strings like "100+", "500,000+", "30+"
 * and counts up when visible. Uses IntersectionObserver for trigger.
 */
export function AnimatedStat({ value, label, delay = 0 }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState(value)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      hasAnimated.current = true
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          animateValue()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function animateValue() {
    // Parse: "500,000+" → prefix="", number=500000, suffix="+"
    // Parse: "100+" → prefix="", number=100, suffix="+"
    // Parse: "$1.2M" → prefix="$", number=1.2, suffix="M"
    const match = value.match(/^([^0-9]*)([0-9][0-9,.]*)(.*)$/)
    if (!match) return

    const prefix = match[1]
    const numStr = match[2]
    const suffix = match[3]
    const hasCommas = numStr.includes(',')
    const target = parseFloat(numStr.replace(/,/g, ''))

    if (isNaN(target)) return

    const duration = 1200 // ms
    const startTime = performance.now() + delay
    const formatter = hasCommas
      ? new Intl.NumberFormat('en-US')
      : null

    function step(now: number) {
      const elapsed = now - startTime
      if (elapsed < 0) {
        setDisplay(`${prefix}0${suffix}`)
        requestAnimationFrame(step)
        return
      }

      // Ease-out cubic for organic deceleration
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * target

      if (progress < 1) {
        const rounded = target >= 100
          ? Math.round(current)
          : Math.round(current * 10) / 10
        const formatted = formatter ? formatter.format(rounded) : String(rounded)
        setDisplay(`${prefix}${formatted}${suffix}`)
        requestAnimationFrame(step)
      } else {
        setDisplay(value) // Snap to exact original value
      }
    }

    requestAnimationFrame(step)
  }

  return (
    <div ref={ref} className="text-center">
      <p className="stat-hero text-white">{display}</p>
      <p className="mt-3 text-sm font-medium tracking-wide text-sage-light/80">
        {label}
      </p>
    </div>
  )
}
