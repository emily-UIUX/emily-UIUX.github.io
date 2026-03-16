import { NextRequest, NextResponse } from 'next/server'
import { getFeedService } from '@/services/feedService'
import { Platform } from '@/types/common'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const platform = searchParams.get('platform') as Platform | null
  const after = searchParams.get('after')
  const limit = searchParams.get('limit')
  const search = searchParams.get('search')
  const generateNew = searchParams.get('generateNew')

  const service = getFeedService()

  if (generateNew && platform) {
    const newItem = await service.generateNewItem(platform)
    return NextResponse.json([newItem])
  }

  const items = await service.getItems({
    platform: platform || undefined,
    after: after || undefined,
    limit: limit ? parseInt(limit) : undefined,
    search: search || undefined,
  })

  return NextResponse.json(items)
}
