import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { sendSimpleEmail } from "@/lib/email"
import { requireAdmin, jsonError } from "@/lib/server/auth"
import { z } from "zod"

const payloadSchema = z.object({
  userId: z.string().min(1),
  subject: z.string().optional(),
  html: z.string().optional(),
  text: z.string().optional(),
})

export async function POST(req: Request) {
  const auth = requireAdmin(req)
  if (!auth.ok) return auth.res

  try {
    const body = await req.json()
    const parsed = payloadSchema.safeParse(body)
    if (!parsed.success) return jsonError("Invalid payload", 400)

    const { userId, subject, html, text } = parsed.data

    const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true, firstName: true } })
    if (!user) {
      return jsonError("User not found", 404)
    }

    const emailSubject = subject || `Message from MSU ELMS`
    const emailHtml = html || `<p>Hello ${user.firstName || "User"},</p><p>This is a message from MSU ELMS admin.</p>`

    const info = await sendSimpleEmail({ to: user.email, subject: emailSubject, html: emailHtml, text })

    return NextResponse.json({ success: info.sent, messageId: info.messageId, error: info.error })
  } catch (e) {
    console.error("POST /api/admin/users/send-email error", e)
    return jsonError("Server error", 500)
  }
}