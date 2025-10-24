/// <reference types="nodemailer" />
import nodemailer, { type Transporter } from "nodemailer"

export async function sendCredentialsEmail(options: {
  to: string
  firstName?: string
  role: "student" | "teacher" | "admin"
  email: string
  passwordPlain: string
}): Promise<{ sent: boolean; error?: string; messageId?: string }> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    console.warn("Email not configured: missing SMTP envs. Skipping send.")
    return { sent: false, error: "Missing SMTP configuration" }
  }

  const transporter: Transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  const subject = `MSU ELMS ${options.role} account credentials`
  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
      <h2>Welcome to MSU ELMS</h2>
      <p>Dear ${options.firstName || "User"},</p>
      <p>Your ${options.role} account has been created. Use the following credentials to log in:</p>
      <ul>
        <li><strong>Email:</strong> ${options.email}</li>
        <li><strong>Password:</strong> ${options.passwordPlain}</li>
      </ul>
      <p>For security, please change your password after your first login.</p>
      <p>Login page: <a href="${process.env.APP_BASE_URL || "http://localhost:3000/login"}">MSU ELMS Login</a></p>
      <hr />
      <p style="font-size: 12px; color: #666;">This email was sent automatically. Please do not reply.</p>
    </div>
  `

  const info = await transporter.sendMail({
    from: SMTP_FROM,
    to: options.to,
    subject,
    html,
  })

  return { sent: true, messageId: info.messageId }
}

export async function sendSimpleEmail(options: {
  to: string
  subject: string
  html?: string
  text?: string
}): Promise<{ sent: boolean; error?: string; messageId?: string }> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    return { sent: false, error: "Missing SMTP configuration" }
  }
  const transporter: Transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
  const info = await transporter.sendMail({
    from: SMTP_FROM,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  })
  return { sent: true, messageId: info.messageId }
}