import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "MSU ELMS - Learning Management System",
  description: "Mindanao State University - Buug Campus Learning Management System",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Guard Vercel Analytics to avoid insights script errors on localhost
  const enableAnalytics = process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true"

  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        {enableAnalytics && <Analytics />}
      </body>
    </html>
  )
}
