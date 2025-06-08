"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Filter, X, Clock, FileText, Code, Book } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

interface SearchResult {
  id: string
  title: string
  content: string
  url: string
  type: "guide" | "api" | "reference" | "tutorial"
  category: string
  lastUpdated: string
  relevance: number
}

interface SearchFilters {
  types: string[]
  categories: string[]
  dateRange: string
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    title: "Getting Started with Authentication",
    content: "Learn how to implement JWT authentication in your Einstein Labs projects...",
    url: "/api-docs/authentication",
    type: "guide",
    category: "Authentication",
    lastUpdated: "2024-01-15",
    relevance: 0.95,
  },
  {
    id: "2",
    title: "User API Endpoints",
    content: "Complete reference for user management API endpoints including create, read, update...",
    url: "/api-docs/users",
    type: "api",
    category: "API Reference",
    lastUpdated: "2024-01-14",
    relevance: 0.87,
  },
  {
    id: "3",
    title: "Deployment with Docker",
    content: "Step-by-step guide to deploy your application using Docker containers...",
    url: "/deployment/docker",
    type: "tutorial",
    category: "Deployment",
    lastUpdated: "2024-01-13",
    relevance: 0.82,
  },
]

const typeIcons = {
  guide: FileText,
  api: Code,
  reference: Book,
  tutorial: Book,
}

export default function AdvancedSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [filters, setFilters] = useState<SearchFilters>({
    types: [],
    categories: [],
    dateRange: "all",
  })
  const [recentSearches, setRecentSearches] = useState<string[]>(["authentication", "deployment", "api endpoints"])
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
        searchRef.current?.focus()
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (query.length > 2) {
      // Simulate search with filtering
      const filteredResults = mockResults
        .filter((result) => {
          const matchesQuery =
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.content.toLowerCase().includes(query.toLowerCase())
          const matchesType = filters.types.length === 0 || filters.types.includes(result.type)
          const matchesCategory = filters.categories.length === 0 || filters.categories.includes(result.category)

          return matchesQuery && matchesType && matchesCategory
        })
        .sort((a, b) => b.relevance - a.relevance)

      setResults(filteredResults)
    } else {
      setResults([])
    }
  }, [query, filters])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    if (searchQuery && !recentSearches.includes(searchQuery)) {
      setRecentSearches((prev) => [searchQuery, ...prev.slice(0, 4)])
    }
  }

  const toggleFilter = (filterType: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }))
  }

  const clearFilters = () => {
    setFilters({ types: [], categories: [], dateRange: "all" })
  }

  const activeFiltersCount = filters.types.length + filters.categories.length + (filters.dateRange !== "all" ? 1 : 0)

  return (
    <>
      {/* Search Trigger */}
      <div className="relative">
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal bg-background border-light-silver hover:bg-light-silver/20"
          onClick={() => setIsOpen(true)}
        >
          <Search className="mr-2 h-4 w-4 text-gunmetal/60" />
          <span className="text-gunmetal/60">Search documentation...</span>
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-0 shadow-lg duration-200 sm:rounded-lg">
            <Command className="overflow-hidden rounded-lg border-0">
              <div className="flex items-center border-b border-light-silver px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 text-gunmetal/60" />
                <CommandInput
                  ref={searchRef}
                  placeholder="Search documentation..."
                  value={query}
                  onValueChange={handleSearch}
                  className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gunmetal/60 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Filter className="h-4 w-4" />
                        {activeFiltersCount > 0 && (
                          <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                            {activeFiltersCount}
                          </Badge>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" align="end">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Filters</h4>
                          {activeFiltersCount > 0 && (
                            <Button variant="ghost" size="sm" onClick={clearFilters}>
                              Clear all
                            </Button>
                          )}
                        </div>

                        <div>
                          <h5 className="mb-2 text-sm font-medium">Content Type</h5>
                          <div className="space-y-2">
                            {["guide", "api", "reference", "tutorial"].map((type) => (
                              <div key={type} className="flex items-center space-x-2">
                                <Checkbox
                                  id={type}
                                  checked={filters.types.includes(type)}
                                  onCheckedChange={() => toggleFilter("types", type)}
                                />
                                <label htmlFor={type} className="text-sm capitalize">
                                  {type}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="mb-2 text-sm font-medium">Category</h5>
                          <div className="space-y-2">
                            {["Authentication", "API Reference", "Deployment", "Getting Started"].map((category) => (
                              <div key={category} className="flex items-center space-x-2">
                                <Checkbox
                                  id={category}
                                  checked={filters.categories.includes(category)}
                                  onCheckedChange={() => toggleFilter("categories", category)}
                                />
                                <label htmlFor={category} className="text-sm">
                                  {category}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CommandList className="max-h-[400px] overflow-y-auto">
                {query.length === 0 && (
                  <CommandGroup heading="Recent searches">
                    {recentSearches.map((search, index) => (
                      <CommandItem
                        key={index}
                        onSelect={() => handleSearch(search)}
                        className="flex items-center gap-2 px-4 py-2"
                      >
                        <Clock className="h-4 w-4 text-gunmetal/60" />
                        <span>{search}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {query.length > 0 && results.length === 0 && (
                  <CommandEmpty>No results found for "{query}"</CommandEmpty>
                )}

                {results.length > 0 && (
                  <CommandGroup heading={`${results.length} results`}>
                    {results.map((result) => {
                      const Icon = typeIcons[result.type]
                      return (
                        <CommandItem
                          key={result.id}
                          onSelect={() => {
                            window.location.href = result.url
                            setIsOpen(false)
                          }}
                          className="flex flex-col items-start gap-1 px-4 py-3"
                        >
                          <div className="flex items-center gap-2 w-full">
                            <Icon className="h-4 w-4 text-orange-pantone" />
                            <span className="font-medium">{result.title}</span>
                            <Badge variant="outline" className="ml-auto text-xs">
                              {result.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gunmetal/70 line-clamp-2">{result.content}</p>
                          <div className="flex items-center gap-2 text-xs text-gunmetal/60">
                            <span>{result.category}</span>
                            <span>•</span>
                            <span>Updated {result.lastUpdated}</span>
                          </div>
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </div>
        </div>
      )}
    </>
  )
}
