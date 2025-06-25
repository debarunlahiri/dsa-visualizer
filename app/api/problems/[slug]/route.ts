import { NextRequest, NextResponse } from 'next/server'
import { ProblemsService } from '@/lib/problems-service'

// Get a single problem by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    if (!slug) {
      return NextResponse.json(
        { error: 'Problem slug is required' },
        { status: 400 }
      )
    }

    const result = await ProblemsService.getProblemBySlug(slug)

    if (result.error) {
      console.error('Supabase error:', result.error)
      return NextResponse.json(
        { error: 'Failed to fetch problem' },
        { status: 500 }
      )
    }

    if (!result.data) {
      return NextResponse.json(
        { error: 'Problem not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.data
    })

  } catch (error) {
    console.error('Problem API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 