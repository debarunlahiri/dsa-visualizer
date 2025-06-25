'use client'

import { ProblemsBrowser } from '@/components/ProblemsBrowser'

export default function ProblemsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900">
      <ProblemsBrowser showSelection={false} />
    </div>
  )
} 