"use client"

import { Search, Disc, Radio, Podcast, TrendingUp, PlayCircle } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

const categories = [
  { icon: Disc, label: "音乐", color: "from-purple-500 to-blue-500" },
  { icon: Radio, label: "电台", color: "from-pink-500 to-rose-500" },
  { icon: Podcast, label: "播客", color: "from-green-500 to-emerald-500" },
]

const trendingPlaylists = [
  { id: 1, title: "流行热歌", image: "https://picsum.photos/400/400?random=10", plays: "1.2M" },
  { id: 2, title: "独立民谣", image: "https://picsum.photos/400/400?random=11", plays: "890K" },
  { id: 3, title: "电子音乐", image: "https://picsum.photos/400/400?random=12", plays: "650K" },
  { id: 4, title: "古典音乐", image: "https://picsum.photos/400/400?random=13", plays: "450K" },
]

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState(0)

  return (
    <div className="p-8">
      {/* Hero Banner */}
      <motion.section 
        className="relative h-[40vh] mb-12 rounded-3xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src="https://picsum.photos/1920/1080?random=explore"
          alt="Explore banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center p-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-4">探索新世界</h1>
            <p className="text-xl text-white/80 mb-8 max-w-xl">
              发现最新音乐、播客和电台。让音乐带你探索无限可能。
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories */}
      <motion.section
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.label}
              className={`relative h-40 rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-r ${category.color}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(index)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <category.icon className="w-12 h-12 absolute right-6 bottom-6 opacity-20" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold">{category.label}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Trending Now */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-6 h-6" />
          <h2 className="text-2xl font-bold">正在流行</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trendingPlaylists.map((playlist) => (
            <motion.div
              key={playlist.id}
              className="group relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                <Image
                  src={playlist.image}
                  alt={playlist.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <PlayCircle className="w-12 h-12" />
                </div>
              </div>
              <h3 className="font-medium">{playlist.title}</h3>
              <p className="text-sm text-white/60">{playlist.plays} 次播放</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
} 