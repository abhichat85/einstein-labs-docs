"use client"

import { useState, useEffect } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  title: string
  level: number
  children?: TocItem[]
}

interface TableOfContentsProps {
  content?: string
  className?: string
}

export default function TableOfContents({ content, className }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Extract headings from the page
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    const items: TocItem[] = []
    const stack: TocItem[] = []

    headings.forEach((heading) => {
      const level = Number.parseInt(heading.tagName.charAt(1))
      const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, "-") || ""
      const title = heading.textContent || ""

      // Ensure heading has an ID for linking
      if (!heading.id) {
        heading.id = id
      }

      const item: TocItem = { id, title, level, children: [] }

      // Build nested structure
      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop()
      }

      if (stack.length === 0) {
        items.push(item)
      } else {
        const parent = stack[stack.length - 1]
        if (!parent.children) parent.children = []
        parent.children.push(item)
      }

      stack.push(item)
    })

    setTocItems(items)

    // Auto-expand items with children
    const expandedSet = new Set<string>()
    const addExpandedItems = (items: TocItem[]) => {
      items.forEach((item) => {
        if (item.children && item.children.length > 0) {
          expandedSet.add(item.id)
          addExpandedItems(item.children)
        }
      })
    }
    addExpandedItems(items)
    setExpandedItems(expandedSet)
  }, [content])

  useEffect(() => {
    // Track active section based on scroll position
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0,
      },
    )

    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    headings.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [])

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const renderTocItem = (item: TocItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.has(item.id)
    const isActive = activeId === item.id

    return (
      <div key={item.id} className="select-none">
        <div
          className={cn(
            "flex items-center gap-1 py-1 px-2 rounded-md cursor-pointer transition-colors",
            "hover:bg-light-silver/20",
            isActive && "bg-midnight-green/10 text-midnight-green font-medium border-r-2 border-midnight-green",
            !isActive && "text-gunmetal/70 hover:text-gunmetal",
          )}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => scrollToHeading(item.id)}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleExpanded(item.id)
              }}
              className="p-0.5 hover:bg-light-silver/30 rounded"
            >
              {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </button>
          )}
          {!hasChildren && <div className="w-4" />}
          <span className="text-sm truncate flex-1">{item.title}</span>
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-2">{item.children!.map((child) => renderTocItem(child, depth + 1))}</div>
        )}
      </div>
    )
  }

  if (tocItems.length === 0) {
    return null
  }

  return (
    <div className={cn("space-y-1", className)}>
      <h4 className="font-medium text-gunmetal mb-3 px-2">On this page</h4>
      <nav className="space-y-0.5">{tocItems.map((item) => renderTocItem(item))}</nav>
    </div>
  )
}
