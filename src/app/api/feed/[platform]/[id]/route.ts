import { NextRequest, NextResponse } from 'next/server'
import { getFeedService } from '@/services/feedService'
import { Platform } from '@/types/common'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string; id: string }> }
) {
  const { platform, id } = await params
  const service = getFeedService()

  const item = await service.getItemById(platform as Platform, id)

  if (!item) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(item)
}
