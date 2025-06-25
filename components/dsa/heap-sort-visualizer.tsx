"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, StepForward, StepBack, RotateCcw, Shuffle, Copy, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { type HeapSortStep, generateHeapSortSteps } from "@/lib/algorithms/heap-sort-steps"
import { cn } from "@/lib/utils"

const INITIAL_ARRAY = [4, 10, 3, 5, 1, 9, 2, 8, 7, 6]
const MAX_BAR_HEIGHT = 200
const MIN_BAR_HEIGHT = 20

const generateRandomArray = (size = 10, maxVal = 12) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * maxVal) + 1)

export default function HeapSortVisualizer() {
  const [arrayData, setArrayData] = useState<number[]>(INITIAL_ARRAY)
  const [animationSteps, setAnimationSteps] = useState<HeapSortStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(0.8)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [copyButtonText, setCopyButtonText] = useState("Copy")
  const descriptionContainerRef = useRef<HTMLDivElement>(null)

  const maxValue = useMemo(() => Math.max(...arrayData, 1), [arrayData])

  useEffect(() => {
    setAnimationSteps(generateHeapSortSteps(arrayData))
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }, [arrayData])

  const currentStep = animationSteps[currentStepIndex]

  const handleNextStep = useCallback(() => {
    if (currentStepIndex < animationSteps.length - 1) setCurrentStepIndex((prev) => prev + 1)
    else setIsPlaying(false)
  }, [currentStepIndex, animationSteps.length])
  const handlePrevStep = () => {
    if (currentStepIndex > 0) setCurrentStepIndex((prev) => prev - 1)
  }
  const handleReset = () => {
    setArrayData([...INITIAL_ARRAY])
  }
  const handleRandomize = () => {
    setArrayData(generateRandomArray(arrayData.length, Math.max(...arrayData, 12)))
  }
  const handlePlayPause = () => {
    if (isPlaying) setIsPlaying(false)
    else {
      if (currentStepIndex === animationSteps.length - 1) setCurrentStepIndex(0)
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

  const getBarHeight = (value: number) => (value / maxValue) * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT) + MIN_BAR_HEIGHT

  const getBarColor = (index: number, step: HeapSortStep | undefined) => {
    if (!step) return "bg-slate-700"
    if (step.sortedIndices?.includes(index)) return "bg-green-500"
    if (step.swapping?.includes(index)) return "bg-orange-500"

    if (step.heapSize !== undefined && index < step.heapSize) {
      // Element is in current heap
      if (index === step.rootIndex) return "bg-red-500" // Root of current heapify operation
      if (index === step.largestIndex) return "bg-pink-500" // Largest element in heapify check
      if (index === step.leftIndex || index === step.rightIndex) return "bg-yellow-400" // Children in heapify check
      return "bg-purple-500" // General element in heap
    }
    return "bg-slate-600"
  }

  const displayedDescriptions = useMemo(() => {
    return animationSteps.slice(0, currentStepIndex + 1).map((step, index) => ({
      id: `desc-hea-${index}-${step.description.slice(0, 10).replace(/\s/g, "_")}`,
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

  if (!currentStep)
    return (
      <div className="p-4 min-h-[500px] bg-slate-900 text-white rounded-lg shadow-xl flex items-center justify-center">
        Loading Heap Sort...
      </div>
    )

  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-slate-800 text-white rounded-lg shadow-2xl w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-400">Heap Sort Visualization</h2>
      <div className="w-full space-y-1">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-medium text-slate-300">Algorithm Steps Log:</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyLogs}
              className="text-purple-400 hover:text-purple-300 px-2 py-1 h-auto"
            >
              <Copy className="mr-1.5 h-3.5 w-3.5" /> {copyButtonText}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="text-purple-400 hover:text-purple-300 px-2 py-1 h-auto"
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
                  index === displayedDescriptions.length - 1 ? "font-semibold text-purple-300" : "text-slate-400",
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
      <div className="flex items-end justify-center w-full min-h-[250px] p-4 space-x-1 border border-slate-700 rounded-md bg-slate-900/50 relative">
        {currentStep.array.map((element, index) => (
          <motion.div
            key={element.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              height: getBarHeight(element.value),
              backgroundColor: getBarColor(index, currentStep),
            }}
            className={cn(
              "w-10 rounded-t-md flex items-start justify-center pt-1 text-xs font-medium text-white shadow-md",
            )}
          >
            {element.value}
          </motion.div>
        ))}
        {/* Heap boundary indicator (optional) */}
        {currentStep.heapSize !== undefined &&
          currentStep.heapSize > 0 &&
          currentStep.heapSize < currentStep.array.length && (
            <div
              className="absolute top-0 bottom-0 border-r-2 border-dashed border-purple-400/70 pointer-events-none"
              style={{
                left: `${currentStep.heapSize * (40 + 4) - 2}px`, // (barWidth + gap)
              }}
            >
              <span className="absolute top-1/2 -right-3 text-xs text-purple-400/70 transform -translate-y-1/2 rotate-90 whitespace-nowrap">
                Heap End
              </span>
            </div>
          )}
      </div>
      {/* Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 w-full pt-4 border-t border-slate-700">
        <Button
          onClick={handlePrevStep}
          disabled={currentStepIndex === 0 || isPlaying}
          variant="outline"
          className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-slate-900"
        >
          {" "}
          <StepBack className="mr-2 h-4 w-4" /> Prev{" "}
        </Button>
        <Button onClick={handlePlayPause} variant="default" className="bg-purple-500 hover:bg-purple-600">
          {" "}
          {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}{" "}
          {isPlaying ? "Pause" : "Play"}{" "}
        </Button>
        <Button
          onClick={handleNextStep}
          disabled={currentStepIndex === animationSteps.length - 1 || isPlaying}
          variant="outline"
          className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-slate-900"
        >
          {" "}
          Next <StepForward className="ml-2 h-4 w-4" />{" "}
        </Button>
        <Button
          onClick={handleRandomize}
          variant="outline"
          className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-slate-900"
          disabled={isPlaying}
        >
          {" "}
          <Shuffle className="mr-2 h-4 w-4" /> Random{" "}
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="text-amber-400 border-amber-400 hover:bg-amber-400 hover:text-slate-900"
        >
          {" "}
          <RotateCcw className="mr-2 h-4 w-4" /> Reset{" "}
        </Button>
        <div className="flex flex-col items-center space-y-1 col-span-2 sm:col-span-3 md:col-span-1">
          <span className="text-xs text-slate-400">Speed: {animationSpeed.toFixed(1)}s</span>
          <Slider
            min={0.1}
            max={2}
            step={0.1}
            defaultValue={[animationSpeed]}
            onValueChange={handleSpeedChange}
            disabled={isPlaying}
            className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-purple-400 [&>span:nth-child(2)>span]:bg-purple-400"
          />
        </div>
      </div>
      <div className="text-xs text-slate-500 w-full text-center pt-2">
        {" "}
        Step {currentStepIndex + 1} of {animationSteps.length}{" "}
      </div>
    </div>
  )
}
