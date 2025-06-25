import { useState, useEffect, useCallback } from 'react'

interface Problem {
  id: string
  slug: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  tags: string[]
  examples: any[]
  constraints: any
  hints: string[]
  solution_template: any
  test_cases: any[]
  is_active: boolean
  created_at: string
  updated_at: string
}

interface ProblemsFilter {
  difficulty?: 'easy' | 'medium' | 'hard'
  category?: string
  tags?: string[]
  limit?: number
  offset?: number
}

export function useProblems() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch all problems with optional filtering
  const fetchProblems = useCallback(async (filter: ProblemsFilter = {}) => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      
      if (filter.difficulty) params.append('difficulty', filter.difficulty)
      if (filter.category) params.append('category', filter.category)
      if (filter.tags && filter.tags.length > 0) params.append('tags', filter.tags.join(','))
      if (filter.limit) params.append('limit', filter.limit.toString())
      if (filter.offset) params.append('offset', filter.offset.toString())

      const response = await fetch(`/api/problems?${params}`)
      const result = await response.json()

      if (result.success) {
        setProblems(result.data || [])
      } else {
        setError(result.error || 'Failed to fetch problems')
      }
    } catch (err) {
      setError('Network error while fetching problems')
      console.error('Error fetching problems:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch a single problem by slug
  const fetchProblem = useCallback(async (slug: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/problems/${slug}`)
      const result = await response.json()

      if (result.success) {
        setCurrentProblem(result.data)
        return result.data
      } else {
        setError(result.error || 'Failed to fetch problem')
        return null
      }
    } catch (err) {
      setError('Network error while fetching problem')
      console.error('Error fetching problem:', err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Search problems
  const searchProblems = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      fetchProblems()
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/problems?search=${encodeURIComponent(searchTerm)}`)
      const result = await response.json()

      if (result.success) {
        setProblems(result.data || [])
      } else {
        setError(result.error || 'Failed to search problems')
      }
    } catch (err) {
      setError('Network error while searching problems')
      console.error('Error searching problems:', err)
    } finally {
      setLoading(false)
    }
  }, [fetchProblems])

  // Get random problems
  const getRandomProblems = useCallback(async (
    count: number = 5, 
    difficulty?: 'easy' | 'medium' | 'hard'
  ) => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({ random: count.toString() })
      if (difficulty) params.append('difficulty', difficulty)

      const response = await fetch(`/api/problems?${params}`)
      const result = await response.json()

      if (result.success) {
        setProblems(result.data || [])
        return result.data
      } else {
        setError(result.error || 'Failed to fetch random problems')
        return []
      }
    } catch (err) {
      setError('Network error while fetching random problems')
      console.error('Error fetching random problems:', err)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  // Get problems by difficulty
  const getProblemsByDifficulty = useCallback(async (difficulty: 'easy' | 'medium' | 'hard') => {
    return fetchProblems({ difficulty })
  }, [fetchProblems])

  // Get problems by category
  const getProblemsByCategory = useCallback(async (category: string) => {
    return fetchProblems({ category })
  }, [fetchProblems])

  // Get problems by tags
  const getProblemsByTags = useCallback(async (tags: string[]) => {
    return fetchProblems({ tags })
  }, [fetchProblems])

  // Get solution template for a language
  const getSolutionTemplate = useCallback((problem: Problem | null, language: string) => {
    if (!problem || !problem.solution_template) return ''
    return problem.solution_template[language] || ''
  }, [])

  // Get test cases for a problem
  const getTestCases = useCallback((problem: Problem | null) => {
    if (!problem) return []
    return problem.test_cases || []
  }, [])

  // Check if problem has specific tag
  const hasTag = useCallback((problem: Problem, tag: string) => {
    return problem.tags?.includes(tag) || false
  }, [])

  // Get difficulty color
  const getDifficultyColor = useCallback((difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'hard': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }, [])

  // Get difficulty badge variant
  const getDifficultyVariant = useCallback((difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'default'
      case 'medium': return 'secondary'
      case 'hard': return 'destructive'
      default: return 'outline'
    }
  }, [])

  // Load problems on component mount
  useEffect(() => {
    fetchProblems()
  }, [fetchProblems])

  return {
    // Data
    problems,
    currentProblem,
    categories,
    tags,
    loading,
    error,

    // Actions
    fetchProblems,
    fetchProblem,
    searchProblems,
    getRandomProblems,
    getProblemsByDifficulty,
    getProblemsByCategory,
    getProblemsByTags,

    // Utilities
    getSolutionTemplate,
    getTestCases,
    hasTag,
    getDifficultyColor,
    getDifficultyVariant,
    setError,
    setCurrentProblem
  }
} 