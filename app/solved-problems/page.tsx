'use client'

import { useState } from 'react'
import { SolvedProblemsBrowser } from '@/components/SolvedProblemsBrowser'

export default function SolvedProblemsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900">
      <SolvedProblemsBrowser />
    </div>
  )
} 