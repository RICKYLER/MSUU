"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/api/auth.api"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Edit, Trash2, Mail, RefreshCw, ShieldAlert } from "lucide-react"
import { Label } from "@/components/ui/label"

export default function AdminUsersPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<any[]>([])
  const [trashedUsers, setTrashedUsers] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [formOpen, setFormOpen] = useState(false)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "failed" | "not_attempted">("idle")
  const [emailStatusMsg, setEmailStatusMsg] = useState("")
  const [role, setRole] = useState<"student" | "teacher" | "admin">("student")
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [studentId, setStudentId] = useState("")
  const [employeeId, setEmployeeId] = useState("")
  const [password, setPassword] = useState("")
  const [sendEmail, setSendEmail] = useState(true)
  // Per-user email sending feedback for the Mail icon in the list
  const [sendingEmailUserId, setSendingEmailUserId] = useState<string | null>(null)
  const [sentEmailUserId, setSentEmailUserId] = useState<string | null>(null)
  const [errorUserId, setErrorUserId] = useState<string | null>(null)
  const [emailErrorForUserId, setEmailErrorForUserId] = useState<string | null>(null)

  useEffect(() => {
    const user = getCurrentUser()
    if (!user || user.role !== "admin") {
      router.push("/login")
      return
    }

    setLoading(false)
    // fetch users
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setUsers(data.users)
      })
      .catch(() => {})

    // fetch trashed users
    fetch("/api/admin/users/trash")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setTrashedUsers(data.trashed)
      })
      .catch(() => {})
  }, [router])

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  const students = users.filter((u) => u.role === "student")
  const teachers = users.filter((u) => u.role === "teacher")
  const admins = users.filter((u) => u.role === "admin")

  const UserList = ({ users }: { users: any[] }) => (
    <div className="space-y-3">
      {users.map((user) => (
        <div key={user.id} className="flex items-center gap-4 rounded-lg border border-border p-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.firstName?.[0]}
              {user.lastName?.[0]}
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
            <Button
              variant="outline"
              size="icon"
              title="Send Email"
              disabled={sendingEmailUserId === user.id}
              onClick={async () => {
                setSendingEmailUserId(user.id)
                setSentEmailUserId(null)
                setErrorUserId(null)
                setEmailErrorForUserId(null)
                try {
                  const res = await fetch("/api/admin/users/send-email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user.id }),
                  })
                  const data = await res.json()
                  if (data.success) {
                    setSentEmailUserId(user.id)
                  } else {
                    setErrorUserId(user.id)
                    setEmailErrorForUserId(data.error || "Failed to send email.")
                  }
                } catch (err) {
                  setErrorUserId(user.id)
                  setEmailErrorForUserId(err instanceof Error ? err.message : String(err))
                } finally {
                  setSendingEmailUserId(null)
                }
              }}
            >
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="text-destructive hover:text-destructive bg-transparent" onClick={async () => {
              try {
                const res = await fetch("/api/admin/users/delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.id }) })
                const data = await res.json()
                if (data.success) {
                  setUsers((prev) => prev.filter((u) => u.id !== user.id))
                  setTrashedUsers((prev) => [data.user, ...prev])
                }
              } catch {}
            }}>
              <Trash2 className="h-4 w-4" />
            </Button>
            {sendingEmailUserId === user.id && (
              <span className="text-xs text-muted-foreground">Sending...</span>
            )}
            {sentEmailUserId === user.id && (
              <span className="text-xs text-green-600">Sent</span>
            )}
            {errorUserId === user.id && emailErrorForUserId && (
              <span className="text-xs text-destructive">{emailErrorForUserId}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )

  const TrashList = ({ users }: { users: any[] }) => (
    <div className="space-y-3">
      {users.map((user) => (
        <div key={user.id} className="flex items-center gap-4 rounded-lg border border-border p-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-muted text-foreground">
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            {user.deletedAt && (
              <p className="text-xs text-muted-foreground">Deleted on {new Date(user.deletedAt).toLocaleString()}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={async () => {
              try {
                const res = await fetch("/api/admin/users/restore", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.id }) })
                const data = await res.json()
                if (data.success) {
                  setTrashedUsers((prev) => prev.filter((u) => u.id !== user.id))
                  setUsers((prev) => [data.user, ...prev])
                }
              } catch {}
            }}>Restore</Button>
            <Button variant="outline" size="sm" className="text-destructive" onClick={async () => {
              try {
                const res = await fetch("/api/admin/users/purge", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.id }) })
                const data = await res.json()
                if (data.success) {
                  setTrashedUsers((prev) => prev.filter((u) => u.id !== user.id))
                }
              } catch {}
            }}>Purge</Button>
          </div>
        </div>
      ))}
    </div>
  )

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    setError(null)
    setEmailStatus(sendEmail ? "sending" : "not_attempted")
    setEmailStatusMsg(sendEmail ? "Sending credentials email..." : "")
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role, firstName, lastName, studentId, employeeId, sendEmail }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setError(data.error || "Failed to create user")
        if (sendEmail) {
          setEmailStatus("failed")
          setEmailStatusMsg("Failed before sending email.")
        }
      } else {
        setUsers((prev) => [data.user, ...prev])
        setFormOpen(false)
        setEmail("")
        setPassword("")
        setFirstName("")
        setLastName("")
        setStudentId("")
        setEmployeeId("")
        setRole("student")
        // Email sending result feedback (inline)
        const r = data.emailResult as { attempted: boolean; sent: boolean; error?: string }
        if (r?.attempted) {
          if (r.sent) {
            setEmailStatus("sent")
            setEmailStatusMsg("Credentials email sent successfully.")
          } else {
            setEmailStatus("failed")
            setEmailStatusMsg(`Tried to send credentials email but failed: ${r.error || "Unknown error"}`)
          }
        } else {
          setEmailStatus("not_attempted")
          setEmailStatusMsg("")
        }
      }
    } catch {
      setError("Network error")
      if (sendEmail) {
        setEmailStatus("failed")
        setEmailStatusMsg("Network error while sending email.")
      }
    } finally {
      setCreating(false)
    }
  }

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
            <Button className="gap-2" onClick={() => setFormOpen((v) => !v)}>
              <Plus className="h-4 w-4" />
              {formOpen ? "Close" : "Add User"}
            </Button>
          </div>

          {formOpen && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Create New User</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <div className="flex gap-2">
                      <Button type="button" variant={role === "student" ? "default" : "outline"} onClick={() => setRole("student")}>Student</Button>
                      <Button type="button" variant={role === "teacher" ? "default" : "outline"} onClick={() => setRole("teacher")}>Teacher</Button>
                      <Button type="button" variant={role === "admin" ? "default" : "outline"} onClick={() => setRole("admin")}>Admin</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  </div>

                  {role === "student" && (
                    <div className="space-y-2">
                      <Label>Student ID</Label>
                      <Input value={studentId} onChange={(e) => setStudentId(e.target.value)} />
                    </div>
                  )}

                  {role !== "student" && (
                    <div className="space-y-2">
                      <Label>Employee ID</Label>
                      <Input value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label>Send credentials by email?</Label>
                    <div className="flex gap-2">
                      <Button type="button" disabled={creating} variant={sendEmail ? "default" : "outline"} onClick={() => setSendEmail(true)}>Yes</Button>
                      <Button type="button" disabled={creating} variant={!sendEmail ? "default" : "outline"} onClick={() => setSendEmail(false)}>No</Button>
                    </div>
                    {creating && sendEmail && (
                      <p className="text-sm text-muted-foreground">{emailStatusMsg || "Sending credentials email..."}</p>
                    )}
                    {!creating && emailStatus === "sent" && (
                      <div className="flex items-center gap-2 text-sm text-green-500"><Mail className="h-4 w-4" /> {emailStatusMsg}</div>
                    )}
                    {!creating && emailStatus === "failed" && (
                      <p className="text-sm text-destructive">{emailStatusMsg}</p>
                    )}
                  </div>

                  <div className="md:col-span-2 flex items-center gap-4">
                    <Button type="submit" disabled={creating}>{creating ? "Creating..." : "Create User"}</Button>
                    {error && <p className="text-destructive text-sm">{error}</p>}
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

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
                  <TabsTrigger value="all">All ({users.length})</TabsTrigger>
                  <TabsTrigger value="students">Students ({students.length})</TabsTrigger>
                  <TabsTrigger value="teachers">Teachers ({teachers.length})</TabsTrigger>
                  <TabsTrigger value="admins">Admins ({admins.length})</TabsTrigger>
                  <TabsTrigger value="trash">Trash ({trashedUsers.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <UserList users={users} />
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

                <TabsContent value="trash">
                  <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldAlert className="h-3 w-3" /> Accounts stay here for 30 days, then auto purge.
                    <Button variant="outline" size="sm" className="ml-auto" onClick={async () => {
                      try {
                        const r = await fetch("/api/admin/users/trash")
                        const d = await r.json()
                        if (d.success) setTrashedUsers(d.trashed)
                      } catch {}
                    }}>
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                  </div>
                  <TrashList users={trashedUsers} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
