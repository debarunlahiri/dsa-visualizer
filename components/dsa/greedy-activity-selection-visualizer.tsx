"use client"
import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, StepForward, StepBack, RotateCcw, Copy, Maximize2, Minimize2, ListPlus, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import {
  type Activity,
  type ActivitySelectionStep,
  generateActivitySelectionSteps,
} from "@/lib/algorithms/greedy-activity-selection-steps"
import { cn } from "@/lib/utils"

const INITIAL_ACTIVITIES: Activity[] = [
  { id: "a1", name: "A1", start: 1, finish: 4 },
  { id: "a2", name: "A2", start: 3, finish: 5 },
  { id: "a3", name: "A3", start: 0, finish: 6 },
  { id: "a4", name: "A4", start: 5, finish: 7 },
  { id: "a5", name: "A5", start: 3, finish: 9 },
  { id: "a6", name: "A6", start: 5, finish: 9 },
  { id: "a7", name: "A7", start: 6, finish: 10 },
  { id: "a8", name: "A8", start: 8, finish: 11 },
  { id: "a9", name: "A9", start: 8, finish: 12 },
  { id: "a10", name: "A10", start: 2, finish: 14 },
  { id: "a11", name: "A11", start: 12, finish: 16 },
]

export default function GreedyActivitySelectionVisualizer() {
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES)
  const [animationSteps, setAnimationSteps] = useState<ActivitySelectionStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(1.0)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [copyButtonText, setCopyButtonText] = useState("Copy")
  const descriptionContainerRef = useRef<HTMLDivElement>(null)

  // Simplified editing state
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editStart, setEditStart] = useState("")
  const [editFinish, setEditFinish] = useState("")
  const [editName, setEditName] = useState("")

  const currentStep = animationSteps[currentStepIndex]

  useEffect(() => {
    const steps = generateActivitySelectionSteps(activities)
    setAnimationSteps(steps)
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }, [activities])

  const displayedDescriptions = useMemo(() => {
    if (!currentStep) return []
    return animationSteps.slice(0, currentStepIndex + 1).map((step, index) => ({
      id: `desc-act-${index}-${step.description.slice(0, 10).replace(/\s/g, "_")}`,
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
    setActivities([...INITIAL_ACTIVITIES])
    setIsEditing(false)
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

  const maxFinishTime = useMemo(() => Math.max(...activities.map((a) => a.finish), 1), [activities])

  const handleAddActivity = () => {
    const newId = `a${activities.length + 1}`
    setActivities([...activities, { id: newId, name: newId, start: 0, finish: 1 }])
  }

  const handleStartEdit = (index: number) => {
    setIsEditing(true)
    setEditIndex(index)
    setEditName(activities[index].name || activities[index].id)
    setEditStart(activities[index].start.toString())
    setEditFinish(activities[index].finish.toString())
  }

  const handleSaveEdit = () => {
    if (editIndex === null) return
    const s = Number.parseInt(editStart)
    const f = Number.parseInt(editFinish)
    if (isNaN(s) || isNaN(f) || s < 0 || f <= s) {
      alert("Invalid start/finish time.")
      return
    }
    const updatedActivities = [...activities]
    updatedActivities[editIndex] = { ...updatedActivities[editIndex], name: editName, start: s, finish: f }
    setActivities(updatedActivities)
    setIsEditing(false)
    setEditIndex(null)
  }

  if (!currentStep && animationSteps.length > 0)
    return (
      <div className="p-4 min-h-[500px] bg-slate-900 text-white rounded-lg shadow-xl flex items-center justify-center">
        Loading Activity Selection...
      </div>
    )

  return (
    <div className="flex flex-col items-center p-6 space-y-4 bg-slate-800 text-white rounded-lg shadow-2xl w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-teal-400">Greedy: Activity Selection</h2>

      {/* Edit Modal (Simplified) */}
      {isEditing && editIndex !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-700 p-4 rounded-lg space-y-2 w-full max-w-xs">
            <h3 className="text-lg font-semibold">Edit Activity {activities[editIndex].id}</h3>
            <Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Name" />
            <Input
              type="number"
              value={editStart}
              onChange={(e) => setEditStart(e.target.value)}
              placeholder="Start Time"
            />
            <Input
              type="number"
              value={editFinish}
              onChange={(e) => setEditFinish(e.target.value)}
              placeholder="Finish Time"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save</Button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full space-y-1">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-medium text-slate-300">Algorithm Steps Log:</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyLogs}
              className="text-teal-400 hover:text-teal-300 px-2 py-1 h-auto"
              disabled={displayedDescriptions.length === 0}
            >
              <Copy className="mr-1.5 h-3.5 w-3.5" /> {copyButtonText}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="text-teal-400 hover:text-teal-300 px-2 py-1 h-auto"
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
                  index === displayedDescriptions.length - 1 ? "font-semibold text-teal-300" : "text-slate-400",
                )}
              >
                {desc.text}
              </p>
            </div>
          ))}
          {displayedDescriptions.length === 0 && (
            <p className="text-sm text-slate-500 italic">Log is empty. Start the algorithm or add activities.</p>
          )}
        </div>
      </div>

      {/* Activities Visualization */}
      <div className="w-full p-2 border border-slate-700 rounded-md bg-slate-900/50 space-y-1.5 min-h-[200px] overflow-y-auto max-h-[300px]">
        <p className="text-xs text-slate-400">Timeline (Activities sorted by finish time for algorithm):</p>
        {currentStep?.activities.map((activity, index) => {
          const isSelected = currentStep.selectedActivities.some((sa) => sa.id === activity.id)
          const isBeingConsidered = currentStep.currentActivityIndex === index
          const widthPercentage = ((activity.finish - activity.start) / maxFinishTime) * 100
          const leftPercentage = (activity.start / maxFinishTime) * 100
          return (
            <div key={activity.id} className="relative h-8 my-1 group">
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn(
                  "absolute h-full rounded flex items-center px-2 text-xs font-medium",
                  isSelected
                    ? "bg-green-500 text-white"
                    : isBeingConsidered && currentStep.isCompatible === false
                      ? "bg-red-500 text-white"
                      : isBeingConsidered
                        ? "bg-yellow-400 text-slate-900"
                        : "bg-slate-600 text-slate-300",
                  "hover:ring-2 hover:ring-teal-300",
                )}
                style={{ width: `${widthPercentage}%`, left: `${leftPercentage}%` }}
              >
                {activity.name || activity.id} ({activity.start}-{activity.finish})
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => handleStartEdit(activities.findIndex((a) => a.id === activity.id))}
                  className="ml-auto p-0 h-auto text-inherit hover:text-teal-200 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit className="w-3 h-3" />
                </Button>
              </motion.div>
            </div>
          )
        })}
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
        <Button onClick={handlePlayPause} variant="default" className="bg-teal-500 hover:bg-teal-600">
          {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}{" "}
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
          onClick={handleAddActivity}
          variant="outline"
          className="text-sky-400 border-sky-400 hover:bg-sky-400 hover:text-slate-900"
          disabled={isPlaying}
        >
          <ListPlus className="mr-2 h-4 w-4" /> Add Activity
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="text-amber-400 border-amber-400 hover:bg-amber-400 hover:text-slate-900"
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Reset Activities
        </Button>
        <div className="flex flex-col items-center space-y-1 col-span-2 sm:col-span-3 md:col-span-1">
          <span className="text-xs text-slate-400">Speed: {animationSpeed.toFixed(1)}s</span>
          <Slider
            min={0.2}
            max={2.0}
            step={0.1}
            defaultValue={[animationSpeed]}
            onValueChange={handleSpeedChange}
            disabled={isPlaying}
            className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-teal-400 [&>span:nth-child(2)>span]:bg-teal-400"
          />
        </div>
      </div>
      {animationSteps.length > 0 && (
        <div className="text-xs text-slate-500 w-full text-center pt-2">
          Step {currentStepIndex + 1} of {animationSteps.length}
        </div>
      )}
    </div>
  )
}
