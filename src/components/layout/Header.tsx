'use client'

import Link from 'next/link'
import { Bookmark, Rss, Settings } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
            <Rss className="h-5 w-5 text-primary" />
            <span>FeedFlow</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/bookmarks"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md hover:bg-accent transition-colors"
            >
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">북마크</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md hover:bg-accent transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">설정</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
