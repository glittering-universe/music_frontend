"use client"

import { Clock, Heart, Download, PlayCircle, Plus } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

const collections = [
  { id: 1, title: "我喜欢的音乐", count: 128, icon: Heart, color: "from-red-500 to-pink-500" },
  { id: 2, title: "最近播放", count: 45, icon: Clock, color: "from-blue-500 to-indigo-500" },
  { id: 3, title: "离线音乐", count: 67, icon: Download, color: "from-green-500 to-emerald-500" },
]

export default function LibraryPage() {
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
          src="https://picsum.photos/1920/1080?random=library"
          alt="Library banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-4">我的音乐库</h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              这里收藏了您最喜爱的音乐，随时畅听。
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Collections */}
      <motion.section
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              className={`relative h-48 rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br ${collection.color}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <collection.icon className="w-8 h-8" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">{collection.title}</h3>
                  <p className="text-white/80">{collection.count} 首歌曲</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Create Playlist Button */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <motion.button
          className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-6 h-6" />
          创建新播放列表
        </motion.button>
      </motion.div>
    </div>
  )
} 