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
        const { getFeedService } = await import('@/services/feedService')
        const service = getFeedService()
        const data = await service.getItems({})
        addItems(data)
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
