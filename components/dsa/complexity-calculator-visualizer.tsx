"use client"

import { useState, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import { Calculator, Code, Eye, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { VisualizerLayout } from "./visualizer-layout"

const CODE_EXAMPLES = {
  "simple-loop": {
    name: "Simple Loop",
    code: `function sumArray(arr) {
  let sum = 0;                    // O(1)
  for (let i = 0; i < arr.length; i++) {  // n iterations
    sum += arr[i];                // O(1) per iteration
  }
  return sum;                     // O(1)
}`,
    analysis: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      steps: [
        "Initialize sum variable: O(1)",
        "Loop runs n times (array length)",
        "Each iteration does O(1) work",
        "Total: 1 + n×1 + 1 = O(n)"
      ]
    }
  },
  "nested-loops": {
    name: "Nested Loops",
    code: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {        // n iterations
    for (let j = 0; j < arr.length - i - 1; j++) { // (n-i-1) iterations
      if (arr[j] > arr[j + 1]) {              // O(1)
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // O(1)
      }
    }
  }
}`,
    analysis: {
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      steps: [
        "Outer loop: n iterations",
        "Inner loop: (n-1) + (n-2) + ... + 1 iterations",
        "Total iterations: n(n-1)/2",
        "Each iteration: O(1) work",
        "Result: O(n²)"
      ]
    }
  },
  "binary-recursion": {
    name: "Binary Recursion",
    code: `function fibonacci(n) {
  if (n <= 1) return n;           // Base case: O(1)
  return fibonacci(n-1) + fibonacci(n-2); // 2 recursive calls
}`,
    analysis: {
      timeComplexity: "O(2ⁿ)",
      spaceComplexity: "O(n)",
      steps: [
        "Each call makes 2 more calls",
        "Forms a binary tree of calls",
        "Tree height: n levels",
        "Total nodes: 2ⁿ - 1",
        "Stack space: O(n) for recursion depth"
      ]
    }
  },
  "divide-conquer": {
    name: "Divide & Conquer",
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));    // T(n/2)
  const right = mergeSort(arr.slice(mid));      // T(n/2)
  
  return merge(left, right);                    // O(n)
}`,
    analysis: {
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      steps: [
        "Divide: Split array into halves (log n levels)",
        "Conquer: Merge takes O(n) at each level",
        "Recurrence: T(n) = 2T(n/2) + O(n)",
        "Master Theorem Case 2: O(n log n)",
        "Space: O(n) for temporary arrays"
      ]
    }
  }
}

const COMPLEXITY_COLORS = {
  "O(1)": "#10b981",      // green
  "O(log n)": "#3b82f6",  // blue
  "O(n)": "#eab308",      // yellow
  "O(n log n)": "#f97316", // orange
  "O(n²)": "#ef4444",     // red
  "O(n³)": "#dc2626",     // dark red
  "O(2ⁿ)": "#8b5cf6",     // purple
}

