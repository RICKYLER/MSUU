/**
 * Authentication API Service
 *
 * This file contains all authentication-related API calls.
 * Replace the mock implementations with real backend API calls.
 *
 * Example backend integration:
 * - Replace localStorage with HTTP requests to your backend
 * - Add proper error handling and validation
 * - Implement token refresh logic
 */

import type { User, UserRole } from "@/lib/types"

export interface LoginCredentials {
  email: string
  password: string
  role: UserRole
}

export interface AuthResponse {
  success: boolean
  user?: User
  error?: string
}

/**
 * Login user with credentials against backend
 */
export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })

    const data = (await res.json()) as AuthResponse
    if (!res.ok || !data.success) {
      return { success: false, error: data.error || "Login failed" }
    }

    // Store user for client-side convenience; server also sets cookie
    if (typeof window !== "undefined" && data.user) {
      localStorage.setItem("currentUser", JSON.stringify(data.user))
    }

    return data
  } catch (e) {
    return { success: false, error: "Network error" }
  }
}

/**
 * Logout current user
 * For cookie-based auth, you may add an API route to clear cookie.
 */
export async function logoutUser(): Promise<void> {
  localStorage.removeItem("currentUser")
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const userStr = localStorage.getItem("currentUser")
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

export function hasRole(role: UserRole): boolean {
  const user = getCurrentUser()
  return user?.role === role
}
