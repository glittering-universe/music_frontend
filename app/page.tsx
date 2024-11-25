"use client"

import { PlayCircle, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { SearchBar } from "@/components/features/SearchBar"
import { PlaylistManager } from "@/components/features/PlaylistManager"
import { Song } from "@/hooks/usePlayer"
import { motion } from "framer-motion"

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<Song[]>([])

  return (
    <div className="p-8">
      {/* Search Section */}
      <section className="mb-8">
        <SearchBar onSearch={setSearchResults} />
      </section>

      {searchResults.length > 0 ? (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6">搜索结果</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {searchResults.map((song) => (
              <div key={song.id} className="group cursor-pointer">
                <div className="relative aspect-square mb-2">
                  <Image
                    src={song.cover}
                    alt={song.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-medium truncate">{song.title}</h3>
                <p className="text-sm text-white/60 truncate">{song.artist}</p>
              </div>
            ))}
          </div>
        </motion.section>
      ) : (
        <>
          {/* Hero Banner */}
          <motion.section 
            className="relative h-[60vh] mb-16 rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="https://picsum.photos/1920/1080?random=banner"
              alt="Featured playlist"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <h1 className="text-5xl font-bold mb-4">每周精选</h1>
                <p className="text-xl text-white/80 mb-8 max-w-2xl">
                  发现最新最热的音乐，让音乐带你进入一个全新的世界。现在开始探索属于你的音乐之旅。
                </p>
                <div className="flex items-center gap-4">
                  <motion.button
                    className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <PlayCircle className="w-6 h-6" />
                    立即播放
                  </motion.button>
                  <motion.button
                    className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-semibold hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    了解更多
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Continue Listening with Animation */}
          <motion.section 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6">继续收听</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  className="group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative aspect-square mb-2 rounded-lg overflow-hidden">
                    <Image
                      src={`https://picsum.photos/400/400?random=${i + 40}`}
                      alt="Album cover"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <PlayCircle className="w-12 h-12" />
                    </div>
                  </div>
                  <h3 className="font-medium truncate">最近播放的歌曲 {i}</h3>
                  <p className="text-sm text-white/60 truncate">艺术家名称</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Playlist Manager with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <PlaylistManager />
          </motion.div>
        </>
      )}
    </div>
  )
}
