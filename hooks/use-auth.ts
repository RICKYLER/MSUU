/**
 * Authentication Hook
 *
 * Custom hook for managing authentication state
 * Makes it easy to check auth status across components
 */

"use client"

import { useEffect, useState } from "react"
import type { User } from "@/lib/types"
import { getCurrentUser, isAuthenticated } from "@/lib/api/auth.api"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  return {
    user,
    loading,
    isAuthenticated: isAuthenticated(),
    isStudent: user?.role === "student",
    isTeacher: user?.role === "teacher",
    isAdmin: user?.role === "admin",
  }
}
