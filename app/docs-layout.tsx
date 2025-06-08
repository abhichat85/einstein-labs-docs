"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, FileText, Home, Menu, Search, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Getting Started", href: "/getting-started", icon: FileText },
    { name: "System Design", href: "/system-design", icon: Settings },
    { name: "API Documentation", href: "/api-docs", icon: FileText },
    { name: "How-to Guides", href: "/how-to-guides", icon: Book },
    { name: "Deployment", href: "/deployment", icon: FileText },
    { name: "Contributing", href: "/contributing", icon: FileText },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-40" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>

        {sidebarOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed inset-y-0 left-0 w-64 bg-gunmetal p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-ivory-cream">Einstein Labs Docs</h2>
                <Button variant="ghost" size="icon" className="text-ivory-cream" onClick={() => setSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-2 py-2 text-sm rounded-md ${
                      pathname === item.href
                        ? "bg-midnight-green text-ivory-cream"
                        : "text-light-silver hover:bg-midnight-green/50"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-gunmetal">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-midnight-green">
              <h2 className="text-xl font-bold text-ivory-cream">Einstein Labs Docs</h2>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <div className="px-4 py-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-light-silver" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search docs..."
                    className="pl-10 bg-gunmetal border-midnight-green text-ivory-cream placeholder:text-light-silver/70"
                  />
                </div>
              </div>
              <nav className="px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-2 py-2 text-sm rounded-md ${
                      pathname === item.href
                        ? "bg-midnight-green text-ivory-cream"
                        : "text-light-silver hover:bg-midnight-green/50"
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gunmetal text-ivory-cream py-6 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-light-silver">© {new Date().getFullYear()} Einstein Labs. All rights reserved.</p>
              </div>
              <div className="flex space-x-6">
                <Link href="#" className="text-light-silver hover:text-ivory-cream">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-light-silver hover:text-ivory-cream">
                  Terms of Service
                </Link>
                <Link href="#" className="text-light-silver hover:text-ivory-cream">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
