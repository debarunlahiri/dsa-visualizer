"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Square, ArrowRight } from "lucide-react"

interface ArrayElement {
  value: number
  index: number
  isInWindow: boolean
  isWindowStart: boolean
  isWindowEnd: boolean
  isOptimal: boolean
}

interface SlidingWindowVisualizerProps {
  initialArray?: number[]
}

export default function SlidingWindowVisualizer({ initialArray = [2, 1, 3, 4, 1, 2, 1, 5, 4, 3] }: SlidingWindowVisualizerProps) {
  const [array, setArray] = useState<ArrayElement[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentOperation, setCurrentOperation] = useState<string>("")
  const [speed, setSpeed] = useState(1000)
  const [windowStart, setWindowStart] = useState(0)
  const [windowEnd, setWindowEnd] = useState(0)
  const [windowSize, setWindowSize] = useState<string>("3")
  const [targetSum, setTargetSum] = useState<string>("6")
  const [operationResult, setOperationResult] = useState<string>("")
  const [algorithm, setAlgorithm] = useState<string>("max-sum-fixed")
  const [currentSum, setCurrentSum] = useState(0)
  const [maxSum, setMaxSum] = useState(0)
  const [bestWindow, setBestWindow] = useState<{start: number, end: number}>({start: 0, end: 0})

  // Initialize array
  useEffect(() => {
    const initArray = initialArray.map((value, index) => ({
      value,
      index,
      isInWindow: false,
      isWindowStart: false,
      isWindowEnd: false,
      isOptimal: false
    }))
    setArray(initArray)
  }, [initialArray.join(',')])

  const resetVisualization = () => {
    setIsPlaying(false)
    setCurrentOperation("")
    setOperationResult("")
    setWindowStart(0)
    setWindowEnd(0)
    setCurrentSum(0)
    setMaxSum(0)
    setBestWindow({start: 0, end: 0})
    const resetArray = array.map(item => ({
      ...item,
      isInWindow: false,
      isWindowStart: false,
      isWindowEnd: false,
      isOptimal: false
    }))
    setArray(resetArray)
  }

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const updateWindow = (start: number, end: number, sum: number = 0, isOptimal: boolean = false) => {
    const newArray = array.map((item, index) => ({
      ...item,
      isInWindow: index >= start && index <= end,
      isWindowStart: index === start,
      isWindowEnd: index === end,
      isOptimal: isOptimal && index >= bestWindow.start && index <= bestWindow.end
    }))
    setArray(newArray)
    setWindowStart(start)
    setWindowEnd(end)
    setCurrentSum(sum)
  }

  // Maximum Sum Subarray of Fixed Size K
  const maxSumFixedWindow = async () => {
    const k = parseInt(windowSize)
    if (k <= 0 || k > array.length) return

    setIsPlaying(true)
    setCurrentOperation("Finding maximum sum subarray of fixed size")
    setOperationResult("")

    // Calculate sum of first window
    let windowSum = 0
    for (let i = 0; i < k; i++) {
      windowSum += array[i].value
    }
    
    let maxSum = windowSum
    let bestStart = 0
    let bestEnd = k - 1

    updateWindow(0, k - 1, windowSum)
    setCurrentOperation(`Initial window [0, ${k-1}]: sum = ${windowSum}`)
    await sleep(speed)

    // Slide the window
    for (let i = k; i < array.length; i++) {
      // Remove leftmost element, add rightmost element
      windowSum = windowSum - array[i - k].value + array[i].value
      
      updateWindow(i - k + 1, i, windowSum)
      setCurrentOperation(`Window [${i-k+1}, ${i}]: remove ${array[i-k].value}, add ${array[i].value}, sum = ${windowSum}`)
      
      if (windowSum > maxSum) {
        maxSum = windowSum
        bestStart = i - k + 1
        bestEnd = i
        setOperationResult(`New maximum: ${maxSum} at window [${bestStart}, ${bestEnd}]`)
      }
      
      await sleep(speed)
    }

    // Highlight the best window
    setBestWindow({start: bestStart, end: bestEnd})
    setMaxSum(maxSum)
    updateWindow(bestStart, bestEnd, maxSum, true)
    setOperationResult(`Maximum sum: ${maxSum} in window [${bestStart}, ${bestEnd}]`)

    setIsPlaying(false)
    setCurrentOperation("")
  }

  // Minimum Window with Sum >= Target (Variable Window)
  const minWindowWithSum = async () => {
    const target = parseInt(targetSum)
    if (target <= 0) return

    setIsPlaying(true)
    setCurrentOperation("Finding minimum window with sum >= target")
    setOperationResult("")

    let left = 0
    let right = 0
    let currentSum = 0
    let minLen = Infinity
    let bestStart = 0
    let bestEnd = 0

    while (right < array.length) {
      // Expand window by including arr[right]
      currentSum += array[right].value
      updateWindow(left, right, currentSum)
      setCurrentOperation(`Expand window: add ${array[right].value}, sum = ${currentSum} (target: ${target})`)
      await sleep(speed)

      // Try to shrink window from left while sum >= target
      while (currentSum >= target && left <= right) {
        if (right - left + 1 < minLen) {
          minLen = right - left + 1
          bestStart = left
          bestEnd = right
          setOperationResult(`New minimum window: length ${minLen} at [${bestStart}, ${bestEnd}]`)
        }

        // Remove leftmost element
        currentSum -= array[left].value
        left++
        
        if (left <= right) {
          updateWindow(left, right, currentSum)
          setCurrentOperation(`Shrink window: remove ${array[left-1].value}, sum = ${currentSum}`)
          await sleep(speed / 2)
        }
      }

      right++
    }

    if (minLen === Infinity) {
      setOperationResult("No window found with sum >= target")
      updateWindow(-1, -1, 0)
    } else {
      setBestWindow({start: bestStart, end: bestEnd})
      updateWindow(bestStart, bestEnd, 0, true)
      setOperationResult(`Minimum window: length ${minLen} at [${bestStart}, ${bestEnd}]`)
    }

    setIsPlaying(false)
    setCurrentOperation("")
  }

  // Longest Substring with At Most K Distinct Elements
  const longestSubstringKDistinct = async () => {
    const k = parseInt(windowSize)
    if (k <= 0) return

    setIsPlaying(true)
    setCurrentOperation("Finding longest substring with at most K distinct elements")
    setOperationResult("")

    let left = 0
    let right = 0
    let maxLen = 0
    let bestStart = 0
    let bestEnd = 0
    const charCount = new Map<number, number>()

    while (right < array.length) {
      // Add current element to window
      const rightVal = array[right].value
      charCount.set(rightVal, (charCount.get(rightVal) || 0) + 1)
      
      updateWindow(left, right)
      setCurrentOperation(`Add ${rightVal}: distinct elements = ${charCount.size} (max allowed: ${k})`)
      await sleep(speed)

      // Shrink window if we have more than k distinct elements
      while (charCount.size > k) {
        const leftVal = array[left].value
        charCount.set(leftVal, charCount.get(leftVal)! - 1)
        if (charCount.get(leftVal) === 0) {
          charCount.delete(leftVal)
        }
        left++
        
        updateWindow(left, right)
        setCurrentOperation(`Remove ${leftVal}: distinct elements = ${charCount.size}`)
        await sleep(speed / 2)
      }

      // Update maximum if current window is larger
      if (right - left + 1 > maxLen) {
        maxLen = right - left + 1
        bestStart = left
        bestEnd = right
        setOperationResult(`New maximum length: ${maxLen} at [${bestStart}, ${bestEnd}]`)
      }

      right++
    }

    setBestWindow({start: bestStart, end: bestEnd})
    updateWindow(bestStart, bestEnd, 0, true)
    setOperationResult(`Longest substring: length ${maxLen} at [${bestStart}, ${bestEnd}]`)

    setIsPlaying(false)
    setCurrentOperation("")
  }

  const runAlgorithm = () => {
    resetVisualization()
    setTimeout(() => {
      switch (algorithm) {
        case "max-sum-fixed":
          maxSumFixedWindow()
          break
        case "min-window-sum":
          minWindowWithSum()
          break
        case "longest-k-distinct":
          longestSubstringKDistinct()
          break
      }
    }, 100)
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sliding Window Technique Visualizer</CardTitle>
          <CardDescription>
            Interactive visualization of fixed and variable window algorithms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Array Visualization */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 justify-center p-4 bg-gray-50 rounded-lg">
              {array.map((element, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">Index: {element.index}</div>
                  <div
                    className={`
                      w-14 h-14 flex items-center justify-center rounded border-2 font-semibold text-sm relative
                      ${element.isOptimal
                        ? 'border-green-500 bg-green-100 text-green-800 shadow-lg'
                        : element.isInWindow 
                        ? 'border-blue-500 bg-blue-100 text-blue-800'
                        : 'border-gray-300 bg-white text-gray-700'
                      }
                      transition-all duration-300
                    `}
                  >
                    {element.value}
                    {element.isWindowStart && (
                      <div className="absolute -top-6 -left-2">
                        <Square className="w-3 h-3 text-blue-600 fill-current" />
                      </div>
                    )}
                    {element.isWindowEnd && (
                      <div className="absolute -top-6 -right-2">
                        <Square className="w-3 h-3 text-blue-600 fill-current" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Window Info */}
            <div className="flex justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-blue-500 bg-blue-100 rounded mr-2"></div>
                Current Window
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-green-500 bg-green-100 rounded mr-2"></div>
                Optimal Window
              </div>
              {currentSum > 0 && (
                <div className="font-semibold">
                  Current Sum: {currentSum}
                </div>
              )}
              {maxSum > 0 && (
                <div className="font-semibold text-green-600">
                  Best Sum: {maxSum}
                </div>
              )}
            </div>
          </div>

          {/* Operation Status */}
          {currentOperation && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <div className="font-medium text-blue-800">Current Operation:</div>
              <div className="text-blue-700">{currentOperation}</div>
            </div>
          )}

          {/* Operation Result */}
          {operationResult && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
              <div className="font-medium text-green-800">Result:</div>
              <div className="text-green-700">{operationResult}</div>
            </div>
          )}

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Algorithm Selection */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Algorithm</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <select
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value)}
                  className="w-full p-2 border rounded"
                  disabled={isPlaying}
                >
                  <option value="max-sum-fixed">Max Sum (Fixed Window)</option>
                  <option value="min-window-sum">Min Window Sum ≥ Target</option>
                  <option value="longest-k-distinct">Longest K Distinct</option>
                </select>
                <Button 
                  onClick={runAlgorithm} 
                  disabled={isPlaying}
                  className="w-full"
                >
                  {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                  Run Algorithm
                </Button>
              </CardContent>
            </Card>

            {/* Parameters */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {(algorithm === "max-sum-fixed" || algorithm === "longest-k-distinct") && (
                  <Input
                    placeholder="Window size (K)"
                    value={windowSize}
                    onChange={(e) => setWindowSize(e.target.value)}
                    disabled={isPlaying}
                  />
                )}
                {algorithm === "min-window-sum" && (
                  <Input
                    placeholder="Target sum"
                    value={targetSum}
                    onChange={(e) => setTargetSum(e.target.value)}
                    disabled={isPlaying}
                  />
                )}
                <div className="text-xs text-gray-500">
                  {algorithm === "max-sum-fixed" && "Size of sliding window"}
                  {algorithm === "min-window-sum" && "Minimum sum threshold"}
                  {algorithm === "longest-k-distinct" && "Max distinct elements"}
                </div>
              </CardContent>
            </Card>

            {/* Array Input */}
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
                        const initArray = newArray.map((value, index) => ({
                          value,
                          index,
                          isInWindow: false,
                          isWindowStart: false,
                          isWindowEnd: false,
                          isOptimal: false
                        }))
                        setArray(initArray)
                        resetVisualization()
                        e.currentTarget.value = ''
                      }
                    }
                  }}
                />
                <div className="text-xs text-gray-500">
                  Press Enter to apply. Example: 2,1,3,4,1,2
                </div>
              </CardContent>
            </Card>

            {/* Speed Control */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Animation Control</CardTitle>
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
                <Button 
                  onClick={resetVisualization} 
                  disabled={isPlaying}
                  className="w-full"
                  variant="outline"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Algorithm Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fixed Window</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><strong>Max Sum:</strong> Find maximum sum subarray of size K</div>
                  <div><strong>Process:</strong> Slide window of fixed size, track maximum</div>
                  <div><strong>Time:</strong> O(n), <strong>Space:</strong> O(1)</div>
                  <div className="text-xs text-gray-600 mt-2">
                    Window size remains constant throughout
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Variable Window</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><strong>Min Window Sum:</strong> Smallest window with sum ≥ target</div>
                  <div><strong>Process:</strong> Expand right, contract left when valid</div>
                  <div><strong>Time:</strong> O(n), <strong>Space:</strong> O(1)</div>
                  <div className="text-xs text-gray-600 mt-2">
                    Window size changes based on conditions
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Constraint Window</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><strong>K Distinct:</strong> Longest substring with ≤ K distinct elements</div>
                  <div><strong>Process:</strong> Maintain constraint while maximizing length</div>
                  <div><strong>Time:</strong> O(n), <strong>Space:</strong> O(k)</div>
                  <div className="text-xs text-gray-600 mt-2">
                    Uses auxiliary data structure for tracking
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Complexity Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Complexity Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">Fixed Window</Badge>
                  <div className="text-2xl font-bold text-green-600">O(n)</div>
                  <div className="text-sm text-gray-600">Single pass, constant work per element</div>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">Variable Window</Badge>
                  <div className="text-2xl font-bold text-green-600">O(n)</div>
                  <div className="text-sm text-gray-600">Each element visited at most twice</div>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">Brute Force</Badge>
                  <div className="text-2xl font-bold text-red-600">O(n²)</div>
                  <div className="text-sm text-gray-600">Check all possible subarrays</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <strong>Key Insight:</strong> Sliding window reduces complexity from O(n²) to O(n) by avoiding redundant calculations
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
} 