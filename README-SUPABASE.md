# Supabase Integration for Coding Practice Tracking

This document explains how Supabase has been integrated into the DSA animations site to track coding practices, user progress, and analytics.

## Overview

The Supabase integration provides:
- **Practice Tracking**: Save and retrieve coding submissions
- **Progress Analytics**: Track user performance over time
- **Leaderboards**: Compare progress with other users
- **Problem Analytics**: Insights into problem difficulty and popularity
- **Streak Tracking**: Maintain coding consistency

## Database Schema

### Tables

#### 1. `coding_practices`
Stores individual coding submissions:
- `id`: Unique identifier (UUID)
- `user_id`: User identifier
- `problem_slug`: Problem identifier (e.g., "two-sum")
- `problem_title`: Human-readable problem name
- `language`: Programming language used
- `code`: The submitted code
- `status`: Submission status (`completed`, `attempted`, `failed`)
- `execution_time`: Runtime in milliseconds
- `memory_used`: Memory usage in KB
- `test_cases_passed`: Number of test cases that passed
- `total_test_cases`: Total number of test cases
- `created_at`, `updated_at`: Timestamps

#### 2. `user_progress`
Tracks overall user statistics:
- `id`: Unique identifier (UUID)
- `user_id`: User identifier (unique)
- `problems_solved`: Count of completed problems
- `total_attempts`: Total submission count
- `favorite_language`: Most used programming language
- `total_execution_time`: Cumulative runtime
- `streak_days`: Consecutive days of practice
- `last_practice_date`: Last submission timestamp
- `created_at`, `updated_at`: Timestamps

#### 3. `problem_analytics`
Aggregated statistics per problem:
- `id`: Unique identifier (UUID)
- `problem_slug`: Problem identifier (unique)
- `total_attempts`: Total submission count
- `total_completions`: Successful completion count
- `average_execution_time`: Average runtime
- `most_used_language`: Popular language for this problem
- `difficulty_rating`: Difficulty score (1-5)
- `created_at`, `updated_at`: Timestamps

## Setup Instructions

### 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

### 2. Run Database Schema

1. Open the Supabase SQL editor
2. Copy and paste the contents of `supabase-schema.sql`
3. Execute the SQL commands

### 3. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace with your actual Supabase credentials.

### 4. Install Dependencies

The Supabase client is already installed via:

```bash
npm install @supabase/supabase-js
```

## API Endpoints

### Practice Submission
- **POST** `/api/practice` - Save a coding practice submission
- **GET** `/api/practice` - Retrieve user's practice history

### User Progress
- **GET** `/api/user-progress` - Get user statistics and recent activity

### Analytics
- **GET** `/api/analytics?type=leaderboard` - Get leaderboard data
- **GET** `/api/analytics?type=trending` - Get trending problems
- **GET** `/api/analytics?type=problem&problem_slug=two-sum` - Get problem-specific analytics

### Enhanced Code Submission
- **POST** `/api/submit-code` - Execute code with optional Supabase tracking

## React Hook

### `useCodingPractice()`

A comprehensive React hook that provides:

```typescript
const {
  userId,                    // Current user session ID
  userProgress,             // User progress statistics
  recentActivity,           // Recent submissions
  practices,                // All user practices
  loading,                  // Loading state
  error,                    // Error messages
  fetchUserProgress,        // Refresh user data
  fetchUserPractices,       // Get practice history
  savePractice,             // Save practice manually
  submitCodeWithTracking,   // Submit code with tracking
  resetUserSession,         // Start new session
  setError                  // Clear errors
} = useCodingPractice()
```

## Components

### `CodingPracticeDashboard`
Main dashboard showing:
- User progress overview
- Recent activity timeline
- Analytics and leaderboards
- Problem trends

### Demo Pages
- `/practice` - Main dashboard
- `/practice-demo` - Interactive demo with code editor

## Features

### 1. Automatic Progress Tracking
When code is submitted with tracking parameters, the system automatically:
- Saves the submission to `coding_practices`
- Updates user progress statistics
- Increments problem analytics
- Maintains daily streaks

### 2. Session Management
- Generates unique user IDs for demo purposes
- Stores session in localStorage
- Allows session reset for testing

### 3. Real-time Analytics
- Leaderboard rankings
- Trending problems
- Problem difficulty analysis
- Success rate calculations

### 4. Performance Optimization
- Database indexes for fast queries
- Parallel API requests
- Efficient React state management
- Automatic data refresh

## Security Considerations

### Row Level Security (RLS)
The current setup uses public access policies for demo purposes. For production:

1. **Enable Authentication**:
   ```sql
   -- Example: Restrict to authenticated users
   CREATE POLICY "Users can only see their own practices"
   ON coding_practices FOR SELECT
   USING (auth.uid()::text = user_id);
   ```

2. **User-specific Access**:
   ```sql
   -- Example: Users can only modify their own data
   CREATE POLICY "Users can only insert their own practices"
   ON coding_practices FOR INSERT
   WITH CHECK (auth.uid()::text = user_id);
   ```

### Environment Variables
- Never commit `.env.local` to version control
- Use Supabase's anon key (not service role key) in client-side code
- Consider using environment-specific configurations

## Integration Examples

### Basic Code Submission with Tracking

```typescript
const result = await submitCodeWithTracking({
  code: 'function twoSum(nums, target) { ... }',
  language_id: 63, // JavaScript
  input: '',
  problem_slug: 'two-sum',
  problem_title: 'Two Sum',
  test_cases_passed: 2,
  total_test_cases: 3
})
```

### Manual Practice Saving

```typescript
await savePractice({
  problem_slug: 'reverse-string',
  problem_title: 'Reverse String',
  language: 'Python',
  code: 'def reverse_string(s): ...',
  status: 'completed',
  execution_time: 45,
  test_cases_passed: 3,
  total_test_cases: 3
})
```

### Fetching Analytics

```typescript
// Get leaderboard
const leaderboard = await fetch('/api/analytics?type=leaderboard&limit=10')

// Get trending problems
const trending = await fetch('/api/analytics?type=trending&limit=5')

// Get problem analytics
const problemStats = await fetch('/api/analytics?type=problem&problem_slug=two-sum')
```

## Troubleshooting

### Common Issues

1. **"User ID not available"**
   - Check if localStorage is working
   - Ensure the hook is used in a client component

2. **"Failed to save practice"**
   - Verify Supabase credentials
   - Check database schema is properly set up
   - Ensure RLS policies allow the operation

3. **No data appearing**
   - Confirm API endpoints are working
   - Check browser network tab for errors
   - Verify database tables have data

### Debugging Tips

1. **Check Supabase Logs**:
   - Go to Supabase dashboard → Logs
   - Look for SQL errors or policy violations

2. **Network Tab**:
   - Check API request/response in browser dev tools
   - Verify request payloads and response status

3. **Console Logs**:
   - Service methods log errors to console
   - Check for TypeScript type errors

## Future Enhancements

1. **Authentication Integration**
   - Replace demo user IDs with real authentication
   - Add user profiles and avatars

2. **Advanced Analytics**
   - Code complexity analysis
   - Performance benchmarking
   - Learning path recommendations

3. **Social Features**
   - Friend connections
   - Shared solutions
   - Community challenges

4. **Gamification**
   - Achievement badges
   - Experience points
   - Skill trees

## Contributing

When adding new features:

1. Update database schema if needed
2. Add corresponding TypeScript types
3. Update the service layer
4. Add API endpoints
5. Update React components
6. Document changes in this README

For questions or issues, please check the project's main documentation or create an issue in the repository. 