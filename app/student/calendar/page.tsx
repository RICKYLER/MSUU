"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { StudentSidebar } from "@/components/student-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { mockAssignments, mockCourses } from "@/lib/mock-data"
import { format } from "date-fns"

export default function StudentCalendarPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState<Date | undefined>(new Date())

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
            <h1 className="mb-2 text-3xl font-bold text-foreground">Calendar</h1>
            <p className="text-muted-foreground">View your schedule and upcoming deadlines</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Academic Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockAssignments.map((assignment) => {
                  const course = mockCourses.find((c) => c.id === assignment.courseId)
                  return (
                    <div key={assignment.id} className="rounded-lg border border-border p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="secondary">{course?.code}</Badge>
                        <span className="text-xs text-muted-foreground">{format(assignment.dueDate, "MMM dd")}</span>
                      </div>
                      <p className="text-sm font-medium">{assignment.title}</p>
                      <p className="text-xs text-muted-foreground">{assignment.type}</p>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
