import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Expressions — 영어 표현 아카이브",
  description: "기억하고 싶은 영어 표현을 큐레이션하고 다시 꺼내봐요.",
  appleWebApp: {
    capable: true,
    title: "Expressions",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0d12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="dark">
      <body>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
