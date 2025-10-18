"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { TeacherSidebar } from "@/components/teacher-sidebar"
import { TeacherCourseCard } from "@/components/teacher-course-card"
import { Button } from "@/components/ui/button"
import { mockCourses } from "@/lib/mock-data"
import { Plus } from "lucide-react"

export default function TeacherCoursesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = getCurrentUser()
    if (!user || user.role !== "teacher") {
      router.push("/login")
      return
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex h-screen bg-background">
      <TeacherSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-foreground">My Courses</h1>
              <p className="text-muted-foreground">Manage and organize your courses</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Course
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockCourses.map((course) => (
              <TeacherCourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
