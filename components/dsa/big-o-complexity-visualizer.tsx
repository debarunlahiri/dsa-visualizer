"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { VisualizerLayout } from "./visualizer-layout"

const COMPLEXITY_FUNCTIONS = {
  constant: { name: "O(1)", color: "#10b981", func: () => 1 },
  logarithmic: { name: "O(log n)", color: "#3b82f6", func: (n: number) => Math.log2(n) },
  linear: { name: "O(n)", color: "#eab308", func: (n: number) => n },
  linearithmic: { name: "O(n log n)", color: "#f97316", func: (n: number) => n * Math.log2(n) },
  quadratic: { name: "O(n²)", color: "#ef4444", func: (n: number) => n * n },
  exponential: { name: "O(2ⁿ)", color: "#8b5cf6", func: (n: number) => Math.pow(2, Math.min(n, 20)) }
}

const COMPARISON_EXAMPLES = [
  { name: "Array Access", complexity: "constant", description: "Getting element at index" },
  { name: "Binary Search", complexity: "logarithmic", description: "Finding element in sorted array" },
  { name: "Linear Search", complexity: "linear", description: "Finding element in unsorted array" },
  { name: "Merge Sort", complexity: "linearithmic", description: "Efficient sorting algorithm" },
  { name: "Bubble Sort", complexity: "quadratic", description: "Simple but inefficient sorting" },
  { name: "Recursive Fibonacci", complexity: "exponential", description: "Naive recursive approach" }
]

