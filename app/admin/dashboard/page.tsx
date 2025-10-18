"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockCourses, mockUsers } from "@/lib/mock-data"
import { Users, BookOpen, GraduationCap, TrendingUp, Activity, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = getCurrentUser()
    if (!user || user.role !== "admin") {
      router.push("/login")
      return
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  const totalStudents = mockUsers.filter((u) => u.role === "student").length
  const totalTeachers = mockUsers.filter((u) => u.role === "teacher").length
  const totalEnrollments = mockCourses.reduce((sum, course) => sum + course.enrolled, 0)

  const recentActivities = [
    { id: 1, type: "user", message: "New student registered: Juan Dela Cruz", time: "2 hours ago" },
    { id: 2, type: "course", message: "Course created: Introduction to Computer Science", time: "5 hours ago" },
    { id: 3, type: "enrollment", message: "35 students enrolled in MATH 201", time: "1 day ago" },
    { id: 4, type: "system", message: "System backup completed successfully", time: "1 day ago" },
  ]

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">System overview and management</p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <GraduationCap className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalStudents}</p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalTeachers}</p>
                  <p className="text-sm text-muted-foreground">Total Teachers</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <BookOpen className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockCourses.length}</p>
                  <p className="text-sm text-muted-foreground">Active Courses</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10">
                  <TrendingUp className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalEnrollments}</p>
                  <p className="text-sm text-muted-foreground">Total Enrollments</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - System Status */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                        <Activity className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Server Status</p>
                        <p className="text-sm text-muted-foreground">All systems operational</p>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-green-500">
                      Online
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                        <Users className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">Active Users</p>
                        <p className="text-sm text-muted-foreground">Currently online</p>
                      </div>
                    </div>
                    <Badge variant="secondary">42 users</Badge>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div>
                        <p className="font-medium">Pending Actions</p>
                        <p className="text-sm text-muted-foreground">Requires attention</p>
                      </div>
                    </div>
                    <Badge variant="secondary">8 items</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockCourses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between rounded-lg border border-border p-3"
                      >
                        <div>
                          <p className="font-medium">{course.name}</p>
                          <p className="text-sm text-muted-foreground">{course.code}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{course.enrolled} students</p>
                          <p className="text-sm text-muted-foreground">
                            {Math.round((course.enrolled / course.capacity) * 100)}% capacity
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Recent Activity */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Class Size</span>
                    <span className="font-semibold">29.5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Student-Teacher Ratio</span>
                    <span className="font-semibold">1:39</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Course Completion</span>
                    <span className="font-semibold">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">System Uptime</span>
                    <span className="font-semibold">99.9%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
