/**
 * Courses API Service
 *
 * This file contains all course-related API calls.
 * Replace mock data with real backend API calls.
 */

import type { Course } from "@/lib/types"
import { mockCourses, mockEnrollments } from "@/lib/mock-data"

/**
 * Get all courses
 * TODO: Replace with GET /api/courses
 */
export async function getAllCourses(): Promise<Course[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockCourses
}

/**
 * Get course by ID
 * TODO: Replace with GET /api/courses/:id
 */
export async function getCourseById(courseId: string): Promise<Course | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockCourses.find((c) => c.id === courseId) || null
}

/**
 * Get courses for a student
 * TODO: Replace with GET /api/students/:studentId/courses
 */
export async function getStudentCourses(studentId: string): Promise<Course[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const enrollments = mockEnrollments.filter((e) => e.studentId === studentId)
  return mockCourses.filter((c) => enrollments.some((e) => e.courseId === c.id))
}

/**
 * Get courses taught by a teacher
 * TODO: Replace with GET /api/teachers/:teacherId/courses
 */
export async function getTeacherCourses(teacherId: string): Promise<Course[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockCourses.filter((c) => c.teacherId === teacherId)
}

/**
 * Create new course
 * TODO: Replace with POST /api/courses
 */
export async function createCourse(courseData: Partial<Course>): Promise<Course> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newCourse: Course = {
    id: `course-${Date.now()}`,
    name: courseData.name || "",
    code: courseData.code || "",
    description: courseData.description || "",
    teacherId: courseData.teacherId || "",
    teacherName: courseData.teacherName || "",
    semester: courseData.semester || "",
    academicYear: courseData.academicYear || "",
    schedule: courseData.schedule || "",
    room: courseData.room || "",
    credits: courseData.credits || 3,
    color: courseData.color || "blue",
  }

  return newCourse
}
