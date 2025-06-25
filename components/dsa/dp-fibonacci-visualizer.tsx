"use client"
import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, StepForward, StepBack, RotateCcw, Calculator, Copy, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { type FibonacciStep, generateFibonacciMemoizedSteps } from "@/lib/algorithms/dp-fibonacci-steps"
import { cn } from "@/lib/utils"

const MAX_N = 15 // Increased slightly, ensure fibonacci-steps can handle it or adjust.
// Original was 10. If generateFibonacciMemoizedSteps is slow for 15, reduce.

export default function DPFibonacciVisualizer() {
  const [nValue, setNValue] = useState<number>(5)
  const [inputValue, setInputValue] = useState<string>("5")
  const [inputError, setInputError] = useState<string | null>(null)

  const [animationSteps, setAnimationSteps] = useState<FibonacciStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(1)

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [copyButtonText, setCopyButtonText] = useState("Copy")
  const descriptionContainerRef = useRef<HTMLDivElement>(null)

  const currentStep = animationSteps[currentStepIndex]

  const displayedDescriptions = useMemo(() => {
    if (!currentStep) return []
    return animationSteps.slice(0, currentStepIndex + 1).map((step, index) => ({
      id: `desc-fib-${index}-${step.description.slice(0, 10).replace(/\s/g, "_")}`,
      text: step.description,
      lineNumber: index + 1,
    }))
  }, [animationSteps, currentStepIndex, currentStep])

  // Modify the onChange handler for the Input
  const handleNInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    if (value === "") {
      setInputError("N value cannot be empty.")
      return
    }
    const n = Number.parseInt(value)
    if (isNaN(n)) {
      setInputError("Please enter a valid number.")
    } else if (n < 0 || n > MAX_N) {
      setInputError(`N must be between 0 and ${MAX_N}.`)
    } else {
      setInputError(null)
    }
  }

  // Modify handleStartFib
  const handleStartFib = () => {
    if (inputError) return
    const n = Number.parseInt(inputValue)
    // Redundant check if handleNInputChange is comprehensive, but good safeguard
    if (isNaN(n) || n < 0 || n > MAX_N) {
      setInputError(`Please enter a number between 0 and ${MAX_N}.`)
      return
    }
    setNValue(n)
    const steps = generateFibonacciMemoizedSteps(n)
    setAnimationSteps(steps)
    setCurrentStepIndex(0)
    setIsPlaying(false)
    // Optionally clear input or keep it: setInputValue("");
    setInputError(null) // Clear error after successful initiation
  }

  const handleNextStep = useCallback(() => {
    if (currentStepIndex < animationSteps.length - 1) setCurrentStepIndex((prev) => prev + 1)
    else setIsPlaying(false)
  }, [currentStepIndex, animationSteps.length])
  const handlePrevStep = () => {
    if (currentStepIndex > 0) setCurrentStepIndex((prev) => prev - 1)
  }
  const handleReset = () => {
    setAnimationSteps([])
    setCurrentStepIndex(0)
    setIsPlaying(false)
    setInputValue("5")
    setNValue(5)
  }
  const handlePlayPause = () => {
    if (isPlaying) setIsPlaying(false)
    else {
      if (currentStepIndex === animationSteps.length - 1 && animationSteps.length > 0) setCurrentStepIndex(0)
      setIsPlaying(true)
    }
  }
  const handleSpeedChange = (value: number[]) => setAnimationSpeed(value[0])

  useEffect(() => {
    let timerId: NodeJS.Timeout
    if (isPlaying && currentStepIndex < animationSteps.length - 1) {
      timerId = setTimeout(handleNextStep, animationSpeed * 1000)
    }
    return () => clearTimeout(timerId)
  }, [isPlaying, currentStepIndex, animationSteps.length, handleNextStep, animationSpeed])

  useEffect(() => {
    if (descriptionContainerRef.current) {
      descriptionContainerRef.current.scrollTop = descriptionContainerRef.current.scrollHeight
    }
  }, [currentStepIndex])

  const handleCopyLogs = async () => {
    const logsToCopy = displayedDescriptions.map((desc) => desc.text).join("\n")
    try {
      await navigator.clipboard.writeText(logsToCopy)
      setCopyButtonText("Copied!")
      setTimeout(() => setCopyButtonText("Copy"), 2000)
    } catch (err) {
      console.error("Failed to copy logs: ", err)
      setCopyButtonText("Failed!")
      setTimeout(() => setCopyButtonText("Copy"), 2000)
    }
  }

  // Conceptual Call Stack visualization
  const renderCallStack = () => {
    if (!currentStep) return null
    const stack: { n: number; depth: number; isActive: boolean }[] = []
    // Reconstruct a simplified call stack view from steps
    // This is tricky because steps are linear. A true call stack needs more complex tracking.
    // For simplicity, we'll just show the current call and its depth.

    // A more accurate way would be to trace back through steps to find active calls.
    // For now, just use currentStep's info.
    if (currentStep.isActiveCall || currentStep.callStackDepth > 0) {
      for (let i = 0; i <= currentStepIndex; i++) {
        const step = animationSteps[i]
        if (step.description.startsWith(`Calling fib(${step.n})`)) {
          // Check if this call is still "active" by seeing if a return step for it has occurred
          let returned = false
          for (let j = i + 1; j <= currentStepIndex; j++) {
            if (
              animationSteps[j].n === step.n &&
              animationSteps[j].returnValue !== undefined &&
              animationSteps[j].callStackDepth === step.callStackDepth
            ) {
              returned = true
              break
            }
          }
          if (!returned) {
            // Avoid duplicates if multiple "Calling" steps for same (n, depth) before sub-calls
            if (!stack.find((s) => s.n === step.n && s.depth === step.callStackDepth)) {
              stack.push({
                n: step.n,
                depth: step.callStackDepth,
                isActive:
                  (i === currentStepIndex && currentStep.isActiveCall) ||
                  (step.n === currentStep.n &&
                    step.callStackDepth === currentStep.callStackDepth &&
                    currentStep.isActiveCall),
              })
            }
          }
        }
      }
      // Sort by depth to render stack-like
      stack.sort((a, b) => b.depth - a.depth)
    }

    return (
      <div className="w-full md:w-1/3 p-3 bg-slate-700 rounded">
        <h4 className="text-sm font-semibold mb-2 text-slate-300">Conceptual Call Stack:</h4>
        <AnimatePresence>
          {stack.map((call, idx) => (
            <motion.div
              key={`${call.n}-${call.depth}-${idx}`} // Ensure unique key
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={cn(
                "p-1.5 my-0.5 rounded text-xs",
                call.isActive ? "bg-amber-500 text-slate-900 font-semibold" : "bg-slate-600 text-slate-200",
              )}
              style={{ marginLeft: `${(call.depth - 1) * 10}px` }}
            >
              fib({call.n})
            </motion.div>
          ))}
        </AnimatePresence>
        {stack.length === 0 && <p className="text-xs text-slate-400 italic">Stack empty / Initial state</p>}
      </div>
    )
  }

  const renderCacheTable = () => {
    if (!currentStep || Object.keys(currentStep.cache).length === 0) {
      return (
        <div className="w-full md:w-2/3 p-3 bg-slate-700 rounded">
          <h4 className="text-sm font-semibold mb-2 text-slate-300">Memoization Cache:</h4>
          <p className="text-xs text-slate-400 italic">Cache is empty.</p>
        </div>
      )
    }
    return (
      <div className="w-full md:w-2/3 p-3 bg-slate-700 rounded">
        <h4 className="text-sm font-semibold mb-2 text-slate-300">Memoization Cache:</h4>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {Object.entries(currentStep.cache)
            .sort(([keyA], [keyB]) => Number.parseInt(keyA) - Number.parseInt(keyB)) // Sort by key
            .map(([key, value]) => (
              <motion.div
                key={key}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                  "p-2 rounded text-center",
                  currentStep.n === Number.parseInt(key) && currentStep.cacheHit
                    ? "bg-green-500 ring-2 ring-green-300"
                    : currentStep.n === Number.parseInt(key) && currentStep.cacheStore
                      ? "bg-blue-500 ring-2 ring-blue-300"
                      : "bg-slate-600",
                )}
              >
                <span className="block text-xs font-medium">fib({key})</span>
                <span className="block text-lg font-bold">{value}</span>
              </motion.div>
            ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-slate-800 text-white rounded-lg shadow-2xl w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-indigo-400">Dynamic Programming: Fibonacci (Memoization)</h2>
      <div className="flex flex-col w-full sm:w-auto">
        <div className="flex items-center space-x-2">
          <Input
            type="text" // Changed to text
            value={inputValue}
            onChange={handleNInputChange} // Use new handler
            placeholder={`N (0-${MAX_N})`}
            // min="0" // HTML5 min/max not as effective with type="text"
            // max={MAX_N.toString()}
            className={`bg-slate-700 border-slate-600 w-28 sm:w-32 ${inputError ? "border-red-500" : ""}`}
            disabled={isPlaying}
            aria-invalid={!!inputError}
            aria-describedby="n-value-error"
          />
          <Button
            onClick={handleStartFib}
            disabled={isPlaying || !!inputError || inputValue === ""}
            className="bg-indigo-500 hover:bg-indigo-600"
          >
            <Calculator className="mr-1 sm:mr-2 h-4 w-4" /> Calculate
          </Button>
        </div>
        {inputError && (
          <p id="n-value-error" className="text-red-500 text-xs mt-1">
            {inputError}
          </p>
        )}
      </div>

      <div className="w-full space-y-1">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-medium text-slate-300">Algorithm Steps Log:</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyLogs}
              className="text-indigo-400 hover:text-indigo-300 px-2 py-1 h-auto"
              disabled={displayedDescriptions.length === 0}
            >
              <Copy className="mr-1.5 h-3.5 w-3.5" /> {copyButtonText}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="text-indigo-400 hover:text-indigo-300 px-2 py-1 h-auto"
              disabled={displayedDescriptions.length === 0}
            >
              {isDescriptionExpanded ? (
                <Minimize2 className="mr-1.5 h-3.5 w-3.5" />
              ) : (
                <Maximize2 className="mr-1.5 h-3.5 w-3.5" />
              )}
              {isDescriptionExpanded ? "Collapse" : "Expand"}
            </Button>
          </div>
        </div>
        <div
          ref={descriptionContainerRef}
          className={cn(
            "w-full p-3 bg-slate-900 rounded-md overflow-y-auto transition-all duration-300 ease-in-out",
            isDescriptionExpanded ? "h-64" : "h-32",
          )}
        >
          {displayedDescriptions.map((desc, index) => (
            <div key={desc.id} className="flex items-start mb-1">
              <span className="mr-2 text-xs text-slate-500 w-8 text-right select-none">{desc.lineNumber}.</span>
              <p
                className={cn(
                  "text-sm text-slate-300 text-left whitespace-pre-wrap flex-1",
                  index === displayedDescriptions.length - 1 ? "font-semibold text-indigo-300" : "text-slate-400",
                )}
              >
                {desc.text}
              </p>
            </div>
          ))}
          {displayedDescriptions.length === 0 && (
            <p className="text-sm text-slate-500 italic">Log is empty. Start calculation.</p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        {renderCallStack()}
        {renderCacheTable()}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-4 border-t border-slate-700">
        <Button
          onClick={handlePrevStep}
          disabled={currentStepIndex === 0 || isPlaying}
          variant="outline"
          className="text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-slate-900"
        >
          <StepBack className="mr-2 h-4 w-4" /> Prev
        </Button>
        <Button onClick={handlePlayPause} variant="default" className="bg-indigo-500 hover:bg-indigo-600">
          {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}{" "}
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button
          onClick={handleNextStep}
          disabled={!currentStep || currentStepIndex === animationSteps.length - 1 || isPlaying}
          variant="outline"
          className="text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-slate-900"
        >
          Next <StepForward className="ml-2 h-4 w-4" />
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="text-amber-400 border-amber-400 hover:bg-amber-400 hover:text-slate-900"
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Reset
        </Button>
        <div className="flex flex-col items-center space-y-1 col-span-2 sm:col-span-4 md:col-span-2 md:col-start-3">
          <span className="text-xs text-slate-400">Speed: {animationSpeed.toFixed(1)}s</span>
          <Slider
            min={0.2}
            max={2.0}
            step={0.1}
            defaultValue={[animationSpeed]}
            onValueChange={handleSpeedChange}
            disabled={isPlaying}
            className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-indigo-400 [&>span:nth-child(2)>span]:bg-indigo-400"
          />
        </div>
      </div>
      {animationSteps.length > 0 && (
        <div className="text-xs text-slate-500 w-full text-center pt-1">
          Step {currentStepIndex + 1} of {animationSteps.length}
        </div>
      )}
    </div>
  )
}
