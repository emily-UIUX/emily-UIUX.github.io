'use client'

import Link from 'next/link'
import { InstagramItem } from '@/types/feed'
import { formatRelativeTime, formatNumber } from '@/lib/utils'
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton'
import { Heart, MessageCircle, Images } from 'lucide-react'

interface InstagramCardProps {
  item: InstagramItem
}

export function InstagramCard({ item }: InstagramCardProps) {
  return (
    <Link href={`/detail?platform=instagram&id=${item.id}`} className="group block">
      <div className="rounded-lg overflow-hidden bg-card border hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="flex items-center gap-2 p-2.5">
          <div className="relative">
            <img
              src={item.accountAvatarUrl}
              alt={item.accountName}
              className="w-7 h-7 rounded-full"
            />
            {item.isStory && (
              <div className="absolute -inset-0.5 rounded-full border-2 border-transparent bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 -z-10" style={{ padding: '2px' }} />
            )}
          </div>
          <span className="text-xs font-semibold">{item.accountName}</span>
          <span className="text-xs text-muted-foreground ml-auto">
            {formatRelativeTime(item.timestamp)}
          </span>
        </div>

        {/* Image */}
        <div className="relative aspect-square bg-muted">
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {item.imageUrls.length > 1 && (
            <div className="absolute top-2 right-2">
              <Images className="h-4 w-4 text-white drop-shadow" />
            </div>
          )}
          {item.isStory && (
            <span className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
              스토리
            </span>
          )}
        </div>

        {/* Actions & Caption */}
        <div className="p-2.5">
          <div className="flex items-center gap-3 mb-1.5">
            <Heart className="h-4 w-4 text-muted-foreground" />
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
            <div className="ml-auto">
              <BookmarkButton feedItemId={item.id} />
            </div>
          </div>
          <p className="text-xs font-semibold">
            좋아요 {formatNumber(item.likeCount)}개
          </p>
          <p className="text-xs mt-0.5 line-clamp-2">
            <span className="font-semibold">{item.accountName}</span>{' '}
            {item.caption}
          </p>
        </div>
      </div>
    </Link>
  )
}
