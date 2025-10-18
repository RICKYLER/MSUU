/**
 * Assignments API Service
 *
 * This file contains all assignment-related API calls.
 */

import type { Assignment, Submission } from "@/lib/types"
import { mockAssignments, mockSubmissions } from "@/lib/mock-data"

/**
 * Get assignments for a course
 * TODO: Replace with GET /api/courses/:courseId/assignments
 */
export async function getCourseAssignments(courseId: string): Promise<Assignment[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockAssignments.filter((a) => a.courseId === courseId)
}

/**
 * Get assignments for a student
 * TODO: Replace with GET /api/students/:studentId/assignments
 */
export async function getStudentAssignments(studentId: string): Promise<Assignment[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockAssignments
}

/**
 * Get assignment by ID
 * TODO: Replace with GET /api/assignments/:id
 */
export async function getAssignmentById(assignmentId: string): Promise<Assignment | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockAssignments.find((a) => a.id === assignmentId) || null
}
export async function submitAssignment(assignmentId: string, studentId: string, content: string): Promise<Submission> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newSubmission: Submission = {
    id: `sub-${Date.now()}`,
    assignmentId,
    studentId,
    submittedAt: new Date(),
    status: "submitted",
    feedback: undefined,
    grade: undefined,
  }

  // For mock mode, append to in-memory list so subsequent fetches include it
  mockSubmissions.push({ ...newSubmission })

  return newSubmission
}

export async function getAssignmentSubmissions(assignmentId: string): Promise<Submission[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockSubmissions.filter((s) => s.assignmentId === assignmentId)
}
