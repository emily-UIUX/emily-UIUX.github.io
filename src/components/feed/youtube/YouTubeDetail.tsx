'use client'

import { YouTubeItem } from '@/types/feed'
import { formatRelativeTime, formatNumber } from '@/lib/utils'
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton'
import { ThumbsUp, MessageCircle, Share2, Eye } from 'lucide-react'

export function YouTubeDetail({ item }: { item: YouTubeItem }) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Video Player Placeholder */}
      <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
        <img
          src={item.thumbnailUrl}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-xl font-bold mt-4">{item.title}</h1>

      {/* Meta row */}
      <div className="flex items-center justify-between mt-3 pb-3 border-b">
        <div className="flex items-center gap-3">
          <img
            src={item.channelAvatarUrl}
            alt={item.channelName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-sm">{item.channelName}</p>
            <p className="text-xs text-muted-foreground">
              {formatRelativeTime(item.timestamp)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-4 bg-muted rounded-full px-4 py-2">
            <span className="flex items-center gap-1.5 text-sm">
              <ThumbsUp className="h-4 w-4" />
              {formatNumber(item.likeCount)}
            </span>
            <div className="w-px h-5 bg-border" />
            <span className="flex items-center gap-1.5 text-sm">
              <MessageCircle className="h-4 w-4" />
              {formatNumber(item.commentCount)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-muted rounded-full px-4 py-2">
            <Share2 className="h-4 w-4" />
            <span className="text-sm">공유</span>
          </div>
          <BookmarkButton feedItemId={item.id} size="md" />
        </div>
      </div>

      {/* Stats & Description */}
      <div className="mt-4 p-4 bg-muted/50 rounded-xl">
        <div className="flex items-center gap-2 text-sm font-medium mb-2">
          <Eye className="h-4 w-4" />
          <span>조회수 {formatNumber(item.viewCount)}회</span>
          <span>·</span>
          <span>{new Date(item.timestamp).toLocaleDateString('ko-KR')}</span>
        </div>
        <p className="text-sm whitespace-pre-line">{item.description}</p>
      </div>
    </div>
  )
}
