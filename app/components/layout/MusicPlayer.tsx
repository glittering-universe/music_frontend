"use client"

import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle } from "lucide-react"
import Image from "next/image"
import { usePlayer } from "@/hooks/usePlayer"
import { useState, useEffect } from "react"
import { QueueManager } from "@/components/features/QueueManager"

export function MusicPlayer() {
  const { 
    currentSong, 
    isPlaying, 
    volume, 
    progress, 
    togglePlay, 
    setVolume,
    setProgress,
    playNext,
    playPrevious
  } = usePlayer()
  
  const [isMuted, setIsMuted] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)

  // 模拟播放进度
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && currentSong) {
      interval = setInterval(() => {
        setProgress((prev: number) => {
          if (prev >= currentSong.duration) {
            if (isRepeat) {
              return 0
            } else {
              playNext()
              return 0
            }
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentSong, isRepeat, setProgress, playNext])

  const handleVolumeClick = () => {
    setIsMuted(!isMuted)
    setVolume(isMuted ? 1 : 0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentSong) return
    const bounds = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - bounds.left) / bounds.width
    setProgress(currentSong.duration * percent)
  }

  return (
    <div className="h-20 border-t border-white/10 bg-[#030303] px-4">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Now Playing */}
        <div className="flex items-center gap-4 w-72">
          {currentSong ? (
            <>
              <div className="relative w-12 h-12">
                <Image
                  src={currentSong.cover}
                  alt={`${currentSong.title} cover`}
                  fill
                  className="rounded object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium line-clamp-1">{currentSong.title}</h4>
                <p className="text-sm text-white/60 line-clamp-1">{currentSong.artist}</p>
              </div>
            </>
          ) : (
            <div className="text-white/40">未在播放</div>
          )}
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsShuffle(!isShuffle)}
              className={`transition-colors ${
                isShuffle ? 'text-red-500' : 'text-white/60 hover:text-white'
              }`}
            >
              <Shuffle className="w-5 h-5" />
            </button>
            <button 
              onClick={playPrevious}
              className="text-white/60 hover:text-white transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button 
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:bg-white/90 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>
            <button 
              onClick={playNext}
              className="text-white/60 hover:text-white transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsRepeat(!isRepeat)}
              className={`transition-colors ${
                isRepeat ? 'text-red-500' : 'text-white/60 hover:text-white'
              }`}
            >
              <Repeat className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2 w-96">
            <span className="text-xs text-white/60">
              {formatTime(progress)}
            </span>
            <div 
              className="relative flex-1 h-1 group cursor-pointer"
              onClick={handleProgressClick}
            >
              <div className="absolute inset-y-0 -left-2 -right-2 flex items-center opacity-0 group-hover:opacity-100">
                <div className="w-full h-2 bg-white/10 rounded-full">
                  <div 
                    className="h-full bg-white rounded-full"
                    style={{ 
                      width: `${currentSong ? (progress / currentSong.duration * 100) : 0}%` 
                    }}
                  />
                </div>
              </div>
              <div className="h-full bg-white/10 rounded-full">
                <div 
                  className="h-full bg-white rounded-full"
                  style={{ 
                    width: `${currentSong ? (progress / currentSong.duration * 100) : 0}%` 
                  }}
                />
              </div>
            </div>
            <span className="text-xs text-white/60">
              {currentSong ? formatTime(currentSong.duration) : '--:--'}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 w-72 justify-end">
          <QueueManager />
          <button 
            onClick={handleVolumeClick}
            className="text-white/60 hover:text-white transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          <div className="relative w-24 h-1 group cursor-pointer">
            <div className="absolute inset-y-0 -left-2 -right-2 flex items-center opacity-0 group-hover:opacity-100">
              <div className="w-full h-2 bg-white/10 rounded-full">
                <div 
                  className="h-full bg-white rounded-full"
                  style={{ width: `${volume * 100}%` }}
                />
              </div>
            </div>
            <div className="h-full bg-white/10 rounded-full">
              <div 
                className="h-full bg-white rounded-full"
                style={{ width: `${volume * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 