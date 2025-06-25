# LeetCode-Style Problem Solver

This project now includes a complete LeetCode-style problem-solving interface built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

### 🎯 Problem Solving Interface
- **Split Screen Layout**: Problem description on the left, code editor on the right
- **LeetCode-Style Layout**: Test results appear below the code editor
- **Back Navigation**: Easy return to problems list
- **Responsive Design**: Mobile-friendly with stacked layout
- **Multiple Languages**: JavaScript, Python, Java, C++ support
- **Live Code Execution**: Real-time code testing with predefined test cases
- **Monaco Editor**: Professional code editor with syntax highlighting and IntelliSense

### 📝 Problem Management
- **Problem Library**: Collection of LeetCode-style problems
- **Difficulty Levels**: Easy, Medium, Hard with color coding
- **Detailed Examples**: Multiple test cases with explanations
- **Starter Code**: Language-specific templates for each problem

### 🚀 Code Execution
- **Predefined Test Cases**: LeetCode-style automated testing with multiple test cases
- **Hidden Test Cases**: Some test cases are hidden like in real LeetCode
- **Judge0-Compatible API**: Standardized submission format
- **Detailed Results**: See input, expected output, and your output for each test
- **Error Handling**: Comprehensive error reporting and debugging
- **Performance Metrics**: Execution time and memory usage tracking

## Pages and Components

### Pages
- `/problems` - List of all available problems
- `/problem/[slug]` - Individual problem solver interface

### Key Components
- `ProblemDescription` - Renders problem details in markdown-like format
- `CodeEditor` - Full-featured code editor with language switching
- `ProblemSolver` - Main component combining description and editor

### API Endpoints
- `/api/submit-code` - Judge0-compatible code execution endpoint
- `/api/run-tests` - Run predefined test cases for problems

## Usage

### Adding New Problems

Add problems to `lib/problems.ts`:

```typescript
'problem-slug': {
  id: 'problem-slug',
  title: 'Problem Title',
  difficulty: 'Easy' | 'Medium' | 'Hard',
  description: 'Problem description with **markdown** support',
  examples: [
    {
      input: 'example input',
      output: 'expected output',
      explanation: 'optional explanation'
    }
  ],
  constraints: ['list of constraints'],
  starterCode: {
    javascript: 'starter code',
    python: 'starter code',
    java: 'starter code',
    cpp: 'starter code'
  },
  testCases: [
    {
      input: 'test input',
      expectedOutput: 'expected result',
      hidden: false // optional, defaults to false
    }
  ]
}
```

### Supported Languages

| Language   | Language ID | File Extension |
|-----------|-------------|----------------|
| JavaScript| 63          | .js            |
| Python    | 71          | .py            |
| Java      | 62          | .java          |
| C++       | 54          | .cpp           |

### How to Use

1. **Navigate to a problem** (e.g., `/problem/two-sum`)
2. **Write your solution** in the code editor
3. **Click "Run Tests"** to run all predefined test cases
4. **View results** - see which tests passed/failed with details
5. **Submit** when all tests pass!

### Navigation

The problem solver is integrated into the existing DSA animations site:
- Access via "Practice Problems" button in the header
- Navigate between algorithm visualizations and problem solving
- Consistent theme and design language

## Technical Implementation

### Architecture
- **Next.js 14**: App Router with Server Components
- **TypeScript**: Full type safety throughout
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: High-quality component library

### Performance
- **Static Generation**: Problems are statically generated at build time
- **Code Splitting**: Monaco Editor is dynamically imported
- **Responsive**: Optimized for both desktop and mobile

### Accessibility
- **Keyboard Navigation**: Full keyboard support in editor
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **High Contrast**: Dark/light theme support

## Current Problems

1. **Two Sum** (Easy) - Array manipulation with hash maps
2. **Add Two Numbers** (Medium) - Linked list arithmetic
3. **Longest Substring Without Repeating Characters** (Medium) - Sliding window technique

## Future Enhancements

- [ ] Problem tags and filtering
- [ ] Solution discussion forum
- [ ] Test case validation
- [ ] Performance benchmarking
- [ ] Solution submission history
- [ ] User authentication and progress tracking

## Development

The problem solver integrates seamlessly with the existing codebase and follows all established patterns for consistency and maintainability.

# Problems System with Supabase Integration

This project now uses Supabase to store and manage coding problems instead of hardcoded data. This provides a more scalable and flexible solution for problem management.

## Overview

The problems system consists of:
- **Problems Table**: Stores all problem data in Supabase
- **Problems Service**: Service layer for database operations
- **Problems Hook**: React hook for state management
- **Problems Browser**: UI component for browsing problems
- **API Endpoints**: RESTful API for problem operations

## Database Schema

### Problems Table

