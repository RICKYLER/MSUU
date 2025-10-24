import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin, jsonError } from "@/lib/server/auth"
import { z } from "zod"

const trashActionSchema = z.object({
  action: z.enum(["restore", "purge"]),
  userId: z.string().min(1),
})

export async function GET(req: Request) {
  const auth = requireAdmin(req)
  if (!auth.ok) return auth.res

  try {
    const trashed = await prisma.user.findMany({
      where: { deletedAt: { not: null } },
      orderBy: { deletedAt: "desc" },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        studentId: true,
        employeeId: true,
        avatar: true,
        deletedAt: true,
      },
    })
    return NextResponse.json({ success: true, trashed })
  } catch (e) {
    console.error("GET /api/admin/users/trash error", e)
    return jsonError("Server error", 500)
  }
}

export async function POST(req: Request) {
  const auth = requireAdmin(req)
  if (!auth.ok) return auth.res

  try {
    const body = await req.json()
    const parsed = trashActionSchema.safeParse(body)
    if (!parsed.success) return jsonError("Invalid payload", 400)

    const { action, userId } = parsed.data

    const target = await prisma.user.findUnique({ where: { id: userId } })
    if (!target) return jsonError("User not found", 404)

    if (action === "restore") {
      const restored = await prisma.user.update({ where: { id: userId }, data: { deletedAt: null }, select: { id: true, email: true, role: true, firstName: true, lastName: true, studentId: true, employeeId: true, avatar: true } })
      return NextResponse.json({ success: true, user: restored })
    }

    // purge
    if (userId === auth.auth.userId) {
      return jsonError("Cannot purge your own account", 400)
    }
    if (target.role === "admin") {
      const activeAdmins = await prisma.user.count({ where: { role: "admin", deletedAt: null } })
      if (activeAdmins <= 1) {
        return jsonError("Cannot purge the last active admin", 400)
      }
    }

    await prisma.user.delete({ where: { id: userId } })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error("POST /api/admin/users/trash error", e)
    return jsonError("Server error", 500)
  }
}