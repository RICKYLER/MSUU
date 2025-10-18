"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockCourses } from "@/lib/mock-data"
import { Plus, Edit, Trash2, Users } from "lucide-react"

export default function AdminCoursesPage() {
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

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-foreground">Course Management</h1>
              <p className="text-muted-foreground">Manage all courses and curriculum</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Course
            </Button>
          </div>

          <div className="space-y-4">
            {mockCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{course.code}</Badge>
                        <Badge
                          variant={course.enrolled >= course.capacity * 0.9 ? "destructive" : "default"}
                          className="bg-green-500"
                        >
                          Active
                        </Badge>
                      </div>
                      <CardTitle>{course.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="grid grid-cols-4 gap-6 text-sm">
                      <div>
                        <p className="text-muted-foreground">Instructor</p>
                        <p className="font-medium">{course.teacherName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Schedule</p>
                        <p className="font-medium">{course.schedule}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Room</p>
                        <p className="font-medium">{course.room}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Enrollment</p>
                        <p className="font-medium">
                          {course.enrolled}/{course.capacity}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Users className="h-4 w-4" />
                        View Students
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 text-destructive hover:text-destructive bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
