import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AlgorithmSection } from "@/components/dsa/algorithm-section"
import { AlgorithmCodeTabs } from "@/components/dsa/algorithm-code-tabs"
import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"
import type { Algorithm } from "@/lib/algorithms/types"
import React, { useMemo } from "react"

interface AlgorithmMainContentProps {
  selectedAlgorithm?: Algorithm
  onOpenSidebar: () => void
}

// Helper function to check if explanation is a data object
function isExplanationDataObject(explanation: any): explanation is {
  title: string
  description: string
  sections: Array<{ title: string; content: string }>
  codeExamples: Array<any>
} {
  return (
    explanation &&
    typeof explanation === 'object' &&
    !React.isValidElement(explanation) &&
    'title' in explanation &&
    'description' in explanation &&
    'sections' in explanation
  )
}

// Component to render data object explanations
function DataObjectExplanation({ data }: { data: {
  title: string
  description: string
  sections: Array<{ title: string; content: string }>
  codeExamples?: Array<any>
}}) {
  return (
    <AlgorithmExplanation>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      
      {data.sections.map((section, index) => (
        <div key={index}>
          <h3>{section.title}</h3>
          <div style={{ whiteSpace: 'pre-line' }}>
            {section.content}
          </div>
        </div>
      ))}
    </AlgorithmExplanation>
  )
}

export function AlgorithmMainContent({ selectedAlgorithm, onOpenSidebar }: AlgorithmMainContentProps) {
  // Memoize the component to prevent re-creation on every render
  const visualizerComponent = useMemo(() => {
    if (!selectedAlgorithm) return null
    const SelectedComponent = selectedAlgorithm.component
    return <SelectedComponent />
  }, [selectedAlgorithm?.id]) // Only recreate when algorithm ID changes

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

  if (selectedAlgorithm.explanation && selectedAlgorithm.codeSnippets) {
    // Handle both React components and data objects
    let explanationSlot: React.ReactNode
    
    if (isExplanationDataObject(selectedAlgorithm.explanation)) {
      explanationSlot = <DataObjectExplanation data={selectedAlgorithm.explanation} />
    } else {
      explanationSlot = selectedAlgorithm.explanation
    }

    return (
      <AlgorithmSection
        id={selectedAlgorithm.id}
        explanationSlot={explanationSlot}
        visualizerSlot={visualizerComponent}
        codeTabsSlot={<AlgorithmCodeTabs codeSnippets={selectedAlgorithm.codeSnippets} />}
      />
    )
  }

  // Fallback for algorithms without the new structure yet
  return (
    <div className="flex justify-center">
      {visualizerComponent}
    </div>
  )
} 