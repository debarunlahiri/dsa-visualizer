import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AlgorithmSection } from "@/components/dsa/algorithm-section"
import { AlgorithmCodeTabs } from "@/components/dsa/algorithm-code-tabs"
import type { Algorithm } from "@/lib/algorithms/types"

interface AlgorithmMainContentProps {
  selectedAlgorithm?: Algorithm
  onOpenSidebar: () => void
}

export function AlgorithmMainContent({ selectedAlgorithm, onOpenSidebar }: AlgorithmMainContentProps) {
  if (!selectedAlgorithm) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-300 mb-4">Welcome to DSA Visualizer</h2>
          <p className="text-slate-400 mb-6">
            Select an algorithm from the sidebar to start exploring interactive visualizations.
          </p>
          <Button onClick={onOpenSidebar} className="lg:hidden bg-sky-500 hover:bg-sky-600">
            <Menu className="mr-2 h-4 w-4" />
            Open Menu
          </Button>
        </div>
      </div>
    )
  }

  const SelectedComponent = selectedAlgorithm.component

  if (selectedAlgorithm.explanation && selectedAlgorithm.codeSnippets) {
    return (
      <AlgorithmSection
        id={selectedAlgorithm.id}
        explanationSlot={selectedAlgorithm.explanation}
        visualizerSlot={<SelectedComponent />}
        codeTabsSlot={<AlgorithmCodeTabs codeSnippets={selectedAlgorithm.codeSnippets} />}
      />
    )
  }

  // Fallback for algorithms without the new structure yet
  return (
    <div className="flex justify-center">
      <SelectedComponent />
    </div>
  )
} 