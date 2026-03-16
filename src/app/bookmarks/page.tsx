'use client'

import { useState } from 'react'
import { useBookmarkStore } from '@/stores/bookmarkStore'
import { useBookmarkedItems } from '@/hooks/useBookmarks'
import { BoardCard } from '@/components/bookmarks/BoardCard'
import { BoardDialog } from '@/components/bookmarks/BoardDialog'
import { BookmarkGallery } from '@/components/bookmarks/BookmarkGallery'
import { Button } from '@/components/ui/button'
import { platformConfigs } from '@/lib/platformConfig'
import { Plus, Bookmark, ChevronDown, ChevronRight } from 'lucide-react'

export default function BookmarksPage() {
  const boards = useBookmarkStore((s) => s.boards)
  const bookmarkedItems = useBookmarkedItems()
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showAllBookmarks, setShowAllBookmarks] = useState(true)

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bookmark className="h-6 w-6" />
          <h1 className="text-2xl font-bold">북마크</h1>
          <span className="text-muted-foreground text-sm">
            ({bookmarkedItems.length}개 아이템)
          </span>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-1" />
          새 보드
        </Button>
      </div>

      {/* Boards Grid */}
      {boards.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">보드</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {boards.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))}
          </div>
        </section>
      )}

      {/* All Bookmarks */}
      <section>
        <button
          onClick={() => setShowAllBookmarks(!showAllBookmarks)}
          className="flex items-center gap-2 text-lg font-semibold mb-4 hover:text-primary transition-colors"
        >
          {showAllBookmarks ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
          모든 북마크
        </button>
        {showAllBookmarks && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {bookmarkedItems.length === 0 ? (
              <div className="col-span-full text-center py-16 text-muted-foreground">
                <Bookmark className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>아직 북마크가 없습니다</p>
                <p className="text-sm mt-1">피드에서 마음에 드는 게시물을 북마크해보세요</p>
              </div>
            ) : (
              bookmarkedItems.map((item) => {
                const config = platformConfigs[item.platform]
                return (
                  <a key={item.id} href={`/detail/${item.platform}/${item.id}`}>
                    <div className="rounded-xl overflow-hidden border bg-card hover:shadow-md transition-shadow">
                      <div className="aspect-square bg-muted relative">
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <span
                          className="absolute bottom-1.5 left-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-medium text-white"
                          style={{ backgroundColor: config.color }}
                        >
                          {config.labelKo}
                        </span>
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-medium line-clamp-2">{item.title}</p>
                      </div>
                    </div>
                  </a>
                )
              })
            )}
          </div>
        )}
      </section>

      {showCreateDialog && (
        <BoardDialog onClose={() => setShowCreateDialog(false)} />
      )}
    </div>
  )
}
