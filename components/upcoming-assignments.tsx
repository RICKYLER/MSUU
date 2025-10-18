import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import { mockAssignments, mockCourses } from "@/lib/mock-data"
import { format, formatDistanceToNow } from "date-fns"

export function UpcomingAssignments() {
  const sortedAssignments = [...mockAssignments].sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Assignments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedAssignments.map((assignment) => {
          const course = mockCourses.find((c) => c.id === assignment.courseId)
          const isOverdue = assignment.dueDate < new Date()

          return (
            <div key={assignment.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{assignment.title}</p>
                <p className="text-xs text-muted-foreground">{course?.code}</p>
                <div className="flex items-center gap-2">
                  <Badge variant={isOverdue ? "destructive" : "secondary"} className="text-xs">
                    <Clock className="mr-1 h-3 w-3" />
                    {formatDistanceToNow(assignment.dueDate, { addSuffix: true })}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{format(assignment.dueDate, "MMM dd, yyyy")}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-primary">{assignment.points} pts</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
