"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { TeacherSidebar } from "@/components/teacher-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

export default function TeacherMessagesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = getCurrentUser()
    if (!user || user.role !== "teacher") {
      router.push("/login")
      return
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex h-screen bg-background">
      <TeacherSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-foreground">Messages</h1>
            <p className="text-muted-foreground">Communicate with students</p>
          </div>

          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <MessageSquare className="mb-4 h-16 w-16 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">No messages yet</h3>
              <p className="text-sm text-muted-foreground">Your messages will appear here</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
