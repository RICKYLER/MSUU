import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ success: false, error: "Missing DATABASE_URL" }, { status: 500 })
    }
    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ success: false, error: "Missing JWT_SECRET" }, { status: 500 })
    }

    const body = await req.json()
    const { email, password, role } = body as { email: string; password: string; role: "student" | "teacher" | "admin" }

    if (!email || !password || !role) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 401 })
    }
    if (user.role !== role) {
      return NextResponse.json({ success: false, error: `Account is not registered as ${role}` }, { status: 401 })
    }

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
    }

    const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "7d" })

    const res = NextResponse.json({ success: true, user: { id: user.id, email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName, studentId: user.studentId, employeeId: user.employeeId, avatar: user.avatar } })
    res.cookies.set({ name: "auth_token", value: token, httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 })

    return res
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    if (msg.includes("Authentication failed against database server")) {
      return NextResponse.json(
        { success: false, error: "Database authentication failed. Check DATABASE_URL credentials." },
        { status: 500 },
      )
    }
    if (msg.includes("Can't reach database server")) {
      return NextResponse.json(
        { success: false, error: "Database server unreachable. Verify host:port and that MySQL is running." },
        { status: 500 },
      )
    }
    if (msg.includes("Unknown database") || msg.includes("does not exist")) {
      return NextResponse.json(
        { success: false, error: "Database not found. Create it and run Prisma migrations." },
        { status: 500 },
      )
    }
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
