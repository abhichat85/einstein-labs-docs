"use client"

import { useState } from "react"
import { Check, ChevronDown, GitBranch, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface Version {
  id: string
  name: string
  type: "release" | "branch" | "tag"
  isLatest?: boolean
  isPrerelease?: boolean
  releaseDate?: string
}

const versions: Version[] = [
  { id: "v2.1.0", name: "v2.1.0", type: "release", isLatest: true, releaseDate: "2024-01-15" },
  { id: "v2.0.0", name: "v2.0.0", type: "release", releaseDate: "2024-01-01" },
  { id: "v2.0.0-beta.1", name: "v2.0.0-beta.1", type: "release", isPrerelease: true, releaseDate: "2023-12-15" },
  { id: "main", name: "main", type: "branch" },
  { id: "develop", name: "develop", type: "branch" },
  { id: "feature/new-auth", name: "feature/new-auth", type: "branch" },
]

interface VersionSelectorProps {
  currentVersion?: string
  onVersionChange?: (version: string) => void
}

export default function VersionSelector({ currentVersion = "v2.1.0", onVersionChange }: VersionSelectorProps) {
  const [selectedVersion, setSelectedVersion] = useState(currentVersion)

  const handleVersionChange = (versionId: string) => {
    setSelectedVersion(versionId)
    onVersionChange?.(versionId)
    // In a real implementation, this would navigate to the selected version
    console.log(`Switching to version: ${versionId}`)
  }

  const getVersionIcon = (type: Version["type"]) => {
    switch (type) {
      case "release":
      case "tag":
        return <Tag className="h-3 w-3" />
      case "branch":
        return <GitBranch className="h-3 w-3" />
      default:
        return null
    }
  }

  const selectedVersionData = versions.find((v) => v.id === selectedVersion)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between bg-background border-light-silver">
          <div className="flex items-center gap-2">
            {selectedVersionData && getVersionIcon(selectedVersionData.type)}
            <span className="font-mono text-sm">{selectedVersion}</span>
            {selectedVersionData?.isLatest && (
              <Badge variant="secondary" className="text-xs">
                Latest
              </Badge>
            )}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="start">
        <DropdownMenuLabel>Releases</DropdownMenuLabel>
        {versions
          .filter((v) => v.type === "release")
          .map((version) => (
            <DropdownMenuItem
              key={version.id}
              onClick={() => handleVersionChange(version.id)}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {getVersionIcon(version.type)}
                <span className="font-mono text-sm">{version.name}</span>
                {version.isLatest && (
                  <Badge variant="secondary" className="text-xs">
                    Latest
                  </Badge>
                )}
                {version.isPrerelease && (
                  <Badge variant="outline" className="text-xs">
                    Beta
                  </Badge>
                )}
              </div>
              {selectedVersion === version.id && <Check className="h-4 w-4 text-midnight-green" />}
            </DropdownMenuItem>
          ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Branches</DropdownMenuLabel>
        {versions
          .filter((v) => v.type === "branch")
          .map((version) => (
            <DropdownMenuItem
              key={version.id}
              onClick={() => handleVersionChange(version.id)}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {getVersionIcon(version.type)}
                <span className="font-mono text-sm">{version.name}</span>
              </div>
              {selectedVersion === version.id && <Check className="h-4 w-4 text-midnight-green" />}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
