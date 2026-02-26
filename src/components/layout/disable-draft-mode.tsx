'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { disableDraftMode } from './actions'

export function DisableDraftMode() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        type="button"
        onClick={() =>
          startTransition(async () => {
            await disableDraftMode()
            router.refresh()
          })
        }
        disabled={isPending}
        className="rounded-full bg-stone-800 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:bg-stone-700 disabled:opacity-50"
      >
        {isPending ? 'Disabling...' : 'Exit Draft Mode'}
      </button>
    </div>
  )
}
