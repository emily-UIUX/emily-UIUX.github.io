import { Platform } from './common'

export interface BookmarkItem {
  feedItemId: string
  platform: Platform
  bookmarkedAt: string
}

export interface Board {
  id: string
  name: string
  description?: string
  coverImageUrl?: string
  createdAt: string
  updatedAt: string
  pinIds: string[]
  isCollapsed: boolean
}
