'use client'

import Link from 'next/link'
import { NaverExhibitionItem } from '@/types/feed'
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton'
import { MapPin, Calendar, Paintbrush } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface ExhibitionCardProps {
  item: NaverExhibitionItem
}

export function ExhibitionCard({ item }: ExhibitionCardProps) {
  const now = new Date()
  const endDate = new Date(item.endDate)
  const isOngoing = endDate >= now
  const startDate = new Date(item.startDate)

  return (
    <Link href={`/detail?platform=naver-exhibition&id=${item.id}`} className="group block">
      <div className="rounded-lg overflow-hidden bg-card border hover:shadow-md transition-shadow">
        {/* Poster */}
        <div className="relative aspect-[4/3] bg-muted">
          <img
            src={item.posterUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <Badge
            className="absolute top-2 left-2"
            variant={isOngoing ? 'default' : 'secondary'}
          >
            {isOngoing ? '진행중' : '종료'}
          </Badge>
          <div className="absolute top-2 right-2">
            <BookmarkButton feedItemId={item.id} className="bg-black/30 hover:bg-black/50 text-white" />
          </div>
        </div>

        {/* Info */}
        <div className="p-2.5 space-y-1.5">
          <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-primary">
            {item.title}
          </h3>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Paintbrush className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{item.artist}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{item.venue}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 flex-shrink-0" />
            <span>
              {startDate.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
              {' ~ '}
              {endDate.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
