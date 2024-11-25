"use client"

import { useState } from "react"
import { X, Upload } from "lucide-react"
import Image from "next/image"

interface CreatePlaylistDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; description: string }) => void
}

export function CreatePlaylistDialog({
  isOpen,
  onClose,
  onSubmit,
}: CreatePlaylistDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [coverPreview, setCoverPreview] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, description })
    onClose()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#282828] rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">创建新播放列表</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="relative w-32 h-32 bg-white/5 rounded-lg flex items-center justify-center group">
              {coverPreview ? (
                <Image
                  src={coverPreview}
                  alt="Cover preview"
                  fill
                  className="object-cover rounded-lg"
                />
              ) : (
                <Upload className="w-8 h-8 text-white/60" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-sm">更改封面</span>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="播放列表名称"
                className="w-full bg-white/5 rounded px-3 py-2 outline-none focus:bg-white/10"
                required
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="添加描述"
                className="w-full bg-white/5 rounded px-3 py-2 outline-none focus:bg-white/10 resize-none h-20"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full hover:bg-white/10"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-white text-black hover:bg-white/90"
            >
              创建
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 