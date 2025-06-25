"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import Link from "next/link"
import { Play } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/ui/code-block"
import { Button } from "@/components/ui/button"

interface AlgorithmCodeTabsProps {
  codeSnippets: Record<string, string>
  defaultLanguage?: string
  className?: string
}

const languageDisplayNames: Record<string, string> = {
  python: "Python",
  javascript: "JavaScript",
  java: "Java",
  csharp: "C#",
  cpp: "C++",
  typescript: "TypeScript",
  go: "Go",
  php: "PHP",
  ruby: "Ruby",
  swift: "Swift",
  rust: "Rust",
}

const languageSyntaxMapping: Record<string, string> = {
  python: "python",
  javascript: "javascript",
  java: "java",
  csharp: "csharp",
  cpp: "cpp",
  typescript: "typescript",
  go: "go",
  php: "php",
  ruby: "ruby",
  swift: "swift",
  rust: "rust",
}

// Map our language keys to compiler-supported languages
const compilerLanguageMapping: Record<string, string> = {
  python: "python",
  javascript: "javascript",
  java: "java",
  cpp: "cpp",
}

export function AlgorithmCodeTabs({ codeSnippets, defaultLanguage = "python", className }: AlgorithmCodeTabsProps) {
  const availableLanguages = Object.keys(codeSnippets).filter(
    (langKey) =>
      Object.prototype.hasOwnProperty.call(languageSyntaxMapping, langKey.toLowerCase()) &&
      codeSnippets[langKey]?.trim() !== "",
  )

  if (availableLanguages.length === 0) {
    return <p className="text-slate-400 my-6">No code implementations available for this algorithm yet.</p>
  }

  const effectiveDefaultLanguage = availableLanguages.includes(defaultLanguage.toLowerCase())
    ? defaultLanguage.toLowerCase()
    : availableLanguages[0]

  const [currentTab, setCurrentTab] = useState(effectiveDefaultLanguage)

  const handleRunInCompiler = () => {
    const currentCode = codeSnippets[currentTab]
    const compilerLanguage = compilerLanguageMapping[currentTab.toLowerCase()]
    
    if (currentCode && compilerLanguage) {
      // Store the code and language in sessionStorage
      sessionStorage.setItem('compilerCode', currentCode)
      sessionStorage.setItem('compilerLanguage', compilerLanguage)
      
      // Navigate to compiler (will be handled by the Link component)
    }
  }

  // Check if current language is supported by the compiler
  const isCompilerSupported = compilerLanguageMapping.hasOwnProperty(currentTab.toLowerCase())

  return (
    <div className={cn("my-6 md:my-8", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="text-xl lg:text-2xl font-semibold text-slate-100">Algorithm Implementation:</h3>
        {isCompilerSupported && (
          <Link href="/compiler" onClick={handleRunInCompiler}>
            <Button
              variant="outline"
              size="sm"
              className="bg-sky-600 hover:bg-sky-700 text-white border-sky-500 hover:border-sky-600 transition-colors w-full sm:w-auto"
            >
              <Play className="h-4 w-4 mr-2" />
              Run with Online Compiler
            </Button>
          </Link>
        )}
      </div>
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="flex flex-wrap w-full gap-1.5 bg-slate-700/70 p-2 rounded-md h-auto">
          {availableLanguages.map((langKey) => (
            <TabsTrigger
              key={langKey}
              value={langKey.toLowerCase()}
              className="text-sm font-medium data-[state=active]:bg-sky-500 data-[state=active]:text-white text-slate-300 hover:bg-slate-600/60 transition-colors px-3 py-2 rounded-sm whitespace-nowrap min-w-fit"
            >
              {languageDisplayNames[langKey.toLowerCase()] || langKey}
            </TabsTrigger>
          ))}
        </TabsList>
        {availableLanguages.map((langKey) => (
          <TabsContent key={langKey} value={langKey.toLowerCase()} className="mt-3">
            <CodeBlock
              code={codeSnippets[langKey]}
              language={languageSyntaxMapping[langKey.toLowerCase()]}
              className="shadow-lg"
              showLineNumbers={true}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
