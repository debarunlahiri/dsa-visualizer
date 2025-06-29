"use client"

import { useState } from "react"
import { AlgorithmSidebar } from "@/components/dsa/algorithm-sidebar"
import { AlgorithmHeader } from "@/components/dsa/algorithm-header"
import { AlgorithmMainContent } from "@/components/dsa/algorithm-main-content"
import { algorithmCategories } from "@/lib/algorithms/categories"

export default function DsaAnimationsPage() {
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
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 flex flex-col min-w-0">
        {/* Header */}
        <AlgorithmHeader
          selectedAlgorithmTitle={selectedAlgorithmData?.title}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        {/* Content Area */}
        <main className="p-2 sm:p-4 lg:p-6 flex-1 overflow-y-auto">
          <AlgorithmMainContent
            selectedAlgorithm={selectedAlgorithmData}
            onOpenSidebar={() => setSidebarOpen(true)}
          />
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-700 p-3 sm:p-4 text-center text-slate-500 text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} DSA Visualizer - Interactive Algorithm Learning</p>
        </footer>
      </div>
    </div>
  )
}
