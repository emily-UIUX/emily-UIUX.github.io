'use client'

import { useState } from 'react'
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

const platformTypeLabels: Record<Platform, { channel: string; keyword: string }> = {
  [Platform.YOUTUBE]: { channel: '채널명', keyword: '키워드' },
  [Platform.NAVER_EXHIBITION]: { channel: '주최자', keyword: '키워드' },
  [Platform.NAVER_SECURITIES]: { channel: '종목명', keyword: '키워드' },
  [Platform.THREADS]: { channel: '계정', keyword: '키워드' },
  [Platform.INSTAGRAM]: { channel: '계정', keyword: '키워드' },
}

function PlatformSection({ platform }: { platform: Platform }) {
  const config = platformConfigs[platform]
  const typeLabels = platformTypeLabels[platform]
  const subscriptions = useSettingsStore((s) => s.subscriptions.filter((sub) => sub.platform === platform))
  const addSubscription = useSettingsStore((s) => s.addSubscription)
  const removeSubscription = useSettingsStore((s) => s.removeSubscription)
  const toggleSubscription = useSettingsStore((s) => s.toggleSubscription)

  const [newValue, setNewValue] = useState('')
  const [newType, setNewType] = useState<'channel' | 'keyword'>('channel')

  const handleAdd = () => {
    if (!newValue.trim()) return
    addSubscription(platform, newType, newValue)
    setNewValue('')
  }

  const channels = subscriptions.filter((s) => s.type === 'channel')
  const keywords = subscriptions.filter((s) => s.type === 'keyword')

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
            <button
              onClick={() => setNewType('channel')}
              className={cn(
                'px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1',
                newType === 'channel'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              <User className="h-3 w-3" />
              {typeLabels.channel}
            </button>
            <button
              onClick={() => setNewType('keyword')}
              className={cn(
                'px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1',
                newType === 'keyword'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              <Hash className="h-3 w-3" />
              {typeLabels.keyword}
            </button>
          </div>
          <Input
            placeholder={`${newType === 'channel' ? typeLabels.channel : typeLabels.keyword} 입력...`}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            className="flex-1"
          />
          <Button onClick={handleAdd} size="sm" disabled={!newValue.trim()}>
            <Plus className="h-4 w-4 mr-1" />
            추가
          </Button>
        </div>

        {/* Channels list */}
        {channels.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
              <User className="h-3 w-3" />
              {typeLabels.channel}
            </h4>
            <div className="flex flex-wrap gap-2">
              {channels.map((sub) => (
                <SubscriptionChip key={sub.id} item={sub} onToggle={toggleSubscription} onRemove={removeSubscription} />
              ))}
            </div>
          </div>
        )}

        {/* Keywords list */}
        {keywords.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
              <Hash className="h-3 w-3" />
              {typeLabels.keyword}
            </h4>
            <div className="flex flex-wrap gap-2">
              {keywords.map((sub) => (
                <SubscriptionChip key={sub.id} item={sub} onToggle={toggleSubscription} onRemove={removeSubscription} />
              ))}
            </div>
          </div>
        )}

        {subscriptions.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            등록된 {typeLabels.channel} 또는 {typeLabels.keyword}가 없습니다
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
