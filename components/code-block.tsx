"use client"

import { useState } from "react"
import { Check, Copy, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CodeBlockProps {
  code: string
  language: string
  title?: string
  filename?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  tabs?: { label: string; code: string; language: string }[]
  runnable?: boolean
  downloadable?: boolean
}

export default function CodeBlock({
  code,
  language,
  title,
  filename,
  showLineNumbers = false,
  highlightLines = [],
  tabs,
  runnable = false,
  downloadable = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const copyToClipboard = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const downloadCode = (codeToDownload: string, fileName: string) => {
    const blob = new Blob([codeToDownload], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName || `code.${language}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatCode = (codeString: string) => {
    return codeString.split("\n").map((line, index) => {
      const lineNumber = index + 1
      const isHighlighted = highlightLines.includes(lineNumber)

      return (
        <div key={index} className={`flex ${isHighlighted ? "bg-sand-yellow/20" : ""}`}>
          {showLineNumbers && (
            <span className="select-none text-gunmetal/40 text-sm pr-4 text-right w-8 flex-shrink-0">{lineNumber}</span>
          )}
          <span className="text-sm">{line}</span>
        </div>
      )
    })
  }

  const renderCodeContent = (codeString: string, lang: string) => (
    <div className="relative">
      <div className="flex items-center justify-between p-3 bg-gunmetal border-b border-gunmetal/20">
        <div className="flex items-center gap-2">
          {filename && <span className="text-ivory-cream text-sm font-mono">{filename}</span>}
          <Badge variant="outline" className="text-xs text-ivory-cream border-ivory-cream/30">
            {lang}
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          {runnable && (
            <Button size="sm" variant="ghost" className="h-7 px-2 text-ivory-cream hover:bg-midnight-green/50">
              <ExternalLink className="h-3 w-3 mr-1" />
              Run
            </Button>
          )}
          {downloadable && (
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-2 text-ivory-cream hover:bg-midnight-green/50"
              onClick={() => downloadCode(codeString, filename || `code.${lang}`)}
            >
              <Download className="h-3 w-3" />
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-ivory-cream hover:bg-midnight-green/50"
            onClick={() => copyToClipboard(codeString)}
          >
            {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
          </Button>
        </div>
      </div>
      <div className="p-4 bg-gunmetal text-ivory-cream overflow-x-auto">
        <pre className="text-sm font-mono">
          <code>{formatCode(codeString)}</code>
        </pre>
      </div>
    </div>
  )

  if (tabs && tabs.length > 0) {
    return (
      <div className="my-6 rounded-lg border border-light-silver overflow-hidden">
        {title && (
          <div className="px-4 py-2 bg-light-silver/10 border-b border-light-silver">
            <h4 className="font-medium text-gunmetal">{title}</h4>
          </div>
        )}
        <Tabs value={activeTab.toString()} onValueChange={(value) => setActiveTab(Number.parseInt(value))}>
          <TabsList className="w-full justify-start rounded-none bg-light-silver/20 border-b border-light-silver">
            {tabs.map((tab, index) => (
              <TabsTrigger
                key={index}
                value={index.toString()}
                className="data-[state=active]:bg-background data-[state=active]:text-gunmetal"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab, index) => (
            <TabsContent key={index} value={index.toString()} className="m-0">
              {renderCodeContent(tab.code, tab.language)}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    )
  }

  return (
    <div className="my-6 rounded-lg border border-light-silver overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-light-silver/10 border-b border-light-silver">
          <h4 className="font-medium text-gunmetal">{title}</h4>
        </div>
      )}
      {renderCodeContent(code, language)}
    </div>
  )
}
