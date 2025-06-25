import { NextRequest, NextResponse } from 'next/server'
import { CodingPracticeService } from '@/lib/coding-practice-service'

// Get analytics data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const problemSlug = searchParams.get('problem_slug')
    const limit = searchParams.get('limit')

    switch (type) {
      case 'leaderboard':
        const leaderboardResult = await CodingPracticeService.getLeaderboard(
          limit ? parseInt(limit) : 10
        )
        
        if (leaderboardResult.error) {
          return NextResponse.json(
            { error: 'Failed to fetch leaderboard' },
            { status: 500 }
          )
        }

        return NextResponse.json({
          success: true,
          data: leaderboardResult.data
        })

      case 'trending':
        const trendingResult = await CodingPracticeService.getTrendingProblems(
          limit ? parseInt(limit) : 5
        )
        
        if (trendingResult.error) {
          return NextResponse.json(
            { error: 'Failed to fetch trending problems' },
            { status: 500 }
          )
        }

        return NextResponse.json({
          success: true,
          data: trendingResult.data
        })

      case 'problem':
        if (!problemSlug) {
          return NextResponse.json(
            { error: 'problem_slug is required for problem analytics' },
            { status: 400 }
          )
        }

        const problemAnalyticsResult = await CodingPracticeService.getProblemAnalytics(problemSlug)
        
        if (problemAnalyticsResult.error) {
          return NextResponse.json(
            { error: 'Failed to fetch problem analytics' },
            { status: 500 }
          )
        }

        return NextResponse.json({
          success: true,
          data: problemAnalyticsResult.data
        })

      default:
        return NextResponse.json(
          { error: 'Invalid analytics type. Use: leaderboard, trending, or problem' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 