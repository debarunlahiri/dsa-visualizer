"use client"

import type React from "react"
import { Play, Pause, StepForward, StepBack, RotateCcw, Copy, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface DescriptionItem {
  id: string
  text: string
  lineNumber: number
}

interface VisualizerLayoutProps {
  title: string
  algorithmColor: string // e.g., "sky", "pink", "teal". Used for theming.
  displayedDescriptions: DescriptionItem[]
  isDescriptionExpanded: boolean
  onToggleDescription: () => void
  onCopyLogs: () => Promise<void>
  copyButtonText: string
  descriptionLogRef: React.RefObject<HTMLDivElement>
  isLoading?: boolean // To show a loading state for the main content

  children: React.ReactNode // For the main visualization area

  // Controls
  currentStepIndex: number
  totalSteps: number
  isPlaying: boolean
  onPrevStep: () => void
  onPlayPause: () => void
  onNextStep: () => void
  onReset: () => void
  animationSpeed: number
  onSpeedChange: (value: number[]) => void
  disableControls?: boolean // Overall disable for controls during loading etc.

  // Slot for algorithm-specific controls (e.g., Randomize button, Input fields)
  customControlsSlot?: React.ReactNode
  // Slot for controls that should appear before the main control row (e.g. search input)
  topControlsSlot?: React.ReactNode
}

export function VisualizerLayout({
  title,
  algorithmColor,
  displayedDescriptions,
  isDescriptionExpanded,
  onToggleDescription,
  onCopyLogs,
  copyButtonText,
  descriptionLogRef,
  isLoading,
  children,
  currentStepIndex,
  totalSteps,
  isPlaying,
  onPrevStep,
  onPlayPause,
  onNextStep,
  onReset,
  animationSpeed,
  onSpeedChange,
  disableControls,
  customControlsSlot,
  topControlsSlot,
}: VisualizerLayoutProps) {
  // Helper to generate theme-specific classes
  // Tailwind CSS needs full class names to be present in the source files.
  // So, we define them explicitly here.
  const colorVariants: Record<string, Record<string, string>> = {
    sky: {
      text: "text-sky-400",
      border: "border-sky-400",
      bg: "bg-sky-500",
      hoverBg: "hover:bg-sky-600",
      hoverOutlineBg: "hover:bg-sky-400",
      sliderTrack: "[&>span:first-child>span]:bg-sky-400",
      sliderThumb: "[&>span:nth-child(2)>span]:bg-sky-400",
      descriptionHighlight: "text-sky-300",
      hoverText: "hover:text-sky-300",
    },
    pink: {
      text: "text-pink-400",
      border: "border-pink-400",
      bg: "bg-pink-500",
      hoverBg: "hover:bg-pink-600",
      hoverOutlineBg: "hover:bg-pink-400",
      sliderTrack: "[&>span:first-child>span]:bg-pink-400",
      sliderThumb: "[&>span:nth-child(2)>span]:bg-pink-400",
      descriptionHighlight: "text-pink-300",
      hoverText: "hover:text-pink-300",
    },
    teal: {
      text: "text-teal-400",
      border: "border-teal-400",
      bg: "bg-teal-500",
      hoverBg: "hover:bg-teal-600",
      hoverOutlineBg: "hover:bg-teal-400",
      sliderTrack: "[&>span:first-child>span]:bg-teal-400",
      sliderThumb: "[&>span:nth-child(2)>span]:bg-teal-400",
      descriptionHighlight: "text-teal-300",
      hoverText: "hover:text-teal-300",
    },
    emerald: {
      text: "text-emerald-400",
      border: "border-emerald-400",
      bg: "bg-emerald-500",
      hoverBg: "hover:bg-emerald-600",
      hoverOutlineBg: "hover:bg-emerald-400",
      sliderTrack: "[&>span:first-child>span]:bg-emerald-400",
      sliderThumb: "[&>span:nth-child(2)>span]:bg-emerald-400",
      descriptionHighlight: "text-emerald-300",
      hoverText: "hover:text-emerald-300",
    },
    red: {
      text: "text-red-400",
      border: "border-red-400",
      bg: "bg-red-500",
      hoverBg: "hover:bg-red-600",
      hoverOutlineBg: "hover:bg-red-400",
      sliderTrack: "[&>span:first-child>span]:bg-red-400",
      sliderThumb: "[&>span:nth-child(2)>span]:bg-red-400",
      descriptionHighlight: "text-red-300",
      hoverText: "hover:text-red-300",
    },
    purple: {
      text: "text-purple-400",
      border: "border-purple-400",
      bg: "bg-purple-500",
      hoverBg: "hover:bg-purple-600",
      hoverOutlineBg: "hover:bg-purple-400",
      sliderTrack: "[&>span:first-child>span]:bg-purple-400",
      sliderThumb: "[&>span:nth-child(2)>span]:bg-purple-400",
      descriptionHighlight: "text-purple-300",
      hoverText: "hover:text-purple-300",
    },
    yellow: {
      text: "text-yellow-300", // Adjusted for better contrast on dark bg
      border: "border-yellow-300",
      bg: "bg-yellow-400", // Main bg for buttons
      hoverBg: "hover:bg-yellow-500",
      hoverOutlineBg: "hover:bg-yellow-300",
      sliderTrack: "[&>span:first-child>span]:bg-yellow-300",
      sliderThumb: "[&>span:nth-child(2)>span]:bg-yellow-300",
      descriptionHighlight: "text-yellow-200",
      hoverText: "hover:text-yellow-200",
    },
    lime: {
      text: "text-lime-400",
      border: "border-lime-400",
      bg: "bg-lime-500",
      hoverBg: "hover:bg-lime-600",
      hoverOutlineBg: "hover:bg-lime-400",
      sliderTrack: "[&>span:first-child>span]:bg-lime-400",
      sliderThumb: "[&>span:nth-child(2)>span]:bg-lime-400",
      descriptionHighlight: "text-lime-300",
      hoverText: "hover:text-lime-300",
    },
    orange: {
      text: "text-orange-400",
      border: "border-orange-400",
      bg: "bg-orange-500",
      hoverBg: "hover:bg-orange-600",
      hoverOutlineBg: "hover:bg-orange-400",
      sliderTrack: "[&>span:first-child>span]:bg-orange-400",
      sliderThumb: "[&>span:nth-child(2)>span]:bg-orange-400",
      descriptionHighlight: "text-orange-300",
      hoverText: "hover:text-orange-300",
    },
    fuchsia: {
      text: "text-fuchsia-400",
      border: "border-fuchsia-400",
      bg: "bg-fuchsia-500",
      hoverBg: "hover:bg-fuchsia-600",
      hoverOutlineBg: "hover:bg-fuchsia-400",
      sliderTrack: "[&>span:first-child>span]:bg-fuchsia-400",
      sliderThumb: "[&>span:nth-child(2)>span]:bg-fuchsia-400",
      descriptionHighlight: "text-fuchsia-300",
      hoverText: "hover:text-fuchsia-300",
    },
    indigo: {
      text: "text-indigo-400",
      border: "border-indigo-400",
      bg: "bg-indigo-500",
      hoverBg: "hover:bg-indigo-600",
      hoverOutlineBg: "hover:bg-indigo-400",
      sliderTrack: "[&>span:first-child>span]:bg-indigo-400",
      sliderThumb: "[&>span:nth-child(2)>span]:bg-indigo-400",
      descriptionHighlight: "text-indigo-300",
      hoverText: "hover:text-indigo-300",
    },
    rose: {
      text: "text-rose-400",
      border: "border-rose-400",
      bg: "bg-rose-500",
      hoverBg: "hover:bg-rose-600",
      hoverOutlineBg: "hover:bg-rose-400",
      sliderTrack: "[&>span:first-child>span]:bg-rose-400",
      sliderThumb: "[&>span:nth-child(2)>span]:bg-rose-400",
      descriptionHighlight: "text-rose-300",
      hoverText: "hover:text-rose-300",
    },
    // Add other colors as needed
  }

  const theme = colorVariants[algorithmColor] || colorVariants.sky // Default to sky if color not found

  return (
    <div className="flex flex-col items-center p-4 md:p-6 space-y-4 md:space-y-6 bg-slate-800 text-white rounded-lg shadow-2xl w-full max-w-5xl mx-auto">
      <h2 className={cn("text-2xl md:text-3xl font-bold", theme.text)}>{title}</h2>

      {topControlsSlot && (
        <div className="w-full flex flex-wrap justify-center items-center gap-2 md:gap-4">{topControlsSlot}</div>
      )}

      <div className="w-full space-y-1">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xs sm:text-sm font-medium text-slate-300">Algorithm Steps Log:</h3>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onCopyLogs}
              className={cn("px-2 py-1 h-auto text-xs sm:text-sm", theme.text, theme.hoverText)}
              disabled={displayedDescriptions.length === 0 || disableControls}
            >
              <Copy className="mr-1 h-3 w-3 sm:mr-1.5 sm:h-3.5 sm:w-3.5" /> {copyButtonText}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleDescription}
              className={cn("px-2 py-1 h-auto text-xs sm:text-sm", theme.text, theme.hoverText)}
              disabled={displayedDescriptions.length === 0 || disableControls}
            >
              {isDescriptionExpanded ? (
                <Minimize2 className="mr-1 h-3 w-3 sm:mr-1.5 sm:h-3.5 sm:w-3.5" />
              ) : (
                <Maximize2 className="mr-1 h-3 w-3 sm:mr-1.5 sm:h-3.5 sm:w-3.5" />
              )}
              {isDescriptionExpanded ? "Collapse" : "Expand"}
            </Button>
          </div>
        </div>
        <div
          ref={descriptionLogRef}
          className={cn(
            "w-full p-2 sm:p-3 bg-slate-900 rounded-md overflow-y-auto transition-all duration-300 ease-in-out text-xs sm:text-sm",
            isDescriptionExpanded ? "h-48 sm:h-64" : "h-24 sm:h-32",
          )}
        >
          {displayedDescriptions.map((desc, index) => (
            <div key={desc.id} className="flex items-start mb-0.5 sm:mb-1">
              <span className="mr-1.5 sm:mr-2 text-xxs sm:text-xs text-slate-500 w-6 sm:w-8 text-right select-none">
                {desc.lineNumber}.
              </span>
              <p
                className={cn(
                  "text-slate-300 text-left whitespace-pre-wrap flex-1",
                  index === displayedDescriptions.length - 1
                    ? cn("font-semibold", theme.descriptionHighlight)
                    : "text-slate-400",
                )}
              >
                {desc.text}
              </p>
            </div>
          ))}
          {displayedDescriptions.length === 0 && (
            <p className="text-slate-500 italic">Log is empty. Start the algorithm.</p>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center w-full min-h-[200px] md:min-h-[250px] p-4 border border-slate-700 rounded-md bg-slate-900/50">
          <p className="text-slate-400">Loading Visualization...</p>
        </div>
      ) : (
        <div className="w-full">{children}</div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 w-full pt-4 border-t border-slate-700">
        <Button
          onClick={onPrevStep}
          disabled={currentStepIndex === 0 || isPlaying || disableControls || totalSteps === 0}
          variant="outline"
          className={cn("text-xs sm:text-sm", theme.text, theme.border, theme.hoverOutlineBg, "hover:text-slate-900")}
        >
          <StepBack className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Prev
        </Button>
        <Button
          onClick={onPlayPause}
          disabled={disableControls || totalSteps === 0}
          variant="default"
          className={cn("text-xs sm:text-sm", theme.bg, theme.hoverBg)}
        >
          {isPlaying ? (
            <Pause className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
          ) : (
            <Play className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
          )}
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button
          onClick={onNextStep}
          disabled={currentStepIndex === totalSteps - 1 || isPlaying || disableControls || totalSteps === 0}
          variant="outline"
          className={cn("text-xs sm:text-sm", theme.text, theme.border, theme.hoverOutlineBg, "hover:text-slate-900")}
        >
          Next <StepForward className="ml-1 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>

        {customControlsSlot}

        <Button
          onClick={onReset}
          disabled={disableControls && !isPlaying} // Allow reset even if animation is playing if not fully disabled
          variant="outline"
          className={cn("text-xs sm:text-sm text-amber-400 border-amber-400 hover:bg-amber-400 hover:text-slate-900")}
        >
          <RotateCcw className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Reset
        </Button>
        <div className="flex flex-col items-center space-y-1 col-span-2 sm:col-span-3 md:col-span-2">
          <span className="text-xxs sm:text-xs text-slate-400">Speed: {animationSpeed.toFixed(1)}s</span>
          <Slider
            min={0.1}
            max={2.5} // Increased max speed range
            step={0.1}
            defaultValue={[animationSpeed]}
            onValueChange={onSpeedChange}
            disabled={isPlaying || disableControls}
            className={cn("w-full [&>span:first-child]:h-1", theme.sliderTrack, theme.sliderThumb)}
          />
        </div>
      </div>
      {totalSteps > 0 && (
        <div className="text-xs text-slate-500 w-full text-center pt-1">
          Step {currentStepIndex + 1} of {totalSteps}
        </div>
      )}
    </div>
  )
}
