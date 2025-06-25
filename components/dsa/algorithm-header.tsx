import { Menu, Code2, BookOpen, Target, CheckCircle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SimpleThemeToggle } from "@/components/theme-toggle"

interface AlgorithmHeaderProps {
  selectedAlgorithmTitle?: string
  onOpenSidebar: () => void
}

export function AlgorithmHeader({ selectedAlgorithmTitle, onOpenSidebar }: AlgorithmHeaderProps) {
  return (
    <header className="bg-slate-800 border-b border-slate-700 p-3 sm:p-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenSidebar}
            className="lg:hidden text-slate-400 hover:text-white p-1 sm:p-2"
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-sky-400 truncate">
              {selectedAlgorithmTitle || "DSA Visualizations"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 hidden sm:block">
              Interactive algorithm visualization and step-by-step execution
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <Link href="/use-cases" className="hidden sm:block">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white transition-colors text-xs sm:text-sm"
            >
              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
              <span className="hidden sm:inline">Real-World Uses</span>
            </Button>
          </Link>
          <Link href="/compiler" className="hidden sm:block">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white transition-colors text-xs sm:text-sm"
            >
              <Code2 className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
              <span className="hidden sm:inline">Online Compiler</span>
            </Button>
          </Link>
          <Link href="/problems" className="hidden sm:block">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white transition-colors text-xs sm:text-sm"
            >
              <Target className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
              <span className="hidden sm:inline">Practice Problems</span>
            </Button>
          </Link>
          <Link href="/solved-problems" className="hidden sm:block">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white transition-colors text-xs sm:text-sm"
            >
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
              <span className="hidden sm:inline">Solved Problems</span>
            </Button>
          </Link>
          <Link href="/documents" className="hidden sm:block">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white transition-colors text-xs sm:text-sm"
            >
              <FileText className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
              <span className="hidden sm:inline">Documents</span>
            </Button>
          </Link>
          
          {/* Mobile menu for additional links */}
          <div className="sm:hidden">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white p-1"
              onClick={() => {
                // Simple mobile menu toggle - could be enhanced with a dropdown
                const menu = document.getElementById('mobile-nav-menu')
                if (menu) {
                  menu.classList.toggle('hidden')
                }
              }}
            >
              <BookOpen className="h-4 w-4" />
            </Button>
          </div>
          
          <SimpleThemeToggle />
        </div>
      </div>
      
      {/* Mobile navigation menu */}
      <div id="mobile-nav-menu" className="hidden sm:hidden mt-3 pt-3 border-t border-slate-700">
        <div className="flex flex-col space-y-2">
          <Link href="/use-cases">
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white transition-colors justify-start"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Real-World Uses
            </Button>
          </Link>
          <Link href="/compiler">
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white transition-colors justify-start"
            >
              <Code2 className="h-4 w-4 mr-2" />
              Online Compiler
            </Button>
          </Link>
          <Link href="/problems">
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white transition-colors justify-start"
            >
              <Target className="h-4 w-4 mr-2" />
              Practice Problems
            </Button>
          </Link>
          <Link href="/solved-problems">
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white transition-colors justify-start"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Solved Problems
            </Button>
          </Link>
          <Link href="/documents">
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white transition-colors justify-start"
            >
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
} 