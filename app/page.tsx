"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, ArrowRight, Calendar, Users, BookOpen, Zap } from "lucide-react"
import { MSULogo } from "@/components/msu-logo"
import { MobileNav } from "@/components/layout/mobile-nav"
import { useState } from "react"
import { AdminDropdown } from "@/components/admin-dropdown"

export default function LandingPage() {
  const [activeNews, setActiveNews] = useState(0)

  const newsItems = [
    {
      id: 1,
      title: "1st Environmental Science Research Congress 2025",
      description:
        "Join researchers, scholars, and experts for cutting-edge environmental research discussions. June 16-18, 2025 at MSU Buug Gymnasium.",
      category: "Research",
      date: "June 16-18, 2025",
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: 2,
      title: "Academic Calendar 2025-2026 Released",
      description:
        "The new academic calendar is now available. Important dates include enrollment periods, midterm exams, and graduation ceremonies.",
      category: "Academic",
      date: "Now Available",
      color: "from-amber-500 to-orange-600",
    },
    {
      id: 3,
      title: "Scholarship Opportunities for Deserving Students",
      description:
        "MSU Buug is offering various scholarship programs for qualified students. Application deadline is March 31, 2025.",
      category: "Scholarship",
      date: "Deadline: March 31",
      color: "from-rose-500 to-red-600",
    },
    {
      id: 4,
      title: "New Learning Management System Launch",
      description:
        "Experience the enhanced eLMS platform with improved features for better learning and teaching experience.",
      category: "Technology",
      date: "Now Live",
      color: "from-amber-600 to-yellow-600",
    },
  ]

  const stats = [
    { label: "Active Students", value: "2,500+", icon: Users },
    { label: "Courses Available", value: "150+", icon: BookOpen },
    { label: "Faculty Members", value: "200+", icon: Users },
    { label: "Learning Resources", value: "5,000+", icon: Zap },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Top Utility Navigation */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-sm hidden md:block sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end gap-4 lg:gap-6 py-2 text-xs lg:text-sm">
            <Link href="#alumni" className="text-slate-600 hover:text-primary hover:underline transition-colors">
              Alumni
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              href="/login"
              className="text-slate-600 hover:text-primary hover:underline font-semibold transition-colors"
            >
              MSU eLMS Login
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              href="/login?role=teacher"
              className="text-slate-600 hover:text-primary hover:underline transition-colors"
            >
              Faculty Portal
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              href="/login?role=student"
              className="text-slate-600 hover:text-primary hover:underline transition-colors"
            >
              Student Portal
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="#contact" className="text-slate-600 hover:text-primary hover:underline transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Header with Logo and University Name */}
      <header className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-4 lg:py-6">
          <div className="flex items-center justify-between gap-3 lg:gap-4">
            <div className="flex items-center gap-3 lg:gap-4 flex-1">
              <MSULogo size="md" />
              <div>
                <h1 className="text-base sm:text-xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent leading-tight">
                  MINDANAO STATE UNIVERSITY - BUUG
                </h1>
                <p className="text-xs sm:text-sm lg:text-base text-slate-500">Datu Panas, Buug, Zamboanga Sibugay</p>
              </div>
            </div>
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation Bar */}
      <nav className="bg-gradient-to-r from-primary to-primary/80 shadow-lg hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-start gap-1">
            <Link
              href="/"
              className="px-3 lg:px-4 py-4 text-xs lg:text-sm font-medium text-white transition-colors hover:bg-white/10 whitespace-nowrap"
            >
              Home
            </Link>
            <button className="flex items-center gap-1 px-3 lg:px-4 py-4 text-xs lg:text-sm font-medium text-white transition-colors hover:bg-white/10 whitespace-nowrap">
              Transparency
              <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4" />
            </button>
            <button className="flex items-center gap-1 px-3 lg:px-4 py-4 text-xs lg:text-sm font-medium text-white transition-colors hover:bg-white/10 whitespace-nowrap">
              Admission
            </button>
            <button className="flex items-center gap-1 px-3 lg:px-4 py-4 text-xs lg:text-sm font-medium text-white transition-colors hover:bg-white/10 whitespace-nowrap">
              Academics
              <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4" />
            </button>
            <AdminDropdown />
            <button className="flex items-center gap-1 px-3 lg:px-4 py-4 text-xs lg:text-sm font-medium text-white transition-colors hover:bg-white/10 whitespace-nowrap">
              Research & Extension
              <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4" />
            </button>
            <button className="flex items-center gap-1 px-3 lg:px-4 py-4 text-xs lg:text-sm font-medium text-white transition-colors hover:bg-white/10 whitespace-nowrap">
              Sustainability
            </button>
            <button className="flex items-center gap-1 px-3 lg:px-4 py-4 text-xs lg:text-sm font-medium text-white transition-colors hover:bg-white/10 whitespace-nowrap">
              Offices
              <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-slate-900 py-12 lg:py-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid items-center gap-8 lg:gap-12 py-8 lg:py-16 md:grid-cols-2">
              <div className="text-white text-center md:text-left">
                <div className="inline-block mb-4 px-4 py-2 bg-white/20 rounded-full border border-white/30 backdrop-blur-sm">
                  <span className="text-xs lg:text-sm font-semibold text-white">Welcome to MSU eLMS</span>
                </div>
                <h2 className="mb-4 lg:mb-6 text-3xl lg:text-5xl font-bold leading-tight">
                  Your Gateway to <span className="text-accent">Modern Learning</span>
                </h2>
                <p className="mb-8 lg:mb-10 text-base lg:text-lg leading-relaxed text-white/90">
                  Experience seamless education with our integrated learning platform. Access courses, collaborate with
                  peers, and achieve academic excellence all in one place.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center md:justify-start">
                  <Link href="/login?role=student" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full bg-white text-primary hover:bg-slate-100 font-semibold shadow-lg"
                    >
                      Student Portal
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login?role=teacher" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full border-2 border-white text-white hover:bg-white/10 bg-transparent font-semibold"
                    >
                      Faculty Portal
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-yellow-400 rounded-2xl blur-2xl opacity-30"></div>
                  <MSULogo size="lg" className="relative z-10 drop-shadow-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-8 lg:py-12 border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
              {stats.map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <div key={idx} className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <p className="text-2xl lg:text-3xl font-bold text-primary mb-1">{stat.value}</p>
                    <p className="text-xs lg:text-sm text-slate-600">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Featured News Carousel */}
        <div className="bg-gradient-to-b from-slate-50 to-white py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-8 lg:mb-12">
              <h3 className="text-2xl lg:text-4xl font-bold text-slate-900 mb-2">Featured News & Updates</h3>
              <p className="text-slate-600">Stay informed with the latest announcements and events</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Main Featured Article */}
              <div className="lg:col-span-2">
                <div
                  className={`bg-gradient-to-br ${newsItems[activeNews].color} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full`}
                >
                  <div className="p-8 lg:p-12 text-white h-full flex flex-col justify-between">
                    <div>
                      <div className="inline-block mb-4 px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                        <span className="text-xs lg:text-sm font-semibold">{newsItems[activeNews].category}</span>
                      </div>
                      <h2 className="text-2xl lg:text-4xl font-bold mb-4 leading-tight">
                        {newsItems[activeNews].title}
                      </h2>
                      <p className="text-base lg:text-lg text-white/90 mb-6 leading-relaxed">
                        {newsItems[activeNews].description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm lg:text-base font-semibold flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {newsItems[activeNews].date}
                      </span>
                      <Button className="bg-white text-slate-900 hover:bg-slate-100 font-semibold">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* News List Sidebar */}
              <div className="space-y-3 lg:space-y-4">
                {newsItems.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveNews(idx)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                      activeNews === idx
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white text-slate-900 hover:bg-slate-50 border border-slate-200"
                    }`}
                  >
                    <p className="text-xs lg:text-sm font-semibold opacity-75 mb-1">{item.category}</p>
                    <p className="text-sm lg:text-base font-bold line-clamp-2">{item.title}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Portal Access Cards */}
        <div className="bg-white py-12 lg:py-20 border-t border-slate-200">
          <div className="container mx-auto px-4">
            <div className="mb-8 lg:mb-12">
              <h3 className="text-2xl lg:text-4xl font-bold text-slate-900 mb-2">Quick Access Portals</h3>
              <p className="text-slate-600">Choose your role to access the platform</p>
            </div>

            <div className="grid gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/login?role=student" className="group">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
                  <div className="relative z-10">
                    <div className="mb-6 flex h-16 w-16 lg:h-20 lg:w-20 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                      <BookOpen className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                    </div>
                    <h3 className="mb-3 text-xl lg:text-2xl font-bold text-slate-900">Student Portal</h3>
                    <p className="mb-6 text-sm lg:text-base text-slate-600 leading-relaxed">
                      Access your courses, submit assignments, check grades, and collaborate with classmates
                    </p>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg font-semibold">
                      Enter Portal
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>

              <Link href="/login?role=teacher" className="group">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
                  <div className="relative z-10">
                    <div className="mb-6 flex h-16 w-16 lg:h-20 lg:w-20 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                      <Users className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                    </div>
                    <h3 className="mb-3 text-xl lg:text-2xl font-bold text-slate-900">Faculty Portal</h3>
                    <p className="mb-6 text-sm lg:text-base text-slate-600 leading-relaxed">
                      Manage courses, grade assignments, track student progress, and communicate with students
                    </p>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg font-semibold">
                      Enter Portal
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>

              <Link href="/login?role=admin" className="group sm:col-span-2 lg:col-span-1">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
                  <div className="relative z-10">
                    <div className="mb-6 flex h-16 w-16 lg:h-20 lg:w-20 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                      <Zap className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                    </div>
                    <h3 className="mb-3 text-xl lg:text-2xl font-bold text-slate-900">Admin Portal</h3>
                    <p className="mb-6 text-sm lg:text-base text-slate-600 leading-relaxed">
                      Manage users, courses, system settings, generate reports, and view analytics
                    </p>
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg font-semibold">
                      Enter Portal
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional News Grid */}
        <div className="bg-gradient-to-b from-slate-50 to-white py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-8 lg:mb-12">
              <h3 className="text-2xl lg:text-4xl font-bold text-slate-900 mb-2">More News & Announcements</h3>
              <p className="text-slate-600">Explore additional updates from MSU Buug</p>
            </div>

            <div className="grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="group rounded-xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="h-40 lg:h-48 bg-gradient-to-br from-emerald-400 to-teal-600 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="inline-block mb-3 px-3 py-1 bg-emerald-100 rounded-full">
                    <span className="text-xs font-semibold text-emerald-700">Research</span>
                  </div>
                  <h4 className="mb-3 text-lg lg:text-xl font-bold text-slate-900">Environmental Science Congress</h4>
                  <p className="mb-4 text-sm lg:text-base text-slate-600 line-clamp-2">
                    Join the 1st Environmental Science Research Congress featuring cutting-edge research presentations.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-50 bg-transparent"
                  >
                    Learn More
                  </Button>
                </div>
              </div>

              <div className="group rounded-xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="h-40 lg:h-48 bg-gradient-to-br from-blue-400 to-cyan-600 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="inline-block mb-3 px-3 py-1 bg-blue-100 rounded-full">
                    <span className="text-xs font-semibold text-blue-700">Academic</span>
                  </div>
                  <h4 className="mb-3 text-lg lg:text-xl font-bold text-slate-900">2025-2026 Academic Calendar</h4>
                  <p className="mb-4 text-sm lg:text-base text-slate-600 line-clamp-2">
                    View important dates, enrollment periods, and academic milestones for the upcoming year.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    View Calendar
                  </Button>
                </div>
              </div>

              <div className="group rounded-xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="h-40 lg:h-48 bg-gradient-to-br from-purple-400 to-pink-600 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="inline-block mb-3 px-3 py-1 bg-purple-100 rounded-full">
                    <span className="text-xs font-semibold text-purple-700">Scholarship</span>
                  </div>
                  <h4 className="mb-3 text-lg lg:text-xl font-bold text-slate-900">Scholarship Opportunities</h4>
                  <p className="mb-4 text-sm lg:text-base text-slate-600 line-clamp-2">
                    Explore various scholarship programs available for deserving and qualified students.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-purple-500 text-purple-600 hover:bg-purple-50 bg-transparent"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>

              <div className="group rounded-xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="h-40 lg:h-48 bg-gradient-to-br from-orange-400 to-red-600 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="inline-block mb-3 px-3 py-1 bg-orange-100 rounded-full">
                    <span className="text-xs font-semibold text-orange-700">Technology</span>
                  </div>
                  <h4 className="mb-3 text-lg lg:text-xl font-bold text-slate-900">New eLMS Features</h4>
                  <p className="mb-4 text-sm lg:text-base text-slate-600 line-clamp-2">
                    Discover the latest features and improvements in our enhanced learning management system.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-orange-500 text-orange-600 hover:bg-orange-50 bg-transparent"
                  >
                    Explore Features
                  </Button>
                </div>
              </div>

              <div className="group rounded-xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="h-40 lg:h-48 bg-gradient-to-br from-indigo-400 to-blue-600 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="inline-block mb-3 px-3 py-1 bg-indigo-100 rounded-full">
                    <span className="text-xs font-semibold text-indigo-700">Event</span>
                  </div>
                  <h4 className="mb-3 text-lg lg:text-xl font-bold text-slate-900">Campus Events & Activities</h4>
                  <p className="mb-4 text-sm lg:text-base text-slate-600 line-clamp-2">
                    Stay updated with upcoming campus events, seminars, and student activities.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-indigo-500 text-indigo-600 hover:bg-indigo-50 bg-transparent"
                  >
                    View Events
                  </Button>
                </div>
              </div>

              <div className="group rounded-xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="h-40 lg:h-48 bg-gradient-to-br from-green-400 to-emerald-600 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="inline-block mb-3 px-3 py-1 bg-green-100 rounded-full">
                    <span className="text-xs font-semibold text-green-700">Support</span>
                  </div>
                  <h4 className="mb-3 text-lg lg:text-xl font-bold text-slate-900">Student Support Services</h4>
                  <p className="mb-4 text-sm lg:text-base text-slate-600 line-clamp-2">
                    Access counseling, tutoring, and other support services available to all students.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    Get Help
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 py-12 lg:py-20">
          <div className="container mx-auto px-4 text-center">
            <h3 className="mb-4 text-2xl lg:text-4xl font-bold text-white">Ready to Get Started?</h3>
            <p className="mb-8 text-base lg:text-lg text-white/90 max-w-2xl mx-auto">
              Join thousands of students and faculty members using MSU eLMS for enhanced learning and teaching
              experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login?role=student">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100 font-semibold">
                  Student Login
                </Button>
              </Link>
              <Link href="/login?role=teacher">
                <Button
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 font-semibold border-2 border-white"
                >
                  Faculty Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="contact" className="border-t border-slate-200 bg-slate-100 py-12 lg:py-16 text-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:gap-12 md:grid-cols-4 mb-12">
            {/* Column 1: University Info */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-slate-900">MINDANAO STATE UNIVERSITY - BUUG</h4>
              <div className="space-y-3 text-sm text-slate-700">
                <p>Datu Panas, Buug, Zamboanga Sibugay</p>
                <p>Email: camsec@msubuug.edu.ph</p>
                <p>Tel #: (062)-333-1015</p>
                <Link href="#" className="text-primary hover:underline font-semibold">
                  FB Page
                </Link>
              </div>
              <div className="flex gap-4 mt-6">
                <MSULogo size="sm" />
                <img src="/bagong-pilipinas-logo.png" alt="Bagong Pilipinas" className="h-16 w-auto object-contain" />
              </div>
            </div>

            {/* Column 2: Online Services */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-slate-900">ONLINE SERVICES</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-slate-900 mb-2">Portals</p>
                  <Link href="/login?role=teacher" className="text-primary hover:underline block">
                    Faculty Portal
                  </Link>
                  <Link href="/login?role=student" className="text-primary hover:underline block">
                    Student Portal
                  </Link>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-2">Web Team</p>
                  <p className="text-slate-700">(062) 333-1075</p>
                  <p className="text-slate-700">webteam@msubuug.edu.ph</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-2">Admission</p>
                  <p className="text-slate-700">admission@msubuug.edu.ph</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-2">Registrar</p>
                  <p className="text-slate-700">registrar@msubuug.edu.ph</p>
                </div>
              </div>
            </div>

            {/* Column 3: MSU System Campuses */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-slate-900">MSU SYSTEM CAMPUSES</h4>
              <div className="space-y-2 text-sm text-slate-700">
                <Link href="#" className="hover:text-primary hover:underline block">
                  Marawi City (Main Campus)
                </Link>
                <Link href="#" className="hover:text-primary hover:underline block">
                  LNAC
                </Link>
                <Link href="#" className="hover:text-primary hover:underline block">
                  Sindangan (Main Campus Ext.)
                </Link>
                <Link href="#" className="hover:text-primary hover:underline block">
                  General Santos
                </Link>
                <Link href="#" className="hover:text-primary hover:underline block">
                  Bataraza (Main Campus Ext.)
                </Link>
                <Link href="#" className="hover:text-primary hover:underline block">
                  Maguindanao
                </Link>
                <Link href="#" className="hover:text-primary hover:underline block">
                  LNCAT
                </Link>
                <Link href="#" className="hover:text-primary hover:underline block">
                  Buug
                </Link>
                <Link href="#" className="hover:text-primary hover:underline block">
                  IIT
                </Link>
                <Link href="#" className="hover:text-primary hover:underline block">
                  Sulu
                </Link>
                <Link href="#" className="hover:text-primary hover:underline block">
                  Naawan
                </Link>
                <Link href="#" className="hover:text-primary hover:underline block">
                  Tawi-Tawi
                </Link>
                <Link href="#" className="hover:text-primary hover:underline block">
                  Maigo
                </Link>
              </div>
            </div>

            {/* Column 4: Sustainable Development Goals */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-slate-900">SUSTAINABLE DEVELOPMENT GOALS</h4>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <img src="/sdg-badges.png" alt="UN Sustainable Development Goals" className="w-full h-auto rounded" />
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-slate-300 pt-8 text-center text-sm text-slate-600">
            <p>© 2025 Mindanao State University - Buug Campus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
