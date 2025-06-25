"use client"
import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, StepForward, StepBack, RotateCcw, Search, Copy, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // For start node
import { type GraphNode, type GraphEdge, type BFSStep, generateBFSSteps } from "@/lib/algorithms/graph-bfs-steps"
import { cn } from "@/lib/utils"

const NODE_RADIUS = 25
const SVG_WIDTH = 700
const SVG_HEIGHT = 450

// Sample Graph Data (user could define this in a more advanced version)
const SAMPLE_NODES: GraphNode[] = [
  { id: "A", value: "A", x: 100, y: 100 },
  { id: "B", value: "B", x: 250, y: 70 },
  { id: "C", value: "C", x: 280, y: 200 },
  { id: "D", value: "D", x: 100, y: 250 },
  { id: "E", value: "E", x: 400, y: 150 },
  { id: "F", value: "F", x: 450, y: 280 },
]
const SAMPLE_EDGES: GraphEdge[] = [
  { from: "A", to: "B", id: "e1" },
  { from: "A", to: "D", id: "e2" },
  { from: "B", to: "C", id: "e3" },
  { from: "B", to: "E", id: "e4" },
  { from: "D", to: "C", id: "e5" },
  { from: "C", to: "E", id: "e6" },
  { from: "C", to: "F", id: "e7" },
  { from: "E", to: "F", id: "e8" },
] // Directed for simplicity, can be made undirected

export default function GraphBFSVisualizer() {
  const [graphNodes, setGraphNodes] = useState<GraphNode[]>(SAMPLE_NODES)
  const [graphEdges, setGraphEdges] = useState<GraphEdge[]>(SAMPLE_EDGES)
  const [startNodeId, setStartNodeId] = useState<string>(SAMPLE_NODES[0]?.id || "")

  const [animationSteps, setAnimationSteps] = useState<BFSStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(1.2)

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [copyButtonText, setCopyButtonText] = useState("Copy")
  const descriptionContainerRef = useRef<HTMLDivElement>(null)

  const currentStep = animationSteps[currentStepIndex]

  const displayedDescriptions = useMemo(() => {
    if (!currentStep) return []
    return animationSteps.slice(0, currentStepIndex + 1).map((step, index) => ({
      id: `desc-bfs-${index}-${step.description.slice(0, 10).replace(/\s/g, "_")}`,
      text: step.description + (step.queue.length > 0 ? `\nQueue: [${step.queue.join(", ")}]` : ""),
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
      console.error("Failed to copy logs: ", err)
      setCopyButtonText("Failed!")
      setTimeout(() => setCopyButtonText("Copy"), 2000)
    }
  }

  const handleStartBFS = () => {
    if (!startNodeId) return
    const steps = generateBFSSteps(graphNodes, graphEdges, startNodeId)
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
    setAnimationSteps([])
    setCurrentStepIndex(0)
    setIsPlaying(false)
    setStartNodeId(SAMPLE_NODES[0]?.id || "")
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

  const getNodeById = (id: string) => graphNodes.find((n) => n.id === id)

  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-slate-800 text-white rounded-lg shadow-2xl w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-400">Graph Traversal (BFS)</h2>
      <div className="flex flex-wrap items-center justify-center gap-2 w-full">
        <Select value={startNodeId} onValueChange={setStartNodeId} disabled={isPlaying || animationSteps.length > 0}>
          <SelectTrigger className="w-[180px] bg-slate-700 border-slate-600">
            <SelectValue placeholder="Select Start Node" />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 text-white border-slate-600">
            {graphNodes.map((node) => (
              <SelectItem key={node.id} value={node.id}>
                {node.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={handleStartBFS}
          disabled={isPlaying || !startNodeId || animationSteps.length > 0}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Search className="mr-2 h-4 w-4" /> Start BFS
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
              className="text-blue-400 hover:text-blue-300 px-2 py-1 h-auto"
              disabled={displayedDescriptions.length === 0}
            >
              <Copy className="mr-1.5 h-3.5 w-3.5" /> {copyButtonText}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="text-blue-400 hover:text-blue-300 px-2 py-1 h-auto"
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
                  index === displayedDescriptions.length - 1 ? "font-semibold text-blue-300" : "text-slate-400",
                )}
              >
                {desc.text}
              </p>
            </div>
          ))}
          {displayedDescriptions.length === 0 && (
            <p className="text-sm text-slate-500 italic">Log is empty. Start BFS.</p>
          )}
        </div>
      </div>

      <svg width={SVG_WIDTH} height={SVG_HEIGHT} className="bg-slate-900/50 rounded-md border border-slate-700">
        <AnimatePresence>
          {/* Edges */}
          {graphEdges.map((edge) => {
            const fromNode = getNodeById(edge.from)
            const toNode = getNodeById(edge.to)
            if (!fromNode || !toNode) return null

            const isTraversedEdge = currentStep?.path[toNode.id] === fromNode.id && currentStep?.visited.has(toNode.id)
            const isCurrentEdge =
              currentStep?.currentNodeId === fromNode.id && currentStep?.currentNeighborId === toNode.id

            return (
              <motion.line
                key={edge.id}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={
                  isCurrentEdge
                    ? "#fbbf24" // amber-400
                    : isTraversedEdge
                      ? "#34d399" // emerald-400
                      : "#4b5563" // gray-600
                }
                strokeWidth={isCurrentEdge || isTraversedEdge ? "3" : "2"}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                markerEnd="url(#arrowhead)"
              />
            )
          })}
          {/* Nodes */}
          {graphNodes.map((node) => (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, x: node.x - NODE_RADIUS, y: node.y - NODE_RADIUS }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <circle
                cx={NODE_RADIUS}
                cy={NODE_RADIUS}
                r={NODE_RADIUS}
                fill={
                  currentStep?.currentNodeId === node.id
                    ? "#f59e0b" // amber-500 (processing)
                    : currentStep?.queue.includes(node.id)
                      ? "#60a5fa" // blue-400 (in queue)
                      : currentStep?.visited.has(node.id)
                        ? "#10b981" // emerald-500 (visited)
                        : "#374151" // gray-700
                }
                stroke="#9ca3af"
                strokeWidth="2"
              />
              <text
                x={NODE_RADIUS}
                y={NODE_RADIUS + 5}
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
              >
                {node.value}
              </text>
            </motion.g>
          ))}
        </AnimatePresence>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" />
          </marker>
        </defs>
      </svg>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-4 border-t border-slate-700">
        <Button
          onClick={handlePrevStep}
          disabled={currentStepIndex === 0 || isPlaying}
          variant="outline"
          className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-slate-900"
        >
          <StepBack className="mr-2 h-4 w-4" /> Prev
        </Button>
        <Button onClick={handlePlayPause} variant="default" className="bg-blue-500 hover:bg-blue-600">
          {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}{" "}
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button
          onClick={handleNextStep}
          disabled={!currentStep || currentStepIndex === animationSteps.length - 1 || isPlaying}
          variant="outline"
          className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-slate-900"
        >
          Next <StepForward className="ml-2 h-4 w-4" />
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="text-amber-400 border-amber-400 hover:bg-amber-400 hover:text-slate-900"
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Reset BFS
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
            className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-blue-400 [&>span:nth-child(2)>span]:bg-blue-400"
          />
        </div>
      </div>
      {animationSteps.length > 0 && (
        <div className="text-xs text-slate-500 w-full text-center pt-1">
          Step {currentStepIndex + 1} of {animationSteps.length}
        </div>
      )}
    </div>
  )
}
