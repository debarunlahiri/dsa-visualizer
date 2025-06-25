"use client"
import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Binary, ListOrdered, ListTree, ListEnd } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { TreeNodeData } from "@/lib/algorithms/bst-node"
import {
  type BSTStep,
  generateBSTInsertSteps,
  generateBSTInorderTraversalSteps,
  generateBSTPreorderTraversalSteps,
  generateBSTPostorderTraversalSteps,
} from "@/lib/algorithms/bst-steps"
import { VisualizerLayout } from "./visualizer-layout" // Import the new layout
import type { JSX } from "react/jsx-runtime" // Declare JSX variable

const NODE_RADIUS = 20
const LEVEL_HEIGHT = 70
const HORIZONTAL_SPACING_FACTOR = 60

interface PositionedNode extends TreeNodeData {
  x: number
  y: number
  parentX?: number
  parentY?: number
}

function assignPositions(
  node: TreeNodeData | null,
  x = 350, // Default SVG width / 2
  y = 50,
  level = 0,
  parentX?: number,
  parentY?: number,
  windowWidth = 700, // Pass SVG width to adjust initial x
): PositionedNode | null {
  if (!node) return null

  const initialX = windowWidth / 2 // Center the root node

  const positionedNode: PositionedNode = {
    ...JSON.parse(JSON.stringify(node)),
    x: level === 0 ? initialX : x, // Use initialX for root
    y,
    parentX,
    parentY,
  }

  const horizontalOffset = Math.max(20, HORIZONTAL_SPACING_FACTOR * (1.5 / (level + 1.5)))

  if (node.left) {
    positionedNode.left = assignPositions(
      node.left,
      (level === 0 ? initialX : x) - horizontalOffset,
      y + LEVEL_HEIGHT,
      level + 1,
      level === 0 ? initialX : x,
      y,
      windowWidth,
    )
  }
  if (node.right) {
    positionedNode.right = assignPositions(
      node.right,
      (level === 0 ? initialX : x) + horizontalOffset,
      y + LEVEL_HEIGHT,
      level + 1,
      level === 0 ? initialX : x,
      y,
      windowWidth,
    )
  }
  return positionedNode
}

