import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export type UserRole = "student" | "teacher" | "admin"

export interface AuthPayload {
  userId: string
  role: UserRole
}

export function getAuthFromCookie(req: Request): AuthPayload | null {
  const cookie = req.headers.get("cookie") || ""
  const match = cookie.match(/auth_token=([^;]+)/)
  if (!match) return null
  const token = match[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as { sub: string; role: UserRole }
    if (!decoded || !decoded.sub || !decoded.role) return null
    return { userId: decoded.sub, role: decoded.role }
  } catch {
    return null
  }
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status })
}

export function requireAdmin(req: Request): { ok: true; auth: AuthPayload } | { ok: false; res: NextResponse } {
  if (!process.env.JWT_SECRET) {
    return { ok: false, res: jsonError("Missing JWT_SECRET", 500) }
  }
  const auth = getAuthFromCookie(req)
  if (!auth || auth.role !== "admin") {
    return { ok: false, res: jsonError("Unauthorized", 401) }
  }
  return { ok: true, auth }
}