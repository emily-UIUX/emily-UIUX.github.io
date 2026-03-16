'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { FeedItem } from '@/types/feed'

// Bump this version whenever mock data structure changes to force a refresh
export const FEED_DATA_VERSION = 3

interface FeedState {
  items: Record<string, FeedItem>
  seenIds: string[]
  lastFetchTimestamp: string
  dataVersion: number

  addItems: (items: FeedItem[]) => void
  markSeen: (id: string) => void
  markAllSeen: (ids: string[]) => void
  setLastFetchTimestamp: (ts: string) => void
  clearItems: () => void
}

export const useFeedStore = create<FeedState>()(
  persist(
    (set, get) => ({
      items: {},
      seenIds: [],
      lastFetchTimestamp: new Date().toISOString(),
      dataVersion: 0,

      addItems: (newItems) =>
        set((state) => {
          const updated = { ...state.items }
          for (const item of newItems) {
            updated[item.id] = item
          }
          return { items: updated, dataVersion: FEED_DATA_VERSION }
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

      clearItems: () =>
        set({ items: {}, dataVersion: 0 }),
    }),
    {
      name: 'feed-seen-state',
      partialize: (state) => ({
        seenIds: state.seenIds,
        lastFetchTimestamp: state.lastFetchTimestamp,
        dataVersion: state.dataVersion,
      }),
    }
  )
)
