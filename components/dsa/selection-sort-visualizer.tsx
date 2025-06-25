"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { motion } from "framer-motion"
import { Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ArrayElement } from "@/lib/algorithms/bubble-sort-steps"
import { type SelectionSortStep, generateSelectionSortSteps } from "@/lib/algorithms/selection-sort-steps"
import { cn } from "@/lib/utils"
import { VisualizerLayout } from "./visualizer-layout"

const INITIAL_ARRAY = [6, 1, 7, 3, 5, 2, 4, 8]
const MAX_BAR_HEIGHT = 200
const MIN_BAR_HEIGHT = 20

export default function SelectionSortVisualizer() {
  const [arrayData, setArrayData] = useState<number[]>(INITIAL_ARRAY)
  const [animationSteps, setAnimationSteps] = useState<SelectionSortStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(0.8)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [copyButtonText, setCopyButtonText] = useState("Copy")

  const descriptionContainerRef = useRef<HTMLDivElement>(null)
  const maxValue = useMemo(() => Math.max(...arrayData, 1), [arrayData])

  const displayedDescriptions = useMemo(() => {
    return animationSteps.slice(0, currentStepIndex + 1).map((step, index) => ({
      id: `desc-sel-${index}-${step.description.slice(0, 10).replace(/\s/g, "_")}`,
      text: step.description,
      lineNumber: index + 1,
    }))
  }, [animationSteps, currentStepIndex])

  useEffect(() => {
    setAnimationSteps(generateSelectionSortSteps(arrayData))
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }, [arrayData])

  useEffect(() => {
    if (descriptionContainerRef.current) {
      descriptionContainerRef.current.scrollTop = descriptionContainerRef.current.scrollHeight
    }
  }, [currentStepIndex, displayedDescriptions.length])

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
  }

  const generateRandomArray = (size = 8, maxVal = 15) =>
    Array.from({ length: size }, () => Math.floor(Math.random() * maxVal) + 1)

  const handleRandomize = () => {
    setArrayData(generateRandomArray(arrayData.length, Math.max(...arrayData, 15)))
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false)
    } else {
      if (currentStepIndex === animationSteps.length - 1 && animationSteps.length > 0) {
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

  const getBarColor = (index: number, step: SelectionSortStep | undefined) => {
    if (!step) return "bg-slate-700"
    if (step.sortedIndices.includes(index)) return "bg-green-500"
    if (step.swapping?.includes(index)) return "bg-orange-500"
    if (step.swapped?.includes(index)) return "bg-sky-400"
    if (index === step.currentIndex) return "bg-purple-500"
    if (index === step.minIndex) return "bg-pink-500"
    if (index === step.comparingIndex) return "bg-yellow-400"
    return "bg-slate-600"
  }

  const handleCopyLogs = async () => {
    const logsToCopy = displayedDescriptions.map((desc) => desc.text).join("\n")
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

  const customControls = (
    <>
      <Button
        onClick={handleRandomize}
        variant="outline"
        className="text-xs sm:text-sm text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-slate-900"
        disabled={isPlaying || animationSteps.length === 0}
      >
        <Shuffle className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Random
      </Button>
      <div className="hidden md:block"></div> {/* Placeholder */}
    </>
  )

  const isLoading = !currentStep && animationSteps.length === 0 && arrayData.length > 0

  return (
    <VisualizerLayout
      title="Selection Sort Visualization"
      algorithmColor="pink"
      displayedDescriptions={displayedDescriptions}
      isDescriptionExpanded={isDescriptionExpanded}
      onToggleDescription={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
      onCopyLogs={handleCopyLogs}
      copyButtonText={copyButtonText}
      descriptionLogRef={descriptionContainerRef}
      isLoading={isLoading}
      currentStepIndex={currentStepIndex}
      totalSteps={animationSteps.length}
      isPlaying={isPlaying}
      onPrevStep={handlePrevStep}
      onPlayPause={handlePlayPause}
      onNextStep={handleNextStep}
      onReset={handleReset}
      animationSpeed={animationSpeed}
      onSpeedChange={handleSpeedChange}
      customControlsSlot={customControls}
      disableControls={animationSteps.length === 0}
    >
      <div className="flex items-end justify-center w-full min-h-[200px] md:min-h-[250px] p-2 md:p-4 space-x-0.5 md:space-x-1 border border-slate-700 rounded-md bg-slate-900/50">
        {currentStep?.array.map((element: ArrayElement, index: number) => (
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
              "w-8 md:w-10 rounded-t-md flex items-start justify-center pt-0.5 md:pt-1 text-xxs md:text-xs font-medium text-white shadow-md",
              index === currentStep.minIndex && !currentStep.swapping?.includes(index) ? "ring-1 ring-pink-300" : "",
              index === currentStep.currentIndex && !currentStep.swapping?.includes(index)
                ? "ring-1 ring-purple-300"
                : "",
            )}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {element.value}
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex flex-col items-center justify-center p-4 min-h-[250px] text-slate-400">
            Initializing visualization...
          </div>
        )}
      </div>
    </VisualizerLayout>
  )
}
