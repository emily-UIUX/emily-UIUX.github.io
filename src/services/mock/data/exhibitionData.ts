import { Platform } from '@/types/common'
import { NaverExhibitionItem } from '@/types/feed'

const exhibitions = [
  {
    title: '김환기: 어디서 무엇이 되어 다시 만나랴',
    venue: '환기미술관',
    address: '서울 종로구 자하문로40길 63',
    category: '회화',
    price: '10,000원',
    artist: '김환기',
    region: '서울',
    poster: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=300&fit=crop',
    siteUrl: 'https://www.whankimuseum.org/',
  },
  {
    title: '이우환: 관계항 - 침묵과 여백',
    venue: '리움미술관',
    address: '서울 용산구 이태원로55길 60-16',
    category: '현대미술',
    price: '16,000원',
    artist: '이우환',
    region: '서울',
    poster: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400&h=300&fit=crop',
    siteUrl: 'https://www.leeum.org/',
  },
  {
    title: '박서보: 묘법의 세계',
    venue: '국제갤러리',
    address: '서울 종로구 소격동 59-1',
    category: '추상화',
    price: '무료',
    artist: '박서보',
    region: '서울',
    poster: 'https://images.unsplash.com/photo-1577720643272-265f09367456?w=400&h=300&fit=crop',
    siteUrl: 'https://www.kukjegallery.com/',
  },
  {
    title: '쿠사마 야요이: 무한 거울방',
    venue: '아모레퍼시픽미술관',
    address: '서울 용산구 한강대로 100',
    category: '설치미술',
    price: '18,000원',
    artist: '쿠사마 야요이',
    region: '서울',
    poster: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&h=300&fit=crop',
    siteUrl: 'https://apma.amorepacific.com/',
  },
  {
    title: '데이비드 호크니: 봄의 도래',
    venue: '부산시립미술관',
    address: '부산 해운대구 APEC로 58',
    category: '회화',
    price: '15,000원',
    artist: '데이비드 호크니',
    region: '부산',
    poster: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop',
    siteUrl: 'https://art.busan.go.kr/busanmoa/',
  },
  {
    title: '천경자: 꽃과 여인',
    venue: '대구미술관',
    address: '대구 수성구 미술관로 40',
    category: '한국화',
    price: '8,000원',
    artist: '천경자',
    region: '대구',
    poster: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop',
    siteUrl: 'https://artmuseum.daegu.go.kr/',
  },
  {
    title: '장 미셸 바스키아: 그래피티의 왕',
    venue: '아트선재센터',
    address: '서울 종로구 율곡로3길 3',
    category: '현대미술',
    price: '12,000원',
    artist: '장 미셸 바스키아',
    region: '서울',
    poster: 'https://images.unsplash.com/photo-1561214078-f3247647fc5e?w=400&h=300&fit=crop',
    siteUrl: 'https://www.artsonje.org/',
  },
  {
    title: '이중섭: 소와 아이들',
    venue: '제주도립미술관',
    address: '제주 제주시 1100로 2894-78',
    category: '한국화',
    price: '5,000원',
    artist: '이중섭',
    region: '제주',
    poster: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
    siteUrl: 'https://jmoa.jeju.go.kr/',
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
      url: ex.siteUrl,
      thumbnailUrl: ex.poster,
      tags: ['전시', ex.category, ex.artist, ex.region],
      venue: ex.venue,
      address: ex.address,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      price: ex.price,
      category: ex.category,
      description: `${ex.artist} 작가의 "${ex.title}" 전시가 ${ex.venue}에서 진행됩니다. ${ex.category} 분야의 작품들을 감상하실 수 있습니다.`,
      posterUrl: ex.poster,
      artist: ex.artist,
      region: ex.region,
    })
  }

  return items
}
