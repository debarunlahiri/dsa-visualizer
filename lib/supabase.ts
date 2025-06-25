import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript support
export interface Database {
  public: {
    Tables: {
      coding_practices: {
        Row: {
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
        Insert: {
          id?: string
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
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          problem_slug?: string
          problem_title?: string
          language?: string
          code?: string
          status?: 'completed' | 'attempted' | 'failed'
          execution_time?: number
          memory_used?: number
          test_cases_passed?: number
          total_test_cases?: number
          created_at?: string
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
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
        Insert: {
          id?: string
          user_id: string
          problems_solved?: number
          total_attempts?: number
          favorite_language?: string
          total_execution_time?: number
          streak_days?: number
          last_practice_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          problems_solved?: number
          total_attempts?: number
          favorite_language?: string
          total_execution_time?: number
          streak_days?: number
          last_practice_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      problem_analytics: {
        Row: {
          id: string
          problem_slug: string
          total_attempts: number
          total_completions: number
          average_execution_time: number
          most_used_language: string
          difficulty_rating: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          problem_slug: string
          total_attempts?: number
          total_completions?: number
          average_execution_time?: number
          most_used_language?: string
          difficulty_rating?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          problem_slug?: string
          total_attempts?: number
          total_completions?: number
          average_execution_time?: number
          most_used_language?: string
          difficulty_rating?: number
          created_at?: string
          updated_at?: string
        }
      }
      problems: {
        Row: {
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
        Insert: {
          id?: string
          slug: string
          title: string
          description: string
          difficulty?: 'easy' | 'medium' | 'hard'
          category?: string
          tags?: string[]
          examples?: any[]
          constraints?: any
          hints?: string[]
          solution_template?: any
          test_cases?: any[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string
          difficulty?: 'easy' | 'medium' | 'hard'
          category?: string
          tags?: string[]
          examples?: any[]
          constraints?: any
          hints?: string[]
          solution_template?: any
          test_cases?: any[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
} 