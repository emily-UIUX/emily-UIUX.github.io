import { Platform } from '@/types/common'
import { ThreadsItem } from '@/types/feed'

const accounts = [
  { name: 'mark.tech', avatar: 'https://i.pravatar.cc/40?u=mark.tech' },
  { name: 'design.daily', avatar: 'https://i.pravatar.cc/40?u=design.daily' },
  { name: 'seoul.stories', avatar: 'https://i.pravatar.cc/40?u=seoul.stories' },
  { name: 'dev.insights', avatar: 'https://i.pravatar.cc/40?u=dev.insights' },
]

const posts = [
  {
    text: '오늘 배운 것: 좋은 디자인은 보이지 않는 것이다. 사용자가 의식하지 못할 정도로 자연스러워야 한다.',
    imageUrl: null,
  },
  {
    text: 'AI가 개발자를 대체할까? 아니, AI를 잘 활용하는 개발자가 그렇지 못한 개발자를 대체할 것이다.',
    imageUrl: null,
  },
  {
    text: '서울에서 가장 좋아하는 카페 5곳을 공유합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=640&h=640&fit=crop',
  },
  {
    text: 'React vs Vue in 2026? 정답은 없다. 프로젝트에 맞는 도구를 선택하는 것이 중요하다.',
    imageUrl: null,
  },
  {
    text: '오늘 아침 한강 러닝 10km 완주! 봄 날씨가 최고다',
    imageUrl: 'https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=640&h=640&fit=crop',
  },
  {
    text: '새로운 프로젝트를 시작했습니다. TypeScript + Next.js로 풀스택 앱을 만들어 보려고 합니다.',
    imageUrl: null,
  },
  {
    text: '디자인 시스템을 구축하면서 배운 3가지: 일관성, 확장성, 그리고 문서화의 중요성.',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=640&h=640&fit=crop',
  },
  {
    text: '주말에 읽은 책 추천: "생각에 관한 생각" - 다니엘 카너먼. 인지 편향에 대해 깊이 이해할 수 있었습니다.',
    imageUrl: null,
  },
]

export function generateThreadsItems(count: number): ThreadsItem[] {
  const items: ThreadsItem[] = []
  const now = Date.now()

  for (let i = 0; i < count; i++) {
    const account = accounts[i % accounts.length]
    const post = posts[i % posts.length]
    const hoursAgo = Math.floor(Math.random() * 168)
    const timestamp = new Date(now - hoursAgo * 3600000).toISOString()

    items.push({
      id: `th-${i}-${Date.now()}`,
      platform: Platform.THREADS,
      title: `${account.name}의 스레드`,
      timestamp,
      url: `https://www.threads.net/@${account.name}`,
      thumbnailUrl: post.imageUrl ?? '',
      tags: ['스레드', account.name],
      accountName: account.name,
      accountAvatarUrl: account.avatar,
      textContent: post.text,
      likeCount: Math.floor(Math.random() * 5000) + 10,
      replyCount: Math.floor(Math.random() * 200) + 1,
      repostCount: Math.floor(Math.random() * 100) + 1,
      imageUrls: post.imageUrl ? [post.imageUrl] : undefined,
    })
  }

  return items
}
