'use client'

import { useUIStore } from '@/stores/uiStore'
import { FilterTab, FILTER_TAB_LABELS } from '@/types/common'
import { cn } from '@/lib/utils'

export function FilterTabs() {
  const activeFilter = useUIStore((s) => s.activeFilter)
  const setActiveFilter = useUIStore((s) => s.setActiveFilter)

  const tabs = Object.values(FilterTab)

  return (
    <div className="flex gap-1 rounded-lg bg-muted p-1 w-fit mx-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveFilter(tab)}
          className={cn(
            'px-4 py-1.5 text-sm font-medium rounded-md transition-colors',
            activeFilter === tab
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {FILTER_TAB_LABELS[tab]}
        </button>
      ))}
    </div>
  )
}