```sql
CREATE TABLE problems (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) NOT NULL DEFAULT 'easy',
    category TEXT NOT NULL DEFAULT 'general',
    tags TEXT[] DEFAULT '{}',
    examples JSONB DEFAULT '[]',
    constraints JSONB DEFAULT '{}',
    hints TEXT[] DEFAULT '{}',
    solution_template JSONB DEFAULT '{}',
    test_cases JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Sample Problem Structure

```json
{
  "slug": "two-sum",
  "title": "Two Sum",
  "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  "difficulty": "easy",
  "category": "arrays",
  "tags": ["array", "hash-table", "two-pointers"],
  "examples": [
    {
      "input": "nums = [2,7,11,15], target = 9",
      "output": "[0,1]",
      "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
    }
  ],
  "constraints": {
    "constraints": [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9"
    ]
  },
  "solution_template": {
    "javascript": "function twoSum(nums, target) {\n    // Your code here\n}",
    "python": "def two_sum(nums, target):\n    # Your code here\n    pass"
  },
  "test_cases": [
    {
      "input": {"nums": [2,7,11,15], "target": 9},
      "expected": [0,1]
    }
  ]
}
```

## Setup

1. **Run the problems schema**:
   ```sql
   -- Run this in your Supabase SQL editor
   \i supabase-problems-schema.sql
   ```

2. **Verify the setup**:
   - Check that the `problems` table is created
   - Verify sample problems are inserted
   - Test the RLS policies

## API Endpoints

### GET /api/problems
Get all problems with optional filtering.

**Query Parameters:**
- `difficulty`: Filter by difficulty (easy, medium, hard)
- `category`: Filter by category
- `tags`: Comma-separated list of tags
- `limit`: Number of results to return
- `offset`: Number of results to skip
- `search`: Search in title and description
- `random`: Get random problems (value = count)

**Example:**
```bash
# Get all problems
GET /api/problems

# Get easy problems
GET /api/problems?difficulty=easy

# Get problems by category
GET /api/problems?category=arrays

# Search problems
GET /api/problems?search=binary

# Get 5 random problems
GET /api/problems?random=5
```

### GET /api/problems/[slug]
Get a single problem by its slug.

**Example:**
```bash
GET /api/problems/two-sum
```

## React Hook Usage

```typescript
import { useProblems } from '@/hooks/useProblems'

function MyComponent() {
  const {
    problems,
    currentProblem,
    loading,
    error,
    fetchProblems,
    fetchProblem,
    searchProblems,
    getRandomProblems,
    getSolutionTemplate,
    getTestCases
  } = useProblems()

  // Fetch all problems
  useEffect(() => {
    fetchProblems()
  }, [])

  // Get solution template for a language
  const template = getSolutionTemplate(currentProblem, 'javascript')

  // Get test cases
  const testCases = getTestCases(currentProblem)

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {problems.map(problem => (
        <div key={problem.id}>{problem.title}</div>
      ))}
    </div>
  )
}
```

## Problems Service

```typescript
import { ProblemsService } from '@/lib/problems-service'

// Get all problems
const { data, error } = await ProblemsService.getProblems()

// Get a specific problem
const { data, error } = await ProblemsService.getProblemBySlug('two-sum')

// Search problems
const { data, error } = await ProblemsService.searchProblems('binary search')

// Get random problems
const { data, error } = await ProblemsService.getRandomProblems(5, 'easy')

// Admin functions
await ProblemsService.addProblem(newProblem)
await ProblemsService.updateProblem('two-sum', updates)
await ProblemsService.deleteProblem('two-sum')
```

## Components

### ProblemsBrowser
A comprehensive component for browsing and selecting problems.

```typescript
import { ProblemsBrowser } from '@/components/ProblemsBrowser'

function MyPage() {
  const handleProblemSelect = (problem) => {
    console.log('Selected problem:', problem)
  }

  return (
    <ProblemsBrowser 
      onSelectProblem={handleProblemSelect}
      showSelection={true}
    />
  )
}
```

**Features:**
- Search and filter problems
- Display problem details
- Select problems for coding
- Responsive grid layout
- Loading states and error handling

## Practice Integration

The problems system is integrated with the coding practice system:

1. **Browse Problems**: Users can browse and filter problems
2. **Select Problem**: Choose a problem to solve
3. **Auto-populate Code**: Solution templates are loaded automatically
4. **Track Progress**: Problem attempts are saved to Supabase
5. **Analytics**: Problem-specific analytics are tracked

## Pages

### /problems
Browse all problems with search and filtering capabilities.

### /practice-demo
Interactive coding practice with problem selection from Supabase.

## Sample Problems Included

The schema includes these sample problems:
1. **Two Sum** (Easy) - Array problem
2. **Reverse String** (Easy) - String manipulation
3. **Binary Search** (Easy) - Search algorithm
4. **Fibonacci Number** (Easy) - Dynamic programming
5. **Merge Sort** (Medium) - Sorting algorithm

## Adding New Problems

You can add problems through:

1. **SQL Insert**:
   ```sql
   INSERT INTO problems (slug, title, description, difficulty, category, tags, examples, solution_template, test_cases)
   VALUES ('new-problem', 'New Problem', 'Description...', 'easy', 'arrays', ARRAY['array'], '[]'::jsonb, '{}'::jsonb, '[]'::jsonb);
   ```

2. **Service Method**:
   ```typescript
   await ProblemsService.addProblem({
     slug: 'new-problem',
     title: 'New Problem',
     description: 'Problem description...',
     difficulty: 'easy',
     category: 'arrays',
     tags: ['array'],
     examples: [],
     solution_template: {},
     test_cases: []
   })
   ```

## Integration with Practice System

Problems are automatically integrated with the practice tracking system:

- Problem selection auto-populates metadata
- Solution templates are loaded based on language
- Test cases are used for validation
- Problem analytics are updated on submissions

## Error Handling

The system includes comprehensive error handling:
- Database connection errors
- Invalid problem slugs
- Missing solution templates
- Network timeouts
- User-friendly error messages

## Performance Optimizations

- Efficient database queries with indexes
- Pagination for large result sets
- Caching of frequently accessed problems
- Optimized React hooks with proper dependencies
- Loading states for better UX

This problems system provides a robust foundation for managing coding challenges and integrates seamlessly with the practice tracking features. 