"use client"

import { Search as SearchIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { songs } from "@/data/songs"
import { Song } from "@/hooks/usePlayer"

interface SearchBarProps {
  onSearch: (results: Song[]) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (query.trim()) {
      const results = songs.filter(
        song =>
          song.title.toLowerCase().includes(query.toLowerCase()) ||
          song.artist.toLowerCase().includes(query.toLowerCase())
      )
      onSearch(results)
    } else {
      onSearch([])
    }
  }, [query, onSearch])

  return (
    <div className="relative max-w-xl w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索音乐、艺术家..."
        className="w-full bg-white/10 rounded-full py-3 px-4 pl-12 outline-none focus:bg-white/20 transition-colors"
      />
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
    </div>
  )
} 