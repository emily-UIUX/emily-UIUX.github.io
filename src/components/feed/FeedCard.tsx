'use client'

import { FeedItem } from '@/types/feed'
import { Platform } from '@/types/common'
import { YouTubeCard } from './youtube/YouTubeCard'
import { InstagramCard } from './instagram/InstagramCard'
import { ThreadsCard } from './threads/ThreadsCard'
import { ExhibitionCard } from './naver-exhibition/ExhibitionCard'
import { SecuritiesCard } from './naver-securities/SecuritiesCard'

interface FeedCardProps {
  item: FeedItem
}

export function FeedCard({ item }: FeedCardProps) {
  switch (item.platform) {
    case Platform.YOUTUBE:
      return <YouTubeCard item={item} />
    case Platform.INSTAGRAM:
      return <InstagramCard item={item} />
    case Platform.THREADS:
      return <ThreadsCard item={item} />
    case Platform.NAVER_EXHIBITION:
      return <ExhibitionCard item={item} />
    case Platform.NAVER_SECURITIES:
      return <SecuritiesCard item={item} />
    default:
      return null
  }
}
