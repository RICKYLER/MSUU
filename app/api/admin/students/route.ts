import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import jwt from "jsonwebtoken"

function getAuthUserRoleFromCookie(req: Request): "student" | "teacher" | "admin" | null {
  const cookie = req.headers.get("cookie") || ""
  const match = cookie.match(/auth_token=([^;]+)/)
  if (!match) return null
  const token = match[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as { role: "student" | "teacher" | "admin" }
    return decoded.role
  } catch {
    return null
  }
}

export async function GET(req: Request) {
  try {
    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ success: false, error: "Missing JWT_SECRET" }, { status: 500 })
    }
    const role = getAuthUserRoleFromCookie(req)
    if (role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const q = searchParams.get("q")?.trim() || ""

    // Fetch students with aggregated info
    const students = await prisma.user.findMany({
      where: {
        role: "student",
        OR: q
          ? [
              { firstName: { contains: q } },
              { lastName: { contains: q } },
              { email: { contains: q } },
              { studentId: { contains: q } },
            ]
          : undefined,
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        studentId: true,
        avatar: true,
        _count: { select: { enrollments: true } },
      },
    })

    // Compute average grades per student via groupBy on submissions
    const studentIds = students.map((s) => s.id)
    const averages = await prisma.submission.groupBy({
      by: ["studentId"],
      where: {
        studentId: { in: studentIds },
        grade: { not: null },
      },
      _avg: { grade: true },
    })
    const avgMap = new Map<string, number | null>()
    for (const a of averages) {
      avgMap.set(a.studentId, typeof a._avg.grade === "number" ? a._avg.grade : null)
    }

    const result = students.map((s) => {
      const avg = avgMap.get(s.id)
      const avgGrade = typeof avg === "number" ? Math.round(avg) : null
      return {
        id: s.id,
        name: `${s.firstName} ${s.lastName}`,
        email: s.email,
        studentId: s.studentId,
        avatar: s.avatar,
        courses: s._count.enrollments,
        avgGrade,
      }
    })

    return NextResponse.json({ success: true, students: result })
  } catch (e) {
    console.error("GET /api/admin/students error", e)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}