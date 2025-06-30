import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SimpleThemeToggle } from "@/components/theme-toggle"

interface AlgorithmHeaderProps {
  selectedAlgorithmTitle?: string
  onOpenSidebar: () => void
}

export function AlgorithmHeader({ selectedAlgorithmTitle, onOpenSidebar }: AlgorithmHeaderProps) {
  return (
    <header className="glass backdrop-blur-lg border-b border-white/10 p-3 sm:p-4 sticky top-0 z-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenSidebar}
            className="lg:hidden text-gray-400 hover:text-white hover:bg-white/10 p-1 sm:p-2 border border-white/10 rounded-lg"
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent truncate">
              {selectedAlgorithmTitle || "DSA Visualizations"}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 hidden sm:block">
              Interactive algorithm visualization and step-by-step execution
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 flex-shrink-0">
          <SimpleThemeToggle />
        </div>
      </div>
    </header>
  )
} 