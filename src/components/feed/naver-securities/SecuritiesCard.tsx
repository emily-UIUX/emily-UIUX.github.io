'use client'

import Link from 'next/link'
import { NaverSecuritiesItem } from '@/types/feed'
import { formatRelativeTime } from '@/lib/utils'
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SecuritiesCardProps {
  item: NaverSecuritiesItem
}

export function SecuritiesCard({ item }: SecuritiesCardProps) {
  const change = item.priceChangePercent ?? 0
  const isPositive = change > 0
  const isNegative = change < 0

  return (
    <Link href={`/detail?platform=naver-securities&id=${item.id}`} className="group block">
      <div className="rounded-lg overflow-hidden bg-card border hover:shadow-md transition-shadow p-3">
        {/* Header with source & time */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-muted-foreground font-medium">
            {item.source}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-muted-foreground">
              {formatRelativeTime(item.timestamp)}
            </span>
            <BookmarkButton feedItemId={item.id} />
          </div>
        </div>

        {/* Headline */}
        <h3 className="text-sm font-semibold line-clamp-2 mb-2 group-hover:text-green-600">
          {item.headline}
        </h3>

        {/* Stock info */}
        {item.stockName && (
          <div className="flex items-center gap-2 mt-2 p-2 rounded bg-muted/50">
            <div className="flex-1">
              <p className="text-xs font-medium">{item.stockName}</p>
              <p className="text-[11px] text-muted-foreground">{item.stockTicker}</p>
            </div>
            <div className={cn(
              'flex items-center gap-0.5 text-sm font-bold',
              isPositive && 'text-red-500',
              isNegative && 'text-blue-500',
              !isPositive && !isNegative && 'text-muted-foreground'
            )}>
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : isNegative ? (
                <TrendingDown className="h-3.5 w-3.5" />
              ) : (
                <Minus className="h-3.5 w-3.5" />
              )}
              <span>{isPositive ? '+' : ''}{change.toFixed(2)}%</span>
            </div>
          </div>
        )}

        {/* Summary */}
        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
          {item.summary}
        </p>
      </div>
    </Link>
  )
}
