"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, StepForward, StepBack, RotateCcw, Shuffle, Copy, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import type { ArrayElement } from "@/lib/algorithms/bubble-sort-steps" // Re-use ArrayElement
import { type InsertionSortStep, generateInsertionSortSteps } from "@/lib/algorithms/insertion-sort-steps"
import { cn } from "@/lib/utils"

const INITIAL_ARRAY = [5, 3, 9, 1, 4, 6, 2, 8, 7] // Yet another initial array
const MAX_BAR_HEIGHT = 200
const MIN_BAR_HEIGHT = 20

export default function InsertionSortVisualizer() {
  const [arrayData, setArrayData] = useState<number[]>(INITIAL_ARRAY)
  const [animationSteps, setAnimationSteps] = useState<InsertionSortStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(0.75)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [copyButtonText, setCopyButtonText] = useState("Copy")
  const descriptionContainerRef = useRef<HTMLDivElement>(null)

  const maxValue = useMemo(() => Math.max(...arrayData, 1), [arrayData])

  useEffect(() => {
    setAnimationSteps(generateInsertionSortSteps(arrayData))
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }, [arrayData])

  const currentStep = animationSteps[currentStepIndex]

  const handleNextStep = useCallback(() => {
    if (currentStepIndex < animationSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    } else {
      setIsPlaying(false)
    }
  }, [currentStepIndex, animationSteps.length])

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  const handleReset = () => {
    setArrayData([...INITIAL_ARRAY])
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false)
    } else {
      if (currentStepIndex === animationSteps.length - 1) {
        setCurrentStepIndex(0)
      }
      setIsPlaying(true)
    }
  }

  const handleSpeedChange = (value: number[]) => {
    setAnimationSpeed(value[0])
  }

  useEffect(() => {
    let timerId: NodeJS.Timeout
    if (isPlaying && currentStepIndex < animationSteps.length - 1) {
      timerId = setTimeout(handleNextStep, animationSpeed * 1000)
    }
    return () => clearTimeout(timerId)
  }, [isPlaying, currentStepIndex, animationSteps.length, handleNextStep, animationSpeed])

  const getBarHeight = (value: number) => {
    return (value / maxValue) * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT) + MIN_BAR_HEIGHT
  }

  const getBarColor = (index: number, step: InsertionSortStep | undefined) => {
    if (!step) return "bg-slate-700"
    // Elements up to sortedBoundaryIndex are sorted (unless it's the key or being compared)
    if (
      index <= step.sortedBoundaryIndex &&
      index !== step.keyElementIndex &&
      index !== step.compareElementIndex &&
      index !== step.justInsertedIndex
    ) {
      if (
        step.passCompleted === undefined &&
        index === 0 &&
        step.sortedBoundaryIndex === 0 &&
        animationSteps.length > 0 &&
        currentStepIndex === 0
      ) {
        // Special case for initial step where only first element is "sorted"
        return "bg-teal-500"
      }
      if (step.passCompleted !== undefined || (step.sortedBoundaryIndex > 0 && index <= step.sortedBoundaryIndex)) {
        // If a pass is completed, or if sorted boundary is beyond first element
        if (step.justInsertedIndex === undefined || index <= step.sortedBoundaryIndex) return "bg-teal-500"
      }
    }
    if (step.justInsertedIndex === index) return "bg-emerald-400" // Key just inserted
    if (step.keyElementIndex === index) return "bg-purple-500" // The key element being placed
    if (step.compareElementIndex === index) return "bg-yellow-400" // Element in sorted part being compared
    if (step.isShifting) {
      // General shifting color, could be more specific
      // If an element is being shifted, it might be highlighted differently
      // For now, rely on keyElement and compareElementIndex for primary highlights
    }
    // Final check for all sorted elements at the very end
    if (step.description.toLowerCase().includes("complete") && step.sortedBoundaryIndex === arrayData.length - 1)
      return "bg-teal-500"

    return "bg-slate-600"
  }

  const generateRandomArray = (size = 9, maxVal = 10) =>
    Array.from({ length: size }, () => Math.floor(Math.random() * maxVal) + 1)

  const handleRandomize = () => {
    setArrayData(generateRandomArray(arrayData.length, Math.max(...arrayData, 10)))
  }

  const displayedDescriptions = useMemo(() => {
    return animationSteps.slice(0, currentStepIndex + 1).map((step, index) => ({
      id: `desc-ins-${index}-${step.description.slice(0, 10).replace(/\s/g, "_")}`,
      text: step.description,
      lineNumber: index + 1,
    }))
  }, [animationSteps, currentStepIndex])

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

  if (!currentStep) {
    return (
      <div className="flex flex-col items-center justify-center p-4 min-h-[500px] bg-slate-900 text-white rounded-lg shadow-xl">
        Loading Insertion Sort animation...
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-slate-800 text-white rounded-lg shadow-2xl w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-teal-400">Insertion Sort Visualization</h2>

      <div className="w-full space-y-1">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-medium text-slate-300">Algorithm Steps Log:</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyLogs}
              className="text-teal-400 hover:text-teal-300 px-2 py-1 h-auto"
            >
              <Copy className="mr-1.5 h-3.5 w-3.5" /> {copyButtonText}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="text-teal-400 hover:text-teal-300 px-2 py-1 h-auto"
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
                  index === displayedDescriptions.length - 1 ? "font-semibold text-teal-300" : "text-slate-400",
                )}
              >
                {desc.text}
              </p>
            </div>
          ))}
          {displayedDescriptions.length === 0 && (
            <p className="text-sm text-slate-500 italic">Log is empty. Start the algorithm.</p>
          )}
        </div>
      </div>

      <div className="relative flex items-end justify-center w-full min-h-[250px] p-4 space-x-1 border border-slate-700 rounded-md bg-slate-900/50">
        {currentStep.sortedBoundaryIndex >= 0 &&
          currentStep.sortedBoundaryIndex < currentStep.array.length - 1 &&
          !currentStep.description.toLowerCase().includes("complete") && (
            <div
              className="absolute top-0 bottom-0 flex flex-col items-center pointer-events-none"
              style={{
                // Calculate position: (number of sorted elements * (bar_width + gap_width)) - half_gap_width
                // Number of sorted elements = sortedBoundaryIndex + 1
                // Bar width = 40px, Gap width = 4px
                left: `${(currentStep.sortedBoundaryIndex + 1) * (40 + 4) - 2}px`, // Position at the end of the last sorted bar's gap
              }}
            >
              <span className="text-xs text-teal-400/70 whitespace-nowrap -mt-4">Sorted</span>
              <div className="flex-grow border-l-2 border-dashed border-teal-400/70 w-0"></div>
            </div>
          )}
        {currentStep.array.map((element: ArrayElement, index: number) => (
          <motion.div
            key={element.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              height: `${getBarHeight(element.value)}px`,
              backgroundColor: getBarColor(index, currentStep),
              transition: { duration: 0.3, type: "spring", stiffness: 200, damping: 20 },
            }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "w-10 rounded-t-md flex items-start justify-center pt-1 text-xs font-medium text-white shadow-md",
              index === currentStep.keyElementIndex ? "ring-2 ring-purple-400 transform -translate-y-1" : "",
              index === currentStep.compareElementIndex ? "ring-1 ring-yellow-300" : "",
              index === currentStep.justInsertedIndex ? "ring-2 ring-emerald-400" : "",
            )}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {element.value}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 w-full pt-4 border-t border-slate-700">
        <Button
          onClick={handlePrevStep}
          disabled={currentStepIndex === 0 || isPlaying}
          variant="outline"
          className="text-teal-400 border-teal-400 hover:bg-teal-400 hover:text-slate-900"
        >
          <StepBack className="mr-2 h-4 w-4" /> Prev
        </Button>
        <Button
          onClick={handlePlayPause}
          variant="default"
          className="bg-teal-500 hover:bg-teal-600 col-span-1 md:col-auto"
        >
          {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button
          onClick={handleNextStep}
          disabled={currentStepIndex === animationSteps.length - 1 || isPlaying}
          variant="outline"
          className="text-teal-400 border-teal-400 hover:bg-teal-400 hover:text-slate-900"
        >
          Next <StepForward className="ml-2 h-4 w-4" />
        </Button>
        <Button
          onClick={handleRandomize}
          variant="outline"
          className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-slate-900"
          disabled={isPlaying}
        >
          <Shuffle className="mr-2 h-4 w-4" /> Random
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="text-amber-400 border-amber-400 hover:bg-amber-400 hover:text-slate-900 col-span-1 md:col-auto"
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Reset
        </Button>
        <div className="flex flex-col items-center space-y-1 col-span-2 sm:col-span-3 md:col-span-1">
          <span className="text-xs text-slate-400">Speed: {animationSpeed.toFixed(2)}s</span>
          <Slider
            min={0.1}
            max={2}
            step={0.05}
            defaultValue={[animationSpeed]}
            onValueChange={handleSpeedChange}
            disabled={isPlaying}
            className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-teal-400 [&>span:nth-child(2)>span]:bg-teal-400"
          />
        </div>
      </div>
      <div className="text-xs text-slate-500 w-full text-center pt-2">
        Step {currentStepIndex + 1} of {animationSteps.length}
      </div>
    </div>
  )
}
