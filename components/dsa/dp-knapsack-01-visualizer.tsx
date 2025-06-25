"use client"
import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import {
  Play,
  Pause,
  StepForward,
  StepBack,
  RotateCcw,
  Calculator,
  Copy,
  Maximize2,
  Minimize2,
  ShoppingBag,
  Edit3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { type KnapsackItem, type KnapsackStep, generateKnapsack01Steps } from "@/lib/algorithms/dp-knapsack-01-steps"
import { cn } from "@/lib/utils"

const INITIAL_ITEMS: KnapsackItem[] = [
  { id: "item1", weight: 2, value: 3 },
  { id: "item2", weight: 3, value: 4 },
  { id: "item3", weight: 4, value: 5 },
  { id: "item4", weight: 5, value: 6 },
]
const INITIAL_CAPACITY = 7

export default function DPKnapsack01Visualizer() {
  const [items, setItems] = useState<KnapsackItem[]>(INITIAL_ITEMS)
  const [capacity, setCapacity] = useState<number>(INITIAL_CAPACITY)
  const [capacityInput, setCapacityInput] = useState<string>(INITIAL_CAPACITY.toString())
  // For editing items - simplified for now
  const [itemEditIndex, setItemEditIndex] = useState<number | null>(null)
  const [tempItemWeight, setTempItemWeight] = useState("")
  const [tempItemValue, setTempItemValue] = useState("")

  const [animationSteps, setAnimationSteps] = useState<KnapsackStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(0.7)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [copyButtonText, setCopyButtonText] = useState("Copy")
  const descriptionContainerRef = useRef<HTMLDivElement>(null)

  const currentStep = animationSteps[currentStepIndex]

  const displayedDescriptions = useMemo(() => {
    if (!currentStep) return []
    return animationSteps.slice(0, currentStepIndex + 1).map((step, index) => ({
      id: `desc-knap-${index}-${step.description.slice(0, 10).replace(/\s/g, "_")}`,
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

  const handleStartKnapsack = () => {
    const cap = Number.parseInt(capacityInput)
    if (isNaN(cap) || cap < 0) {
      alert("Please enter a valid positive capacity.")
      return
    }
    setCapacity(cap)
    const steps = generateKnapsack01Steps(items, cap)
    setAnimationSteps(steps)
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }

  const handleNextStep = useCallback(() => {
    if (currentStepIndex < animationSteps.length - 1) setCurrentStepIndex((prev) => prev + 1)
    else setIsPlaying(false)
  }, [currentStepIndex, animationSteps.length])

  const handlePrevStep = () => {
    if (currentStepIndex > 0) setCurrentStepIndex((prev) => prev - 1)
  }
  const handleReset = () => {
    setItems([...INITIAL_ITEMS])
    setCapacity(INITIAL_CAPACITY)
    setCapacityInput(INITIAL_CAPACITY.toString())
    setAnimationSteps([])
    setCurrentStepIndex(0)
    setIsPlaying(false)
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

  // Simplified item editing
  const handleEditItem = (index: number) => {
    setItemEditIndex(index)
    setTempItemWeight(items[index].weight.toString())
    setTempItemValue(items[index].value.toString())
  }
  const handleSaveItem = (index: number) => {
    const newItems = [...items]
    newItems[index] = {
      ...newItems[index],
      weight: Number.parseInt(tempItemWeight) || 0,
      value: Number.parseInt(tempItemValue) || 0,
    }
    setItems(newItems)
    setItemEditIndex(null)
  }

  if (!currentStep && animationSteps.length > 0)
    return (
      <div className="p-4 min-h-[500px] bg-slate-900 text-white rounded-lg shadow-xl flex items-center justify-center">
        Loading Knapsack...
      </div>
    )

  return (
    <div className="flex flex-col items-center p-6 space-y-4 bg-slate-800 text-white rounded-lg shadow-2xl w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-rose-400">0/1 Knapsack Problem (DP)</h2>

      <div className="flex flex-wrap items-center justify-center gap-2 w-full">
        <div className="flex items-center space-x-2">
          <label htmlFor="capacity" className="text-sm">
            Capacity:
          </label>
          <Input
            id="capacity"
            type="number"
            value={capacityInput}
            onChange={(e) => setCapacityInput(e.target.value)}
            placeholder="Capacity"
            className="bg-slate-700 border-slate-600 w-24"
            disabled={isPlaying || animationSteps.length > 0}
          />
        </div>
        <Button
          onClick={handleStartKnapsack}
          disabled={isPlaying || items.length === 0 || animationSteps.length > 0}
          className="bg-rose-500 hover:bg-rose-600"
        >
          <Calculator className="mr-2 h-4 w-4" /> Calculate Max Value
        </Button>
      </div>

      {/* Items Display/Edit - Simplified */}
      <div className="w-full p-2 border border-slate-700 rounded-md">
        <h4 className="text-sm font-semibold mb-1 text-slate-300">Items:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {items.map((item, index) => (
            <div key={item.id} className="bg-slate-700 p-2 rounded text-xs">
              {itemEditIndex === index ? (
                <>
                  <Input
                    value={tempItemWeight}
                    onChange={(e) => setTempItemWeight(e.target.value)}
                    placeholder="W"
                    className="h-6 text-xs mb-1"
                  />
                  <Input
                    value={tempItemValue}
                    onChange={(e) => setTempItemValue(e.target.value)}
                    placeholder="V"
                    className="h-6 text-xs mb-1"
                  />
                  <Button size="xs" onClick={() => handleSaveItem(index)}>
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <p>ID: {item.id}</p>
                  <p>
                    W: {item.weight}, V: {item.value}
                  </p>
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => handleEditItem(index)}
                    className="p-0 h-auto text-rose-300 hover:text-rose-200"
                  >
                    <Edit3 className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {animationSteps.length > 0 && currentStep && (
        <>
          <div className="w-full space-y-1">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-sm font-medium text-slate-300">Algorithm Steps Log:</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyLogs}
                  className="text-rose-400 hover:text-rose-300 px-2 py-1 h-auto"
                  disabled={displayedDescriptions.length === 0}
                >
                  <Copy className="mr-1.5 h-3.5 w-3.5" /> {copyButtonText}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="text-rose-400 hover:text-rose-300 px-2 py-1 h-auto"
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
                      index === displayedDescriptions.length - 1 ? "font-semibold text-rose-300" : "text-slate-400",
                    )}
                  >
                    {desc.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* DP Table Visualization */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-full text-xs border-collapse border border-slate-600">
              <thead>
                <tr>
                  <th className="border border-slate-600 p-1 bg-slate-700">Item (i) \ Cap (w)</th>
                  {Array.from({ length: capacity + 1 }, (_, w) => (
                    <th key={`cap-h-${w}`} className="border border-slate-600 p-1 bg-slate-700">
                      {w}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentStep.dpTable.map((row, i) => (
                  <tr key={`row-${i}`}>
                    <td className="border border-slate-600 p-1 bg-slate-700 text-center">
                      {i === 0 ? "0 (Base)" : `${i} (W:${items[i - 1]?.weight}, V:${items[i - 1]?.value})`}
                    </td>
                    {row.map((val, w) => (
                      <td
                        key={`cell-${i}-${w}`}
                        className={cn(
                          "border border-slate-600 p-1 text-center",
                          currentStep.phase === "filling_table" &&
                            i === (currentStep.currentItemIndex ?? -1) + 1 &&
                            w === currentStep.currentWeight
                            ? "bg-yellow-500 text-slate-900 font-bold"
                            : currentStep.phase === "backtracking" &&
                                i === (currentStep.currentItemIndex ?? -1) + 1 &&
                                w === currentStep.currentWeight
                              ? "bg-pink-500 text-slate-900"
                              : "bg-slate-800",
                        )}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {currentStep.phase === "complete" && currentStep.selectedItems && (
            <div className="w-full p-2 bg-slate-700 rounded mt-2">
              <h4 className="text-sm font-semibold text-rose-300">
                Selected Items for Max Value {currentStep.maxValue}:
              </h4>
              <ul className="list-disc list-inside text-xs">
                {currentStep.selectedItems.map((item) => (
                  <li key={item.id}>
                    {item.id} (W: {item.weight}, V: {item.value})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
      {animationSteps.length === 0 && (
        <p className="text-slate-400 italic">Configure items and capacity, then click Calculate.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 w-full pt-4 border-t border-slate-700">
        <Button
          onClick={handlePrevStep}
          disabled={currentStepIndex === 0 || isPlaying || animationSteps.length === 0}
          variant="outline"
          className="text-rose-400 border-rose-400 hover:bg-rose-400 hover:text-slate-900"
        >
          <StepBack className="mr-2 h-4 w-4" /> Prev
        </Button>
        <Button
          onClick={handlePlayPause}
          disabled={animationSteps.length === 0}
          variant="default"
          className="bg-rose-500 hover:bg-rose-600"
        >
          {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}{" "}
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button
          onClick={handleNextStep}
          disabled={currentStepIndex === animationSteps.length - 1 || isPlaying || animationSteps.length === 0}
          variant="outline"
          className="text-rose-400 border-rose-400 hover:bg-rose-400 hover:text-slate-900"
        >
          Next <StepForward className="ml-2 h-4 w-4" />
        </Button>
        <Button
          onClick={() => {
            setItems(INITIAL_ITEMS)
            setCapacityInput(INITIAL_CAPACITY.toString())
          }}
          variant="outline"
          className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-slate-900"
          disabled={isPlaying}
        >
          <ShoppingBag className="mr-2 h-4 w-4" /> Reset Items
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="text-amber-400 border-amber-400 hover:bg-amber-400 hover:text-slate-900"
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Reset All
        </Button>
        <div className="flex flex-col items-center space-y-1 col-span-2 sm:col-span-3 md:col-span-1">
          <span className="text-xs text-slate-400">Speed: {animationSpeed.toFixed(1)}s</span>
          <Slider
            min={0.1}
            max={2.0}
            step={0.1}
            defaultValue={[animationSpeed]}
            onValueChange={handleSpeedChange}
            disabled={isPlaying}
            className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-rose-400 [&>span:nth-child(2)>span]:bg-rose-400"
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