export default function BigOComplexityVisualizer() {
  const [inputSize, setInputSize] = useState([10])
  const [selectedComplexities, setSelectedComplexities] = useState<string[]>(["linear", "quadratic", "logarithmic"])
  const [showComparison, setShowComparison] = useState(false)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [copyButtonText, setCopyButtonText] = useState("Copy")
  const [animationStep, setAnimationStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const descriptionContainerRef = useRef<HTMLDivElement>(null!)
  const currentInputSize = inputSize[0]

  const displayedDescriptions = useMemo(() => {
    const descriptions = []
    
    if (showComparison) {
      descriptions.push({
        id: "comparison-intro",
        text: `Comparing time complexities for input size n = ${currentInputSize}`,
        lineNumber: 1
      })
      
      selectedComplexities.forEach((key, index) => {
        const complexity = COMPLEXITY_FUNCTIONS[key as keyof typeof COMPLEXITY_FUNCTIONS]
        const value = complexity.func(currentInputSize)
        descriptions.push({
          id: `comparison-${key}`,
          text: `${complexity.name}: ${value < 1000 ? value.toFixed(2) : value.toExponential(2)} operations`,
          lineNumber: index + 2
        })
      })
    } else {
      descriptions.push({
        id: "graph-info",
        text: `Interactive Big O complexity graph showing growth rates`,
        lineNumber: 1
      })
      descriptions.push({
        id: "input-size",
        text: `Current input size: n = ${currentInputSize}`,
        lineNumber: 2
      })
      descriptions.push({
        id: "selected-complexities",
        text: `Showing: ${selectedComplexities.map(key => COMPLEXITY_FUNCTIONS[key as keyof typeof COMPLEXITY_FUNCTIONS].name).join(", ")}`,
        lineNumber: 3
      })
    }
    
    return descriptions
  }, [currentInputSize, selectedComplexities, showComparison])

  const graphData = useMemo(() => {
    const maxN = 50
    const points = []
    
    for (let n = 1; n <= maxN; n++) {
      const point: any = { n }
      selectedComplexities.forEach(key => {
        const complexity = COMPLEXITY_FUNCTIONS[key as keyof typeof COMPLEXITY_FUNCTIONS]
        point[key] = complexity.func(n)
      })
      points.push(point)
    }
    
    return points
  }, [selectedComplexities])

  const maxValue = useMemo(() => {
    return Math.max(...graphData.flatMap(point => 
      selectedComplexities.map(key => point[key])
    ))
  }, [graphData, selectedComplexities])

  const toggleComplexity = (key: string) => {
    setSelectedComplexities(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key)
        : [...prev, key]
    )
  }

  const handleCopyLogs = async () => {
    const logsToCopy = displayedDescriptions.map(desc => desc.text).join("\n")
    try {
      await navigator.clipboard.writeText(logsToCopy)
      setCopyButtonText("Copied!")
    } catch (err) {
      console.error("Failed to copy logs: ", err)
      setCopyButtonText("Failed!")
    } finally {
      setTimeout(() => setCopyButtonText("Copy"), 2000)
    }
  }

  const startAnimation = () => {
    setIsAnimating(true)
    setAnimationStep(0)
  }

  useEffect(() => {
    if (isAnimating && animationStep < graphData.length - 1) {
      const timer = setTimeout(() => {
        setAnimationStep(prev => prev + 1)
      }, 100)
      return () => clearTimeout(timer)
    } else if (animationStep >= graphData.length - 1) {
      setIsAnimating(false)
    }
  }, [isAnimating, animationStep, graphData.length])

  const customControls = (
    <>
      <Button
        onClick={() => setShowComparison(!showComparison)}
        variant="outline"
        className="text-xs sm:text-sm text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-slate-900"
      >
        {showComparison ? "Show Graph" : "Show Comparison"}
      </Button>
      <Button
        onClick={startAnimation}
        variant="outline"
        className="text-xs sm:text-sm text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-slate-900"
        disabled={isAnimating}
      >
        {isAnimating ? "Animating..." : "Animate Growth"}
      </Button>
    </>
  )

  return (
    <VisualizerLayout
      title="Big O Complexity Analysis"
      algorithmColor="purple"
      displayedDescriptions={displayedDescriptions}
      isDescriptionExpanded={isDescriptionExpanded}
      onToggleDescription={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
      onCopyLogs={handleCopyLogs}
      copyButtonText={copyButtonText}
      descriptionLogRef={descriptionContainerRef}
      isLoading={false}
      currentStepIndex={0}
      totalSteps={1}
      isPlaying={false}
      onPrevStep={() => {}}
      onPlayPause={() => {}}
      onNextStep={() => {}}
      onReset={() => setAnimationStep(0)}
      animationSpeed={1}
      onSpeedChange={() => {}}
      customControlsSlot={customControls}
      disableControls={false}
    >
      <div className="space-y-6">
        {/* Complexity Selection */}
        <div className="flex flex-wrap gap-2 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <span className="text-slate-300 text-sm font-medium mb-2 w-full">Select Complexities to Compare:</span>
          {Object.entries(COMPLEXITY_FUNCTIONS).map(([key, complexity]) => (
            <Button
              key={key}
              onClick={() => toggleComplexity(key)}
              variant={selectedComplexities.includes(key) ? "default" : "outline"}
              className={cn(
                "text-xs px-3 py-1 h-auto",
                selectedComplexities.includes(key) && `bg-[${complexity.color}] hover:bg-[${complexity.color}]/80`
              )}
              style={selectedComplexities.includes(key) ? { backgroundColor: complexity.color } : {}}
            >
              {complexity.name}
            </Button>
          ))}
        </div>

        {/* Input Size Slider */}
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <label className="text-slate-300 text-sm font-medium mb-3 block">
            Input Size (n): {currentInputSize}
          </label>
          <Slider
            value={inputSize}
            onValueChange={setInputSize}
            max={50}
            min={1}
            step={1}
            className="w-full"
          />
        </div>

        {/* Main Visualization */}
        <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg min-h-[400px]">
          {showComparison ? (
            // Comparison Table
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                Time Complexity Comparison (n = {currentInputSize})
              </h3>
              <div className="grid gap-3">
                {COMPARISON_EXAMPLES
                  .filter(example => selectedComplexities.includes(example.complexity))
                  .map((example, index) => {
                    const complexity = COMPLEXITY_FUNCTIONS[example.complexity as keyof typeof COMPLEXITY_FUNCTIONS]
                    const operations = complexity.func(currentInputSize)
                    return (
                      <motion.div
                        key={example.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-slate-800 rounded-lg"
                      >
                        <div>
                          <div className="font-medium text-white">{example.name}</div>
                          <div className="text-sm text-slate-400">{example.description}</div>
                        </div>
                        <div className="text-right">
                          <div 
                            className="font-mono text-sm font-medium"
                            style={{ color: complexity.color }}
                          >
                            {complexity.name}
                          </div>
                          <div className="text-slate-300 text-sm">
                            {operations < 1000 ? operations.toFixed(0) : operations.toExponential(2)} ops
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
              </div>
            </div>
          ) : (
            // Graph Visualization
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Growth Rate Comparison</h3>
              <div className="relative h-80 bg-slate-800 rounded-lg p-4">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 600 300"
                  className="overflow-visible"
                >
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#374151" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="600" height="300" fill="url(#grid)" />
                  
                  {/* Axes */}
                  <line x1="50" y1="250" x2="550" y2="250" stroke="#6b7280" strokeWidth="2" />
                  <line x1="50" y1="250" x2="50" y2="50" stroke="#6b7280" strokeWidth="2" />
                  
                  {/* Axis labels */}
                  <text x="300" y="280" textAnchor="middle" fill="#9ca3af" fontSize="12">Input Size (n)</text>
                  <text x="25" y="150" textAnchor="middle" fill="#9ca3af" fontSize="12" transform="rotate(-90, 25, 150)">Operations</text>
                  
                  {/* Plot lines */}
                  {selectedComplexities.map(key => {
                    const complexity = COMPLEXITY_FUNCTIONS[key as keyof typeof COMPLEXITY_FUNCTIONS]
                    const points = graphData.slice(0, isAnimating ? animationStep + 1 : graphData.length)
                    const pathData = points.map((point, index) => {
                      const x = 50 + (index / (graphData.length - 1)) * 500
                      const y = 250 - (point[key] / maxValue) * 200
                      return `${index === 0 ? 'M' : 'L'} ${x} ${Math.max(50, y)}`
                    }).join(' ')
                    
                    return (
                      <motion.path
                        key={key}
                        d={pathData}
                        fill="none"
                        stroke={complexity.color}
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                    )
                  })}
                  
                  {/* Current input size indicator */}
                  <line
                    x1={50 + ((currentInputSize - 1) / 49) * 500}
                    y1="50"
                    x2={50 + ((currentInputSize - 1) / 49) * 500}
                    y2="250"
                    stroke="#fbbf24"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                </svg>
                
                {/* Legend */}
                <div className="absolute top-4 right-4 bg-slate-900/80 p-3 rounded-lg">
                  {selectedComplexities.map(key => {
                    const complexity = COMPLEXITY_FUNCTIONS[key as keyof typeof COMPLEXITY_FUNCTIONS]
                    return (
                      <div key={key} className="flex items-center gap-2 mb-1">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: complexity.color }}
                        />
                        <span className="text-sm text-slate-300">{complexity.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </VisualizerLayout>
  )
} 