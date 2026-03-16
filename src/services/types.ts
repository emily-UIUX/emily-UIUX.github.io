import { Platform } from '@/types/common'
import { FeedItem } from '@/types/feed'

export interface FeedServiceParams {
  platform?: Platform
  after?: string
  limit?: number
  search?: string
}

export interface IFeedService {
  getItems(params: FeedServiceParams): Promise<FeedItem[]>
  getItemById(platform: Platform, id: string): Promise<FeedItem | null>
  generateNewItem(platform: Platform): Promise<FeedItem>
}
