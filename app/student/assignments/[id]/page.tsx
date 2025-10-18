"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { StudentSidebar } from "@/components/student-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAssignmentById, submitAssignment, getAssignmentSubmissions } from "@/lib/api/assignments.api"
import { mockCourses } from "@/lib/mock-data"
import { formatDistanceToNow, format } from "date-fns"
import { FileText, Clock, Upload } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function AssignmentDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const search = useSearchParams()
  const action = search.get("action")
  const assignmentId = Array.isArray(params?.id) ? params.id[0] : (params?.id as string)

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [assignment, setAssignment] = useState<any>(null)
  const [submissions, setSubmissions] = useState<any[]>([])
  const [reviewMessage, setReviewMessage] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>("")
  const [fileLoading, setFileLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [fileValid, setFileValid] = useState(false)

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
    if (!file) {
      setFileError("Please attach a file before submitting.")
      return
    }
    setSubmitting(true)
    try {
      // Simulate upload by reading file name and size
      const note = `${reviewMessage || "Submitted for review"} (file: ${file.name}, ${file.size} bytes)`
      await submitAssignment(assignment.id, user.id, note)
      const subs = await getAssignmentSubmissions(assignment.id)
      setSubmissions(subs)
      setFile(null)
      setFileError("")
    } finally {
      setSubmitting(false)
    }
  }

  // Handle file selection with loading and validations
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null
    setFile(f)
    setFileError("")
    setUploadProgress(0)
    setFileValid(false)

    if (!f) {
      setFileLoading(false)
      return
    }

    // Basic validations
    const maxSize = 10 * 1024 * 1024 // 10 MB
    if (f.size > maxSize) {
      setFileError("File too large (max 10 MB)")
      setFileLoading(false)
      return
    }
    const ext = f.name.split(".").pop()?.toLowerCase()
    const allowed = ["pdf", "doc", "docx", "txt", "md", "zip", "rar", "7z", "png", "jpg", "jpeg"]
    if (!ext || !allowed.includes(ext)) {
      setFileError("Unsupported file type")
      setFileLoading(false)
      return
    }

    // Read file to simulate pre-upload processing and show progress
    const reader = new FileReader()
    reader.onloadstart = () => {
      setFileLoading(true)
      setUploadProgress(0)
    }
    reader.onprogress = (evt) => {
      if (evt.lengthComputable) {
        setUploadProgress(Math.round((evt.loaded / evt.total) * 100))
      }
    }
    reader.onload = () => {
      setUploadProgress(100)
      setFileValid(true)
    }
    reader.onerror = () => {
      setFileError("Failed to read file")
      setFileValid(false)
    }
    reader.onloadend = () => {
      setFileLoading(false)
    }
    reader.readAsArrayBuffer(f)
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

              {/* File upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Answer File</label>
                <input
                  type="file"
                  className="w-full rounded border bg-background p-2 text-sm"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.txt,.md,.zip,.rar,.7z,.png,.jpg,.jpeg"
                />
                {file && (
                  <p className="text-xs text-muted-foreground">Selected: {file.name} ({Math.round(file.size / 1024)} KB)</p>
                )}
                {fileLoading && (
                  <div className="flex items-center gap-2">
                    <Progress value={uploadProgress} className="h-2 w-full" />
                    <span className="text-xs text-muted-foreground w-16 text-right">{uploadProgress}%</span>
                  </div>
                )}
                {!fileLoading && fileValid && (
                  <p className="text-xs text-green-600">File loaded • Ready to submit</p>
                )}
                {fileError && <p className="text-xs text-destructive">{fileError}</p>}
              </div>

              <div className="flex gap-2">
                <Button
                  className="gap-2"
                  onClick={handleQuickSubmit}
                  disabled={submitting || fileLoading || !fileValid || !file}
                  title={
                    fileLoading
                      ? "Reading file..."
                      : !file
                      ? "Attach a file first"
                      : !fileValid
                      ? "Fix file issues before submitting"
                      : undefined
                  }
                >
                  <Upload className="h-4 w-4" />
                  {submitting ? "Submitting..." : "Submit for Review"}
                </Button>
                {action === "submit" && (
                  <span className="text-xs text-muted-foreground">Attach your file and notes, then submit when ready.</span>
                )}
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