export default function BSTVisualizer() {
  const [treeRoot, setTreeRoot] = useState<TreeNodeData | null>(null)
  const [inputValue, setInputValue] = useState<string>("")
  const [animationSteps, setAnimationSteps] = useState<BSTStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [currentOperation, setCurrentOperation] = useState<"insert" | "inorder" | "preorder" | "postorder" | null>(null)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [copyButtonText, setCopyButtonText] = useState("Copy")
  // Add new state for input error
  const [inputError, setInputError] = useState<string | null>(null)

  const descriptionContainerRef = useRef<HTMLDivElement>(null)
  const svgContainerRef = useRef<SVGSVGElement>(null)
  const [svgDimensions, setSvgDimensions] = useState({ width: 700, height: 400 })

  const currentStep = animationSteps[currentStepIndex]
  // Recalculate positionedTreeRoot with current SVG width
  const positionedTreeRoot = useMemo(() => {
    return currentStep?.treeRoot
      ? assignPositions(currentStep.treeRoot, svgDimensions.width / 2, 50, 0, undefined, undefined, svgDimensions.width)
      : null
  }, [currentStep, svgDimensions.width])

  useEffect(() => {
    const updateSvgDimensions = () => {
      if (svgContainerRef.current?.parentElement) {
        const parentWidth = svgContainerRef.current.parentElement.offsetWidth
        // Ensure a minimum width, and make it responsive up to a point.
        const newWidth = Math.max(300, parentWidth > 0 ? parentWidth - 30 : 700) // Subtract some padding
        // Adjust height based on tree depth if possible, or keep fixed/aspect ratio
        const newHeight = Math.max(300, newWidth * 0.6)
        setSvgDimensions({ width: newWidth, height: newHeight })
      }
    }
    updateSvgDimensions()
    window.addEventListener("resize", updateSvgDimensions)
    return () => window.removeEventListener("resize", updateSvgDimensions)
  }, [])

  const displayedDescriptions = useMemo(() => {
    if (!currentStep) return []
    return animationSteps.slice(0, currentStepIndex + 1).map((step, index) => ({
      id: `desc-bst-${index}-${step.description.slice(0, 10).replace(/\s/g, "_")}`,
      text:
        step.description +
        ((currentOperation === "inorder" || currentOperation === "preorder" || currentOperation === "postorder") &&
        step.action === "traversedNode" &&
        step.traversalPath
          ? `\nPath: [${step.traversalPath.join(", ")}]`
          : ""),
      lineNumber: index + 1,
    }))
  }, [animationSteps, currentStepIndex, currentStep, currentOperation])

  useEffect(() => {
    if (descriptionContainerRef.current) {
      descriptionContainerRef.current.scrollTop = descriptionContainerRef.current.scrollHeight
    }
  }, [currentStepIndex, displayedDescriptions.length])

  const handleCopyLogs = async () => {
    const logsToCopy = displayedDescriptions.map((desc) => desc.text).join("\n")
    try {
      await navigator.clipboard.writeText(logsToCopy)
      setCopyButtonText("Copied!")
    } catch (err) {
      setCopyButtonText("Failed!")
    } finally {
      setTimeout(() => setCopyButtonText("Copy"), 2000)
    }
  }

  // Modify the onChange handler for the Input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    if (value === "") {
      setInputError("Node value cannot be empty.")
      return
    }
    const num = Number.parseInt(value)
    if (isNaN(num)) {
      setInputError("Please enter a valid number.")
    } else if (num < -999 || num > 9999) {
      // Example range for BST values
      setInputError("Value must be between -999 and 9999.")
    } else {
      setInputError(null)
    }
  }

  // Modify handleInsert
  const handleInsert = () => {
    if (inputError) return
    const value = Number.parseInt(inputValue)
    if (isNaN(value)) {
      // Should be caught by handleInputChange, but as a safeguard
      setInputError("Invalid node value.")
      return
    }
    setCurrentOperation("insert")
    const steps = generateBSTInsertSteps(treeRoot, value)
    setAnimationSteps(steps)
    setCurrentStepIndex(0)
    setIsPlaying(false)
    setInputValue("")
    setInputError(null) // Clear error after successful initiation
  }

  const handleInorderTraversal = () => {
    if (!treeRoot) return
    setCurrentOperation("inorder")
    const steps = generateBSTInorderTraversalSteps(treeRoot)
    setAnimationSteps(steps)
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }

  const handlePreorderTraversal = () => {
    if (!treeRoot) return
    setCurrentOperation("preorder")
    const steps = generateBSTPreorderTraversalSteps(treeRoot)
    setAnimationSteps(steps)
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }

  const handlePostorderTraversal = () => {
    if (!treeRoot) return
    setCurrentOperation("postorder")
    const steps = generateBSTPostorderTraversalSteps(treeRoot)
    setAnimationSteps(steps)
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }

  const applyStepToTree = (step: BSTStep) => {
    if (currentOperation === "insert") {
      if (step.action === "insert" || step.action === "startInsert" || step.action === "idle") {
        if (step.description.includes("complete") && step.treeRoot) {
          setTreeRoot(JSON.parse(JSON.stringify(step.treeRoot)))
        }
      }
    }
  }

  const handleNextStep = useCallback(() => {
    if (currentStepIndex < animationSteps.length - 1) {
      const nextStepIndex = currentStepIndex + 1
      setCurrentStepIndex(nextStepIndex)
      applyStepToTree(animationSteps[nextStepIndex])
    } else {
      setIsPlaying(false)
      if (currentOperation === "insert" && animationSteps[currentStepIndex]?.treeRoot) {
        setTreeRoot(JSON.parse(JSON.stringify(animationSteps[currentStepIndex].treeRoot)))
      }
    }
  }, [currentStepIndex, animationSteps, currentOperation])

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  const handleReset = () => {
    setTreeRoot(null)
    setAnimationSteps([])
    setCurrentStepIndex(0)
    setIsPlaying(false)
    setInputValue("")
    setCurrentOperation(null)
  }

  const handlePlayPause = () => {
    if (isPlaying) setIsPlaying(false)
    else {
      if (currentStepIndex === animationSteps.length - 1 && animationSteps.length > 0) {
        setCurrentStepIndex(0)
      }
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

  const renderNodesAndEdges = (node: PositionedNode | null): JSX.Element[] => {
    if (!node) return []
    const elements: JSX.Element[] = []

    if (node.parentX !== undefined && node.parentY !== undefined) {
      elements.push(
        <motion.line
          key={`edge-${node.id}`}
          x1={node.parentX}
          y1={node.parentY + NODE_RADIUS}
          x2={node.x}
          y2={node.y - NODE_RADIUS}
          stroke={
            currentStep?.currentNodeValue === node.value || currentStep?.traversalHighlightValue === node.value
              ? "#34d399" // emerald-400
              : "#4b5563" // gray-600
          }
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />,
      )
    }

    elements.push(
      <motion.g
        key={`node-group-${node.id}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, x: node.x - NODE_RADIUS, y: node.y - NODE_RADIUS }}
        transition={{ type: "spring", stiffness: 260, damping: 20, duration: 0.3 }}
      >
        <circle
          cx={NODE_RADIUS}
          cy={NODE_RADIUS}
          r={NODE_RADIUS}
          fill={
            node.isNew || currentStep?.insertedNodeValue === node.value
              ? "#60a5fa" // blue-400
              : currentStep?.currentNodeValue === node.value
                ? "#f59e0b" // amber-500
                : currentStep?.traversalHighlightValue === node.value
                  ? "#34d399" // emerald-400
                  : "#374151" // gray-700
          }
          stroke="#9ca3af" // gray-400
          strokeWidth="2"
        />
        <text x={NODE_RADIUS} y={NODE_RADIUS + 5} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
          {node.value}
        </text>
      </motion.g>,
    )

    if (node.left) elements.push(...renderNodesAndEdges(node.left as PositionedNode))
    if (node.right) elements.push(...renderNodesAndEdges(node.right as PositionedNode))
    return elements
  }

  const topControls = (
    <>
      <div className="flex flex-col">
        <Input
          type="text" // Changed to text
          value={inputValue}
          onChange={handleInputChange} // Use the new handler
          placeholder="Node value"
          className={`bg-slate-700 border-slate-600 w-28 sm:w-32 text-xs sm:text-sm h-8 sm:h-9 ${inputError ? "border-red-500" : ""}`}
          disabled={isPlaying}
          aria-invalid={!!inputError}
          aria-describedby="node-value-error"
        />
        {inputError && (
          <p id="node-value-error" className="text-red-500 text-xs mt-1">
            {inputError}
          </p>
        )}
      </div>
      <Button
        onClick={handleInsert}
        disabled={isPlaying || !!inputError || inputValue === ""} // Disable if error or empty
        className="bg-emerald-500 hover:bg-emerald-600 text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
      >
        <Binary className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Insert
      </Button>
      <Button
        onClick={handleInorderTraversal}
        disabled={isPlaying || !treeRoot}
        variant="outline"
        className="text-green-400 border-green-400 hover:bg-green-400 hover:text-slate-900 text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
      >
        <ListOrdered className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Inorder
      </Button>
      <Button
        onClick={handlePreorderTraversal}
        disabled={isPlaying || !treeRoot}
        variant="outline"
        className="text-green-400 border-green-400 hover:bg-green-400 hover:text-slate-900 text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
      >
        <ListTree className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Preorder
      </Button>
      <Button
        onClick={handlePostorderTraversal}
        disabled={isPlaying || !treeRoot}
        variant="outline"
        className="text-green-400 border-green-400 hover:bg-green-400 hover:text-slate-900 text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
      >
        <ListEnd className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Postorder
      </Button>
    </>
  )

  const isLoading = !currentStep && animationSteps.length === 0 && treeRoot === null && inputValue === ""

  return (
    <VisualizerLayout
      title="Binary Search Tree (BST)"
      algorithmColor="emerald" // Changed from green to emerald for variety
      displayedDescriptions={displayedDescriptions}
      isDescriptionExpanded={isDescriptionExpanded}
      onToggleDescription={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
      onCopyLogs={handleCopyLogs}
      copyButtonText={copyButtonText}
      descriptionLogRef={descriptionContainerRef}
      isLoading={isLoading && currentOperation !== null}
      currentStepIndex={currentStepIndex}
      totalSteps={animationSteps.length}
      isPlaying={isPlaying}
      onPrevStep={handlePrevStep}
      onPlayPause={handlePlayPause}
      onNextStep={handleNextStep}
      onReset={handleReset}
      animationSpeed={animationSpeed}
      onSpeedChange={handleSpeedChange}
      topControlsSlot={topControls}
      disableControls={animationSteps.length === 0 && currentOperation === null}
    >
      <svg
        ref={svgContainerRef}
        width={svgDimensions.width}
        height={svgDimensions.height}
        className="bg-slate-900/50 rounded-md border border-slate-700 w-full"
        viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`} // Ensure viewBox is set for responsive scaling
      >
        <AnimatePresence>{positionedTreeRoot && renderNodesAndEdges(positionedTreeRoot)}</AnimatePresence>
        {!positionedTreeRoot && !isLoading && (
          <text x={svgDimensions.width / 2} y={svgDimensions.height / 2} textAnchor="middle" fill="gray" fontSize="16">
            Tree is empty. Insert nodes to begin.
          </text>
        )}
      </svg>
    </VisualizerLayout>
  )
}
