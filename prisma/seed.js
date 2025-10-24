const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

async function main() {
  const users = [
    {
      email: "student@msu.edu.ph",
      password: await bcrypt.hash("student123", 10),
      role: "student",
      firstName: "Juan",
      lastName: "Dela Cruz",
      studentId: "2024-00001",
    },
    {
      email: "teacher@msu.edu.ph",
      password: await bcrypt.hash("teacher123", 10),
      role: "teacher",
      firstName: "Maria",
      lastName: "Santos",
      employeeId: "EMP-001",
    },
    {
      email: "admin@msu.edu.ph",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
      firstName: "Pedro",
      lastName: "Reyes",
      employeeId: "ADM-001",
    },
  ]

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        password: u.password,
        role: u.role,
        firstName: u.firstName,
        lastName: u.lastName,
        studentId: u.studentId,
        employeeId: u.employeeId,
      },
    })
  }

  const teacher = await prisma.user.findUnique({ where: { email: "teacher@msu.edu.ph" } })
  if (teacher) {
    await prisma.course.upsert({
      where: { code: "CS 101" },
      update: {},
      create: {
        code: "CS 101",
        name: "Introduction to Computer Science",
        description: "Fundamentals of programming and computer science concepts",
        teacherId: teacher.id,
        schedule: "MWF 9:00-10:00 AM",
        room: "Room 301",
        color: "from-blue-500 to-cyan-500",
        capacity: 40,
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log("Seed completed: demo users and course inserted.")
  })
  .catch(async (e) => {
    console.error("Seed failed:", e)
    await prisma.$disconnect()
    process.exit(1)
  })