import { Platform } from '@/types/common'
import { NaverExhibitionItem } from '@/types/feed'

const exhibitions = [
  {
    title: '모네: 빛을 그리다',
    venue: '예술의전당 한가람미술관',
    address: '서울 서초구 남부순환로 2406',
    category: '미술',
    price: '15,000원',
  },
  {
    title: '이건희 컬렉션 특별전',
    venue: '국립중앙박물관',
    address: '서울 용산구 서빙고로 137',
    category: '미술',
    price: '무료',
  },
  {
    title: '디지털 아트: 미래의 예술',
    venue: '동대문디자인플라자',
    address: '서울 중구 을지로 281',
    category: '디지털아트',
    price: '18,000원',
  },
  {
    title: '한국 현대미술의 흐름',
    venue: '국립현대미술관 서울',
    address: '서울 종로구 삼청로 30',
    category: '현대미술',
    price: '4,000원',
  },
  {
    title: '사진전: 서울의 사계',
    venue: '서울시립미술관',
    address: '서울 중구 덕수궁길 61',
    category: '사진',
    price: '무료',
  },
  {
    title: '일본 우키요에 특별전',
    venue: '세종문화회관',
    address: '서울 종로구 세종대로 175',
    category: '미술',
    price: '12,000원',
  },
  {
    title: '팀랩: 무한의 세계',
    venue: '코엑스 전시홀',
    address: '서울 강남구 영동대로 513',
    category: '디지털아트',
    price: '22,000원',
  },
  {
    title: '한국 도자기의 아름다움',
    venue: '국립중앙박물관',
    address: '서울 용산구 서빙고로 137',
    category: '공예',
    price: '무료',
  },
]

export function generateExhibitionItems(count: number): NaverExhibitionItem[] {
  const items: NaverExhibitionItem[] = []
  const now = Date.now()

  for (let i = 0; i < count; i++) {
    const ex = exhibitions[i % exhibitions.length]
    const startDaysAgo = Math.floor(Math.random() * 30)
    const durationDays = Math.floor(Math.random() * 90) + 30
    const startDate = new Date(now - startDaysAgo * 86400000)
    const endDate = new Date(startDate.getTime() + durationDays * 86400000)

    items.push({
      id: `ex-${i}-${Date.now()}`,
      platform: Platform.NAVER_EXHIBITION,
      title: ex.title,
      timestamp: new Date(now - Math.floor(Math.random() * 168) * 3600000).toISOString(),
      url: `https://search.naver.com/search.naver?query=${encodeURIComponent(ex.title)}`,
      thumbnailUrl: `https://picsum.photos/seed/ex-${i}/400/600`,
      tags: ['전시', ex.category, ex.venue],
      venue: ex.venue,
      address: ex.address,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      price: ex.price,
      category: ex.category,
      description: `${ex.title} 전시가 ${ex.venue}에서 진행됩니다. ${ex.category} 분야의 작품들을 감상하실 수 있습니다.`,
      posterUrl: `https://picsum.photos/seed/ex-poster-${i}/400/600`,
    })
  }

  return items
}
