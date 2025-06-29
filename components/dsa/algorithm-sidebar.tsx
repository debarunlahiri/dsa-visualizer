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
        "fixed inset-y-0 left-0 z-50 w-72 sm:w-80 bg-slate-800 border-r border-slate-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <h2 className="text-xl font-bold text-white">DSA Visualizer</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCloseSidebar}
          className="lg:hidden text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-4.5rem)] pb-20">
        {/* Main Navigation */}
        <nav className="p-4 space-y-1 border-b border-slate-700">
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
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
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-slate-700 text-white"
                      : "text-slate-300 hover:text-white hover:bg-slate-700"
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
        <nav className="p-4 space-y-2">
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Algorithm Categories
            </h3>
          </div>
          {categories.map((category) => (
            <div key={category.id}>
              <button
                onClick={() => onToggleCategory(category.id)}
                className="flex items-center justify-between w-full p-2 text-left text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
              >
                <span className="font-medium">{category.title}</span>
                {expandedCategories.has(category.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {expandedCategories.has(category.id) && (
                <div className="ml-4 mt-2 space-y-1">
                  {category.algorithms.map((algorithm) => (
                    <button
                      key={algorithm.id}
                      onClick={() => onSelectAlgorithm(algorithm.id)}
                      className={cn(
                        "block w-full p-2 text-left text-sm rounded-md transition-colors",
                        selectedAlgorithmId === algorithm.id
                          ? "bg-slate-600 text-white font-medium"
                          : "text-slate-400 hover:text-white hover:bg-slate-700",
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