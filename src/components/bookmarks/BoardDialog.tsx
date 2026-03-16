'use client'

import { useState } from 'react'
import { useBookmarkStore } from '@/stores/bookmarkStore'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface BoardDialogProps {
  onClose: () => void
  onCreated?: (boardId: string) => void
}

export function BoardDialog({ onClose, onCreated }: BoardDialogProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const createBoard = useBookmarkStore((s) => s.createBoard)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    const id = createBoard(name.trim(), description.trim() || undefined)
    onCreated?.(id)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-card rounded-xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4">새 보드 만들기</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="보드 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <Input
            placeholder="설명 (선택사항)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              <Plus className="h-4 w-4 mr-1" />
              만들기
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
