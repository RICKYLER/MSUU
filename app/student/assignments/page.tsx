"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { StudentSidebar } from "@/components/student-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockAssignments, mockCourses } from "@/lib/mock-data"
import { format, formatDistanceToNow } from "date-fns"
import { FileText, Clock, Upload } from "lucide-react"

export default function StudentAssignmentsPage() {
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

  return (
    <div className="flex h-screen bg-background">
      <StudentSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-foreground">Assignments</h1>
            <p className="text-muted-foreground">View and submit your assignments</p>
          </div>

          <div className="space-y-4">
            {mockAssignments.map((assignment) => {
              const course = mockCourses.find((c) => c.id === assignment.courseId)
              const isOverdue = assignment.dueDate < new Date()

              return (
                <Card key={assignment.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{course?.code}</Badge>
                          <Badge variant={isOverdue ? "destructive" : "default"}>
                            {isOverdue ? "Overdue" : "Pending"}
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
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span className="capitalize">{assignment.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Due {formatDistanceToNow(assignment.dueDate, { addSuffix: true })}</span>
                      </div>
                      <div className="text-muted-foreground">
                        <span>{format(assignment.dueDate, "MMMM dd, yyyy 'at' h:mm a")}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="gap-2" onClick={() => router.push(`/student/assignments/${assignment.id}?action=submit`)}>
                        <Upload className="h-4 w-4" />
                        Submit Assignment
                      </Button>
                      {/* Navigate to the assignment details page for review/submission */}
                      <Button
                        variant="outline"
                        onClick={() => router.push(`/student/assignments/${assignment.id}`)}
                      >
                        View Details
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
