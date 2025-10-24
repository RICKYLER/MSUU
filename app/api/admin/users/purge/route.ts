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

    if (userId === auth.auth.userId) {
      return jsonError("Cannot purge your own account", 400)
    }

    const target = await prisma.user.findUnique({ where: { id: userId } })
    if (!target) return jsonError("User not found", 404)

    if (target.role === "admin") {
      const activeAdmins = await prisma.user.count({ where: { role: "admin", deletedAt: null } })
      if (activeAdmins <= 1) {
        return jsonError("Cannot purge the last active admin", 400)
      }
    }

    await prisma.user.delete({ where: { id: userId } })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error("POST /api/admin/users/purge error", e)
    return jsonError("Server error", 500)
  }
}