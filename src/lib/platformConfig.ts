import { Platform, PlatformConfig } from '@/types/common'

export const platformConfigs: Record<Platform, PlatformConfig> = {
  [Platform.YOUTUBE]: {
    id: Platform.YOUTUBE,
    label: 'YouTube',
    labelKo: '유튜브',
    color: '#FF0000',
    bgColor: '#FEE2E2',
    icon: 'youtube',
  },
  [Platform.NAVER_EXHIBITION]: {
    id: Platform.NAVER_EXHIBITION,
    label: 'OpenGallery',
    labelKo: '오픈갤러리',
    color: '#1a1a1a',
    bgColor: '#F3F4F6',
    icon: 'palette',
  },
  [Platform.NAVER_SECURITIES]: {
    id: Platform.NAVER_SECURITIES,
    label: 'Naver Securities',
    labelKo: '네이버 증권',
    color: '#03C75A',
    bgColor: '#D1FAE5',
    icon: 'trending-up',
  },
  [Platform.THREADS]: {
    id: Platform.THREADS,
    label: 'Threads',
    labelKo: '스레드',
    color: '#000000',
    bgColor: '#F3F4F6',
    icon: 'at-sign',
  },
  [Platform.INSTAGRAM]: {
    id: Platform.INSTAGRAM,
    label: 'Instagram',
    labelKo: '인스타그램',
    color: '#E1306C',
    bgColor: '#FCE7F3',
    icon: 'camera',
  },
}
