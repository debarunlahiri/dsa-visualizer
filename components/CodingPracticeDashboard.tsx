'use client'

import { useState, useEffect } from 'react'
import { useCodingPractice } from '@/hooks/useCodingPractice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Trophy, Target, Flame, Clock, Code, TrendingUp, User, RefreshCw } from 'lucide-react'

interface LeaderboardEntry {
  user_id: string
  problems_solved: number
  streak_days: number
  total_attempts: number
}

interface TrendingProblem {
  problem_slug: string
  total_attempts: number
  total_completions: number
  average_execution_time: number
}

export function CodingPracticeDashboard() {
  const {
    userId,
    userProgress,
    recentActivity,
    loading,
    error,
    fetchUserProgress,
    resetUserSession
  } = useCodingPractice()

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [trending, setTrending] = useState<TrendingProblem[]>([])
  const [analyticsLoading, setAnalyticsLoading] = useState(false)

  // Fetch leaderboard data
  const fetchLeaderboard = async () => {
    setAnalyticsLoading(true)
    try {
      const response = await fetch('/api/analytics?type=leaderboard&limit=10')
      const result = await response.json()
      if (result.success) {
        setLeaderboard(result.data || [])
      }
    } catch (err) {
      console.error('Error fetching leaderboard:', err)
    } finally {
      setAnalyticsLoading(false)
    }
  }

  // Fetch trending problems
  const fetchTrending = async () => {
    try {
      const response = await fetch('/api/analytics?type=trending&limit=5')
      const result = await response.json()
      if (result.success) {
        setTrending(result.data || [])
      }
    } catch (err) {
      console.error('Error fetching trending problems:', err)
    }
  }

  useEffect(() => {
    fetchLeaderboard()
    fetchTrending()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'attempted': return 'bg-yellow-500'
      case 'failed': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed'
      case 'attempted': return 'Attempted'
      case 'failed': return 'Failed'
      default: return 'Unknown'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Coding Practice Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and improve your skills</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              fetchUserProgress()
              fetchLeaderboard()
              fetchTrending()
            }}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetUserSession}
          >
            <User className="h-4 w-4 mr-2" />
            New Session
          </Button>
        </div>
      </div>

      {/* User ID Display */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="text-sm font-medium">Session ID:</span>
            <code className="text-xs bg-muted px-2 py-1 rounded">{userId}</code>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {userProgress ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userProgress.problems_solved}</div>
                  <p className="text-xs text-muted-foreground">
                    Total attempts: {userProgress.total_attempts}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {userProgress.total_attempts > 0 
                      ? Math.round((userProgress.problems_solved / userProgress.total_attempts) * 100)
                      : 0}%
                  </div>
                  <Progress 
                    value={userProgress.total_attempts > 0 
                      ? (userProgress.problems_solved / userProgress.total_attempts) * 100
                      : 0} 
                    className="mt-2" 
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                  <Flame className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userProgress.streak_days}</div>
                  <p className="text-xs text-muted-foreground">
                    {userProgress.streak_days === 1 ? 'day' : 'days'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Last Practice</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-bold">
                    {formatDate(userProgress.last_practice_date)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {userProgress.favorite_language || 'No language set'}
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Welcome to Coding Practice!</CardTitle>
                <CardDescription>
                  Start solving problems to see your progress here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your coding practice journey begins now. Submit your first solution to start tracking your progress!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Recent Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Your latest coding practice submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(activity.status)}>
                          {getStatusText(activity.status)}
                        </Badge>
                        <div>
                          <p className="font-medium">{activity.problem_title}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.language} • {formatDate(activity.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No recent activity. Start coding to see your history here!
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Leaderboard
                </CardTitle>
                <CardDescription>
                  Top performers by problems solved
                </CardDescription>
              </CardHeader>
              <CardContent>
                {analyticsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <RefreshCw className="h-6 w-6 animate-spin" />
                  </div>
                ) : leaderboard.length > 0 ? (
                  <div className="space-y-3">
                    {leaderboard.map((entry, index) => (
                      <div key={entry.user_id} className="flex items-center justify-between p-2 rounded">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {entry.user_id.slice(0, 12)}...
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {entry.streak_days} day streak
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{entry.problems_solved}</p>
                          <p className="text-xs text-muted-foreground">solved</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No leaderboard data available
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Trending Problems */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Problems
                </CardTitle>
                <CardDescription>
                  Most attempted problems recently
                </CardDescription>
              </CardHeader>
              <CardContent>
                {trending.length > 0 ? (
                  <div className="space-y-3">
                    {trending.map((problem, index) => (
                      <div key={problem.problem_slug} className="flex items-center justify-between p-2 rounded">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground text-xs flex items-center justify-center">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {problem.problem_slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Avg: {Math.round(problem.average_execution_time)}ms
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{problem.total_attempts}</p>
                          <p className="text-xs text-muted-foreground">attempts</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No trending data available
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 