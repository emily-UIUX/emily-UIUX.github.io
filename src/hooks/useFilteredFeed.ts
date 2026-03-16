'use client'

import { useMemo } from 'react'
import { useFeedStore } from '@/stores/feedStore'
import { useUIStore } from '@/stores/uiStore'
import { useSettingsStore } from '@/stores/settingsStore'
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

function matchesSubscription(item: FeedItem, channels: string[], keywords: string[]): boolean {
  // If no subscriptions at all for this platform, show everything
  if (channels.length === 0 && keywords.length === 0) return true

  const accountName = getAccountName(item).toLowerCase()
  const title = item.title.toLowerCase()
  const tags = item.tags.map((t) => t.toLowerCase())

  // Check channel match
  if (channels.length > 0) {
    const matchesChannel = channels.some((ch) => accountName.includes(ch.toLowerCase()))
    if (matchesChannel) return true
  }

  // Check keyword match
  if (keywords.length > 0) {
    const allText = [title, ...tags, accountName].join(' ')
    const matchesKeyword = keywords.some((kw) => allText.includes(kw.toLowerCase()))
    if (matchesKeyword) return true
  }

  // Has subscriptions but nothing matched
  if (channels.length > 0 || keywords.length > 0) return false

  return true
}

export function useFilteredFeed(): Record<Platform, FeedItem[]> {
  const items = useFeedStore((s) => s.items)
  const seenIds = useFeedStore((s) => s.seenIds)
  const searchQuery = useUIStore((s) => s.searchQuery)
  const activeFilter = useUIStore((s) => s.activeFilter)
  const subscriptions = useSettingsStore((s) => s.subscriptions)

  return useMemo(() => {
    const allItems = Object.values(items)
    const now = Date.now()
    const pastThreshold = now - PAST_THRESHOLD_DAYS * 24 * 60 * 60 * 1000

    // Pre-compute enabled subscriptions per platform
    const subsByPlatform: Record<Platform, { channels: string[]; keywords: string[] }> = {
      [Platform.YOUTUBE]: { channels: [], keywords: [] },
      [Platform.NAVER_EXHIBITION]: { channels: [], keywords: [] },
      [Platform.NAVER_SECURITIES]: { channels: [], keywords: [] },
      [Platform.THREADS]: { channels: [], keywords: [] },
      [Platform.INSTAGRAM]: { channels: [], keywords: [] },
    }

    for (const sub of subscriptions) {
      if (!sub.enabled) continue
      if (sub.type === 'channel') {
        subsByPlatform[sub.platform].channels.push(sub.value)
      } else {
        subsByPlatform[sub.platform].keywords.push(sub.value)
      }
    }

    let filtered = allItems

    // Subscription filter - only show items matching registered channels/keywords
    filtered = filtered.filter((item) => {
      const { channels, keywords } = subsByPlatform[item.platform]
      return matchesSubscription(item, channels, keywords)
    })

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
  }, [items, seenIds, searchQuery, activeFilter, subscriptions])
}
