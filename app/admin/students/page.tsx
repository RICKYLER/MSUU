"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Mail, MoreVertical } from "lucide-react"

const students = [
  { id: "1", name: "Juan Dela Cruz", studentId: "2024-00001", email: "juan@msu.edu.ph", courses: 4, grade: 92 },
  { id: "2", name: "Maria Garcia", studentId: "2024-00002", email: "maria@msu.edu.ph", courses: 3, grade: 88 },
  { id: "3", name: "Jose Rizal", studentId: "2024-00003", email: "jose@msu.edu.ph", courses: 4, grade: 95 },
  { id: "4", name: "Ana Santos", studentId: "2024-00004", email: "ana@msu.edu.ph", courses: 3, grade: 90 },
  { id: "5", name: "Pedro Cruz", studentId: "2024-00005", email: "pedro@msu.edu.ph", courses: 4, grade: 85 },
]

export default function AdminStudentsPage() {
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
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-foreground">Student Records</h1>
            <p className="text-muted-foreground">View and manage all student information</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Students</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search students..." className="pl-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center gap-4 rounded-lg border border-border p-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.studentId}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{student.courses} Courses</p>
                      <p className="text-xs text-muted-foreground">Enrolled</p>
                    </div>
                    <div className="text-center">
                      <Badge variant={student.grade >= 90 ? "default" : "secondary"} className="text-sm">
                        {student.grade}%
                      </Badge>
                      <p className="text-xs text-muted-foreground">Avg Grade</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
