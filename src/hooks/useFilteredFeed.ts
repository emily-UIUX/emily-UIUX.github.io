'use client'

import { useMemo } from 'react'
import { useFeedStore } from '@/stores/feedStore'
import { useUIStore } from '@/stores/uiStore'
import { Platform, FilterTab } from '@/types/common'
import { FeedItem } from '@/types/feed'
import { PAST_THRESHOLD_DAYS, PLATFORM_ORDER } from '@/lib/constants'

function getAccountName(item: FeedItem): string {
  switch (item.platform) {
    case Platform.YOUTUBE:
      return item.channelName
    case Platform.INSTAGRAM:
      return item.accountName
    case Platform.THREADS:
      return item.accountName
    case Platform.NAVER_EXHIBITION:
      return item.venue
    case Platform.NAVER_SECURITIES:
      return item.source
    default:
      return ''
  }
}

export function useFilteredFeed(): Record<Platform, FeedItem[]> {
  const items = useFeedStore((s) => s.items)
  const seenIds = useFeedStore((s) => s.seenIds)
  const searchQuery = useUIStore((s) => s.searchQuery)
  const activeFilter = useUIStore((s) => s.activeFilter)

  return useMemo(() => {
    const allItems = Object.values(items)
    const now = Date.now()
    const pastThreshold = now - PAST_THRESHOLD_DAYS * 24 * 60 * 60 * 1000

    let filtered = allItems

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter((item) => {
        const fields = [item.title, ...item.tags, getAccountName(item)]
        return fields.some((f) => f.toLowerCase().includes(q))
      })
    }

    // Tab filter
    filtered = filtered.filter((item) => {
      const isSeen = seenIds.includes(item.id)
      const itemTime = new Date(item.timestamp).getTime()

      switch (activeFilter) {
        case FilterTab.NEW:
          return !isSeen && itemTime > pastThreshold
        case FilterTab.SEEN:
          return isSeen
        case FilterTab.PAST:
          return itemTime <= pastThreshold
        default:
          return true
      }
    })

    // Group by platform
    const grouped: Record<Platform, FeedItem[]> = {
      [Platform.YOUTUBE]: [],
      [Platform.NAVER_EXHIBITION]: [],
      [Platform.NAVER_SECURITIES]: [],
      [Platform.THREADS]: [],
      [Platform.INSTAGRAM]: [],
    }

    for (const item of filtered) {
      grouped[item.platform].push(item)
    }

    // Sort each group by timestamp desc
    for (const platform of PLATFORM_ORDER) {
      grouped[platform].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
    }

    return grouped
  }, [items, seenIds, searchQuery, activeFilter])
}
