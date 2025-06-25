import { NextRequest, NextResponse } from 'next/server'
import { CodingPracticeService } from '@/lib/coding-practice-service'

interface PracticeRequest {
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
}

// Save a coding practice submission
export async function POST(request: NextRequest) {
  try {
    const body: PracticeRequest = await request.json()

    // Validate required fields
    const requiredFields = [
      'user_id', 'problem_slug', 'problem_title', 
      'language', 'code', 'status', 'test_cases_passed', 'total_test_cases'
    ]

    for (const field of requiredFields) {
      if (!body[field as keyof PracticeRequest]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Save the practice submission
    const result = await CodingPracticeService.savePractice(body)

    if (result.error) {
      console.error('Supabase error:', result.error)
      return NextResponse.json(
        { error: 'Failed to save practice submission' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.data
    })

  } catch (error) {
    console.error('Practice API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get user's coding practices
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('user_id')
    const problemSlug = searchParams.get('problem_slug')
    const language = searchParams.get('language')
    const status = searchParams.get('status') as 'completed' | 'attempted' | 'failed' | null
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')

    if (!userId) {
      return NextResponse.json(
        { error: 'user_id is required' },
        { status: 400 }
      )
    }

    const options = {
      problemSlug: problemSlug || undefined,
      language: language || undefined,
      status: status || undefined,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined
    }

    const result = await CodingPracticeService.getUserPractices(userId, options)

    if (result.error) {
      console.error('Supabase error:', result.error)
      return NextResponse.json(
        { error: 'Failed to fetch practices' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.data
    })

  } catch (error) {
    console.error('Practice API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 