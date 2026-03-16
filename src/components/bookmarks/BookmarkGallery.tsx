'use client'

import Link from 'next/link'
import { FeedItem } from '@/types/feed'
import { useBookmarkStore } from '@/stores/bookmarkStore'
import { platformConfigs } from '@/lib/platformConfig'
import { formatRelativeTime } from '@/lib/utils'
import { BookmarkButton } from './BookmarkButton'
import { X } from 'lucide-react'

interface BookmarkGalleryProps {
  items: FeedItem[]
  boardId: string
}

export function BookmarkGallery({ items, boardId }: BookmarkGalleryProps) {
  const unpinFromBoard = useBookmarkStore((s) => s.unpinFromBoard)

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <p className="text-lg">아직 핀이 없습니다</p>
        <p className="text-sm mt-1">피드에서 아이템을 북마크하고 이 보드에 추가해보세요</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {items.map((item) => {
        const config = platformConfigs[item.platform]
        return (
          <div key={item.id} className="group relative">
            <Link href={`/detail/${item.platform}/${item.id}`}>
              <div className="rounded-xl overflow-hidden border bg-card hover:shadow-md transition-shadow">
                <div className="aspect-square bg-muted relative">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Platform badge */}
                  <span
                    className="absolute bottom-1.5 left-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-medium text-white"
                    style={{ backgroundColor: config.color }}
                  >
                    {config.labelKo}
                  </span>
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium line-clamp-2">{item.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {formatRelativeTime(item.timestamp)}
                  </p>
                </div>
              </div>
            </Link>

            {/* Remove pin button */}
            <button
              onClick={() => unpinFromBoard(boardId, item.id)}
              className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
