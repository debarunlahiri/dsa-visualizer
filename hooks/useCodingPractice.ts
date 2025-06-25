import { useState, useEffect, useCallback } from 'react'

interface UserProgress {
  id: string
  user_id: string
  problems_solved: number
  total_attempts: number
  favorite_language: string
  total_execution_time: number
  streak_days: number
  last_practice_date: string
  created_at: string
  updated_at: string
}

interface CodingPractice {
  id: string
  user_id: string
  problem_slug: string
  problem_title: string
  language: string
  code: string
  status: 'completed' | 'attempted' | 'failed'
  execution_time?: number
  memory_used?: number
  test_cases_passed: number
  total_test_cases: number
  created_at: string
  updated_at: string
}

interface RecentActivity {
  problem_title: string
  problem_slug: string
  language: string
  status: 'completed' | 'attempted' | 'failed'
  created_at: string
}

export function useCodingPractice() {
  const [userId, setUserId] = useState<string>('')
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [practices, setPractices] = useState<CodingPractice[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize user session (in a real app, this would come from auth)
  useEffect(() => {
    // Generate a simple user ID for demo purposes
    // In production, this would come from your authentication system
    const storedUserId = localStorage.getItem('coding_practice_user_id')
    if (storedUserId) {
      setUserId(storedUserId)
    } else {
      const newUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('coding_practice_user_id', newUserId)
      setUserId(newUserId)
    }
  }, [])

  // Fetch user progress and recent activity
  const fetchUserProgress = useCallback(async () => {
    if (!userId) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/user-progress?user_id=${userId}`)
      const result = await response.json()

      if (result.success) {
        setUserProgress(result.data.progress)
        setRecentActivity(result.data.recentActivity || [])
      } else {
        setError(result.error || 'Failed to fetch user progress')
      }
    } catch (err) {
      setError('Network error while fetching user progress')
      console.error('Error fetching user progress:', err)
    } finally {
      setLoading(false)
    }
  }, [userId])

  // Fetch user's coding practices
  const fetchUserPractices = useCallback(async (options: {
    problemSlug?: string
    language?: string
    status?: 'completed' | 'attempted' | 'failed'
    limit?: number
  } = {}) => {
    if (!userId) return

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({ user_id: userId })
      if (options.problemSlug) params.append('problem_slug', options.problemSlug)
      if (options.language) params.append('language', options.language)
      if (options.status) params.append('status', options.status)
      if (options.limit) params.append('limit', options.limit.toString())

      const response = await fetch(`/api/practice?${params}`)
      const result = await response.json()

      if (result.success) {
        setPractices(result.data || [])
      } else {
        setError(result.error || 'Failed to fetch practices')
      }
    } catch (err) {
      setError('Network error while fetching practices')
      console.error('Error fetching practices:', err)
    } finally {
      setLoading(false)
    }
  }, [userId])

  // Save a coding practice submission
  const savePractice = useCallback(async (practiceData: {
    problem_slug: string
    problem_title: string
    language: string
    code: string
    status: 'completed' | 'attempted' | 'failed'
    execution_time?: number
    memory_used?: number
    test_cases_passed: number
    total_test_cases: number
  }) => {
    if (!userId) {
      setError('User ID not available')
      return { success: false, error: 'User ID not available' }
    }

    try {
      const response = await fetch('/api/practice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          ...practiceData
        })
      })

      const result = await response.json()

      if (result.success) {
        // Refresh user progress after successful save
        fetchUserProgress()
        return { success: true, data: result.data }
      } else {
        setError(result.error || 'Failed to save practice')
        return { success: false, error: result.error }
      }
    } catch (err) {
      const errorMessage = 'Network error while saving practice'
      setError(errorMessage)
      console.error('Error saving practice:', err)
      return { success: false, error: errorMessage }
    }
  }, [userId, fetchUserProgress])

  // Submit code with practice tracking
  const submitCodeWithTracking = useCallback(async (submissionData: {
    code: string
    language_id: number
    input: string
    problem_slug: string
    problem_title: string
    test_cases_passed?: number
    total_test_cases?: number
  }) => {
    if (!userId) {
      setError('User ID not available')
      return null
    }

    try {
      const response = await fetch('/api/submit-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...submissionData,
          user_id: userId,
          test_cases_passed: submissionData.test_cases_passed || 0,
          total_test_cases: submissionData.total_test_cases || 1
        })
      })

      const result = await response.json()

      if (response.ok) {
        // Refresh user progress after successful submission
        fetchUserProgress()
      }

      return result
    } catch (err) {
      setError('Network error while submitting code')
      console.error('Error submitting code:', err)
      return null
    }
  }, [userId, fetchUserProgress])

  // Reset user session (for demo purposes)
  const resetUserSession = useCallback(() => {
    localStorage.removeItem('coding_practice_user_id')
    const newUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('coding_practice_user_id', newUserId)
    setUserId(newUserId)
    setUserProgress(null)
    setRecentActivity([])
    setPractices([])
    setError(null)
  }, [])

  // Load user progress when userId changes
  useEffect(() => {
    if (userId) {
      fetchUserProgress()
    }
  }, [userId, fetchUserProgress])

  return {
    userId,
    userProgress,
    recentActivity,
    practices,
    loading,
    error,
    fetchUserProgress,
    fetchUserPractices,
    savePractice,
    submitCodeWithTracking,
    resetUserSession,
    setError
  }
} 