export type UserRole = "student" | "teacher" | "admin"

export interface User {
  id: string
  email: string
  password: string
  role: UserRole
  firstName: string
  lastName: string
  studentId?: string
  employeeId?: string
  avatar?: string
}

export interface Course {
  id: string
  code: string
  name: string
  description: string
  teacherId: string
  teacherName: string
  schedule: string
  room: string
  color: string
  enrolled: number
  capacity: number
}

export interface Enrollment {
  id: string
  studentId: string
  courseId: string
  enrolledAt: Date
}

export interface Assignment {
  id: string
  courseId: string
  title: string
  description: string
  dueDate: Date
  points: number
  type: "assignment" | "quiz" | "exam"
}

export interface Submission {
  id: string
  assignmentId: string
  studentId: string
  submittedAt: Date
  grade?: number
  feedback?: string
  status: "submitted" | "graded" | "late"
}

export interface Announcement {
  id: string
  courseId: string
  title: string
  content: string
  createdAt: Date
  authorId: string
  authorName: string
}
