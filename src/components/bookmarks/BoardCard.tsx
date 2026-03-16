'use client'

import { Board } from '@/types/bookmark'
import { useFeedStore } from '@/stores/feedStore'
import { useBookmarkStore } from '@/stores/bookmarkStore'
import { Folder, MoreHorizontal, Trash2, Pin } from 'lucide-react'

interface BoardCardProps {
  board: Board
}

export function BoardCard({ board }: BoardCardProps) {
  const items = useFeedStore((s) => s.items)
  const deleteBoard = useBookmarkStore((s) => s.deleteBoard)

  // Get first 4 pinned items for cover grid
  const coverItems = board.pinIds
    .slice(0, 4)
    .map((id) => items[id])
    .filter(Boolean)

  return (
    <div className="group relative">
      <div className="cursor-pointer">
        <div className="rounded-xl border overflow-hidden bg-card hover:shadow-md transition-shadow">
          {/* Cover grid */}
          <div className="aspect-square bg-muted grid grid-cols-2 grid-rows-2 gap-0.5 overflow-hidden">
            {coverItems.length > 0 ? (
              coverItems.map((item, i) => (
                <div key={i} className="bg-muted">
                  <img
                    src={item.thumbnailUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="col-span-2 row-span-2 flex items-center justify-center">
                <Folder className="h-12 w-12 text-muted-foreground/30" />
              </div>
            )}
            {/* Fill remaining grid slots */}
            {coverItems.length > 0 && coverItems.length < 4 &&
              Array.from({ length: 4 - coverItems.length }).map((_, i) => (
                <div key={`empty-${i}`} className="bg-muted" />
              ))
            }
          </div>

          {/* Info */}
          <div className="p-3">
            <h3 className="font-semibold text-sm truncate">{board.name}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <Pin className="h-3 w-3" />
              <span>{board.pinIds.length}개 핀</span>
            </div>
            {board.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {board.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={(e) => {
          e.preventDefault()
          if (confirm('이 보드를 삭제하시겠습니까?')) {
            deleteBoard(board.id)
          }
        }}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
