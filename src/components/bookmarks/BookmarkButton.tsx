'use client'

import { useBookmarkStore } from '@/stores/bookmarkStore'
import { Bookmark } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BookmarkButtonProps {
  feedItemId: string
  size?: 'sm' | 'md'
  className?: string
}

export function BookmarkButton({ feedItemId, size = 'sm', className }: BookmarkButtonProps) {
  const toggleBookmark = useBookmarkStore((s) => s.toggleBookmark)
  const bookmarkedIds = useBookmarkStore((s) => s.bookmarkedIds)
  const isBookmarked = bookmarkedIds.includes(feedItemId)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleBookmark(feedItemId)
      }}
      className={cn(
        'transition-colors rounded-full p-1',
        isBookmarked
          ? 'text-yellow-500 hover:text-yellow-600'
          : 'text-muted-foreground hover:text-foreground',
        className
      )}
      title={isBookmarked ? '북마크 해제' : '북마크'}
    >
      <Bookmark
        className={cn(
          size === 'sm' ? 'h-4 w-4' : 'h-5 w-5',
          isBookmarked && 'fill-current'
        )}
      />
    </button>
  )
}
