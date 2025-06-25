import { supabase } from './supabase'
import type { Database } from './supabase'

type CodingPractice = Database['public']['Tables']['coding_practices']['Row']
type CodingPracticeInsert = Database['public']['Tables']['coding_practices']['Insert']
type UserProgress = Database['public']['Tables']['user_progress']['Row']
type ProblemAnalytics = Database['public']['Tables']['problem_analytics']['Row']

export class CodingPracticeService {
  // Save a coding practice submission
  static async savePractice(practice: CodingPracticeInsert) {
    try {
      const { data, error } = await supabase
        .from('coding_practices')
        .insert({
          ...practice,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error
      
      // Update user progress and problem analytics in parallel
      await Promise.all([
        this.updateUserProgress(practice.user_id, practice.status === 'completed'),
        this.updateProblemAnalytics(practice.problem_slug, practice.language, practice.execution_time)
      ])

      return { data, error: null }
    } catch (error) {
      console.error('Error saving practice:', error)
      return { data: null, error }
    }
  }

  // Get user's coding practices with filtering and pagination
  static async getUserPractices(
    userId: string,
    options: {
      problemSlug?: string
      language?: string
      status?: 'completed' | 'attempted' | 'failed'
      limit?: number
      offset?: number
    } = {}
  ) {
    try {
      let query = supabase
        .from('coding_practices')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (options.problemSlug) {
        query = query.eq('problem_slug', options.problemSlug)
      }
      if (options.language) {
        query = query.eq('language', options.language)
      }
      if (options.status) {
        query = query.eq('status', options.status)
      }
      if (options.limit) {
        query = query.limit(options.limit)
      }
      if (options.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
      }

      const { data, error } = await query

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching user practices:', error)
      return { data: null, error }
    }
  }

  // Get user progress statistics
  static async getUserProgress(userId: string) {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching user progress:', error)
      return { data: null, error }
    }
  }

  // Update user progress
  static async updateUserProgress(userId: string, isCompleted: boolean) {
    try {
      const { data: existingProgress } = await this.getUserProgress(userId)
      
      const now = new Date().toISOString()
      const today = new Date().toISOString().split('T')[0]

      if (existingProgress) {
        // Update existing progress
        const lastPracticeDate = new Date(existingProgress.last_practice_date).toISOString().split('T')[0]
        const isConsecutiveDay = this.isConsecutiveDay(lastPracticeDate, today)
        
        const updatedProgress = {
          problems_solved: isCompleted ? existingProgress.problems_solved + 1 : existingProgress.problems_solved,
          total_attempts: existingProgress.total_attempts + 1,
          streak_days: isConsecutiveDay ? existingProgress.streak_days + 1 : 1,
          last_practice_date: now,
          updated_at: now
        }

        const { data, error } = await supabase
          .from('user_progress')
          .update(updatedProgress)
          .eq('user_id', userId)
          .select()
          .single()

        if (error) throw error
        return { data, error: null }
      } else {
        // Create new progress entry
        const newProgress = {
          user_id: userId,
          problems_solved: isCompleted ? 1 : 0,
          total_attempts: 1,
          favorite_language: '',
          total_execution_time: 0,
          streak_days: 1,
          last_practice_date: now,
          created_at: now,
          updated_at: now
        }

        const { data, error } = await supabase
          .from('user_progress')
          .insert(newProgress)
          .select()
          .single()

        if (error) throw error
        return { data, error: null }
      }
    } catch (error) {
      console.error('Error updating user progress:', error)
      return { data: null, error }
    }
  }

  // Update problem analytics
  static async updateProblemAnalytics(
    problemSlug: string, 
    language: string, 
    executionTime?: number
  ) {
    try {
      const { data: existing } = await supabase
        .from('problem_analytics')
        .select('*')
        .eq('problem_slug', problemSlug)
        .single()

      const now = new Date().toISOString()

      if (existing) {
        // Update existing analytics
        const newAvgTime = executionTime 
          ? (existing.average_execution_time * existing.total_attempts + executionTime) / (existing.total_attempts + 1)
          : existing.average_execution_time

        const updatedAnalytics = {
          total_attempts: existing.total_attempts + 1,
          average_execution_time: newAvgTime,
          most_used_language: language, // Simplified: could be improved with proper counting
          updated_at: now
        }

        const { data, error } = await supabase
          .from('problem_analytics')
          .update(updatedAnalytics)
          .eq('problem_slug', problemSlug)
          .select()
          .single()

        if (error) throw error
        return { data, error: null }
      } else {
        // Create new analytics entry
        const newAnalytics = {
          problem_slug: problemSlug,
          total_attempts: 1,
          total_completions: 0,
          average_execution_time: executionTime || 0,
          most_used_language: language,
          difficulty_rating: 1,
          created_at: now,
          updated_at: now
        }

        const { data, error } = await supabase
          .from('problem_analytics')
          .insert(newAnalytics)
          .select()
          .single()

        if (error) throw error
        return { data, error: null }
      }
    } catch (error) {
      console.error('Error updating problem analytics:', error)
      return { data: null, error }
    }
  }

  // Get problem analytics
  static async getProblemAnalytics(problemSlug: string) {
    try {
      const { data, error } = await supabase
        .from('problem_analytics')
        .select('*')
        .eq('problem_slug', problemSlug)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching problem analytics:', error)
      return { data: null, error }
    }
  }

  // Get leaderboard data
  static async getLeaderboard(limit: number = 10) {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('user_id, problems_solved, streak_days, total_attempts')
        .order('problems_solved', { ascending: false })
        .order('streak_days', { ascending: false })
        .limit(limit)

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
      return { data: null, error }
    }
  }

  // Get user's recent activity
  static async getRecentActivity(userId: string, limit: number = 5) {
    try {
      const { data, error } = await supabase
        .from('coding_practices')
        .select('problem_title, problem_slug, language, status, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching recent activity:', error)
      return { data: null, error }
    }
  }

  // Helper function to check if dates are consecutive
  private static isConsecutiveDay(lastDate: string, currentDate: string): boolean {
    const last = new Date(lastDate)
    const current = new Date(currentDate)
    const diffTime = Math.abs(current.getTime() - last.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays === 1
  }

  // Get trending problems (most attempted recently)
  static async getTrendingProblems(limit: number = 5) {
    try {
      const { data, error } = await supabase
        .from('problem_analytics')
        .select('problem_slug, total_attempts, total_completions, average_execution_time')
        .order('total_attempts', { ascending: false })
        .limit(limit)

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching trending problems:', error)
      return { data: null, error }
    }
  }
} 