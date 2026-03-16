import { Platform } from '@/types/common'
import { InstagramItem } from '@/types/feed'

const accounts = [
  { name: 'seoul.daily', avatar: 'https://picsum.photos/seed/ig-acc1/40/40' },
  { name: 'cafe.hopping', avatar: 'https://picsum.photos/seed/ig-acc2/40/40' },
  { name: 'korean.art', avatar: 'https://picsum.photos/seed/ig-acc3/40/40' },
  { name: 'travel.korea', avatar: 'https://picsum.photos/seed/ig-acc4/40/40' },
  { name: 'food.seoul', avatar: 'https://picsum.photos/seed/ig-acc5/40/40' },
]

const captions = [
  '오늘의 서울 하늘 🌤️ #seoul #daily #sky',
  '새로 오픈한 카페 다녀왔어요 ☕ #cafe #newopen',
  '전시회 관람 후기 🎨 #art #exhibition',
  '제주도 숨은 명소 발견! 🏝️ #jeju #travel',
  '망원시장 먹방 🍜 #food #market #seoul',
  '봄 코디 추천 🌸 #fashion #spring #ootd',
  '한강 야경이 너무 예뻐요 🌃 #hangang #night',
  '홈카페 레시피 공유 ☕ #homecafe #recipe',
]

export function generateInstagramItems(count: number): InstagramItem[] {
  const items: InstagramItem[] = []
  const now = Date.now()

  for (let i = 0; i < count; i++) {
    const account = accounts[i % accounts.length]
    const hoursAgo = Math.floor(Math.random() * 168)
    const timestamp = new Date(now - hoursAgo * 3600000).toISOString()
    const isStory = i % 5 === 0
    const imageCount = isStory ? 1 : Math.floor(Math.random() * 3) + 1

    items.push({
      id: `ig-${i}-${Date.now()}`,
      platform: Platform.INSTAGRAM,
      title: `${account.name}의 게시물`,
      timestamp,
      url: `https://instagram.com/p/mock${i}`,
      thumbnailUrl: `https://picsum.photos/seed/ig-${i}/640/640`,
      tags: ['인스타그램', account.name],
      accountName: account.name,
      accountAvatarUrl: account.avatar,
      imageUrls: Array.from({ length: imageCount }, (_, j) =>
        `https://picsum.photos/seed/ig-${i}-${j}/640/640`
      ),
      caption: captions[i % captions.length],
      likeCount: Math.floor(Math.random() * 10000) + 50,
      commentCount: Math.floor(Math.random() * 500) + 5,
      isStory,
      storyExpiresAt: isStory
        ? new Date(now + 24 * 3600000).toISOString()
        : undefined,
    })
  }

  return items
}
