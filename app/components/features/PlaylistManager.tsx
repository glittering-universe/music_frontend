"use client"

import { useState } from "react"
import { Plus, MoreVertical, Play } from "lucide-react"
import Image from "next/image"
import { usePlayer } from "@/hooks/usePlayer"
import { Song } from "@/hooks/usePlayer"
import { songs } from "@/data/songs"
import { CreatePlaylistDialog } from "./CreatePlaylistDialog"

export function PlaylistManager() {
  const { setCurrentSong, addToQueue } = usePlayer()
  const [isCreating, setIsCreating] = useState(false)

  const handlePlay = (song: Song) => {
    setCurrentSong(song)
  }

  const handleCreatePlaylist = (data: { name: string; description: string }) => {
    // TODO: 实现创建播放列表的逻辑
    console.log("Creating playlist:", data)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">我的播放列表</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>新建播放列表</span>
        </button>
      </div>

      <div className="grid gap-4">
        {songs.map((song) => (
          <div
            key={song.id}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 group"
          >
            <div className="relative w-12 h-12 group-hover:shadow-lg transition-shadow">
              <Image
                src={song.cover}
                alt={song.title}
                fill
                className="rounded object-cover"
              />
              <button
                onClick={() => handlePlay(song)}
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Play className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{song.title}</h3>
              <p className="text-sm text-white/60 truncate">{song.artist}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => addToQueue(song)}
                className="px-3 py-1 text-sm bg-white/10 rounded-full hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all"
              >
                添加到队列
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <CreatePlaylistDialog
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        onSubmit={handleCreatePlaylist}
      />
    </div>
  )
} 