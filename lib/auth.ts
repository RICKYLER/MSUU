import { mockUsers } from "./mock-data"
import type { User } from "./types"

export function authenticateUser(email: string, password: string): User | null {
  const user = mockUsers.find((u) => u.email === email && u.password === password)
  return user || null
}

export function setCurrentUser(user: User) {
  if (typeof window !== "undefined") {
    localStorage.setItem("currentUser", JSON.stringify(user))
  }
}

export function getCurrentUser(): User | null {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("currentUser")
    return userStr ? JSON.parse(userStr) : null
  }
  return null
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser")
  }
}
