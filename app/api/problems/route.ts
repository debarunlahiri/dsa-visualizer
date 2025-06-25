import { NextRequest, NextResponse } from 'next/server'
import { ProblemsService } from '@/lib/problems-service'

// Get problems with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const difficulty = searchParams.get('difficulty') as 'easy' | 'medium' | 'hard' | null
    const category = searchParams.get('category')
    const tags = searchParams.get('tags')?.split(',').filter(Boolean)
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')
    const search = searchParams.get('search')
    const random = searchParams.get('random')

    // Handle search
    if (search) {
      const result = await ProblemsService.searchProblems(search)
      if (result.error) {
        return NextResponse.json(
          { error: 'Failed to search problems' },
          { status: 500 }
        )
      }
      return NextResponse.json({
        success: true,
        data: result.data
      })
    }

    // Handle random problems
    if (random) {
      const count = parseInt(random) || 5
      const result = await ProblemsService.getRandomProblems(count, difficulty || undefined)
      if (result.error) {
        return NextResponse.json(
          { error: 'Failed to fetch random problems' },
          { status: 500 }
        )
      }
      return NextResponse.json({
        success: true,
        data: result.data
      })
    }

    // Handle regular filtering
    const options = {
      difficulty: difficulty || undefined,
      category: category || undefined,
      tags: tags || undefined,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined
    }

    const result = await ProblemsService.getProblems(options)

    if (result.error) {
      console.error('Supabase error:', result.error)
      return NextResponse.json(
        { error: 'Failed to fetch problems' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.data
    })

  } catch (error) {
    console.error('Problems API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 