import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin, jsonError } from "@/lib/server/auth"
import { z } from "zod"

const payloadSchema = z.object({ userId: z.string().min(1) })

export async function POST(req: Request) {
  const auth = requireAdmin(req)
  if (!auth.ok) return auth.res

  try {
    const body = await req.json()
    const parsed = payloadSchema.safeParse(body)
    if (!parsed.success) return jsonError("Invalid payload", 400)

    const { userId } = parsed.data

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return jsonError("User not found", 404)

    const restored = await prisma.user.update({
      where: { id: userId },
      data: { deletedAt: null },
      select: { id: true, email: true, role: true, firstName: true, lastName: true, studentId: true, employeeId: true, avatar: true },
    })
    return NextResponse.json({ success: true, user: restored })
  } catch (e) {
    console.error("POST /api/admin/users/restore error", e)
    return jsonError("Server error", 500)
  }
}