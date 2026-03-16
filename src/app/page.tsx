'use client'

import { useEffect } from 'react'
import { useFeedStore } from '@/stores/feedStore'
import { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates'
import { MasonryGrid } from '@/components/layout/MasonryGrid'

export default function Home() {
  const addItems = useFeedStore((s) => s.addItems)
  const items = useFeedStore((s) => s.items)

  // Initial data fetch
  useEffect(() => {
    if (Object.keys(items).length > 0) return

    async function fetchInitial() {
      try {
        const res = await fetch('/api/feed')
        if (res.ok) {
          const data = await res.json()
          addItems(data)
        }
      } catch (err) {
        console.error('Failed to fetch initial feed:', err)
      }
    }
    fetchInitial()
  }, [addItems, items])

  // Real-time updates
  useRealTimeUpdates()

  return (
    <div className="container mx-auto">
      <MasonryGrid />
    </div>
  )
}
