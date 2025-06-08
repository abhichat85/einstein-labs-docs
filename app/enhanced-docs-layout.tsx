"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, FileText, Home, Menu, Settings, X, Moon, Sun, MessageSquare, Edit3, Star, GitBranch } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import AdvancedSearch from "@/components/advanced-search"
import TableOfContents from "@/components/table-of-contents"
import VersionSelector from "@/components/version-selector"
import BreadcrumbNav from "@/components/breadcrumb-nav"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface EnhancedDocsLayoutProps {
  children: React.ReactNode
}

export default function EnhancedDocsLayout({ children }: EnhancedDocsLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { theme, setTheme } = useTheme()

  const navigation = [
    {
      name: "Home",
      href: "/",
      icon: Home,
      description: "Documentation overview",
    },
    {
      name: "Getting Started",
      href: "/getting-started",
      icon: FileText,
      description: "Setup and installation guide",
    },
    {
      name: "System Design",
      href: "/system-design",
      icon: Settings,
      description: "Architecture and patterns",
    },
    {
      name: "API Documentation",
      href: "/api-docs",
      icon: FileText,
      description: "Complete API reference",
    },
    {
      name: "How-to Guides",
      href: "/how-to-guides",
      icon: Book,
      description: "Step-by-step tutorials",
    },
    {
      name: "Deployment",
      href: "/deployment",
      icon: FileText,
      description: "Production deployment",
    },
    {
      name: "Contributing",
      href: "/contributing",
      icon: FileText,
      description: "Contribution guidelines",
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex min-h-screen bg-background">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-light-silver/20 z-50">
        <div
          className="h-full bg-orange-pantone transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <Button variant="ghost" size="icon" className="fixed top-6 left-4 z-40" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>

        {sidebarOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed inset-y-0 left-0 w-80 bg-background border-r border-light-silver p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gunmetal">Einstein Labs</h2>
                  <p className="text-sm text-gunmetal/60">Documentation</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <AdvancedSearch />
                <VersionSelector />

                <nav className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex flex-col px-3 py-2 text-sm rounded-md transition-colors ${
                        pathname === item.href
                          ? "bg-midnight-green text-ivory-cream"
                          : "text-gunmetal hover:bg-light-silver/20"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-3 h-4 w-4" />
                        {item.name}
                      </div>
                      <span className="text-xs opacity-70 ml-7 mt-1">{item.description}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-80">
          <div className="flex flex-col h-0 flex-1 bg-background border-r border-light-silver">
            {/* Header */}
            <div className="flex items-center justify-between h-16 flex-shrink-0 px-6 bg-midnight-green">
              <div>
                <h2 className="text-lg font-bold text-ivory-cream">Einstein Labs</h2>
                <p className="text-xs text-light-silver">Documentation</p>
              </div>
              <Badge variant="outline" className="text-xs text-ivory-cream border-ivory-cream/30">
                v2.1.0
              </Badge>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6">
              <AdvancedSearch />
              <VersionSelector />

              <Separator />

              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex flex-col px-3 py-2 text-sm rounded-md transition-colors ${
                      pathname === item.href
                        ? "bg-midnight-green text-ivory-cream"
                        : "text-gunmetal hover:bg-light-silver/20"
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-3 h-4 w-4" />
                      {item.name}
                    </div>
                    <span className="text-xs opacity-70 ml-7 mt-1">{item.description}</span>
                  </Link>
                ))}
              </nav>

              <Separator />

              {/* Quick actions */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gunmetal">Quick Actions</h4>
                <div className="space-y-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start h-8">
                    <Edit3 className="mr-2 h-3 w-3" />
                    Edit this page
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start h-8">
                    <MessageSquare className="mr-2 h-3 w-3" />
                    Give feedback
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start h-8">
                    <Star className="mr-2 h-3 w-3" />
                    Star on GitHub
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top bar */}
        <header className="bg-background border-b border-light-silver px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="lg:hidden">
                <div className="w-8" /> {/* Spacer for mobile menu button */}
              </div>
              <BreadcrumbNav />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button variant="ghost" size="sm">
                <GitBranch className="mr-2 h-4 w-4" />
                Edit on GitHub
              </Button>
            </div>
          </div>
        </header>

        {/* Content area with TOC */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main content */}
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <div className="py-8">
              <div className="max-w-4xl mx-auto px-6 lg:px-8">{children}</div>
            </div>
          </main>

          {/* Table of Contents */}
          <aside className="hidden xl:block w-64 flex-shrink-0 border-l border-light-silver">
            <div className="sticky top-0 h-screen overflow-y-auto p-6">
              <TableOfContents />
            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer className="bg-gunmetal text-ivory-cream py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-3">Documentation</h3>
                <ul className="space-y-2 text-sm text-light-silver">
                  <li>
                    <Link href="/getting-started" className="hover:text-ivory-cream">
                      Getting Started
                    </Link>
                  </li>
                  <li>
                    <Link href="/api-docs" className="hover:text-ivory-cream">
                      API Reference
                    </Link>
                  </li>
                  <li>
                    <Link href="/how-to-guides" className="hover:text-ivory-cream">
                      Guides
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Community</h3>
                <ul className="space-y-2 text-sm text-light-silver">
                  <li>
                    <Link href="#" className="hover:text-ivory-cream">
                      GitHub
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-ivory-cream">
                      Discord
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-ivory-cream">
                      Twitter
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Support</h3>
                <ul className="space-y-2 text-sm text-light-silver">
                  <li>
                    <Link href="#" className="hover:text-ivory-cream">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-ivory-cream">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-ivory-cream">
                      Status
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Legal</h3>
                <ul className="space-y-2 text-sm text-light-silver">
                  <li>
                    <Link href="#" className="hover:text-ivory-cream">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-ivory-cream">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-ivory-cream">
                      License
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <Separator className="my-6 bg-light-silver/20" />
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-light-silver">
              <p>© {new Date().getFullYear()} Einstein Labs. All rights reserved.</p>
              <p>Built with ❤️ using Next.js and Tailwind CSS</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
