'use client'

import { useFilteredFeed } from '@/hooks/useFilteredFeed'
import { PLATFORM_ORDER } from '@/lib/constants'
import { platformConfigs } from '@/lib/platformConfig'
import { FeedCard } from '@/components/feed/FeedCard'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Platform } from '@/types/common'
import {
  Youtube,
  Palette,
  TrendingUp,
  AtSign,
  Camera,
} from 'lucide-react'

const platformIcons: Record<Platform, React.ReactNode> = {
  [Platform.YOUTUBE]: <Youtube className="h-4 w-4" />,
  [Platform.NAVER_EXHIBITION]: <Palette className="h-4 w-4" />,
  [Platform.NAVER_SECURITIES]: <TrendingUp className="h-4 w-4" />,
  [Platform.THREADS]: <AtSign className="h-4 w-4" />,
  [Platform.INSTAGRAM]: <Camera className="h-4 w-4" />,
}

export function MasonryGrid() {
  const grouped = useFilteredFeed()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4">
      {PLATFORM_ORDER.map((platform) => {
        const config = platformConfigs[platform]
        const items = grouped[platform]

        return (
          <div key={platform} className="flex flex-col min-w-0">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-sm mb-2 border"
              style={{
                color: config.color,
              }}
            >
              {platformIcons[platform]}
              <span>{config.labelKo}</span>
              {items.length > 0 && (
                <span className="ml-auto text-xs opacity-70">
                  {items.length}
                </span>
              )}
            </div>

            <ScrollArea className="flex-1">
              <div className="space-y-3">
                {items.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    게시물이 없습니다
                  </div>
                ) : (
                  items.map((item) => (
                    <FeedCard key={item.id} item={item} />
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        )
      })}
    </div>
  )
}