export default function ComplexityCalculatorVisualizer() {
  const [selectedExample, setSelectedExample] = useState<string>("simple-loop")
  const [customCode, setCustomCode] = useState("")
  const [isCustomMode, setIsCustomMode] = useState(false)
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState(0)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [copyButtonText, setCopyButtonText] = useState("Copy")

  const descriptionContainerRef = useRef<HTMLDivElement>(null!)

  const currentExample = CODE_EXAMPLES[selectedExample as keyof typeof CODE_EXAMPLES]
  const displayCode = isCustomMode ? customCode : currentExample.code
  const analysis = currentExample.analysis

  const displayedDescriptions = useMemo(() => {
    const descriptions = []
    
    if (isCustomMode) {
      descriptions.push({
        id: "custom-mode",
        text: "Custom code analysis mode - enter your code to analyze",
        lineNumber: 1
      })
      if (customCode.trim()) {
        descriptions.push({
          id: "custom-code",
          text: `Analyzing ${customCode.split('\n').length} lines of code`,
          lineNumber: 2
        })
      }
    } else {
      descriptions.push({
        id: "example-analysis",
        text: `Analyzing: ${currentExample.name}`,
        lineNumber: 1
      })
      descriptions.push({
        id: "time-complexity",
        text: `Time Complexity: ${analysis.timeComplexity}`,
        lineNumber: 2
      })
      descriptions.push({
        id: "space-complexity",
        text: `Space Complexity: ${analysis.spaceComplexity}`,
        lineNumber: 3
      })
      
      if (currentAnalysisStep > 0) {
        analysis.steps.slice(0, currentAnalysisStep).forEach((step, index) => {
          descriptions.push({
            id: `step-${index}`,
            text: `Step ${index + 1}: ${step}`,
            lineNumber: 4 + index
          })
        })
      }
    }
    
    return descriptions
  }, [isCustomMode, customCode, currentExample, analysis, currentAnalysisStep])

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

  const nextStep = () => {
    if (currentAnalysisStep < analysis.steps.length) {
      setCurrentAnalysisStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentAnalysisStep > 0) {
      setCurrentAnalysisStep(prev => prev - 1)
    }
  }

  const resetAnalysis = () => {
    setCurrentAnalysisStep(0)
  }

  const analyzeCustomCode = () => {
    // Simple heuristic analysis for demo purposes
    const lines = customCode.toLowerCase().split('\n')
    let hasLoop = false
    let hasNestedLoop = false
    let hasRecursion = false
    
    lines.forEach(line => {
      if (line.includes('for') || line.includes('while')) {
        if (hasLoop) hasNestedLoop = true
        hasLoop = true
      }
      if (line.includes('function') && line.includes('(')) {
        // Check if function calls itself (basic recursion detection)
        const funcName = line.match(/function\s+(\w+)/)?.[1]
        if (funcName && customCode.includes(funcName + '(')) {
          hasRecursion = true
        }
      }
    })

    let timeComplexity = "O(1)"
    if (hasRecursion) timeComplexity = "O(2ⁿ) or O(n)"
    else if (hasNestedLoop) timeComplexity = "O(n²)"
    else if (hasLoop) timeComplexity = "O(n)"

    return { timeComplexity, spaceComplexity: "O(1)" }
  }

  const customAnalysis = isCustomMode && customCode.trim() ? analyzeCustomCode() : null

  const customControls = (
    <>
      <Button
        onClick={() => setIsCustomMode(!isCustomMode)}
        variant="outline"
        className="text-xs sm:text-sm text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-slate-900"
      >
        <Code className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
        {isCustomMode ? "Examples" : "Custom Code"}
      </Button>
      {!isCustomMode && (
        <Button
          onClick={() => setCurrentAnalysisStep(currentAnalysisStep === analysis.steps.length ? 0 : analysis.steps.length)}
          variant="outline"
          className="text-xs sm:text-sm text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-slate-900"
        >
          <Eye className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
          {currentAnalysisStep === analysis.steps.length ? "Hide Analysis" : "Show Full Analysis"}
        </Button>
      )}
    </>
  )

  return (
    <VisualizerLayout
      title="Complexity Calculator"
      algorithmColor="emerald"
      displayedDescriptions={displayedDescriptions}
      isDescriptionExpanded={isDescriptionExpanded}
      onToggleDescription={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
      onCopyLogs={handleCopyLogs}
      copyButtonText={copyButtonText}
      descriptionLogRef={descriptionContainerRef}
      isLoading={false}
      currentStepIndex={currentAnalysisStep}
      totalSteps={isCustomMode ? 1 : analysis.steps.length}
      isPlaying={false}
      onPrevStep={prevStep}
      onPlayPause={() => {}}
      onNextStep={nextStep}
      onReset={resetAnalysis}
      animationSpeed={1}
      onSpeedChange={() => {}}
      customControlsSlot={customControls}
      disableControls={isCustomMode}
    >
      <div className="space-y-6">
        {/* Code Examples Selection */}
        {!isCustomMode && (
          <div className="flex flex-wrap gap-2 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <span className="text-slate-300 text-sm font-medium mb-2 w-full">Select Code Example:</span>
            {Object.entries(CODE_EXAMPLES).map(([key, example]) => (
              <Button
                key={key}
                onClick={() => {
                  setSelectedExample(key)
                  setCurrentAnalysisStep(0)
                }}
                variant={selectedExample === key ? "default" : "outline"}
                className="text-xs px-3 py-1 h-auto"
              >
                {example.name}
              </Button>
            ))}
          </div>
        )}

        {/* Code Input/Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">
                {isCustomMode ? "Your Code" : "Example Code"}
              </h3>
            </div>
            
            {isCustomMode ? (
              <Textarea
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                placeholder="Enter your code here for analysis..."
                className="min-h-[300px] font-mono text-sm bg-slate-900 border-slate-700 text-slate-300"
              />
            ) : (
              <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
                <pre className="text-slate-300 text-sm overflow-x-auto">
                  <code>{displayCode}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Analysis Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Complexity Analysis</h3>
            
            {/* Complexity Results */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
                <span className="text-slate-300 font-medium">Time:</span>
                <Badge 
                  className="font-mono"
                  style={{ 
                    backgroundColor: COMPLEXITY_COLORS[isCustomMode && customAnalysis ? customAnalysis.timeComplexity as keyof typeof COMPLEXITY_COLORS : analysis.timeComplexity as keyof typeof COMPLEXITY_COLORS] || "#6b7280",
                    color: "white"
                  }}
                >
                  {isCustomMode && customAnalysis ? customAnalysis.timeComplexity : analysis.timeComplexity}
                </Badge>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
                <span className="text-slate-300 font-medium">Space:</span>
                <Badge 
                  className="font-mono"
                  style={{ 
                    backgroundColor: COMPLEXITY_COLORS[isCustomMode && customAnalysis ? customAnalysis.spaceComplexity as keyof typeof COMPLEXITY_COLORS : analysis.spaceComplexity as keyof typeof COMPLEXITY_COLORS] || "#6b7280",
                    color: "white"
                  }}
                >
                  {isCustomMode && customAnalysis ? customAnalysis.spaceComplexity : analysis.spaceComplexity}
                </Badge>
              </div>
            </div>

            {/* Step-by-step Analysis */}
            {!isCustomMode && (
              <div className="space-y-3">
                <h4 className="text-white font-medium">Analysis Steps:</h4>
                <div className="space-y-2">
                  {analysis.steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: currentAnalysisStep > index ? 1 : 0.3,
                        x: 0 
                      }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "p-3 rounded-lg border transition-all",
                        currentAnalysisStep > index 
                          ? "bg-emerald-900/20 border-emerald-500/30 text-emerald-100" 
                          : "bg-slate-800/50 border-slate-700 text-slate-400"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span className={cn(
                          "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                          currentAnalysisStep > index 
                            ? "bg-emerald-500 text-white" 
                            : "bg-slate-600 text-slate-300"
                        )}>
                          {index + 1}
                        </span>
                        <span className="text-sm">{step}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Code Analysis Hint */}
            {isCustomMode && !customCode.trim() && (
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <p className="text-slate-400 text-sm">
                  💡 <strong>Tip:</strong> Enter your code above and the calculator will provide
                  a basic complexity analysis. For detailed analysis, use the step-by-step examples.
                </p>
              </div>
            )}

            {/* Custom Code Simple Analysis */}
            {isCustomMode && customCode.trim() && customAnalysis && (
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <h4 className="text-white font-medium mb-2">Quick Analysis:</h4>
                <p className="text-slate-300 text-sm">
                  Based on basic pattern recognition, your code appears to have{" "}
                  <span className="font-mono text-emerald-400">{customAnalysis.timeComplexity}</span> time complexity
                  and <span className="font-mono text-emerald-400">{customAnalysis.spaceComplexity}</span> space complexity.
                </p>
                <p className="text-slate-400 text-xs mt-2">
                  Note: This is a simplified analysis. For precise results, manually apply the calculation steps.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </VisualizerLayout>
  )
} 