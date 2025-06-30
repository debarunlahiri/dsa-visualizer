"use client"

import { ChevronRight, ChevronDown, X, BookOpen, Code2, Target, CheckCircle, FileText, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { AlgorithmCategory } from "@/lib/algorithms/types"

interface AlgorithmSidebarProps {
  categories: AlgorithmCategory[]
  selectedAlgorithmId: string
  expandedCategories: Set<string>
  sidebarOpen: boolean
  onToggleCategory: (categoryId: string) => void
  onSelectAlgorithm: (algorithmId: string) => void
  onCloseSidebar: () => void
}

export function AlgorithmSidebar({
  categories,
  selectedAlgorithmId,
  expandedCategories,
  sidebarOpen,
  onToggleCategory,
  onSelectAlgorithm,
  onCloseSidebar,
}: AlgorithmSidebarProps) {
  const pathname = usePathname()
  
  const mainNavItems = [
    { href: "/", label: "DSA Visualizations", icon: Home },
    { href: "/use-cases", label: "Real-World Uses", icon: BookOpen },
    { href: "/compiler", label: "Online Compiler", icon: Code2 },
    { href: "/problems", label: "Practice Problems", icon: Target },
    { href: "/solved-problems", label: "Solved Problems", icon: CheckCircle },
    { href: "/documents", label: "Documents", icon: FileText },
  ]

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 sm:w-80 glass-sidebar backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ease-in-out",
        // Mobile behavior
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        // Desktop behavior - always visible and fixed
        "lg:translate-x-0"
      )}
    >
      {/* Fixed Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 border-b border-white/10 bg-black/50 backdrop-blur-lg">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          DSA Visualizer
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCloseSidebar}
          className="lg:hidden text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Scrollable Content - starts below the fixed header */}
      <div className="absolute top-[73px] bottom-0 left-0 right-0 overflow-y-auto overscroll-contain scroll-smooth">
        {/* Main Navigation */}
        <nav className="p-4 space-y-1 border-b border-white/10">
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Navigation
            </h3>
            {mainNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => onCloseSidebar()}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 border",
                    isActive
                      ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border-blue-500/50 breathing-glow"
                      : "text-gray-300 hover:text-white hover:bg-white/5 border-transparent hover:border-white/10"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Algorithm Categories */}
        <nav className="p-4 space-y-2 pb-8">
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Algorithm Categories
            </h3>
          </div>
          {categories.map((category) => (
            <div key={category.id} className="space-y-1">
              <button
                onClick={() => onToggleCategory(category.id)}
                className="flex items-center justify-between w-full p-3 text-left text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 border border-transparent hover:border-white/10"
              >
                <span className="font-medium">{category.title}</span>
                {expandedCategories.has(category.id) ? (
                  <ChevronDown className="h-4 w-4 text-blue-400" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {expandedCategories.has(category.id) && (
                <div className="ml-4 mt-2 space-y-1 animate-fade-in">
                  {category.algorithms.map((algorithm) => (
                    <button
                      key={algorithm.id}
                      onClick={() => onSelectAlgorithm(algorithm.id)}
                      className={cn(
                        "block w-full p-3 text-left text-sm rounded-lg transition-all duration-200 border",
                        selectedAlgorithmId === algorithm.id
                          ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white font-medium border-blue-500/50 shadow-glass breathing-glow"
                          : "text-gray-400 hover:text-white hover:bg-white/5 border-transparent hover:border-white/10",
                      )}
                    >
                      {algorithm.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
} 