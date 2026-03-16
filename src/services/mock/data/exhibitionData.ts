import { Platform } from '@/types/common'
import { NaverExhibitionItem } from '@/types/feed'

const exhibitions = [
  {
    title: '김환기: 어디서 무엇이 되어 다시 만나랴',
    venue: '오픈갤러리 서울',
    address: '서울 강남구 테헤란로 415',
    category: '회화',
    price: '20,000원',
    artist: '김환기',
    region: '서울',
  },
  {
    title: '이우환: 관계항',
    venue: '오픈갤러리 부산',
    address: '부산 해운대구 달맞이길 65',
    category: '현대미술',
    price: '15,000원',
    artist: '이우환',
    region: '부산',
  },
  {
    title: '박서보: 묘법의 세계',
    venue: '오픈갤러리 서울',
    address: '서울 종로구 삼청로 30',
    category: '추상화',
    price: '18,000원',
    artist: '박서보',
    region: '서울',
  },
  {
    title: '쿠사마 야요이: 무한 거울방',
    venue: '오픈갤러리 제주',
    address: '제주 서귀포시 안덕면 산록남로 762',
    category: '설치미술',
    price: '25,000원',
    artist: '쿠사마 야요이',
    region: '제주',
  },
  {
    title: '데이비드 호크니: 봄의 도래',
    venue: '오픈갤러리 서울',
    address: '서울 용산구 이태원로 45',
    category: '회화',
    price: '22,000원',
    artist: '데이비드 호크니',
    region: '서울',
  },
  {
    title: '천경자: 꽃과 여인',
    venue: '오픈갤러리 대구',
    address: '대구 중구 달구벌대로 2209',
    category: '한국화',
    price: '12,000원',
    artist: '천경자',
    region: '대구',
  },
  {
    title: '장 미셸 바스키아: 그래피티의 왕',
    venue: '오픈갤러리 서울',
    address: '서울 강남구 영동대로 513',
    category: '현대미술',
    price: '28,000원',
    artist: '장 미셸 바스키아',
    region: '서울',
  },
  {
    title: '이중섭: 소와 아이들',
    venue: '오픈갤러리 부산',
    address: '부산 중구 대청로 121',
    category: '한국화',
    price: '10,000원',
    artist: '이중섭',
    region: '부산',
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
      url: `https://www.opengallery.co.kr/exhibition/`,
      thumbnailUrl: `https://picsum.photos/seed/ex-${i}/400/300`,
      tags: ['전시', ex.category, ex.artist, ex.region],
      venue: ex.venue,
      address: ex.address,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      price: ex.price,
      category: ex.category,
      description: `${ex.artist} 작가의 "${ex.title}" 전시가 ${ex.venue}에서 진행됩니다. ${ex.category} 분야의 작품들을 감상하실 수 있습니다.`,
      posterUrl: `https://picsum.photos/seed/ex-poster-${i}/400/300`,
      artist: ex.artist,
      region: ex.region,
    })
  }

  return items
}
