'use client'

import Link from 'next/link'
import { ThreadsItem } from '@/types/feed'
import { formatRelativeTime, formatNumber } from '@/lib/utils'
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton'
import { Heart, MessageCircle, Repeat2 } from 'lucide-react'

interface ThreadsCardProps {
  item: ThreadsItem
}

export function ThreadsCard({ item }: ThreadsCardProps) {
  return (
    <Link href={`/detail?platform=threads&id=${item.id}`} className="group block">
      <div className="relative rounded-lg overflow-hidden bg-card border hover:shadow-md transition-shadow border-l-2 border-l-neutral-300 dark:border-l-neutral-700">
        <div className="p-3">
          {/* Header */}
          <div className="flex items-start gap-2.5">
            <img
              src={item.accountAvatarUrl}
              alt={item.accountName}
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold">{item.accountName}</span>
                <span className="text-xs text-muted-foreground">
                  {formatRelativeTime(item.timestamp)}
                </span>
                <div className="ml-auto">
                  <BookmarkButton feedItemId={item.id} />
                </div>
              </div>

              {/* Text content */}
              <p className="text-sm mt-1.5 line-clamp-4 leading-relaxed">
                {item.textContent}
              </p>

              {/* Image if present */}
              {item.imageUrls && item.imageUrls.length > 0 && (
                <div className="mt-2 rounded-lg overflow-hidden">
                  <img
                    src={item.imageUrls[0]}
                    alt=""
                    className="w-full aspect-video object-cover"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                <span className="flex items-center gap-1 text-xs">
                  <Heart className="h-3.5 w-3.5" />
                  {formatNumber(item.likeCount)}
                </span>
                <span className="flex items-center gap-1 text-xs">
                  <MessageCircle className="h-3.5 w-3.5" />
                  {formatNumber(item.replyCount)}
                </span>
                <span className="flex items-center gap-1 text-xs">
                  <Repeat2 className="h-3.5 w-3.5" />
                  {formatNumber(item.repostCount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
