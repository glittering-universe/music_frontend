"use client"

import { Home, Compass, Library, Crown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const pathname = usePathname()
  
  const navItems = [
    { icon: Home, label: "首页", href: "/" },
    { icon: Compass, label: "探索", href: "/explore" },
    { icon: Library, label: "资料库", href: "/library" },
    { icon: Crown, label: "升级", href: "/upgrade" },
  ]

  return (
    <aside className="w-60 bg-black h-full p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <Image
          src="/vercel.svg"
          alt="Logo"
          width={30}
          height={30}
          className="dark:invert"
        />
        <span className="text-xl font-bold">Music</span>
      </div>
      
      <nav className="flex flex-col gap-2">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? "bg-white/10 text-white" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
} 