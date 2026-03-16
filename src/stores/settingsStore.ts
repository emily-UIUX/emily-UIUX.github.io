'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Platform } from '@/types/common'
import { generateId } from '@/lib/utils'

// Bump when default subscriptions structure changes
const SETTINGS_VERSION = 2

export interface SubscriptionItem {
  id: string
  platform: Platform
  type: 'channel' | 'keyword' | 'region' | 'artist'
  value: string
  label: string
  enabled: boolean
  createdAt: string
}

interface SettingsState {
  subscriptions: SubscriptionItem[]
  settingsVersion: number

  addSubscription: (platform: Platform, type: 'channel' | 'keyword' | 'region' | 'artist', value: string, label?: string) => void
  removeSubscription: (id: string) => void
  toggleSubscription: (id: string) => void
  getSubscriptions: (platform: Platform) => SubscriptionItem[]
  getEnabledValues: (platform: Platform) => { channels: string[]; keywords: string[]; regions: string[]; artists: string[] }
  hasAnySubscriptions: (platform: Platform) => boolean
}

const DEFAULT_SUBSCRIPTIONS: Omit<SubscriptionItem, 'id' | 'createdAt'>[] = [
  // YouTube
  { platform: Platform.YOUTUBE, type: 'channel', value: '뉴진스 공식', label: '뉴진스 공식', enabled: true },
  { platform: Platform.YOUTUBE, type: 'channel', value: '백종원의 요리비책', label: '백종원의 요리비책', enabled: true },
  { platform: Platform.YOUTUBE, type: 'channel', value: 'MKBHD', label: 'MKBHD', enabled: true },
  // OpenGallery Exhibition
  { platform: Platform.NAVER_EXHIBITION, type: 'region', value: '서울', label: '서울', enabled: true },
  { platform: Platform.NAVER_EXHIBITION, type: 'region', value: '부산', label: '부산', enabled: true },
  { platform: Platform.NAVER_EXHIBITION, type: 'artist', value: '김환기', label: '김환기', enabled: true },
  { platform: Platform.NAVER_EXHIBITION, type: 'artist', value: '이우환', label: '이우환', enabled: true },
  // Naver Securities
  { platform: Platform.NAVER_SECURITIES, type: 'keyword', value: '삼성전자', label: '삼성전자', enabled: true },
  { platform: Platform.NAVER_SECURITIES, type: 'keyword', value: 'AI', label: 'AI', enabled: true },
  // Threads
  { platform: Platform.THREADS, type: 'channel', value: 'mark.tech', label: 'mark.tech', enabled: true },
  { platform: Platform.THREADS, type: 'channel', value: 'design.daily', label: 'design.daily', enabled: true },
  // Instagram
  { platform: Platform.INSTAGRAM, type: 'channel', value: 'seoul.daily', label: 'seoul.daily', enabled: true },
  { platform: Platform.INSTAGRAM, type: 'channel', value: 'cafe.hopping', label: 'cafe.hopping', enabled: true },
]

function createDefaultSubscriptions(): SubscriptionItem[] {
  return DEFAULT_SUBSCRIPTIONS.map((s) => ({
    ...s,
    id: generateId(),
    createdAt: new Date().toISOString(),
  }))
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      subscriptions: createDefaultSubscriptions(),
      settingsVersion: SETTINGS_VERSION,

      addSubscription: (platform, type, value, label) => {
        const trimmed = value.trim()
        if (!trimmed) return

        // Prevent duplicates
        const existing = get().subscriptions
        if (existing.some((s) => s.platform === platform && s.value === trimmed)) return

        set((state) => ({
          subscriptions: [
            ...state.subscriptions,
            {
              id: generateId(),
              platform,
              type,
              value: trimmed,
              label: label?.trim() || trimmed,
              enabled: true,
              createdAt: new Date().toISOString(),
            },
          ],
        }))
      },

      removeSubscription: (id) =>
        set((state) => ({
          subscriptions: state.subscriptions.filter((s) => s.id !== id),
        })),

      toggleSubscription: (id) =>
        set((state) => ({
          subscriptions: state.subscriptions.map((s) =>
            s.id === id ? { ...s, enabled: !s.enabled } : s
          ),
        })),

      getSubscriptions: (platform) =>
        get().subscriptions.filter((s) => s.platform === platform),

      getEnabledValues: (platform) => {
        const subs = get().subscriptions.filter((s) => s.platform === platform && s.enabled)
        return {
          channels: subs.filter((s) => s.type === 'channel').map((s) => s.value),
          keywords: subs.filter((s) => s.type === 'keyword').map((s) => s.value),
          regions: subs.filter((s) => s.type === 'region').map((s) => s.value),
          artists: subs.filter((s) => s.type === 'artist').map((s) => s.value),
        }
      },

      hasAnySubscriptions: (platform) =>
        get().subscriptions.some((s) => s.platform === platform && s.enabled),
    }),
    {
      name: 'feed-settings',
      version: SETTINGS_VERSION,
      migrate: (persisted: unknown, version: number) => {
        if (version < SETTINGS_VERSION) {
          // Reset to defaults when version changes
          return {
            subscriptions: createDefaultSubscriptions(),
            settingsVersion: SETTINGS_VERSION,
          }
        }
        return persisted as SettingsState
      },
    }
  )
)
