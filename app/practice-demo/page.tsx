'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCodingPractice } from '@/hooks/useCodingPractice'
import { useProblems } from '@/hooks/useProblems'
import { ProblemDescription } from '@/components/ProblemDescription'
import { CodeEditor } from '@/components/CodeEditor'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RefreshCw, ArrowLeft } from 'lucide-react'
import { LANGUAGES, DEFAULT_LANGUAGE } from '@/lib/constants'
import { ProblemsBrowser } from '@/components/ProblemsBrowser'

function PracticeDemoContent() {
  const { 
    userId, 
    submitCodeWithTracking, 
    savePractice, 
    userProgress,
    error 
  } = useCodingPractice()

  const { getSolutionTemplate, getTestCases, fetchProblem } = useProblems()
  const searchParams = useSearchParams()

  const [selectedProblem, setSelectedProblem] = useState<any>(null)
  const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANGUAGE)
  const [code, setCode] = useState('')
  const [loadingProblem, setLoadingProblem] = useState(false)
  const [showBrowser, setShowBrowser] = useState(false)

  // Handle problem selection
  const handleProblemSelect = useCallback((problem: any) => {
    setSelectedProblem(problem)
    setShowBrowser(false)
    
    // Set initial code to solution template
    const languageName = selectedLanguage.name.toLowerCase()
    const template = getSolutionTemplate(problem, languageName)
    setCode(template || '// Write your solution here')
  }, [selectedLanguage, getSolutionTemplate])

  // Check for problem parameter in URL and load it
  useEffect(() => {
    const problemSlug = searchParams.get('problem')
    if (problemSlug) {
      setLoadingProblem(true)
      fetchProblem(problemSlug).then((problem) => {
        if (problem) {
          handleProblemSelect(problem)
        }
      }).finally(() => {
        setLoadingProblem(false)
      })
    }
  }, [searchParams, fetchProblem, handleProblemSelect])

  // Handle language change
  const handleLanguageChange = (language: any) => {
    setSelectedLanguage(language)
    
    if (selectedProblem) {
      const languageName = language.name.toLowerCase()
      const template = getSolutionTemplate(selectedProblem, languageName)
      setCode(template || '// Write your solution here')
    }
  }

  // Handle code change
  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
  }

  // Convert Supabase problem to the format expected by components
  const convertProblemFormat = (problem: any) => {
    if (!problem) return null
    
    return {
      id: problem.slug,
      title: problem.title,
      description: problem.description,
      difficulty: problem.difficulty,
      examples: problem.examples || [],
      constraints: problem.constraints?.constraints || [],
      starterCode: problem.solution_template || {},
      testCases: problem.test_cases || []
    }
  }

  const formattedProblem = convertProblemFormat(selectedProblem)

  // Show loading state
  if (loadingProblem) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span className="text-lg">Loading problem...</span>
        </div>
      </div>
    )
  }

  // Show problem browser if no problem selected
  if (!selectedProblem || showBrowser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900">
        {/* Header */}
        <div className="border-b bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Coding Practice</h1>
                <p className="text-muted-foreground">
                  Select a problem to start practicing • User: <code className="bg-muted px-1 rounded text-xs">{userId}</code>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-xl font-bold text-primary">{userProgress?.problems_solved || 0}</p>
                    <p className="text-xs text-muted-foreground">Solved</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-green-600">{userProgress?.streak_days || 0}</p>
                    <p className="text-xs text-muted-foreground">Streak</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProblemsBrowser onSelectProblem={handleProblemSelect} showSelection={true} />
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-white dark:bg-gray-900 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBrowser(true)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Problems
          </Button>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold">{selectedProblem.title}</h1>
            <Badge variant={
              selectedProblem.difficulty === 'easy' ? 'default' :
              selectedProblem.difficulty === 'medium' ? 'secondary' : 'destructive'
            }>
              {selectedProblem.difficulty}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>User: {userId}</span>
        </div>
      </div>

      {/* Mobile Layout - Stack Vertically */}
      <div className="md:hidden h-full flex flex-col">
        <div className="h-1/2 border-b border-gray-200 dark:border-gray-700">
          {formattedProblem && <ProblemDescription problem={formattedProblem} />}
        </div>
        <div className="h-1/2">
          {formattedProblem && (
            <CodeEditor
              initialCode={code}
              problem={formattedProblem}
              onLanguageChange={handleLanguageChange}
              onCodeChange={handleCodeChange}
              onSubmit={async (submissionData) => {
                const testCases = getTestCases(selectedProblem)
                await submitCodeWithTracking({
                  code: submissionData.code,
                  language_id: submissionData.languageId,
                  input: '',
                  problem_slug: selectedProblem.slug,
                  problem_title: selectedProblem.title,
                  test_cases_passed: 1,
                  total_test_cases: testCases.length || 3
                })
              }}
              onSave={async (submissionData) => {
                await savePractice({
                  problem_slug: selectedProblem.slug,
                  problem_title: selectedProblem.title,
                  language: submissionData.language,
                  code: submissionData.code,
                  status: 'attempted',
                  test_cases_passed: 0,
                  total_test_cases: getTestCases(selectedProblem).length || 3
                })
              }}
            />
          )}
        </div>
      </div>

      {/* Desktop Layout - Split Screen */}
      <div className="hidden md:block h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} minSize={30}>
            {formattedProblem && <ProblemDescription problem={formattedProblem} />}
          </ResizablePanel>
          <ResizableHandle className="w-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors" />
          <ResizablePanel defaultSize={50} minSize={30}>
            {formattedProblem && (
              <CodeEditor
                initialCode={code}
                problem={formattedProblem}
                onLanguageChange={handleLanguageChange}
                onCodeChange={handleCodeChange}
                onSubmit={async (submissionData) => {
                  const testCases = getTestCases(selectedProblem)
                  await submitCodeWithTracking({
                    code: submissionData.code,
                    language_id: submissionData.languageId,
                    input: '',
                    problem_slug: selectedProblem.slug,
                    problem_title: selectedProblem.title,
                    test_cases_passed: 1,
                    total_test_cases: testCases.length || 3
                  })
                }}
                onSave={async (submissionData) => {
                  await savePractice({
                    problem_slug: selectedProblem.slug,
                    problem_title: selectedProblem.title,
                    language: submissionData.language,
                    code: submissionData.code,
                    status: 'attempted',
                    test_cases_passed: 0,
                    total_test_cases: getTestCases(selectedProblem).length || 3
                  })
                }}
              />
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Error Display */}
      {error && (
        <div className="absolute bottom-4 right-4">
          <Card className="border-destructive bg-destructive/10">
            <CardContent className="pt-6">
              <p className="text-destructive text-sm">{error}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <RefreshCw className="h-6 w-6 animate-spin" />
        <span className="text-lg">Loading...</span>
      </div>
    </div>
  )
}

export default function PracticeDemoPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PracticeDemoContent />
    </Suspense>
  )
} 