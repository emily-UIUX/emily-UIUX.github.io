'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { FeedItem } from '@/types/feed'

interface FeedState {
  items: Record<string, FeedItem>
  seenIds: string[]
  lastFetchTimestamp: string

  addItems: (items: FeedItem[]) => void
  markSeen: (id: string) => void
  markAllSeen: (ids: string[]) => void
  setLastFetchTimestamp: (ts: string) => void
}

export const useFeedStore = create<FeedState>()(
  persist(
    (set, get) => ({
      items: {},
      seenIds: [],
      lastFetchTimestamp: new Date().toISOString(),

      addItems: (newItems) =>
        set((state) => {
          const updated = { ...state.items }
          for (const item of newItems) {
            updated[item.id] = item
          }
          return { items: updated }
        }),

      markSeen: (id) =>
        set((state) => {
          if (state.seenIds.includes(id)) return state
          return { seenIds: [...state.seenIds, id] }
        }),

      markAllSeen: (ids) =>
        set((state) => {
          const newSeen = new Set(state.seenIds)
          ids.forEach((id) => newSeen.add(id))
          return { seenIds: Array.from(newSeen) }
        }),

      setLastFetchTimestamp: (ts) =>
        set({ lastFetchTimestamp: ts }),
    }),
    {
      name: 'feed-seen-state',
      partialize: (state) => ({
        seenIds: state.seenIds,
        lastFetchTimestamp: state.lastFetchTimestamp,
      }),
    }
  )
)
