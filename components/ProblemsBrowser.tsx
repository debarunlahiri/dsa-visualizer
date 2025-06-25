'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useProblems } from '@/hooks/useProblems'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Search, Filter, Shuffle, ChevronRight, Code, Clock, Users } from 'lucide-react'

interface ProblemsBrowserProps {
  onSelectProblem?: (problem: any) => void
  showSelection?: boolean
}

export function ProblemsBrowser({ onSelectProblem, showSelection = true }: ProblemsBrowserProps) {
  const router = useRouter()
  const {
    problems,
    loading,
    error,
    fetchProblems,
    searchProblems,
    getRandomProblems,
    getProblemsByDifficulty,
    getDifficultyColor,
    getDifficultyVariant
  } = useProblems()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedProblem, setSelectedProblem] = useState<any>(null)

  // Handle search
  const handleSearch = async () => {
    if (searchTerm.trim()) {
      await searchProblems(searchTerm)
    } else {
      await fetchProblems()
    }
  }

  // Handle difficulty filter
  const handleDifficultyFilter = async (difficulty: string) => {
    setSelectedDifficulty(difficulty)
    if (difficulty === 'all') {
      await fetchProblems()
    } else {
      await getProblemsByDifficulty(difficulty as 'easy' | 'medium' | 'hard')
    }
  }

  // Handle random problems
  const handleRandomProblems = async () => {
    await getRandomProblems(10)
  }

  // Handle problem selection
  const handleSelectProblem = (problem: any) => {
    setSelectedProblem(problem)
    if (onSelectProblem) {
      onSelectProblem(problem)
    }
  }

  // Format tags
  const formatTags = (tags: string[]) => {
    return tags?.slice(0, 3) || []
  }

  // Get problem stats (mock for now)
  const getProblemStats = (slug: string) => {
    // This would come from analytics in a real implementation
    return {
      attempts: Math.floor(Math.random() * 100) + 1,
      avgTime: Math.floor(Math.random() * 300) + 50
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Problems</h1>
          <p className="text-muted-foreground">
            Browse and solve coding problems from our database
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRandomProblems}
            disabled={loading}
          >
            <Shuffle className="h-4 w-4 mr-2" />
            Random
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
            </div>
            <Button onClick={handleSearch} disabled={loading}>
              Search
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <Select value={selectedDifficulty} onValueChange={handleDifficultyFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Problems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          // Loading skeletons
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded w-full"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : problems.length > 0 ? (
          problems.map((problem) => {
            const stats = getProblemStats(problem.slug)
            const isSelected = selectedProblem?.slug === problem.slug
            
            return (
              <Card 
                key={problem.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => showSelection && handleSelectProblem(problem)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight mb-2">
                        {problem.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant={getDifficultyVariant(problem.difficulty)}>
                          {problem.difficulty}
                        </Badge>
                        <Badge variant="outline">
                          {problem.category}
                        </Badge>
                      </div>
                    </div>
                    {showSelection && (
                      <ChevronRight className={`h-4 w-4 transition-transform ${
                        isSelected ? 'rotate-90' : ''
                      }`} />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Description preview */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {problem.description}
                  </p>

                  {/* Tags */}
                  {problem.tags && problem.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {formatTags(problem.tags).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {problem.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{problem.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{stats.attempts} attempts</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>~{stats.avgTime}ms</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  {!showSelection && (
                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (onSelectProblem) {
                            onSelectProblem(problem)
                          } else {
                            // Navigate to practice demo with the selected problem
                            router.push(`/practice-demo?problem=${problem.slug}`)
                          }
                        }}
                      >
                        <Code className="h-3 w-3 mr-1" />
                        Solve
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">
              {searchTerm ? 'No problems found matching your search.' : 'No problems available.'}
            </p>
          </div>
        )}
      </div>

      {/* Selected Problem Details */}
      {showSelection && selectedProblem && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              {selectedProblem.title}
            </CardTitle>
            <CardDescription>
              Selected problem details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant={getDifficultyVariant(selectedProblem.difficulty)}>
                {selectedProblem.difficulty}
              </Badge>
              <Badge variant="outline">
                {selectedProblem.category}
              </Badge>
              {selectedProblem.tags?.map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="prose prose-sm max-w-none">
              <p>{selectedProblem.description}</p>
            </div>

            {selectedProblem.examples && selectedProblem.examples.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Examples:</h4>
                <div className="space-y-2">
                  {selectedProblem.examples.map((example: any, index: number) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <div className="space-y-1">
                        <p className="text-sm"><strong>Input:</strong> {example.input}</p>
                        <p className="text-sm"><strong>Output:</strong> {example.output}</p>
                        {example.explanation && (
                          <p className="text-sm text-muted-foreground">
                            <strong>Explanation:</strong> {example.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedProblem.constraints && (
              <div>
                <h4 className="font-semibold mb-2">Constraints:</h4>
                <div className="p-3 bg-muted rounded-lg">
                  <ul className="text-sm space-y-1">
                    {selectedProblem.constraints.constraints?.map((constraint: string, index: number) => (
                      <li key={index}>• {constraint}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
} 