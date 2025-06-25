"use client"

import { useEffect, useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language: string
  className?: string
  showLineNumbers?: boolean
  wrapLines?: boolean
}

export function CodeBlock({ code, language, className, showLineNumbers = true, wrapLines = true }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false)
  const [canCopy, setCanCopy] = useState(false)

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      setCanCopy(true)
    }
  }, [])

  const handleCopy = async () => {
    if (!canCopy) return
    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy code:", error)
    }
  }

  return (
    <div className={cn("relative group bg-slate-800 rounded-md border border-slate-700 shadow-md", className)}>
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-700">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{language}</span>
        {canCopy && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="text-slate-400 hover:text-slate-200 h-6 w-6"
            aria-label="Copy code"
          >
            {isCopied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
          </Button>
        )}
      </div>
      <SyntaxHighlighter
        language={language}
        style={okaidia}
        customStyle={{
          margin: 0,
          padding: "0.75rem 1rem",
          fontSize: "0.8125rem",
          lineHeight: "1.5",
          borderRadius: "0 0 0.375rem 0.375rem",
          backgroundColor: "transparent",
        }}
        showLineNumbers={showLineNumbers}
        lineNumberStyle={{ color: "#6b7280", fontSize: "0.75rem", marginRight: "1em", userSelect: "none" }}
        wrapLines={wrapLines}
        codeTagProps={{ style: { fontFamily: "var(--font-mono)" } }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  )
}
