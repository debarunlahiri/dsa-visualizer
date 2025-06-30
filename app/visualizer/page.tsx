"use client"

import { useState } from "react"
import { AlgorithmSidebar } from "@/components/dsa/algorithm-sidebar"
import { AlgorithmHeader } from "@/components/dsa/algorithm-header"
import { AlgorithmMainContent } from "@/components/dsa/algorithm-main-content"
import { algorithmCategories } from "@/lib/algorithms/categories"
import { Button } from "@/components/ui/button"
import { BookOpen, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function VisualizerPage() {
  const [selectedAlgorithmId, setSelectedAlgorithmId] = useState<string>("dsa-cheat-sheet")
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["guide", "complexity-analysis", "sorting", "searching", "trees", "graphs", "hashing", "dynamic-programming", "greedy"]),
  )
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  const selectAlgorithm = (algorithmId: string) => {
    setSelectedAlgorithmId(algorithmId)
    setSidebarOpen(false) // Close sidebar on mobile after selection
  }

  const selectedAlgorithmData = algorithmCategories
    .flatMap((cat) => cat.algorithms)
    .find((alg) => alg.id === selectedAlgorithmId)

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-black to-purple-950/20"></div>
      
      <div className="relative z-10">
        {/* Fixed Sidebar */}
        <AlgorithmSidebar
          categories={algorithmCategories}
          selectedAlgorithmId={selectedAlgorithmId}
          expandedCategories={expandedCategories}
          sidebarOpen={sidebarOpen}
          onToggleCategory={toggleCategory}
          onSelectAlgorithm={selectAlgorithm}
          onCloseSidebar={() => setSidebarOpen(false)}
        />

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden" 
            onClick={() => setSidebarOpen(false)} 
          />
        )}

        {/* Main Content Area - offset by sidebar width on desktop */}
        <div className="min-h-screen lg:ml-80">
          <div className="flex flex-col min-h-screen">
            {/* Header */}
            <AlgorithmHeader
              selectedAlgorithmTitle={selectedAlgorithmData?.title}
              onOpenSidebar={() => setSidebarOpen(true)}
            />

            {/* Content Area */}
            <main className="flex-1 p-2 sm:p-4 lg:p-6 overflow-y-auto">
              {/* Quick Navigation */}
              <div className="mb-6 glass-card rounded-xl border border-white/10 shadow-glass animate-fade-in breathing-glow">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                        🚀 <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">New: Comprehensive Patterns Guide</span>
                      </h2>
                      <p className="text-sm text-gray-300">Master all DSA patterns for LeetCode, HackerRank, Codeforces & more!</p>
                    </div>
                    <Link href="/patterns">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-dark-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/10">
                        <BookOpen className="w-4 h-4 mr-2" />
                        View Patterns Guide
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <AlgorithmMainContent
                selectedAlgorithm={selectedAlgorithmData}
                onOpenSidebar={() => setSidebarOpen(true)}
              />
            </main>

            {/* Footer */}
            <footer className="glass border-t border-white/10 p-3 sm:p-4 text-center text-gray-400 text-xs sm:text-sm">
              <p>&copy; {new Date().getFullYear()} DSA Visualizer - Interactive Algorithm Learning</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
} 