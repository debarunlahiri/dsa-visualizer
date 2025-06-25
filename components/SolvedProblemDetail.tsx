'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SolvedProblem, PROGRAMMING_LANGUAGES } from '@/lib/solved-problems'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  ArrowLeft, 
  ExternalLink, 
  Copy, 
  Check, 
  Clock, 
  BarChart3, 
  BookOpen, 
  Lightbulb,
  Code,
  Tag,
  Users
} from 'lucide-react'
import { toast } from 'sonner'

interface SolvedProblemDetailProps {
  problem: SolvedProblem
}

export function SolvedProblemDetail({ problem }: SolvedProblemDetailProps) {
  const router = useRouter()
  const [selectedLanguage, setSelectedLanguage] = useState<string>('python')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const availableLanguages = PROGRAMMING_LANGUAGES.filter(lang => 
    problem.solutions[lang.id]
  )

  const handleCopyCode = async (code: string, language: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(language)
      toast.success('Code copied to clipboard!')
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      toast.error('Failed to copy code')
    }
  }

  const getLanguageColor = (languageId: string): string => {
    const colors: Record<string, string> = {
      python: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      javascript: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      typescript: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      java: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      cpp: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      csharp: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      go: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
      ruby: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      swift: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      kotlin: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300',
    }
    return colors[languageId] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 dark:text-green-400'
      case 'medium': return 'text-yellow-600 dark:text-yellow-400'
      case 'hard': return 'text-red-600 dark:text-red-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="shrink-0"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{problem.title}</h1>
            <Badge 
              variant={problem.difficulty === 'Easy' ? 'default' : 
                      problem.difficulty === 'Medium' ? 'secondary' : 'destructive'}
              className={getDifficultyColor(problem.difficulty)}
            >
              {problem.difficulty}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Badge variant="outline">{problem.category}</Badge>
            <a 
              href={problem.leetcodeLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              View on LeetCode
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Problem Description */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Problem Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">{problem.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <span className="text-sm font-medium">Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {problem.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Complexity Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">Time Complexity</span>
                </div>
                <Badge variant="outline">{problem.timeComplexity}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="text-sm font-medium">Space Complexity</span>
                </div>
                <Badge variant="outline">{problem.spaceComplexity}</Badge>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  <span className="text-sm font-medium">Approach</span>
                </div>
                <p className="text-sm text-muted-foreground">{problem.approach}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {problem.keyInsights.map((insight, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Solutions */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Solutions ({availableLanguages.length} languages)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <div className="w-full overflow-x-auto">
                  <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground w-max min-w-full">
                    {availableLanguages.map((lang) => (
                      <TabsTrigger 
                        key={lang.id} 
                        value={lang.id}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                      >
                        {lang.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {availableLanguages.map((lang) => (
                  <TabsContent key={lang.id} value={lang.id} className="mt-6">
                                          <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{lang.name} Solution</span>
                            <Badge 
                              className={getLanguageColor(lang.id)}
                              variant="secondary"
                            >
                              {lang.name}
                            </Badge>
                          </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyCode(problem.solutions[lang.id].code, lang.id)}
                          className="shrink-0"
                        >
                          {copiedCode === lang.id ? (
                            <Check className="h-4 w-4 mr-2" />
                          ) : (
                            <Copy className="h-4 w-4 mr-2" />
                          )}
                          {copiedCode === lang.id ? 'Copied!' : 'Copy'}
                        </Button>
                      </div>

                      <Card>
                        <CardContent className="p-0">
                          <ScrollArea className="h-96">
                            <pre className="p-4 text-sm">
                              <code className="language-{lang.id}">
                                {problem.solutions[lang.id].code}
                              </code>
                            </pre>
                          </ScrollArea>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Explanation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {problem.solutions[lang.id].explanation}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>


    </div>
  )
} 