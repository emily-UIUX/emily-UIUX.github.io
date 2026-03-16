import { IFeedService } from './types'
import { MockFeedService } from './mock/mockFeedService'

let serviceInstance: IFeedService | null = null

export function getFeedService(): IFeedService {
  if (!serviceInstance) {
    serviceInstance = new MockFeedService()
  }
  return serviceInstance
}
