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

interface PlatformSubs {
  channels: string[]
  keywords: string[]
  regions: string[]
  artists: string[]
}

function matchesSubscription(item: FeedItem, subs: PlatformSubs): boolean {
  const { channels, keywords, regions, artists } = subs
  const hasAnySub = channels.length > 0 || keywords.length > 0 || regions.length > 0 || artists.length > 0

  // If no subscriptions at all for this platform, show everything
  if (!hasAnySub) return true

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

  // Check region match (for exhibition items)
  if (regions.length > 0 && item.platform === Platform.NAVER_EXHIBITION) {
    const itemRegion = item.region.toLowerCase()
    if (regions.some((r) => itemRegion.includes(r.toLowerCase()))) return true
  }

  // Check artist match (for exhibition items)
  if (artists.length > 0 && item.platform === Platform.NAVER_EXHIBITION) {
    const itemArtist = item.artist.toLowerCase()
    if (artists.some((a) => itemArtist.includes(a.toLowerCase()))) return true
  }

  return false
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
    const subsByPlatform: Record<Platform, PlatformSubs> = {
      [Platform.YOUTUBE]: { channels: [], keywords: [], regions: [], artists: [] },
      [Platform.NAVER_EXHIBITION]: { channels: [], keywords: [], regions: [], artists: [] },
      [Platform.NAVER_SECURITIES]: { channels: [], keywords: [], regions: [], artists: [] },
      [Platform.THREADS]: { channels: [], keywords: [], regions: [], artists: [] },
      [Platform.INSTAGRAM]: { channels: [], keywords: [], regions: [], artists: [] },
    }

    for (const sub of subscriptions) {
      if (!sub.enabled) continue
      const bucket = subsByPlatform[sub.platform]
      switch (sub.type) {
        case 'channel': bucket.channels.push(sub.value); break
        case 'keyword': bucket.keywords.push(sub.value); break
        case 'region': bucket.regions.push(sub.value); break
        case 'artist': bucket.artists.push(sub.value); break
      }
    }

    let filtered = allItems

    // Subscription filter - only show items matching registered subscriptions
    filtered = filtered.filter((item) => matchesSubscription(item, subsByPlatform[item.platform]))

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
          // 최근 1주일 이내 + 아직 상세페이지를 보지 않은 아이템
          return !isSeen && itemTime > pastThreshold
        case FilterTab.SEEN:
          // 지금까지 상세페이지를 본 모든 아이템
          return isSeen
        case FilterTab.PAST:
          // 1주일 이전 + 아직 상세페이지를 보지 않은 아이템
          return !isSeen && itemTime <= pastThreshold
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
