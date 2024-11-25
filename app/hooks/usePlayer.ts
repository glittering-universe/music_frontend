import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { songs } from '@/data/songs'

// 自定义数组移动函数
function moveArrayElement<T>(array: T[], from: number, to: number): T[] {
  const copy = [...array]
  const [removed] = copy.splice(from, 1)
  copy.splice(to, 0, removed)
  return copy
}

export interface Song {
  id: number
  title: string
  artist: string
  cover: string
  duration: number
}

interface PlayerState {
  currentSong: Song | null
  isPlaying: boolean
  volume: number
  progress: number
  queue: Song[]
  setCurrentSong: (song: Song) => void
  togglePlay: () => void
  setVolume: (volume: number) => void
  setProgress: (progress: number | ((prev: number) => number)) => void
  addToQueue: (song: Song) => void
  playNext: () => void
  playPrevious: () => void
  reorderQueue: (oldIndex: number, newIndex: number) => void
}

export const usePlayer = create<PlayerState>()(
  persist(
    (set, get) => ({
      currentSong: null,
      isPlaying: false,
      volume: 1,
      progress: 0,
      queue: [],
      
      setCurrentSong: (song: Song) => {
        set({
          currentSong: song,
          isPlaying: true,
          progress: 0
        })
      },
      
      togglePlay: () => {
        set((state) => ({
          isPlaying: !state.isPlaying
        }))
      },
      
      setVolume: (volume: number) => {
        set({ volume })
      },
      
      setProgress: (progress: number | ((prev: number) => number)) => {
        set((state) => ({
          progress: typeof progress === 'function' ? progress(state.progress) : progress
        }))
      },
      
      addToQueue: (song: Song) => {
        set((state) => ({
          queue: [...state.queue, song]
        }))
      },
      
      playNext: () => {
        const state = get()
        const currentIndex = songs.findIndex(song => song.id === state.currentSong?.id)
        const nextSong = songs[currentIndex + 1] || songs[0]
        set({
          currentSong: nextSong,
          progress: 0,
          isPlaying: true
        })
      },
      
      playPrevious: () => {
        const state = get()
        const currentIndex = songs.findIndex(song => song.id === state.currentSong?.id)
        const previousSong = songs[currentIndex - 1] || songs[songs.length - 1]
        set({
          currentSong: previousSong,
          progress: 0,
          isPlaying: true
        })
      },

      reorderQueue: (oldIndex: number, newIndex: number) => {
        set((state) => ({
          queue: moveArrayElement(state.queue, oldIndex, newIndex)
        }))
      }
    }),
    {
      name: 'player-storage',
      partialize: (state) => ({
        volume: state.volume,
        queue: state.queue
      })
    }
  )
) 