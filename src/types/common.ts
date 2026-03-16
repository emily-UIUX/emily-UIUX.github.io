export enum Platform {
  YOUTUBE = 'youtube',
  NAVER_EXHIBITION = 'naver-exhibition',
  NAVER_SECURITIES = 'naver-securities',
  THREADS = 'threads',
  INSTAGRAM = 'instagram',
}

export enum FilterTab {
  NEW = 'new',
  SEEN = 'seen',
  PAST = 'past',
}

export const FILTER_TAB_LABELS: Record<FilterTab, string> = {
  [FilterTab.NEW]: '새로운',
  [FilterTab.SEEN]: '이미 본',
  [FilterTab.PAST]: '지난',
}

export interface PlatformConfig {
  id: Platform
  label: string
  labelKo: string
  color: string
  bgColor: string
  icon: string
}
