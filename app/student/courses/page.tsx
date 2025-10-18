"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { StudentSidebar } from "@/components/student-sidebar"
import { CourseCard } from "@/components/course-card"
import { mockCourses, mockEnrollments } from "@/lib/mock-data"

export default function StudentCoursesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = getCurrentUser()
    if (!user || user.role !== "student") {
      router.push("/login")
      return
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  const enrolledCourses = mockCourses.filter((course) =>
    mockEnrollments.some((enrollment) => enrollment.courseId === course.id),
  )

  return (
    <div className="flex h-screen bg-background">
      <StudentSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-foreground">My Courses</h1>
            <p className="text-muted-foreground">View and manage all your enrolled courses</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
