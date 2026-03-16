'use client'

import { InstagramItem } from '@/types/feed'
import { formatRelativeTime, formatNumber } from '@/lib/utils'
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton'
import { Heart, MessageCircle, Send, MoreHorizontal } from 'lucide-react'

export function InstagramDetail({ item }: { item: InstagramItem }) {
  return (
    <div className="max-w-2xl mx-auto bg-card border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 border-b">
        <div className="relative">
          <img
            src={item.accountAvatarUrl}
            alt={item.accountName}
            className="w-8 h-8 rounded-full"
          />
          {item.isStory && (
            <div className="absolute -inset-0.5 rounded-full border-2 border-transparent bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 -z-10" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">{item.accountName}</p>
          {item.isStory && (
            <span className="text-[10px] text-pink-500 font-medium">스토리</span>
          )}
        </div>
        <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
      </div>

      {/* Image Carousel */}
      <div className="relative bg-black">
        {item.imageUrls.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`${item.accountName} 게시물 ${i + 1}`}
            className="w-full aspect-square object-cover"
            style={{ display: i === 0 ? 'block' : 'none' }}
          />
        ))}
        {item.imageUrls.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {item.imageUrls.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-blue-500' : 'bg-white/50'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <Heart className="h-6 w-6 cursor-pointer hover:text-red-500 transition-colors" />
            <MessageCircle className="h-6 w-6 cursor-pointer" />
            <Send className="h-6 w-6 cursor-pointer" />
          </div>
          <BookmarkButton feedItemId={item.id} size="md" />
        </div>

        <p className="text-sm font-semibold mb-1">
          좋아요 {formatNumber(item.likeCount)}개
        </p>

        <div className="text-sm">
          <span className="font-semibold">{item.accountName}</span>{' '}
          <span>{item.caption}</span>
        </div>

        {item.commentCount > 0 && (
          <p className="text-sm text-muted-foreground mt-1">
            댓글 {formatNumber(item.commentCount)}개 모두 보기
          </p>
        )}

        <p className="text-[11px] text-muted-foreground mt-2 uppercase">
          {formatRelativeTime(item.timestamp)}
        </p>
      </div>
    </div>
  )
}
