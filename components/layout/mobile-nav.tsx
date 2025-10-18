/**
 * Mobile Navigation Component
 *
 * Responsive hamburger menu for mobile devices
 */

"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface MobileNavProps {
  role?: "student" | "teacher" | "admin"
  userName?: string
}

export function MobileNav({ role, userName }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  const getNavItems = () => {
    if (!role) {
      return [
        { href: "/", label: "Home" },
        { href: "/login?role=student", label: "Student Portal" },
        { href: "/login?role=teacher", label: "Faculty Portal" },
        { href: "/login?role=admin", label: "Admin Portal" },
      ]
    }

    const baseItems = [
      { href: `/${role}/dashboard`, label: "Dashboard" },
      { href: `/${role}/courses`, label: "Courses" },
    ]

    if (role === "student") {
      return [
        ...baseItems,
        { href: "/student/calendar", label: "Calendar" },
        { href: "/student/assignments", label: "Assignments" },
        { href: "/student/messages", label: "Messages" },
        { href: "/student/settings", label: "Settings" },
      ]
    }

    if (role === "teacher") {
      return [
        ...baseItems,
        { href: "/teacher/students", label: "Students" },
        { href: "/teacher/assignments", label: "Assignments" },
        { href: "/teacher/analytics", label: "Analytics" },
        { href: "/teacher/settings", label: "Settings" },
      ]
    }

    if (role === "admin") {
      return [
        ...baseItems,
        { href: "/admin/users", label: "Users" },
        { href: "/admin/students", label: "Students" },
        { href: "/admin/reports", label: "Reports" },
        { href: "/admin/analytics", label: "Analytics" },
        { href: "/admin/settings", label: "Settings" },
      ]
    }

    return baseItems
  }

  const navItems = getNavItems()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[320px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[#7B2D26]">Menu</h2>
            {userName && <p className="text-sm text-gray-600">{userName}</p>}
          </div>

          <nav className="flex flex-col space-y-2 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {role && (
            <div className="pt-4 border-t">
              <Link
                href="/"
                onClick={() => {
                  localStorage.removeItem("currentUser")
                  setOpen(false)
                }}
                className="block px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-center font-medium"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
