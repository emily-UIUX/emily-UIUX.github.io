import { Platform } from '@/types/common'
import { ThreadsItem } from '@/types/feed'

const accounts = [
  { name: 'mark.tech', avatar: 'https://picsum.photos/seed/th-acc1/40/40' },
  { name: 'design.daily', avatar: 'https://picsum.photos/seed/th-acc2/40/40' },
  { name: 'seoul.stories', avatar: 'https://picsum.photos/seed/th-acc3/40/40' },
  { name: 'dev.insights', avatar: 'https://picsum.photos/seed/th-acc4/40/40' },
]

const texts = [
  '오늘 배운 것: 좋은 디자인은 보이지 않는 것이다. 사용자가 의식하지 못할 정도로 자연스러워야 한다.',
  'AI가 개발자를 대체할까? 아니, AI를 잘 활용하는 개발자가 그렇지 못한 개발자를 대체할 것이다.',
  '서울에서 가장 좋아하는 카페 5곳을 공유합니다. 첫 번째는 성수동에 있는...',
  'React vs Vue in 2026? 정답은 없다. 프로젝트에 맞는 도구를 선택하는 것이 중요하다.',
  '오늘 아침 한강 러닝 10km 완주! 봄 날씨가 최고다 🏃‍♂️',
  '새로운 프로젝트를 시작했습니다. TypeScript + Next.js로 풀스택 앱을 만들어 보려고 합니다.',
  '디자인 시스템을 구축하면서 배운 3가지: 일관성, 확장성, 그리고 문서화의 중요성.',
  '주말에 읽은 책 추천: "생각에 관한 생각" - 다니엘 카너먼. 인지 편향에 대해 깊이 이해할 수 있었습니다.',
]

export function generateThreadsItems(count: number): ThreadsItem[] {
  const items: ThreadsItem[] = []
  const now = Date.now()

  for (let i = 0; i < count; i++) {
    const account = accounts[i % accounts.length]
    const hoursAgo = Math.floor(Math.random() * 168)
    const timestamp = new Date(now - hoursAgo * 3600000).toISOString()
    const hasImage = i % 3 === 0

    items.push({
      id: `th-${i}-${Date.now()}`,
      platform: Platform.THREADS,
      title: `${account.name}의 스레드`,
      timestamp,
      url: `https://threads.net/@${account.name}/post/mock${i}`,
      thumbnailUrl: hasImage ? `https://picsum.photos/seed/th-${i}/640/640` : '',
      tags: ['스레드', account.name],
      accountName: account.name,
      accountAvatarUrl: account.avatar,
      textContent: texts[i % texts.length],
      likeCount: Math.floor(Math.random() * 5000) + 10,
      replyCount: Math.floor(Math.random() * 200) + 1,
      repostCount: Math.floor(Math.random() * 100) + 1,
      imageUrls: hasImage ? [`https://picsum.photos/seed/th-${i}/640/640`] : undefined,
    })
  }

  return items
}
