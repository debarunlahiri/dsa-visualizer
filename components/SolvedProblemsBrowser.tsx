'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { SOLVED_PROBLEMS, getProblemsByCategory, getDifficultyColor, PROGRAMMING_LANGUAGES } from '@/lib/solved-problems'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Filter, Code, Clock, BarChart3, ExternalLink, ChevronRight, BookOpen } from 'lucide-react'

export function SolvedProblemsBrowser() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const problemsByCategory = getProblemsByCategory()
  const categories = Object.keys(problemsByCategory)

  // Filter problems based on search and filters
  const filteredProblems = useMemo(() => {
    let filtered = SOLVED_PROBLEMS

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(problem =>
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(problem => 
        problem.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(problem => problem.category === selectedCategory)
    }

    return filtered
  }, [searchTerm, selectedDifficulty, selectedCategory])

  const handleProblemClick = (problemId: string) => {
    router.push(`/solved-problems/${problemId}`)
  }

  const renderProblemCard = (problem: any) => (
    <Card 
      key={problem.id} 
      className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] group"
      onClick={() => handleProblemClick(problem.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
              {problem.title}
            </CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge 
                variant={problem.difficulty === 'Easy' ? 'default' : 
                        problem.difficulty === 'Medium' ? 'secondary' : 'destructive'}
                className={getDifficultyColor(problem.difficulty)}
              >
                {problem.difficulty}
              </Badge>
              <Badge variant="outline">
                {problem.category}
              </Badge>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {problem.description}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Time: {problem.timeComplexity}</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart3 className="h-3 w-3" />
            <span>Space: {problem.spaceComplexity}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {problem.tags.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {problem.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{problem.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Code className="h-3 w-3" />
            <span className="text-xs text-muted-foreground">
              {Object.keys(problem.solutions).length} languages
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {PROGRAMMING_LANGUAGES.slice(0, 3).map((lang) => (
              <span
                key={lang.id}
                className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground"
                title={lang.name}
              >
                {lang.name}
              </span>
            ))}
            {PROGRAMMING_LANGUAGES.length > 3 && (
              <span className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground">
                +{PROGRAMMING_LANGUAGES.length - 3}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Solved Problems
          </h1>
          <p className="text-muted-foreground mt-2">
            LeetCode solutions in {PROGRAMMING_LANGUAGES.length} programming languages
          </p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">{SOLVED_PROBLEMS.length} Problems</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span className="text-sm font-medium">{PROGRAMMING_LANGUAGES.length} Languages</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search problems by title, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Icons */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Supported Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {PROGRAMMING_LANGUAGES.map((lang) => (
              <div
                key={lang.id}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <span className="text-sm font-medium">{lang.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Problems Display */}
      <Tabs value={view} onValueChange={(v) => setView(v as 'grid' | 'list')}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Showing {filteredProblems.length} of {SOLVED_PROBLEMS.length} problems
            </span>
          </div>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProblems.map(renderProblemCard)}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <div className="space-y-4">
            {filteredProblems.map((problem) => (
              <Card 
                key={problem.id}
                className="cursor-pointer transition-all hover:shadow-md group"
                onClick={() => handleProblemClick(problem.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {problem.title}
                        </h3>
                        <Badge 
                          variant={problem.difficulty === 'Easy' ? 'default' : 
                                  problem.difficulty === 'Medium' ? 'secondary' : 'destructive'}
                          className={getDifficultyColor(problem.difficulty)}
                        >
                          {problem.difficulty}
                        </Badge>
                        <Badge variant="outline">{problem.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                        {problem.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Time: {problem.timeComplexity}</span>
                        <span>Space: {problem.spaceComplexity}</span>
                        <span>{Object.keys(problem.solutions).length} languages</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredProblems.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No problems found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 