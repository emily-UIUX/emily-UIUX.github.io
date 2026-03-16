'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useFeedStore } from '@/stores/feedStore'
import { Platform } from '@/types/common'
import { FeedItem } from '@/types/feed'
import { YouTubeDetail } from '@/components/feed/youtube/YouTubeDetail'
import { InstagramDetail } from '@/components/feed/instagram/InstagramDetail'
import { ThreadsDetail } from '@/components/feed/threads/ThreadsDetail'
import { ExhibitionDetail } from '@/components/feed/naver-exhibition/ExhibitionDetail'
import { SecuritiesDetail } from '@/components/feed/naver-securities/SecuritiesDetail'
import { ArrowLeft, Loader2 } from 'lucide-react'

export default function DetailPage() {
  const params = useParams<{ platform: string; id: string }>()
  const router = useRouter()
  const markSeen = useFeedStore((s) => s.markSeen)
  const storeItems = useFeedStore((s) => s.items)
  const addItems = useFeedStore((s) => s.addItems)
  const [item, setItem] = useState<FeedItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = params.id
    const platform = params.platform

    // Try store first
    const storeItem = storeItems[id]
    if (storeItem) {
      setItem(storeItem)
      setLoading(false)
      markSeen(id)
      return
    }

    // Fetch from API
    async function fetchItem() {
      try {
        const res = await fetch(`/api/feed/${platform}/${id}`)
        if (res.ok) {
          const data = await res.json()
          setItem(data)
          addItems([data])
          markSeen(id)
        }
      } catch (err) {
        console.error('Failed to fetch item:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchItem()
  }, [params.id, params.platform, storeItems, markSeen, addItems])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-muted-foreground">게시물을 찾을 수 없습니다</p>
        <button onClick={() => router.back()} className="text-sm text-primary hover:underline">
          돌아가기
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        뒤로가기
      </button>

      {item.platform === Platform.YOUTUBE && <YouTubeDetail item={item} />}
      {item.platform === Platform.INSTAGRAM && <InstagramDetail item={item} />}
      {item.platform === Platform.THREADS && <ThreadsDetail item={item} />}
      {item.platform === Platform.NAVER_EXHIBITION && <ExhibitionDetail item={item} />}
      {item.platform === Platform.NAVER_SECURITIES && <SecuritiesDetail item={item} />}
    </div>
  )
}
