import { NextRequest, NextResponse } from 'next/server'
import { CodingPracticeService } from '@/lib/coding-practice-service'

// Get user progress statistics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('user_id')

    if (!userId) {
      return NextResponse.json(
        { error: 'user_id is required' },
        { status: 400 }
      )
    }

    // Get user progress and recent activity in parallel
    const [progressResult, activityResult] = await Promise.all([
      CodingPracticeService.getUserProgress(userId),
      CodingPracticeService.getRecentActivity(userId, 5)
    ])

    if (progressResult.error) {
      console.error('Error fetching progress:', progressResult.error)
      return NextResponse.json(
        { error: 'Failed to fetch user progress' },
        { status: 500 }
      )
    }

    if (activityResult.error) {
      console.error('Error fetching activity:', activityResult.error)
      return NextResponse.json(
        { error: 'Failed to fetch recent activity' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        progress: progressResult.data,
        recentActivity: activityResult.data
      }
    })

  } catch (error) {
    console.error('User progress API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 