import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"
import { sendCredentialsEmail } from "@/lib/email"
import { requireAdmin, jsonError } from "@/lib/server/auth"
import { z } from "zod"

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["student", "teacher", "admin"]),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  studentId: z.string().optional(),
  employeeId: z.string().optional(),
  sendEmail: z.boolean().optional(),
})

export async function GET(req: Request) {
  const auth = requireAdmin(req)
  if (!auth.ok) return auth.res

  try {
    const users = await prisma.user.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        studentId: true,
        employeeId: true,
        avatar: true,
        createdAt: true,
      },
    })
    return NextResponse.json({ success: true, users })
  } catch (e) {
    console.error("GET /api/admin/users error", e)
    return jsonError("Server error", 500)
  }
}

export async function POST(req: Request) {
  const auth = requireAdmin(req)
  if (!auth.ok) return auth.res

  try {
    const body = await req.json()
    const parsed = createUserSchema.safeParse(body)
    if (!parsed.success) {
      return jsonError("Invalid payload", 400)
    }

    const { email, password, role: newRole, firstName, lastName, studentId, employeeId, sendEmail } = parsed.data

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) {
      return jsonError("Email already exists", 409)
    }

    const hashed = await bcrypt.hash(password, 10)
    const created = await prisma.user.create({
      data: {
        email,
        password: hashed,
        role: newRole,
        firstName,
        lastName,
        studentId: newRole === "student" ? studentId : undefined,
        employeeId: newRole !== "student" ? employeeId : undefined,
      },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        studentId: true,
        employeeId: true,
        avatar: true,
        createdAt: true,
      },
    })

    let emailResult: { attempted: boolean; sent: boolean; error?: string; messageId?: string } = {
      attempted: false,
      sent: false,
    }

    if (sendEmail) {
      emailResult.attempted = true
      try {
        const info = await sendCredentialsEmail({ to: email, firstName, role: newRole, email, passwordPlain: password })
        emailResult.sent = info.sent
        emailResult.messageId = info.messageId
        emailResult.error = info.error
      } catch (err) {
        emailResult.sent = false
        emailResult.error = err instanceof Error ? err.message : String(err)
      }
    }

    return NextResponse.json({ success: true, user: created, emailResult })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    if (msg.includes("Unique constraint")) {
      return jsonError("A unique field already exists (email or ID)", 409)
    }
    console.error("POST /api/admin/users error", e)
    return jsonError("Server error", 500)
  }
}