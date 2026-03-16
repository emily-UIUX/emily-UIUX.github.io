'use client'

import { NaverSecuritiesItem } from '@/types/feed'
import { formatRelativeTime } from '@/lib/utils'
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton'
import { TrendingUp, TrendingDown, Minus, ExternalLink, Newspaper } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SecuritiesDetail({ item }: { item: NaverSecuritiesItem }) {
  const change = item.priceChangePercent ?? 0
  const isPositive = change > 0
  const isNegative = change < 0

  return (
    <div className="max-w-3xl mx-auto">
      {/* Article header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Newspaper className="h-4 w-4" />
            <span>{item.source}</span>
            <span>·</span>
            <span>{formatRelativeTime(item.timestamp)}</span>
          </div>
          <h1 className="text-2xl font-bold">{item.headline}</h1>
        </div>
        <BookmarkButton feedItemId={item.id} size="md" />
      </div>

      {/* Stock info card */}
      {item.stockName && (
        <div className="mt-6 p-4 border rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">{item.stockName}</h3>
              <p className="text-sm text-muted-foreground">{item.stockTicker}</p>
            </div>
            <div className={cn(
              'text-right',
              isPositive && 'text-red-500',
              isNegative && 'text-blue-500',
            )}>
              {item.currentPrice != null && (
                <p className="text-2xl font-bold">{item.currentPrice.toLocaleString('ko-KR')}원</p>
              )}
              <div className="flex items-center justify-end gap-1 text-sm font-semibold mt-0.5">
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : isNegative ? (
                  <TrendingDown className="h-4 w-4" />
                ) : (
                  <Minus className="h-4 w-4" />
                )}
                <span>
                  {item.priceChange != null && `${isPositive ? '+' : ''}${item.priceChange.toLocaleString('ko-KR')}원`}
                  {' '}({isPositive ? '+' : ''}{change.toFixed(2)}%)
                </span>
              </div>
              {item.openingPrice != null && (
                <p className="text-xs text-muted-foreground mt-1">
                  시가 {item.openingPrice.toLocaleString('ko-KR')}원
                </p>
              )}
            </div>
          </div>

          {/* Mini chart placeholder */}
          <div className="mt-4 h-24 bg-muted/50 rounded-lg flex items-center justify-center text-sm text-muted-foreground">
            차트 영역
          </div>
        </div>
      )}

      {/* Article body */}
      <div className="mt-6 p-4 bg-muted/50 rounded-xl">
        <p className="text-sm leading-relaxed">{item.summary}</p>
      </div>

      {/* Related stocks */}
      {item.relatedStocks.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-3">관련 종목</h3>
          <div className="grid grid-cols-2 gap-2">
            {item.relatedStocks.map((stock) => {
              const stockChange = stock.currentPrice - stock.openingPrice
              const stockChangePercent = (stockChange / stock.openingPrice) * 100
              return (
                <div key={stock.ticker} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{stock.name}</p>
                    <p className="text-xs text-muted-foreground">{stock.ticker}</p>
                  </div>
                  <div className={cn(
                    'text-right',
                    stockChange > 0 && 'text-red-500',
                    stockChange < 0 && 'text-blue-500',
                  )}>
                    <p className="text-sm font-semibold">{stock.currentPrice.toLocaleString('ko-KR')}원</p>
                    <p className="text-[11px]">
                      {stockChange > 0 ? '+' : ''}{stockChangePercent.toFixed(2)}%
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 mt-4 text-sm text-green-600 hover:underline"
      >
        <ExternalLink className="h-4 w-4" />
        네이버 증권에서 보기
      </a>
    </div>
  )
}
