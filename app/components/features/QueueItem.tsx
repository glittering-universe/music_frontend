"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Music2 } from "lucide-react"
import Image from "next/image"
import type { Song } from "@/hooks/usePlayer"
import { motion } from "framer-motion"

interface QueueItemProps {
  song: Song
  onPlay: (song: Song) => void
}

export function QueueItem({ song, onPlay }: QueueItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: song.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 hover:bg-white/5 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
    >
      <button className="p-1 opacity-0 group-hover:opacity-100 cursor-grab" {...attributes} {...listeners}>
        <GripVertical className="w-4 h-4 text-white/60" />
      </button>
      <Image
        src={song.cover}
        alt={song.title}
        width={40}
        height={40}
        className="rounded"
      />
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{song.title}</div>
        <div className="text-sm text-white/60 truncate">{song.artist}</div>
      </div>
      <button
        onClick={() => onPlay(song)}
        className="p-2 hover:bg-white/10 rounded-full opacity-0 group-hover:opacity-100"
      >
        <Music2 className="w-4 h-4" />
      </button>
    </motion.div>
  )
} 