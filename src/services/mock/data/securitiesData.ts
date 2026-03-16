import { Platform } from '@/types/common'
import { NaverSecuritiesItem } from '@/types/feed'

const articles = [
  {
    headline: '삼성전자, AI 반도체 투자 확대...주가 상승세',
    source: '한국경제',
    stockName: '삼성전자',
    stockTicker: '005930',
  },
  {
    headline: 'SK하이닉스, HBM4 양산 본격화',
    source: '매일경제',
    stockName: 'SK하이닉스',
    stockTicker: '000660',
  },
  {
    headline: '코스피 3,000 돌파...외국인 매수세 지속',
    source: '조선비즈',
    stockName: undefined,
    stockTicker: undefined,
  },
  {
    headline: 'LG에너지솔루션, 미국 공장 증설 계획 발표',
    source: '서울경제',
    stockName: 'LG에너지솔루션',
    stockTicker: '373220',
  },
  {
    headline: '현대차, 전기차 신모델 사전예약 10만대 돌파',
    source: '이데일리',
    stockName: '현대차',
    stockTicker: '005380',
  },
  {
    headline: '네이버, 글로벌 AI 서비스 확장 전략 공개',
    source: '디지털타임스',
    stockName: '네이버',
    stockTicker: '035420',
  },
  {
    headline: '카카오, 핀테크 사업부 실적 호조',
    source: '한국경제',
    stockName: '카카오',
    stockTicker: '035720',
  },
  {
    headline: '바이오 섹터 강세...셀트리온·삼성바이오 동반 상승',
    source: '매일경제',
    stockName: '셀트리온',
    stockTicker: '068270',
  },
]

export function generateSecuritiesItems(count: number): NaverSecuritiesItem[] {
  const items: NaverSecuritiesItem[] = []
  const now = Date.now()

  for (let i = 0; i < count; i++) {
    const article = articles[i % articles.length]
    const hoursAgo = Math.floor(Math.random() * 48)
    const priceChange = (Math.random() - 0.4) * 10
    const changePercent = (Math.random() - 0.4) * 5

    items.push({
      id: `sec-${i}-${Date.now()}`,
      platform: Platform.NAVER_SECURITIES,
      title: article.headline,
      timestamp: new Date(now - hoursAgo * 3600000).toISOString(),
      url: `https://finance.naver.com/news/news_read.naver?article_id=mock${i}`,
      thumbnailUrl: `https://picsum.photos/seed/sec-${i}/400/200`,
      tags: ['증권', article.source, ...(article.stockName ? [article.stockName] : [])],
      headline: article.headline,
      source: article.source,
      stockTicker: article.stockTicker,
      stockName: article.stockName,
      priceChange: Math.round(priceChange * 100) / 100,
      priceChangePercent: Math.round(changePercent * 100) / 100,
      summary: `${article.headline} - ${article.source} 보도에 따르면 관련 종목들의 움직임이 활발합니다.`,
      relatedStocks: [
        { ticker: '005930', name: '삼성전자', change: Math.round((Math.random() - 0.4) * 500) },
        { ticker: '000660', name: 'SK하이닉스', change: Math.round((Math.random() - 0.4) * 300) },
      ],
    })
  }

  return items
}
