/**
 * Page Header Component
 *
 * Reusable header for dashboard pages with mobile support
 */

"use client"

import { MobileNav } from "./mobile-nav"
import { Button } from "@/components/ui/button"
import { Bell, Search } from "lucide-react"
import Image from "next/image"

interface PageHeaderProps {
  role?: "student" | "teacher" | "admin"
  userName?: string
  title?: string
}

export function PageHeader({ role, userName, title }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Left: Mobile menu + Logo */}
        <div className="flex items-center gap-3">
          <MobileNav role={role} userName={userName} />
          <div className="flex items-center gap-2">
            <Image src="/msu-logo.png" alt="MSU Logo" width={32} height={32} className="w-8 h-8" />
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold text-[#7B2D26]">MSU Buug</h1>
              {title && <p className="text-xs text-gray-600">{title}</p>}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          {userName && (
            <div className="hidden md:flex items-center gap-2 ml-2">
              <div className="w-8 h-8 rounded-full bg-[#7B2D26] text-white flex items-center justify-center text-sm font-medium">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-700">{userName}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
