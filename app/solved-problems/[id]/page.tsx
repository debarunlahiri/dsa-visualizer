'use client'

import { useParams } from 'next/navigation'
import { SolvedProblemDetail } from '@/components/SolvedProblemDetail'
import { getProblemById } from '@/lib/solved-problems'
import { notFound } from 'next/navigation'

export default function SolvedProblemPage() {
  const params = useParams()
  const id = params.id as string
  
  const problem = getProblemById(id)
  
  if (!problem) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900">
      <SolvedProblemDetail problem={problem} />
    </div>
  )
} 