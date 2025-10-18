import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Users, Clock } from "lucide-react"
import type { Course } from "@/lib/types"
import Link from "next/link"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const enrollmentPercentage = (course.enrolled / course.capacity) * 100

  return (
    <Link href={`/student/courses/${course.id}`}>
      <Card className="group cursor-pointer transition-all hover:shadow-lg">
        <div className={`h-32 rounded-t-lg bg-gradient-to-r ${course.color}`} />
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="secondary" className="mb-2">
                {course.code}
              </Badge>
              <CardTitle className="text-lg">{course.name}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="line-clamp-2 text-sm text-muted-foreground">{course.description}</p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>{course.teacherName}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{course.schedule}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                {course.enrolled}/{course.capacity} students
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <Progress value={enrollmentPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">{Math.round(enrollmentPercentage)}% capacity</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
