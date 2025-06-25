"use client"

import type React from "react"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, StepForward, StepBack, RotateCcw, Search, Copy, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input" // For target input
import { type BinarySearchStep, generateBinarySearchSteps } from "@/lib/algorithms/binary-search-steps"
import { cn } from "@/lib/utils"

const INITIAL_SORTED_ARRAY = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
const MAX_CELL_WIDTH = 60 // For displaying numbers

export default function BinarySearchVisualizer() {
  const [sortedArrayData, setSortedArrayData] = useState<number[]>(INITIAL_SORTED_ARRAY)
  const [targetValue, setTargetValue] = useState<number>(23)
  const [inputValue, setInputValue] = useState<string>("23")
  // Add new state for input error
  const [inputError, setInputError] = useState<string | null>(null)

  const [animationSteps, setAnimationSteps] = useState<BinarySearchStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(1.2)

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [copyButtonText, setCopyButtonText] = useState("Copy")
  const descriptionContainerRef = useRef<HTMLDivElement>(null)

  const displayedDescriptions = useMemo(() => {
    return animationSteps.slice(0, currentStepIndex + 1).map((step, index) => ({
      id: `desc-bin-${index}-${step.description.slice(0, 10).replace(/\s/g, "_")}`,
      text: step.description,
      lineNumber: index + 1,
    }))
  }, [animationSteps, currentStepIndex])

  useEffect(() => {
    // Ensure array is sorted if it could change (for now, it's fixed)
    // const sorted = [...arrayData].sort((a,b) => a-b);
    // if(JSON.stringify(sorted) !== JSON.stringify(arrayData)) setArrayData(sorted);
    setAnimationSteps(generateBinarySearchSteps(sortedArrayData, targetValue))
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }, [sortedArrayData, targetValue])

  const currentStep = animationSteps[currentStepIndex]

  const handleNextStep = useCallback(() => {
    if (currentStepIndex < animationSteps.length - 1) setCurrentStepIndex((prev) => prev + 1)
    else setIsPlaying(false)
  }, [currentStepIndex, animationSteps.length])
  const handlePrevStep = () => {
    if (currentStepIndex > 0) setCurrentStepIndex((prev) => prev - 1)
  }
  const handleReset = () => {
    setTargetValue(23)
    setInputValue("23")
    setCurrentStepIndex(0)
    setIsPlaying(false) /* Potentially reset array if it becomes dynamic */
  }
  const handlePlayPause = () => {
    if (isPlaying) setIsPlaying(false)
    else {
      if (currentStepIndex === animationSteps.length - 1) setCurrentStepIndex(0)
      setIsPlaying(true)
    }
  }
  const handleSpeedChange = (value: number[]) => setAnimationSpeed(value[0])

  // Modify handleTargetChange
  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    if (value === "") {
      setInputError("Target value cannot be empty.")
      return
    }
    const num = Number.parseInt(value)
    if (isNaN(num)) {
      setInputError("Please enter a valid number.")
    } else if (num < -999 || num > 999) {
      // Example range
      setInputError("Target must be between -999 and 999.")
    } else {
      setInputError(null)
    }
  }

  // Modify handleSearch
  const handleSearch = () => {
    if (inputError) return
    const num = Number.parseInt(inputValue)
    if (!isNaN(num)) {
      setTargetValue(num)
    } else {
      setInputError("Invalid target value. Please enter a number.")
    }
  }

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

  const getCellColor = (index: number, step: BinarySearchStep | undefined) => {
    if (!step) return "bg-slate-700"
    if (step.foundIndex === index) return "bg-green-500" // Target found
    if (index === step.mid) return "bg-yellow-500" // Middle element
    if (index >= step.low && index <= step.high) return "bg-sky-600" // Current search range
    return "bg-slate-500" // Discarded part
  }

  if (!currentStep)
    return (
      <div className="p-4 min-h-[400px] bg-slate-900 text-white rounded-lg shadow-xl flex items-center justify-center">
        Loading Binary Search...
      </div>
    )

  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-slate-800 text-white rounded-lg shadow-2xl w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-sky-400">Binary Search Visualization</h2>

      {/* Update the Input and Button in the topControlsSlot */}
      {/* Inside the topControlsSlot JSX: */}
      <div className="flex flex-col w-full sm:w-auto">
        <div className="flex items-center space-x-2">
          <Input
            type="text" // Changed to text
            value={inputValue}
            onChange={handleTargetChange}
            placeholder="Target value"
            className={`bg-slate-700 border-slate-600 text-white w-32 sm:w-36 ${inputError ? "border-red-500" : ""}`}
            disabled={isPlaying}
            aria-invalid={!!inputError}
            aria-describedby="bst-target-error"
          />
          <Button
            onClick={handleSearch}
            disabled={isPlaying || !!inputError || inputValue === ""}
            className="bg-sky-500 hover:bg-sky-600"
          >
            <Search className="mr-1 sm:mr-2 h-4 w-4" /> Search
          </Button>
        </div>
        {inputError && (
          <p id="bst-target-error" className="text-red-500 text-xs mt-1">
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
              className="text-sky-400 hover:text-sky-300 px-2 py-1 h-auto"
            >
              <Copy className="mr-1.5 h-3.5 w-3.5" /> {copyButtonText}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="text-sky-400 hover:text-sky-300 px-2 py-1 h-auto"
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
                  index === displayedDescriptions.length - 1 ? "font-semibold text-sky-300" : "text-slate-400",
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
      <div className="flex items-center justify-center w-full min-h-[100px] p-4 space-x-1 border border-slate-700 rounded-md bg-slate-900/50">
        {currentStep.array.map((element, index) => (
          <motion.div
            key={element.id}
            layout
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              backgroundColor: getCellColor(index, currentStep),
              borderColor: index === currentStep.low ? "white" : index === currentStep.high ? "white" : "transparent",
            }}
            className={cn(
              "h-16 rounded flex items-center justify-center text-lg font-medium text-white shadow-md border-2",
              `w-[${MAX_CELL_WIDTH}px]`, // Tailwind JIT might need explicit width or use style prop
            )}
            style={{ width: `${MAX_CELL_WIDTH}px` }}
          >
            {element.value}
            {(index === currentStep.low || index === currentStep.high) && (
              <span className="absolute -bottom-5 text-xs text-white">
                {index === currentStep.low && index === currentStep.high
                  ? "L/H"
                  : index === currentStep.low
                    ? "L"
                    : "H"}
              </span>
            )}
            {index === currentStep.mid && <span className="absolute -top-5 text-xs text-yellow-400">Mid</span>}
          </motion.div>
        ))}
      </div>
      {/* Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-4 border-t border-slate-700">
        <Button
          onClick={handlePrevStep}
          disabled={currentStepIndex === 0 || isPlaying}
          variant="outline"
          className="text-sky-400 border-sky-400 hover:bg-sky-400 hover:text-slate-900"
        >
          <StepBack className="mr-2 h-4 w-4" /> Prev
        </Button>
        <Button onClick={handlePlayPause} variant="default" className="bg-sky-500 hover:bg-sky-600">
          {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button
          onClick={handleNextStep}
          disabled={currentStepIndex === animationSteps.length - 1 || isPlaying}
          variant="outline"
          className="text-sky-400 border-sky-400 hover:bg-sky-400 hover:text-slate-900"
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
            max={2.5}
            step={0.1}
            defaultValue={[animationSpeed]}
            onValueChange={handleSpeedChange}
            disabled={isPlaying}
            className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-sky-400 [&>span:nth-child(2)>span]:bg-sky-400"
          />
        </div>
      </div>
      <div className="text-xs text-slate-500 w-full text-center pt-2">
        Step {currentStepIndex + 1} of {animationSteps.length}
      </div>
    </div>
  )
}
