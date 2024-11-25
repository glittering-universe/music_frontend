"use client"

import { useState } from "react"
import { List, X } from "lucide-react"
import Image from "next/image"
import { usePlayer } from "@/hooks/usePlayer"
import type { Song } from "@/hooks/usePlayer"
import { QueueItem } from "./QueueItem"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { motion, AnimatePresence } from "framer-motion"

export function QueueManager() {
  const { queue, currentSong, setCurrentSong, reorderQueue } = usePlayer()
  const [isOpen, setIsOpen] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = queue.findIndex((song) => song.id === active.id)
      const newIndex = queue.findIndex((song) => song.id === over.id)
      reorderQueue(oldIndex, newIndex)
    }
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <List className="w-5 h-5" />
        <AnimatePresence>
          {queue.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center"
            >
              {queue.length}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute bottom-full right-0 mb-2 w-80 bg-[#282828] rounded-lg shadow-xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-bold">播放队列</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {currentSong && (
              <div className="p-4 border-b border-white/10">
                <div className="text-sm text-white/60 mb-2">正在播放</div>
                <div className="flex items-center gap-3">
                  <Image
                    src={currentSong.cover}
                    alt={currentSong.title}
                    width={48}
                    height={48}
                    className="rounded"
                  />
                  <div>
                    <div className="font-medium">{currentSong.title}</div>
                    <div className="text-sm text-white/60">{currentSong.artist}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="max-h-96 overflow-y-auto">
              {queue.length > 0 ? (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={queue.map((song) => song.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {queue.map((song) => (
                      <QueueItem
                        key={song.id}
                        song={song}
                        onPlay={setCurrentSong}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              ) : (
                <div className="p-4 text-center text-white/60">
                  队列中没有歌曲
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 