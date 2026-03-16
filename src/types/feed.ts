import { Platform } from './common'

export interface BaseFeedItem {
  id: string
  platform: Platform
  title: string
  timestamp: string
  url: string
  thumbnailUrl: string
  tags: string[]
}

export interface YouTubeItem extends BaseFeedItem {
  platform: Platform.YOUTUBE
  channelName: string
  channelAvatarUrl: string
  viewCount: number
  duration: string
  description: string
  likeCount: number
  commentCount: number
}

export interface InstagramItem extends BaseFeedItem {
  platform: Platform.INSTAGRAM
  accountName: string
  accountAvatarUrl: string
  imageUrls: string[]
  caption: string
  likeCount: number
  commentCount: number
  isStory: boolean
  storyExpiresAt?: string
}

export interface ThreadsItem extends BaseFeedItem {
  platform: Platform.THREADS
  accountName: string
  accountAvatarUrl: string
  textContent: string
  likeCount: number
  replyCount: number
  repostCount: number
  imageUrls?: string[]
}

export interface NaverExhibitionItem extends BaseFeedItem {
  platform: Platform.NAVER_EXHIBITION
  venue: string
  address: string
  startDate: string
  endDate: string
  price: string
  category: string
  description: string
  posterUrl: string
  artist: string
  region: string
}

export interface NaverSecuritiesItem extends BaseFeedItem {
  platform: Platform.NAVER_SECURITIES
  headline: string
  source: string
  stockTicker?: string
  stockName?: string
  openingPrice?: number
  currentPrice?: number
  priceChange?: number
  priceChangePercent?: number
  summary: string
  relatedStocks: { ticker: string; name: string; openingPrice: number; currentPrice: number }[]
}

export type FeedItem =
  | YouTubeItem
  | InstagramItem
  | ThreadsItem
  | NaverExhibitionItem
  | NaverSecuritiesItem
