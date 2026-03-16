'use client'

import { ThreadsItem } from '@/types/feed'
import { formatRelativeTime, formatNumber } from '@/lib/utils'
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton'
import { Heart, MessageCircle, Repeat2, Share2, MoreHorizontal } from 'lucide-react'

export function ThreadsDetail({ item }: { item: ThreadsItem }) {
  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-card border rounded-xl p-4">
        {/* Author header */}
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center gap-1">
            <img
              src={item.accountAvatarUrl}
              alt={item.accountName}
              className="w-10 h-10 rounded-full"
            />
            <div className="w-0.5 flex-1 bg-border min-h-[20px]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">{item.accountName}</span>
                <span className="text-xs text-muted-foreground">
                  {formatRelativeTime(item.timestamp)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <BookmarkButton feedItemId={item.id} size="md" />
                <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            {/* Text content */}
            <p className="text-[15px] mt-2 leading-relaxed whitespace-pre-line">
              {item.textContent}
            </p>

            {/* Image */}
            {item.imageUrls && item.imageUrls.length > 0 && (
              <div className="mt-3 rounded-xl overflow-hidden border">
                <img
                  src={item.imageUrls[0]}
                  alt=""
                  className="w-full"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6 mt-4 text-muted-foreground">
              <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                <Heart className="h-5 w-5" />
                <span className="text-sm">{formatNumber(item.likeCount)}</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm">{formatNumber(item.replyCount)}</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Repeat2 className="h-5 w-5" />
                <span className="text-sm">{formatNumber(item.repostCount)}</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
