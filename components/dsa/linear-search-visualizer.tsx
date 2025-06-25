"use client"
import type React from "react"
import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { motion } from "framer-motion"
import {
  Play,
  Pause,
  StepForward,
  StepBack,
  RotateCcw,
  Search,
  Shuffle,
  Copy,
  Maximize2,
  Minimize2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { type LinearSearchStep, generateLinearSearchSteps } from "@/lib/algorithms/linear-search-steps"
import { cn } from "@/lib/utils"

const INITIAL_ARRAY = [15, 7, 22, 9, 30, 12, 18]
const MAX_CELL_WIDTH = 60

const generateRandomArray = (size = 7, maxVal = 30) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * maxVal) + 1)

export default function LinearSearchVisualizer() {
  const [arrayData, setArrayData] = useState<number[]>(INITIAL_ARRAY)
  const [targetValue, setTargetValue] = useState<number>(12)
  const [inputValue, setInputValue] = useState<string>("12")

  const [animationSteps, setAnimationSteps] = useState<LinearSearchStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(0.7)

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [copyButtonText, setCopyButtonText] = useState("Copy")
  const descriptionContainerRef = useRef<HTMLDivElement>(null)

  // Add new state for input error
  const [inputError, setInputError] = useState<string | null>(null)

  useEffect(() => {
    setAnimationSteps(generateLinearSearchSteps(arrayData, targetValue))
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }, [arrayData, targetValue])

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
    setTargetValue(12)
    setInputValue("12")
  }
  const handleRandomizeArray = () => {
    setArrayData(generateRandomArray(arrayData.length, Math.max(...arrayData, 30)))
  }
  const handlePlayPause = () => {
    if (isPlaying) setIsPlaying(false)
    else {
      if (currentStepIndex === animationSteps.length - 1) setCurrentStepIndex(0)
      setIsPlaying(true)
    }
  }
  const handleSpeedChange = (value: number[]) => setAnimationSpeed(value[0])
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

  const handleSearch = () => {
    if (inputError) return // Don't search if there's an error
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

  const getCellColor = (index: number, step: LinearSearchStep | undefined) => {
    if (!step) return "bg-slate-700"
    if (step.foundIndex === index) return "bg-green-500"
    if (step.currentIndex === index) return "bg-yellow-500"
    return "bg-slate-600"
  }

  const displayedDescriptions = useMemo(() => {
    return animationSteps.slice(0, currentStepIndex + 1).map((step, index) => ({
      id: `desc-lin-${index}-${step.description.slice(0, 10).replace(/\s/g, "_")}`,
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
      <div className="p-4 min-h-[400px] bg-slate-900 text-white rounded-lg shadow-xl flex items-center justify-center">
        Loading Linear Search...
      </div>
    )

  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-slate-800 text-white rounded-lg shadow-2xl w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-yellow-300">Linear Search Visualization</h2>
      <div className="flex items-center space-x-2 w-full max-w-md">
        <div className="flex flex-col w-full sm:w-auto">
          <div className="flex items-center space-x-2">
            <Input
              type="text" // Changed to text to allow intermediate invalid states
              value={inputValue}
              onChange={handleTargetChange}
              placeholder="Target"
              className={`bg-slate-700 border-slate-600 text-white w-24 sm:w-28 ${inputError ? "border-red-500" : ""}`}
              disabled={isPlaying}
              aria-invalid={!!inputError}
              aria-describedby="target-error"
            />
            <Button
              onClick={handleSearch}
              disabled={isPlaying || !!inputError || inputValue === ""} // Disable if error or empty
              className="bg-yellow-500 hover:bg-yellow-600 text-slate-900"
            >
              <Search className="mr-1 sm:mr-2 h-4 w-4" /> Search
            </Button>
          </div>
          {inputError && (
            <p id="target-error" className="text-red-500 text-xs mt-1">
              {inputError}
            </p>
          )}
        </div>
        <Button
          onClick={handleRandomizeArray}
          disabled={isPlaying}
          variant="outline"
          className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-slate-900"
        >
          <Shuffle className="mr-1 sm:mr-2 h-4 w-4" /> Array
        </Button>
      </div>
      <div className="w-full space-y-1">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-medium text-slate-300">Algorithm Steps Log:</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyLogs}
              className="text-yellow-300 hover:text-yellow-200 px-2 py-1 h-auto"
            >
              <Copy className="mr-1.5 h-3.5 w-3.5" /> {copyButtonText}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="text-yellow-300 hover:text-yellow-200 px-2 py-1 h-auto"
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
                  index === displayedDescriptions.length - 1 ? "font-semibold text-yellow-200" : "text-slate-400",
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
            animate={{ opacity: 1, backgroundColor: getCellColor(index, currentStep) }}
            className={cn(
              "h-16 rounded flex items-center justify-center text-lg font-medium text-white shadow-md border-2 border-transparent",
              `w-[${MAX_CELL_WIDTH}px]`,
            )}
            style={{ width: `${MAX_CELL_WIDTH}px` }}
          >
            {element.value}
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-4 border-t border-slate-700">
        <Button
          onClick={handlePrevStep}
          disabled={currentStepIndex === 0 || isPlaying}
          variant="outline"
          className="text-yellow-300 border-yellow-300 hover:bg-yellow-300 hover:text-slate-900"
        >
          {" "}
          <StepBack className="mr-2 h-4 w-4" /> Prev{" "}
        </Button>
        <Button
          onClick={handlePlayPause}
          variant="default"
          className="bg-yellow-400 hover:bg-yellow-500 text-slate-900"
        >
          {" "}
          {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}{" "}
          {isPlaying ? "Pause" : "Play"}{" "}
        </Button>
        <Button
          onClick={handleNextStep}
          disabled={currentStepIndex === animationSteps.length - 1 || isPlaying}
          variant="outline"
          className="text-yellow-300 border-yellow-300 hover:bg-yellow-300 hover:text-slate-900"
        >
          {" "}
          Next <StepForward className="ml-2 h-4 w-4" />{" "}
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="text-amber-400 border-amber-400 hover:bg-amber-400 hover:text-slate-900"
        >
          {" "}
          <RotateCcw className="mr-2 h-4 w-4" /> Reset{" "}
        </Button>
        <div className="flex flex-col items-center space-y-1 col-span-2 sm:col-span-4 md:col-span-2 md:col-start-3">
          <span className="text-xs text-slate-400">Speed: {animationSpeed.toFixed(1)}s</span>
          <Slider
            min={0.1}
            max={2}
            step={0.1}
            defaultValue={[animationSpeed]}
            onValueChange={handleSpeedChange}
            disabled={isPlaying}
            className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-yellow-300 [&>span:nth-child(2)>span]:bg-yellow-300"
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
