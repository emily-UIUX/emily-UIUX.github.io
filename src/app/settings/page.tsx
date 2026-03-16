'use client'

import { useState, useMemo } from 'react'
import { useSettingsStore, SubscriptionItem } from '@/stores/settingsStore'
import { Platform } from '@/types/common'
import { PLATFORM_ORDER } from '@/lib/constants'
import { platformConfigs } from '@/lib/platformConfig'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  Settings,
  Plus,
  X,
  Youtube,
  Palette,
  TrendingUp,
  AtSign,
  Camera,
  User,
  Hash,
  MapPin,
  Paintbrush,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'

const platformIcons: Record<Platform, React.ReactNode> = {
  [Platform.YOUTUBE]: <Youtube className="h-5 w-5" />,
  [Platform.NAVER_EXHIBITION]: <Palette className="h-5 w-5" />,
  [Platform.NAVER_SECURITIES]: <TrendingUp className="h-5 w-5" />,
  [Platform.THREADS]: <AtSign className="h-5 w-5" />,
  [Platform.INSTAGRAM]: <Camera className="h-5 w-5" />,
}

type SubscriptionType = 'channel' | 'keyword' | 'region' | 'artist'

interface TypeConfig {
  types: { key: SubscriptionType; label: string; icon: React.ReactNode }[]
}

const platformTypeConfigs: Record<Platform, TypeConfig> = {
  [Platform.YOUTUBE]: {
    types: [
      { key: 'channel', label: '채널명', icon: <User className="h-3 w-3" /> },
      { key: 'keyword', label: '키워드', icon: <Hash className="h-3 w-3" /> },
    ],
  },
  [Platform.NAVER_EXHIBITION]: {
    types: [
      { key: 'region', label: '지역', icon: <MapPin className="h-3 w-3" /> },
      { key: 'artist', label: '작가', icon: <Paintbrush className="h-3 w-3" /> },
    ],
  },
  [Platform.NAVER_SECURITIES]: {
    types: [
      { key: 'channel', label: '종목명', icon: <User className="h-3 w-3" /> },
      { key: 'keyword', label: '키워드', icon: <Hash className="h-3 w-3" /> },
    ],
  },
  [Platform.THREADS]: {
    types: [
      { key: 'channel', label: '계정', icon: <User className="h-3 w-3" /> },
      { key: 'keyword', label: '키워드', icon: <Hash className="h-3 w-3" /> },
    ],
  },
  [Platform.INSTAGRAM]: {
    types: [
      { key: 'channel', label: '계정', icon: <User className="h-3 w-3" /> },
      { key: 'keyword', label: '키워드', icon: <Hash className="h-3 w-3" /> },
    ],
  },
}

function PlatformSection({ platform }: { platform: Platform }) {
  const config = platformConfigs[platform]
  const typeConfig = platformTypeConfigs[platform]
  const allSubscriptions = useSettingsStore((s) => s.subscriptions)
  const addSubscription = useSettingsStore((s) => s.addSubscription)
  const removeSubscription = useSettingsStore((s) => s.removeSubscription)
  const toggleSubscription = useSettingsStore((s) => s.toggleSubscription)
  const subscriptions = useMemo(() => allSubscriptions.filter((sub) => sub.platform === platform), [allSubscriptions, platform])

  const [newValue, setNewValue] = useState('')
  const [newType, setNewType] = useState<SubscriptionType>(typeConfig.types[0].key)

  const handleAdd = () => {
    if (!newValue.trim()) return
    addSubscription(platform, newType, newValue)
    setNewValue('')
  }

  const currentTypeConfig = typeConfig.types.find((t) => t.key === newType)!

  return (
    <div className="border rounded-xl overflow-hidden">
      {/* Platform header */}
      <div
        className="flex items-center gap-3 px-4 py-3 font-semibold"
        style={{ backgroundColor: config.bgColor, color: config.color }}
      >
        {platformIcons[platform]}
        <span className="text-base">{config.labelKo}</span>
        <Badge variant="outline" className="ml-auto text-xs" style={{ borderColor: config.color, color: config.color }}>
          {subscriptions.filter((s) => s.enabled).length}개 활성
        </Badge>
      </div>

      <div className="p-4 space-y-4">
        {/* Add new */}
        <div className="flex gap-2">
          <div className="flex rounded-md border overflow-hidden">
            {typeConfig.types.map((t) => (
              <button
                key={t.key}
                onClick={() => setNewType(t.key)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1',
                  newType === t.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                )}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
          <Input
            placeholder={`${currentTypeConfig.label} 입력...`}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return
              if (e.key === 'Enter') handleAdd()
            }}
            className="flex-1"
          />
          <Button onClick={handleAdd} size="sm" disabled={!newValue.trim()}>
            <Plus className="h-4 w-4 mr-1" />
            추가
          </Button>
        </div>

        {/* Subscription lists grouped by type */}
        {typeConfig.types.map((t) => {
          const items = subscriptions.filter((s) => s.type === t.key)
          if (items.length === 0) return null
          return (
            <div key={t.key}>
              <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                {t.icon}
                {t.label}
              </h4>
              <div className="flex flex-wrap gap-2">
                {items.map((sub) => (
                  <SubscriptionChip key={sub.id} item={sub} onToggle={toggleSubscription} onRemove={removeSubscription} />
                ))}
              </div>
            </div>
          )
        })}

        {subscriptions.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            등록된 항목이 없습니다
          </p>
        )}
      </div>
    </div>
  )
}

function SubscriptionChip({
  item,
  onToggle,
  onRemove,
}: {
  item: SubscriptionItem
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-1.5 pl-3 pr-1 py-1 rounded-full border text-sm transition-colors',
        item.enabled
          ? 'bg-card border-border'
          : 'bg-muted/50 border-border/50 opacity-50'
      )}
    >
      <button
        onClick={() => onToggle(item.id)}
        className="hover:opacity-70 transition-opacity"
        title={item.enabled ? '비활성화' : '활성화'}
      >
        {item.enabled ? (
          <ToggleRight className="h-4 w-4 text-green-500" />
        ) : (
          <ToggleLeft className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      <span className={cn('text-xs', !item.enabled && 'line-through')}>{item.label}</span>
      <button
        onClick={() => onRemove(item.id)}
        className="p-0.5 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="h-6 w-6" />
        <h1 className="text-2xl font-bold">설정</h1>
      </div>

      <p className="text-muted-foreground mb-6">
        각 플랫폼에서 받아올 채널, 계정, 키워드를 등록하세요.
        활성화된 항목의 콘텐츠만 피드에 표시됩니다.
      </p>

      <div className="space-y-4">
        {PLATFORM_ORDER.map((platform) => (
          <PlatformSection key={platform} platform={platform} />
        ))}
      </div>
    </div>
  )
}
