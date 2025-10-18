import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, FileText, Clock, MoreVertical } from "lucide-react"
import type { Course } from "@/lib/types"
import Link from "next/link"

interface TeacherCourseCardProps {
  course: Course
}

export function TeacherCourseCard({ course }: TeacherCourseCardProps) {
  return (
    <Card className="group transition-all hover:shadow-lg">
      <div className={`h-24 rounded-t-lg bg-gradient-to-r ${course.color}`} />
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="secondary" className="mb-2">
              {course.code}
            </Badge>
            <CardTitle className="text-lg">{course.name}</CardTitle>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center">
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-1 text-2xl font-bold">{course.enrolled}</p>
            <p className="text-xs text-muted-foreground">Students</p>
          </div>
          <div>
            <div className="flex items-center justify-center">
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-1 text-2xl font-bold">12</p>
            <p className="text-xs text-muted-foreground">Assignments</p>
          </div>
          <div>
            <div className="flex items-center justify-center">
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-1 text-2xl font-bold">3</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Schedule:</span>
            <span className="font-medium">{course.schedule}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Room:</span>
            <span className="font-medium">{course.room}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/teacher/courses/${course.id}`} className="flex-1">
            <Button className="w-full" size="sm">
              Manage Course
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
