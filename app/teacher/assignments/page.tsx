"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { TeacherSidebar } from "@/components/teacher-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockAssignments, mockCourses } from "@/lib/mock-data"
import { format } from "date-fns"
import { Plus, Edit, Trash2, Users } from "lucide-react"

export default function TeacherAssignmentsPage() {
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
              <h1 className="mb-2 text-3xl font-bold text-foreground">Assignments</h1>
              <p className="text-muted-foreground">Create and manage course assignments</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Assignment
            </Button>
          </div>

          <div className="space-y-4">
            {mockAssignments.map((assignment) => {
              const course = mockCourses.find((c) => c.id === assignment.courseId)
              const submissions = Math.floor(Math.random() * 30) + 5

              return (
                <Card key={assignment.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{course?.code}</Badge>
                          <Badge variant="outline" className="capitalize">
                            {assignment.type}
                          </Badge>
                        </div>
                        <CardTitle>{assignment.title}</CardTitle>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{assignment.points}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{assignment.description}</p>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {submissions}/{course?.enrolled} submitted
                        </span>
                      </div>
                      <div className="text-muted-foreground">
                        Due: {format(assignment.dueDate, "MMMM dd, yyyy 'at' h:mm a")}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Users className="h-4 w-4" />
                        View Submissions
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
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
