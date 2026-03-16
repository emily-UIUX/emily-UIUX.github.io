import { Platform } from '@/types/common'
import { YouTubeItem } from '@/types/feed'

const channels = [
  { name: '뉴진스 공식', avatar: 'https://picsum.photos/seed/yt-ch1/40/40' },
  { name: '백종원의 요리비책', avatar: 'https://picsum.photos/seed/yt-ch2/40/40' },
  { name: 'TEDx Talks', avatar: 'https://picsum.photos/seed/yt-ch3/40/40' },
  { name: '서울의봄 공식', avatar: 'https://picsum.photos/seed/yt-ch4/40/40' },
  { name: 'MKBHD', avatar: 'https://picsum.photos/seed/yt-ch5/40/40' },
]

const titles = [
  'How I Made This Music Video | Behind The Scenes',
  '초간단 된장찌개 레시피 | 5분 완성',
  'The Future of AI in 2026',
  '봄날의 서울 산책 브이로그',
  'iPhone 18 Pro Review: Best Camera Yet?',
  '한국 전통시장 먹방 투어',
  'Why This Design Changed Everything',
  '제주도 3박 4일 여행 브이로그',
  'The Science Behind Color Theory',
  '2026 봄 패션 트렌드 총정리',
]

export function generateYouTubeItems(count: number): YouTubeItem[] {
  const items: YouTubeItem[] = []
  const now = Date.now()

  for (let i = 0; i < count; i++) {
    const channel = channels[i % channels.length]
    const hoursAgo = Math.floor(Math.random() * 168)
    const timestamp = new Date(now - hoursAgo * 3600000).toISOString()
    const minutes = Math.floor(Math.random() * 30) + 1
    const seconds = Math.floor(Math.random() * 60)

    items.push({
      id: `yt-${i}-${Date.now()}`,
      platform: Platform.YOUTUBE,
      title: titles[i % titles.length],
      timestamp,
      url: `https://youtube.com/watch?v=mock${i}`,
      thumbnailUrl: `https://picsum.photos/seed/yt-${i}/640/360`,
      tags: ['영상', channel.name],
      channelName: channel.name,
      channelAvatarUrl: channel.avatar,
      viewCount: Math.floor(Math.random() * 1000000) + 1000,
      duration: `${minutes}:${seconds.toString().padStart(2, '0')}`,
      description: `${titles[i % titles.length]}에 대한 설명입니다. 좋아요와 구독 부탁드립니다!`,
      likeCount: Math.floor(Math.random() * 50000) + 100,
      commentCount: Math.floor(Math.random() * 5000) + 10,
    })
  }

  return items
}
