import { ProblemsBrowser } from '@/components/ProblemsBrowser'
import { generateMetadata as createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
  title: 'Coding Problems & Challenges',
  description: 'Practice data structures and algorithms with our curated collection of coding problems. Features LeetCode-style challenges, detailed solutions, and progress tracking.',
  keywords: [
    'coding problems',
    'programming challenges',
    'leetcode practice',
    'algorithm problems',
    'coding interview questions',
    'data structure problems',
    'problem solving',
    'competitive programming'
  ],
  path: '/problems',
  type: 'website',
})

export default function ProblemsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900">
      <ProblemsBrowser showSelection={false} />
    </div>
  )
} 