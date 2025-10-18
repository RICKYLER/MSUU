"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { StudentSidebar } from "@/components/student-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAssignmentById, submitAssignment, getAssignmentSubmissions } from "@/lib/api/assignments.api"
import { mockCourses } from "@/lib/mock-data"
import { formatDistanceToNow, format } from "date-fns"
import { FileText, Clock, Upload } from "lucide-react"

export default function AssignmentDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const assignmentId = Array.isArray(params?.id) ? params.id[0] : (params?.id as string)

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [assignment, setAssignment] = useState<any>(null)
  const [submissions, setSubmissions] = useState<any[]>([])
  const [reviewMessage, setReviewMessage] = useState("")

  useEffect(() => {
    const user = getCurrentUser()
    if (!user || user.role !== "student") {
      router.push("/login")
      return
    }

    async function load() {
      const a = await getAssignmentById(assignmentId)
      setAssignment(a)
      const subs = await getAssignmentSubmissions(assignmentId)
      setSubmissions(subs)
      setLoading(false)
    }
    load()
  }, [router, assignmentId])

  if (loading || !assignment) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  const course = mockCourses.find((c) => c.id === assignment.courseId)
  const isOverdue = assignment.dueDate < new Date()

  async function handleQuickSubmit() {
    const user = getCurrentUser()
    if (!user?.id) return
    setSubmitting(true)
    try {
      await submitAssignment(assignment.id, user.id, reviewMessage || "Submitted for review")
      const subs = await getAssignmentSubmissions(assignment.id)
      setSubmissions(subs)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <StudentSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">← Back</Button>

          <Card>
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

              {/* Review notes textarea */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Review Notes (optional)</label>
                <textarea
                  className="w-full rounded border bg-background p-2 text-sm"
                  rows={4}
                  placeholder="Add notes or a summary of your solution..."
                  value={reviewMessage}
                  onChange={(e) => setReviewMessage(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button className="gap-2" onClick={handleQuickSubmit} disabled={submitting}>
                  <Upload className="h-4 w-4" />
                  {submitting ? "Submitting..." : "Submit for Review"}
                </Button>
              </div>

              <div className="mt-6">
                <h3 className="mb-2 text-lg font-semibold">Your Submissions</h3>
                {submissions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No submissions yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {submissions.map((s) => (
                      <li key={s.id} className="rounded border p-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span>
                            Submitted {format(new Date(s.submittedAt), "MMM dd, yyyy h:mm a")} 
                            {s.status ? `• ${s.status}` : ""}
                          </span>
                          {s.grade !== undefined && (
                            <span className="font-medium">Grade: {s.grade}</span>
                          )}
                        </div>
                        {s.feedback && (
                          <p className="mt-1 text-muted-foreground">Feedback: {s.feedback}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}