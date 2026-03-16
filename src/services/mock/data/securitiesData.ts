import { Platform } from '@/types/common'
import { NaverSecuritiesItem } from '@/types/feed'

const allStocks = [
  { ticker: '005930', name: '삼성전자', openingPrice: 71200 },
  { ticker: '000660', name: 'SK하이닉스', openingPrice: 178000 },
  { ticker: '373220', name: 'LG에너지솔루션', openingPrice: 385000 },
  { ticker: '005380', name: '현대차', openingPrice: 234500 },
  { ticker: '035420', name: '네이버', openingPrice: 215000 },
  { ticker: '035720', name: '카카오', openingPrice: 52300 },
  { ticker: '068270', name: '셀트리온', openingPrice: 183500 },
  { ticker: '207940', name: '삼성바이오로직스', openingPrice: 780000 },
]

const articles = [
  {
    headline: '삼성전자, AI 반도체 투자 확대...주가 상승세',
    source: '한국경제',
    stockIndex: 0, // 삼성전자
    relatedIndices: [1, 2], // SK하이닉스, LG에너지솔루션
  },
  {
    headline: 'SK하이닉스, HBM4 양산 본격화',
    source: '매일경제',
    stockIndex: 1,
    relatedIndices: [0, 7], // 삼성전자, 삼성바이오
  },
  {
    headline: '코스피 3,000 돌파...외국인 매수세 지속',
    source: '조선비즈',
    stockIndex: -1, // no main stock
    relatedIndices: [0, 4], // 삼성전자, 네이버
  },
  {
    headline: 'LG에너지솔루션, 미국 공장 증설 계획 발표',
    source: '서울경제',
    stockIndex: 2,
    relatedIndices: [3, 0], // 현대차, 삼성전자
  },
  {
    headline: '현대차, 전기차 신모델 사전예약 10만대 돌파',
    source: '이데일리',
    stockIndex: 3,
    relatedIndices: [2, 5], // LG에너지솔루션, 카카오
  },
  {
    headline: '네이버, 글로벌 AI 서비스 확장 전략 공개',
    source: '디지털타임스',
    stockIndex: 4,
    relatedIndices: [5, 0], // 카카오, 삼성전자
  },
  {
    headline: '카카오, 핀테크 사업부 실적 호조',
    source: '한국경제',
    stockIndex: 5,
    relatedIndices: [4, 3], // 네이버, 현대차
  },
  {
    headline: '바이오 섹터 강세...셀트리온·삼성바이오 동반 상승',
    source: '매일경제',
    stockIndex: 6,
    relatedIndices: [7, 4], // 삼성바이오, 네이버
  },
]

function generateCurrentPrice(openingPrice: number): number {
  const changeRatio = (Math.random() - 0.45) * 0.08
  return Math.round(openingPrice * (1 + changeRatio))
}

// Generate intraday price points for chart
function generateChartData(openingPrice: number, currentPrice: number, points: number = 24): number[] {
  const prices: number[] = [openingPrice]
  const diff = currentPrice - openingPrice

  for (let i = 1; i < points - 1; i++) {
    const progress = i / (points - 1)
    const trend = openingPrice + diff * progress
    const noise = openingPrice * (Math.random() - 0.5) * 0.02
    prices.push(Math.round(trend + noise))
  }

  prices.push(currentPrice)
  return prices
}

export function generateSecuritiesItems(count: number): NaverSecuritiesItem[] {
  const items: NaverSecuritiesItem[] = []
  const now = Date.now()

  for (let i = 0; i < count; i++) {
    const article = articles[i % articles.length]
    const hoursAgo = Math.floor(Math.random() * 48)

    const mainStock = article.stockIndex >= 0 ? allStocks[article.stockIndex] : null
    const openingPrice = mainStock?.openingPrice
    const currentPrice = openingPrice ? generateCurrentPrice(openingPrice) : undefined
    const priceChange = openingPrice && currentPrice ? currentPrice - openingPrice : undefined
    const priceChangePercent = openingPrice && priceChange ? (priceChange / openingPrice) * 100 : undefined

    const stockUrl = mainStock?.ticker
      ? `https://finance.naver.com/item/main.naver?code=${mainStock.ticker}`
      : 'https://finance.naver.com/sise/'

    // Build unique related stocks from article-specific indices
    const relatedStocks = article.relatedIndices.map((idx) => {
      const s = allStocks[idx]
      const cp = generateCurrentPrice(s.openingPrice)
      return { ticker: s.ticker, name: s.name, openingPrice: s.openingPrice, currentPrice: cp }
    })

    // Chart data
    const chartData = openingPrice && currentPrice
      ? generateChartData(openingPrice, currentPrice)
      : undefined

    items.push({
      id: `sec-${i}-${Date.now()}`,
      platform: Platform.NAVER_SECURITIES,
      title: article.headline,
      timestamp: new Date(now - hoursAgo * 3600000).toISOString(),
      url: stockUrl,
      thumbnailUrl: '',
      tags: ['증권', article.source, ...(mainStock ? [mainStock.name] : [])],
      headline: article.headline,
      source: article.source,
      stockTicker: mainStock?.ticker,
      stockName: mainStock?.name,
      openingPrice,
      currentPrice,
      priceChange: priceChange != null ? Math.round(priceChange) : undefined,
      priceChangePercent: priceChangePercent != null ? Math.round(priceChangePercent * 100) / 100 : undefined,
      summary: `${article.headline} - ${article.source} 보도에 따르면 관련 종목들의 움직임이 활발합니다.`,
      relatedStocks,
      chartData,
    })
  }

  return items
}
