/**
 * Responsive Sidebar Component
 *
 * Desktop sidebar that automatically hides on mobile
 * Mobile users will use the hamburger menu instead
 */

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

export interface SidebarItem {
  href: string
  label: string
  icon: LucideIcon
}

interface ResponsiveSidebarProps {
  items: SidebarItem[]
  role: "student" | "teacher" | "admin"
}

export function ResponsiveSidebar({ items, role }: ResponsiveSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-gray-200">
      <div className="flex flex-col flex-1 min-h-0 pt-5 pb-4 overflow-y-auto">
        <nav className="flex-1 px-3 space-y-1">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  isActive ? "bg-[#7B2D26] text-white" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <Icon className={cn("mr-3 h-5 w-5", isActive ? "text-white" : "text-gray-500")} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="px-3 pt-4 border-t border-gray-200">
          <Link
            href="/"
            onClick={() => localStorage.removeItem("currentUser")}
            className="group flex items-center px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Logout
          </Link>
        </div>
      </div>
    </aside>
  )
}
