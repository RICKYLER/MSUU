"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockUsers } from "@/lib/mock-data"
import { Search, Plus, Edit, Trash2, Mail } from "lucide-react"

export default function AdminUsersPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = getCurrentUser()
    if (!user || user.role !== "admin") {
      router.push("/login")
      return
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  const students = mockUsers.filter((u) => u.role === "student")
  const teachers = mockUsers.filter((u) => u.role === "teacher")
  const admins = mockUsers.filter((u) => u.role === "admin")

  const UserList = ({ users }: { users: typeof mockUsers }) => (
    <div className="space-y-3">
      {users.map((user) => (
        <div key={user.id} className="flex items-center gap-4 rounded-lg border border-border p-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Badge variant="secondary" className="capitalize">
            {user.role}
          </Badge>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="text-destructive hover:text-destructive bg-transparent">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-foreground">User Management</h1>
              <p className="text-muted-foreground">Manage students, teachers, and administrators</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Users</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All ({mockUsers.length})</TabsTrigger>
                  <TabsTrigger value="students">Students ({students.length})</TabsTrigger>
                  <TabsTrigger value="teachers">Teachers ({teachers.length})</TabsTrigger>
                  <TabsTrigger value="admins">Admins ({admins.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <UserList users={mockUsers} />
                </TabsContent>

                <TabsContent value="students">
                  <UserList users={students} />
                </TabsContent>

                <TabsContent value="teachers">
                  <UserList users={teachers} />
                </TabsContent>

                <TabsContent value="admins">
                  <UserList users={admins} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
