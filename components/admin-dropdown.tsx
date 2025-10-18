"use client"

import { ChevronDown } from "lucide-react"
import Link from "next/link"

export function AdminDropdown() {
  const offices = [
    { name: "Office of the Chancellor", href: "#" },
    { name: "Office of the Campus Secretary", href: "#" },
    { name: "Office of the Vice Chancellor for Admin & Finance", href: "#" },
    { name: "Office of the Vice Chancellor for Planning & Development", href: "#" },
    { name: "Office of the Budget Director", href: "#" },
    { name: "Office of the Campus Accountant", href: "#" },
    { name: "Office of the Campus Cashier", href: "#" },
    { name: "Office of the Human Resource & Development", href: "#" },
  ]

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 px-3 lg:px-4 py-4 text-xs lg:text-sm font-medium text-white transition-colors hover:bg-white/10 whitespace-nowrap">
        Administration
        <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4 group-hover:rotate-180 transition-transform" />
      </button>

      <div className="absolute left-0 top-full w-80 bg-white text-slate-900 shadow-2xl z-50 border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="py-1">
          {offices.map((office, idx) => (
            <Link
              key={idx}
              href={office.href}
              className="block px-4 py-3 text-sm hover:bg-slate-100 transition-colors border-b border-slate-100 last:border-b-0"
            >
              {office.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
