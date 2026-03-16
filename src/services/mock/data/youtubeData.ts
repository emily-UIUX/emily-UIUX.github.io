import { Platform } from '@/types/common'
import { YouTubeItem } from '@/types/feed'

// Real YouTube video IDs for realistic thumbnails and working links
const videos = [
  {
    videoId: 'dQw4w9WgXcQ',
    title: 'Rick Astley - Never Gonna Give You Up',
    channelName: 'Rick Astley',
    duration: '3:33',
  },
  {
    videoId: 'JGwWNGJdvx8',
    title: 'Ed Sheeran - Shape of You',
    channelName: 'Ed Sheeran',
    duration: '4:24',
  },
  {
    videoId: '9bZkp7q19f0',
    title: 'PSY - GANGNAM STYLE',
    channelName: 'officialpsy',
    duration: '4:13',
  },
  {
    videoId: 'kJQP7kiw5Fk',
    title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
    channelName: 'Luis Fonsi',
    duration: '4:42',
  },
  {
    videoId: 'RgKAFK5djSk',
    title: 'Wiz Khalifa - See You Again ft. Charlie Puth',
    channelName: 'Wiz Khalifa',
    duration: '3:58',
  },
  {
    videoId: 'OPf0YbXqDm0',
    title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
    channelName: 'Mark Ronson',
    duration: '4:30',
  },
  {
    videoId: 'fJ9rUzIMcZQ',
    title: 'Queen - Bohemian Rhapsody',
    channelName: 'Queen Official',
    duration: '5:55',
  },
  {
    videoId: 'CevxZvSJLk8',
    title: 'Katy Perry - Roar',
    channelName: 'Katy Perry',
    duration: '4:30',
  },
  {
    videoId: 'YQHsXMglC9A',
    title: 'Adele - Hello',
    channelName: 'Adele',
    duration: '6:07',
  },
  {
    videoId: 'hT_nvWreIhg',
    title: 'OneRepublic - Counting Stars',
    channelName: 'OneRepublic',
    duration: '4:44',
  },
]

export function generateYouTubeItems(count: number): YouTubeItem[] {
  const items: YouTubeItem[] = []
  const now = Date.now()

  for (let i = 0; i < count; i++) {
    const video = videos[i % videos.length]
    const hoursAgo = Math.floor(Math.random() * 168)
    const timestamp = new Date(now - hoursAgo * 3600000).toISOString()

    items.push({
      id: `yt-${i}-${Date.now()}`,
      platform: Platform.YOUTUBE,
      title: video.title,
      timestamp,
      url: `https://www.youtube.com/watch?v=${video.videoId}`,
      thumbnailUrl: `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`,
      tags: ['영상', video.channelName],
      channelName: video.channelName,
      channelAvatarUrl: `https://img.youtube.com/vi/${video.videoId}/default.jpg`,
      viewCount: Math.floor(Math.random() * 1000000) + 1000,
      duration: video.duration,
      description: `${video.title} - ${video.channelName}`,
      likeCount: Math.floor(Math.random() * 50000) + 100,
      commentCount: Math.floor(Math.random() * 5000) + 10,
    })
  }

  return items
}
