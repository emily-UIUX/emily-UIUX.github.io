'use client'

import { NaverSecuritiesItem } from '@/types/feed'
import { formatRelativeTime } from '@/lib/utils'
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton'
import { TrendingUp, TrendingDown, Minus, ExternalLink, Newspaper } from 'lucide-react'
import { cn } from '@/lib/utils'

function MiniChart({ data, isPositive }: { data: number[]; isPositive: boolean }) {
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const width = 100
  const height = 100
  const padding = 4

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2)
    const y = padding + (1 - (val - min) / range) * (height - padding * 2)
    return `${x},${y}`
  })

  const polyline = points.join(' ')

  // Area fill path
  const firstX = padding
  const lastX = padding + (width - padding * 2)
  const areaPath = `M ${firstX},${height - padding} L ${points.map(p => p).join(' L ')} L ${lastX},${height - padding} Z`

  const strokeColor = isPositive ? '#ef4444' : '#3b82f6'
  const fillColor = isPositive ? 'rgba(239,68,68,0.1)' : 'rgba(59,130,246,0.1)'

  // Opening price line (horizontal dashed)
  const openY = padding + (1 - (data[0] - min) / range) * (height - padding * 2)

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
      {/* Area fill */}
      <path d={areaPath} fill={fillColor} />
      {/* Opening price reference line */}
      <line
        x1={padding} y1={openY} x2={width - padding} y2={openY}
        stroke="#9ca3af" strokeWidth="0.5" strokeDasharray="2,2"
      />
      {/* Price line */}
      <polyline
        points={polyline}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Current price dot */}
      <circle
        cx={parseFloat(points[points.length - 1].split(',')[0])}
        cy={parseFloat(points[points.length - 1].split(',')[1])}
        r="2"
        fill={strokeColor}
      />
    </svg>
  )
}

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

          {/* Intraday chart */}
          {item.chartData && item.chartData.length > 1 && (
            <div className="mt-4 h-32 rounded-lg overflow-hidden bg-muted/30 p-2">
              <MiniChart data={item.chartData} isPositive={isPositive} />
            </div>
          )}
          {item.chartData && (
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1 px-1">
              <span>09:00</span>
              <span>12:00</span>
              <span>15:30</span>
            </div>
          )}
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
                <a
                  key={stock.ticker}
                  href={`https://finance.naver.com/item/main.naver?code=${stock.ticker}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors"
                >
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
                </a>
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
