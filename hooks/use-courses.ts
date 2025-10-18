/**
 * Courses Hook
 *
 * Custom hook for fetching and managing course data
 */

"use client"

import { useEffect, useState } from "react"
import type { Course } from "@/lib/types"
import { getStudentCourses, getTeacherCourses, getAllCourses } from "@/lib/api/courses.api"

export function useCourses(userId?: string, role?: "student" | "teacher" | "admin") {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true)
        let data: Course[] = []

        if (role === "student" && userId) {
          data = await getStudentCourses(userId)
        } else if (role === "teacher" && userId) {
          data = await getTeacherCourses(userId)
        } else if (role === "admin") {
          data = await getAllCourses()
        }

        setCourses(data)
      } catch (err) {
        setError("Failed to load courses")
        console.error("[v0] Error fetching courses:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [userId, role])

  return { courses, loading, error }
}
