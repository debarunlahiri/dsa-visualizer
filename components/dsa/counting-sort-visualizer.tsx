"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, StepForward, StepBack, RotateCcw, Shuffle, Copy, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { type CountingSortStep, generateCountingSortSteps } from "@/lib/algorithms/counting-sort-steps"
import { cn } from "@/lib/utils"

const INITIAL_ARRAY = [4, 2, 2, 8, 3, 3, 1, 0, 7] // Includes 0 and duplicates
const MAX_BAR_HEIGHT = 180
const MIN_BAR_HEIGHT = 20
const CELL_WIDTH = 35

const generateRandomArray = (size = 9, maxVal = 9) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * (maxVal + 1)))

export default function CountingSortVisualizer() {
  const [arrayData, setArrayData] = useState<number[]>(INITIAL_ARRAY)
  const [animationSteps, setAnimationSteps] = useState<CountingSortStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(0.8)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [copyButtonText, setCopyButtonText] = useState("Copy")
  const descriptionContainerRef = useRef<HTMLDivElement>(null)

  const currentStep = animationSteps[currentStepIndex]
  const maxValueForBars = useMemo(
    () => Math.max(...arrayData, ...(currentStep?.outputArray?.map((e) => e.value) || []), 1),
    [arrayData, currentStep],
  )

  useEffect(() => {
    setAnimationSteps(generateCountingSortSteps(arrayData))
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }, [arrayData])

  const displayedDescriptions = useMemo(() => {
    if (!currentStep) return []
    return animationSteps.slice(0, currentStepIndex + 1).map((step, index) => ({
      id: `desc-csort-${index}-${step.description.slice(0, 10).replace(/\s/g, "_")}`,
      text: step.description,
      lineNumber: index + 1,
    }))
  }, [animationSteps, currentStepIndex, currentStep])

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
      setCopyButtonText("Failed!")
      setTimeout(() => setCopyButtonText("Copy"), 2000)
    }
  }

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
    setArrayData(generateRandomArray(arrayData.length, currentStep?.maxVal ?? 9))
  }

  const handlePlayPause = () => {
    if (isPlaying) setIsPlaying(false)
    else {
      if (currentStepIndex === animationSteps.length - 1) setCurrentStepIndex(0)
      setIsPlaying(true)
    }
  }
  const handleSpeedChange = (value: number[]) => setAnimationSpeed(value[0])

  const getBarHeight = (value: number) => (value / maxValueForBars) * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT) + MIN_BAR_HEIGHT

  const getCellColor = (index: number, phase: CountingSortStep["phase"], elementValue?: number) => {
    if (!currentStep) return "bg-slate-700"
    if (phase === "counting" && index === currentStep.currentIndex) return "bg-yellow-400" // Element being counted
    if (phase === "calculating_positions" && index === currentStep.currentIndex) return "bg-blue-400" // Count array index being updated
    if (phase === "building_output") {
      if (index === currentStep.currentIndex) return "bg-yellow-400" // Element from input array
      if (
        elementValue !== undefined &&
        elementValue === currentStep.currentElementValue &&
        index === currentStep.outputIndex
      )
        return "bg-pink-400" // Element just placed in output
    }
    if (
      phase === "complete" ||
      (currentStep.sortedIndices?.includes(index) && phase !== "counting" && phase !== "calculating_positions")
    )
      return "bg-green-500"
    return "bg-slate-600"
  }

  if (!currentStep)
    return (
      <div className="p-4 min-h-[500px] bg-slate-900 text-white rounded-lg shadow-xl flex items-center justify-center">
        Loading Counting Sort...
      </div>
    )

  return (
    <div className="flex flex-col items-center p-6 space-y-4 bg-slate-800 text-white rounded-lg shadow-2xl w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-lime-400">Counting Sort Visualization</h2>

      <div className="w-full space-y-1">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-medium text-slate-300">Algorithm Steps Log:</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyLogs}
              className="text-lime-400 hover:text-lime-300 px-2 py-1 h-auto"
              disabled={displayedDescriptions.length === 0}
            >
              <Copy className="mr-1.5 h-3.5 w-3.5" /> {copyButtonText}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="text-lime-400 hover:text-lime-300 px-2 py-1 h-auto"
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
                  index === displayedDescriptions.length - 1 ? "font-semibold text-lime-300" : "text-slate-400",
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

      {/* Input Array Visualization */}
      <div className="w-full">
        <p className="text-sm text-slate-400 mb-1">Input Array:</p>
        <div className="flex items-end justify-center w-full min-h-[100px] p-2 space-x-1 border border-slate-700 rounded-md bg-slate-900/50">
          {currentStep.array.map((element, index) => (
            <motion.div
              key={`input-${element.id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                height: getBarHeight(element.value),
                backgroundColor: getCellColor(index, currentStep.phase),
              }}
              className="rounded-t-md flex items-start justify-center pt-1 text-xs font-medium text-white shadow-md"
              style={{ width: `${CELL_WIDTH}px` }}
            >
              {element.value}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Count Array Visualization */}
      {currentStep.countArray && (
        <div className="w-full mt-2">
          <p className="text-sm text-slate-400 mb-1">
            {currentStep.phase === "calculating_positions" ||
            (currentStep.phase === "building_output" && currentStep.countArray.some((c) => c > arrayData.length))
              ? "Cumulative Counts / Positions Array:"
              : "Count Array (Frequencies):"}{" "}
            (Size: {currentStep.maxVal !== undefined ? currentStep.maxVal + 1 : "N/A"})
          </p>
          <div className="flex flex-wrap justify-center gap-1 p-2 border border-slate-700 rounded-md bg-slate-900/50">
            {currentStep.countArray.map((count, val) => (
              <div key={`count-${val}`} className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    backgroundColor:
                      (currentStep.phase === "counting" && val === currentStep.currentElementValue) ||
                      (currentStep.phase === "calculating_positions" && val === currentStep.currentIndex)
                        ? "bg-blue-400"
                        : "bg-slate-600",
                  }}
                  className="w-10 h-10 rounded flex items-center justify-center text-sm font-medium text-white shadow-md"
                >
                  {count}
                </motion.div>
                <span className="text-xxs text-slate-500 mt-0.5">{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Output Array Visualization */}
      {currentStep.outputArray &&
        (currentStep.phase === "building_output" ||
          currentStep.phase === "copying_back" ||
          currentStep.phase === "complete") && (
          <div className="w-full mt-2">
            <p className="text-sm text-slate-400 mb-1">Output Array:</p>
            <div className="flex items-end justify-center w-full min-h-[100px] p-2 space-x-1 border border-slate-700 rounded-md bg-slate-900/50">
              {currentStep.outputArray.map((element, index) => (
                <motion.div
                  key={element.id === "empty" ? `empty-${index}` : `output-${element.id}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: element.value === -1 ? 0.3 : 1,
                    height: element.value === -1 ? MIN_BAR_HEIGHT : getBarHeight(element.value),
                    backgroundColor: getCellColor(index, currentStep.phase, element.value),
                  }}
                  className="rounded-t-md flex items-start justify-center pt-1 text-xs font-medium text-white shadow-md"
                  style={{ width: `${CELL_WIDTH}px` }}
                >
                  {element.value === -1 ? "" : element.value}
                </motion.div>
              ))}
            </div>
          </div>
        )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 w-full pt-4 border-t border-slate-700">
        <Button
          onClick={handlePrevStep}
          disabled={currentStepIndex === 0 || isPlaying}
          variant="outline"
          className="text-lime-400 border-lime-400 hover:bg-lime-400 hover:text-slate-900"
        >
          <StepBack className="mr-2 h-4 w-4" /> Prev
        </Button>
        <Button onClick={handlePlayPause} variant="default" className="bg-lime-500 hover:bg-lime-600">
          {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}{" "}
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button
          onClick={handleNextStep}
          disabled={currentStepIndex === animationSteps.length - 1 || isPlaying}
          variant="outline"
          className="text-lime-400 border-lime-400 hover:bg-lime-400 hover:text-slate-900"
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
          className="text-amber-400 border-amber-400 hover:bg-amber-400 hover:text-slate-900"
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Reset
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
            className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-lime-400 [&>span:nth-child(2)>span]:bg-lime-400"
          />
        </div>
      </div>
      <div className="text-xs text-slate-500 w-full text-center pt-2">
        Step {currentStepIndex + 1} of {animationSteps.length}
      </div>
    </div>
  )
}
