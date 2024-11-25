import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./components/layout/Sidebar";
import { MusicPlayer } from "./components/layout/MusicPlayer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "音乐流媒体平台",
  description: "发现和收听数百万首歌曲、播客和音频内容",
  keywords: "音乐,播放器,流媒体,播客",
  openGraph: {
    title: "音乐流媒体平台",
    description: "发现和收听数百万首歌曲、播客和音频内容",
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "音乐流媒体平台",
    description: "发现和收听数百万首歌曲、播客和音频内容",
    images: ['/og-image.jpg'],
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <div className="flex h-screen bg-[#030303] text-white">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <main className="flex-1 overflow-auto">
              {children}
            </main>
            <MusicPlayer />
          </div>
        </div>
      </body>
    </html>
  );
}
