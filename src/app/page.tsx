'use client'

import { useEffect } from 'react'
import { useFeedStore, FEED_DATA_VERSION } from '@/stores/feedStore'
import { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates'
import { MasonryGrid } from '@/components/layout/MasonryGrid'
import { SearchBar } from '@/components/layout/SearchBar'
import { FilterTabs } from '@/components/layout/FilterTabs'

export default function Home() {
  const addItems = useFeedStore((s) => s.addItems)
  const items = useFeedStore((s) => s.items)
  const dataVersion = useFeedStore((s) => s.dataVersion)
  const clearItems = useFeedStore((s) => s.clearItems)

  useEffect(() => {
    const needsRefresh = dataVersion !== FEED_DATA_VERSION || Object.keys(items).length === 0

    if (!needsRefresh) return

    // Clear stale data if version mismatch
    if (dataVersion !== FEED_DATA_VERSION && Object.keys(items).length > 0) {
      clearItems()
    }

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
  }, [addItems, items, dataVersion, clearItems])

  // Real-time updates
  useRealTimeUpdates()

  return (
    <div className="container mx-auto">
      <div className="px-4 pt-5 pb-2 space-y-3">
        <SearchBar />
        <FilterTabs />
      </div>
      <MasonryGrid />
    </div>
  )
}
