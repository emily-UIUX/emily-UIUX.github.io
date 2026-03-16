'use client'

import { NaverExhibitionItem } from '@/types/feed'
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Tag, Clock, ExternalLink, Paintbrush } from 'lucide-react'

export function ExhibitionDetail({ item }: { item: NaverExhibitionItem }) {
  const now = new Date()
  const endDate = new Date(item.endDate)
  const startDate = new Date(item.startDate)
  const isOngoing = endDate >= now
  const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / 86400000)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        {/* Poster */}
        <div className="relative">
          <img
            src={item.posterUrl}
            alt={item.title}
            className="w-full rounded-xl shadow-lg"
          />
        </div>

        {/* Info */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <Badge variant={isOngoing ? 'default' : 'secondary'} className="mb-2">
                {isOngoing ? '진행중' : '종료'}
              </Badge>
              <h1 className="text-2xl font-bold">{item.title}</h1>
            </div>
            <BookmarkButton feedItemId={item.id} size="md" />
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Paintbrush className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="font-medium">{item.artist}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="font-medium">{item.venue}</p>
                <p className="text-muted-foreground text-xs">{item.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>
                {startDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                {' ~ '}
                {endDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>

            {isOngoing && daysLeft > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span className="text-orange-500 font-medium">
                  종료까지 {daysLeft}일 남음
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm">
              <Tag className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>입장료: <span className="font-semibold">{item.price}</span></span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">카테고리:</span>
              <Badge variant="outline">{item.category}</Badge>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-xl">
            <h3 className="font-semibold mb-2">전시 소개</h3>
            <p className="text-sm leading-relaxed">{item.description}</p>
          </div>

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            오픈갤러리에서 보기
          </a>
        </div>
      </div>
    </div>
  )
}
