'use client'

import { useUIStore } from '@/stores/uiStore'
import { Search, X } from 'lucide-react'
import { useRef } from 'react'

export function SearchBar() {
  const searchQuery = useUIStore((s) => s.searchQuery)
  const setSearchQuery = useUIStore((s) => s.setSearchQuery)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <input
        ref={inputRef}
        type="text"
        placeholder="제목, 계정명, 태그 검색..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full h-12 pl-12 pr-10 text-base rounded-full border border-border bg-background shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
      />
      {searchQuery && (
        <button
          onClick={() => {
            setSearchQuery('')
            inputRef.current?.focus()
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
