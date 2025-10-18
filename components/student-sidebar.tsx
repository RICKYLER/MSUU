"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth"
import { useRouter } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { name: "My Courses", href: "/student/courses", icon: BookOpen },
  { name: "Calendar", href: "/student/calendar", icon: Calendar },
  { name: "Assignments", href: "/student/assignments", icon: FileText },
  { name: "Messages", href: "/student/messages", icon: MessageSquare },
  { name: "Settings", href: "/student/settings", icon: Settings },
]

export function StudentSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-border p-4">
        <Image src="/msu-logo.png" alt="MSU Logo" width={40} height={40} className="h-10 w-10" />
        <div>
          <h2 className="text-sm font-bold text-foreground">MSU ELMS</h2>
          <p className="text-xs text-muted-foreground">Student Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-border p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Juan Dela Cruz</p>
            <p className="text-xs text-muted-foreground">2024-00001</p>
          </div>
        </div>
        <Button onClick={handleLogout} variant="outline" size="sm" className="w-full bg-transparent">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
