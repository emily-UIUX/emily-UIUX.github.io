'use client'

import Link from 'next/link'
import Image from 'next/image'
import { YouTubeItem } from '@/types/feed'
import { formatRelativeTime, formatNumber } from '@/lib/utils'
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton'

interface YouTubeCardProps {
  item: YouTubeItem
}

export function YouTubeCard({ item }: YouTubeCardProps) {
  return (
    <Link href={`/detail?platform=youtube&id=${item.id}`} className="group block">
      <div className="rounded-lg overflow-hidden bg-card border hover:shadow-md transition-shadow">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-muted">
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {/* Duration badge */}
          <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[11px] px-1.5 py-0.5 rounded font-medium">
            {item.duration}
          </span>
          {/* Red progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600/30">
            <div className="h-full bg-red-600" style={{ width: '0%' }} />
          </div>
        </div>

        {/* Info */}
        <div className="p-2.5">
          <div className="flex gap-2">
            <img
              src={item.channelAvatarUrl}
              alt={item.channelName}
              className="w-8 h-8 rounded-full flex-shrink-0 mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium line-clamp-2 group-hover:text-blue-600">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {item.channelName}
              </p>
              <p className="text-xs text-muted-foreground">
                조회수 {formatNumber(item.viewCount)}회 · {formatRelativeTime(item.timestamp)}
              </p>
            </div>
            <BookmarkButton feedItemId={item.id} />
          </div>
        </div>
      </div>
    </Link>
  )
}
