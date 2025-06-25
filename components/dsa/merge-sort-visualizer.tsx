"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, StepForward, StepBack, RotateCcw, Shuffle, Copy, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import type { ArrayElement } from "@/lib/algorithms/bubble-sort-steps"
import { type MergeSortStep, generateMergeSortSteps } from "@/lib/algorithms/merge-sort-steps"
import { cn } from "@/lib/utils"

const INITIAL_ARRAY = [8, 3, 5, 1, 9, 2, 7, 4, 6]
const MAX_BAR_HEIGHT = 150 // Adjusted for potentially showing subarrays
const MIN_BAR_HEIGHT = 15

const generateRandomArray = (size = 9, maxVal = 10) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * maxVal) + 1)

export default function MergeSortVisualizer() {
  const [arrayData, setArrayData] = useState<number[]>(INITIAL_ARRAY)
  const [animationSteps, setAnimationSteps] = useState<MergeSortStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(1) // Merge sort can have many steps
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [copyButtonText, setCopyButtonText] = useState("Copy")
  const descriptionContainerRef = useRef<HTMLDivElement>(null)

  const maxValue = useMemo(
    () =>
      Math.max(
        ...arrayData,
        ...(animationSteps[currentStepIndex]?.leftSubarray?.map((e) => e.value) || []),
        ...(animationSteps[currentStepIndex]?.rightSubarray?.map((e) => e.value) || []),
        1,
      ),
    [arrayData, animationSteps, currentStepIndex],
  )

  useEffect(() => {
    setAnimationSteps(generateMergeSortSteps(arrayData))
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

  // ... (handlePrevStep, handleReset (use setArrayData([...INITIAL_ARRAY])), handlePlayPause, handleSpeedChange are similar to other visualizers) ...
  const handlePrevStep = () => {
    if (currentStepIndex > 0) setCurrentStepIndex((prev) => prev - 1)
  }
  const handleReset = () => {
    setArrayData([...INITIAL_ARRAY])
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }
  const handleRandomize = () => {
    setArrayData(generateRandomArray(arrayData.length, Math.max(...arrayData, 10)))
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

  const getBarColor = (
    index: number,
    step: MergeSortStep | undefined,
    elementValue?: number,
    isSubArrayBar = false,
  ) => {
    if (!step) return "bg-slate-700"
    if (step.sortedIndices?.includes(index) && !isSubArrayBar) return "bg-green-500"
    if (
      step.copyingBack &&
      step.highlightRange &&
      index >= step.highlightRange[0] &&
      index <= step.highlightRange[1] &&
      !isSubArrayBar
    )
      return "bg-emerald-500" // Copying back merged part
    if (step.isMerging) {
      if (step.highlightRange && index >= step.highlightRange[0] && index <= step.highlightRange[1] && !isSubArrayBar) {
        // Highlight element being placed from temp array
        if (
          step.tempMergedArray &&
          step.tempMergedArray.find((e) => e.id === step.array[index].id && e.value === step.array[index].value)
        ) {
          return "bg-sky-400"
        }
        return "bg-orange-400" // Range being merged
      }
    }
    if (step.highlightRange && index >= step.highlightRange[0] && index <= step.highlightRange[1] && !isSubArrayBar)
      return "bg-yellow-400" // Range being divided/focused

    // For subarray bars
    if (isSubArrayBar && elementValue) {
      // @ts-ignore (highlight is a custom prop I added in step generation)
      if (
        step.leftSubarray?.find((e) => e.value === elementValue && e.highlight) ||
        step.rightSubarray?.find((e) => e.value === elementValue && e.highlight)
      ) {
        return "bg-pink-500" // Highlighted element in subarray (being compared)
      }
      return "bg-slate-500"
    }

    return "bg-slate-600"
  }

  const renderSubArray = (subArray: ArrayElement[] | undefined, title: string) => {
    if (!subArray || subArray.length === 0) return null
    return (
      <div className="mt-2">
        <p className="text-xs text-center text-slate-400 mb-1">{title}</p>
        <div className="flex items-end justify-center space-x-1 p-1 bg-slate-700/50 rounded">
          {subArray.map((el, idx) => (
            <motion.div
              key={`${title}-${el.id}-${idx}`} // Ensure unique key for sub-array elements
              layout
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                height: getBarHeight(el.value),
                backgroundColor: getBarColor(idx, currentStep, el.value, true),
              }}
              className="w-6 rounded-t-sm flex items-start justify-center pt-0.5 text-xxs font-medium text-white"
            >
              {el.value}
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  const displayedDescriptions = useMemo(() => {
    return animationSteps.slice(0, currentStepIndex + 1).map((step, index) => ({
      id: `desc-mer-${index}-${step.description.slice(0, 10).replace(/\s/g, "_")}`,
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
        Loading Merge Sort...
      </div>
    )

  return (
    <div className="flex flex-col items-center p-6 space-y-4 bg-slate-800 text-white rounded-lg shadow-2xl w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-emerald-400">Merge Sort Visualization</h2>
      <div className="w-full space-y-1">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-medium text-slate-300">Algorithm Steps Log:</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyLogs}
              className="text-emerald-400 hover:text-emerald-300 px-2 py-1 h-auto"
            >
              <Copy className="mr-1.5 h-3.5 w-3.5" /> {copyButtonText}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="text-emerald-400 hover:text-emerald-300 px-2 py-1 h-auto"
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
                  index === displayedDescriptions.length - 1 ? "font-semibold text-emerald-300" : "text-slate-400",
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

      {currentStep.isMerging && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
          {renderSubArray(currentStep.leftSubarray, "Left Subarray")}
          {renderSubArray(currentStep.rightSubarray, "Right Subarray")}
          {renderSubArray(currentStep.tempMergedArray, "Merging Area")}
        </div>
      )}

      <div className="flex items-end justify-center w-full min-h-[180px] p-4 space-x-1 border border-slate-700 rounded-md bg-slate-900/50">
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
            className="w-8 rounded-t-md flex items-start justify-center pt-1 text-xs font-medium text-white shadow-md"
          >
            {element.value}
          </motion.div>
        ))}
      </div>

      {/* Controls: Similar to other visualizers, but with Randomize button */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 w-full pt-4 border-t border-slate-700">
        <Button
          onClick={handlePrevStep}
          disabled={currentStepIndex === 0 || isPlaying}
          variant="outline"
          className="text-emerald-400 border-emerald-400 hover:bg-emerald-400 hover:text-slate-900"
        >
          <StepBack className="mr-2 h-4 w-4" /> Prev
        </Button>
        <Button onClick={handlePlayPause} variant="default" className="bg-emerald-500 hover:bg-emerald-600">
          {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button
          onClick={handleNextStep}
          disabled={currentStepIndex === animationSteps.length - 1 || isPlaying}
          variant="outline"
          className="text-emerald-400 border-emerald-400 hover:bg-emerald-400 hover:text-slate-900"
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
            className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-emerald-400 [&>span:nth-child(2)>span]:bg-emerald-400"
          />
        </div>
      </div>
      <div className="text-xs text-slate-500 w-full text-center pt-2">
        Step {currentStepIndex + 1} of {animationSteps.length}
      </div>
    </div>
  )
}
