'use client'

import { useParams, useRouter } from 'next/navigation'
import { useBookmarkStore } from '@/stores/bookmarkStore'
import { useBoardItems } from '@/hooks/useBookmarks'
import { BookmarkGallery } from '@/components/bookmarks/BookmarkGallery'
import { ArrowLeft, Pin } from 'lucide-react'

export default function BoardPage() {
  const params = useParams<{ boardId: string }>()
  const router = useRouter()
  const boards = useBookmarkStore((s) => s.boards)
  const board = boards.find((b) => b.id === params.boardId)
  const items = useBoardItems(params.boardId)

  if (!board) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-muted-foreground">보드를 찾을 수 없습니다</p>
        <button onClick={() => router.push('/bookmarks')} className="text-sm text-primary hover:underline">
          북마크로 돌아가기
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={() => router.push('/bookmarks')}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        북마크
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">{board.name}</h1>
        {board.description && (
          <p className="text-muted-foreground mt-1">{board.description}</p>
        )}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
          <Pin className="h-4 w-4" />
          <span>{board.pinIds.length}개 핀</span>
        </div>
      </div>

      <BookmarkGallery items={items} boardId={board.id} />
    </div>
  )
}
