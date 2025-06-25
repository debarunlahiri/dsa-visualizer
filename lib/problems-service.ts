import { supabase } from './supabase'
import type { Database } from './supabase'

type Problem = Database['public']['Tables']['problems']['Row']
type ProblemInsert = Database['public']['Tables']['problems']['Insert']

export class ProblemsService {
  // Get all active problems
  static async getProblems(options: {
    difficulty?: 'easy' | 'medium' | 'hard'
    category?: string
    tags?: string[]
    limit?: number
    offset?: number
  } = {}) {
    try {
      let query = supabase
        .from('problems')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true })

      if (options.difficulty) {
        query = query.eq('difficulty', options.difficulty)
      }
      
      if (options.category) {
        query = query.eq('category', options.category)
      }
      
      if (options.tags && options.tags.length > 0) {
        query = query.overlaps('tags', options.tags)
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
      console.error('Error fetching problems:', error)
      return { data: null, error }
    }
  }

  // Get a single problem by slug
  static async getProblemBySlug(slug: string) {
    try {
      const { data, error } = await supabase
        .from('problems')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching problem:', error)
      return { data: null, error }
    }
  }

  // Get problems by category
  static async getProblemsByCategory(category: string) {
    try {
      const { data, error } = await supabase
        .from('problems')
        .select('*')
        .eq('category', category)
        .eq('is_active', true)
        .order('difficulty', { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching problems by category:', error)
      return { data: null, error }
    }
  }

  // Get problems by difficulty
  static async getProblemsByDifficulty(difficulty: 'easy' | 'medium' | 'hard') {
    try {
      const { data, error } = await supabase
        .from('problems')
        .select('*')
        .eq('difficulty', difficulty)
        .eq('is_active', true)
        .order('created_at', { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching problems by difficulty:', error)
      return { data: null, error }
    }
  }

  // Search problems by title or description
  static async searchProblems(searchTerm: string) {
    try {
      const { data, error } = await supabase
        .from('problems')
        .select('*')
        .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .eq('is_active', true)
        .order('title', { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error searching problems:', error)
      return { data: null, error }
    }
  }

  // Get problem categories
  static async getCategories() {
    try {
      const { data, error } = await supabase
        .from('problems')
        .select('category')
        .eq('is_active', true)

      if (error) throw error
      
      // Get unique categories
      const categories = [...new Set(data?.map(item => item.category) || [])]
      return { data: categories, error: null }
    } catch (error) {
      console.error('Error fetching categories:', error)
      return { data: null, error }
    }
  }

  // Get all unique tags
  static async getTags() {
    try {
      const { data, error } = await supabase
        .from('problems')
        .select('tags')
        .eq('is_active', true)

      if (error) throw error
      
      // Flatten and get unique tags
      const allTags = data?.flatMap(item => item.tags || []) || []
      const uniqueTags = [...new Set(allTags)]
      return { data: uniqueTags, error: null }
    } catch (error) {
      console.error('Error fetching tags:', error)
      return { data: null, error }
    }
  }

  // Get problem statistics
  static async getProblemStats() {
    try {
      const { data, error } = await supabase
        .from('problems')
        .select('difficulty')
        .eq('is_active', true)

      if (error) throw error
      
      const stats = {
        total: data?.length || 0,
        easy: data?.filter(p => p.difficulty === 'easy').length || 0,
        medium: data?.filter(p => p.difficulty === 'medium').length || 0,
        hard: data?.filter(p => p.difficulty === 'hard').length || 0
      }
      
      return { data: stats, error: null }
    } catch (error) {
      console.error('Error fetching problem stats:', error)
      return { data: null, error }
    }
  }

  // Add a new problem (admin function)
  static async addProblem(problem: ProblemInsert) {
    try {
      const { data, error } = await supabase
        .from('problems')
        .insert({
          ...problem,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error adding problem:', error)
      return { data: null, error }
    }
  }

  // Update a problem (admin function)
  static async updateProblem(slug: string, updates: Partial<Problem>) {
    try {
      const { data, error } = await supabase
        .from('problems')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('slug', slug)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error updating problem:', error)
      return { data: null, error }
    }
  }

  // Delete a problem (admin function - sets is_active to false)
  static async deleteProblem(slug: string) {
    try {
      const { data, error } = await supabase
        .from('problems')
        .update({ 
          is_active: false,
          updated_at: new Date().toISOString()
        })
        .eq('slug', slug)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error deleting problem:', error)
      return { data: null, error }
    }
  }

  // Get random problems for practice
  static async getRandomProblems(count: number = 5, difficulty?: 'easy' | 'medium' | 'hard') {
    try {
      let query = supabase
        .from('problems')
        .select('*')
        .eq('is_active', true)

      if (difficulty) {
        query = query.eq('difficulty', difficulty)
      }

      const { data, error } = await query

      if (error) throw error
      
      // Shuffle and return requested count
      const shuffled = data?.sort(() => 0.5 - Math.random()) || []
      return { data: shuffled.slice(0, count), error: null }
    } catch (error) {
      console.error('Error fetching random problems:', error)
      return { data: null, error }
    }
  }
} 