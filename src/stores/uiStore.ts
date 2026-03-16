'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { FilterTab } from '@/types/common'

interface UIState {
  searchQuery: string
  activeFilter: FilterTab

  setSearchQuery: (q: string) => void
  setActiveFilter: (tab: FilterTab) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      searchQuery: '',
      activeFilter: FilterTab.NEW,

      setSearchQuery: (q) => set({ searchQuery: q }),
      setActiveFilter: (tab) => set({ activeFilter: tab }),
    }),
    {
      name: 'ui-filter',
      partialize: (state) => ({ activeFilter: state.activeFilter }),
    }
  )
)
