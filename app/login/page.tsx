"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { loginUser } from "@/lib/api/auth.api"
import type { UserRole } from "@/lib/types"
import { GraduationCap, BookOpen, Shield } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [selectedRole, setSelectedRole] = useState<UserRole>("student")

  useEffect(() => {
    const roleParam = searchParams.get("role")
    if (roleParam === "student" || roleParam === "teacher" || roleParam === "admin") {
      setSelectedRole(roleParam)
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const res = await loginUser({ email, password, role: selectedRole })
    if (!res.success || !res.user) {
      setError(res.error || "Invalid email or password")
      return
    }

    // Redirect based on role
    switch (res.user.role) {
      case "student":
        router.push("/student/dashboard")
        break
      case "teacher":
        router.push("/teacher/dashboard")
        break
      case "admin":
        router.push("/admin/dashboard")
        break
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md border-gray-200 bg-white shadow-xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Image src="/msu-logo.png" alt="MSU Logo" width={80} height={80} className="h-20 w-20" />
          </div>
          <CardTitle className="text-2xl text-red-900">MSU ELMS Login</CardTitle>
          <CardDescription className="text-gray-600">Mindanao State University - Buug Campus</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedRole} onValueChange={(v) => setSelectedRole(v as UserRole)}>
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger value="student" className="data-[state=active]:bg-red-900 data-[state=active]:text-white">
                <GraduationCap className="mr-2 h-4 w-4" />
                Student
              </TabsTrigger>
              <TabsTrigger value="teacher" className="data-[state=active]:bg-red-900 data-[state=active]:text-white">
                <BookOpen className="mr-2 h-4 w-4" />
                Teacher
              </TabsTrigger>
              <TabsTrigger value="admin" className="data-[state=active]:bg-red-900 data-[state=active]:text-white">
                <Shield className="mr-2 h-4 w-4" />
                Admin
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <TabsContent value="student" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@msu.edu.ph"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </TabsContent>

              <TabsContent value="teacher" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="teacher@msu.edu.ph"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </TabsContent>

              <TabsContent value="admin" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@msu.edu.ph"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </TabsContent>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button type="submit" className="w-full bg-red-900 text-white hover:bg-red-800">
                Sign In
              </Button>

              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-xs text-gray-700">
                  <strong>Demo Credentials:</strong>
                  <br />
                  Student: student@msu.edu.ph / student123
                  <br />
                  Teacher: teacher@msu.edu.ph / teacher123
                  <br />
                  Admin: admin@msu.edu.ph / admin123
                </p>
              </div>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
