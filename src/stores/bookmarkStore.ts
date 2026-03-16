'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Board } from '@/types/bookmark'
import { Platform } from '@/types/common'
import { generateId } from '@/lib/utils'

interface BookmarkState {
  bookmarkedIds: string[]
  boards: Board[]

  toggleBookmark: (feedItemId: string) => void
  isBookmarked: (feedItemId: string) => boolean
  createBoard: (name: string, description?: string) => string
  deleteBoard: (boardId: string) => void
  updateBoard: (boardId: string, updates: Partial<Pick<Board, 'name' | 'description'>>) => void
  pinToBoard: (boardId: string, feedItemId: string) => void
  unpinFromBoard: (boardId: string, feedItemId: string) => void
  toggleBoardCollapse: (boardId: string) => void
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarkedIds: [],
      boards: [],

      toggleBookmark: (feedItemId) =>
        set((state) => {
          const exists = state.bookmarkedIds.includes(feedItemId)
          if (exists) {
            return {
              bookmarkedIds: state.bookmarkedIds.filter((id) => id !== feedItemId),
              boards: state.boards.map((board) => ({
                ...board,
                pinIds: board.pinIds.filter((id) => id !== feedItemId),
              })),
            }
          }
          return {
            bookmarkedIds: [...state.bookmarkedIds, feedItemId],
          }
        }),

      isBookmarked: (feedItemId) =>
        get().bookmarkedIds.includes(feedItemId),

      createBoard: (name, description) => {
        const id = generateId()
        const now = new Date().toISOString()
        set((state) => ({
          boards: [
            ...state.boards,
            {
              id,
              name,
              description,
              createdAt: now,
              updatedAt: now,
              pinIds: [],
              isCollapsed: false,
            },
          ],
        }))
        return id
      },

      deleteBoard: (boardId) =>
        set((state) => ({
          boards: state.boards.filter((b) => b.id !== boardId),
        })),

      updateBoard: (boardId, updates) =>
        set((state) => ({
          boards: state.boards.map((b) =>
            b.id === boardId
              ? { ...b, ...updates, updatedAt: new Date().toISOString() }
              : b
          ),
        })),

      pinToBoard: (boardId, feedItemId) =>
        set((state) => ({
          boards: state.boards.map((b) =>
            b.id === boardId && !b.pinIds.includes(feedItemId)
              ? { ...b, pinIds: [...b.pinIds, feedItemId], updatedAt: new Date().toISOString() }
              : b
          ),
        })),

      unpinFromBoard: (boardId, feedItemId) =>
        set((state) => ({
          boards: state.boards.map((b) =>
            b.id === boardId
              ? { ...b, pinIds: b.pinIds.filter((id) => id !== feedItemId), updatedAt: new Date().toISOString() }
              : b
          ),
        })),

      toggleBoardCollapse: (boardId) =>
        set((state) => ({
          boards: state.boards.map((b) =>
            b.id === boardId ? { ...b, isCollapsed: !b.isCollapsed } : b
          ),
        })),
    }),
    { name: 'bookmarks' }
  )
)
