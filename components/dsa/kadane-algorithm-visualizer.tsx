"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, SkipForward, SkipBack } from "lucide-react"

interface ArrayElement {
  value: number
  index: number
  isCurrentlyProcessing: boolean
  isInMaxSubarray: boolean
  isSubarrayStart: boolean
  isSubarrayEnd: boolean
  currentSum: number
  maxSumSoFar: number
}

interface KadaneVisualizerProps {
  initialArray?: number[]
}

export default function KadaneAlgorithmVisualizer({ initialArray = [-2, 1, -3, 4, -1, 2, 1, -5, 4] }: KadaneVisualizerProps) {
  const [array, setArray] = useState<ArrayElement[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [speed, setSpeed] = useState(1000)
  
  // Algorithm state
  const [currentSum, setCurrentSum] = useState(0)
  const [maxSum, setMaxSum] = useState(0)
  const [maxStart, setMaxStart] = useState(0)
  const [maxEnd, setMaxEnd] = useState(0)
  const [tempStart, setTempStart] = useState(0)
  const [currentOperation, setCurrentOperation] = useState("")
  const [algorithmCompleted, setAlgorithmCompleted] = useState(false)

  // Initialize array
  useEffect(() => {
    resetVisualization()
  }, [initialArray.join(',')])

  const resetVisualization = () => {
    const initArray = initialArray.map((value, index) => ({
      value,
      index,
      isCurrentlyProcessing: false,
      isInMaxSubarray: false,
      isSubarrayStart: false,
      isSubarrayEnd: false,
      currentSum: 0,
      maxSumSoFar: 0
    }))
    
    setArray(initArray)
    setCurrentStep(0)
    setIsPlaying(false)
    setCurrentSum(initialArray[0] || 0)
    setMaxSum(initialArray[0] || 0)
    setMaxStart(0)
    setMaxEnd(0)
    setTempStart(0)
    setCurrentOperation("Ready to start Kadane's Algorithm")
    setAlgorithmCompleted(false)
  }

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const updateArrayDisplay = (
    processingIndex: number,
    currentSumValue: number,
    maxSumValue: number,
    startIdx: number,
    endIdx: number
  ) => {
    const newArray = array.map((item, index) => ({
      ...item,
      isCurrentlyProcessing: index === processingIndex,
      isInMaxSubarray: index >= startIdx && index <= endIdx,
      isSubarrayStart: index === startIdx,
      isSubarrayEnd: index === endIdx,
      currentSum: index <= processingIndex ? currentSumValue : 0,
      maxSumSoFar: index <= processingIndex ? maxSumValue : 0
    }))
    setArray(newArray)
  }

  const executeStep = async (step: number) => {
    if (step >= initialArray.length) {
      setAlgorithmCompleted(true)
      setCurrentOperation(`Algorithm completed! Maximum subarray sum: ${maxSum}`)
      updateArrayDisplay(-1, currentSum, maxSum, maxStart, maxEnd)
      return
    }

    const element = initialArray[step]
    let newCurrentSum: number
    let newMaxSum = maxSum
    let newMaxStart = maxStart
    let newMaxEnd = maxEnd
    let newTempStart = tempStart

    if (step === 0) {
      // Initialize with first element
      newCurrentSum = element
      newMaxSum = element
      newMaxStart = 0
      newMaxEnd = 0
      newTempStart = 0
      setCurrentOperation(`Initialize: current_sum = ${element}, max_sum = ${element}`)
    } else {
      // Kadane's core logic
      if (currentSum < 0) {
        newCurrentSum = element
        newTempStart = step
        setCurrentOperation(`current_sum was negative (${currentSum}), reset to ${element} and start new subarray at index ${step}`)
      } else {
        newCurrentSum = currentSum + element
        setCurrentOperation(`Extend subarray: current_sum = ${currentSum} + ${element} = ${newCurrentSum}`)
      }

      // Update maximum if current sum is better
      if (newCurrentSum > maxSum) {
        newMaxSum = newCurrentSum
        newMaxStart = newTempStart
        newMaxEnd = step
        setCurrentOperation(prev => prev + ` | New maximum found: ${newMaxSum} from index ${newMaxStart} to ${newMaxEnd}`)
      }
    }

    // Update state
    setCurrentSum(newCurrentSum)
    setMaxSum(newMaxSum)
    setMaxStart(newMaxStart)
    setMaxEnd(newMaxEnd)
    setTempStart(newTempStart)
    
    // Update visual display
    updateArrayDisplay(step, newCurrentSum, newMaxSum, newMaxStart, newMaxEnd)
  }

  const playAlgorithm = async () => {
    setIsPlaying(true)
    let playing = true
    
    for (let step = currentStep; step < initialArray.length && playing; step++) {
      setCurrentStep(step)
      await executeStep(step)
      await sleep(speed)
      
      // Check if still playing (user might have paused)
      playing = isPlaying
    }
    
    if (currentStep >= initialArray.length - 1) {
      setAlgorithmCompleted(true)
    }
    
    setIsPlaying(false)
  }

  const stepForward = () => {
    if (currentStep < initialArray.length) {
      executeStep(currentStep)
      setCurrentStep(currentStep + 1)
    }
  }

  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      recalculateToStep(currentStep - 1)
    }
  }

  const recalculateToStep = (targetStep: number) => {
    if (targetStep < 0) {
      resetVisualization()
      return
    }

    let newCurrentSum = initialArray[0]
    let newMaxSum = initialArray[0]
    let newMaxStart = 0
    let newMaxEnd = 0
    let newTempStart = 0

    for (let i = 1; i <= targetStep; i++) {
      const element = initialArray[i]
      
      if (newCurrentSum < 0) {
        newCurrentSum = element
        newTempStart = i
      } else {
        newCurrentSum += element
      }

      if (newCurrentSum > newMaxSum) {
        newMaxSum = newCurrentSum
        newMaxStart = newTempStart
        newMaxEnd = i
      }
    }

    setCurrentSum(newCurrentSum)
    setMaxSum(newMaxSum)
    setMaxStart(newMaxStart)
    setMaxEnd(newMaxEnd)
    setTempStart(newTempStart)
    
    updateArrayDisplay(targetStep, newCurrentSum, newMaxSum, newMaxStart, newMaxEnd)
    setCurrentOperation(`Recalculated to step ${targetStep + 1}`)
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false)
    } else {
      playAlgorithm()
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Kadane's Algorithm Visualizer</CardTitle>
          <CardDescription>
            Interactive step-by-step visualization of finding maximum subarray sum
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current State Display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-gray-600">Current Sum</div>
              <div className={`text-2xl font-bold ${currentSum >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {currentSum}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Maximum Sum</div>
              <div className="text-2xl font-bold text-blue-600">{maxSum}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Max Subarray</div>
              <div className="text-lg font-semibold text-purple-600">
                [{maxStart}, {maxEnd}]
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Step</div>
              <div className="text-lg font-semibold text-gray-700">
                {currentStep + 1} / {initialArray.length}
              </div>
            </div>
          </div>

          {/* Array Visualization */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Array Visualization</h3>
            <div className="flex flex-wrap gap-2 justify-center p-4 bg-white border rounded-lg">
              {array.map((element, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">Index: {element.index}</div>
                  <div
                    className={`
                      w-16 h-16 flex items-center justify-center rounded-lg border-2 font-bold text-sm
                      transition-all duration-500
                      ${element.isCurrentlyProcessing
                        ? 'border-yellow-500 bg-yellow-200 text-yellow-800 scale-110 shadow-lg'
                        : element.isInMaxSubarray
                        ? 'border-blue-500 bg-blue-100 text-blue-800'
                        : element.value >= 0
                        ? 'border-green-300 bg-green-50 text-green-700'
                        : 'border-red-300 bg-red-50 text-red-700'
                      }
                    `}
                  >
                    {element.value}
                  </div>
                  <div className="flex flex-col items-center mt-1 text-xs">
                    {element.isSubarrayStart && (
                      <Badge variant="outline" className="text-xs border-blue-500 text-blue-600">START</Badge>
                    )}
                    {element.isSubarrayEnd && (
                      <Badge variant="outline" className="text-xs border-blue-500 text-blue-600">END</Badge>
                    )}
                    {element.isCurrentlyProcessing && (
                      <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-600">CURRENT</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-yellow-500 bg-yellow-200 rounded mr-2"></div>
                Currently Processing
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-blue-500 bg-blue-100 rounded mr-2"></div>
                Maximum Subarray
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-green-300 bg-green-50 rounded mr-2"></div>
                Positive
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-red-300 bg-red-50 rounded mr-2"></div>
                Negative
              </div>
            </div>
          </div>

          {/* Current Operation */}
          {currentOperation && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="font-medium text-blue-800">Current Operation:</div>
              <div className="text-blue-700 mt-1">{currentOperation}</div>
            </div>
          )}

          {/* Algorithm Result */}
          {algorithmCompleted && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="font-medium text-green-800">Algorithm Completed!</div>
              <div className="text-green-700 mt-1">
                Maximum subarray sum: <strong>{maxSum}</strong><br/>
                Subarray: <strong>[{initialArray.slice(maxStart, maxEnd + 1).join(', ')}]</strong><br/>
                Indices: <strong>[{maxStart}, {maxEnd}]</strong>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Playback Controls */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Playback Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex space-x-2">
                  <Button 
                    onClick={stepBackward} 
                    disabled={currentStep <= 0}
                    size="sm"
                    variant="outline"
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button 
                    onClick={togglePlayPause} 
                    disabled={algorithmCompleted}
                    className="flex-1"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  <Button 
                    onClick={stepForward} 
                    disabled={currentStep >= initialArray.length}
                    size="sm"
                    variant="outline"
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>
                <Button 
                  onClick={resetVisualization} 
                  className="w-full"
                  variant="outline"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
              </CardContent>
            </Card>

            {/* Speed Control */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Animation Speed</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <select
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                  disabled={isPlaying}
                >
                  <option value={2000}>Slow (2s)</option>
                  <option value={1000}>Normal (1s)</option>
                  <option value={500}>Fast (0.5s)</option>
                  <option value={250}>Very Fast (0.25s)</option>
                </select>
                <div className="text-xs text-gray-500">
                  Speed affects automatic playback
                </div>
              </CardContent>
            </Card>

            {/* Custom Array Input */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Custom Array</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input
                  placeholder="Enter numbers (comma-separated)"
                  disabled={isPlaying}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const input = e.currentTarget.value
                      const newArray = input.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n))
                      if (newArray.length > 0) {
                        initialArray.splice(0, initialArray.length, ...newArray)
                        resetVisualization()
                        e.currentTarget.value = ''
                      }
                    }
                  }}
                />
                <div className="text-xs text-gray-500">
                  Press Enter to apply. Example: -2,1,-3,4,-1,2,1,-5,4
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Algorithm Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How Kadane's Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><strong>1.</strong> Initialize max_sum and current_sum with first element</div>
                  <div><strong>2.</strong> For each element, decide:</div>
                  <div className="ml-4">• Start new subarray (if current_sum &lt; 0)</div>
                  <div className="ml-4">• Extend existing subarray</div>
                  <div><strong>3.</strong> Update max_sum if current_sum is better</div>
                  <div><strong>4.</strong> Continue until end of array</div>
                  <div className="text-xs text-gray-600 mt-2">
                    <strong>Key Insight:</strong> Negative prefix sums are never helpful
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Complexity Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <Badge variant="secondary" className="mb-2">Time Complexity</Badge>
                    <div className="text-2xl font-bold text-green-600">O(n)</div>
                    <div className="text-sm text-gray-600">Single pass through array</div>
                  </div>
                  <div className="text-center">
                    <Badge variant="secondary" className="mb-2">Space Complexity</Badge>
                    <div className="text-2xl font-bold text-blue-600">O(1)</div>
                    <div className="text-sm text-gray-600">Only few variables used</div>
                  </div>
                  <div className="text-xs text-gray-600 text-center">
                    Optimal solution - can't do better than O(n)
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Step Progress */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / initialArray.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-center text-sm text-gray-600">
            Progress: {currentStep + 1} / {initialArray.length} steps
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 