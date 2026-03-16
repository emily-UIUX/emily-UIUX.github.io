import { Platform } from '@/types/common'
import { FeedItem } from '@/types/feed'
import { IFeedService, FeedServiceParams } from '../types'
import { generateYouTubeItems } from './data/youtubeData'
import { generateInstagramItems } from './data/instagramData'
import { generateThreadsItems } from './data/threadsData'
import { generateExhibitionItems } from './data/exhibitionData'
import { generateSecuritiesItems } from './data/securitiesData'

export class MockFeedService implements IFeedService {
  private allItems: FeedItem[] = []

  constructor() {
    this.allItems = [
      ...generateYouTubeItems(8),
      ...generateInstagramItems(8),
      ...generateThreadsItems(8),
      ...generateExhibitionItems(6),
      ...generateSecuritiesItems(8),
    ]
  }

  async getItems(params: FeedServiceParams): Promise<FeedItem[]> {
    let items = [...this.allItems]

    if (params.platform) {
      items = items.filter((item) => item.platform === params.platform)
    }

    if (params.after) {
      const afterDate = new Date(params.after)
      items = items.filter((item) => new Date(item.timestamp) > afterDate)
    }

    if (params.search) {
      const q = params.search.toLowerCase()
      items = items.filter((item) => {
        const searchableFields = [
          item.title,
          ...item.tags,
          this.getAccountName(item),
        ]
        return searchableFields.some((field) =>
          field.toLowerCase().includes(q)
        )
      })
    }

    items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    if (params.limit) {
      items = items.slice(0, params.limit)
    }

    return items
  }

  async getItemById(platform: Platform, id: string): Promise<FeedItem | null> {
    return this.allItems.find((item) => item.id === id && item.platform === platform) || null
  }

  async generateNewItem(platform: Platform): Promise<FeedItem> {
    let items: FeedItem[]
    switch (platform) {
      case Platform.YOUTUBE:
        items = generateYouTubeItems(1)
        break
      case Platform.INSTAGRAM:
        items = generateInstagramItems(1)
        break
      case Platform.THREADS:
        items = generateThreadsItems(1)
        break
      case Platform.NAVER_EXHIBITION:
        items = generateExhibitionItems(1)
        break
      case Platform.NAVER_SECURITIES:
        items = generateSecuritiesItems(1)
        break
      default:
        items = generateYouTubeItems(1)
    }

    const newItem = {
      ...items[0],
      id: `${platform}-new-${Date.now()}`,
      timestamp: new Date().toISOString(),
    }

    this.allItems.unshift(newItem)
    return newItem
  }

  private getAccountName(item: FeedItem): string {
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
}
