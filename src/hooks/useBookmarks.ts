'use client'

import { useMemo } from 'react'
import { useBookmarkStore } from '@/stores/bookmarkStore'
import { useFeedStore } from '@/stores/feedStore'
import { FeedItem } from '@/types/feed'

export function useBookmarkedItems(): FeedItem[] {
  const bookmarkedIds = useBookmarkStore((s) => s.bookmarkedIds)
  const items = useFeedStore((s) => s.items)

  return useMemo(() => {
    return bookmarkedIds
      .map((id) => items[id])
      .filter(Boolean) as FeedItem[]
  }, [bookmarkedIds, items])
}

export function useBoardItems(boardId: string): FeedItem[] {
  const boards = useBookmarkStore((s) => s.boards)
  const items = useFeedStore((s) => s.items)

  return useMemo(() => {
    const board = boards.find((b) => b.id === boardId)
    if (!board) return []
    return board.pinIds
      .map((id) => items[id])
      .filter(Boolean) as FeedItem[]
  }, [boards, boardId, items])
}
