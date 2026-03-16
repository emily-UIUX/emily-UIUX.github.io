'use client'

import { useEffect, useRef } from 'react'
import { useFeedStore } from '@/stores/feedStore'
import { Platform } from '@/types/common'
import { POLL_INTERVAL_MS, PLATFORM_ORDER } from '@/lib/constants'

export function useRealTimeUpdates() {
  const addItems = useFeedStore((s) => s.addItems)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(async () => {
      try {
        const randomPlatform =
          PLATFORM_ORDER[Math.floor(Math.random() * PLATFORM_ORDER.length)]

        const { getFeedService } = await import('@/services/feedService')
        const service = getFeedService()
        const newItem = await service.generateNewItem(randomPlatform)
        addItems([newItem])
      } catch (err) {
        console.error('Real-time update failed:', err)
      }
    }, POLL_INTERVAL_MS)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [addItems])
}
