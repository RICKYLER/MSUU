"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { TeacherSidebar } from "@/components/teacher-sidebar"
import { TeacherCourseCard } from "@/components/teacher-course-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockCourses, mockAssignments } from "@/lib/mock-data"
import { Users, BookOpen, FileText, Clock, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export default function TeacherDashboard() {
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

  const totalStudents = mockCourses.reduce((sum, course) => sum + course.enrolled, 0)
  const pendingGrading = 15

  return (
    <div className="flex h-screen bg-background">
      <TeacherSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-foreground">Welcome back, Prof. Santos!</h1>
            <p className="text-muted-foreground">Here's an overview of your courses and students.</p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockCourses.length}</p>
                  <p className="text-sm text-muted-foreground">Active Courses</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalStudents}</p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10">
                  <FileText className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockAssignments.length}</p>
                  <p className="text-sm text-muted-foreground">Assignments</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                  <AlertCircle className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingGrading}</p>
                  <p className="text-sm text-muted-foreground">Pending Grading</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Courses */}
            <div className="lg:col-span-2">
              <h2 className="mb-4 text-xl font-semibold">My Courses</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {mockCourses.map((course) => (
                  <TeacherCourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>

            {/* Right Column - Recent Activity */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Submissions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Programming Assignment {i}</p>
                        <p className="text-xs text-muted-foreground">Student {i} submitted</p>
                        <p className="text-xs text-muted-foreground">{format(new Date(), "MMM dd, h:mm a")}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        New
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockAssignments.map((assignment) => {
                    const course = mockCourses.find((c) => c.id === assignment.courseId)
                    return (
                      <div key={assignment.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500/10">
                          <Clock className="h-4 w-4 text-yellow-500" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{assignment.title}</p>
                          <p className="text-xs text-muted-foreground">{course?.code}</p>
                          <p className="text-xs text-muted-foreground">{format(assignment.dueDate, "MMM dd, yyyy")}</p>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
