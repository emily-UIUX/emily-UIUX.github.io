import { Platform } from '@/types/common'
import { InstagramItem } from '@/types/feed'

const accounts = [
  { name: 'seoul.daily', avatar: 'https://i.pravatar.cc/40?u=seoul.daily' },
  { name: 'cafe.hopping', avatar: 'https://i.pravatar.cc/40?u=cafe.hopping' },
  { name: 'korean.art', avatar: 'https://i.pravatar.cc/40?u=korean.art' },
  { name: 'travel.korea', avatar: 'https://i.pravatar.cc/40?u=travel.korea' },
  { name: 'food.seoul', avatar: 'https://i.pravatar.cc/40?u=food.seoul' },
]

// Curated Unsplash photo IDs for realistic images
const photoSets = [
  { // Seoul cityscape
    photos: ['https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=640&h=640&fit=crop'],
    caption: '오늘의 서울 하늘 #seoul #daily #sky',
  },
  { // Cafe
    photos: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=640&h=640&fit=crop'],
    caption: '새로 오픈한 카페 다녀왔어요 #cafe #newopen',
  },
  { // Art exhibition
    photos: ['https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=640&h=640&fit=crop'],
    caption: '전시회 관람 후기 #art #exhibition',
  },
  { // Jeju island
    photos: [
      'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=640&h=640&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=640&h=640&fit=crop',
    ],
    caption: '제주도 숨은 명소 발견! #jeju #travel',
  },
  { // Korean food
    photos: ['https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=640&h=640&fit=crop'],
    caption: '망원시장 먹방 #food #market #seoul',
  },
  { // Fashion
    photos: ['https://images.unsplash.com/photo-1483985988355-763728e1935b?w=640&h=640&fit=crop'],
    caption: '봄 코디 추천 #fashion #spring #ootd',
  },
  { // Han River night
    photos: ['https://images.unsplash.com/photo-1546874177-9e664107314e?w=640&h=640&fit=crop'],
    caption: '한강 야경이 너무 예뻐요 #hangang #night',
  },
  { // Home cafe
    photos: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=640&h=640&fit=crop'],
    caption: '홈카페 레시피 공유 #homecafe #recipe',
  },
]

export function generateInstagramItems(count: number): InstagramItem[] {
  const items: InstagramItem[] = []
  const now = Date.now()

  for (let i = 0; i < count; i++) {
    const account = accounts[i % accounts.length]
    const photoSet = photoSets[i % photoSets.length]
    const hoursAgo = Math.floor(Math.random() * 168)
    const timestamp = new Date(now - hoursAgo * 3600000).toISOString()
    const isStory = i % 5 === 0

    items.push({
      id: `ig-${i}-${Date.now()}`,
      platform: Platform.INSTAGRAM,
      title: `${account.name}의 게시물`,
      timestamp,
      url: `https://www.instagram.com/${account.name}/`,
      thumbnailUrl: photoSet.photos[0],
      tags: ['인스타그램', account.name],
      accountName: account.name,
      accountAvatarUrl: account.avatar,
      imageUrls: photoSet.photos,
      caption: photoSet.caption,
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
