import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'

export const metadata: Metadata = {
  title: 'FeedFlow - 통합 피드 애그리게이터',
  description: '유튜브, 인스타그램, 스레드, 네이버 전시, 네이버 증권을 한곳에서',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="antialiased font-sans">
        <Header />
        <main className="min-h-[calc(100vh-3.5rem)]">
          {children}
        </main>
      </body>
    </html>
  )
}
