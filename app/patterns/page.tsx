import { PatternsCheatSheetVisualizer } from "@/components/dsa/patterns-cheat-sheet-visualizer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { generateMetadata as createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
  title: 'DSA Patterns & Problem-Solving Guide',
  description: 'Master data structure and algorithm patterns for competitive programming. Complete cheat sheet for LeetCode, HackerRank, Codeforces, and technical interviews.',
  keywords: [
    'DSA patterns',
    'algorithm patterns',
    'problem solving patterns',
    'competitive programming',
    'leetcode patterns',
    'coding patterns',
    'interview patterns',
    'data structure patterns',
    'algorithmic thinking',
    'programming techniques',
    'coding interview guide',
    'problem-solving strategies'
  ],
  path: '/patterns',
  type: 'article',
})

export default function PatternsPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to DSA
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-white">DSA Patterns & Problem-Solving Cheat Sheet</h1>
                <p className="text-sm text-slate-400">Complete guide for LeetCode, HackerRank, Codeforces & more</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PatternsCheatSheetVisualizer />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 p-4 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} DSA Patterns Guide - Master Competitive Programming</p>
      </footer>
    </div>
  )
} 