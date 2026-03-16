'use client'

import { useUIStore } from '@/stores/uiStore'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { useRef } from 'react'

export function SearchBar() {
  const searchQuery = useUIStore((s) => s.searchQuery)
  const setSearchQuery = useUIStore((s) => s.setSearchQuery)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative w-full max-w-xs shrink-0">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        ref={inputRef}
        type="text"
        placeholder="제목, 계정명, 태그 검색..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-8"
      />
      {searchQuery && (
        <button
          onClick={() => {
            setSearchQuery('')
            inputRef.current?.focus()
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
