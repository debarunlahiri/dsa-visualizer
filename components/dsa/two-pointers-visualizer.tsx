"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, ArrowLeft, ArrowRight } from "lucide-react"

interface ArrayElement {
  value: number
  index: number
  isLeftPointer: boolean
  isRightPointer: boolean
  isTarget: boolean
  isProcessed: boolean
}

interface TwoPointersVisualizerProps {
  initialArray?: number[]
}

export default function TwoPointersVisualizer({ initialArray = [1, 2, 3, 4, 5, 6, 7, 8, 9] }: TwoPointersVisualizerProps) {
  const [array, setArray] = useState<ArrayElement[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentOperation, setCurrentOperation] = useState<string>("")
  const [currentStep, setCurrentStep] = useState(0)
  const [speed, setSpeed] = useState(1000)
  const [leftPointer, setLeftPointer] = useState(0)
  const [rightPointer, setRightPointer] = useState(0)
  const [targetSum, setTargetSum] = useState<string>("10")
  const [operationResult, setOperationResult] = useState<string>("")
  const [algorithm, setAlgorithm] = useState<string>("two-sum")

  // Initialize array
  useEffect(() => {
    const initArray = initialArray.map((value, index) => ({
      value,
      index,
      isLeftPointer: false,
      isRightPointer: false,
      isTarget: false,
      isProcessed: false
    }))
    setArray(initArray)
    setRightPointer(initArray.length - 1)
  }, [initialArray.join(',')])

  const resetVisualization = () => {
    setIsPlaying(false)
    setCurrentOperation("")
    setCurrentStep(0)
    setOperationResult("")
    setLeftPointer(0)
    setRightPointer(array.length - 1)
    const resetArray = array.map(item => ({
      ...item,
      isLeftPointer: false,
      isRightPointer: false,
      isTarget: false,
      isProcessed: false
    }))
    setArray(resetArray)
  }

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const updatePointers = (left: number, right: number, processed: number[] = []) => {
    const newArray = array.map((item, index) => ({
      ...item,
      isLeftPointer: index === left,
      isRightPointer: index === right,
      isProcessed: processed.includes(index)
    }))
    setArray(newArray)
  }

  // Two Sum Algorithm (Convergent Pointers)
  const twoSumAlgorithm = async () => {
    const target = parseInt(targetSum)
    if (isNaN(target)) return

    setIsPlaying(true)
    setCurrentOperation("Two Sum: Finding pair that sums to target")
    setOperationResult("")

    let left = 0
    let right = array.length - 1
    let found = false

    while (left < right) {
      updatePointers(left, right)
      await sleep(speed)

      const currentSum = array[left].value + array[right].value
      setCurrentOperation(`Checking: ${array[left].value} + ${array[right].value} = ${currentSum} (target: ${target})`)

      if (currentSum === target) {
        // Found the pair
        const foundArray = array.map((item, index) => ({
          ...item,
          isLeftPointer: index === left,
          isRightPointer: index === right,
          isTarget: index === left || index === right
        }))
        setArray(foundArray)
        setOperationResult(`Found pair: [${array[left].value}, ${array[right].value}] at indices [${left}, ${right}]`)
        found = true
        break
      } else if (currentSum < target) {
        left++
        setCurrentOperation(`Sum too small, move left pointer right: ${left} → ${left}`)
      } else {
        right--
        setCurrentOperation(`Sum too large, move right pointer left: ${right} → ${right}`)
      }
      await sleep(speed / 2)
    }

    if (!found) {
      setOperationResult("No pair found that sums to target")
      updatePointers(-1, -1)
    }

    setIsPlaying(false)
    setCurrentOperation("")
  }

  // Palindrome Check Algorithm (Convergent Pointers)
  const palindromeCheck = async () => {
    setIsPlaying(true)
    setCurrentOperation("Palindrome Check: Comparing characters from both ends")
    setOperationResult("")

    let left = 0
    let right = array.length - 1
    let isPalindrome = true

    while (left < right) {
      updatePointers(left, right)
      await sleep(speed)

      setCurrentOperation(`Comparing: array[${left}] = ${array[left].value} with array[${right}] = ${array[right].value}`)

      if (array[left].value !== array[right].value) {
        isPalindrome = false
        const failArray = array.map((item, index) => ({
          ...item,
          isLeftPointer: index === left,
          isRightPointer: index === right,
          isTarget: false
        }))
        setArray(failArray)
        setOperationResult(`Not a palindrome: ${array[left].value} ≠ ${array[right].value}`)
        break
      }

      // Mark as processed
      const processed = []
      for (let i = 0; i <= left; i++) processed.push(i)
      for (let i = right; i < array.length; i++) processed.push(i)
      updatePointers(left, right, processed)

      left++
      right--
      await sleep(speed / 2)
    }

    if (isPalindrome && left >= right) {
      setOperationResult("Array is a palindrome!")
      const successArray = array.map(item => ({
        ...item,
        isTarget: true,
        isLeftPointer: false,
        isRightPointer: false
      }))
      setArray(successArray)
    }

    setIsPlaying(false)
    setCurrentOperation("")
  }

  // Container With Most Water (Convergent Pointers)
  const containerWithMostWater = async () => {
    setIsPlaying(true)
    setCurrentOperation("Container With Most Water: Finding maximum area")
    setOperationResult("")

    let left = 0
    let right = array.length - 1
    let maxArea = 0
    let bestLeft = 0
    let bestRight = 0

    while (left < right) {
      updatePointers(left, right)
      await sleep(speed)

      const height = Math.min(array[left].value, array[right].value)
      const width = right - left
      const area = height * width

      setCurrentOperation(`Area = min(${array[left].value}, ${array[right].value}) × ${width} = ${area}`)

      if (area > maxArea) {
        maxArea = area
        bestLeft = left
        bestRight = right
        setOperationResult(`New max area: ${area} (heights: ${array[left].value}, ${array[right].value})`)
      }

      // Move the pointer with smaller height
      if (array[left].value < array[right].value) {
        left++
      } else {
        right--
      }
      await sleep(speed / 2)
    }

    // Highlight the best solution
    const bestArray = array.map((item, index) => ({
      ...item,
      isLeftPointer: index === bestLeft,
      isRightPointer: index === bestRight,
      isTarget: index === bestLeft || index === bestRight
    }))
    setArray(bestArray)
    setOperationResult(`Maximum area: ${maxArea} between indices ${bestLeft} and ${bestRight}`)

    setIsPlaying(false)
    setCurrentOperation("")
  }

  // Remove Duplicates (Divergent Pointers)
  const removeDuplicates = async () => {
    setIsPlaying(true)
    setCurrentOperation("Remove Duplicates: Using slow and fast pointers")
    setOperationResult("")

    let slow = 0
    let fast = 1

    while (fast < array.length) {
      updatePointers(slow, fast)
      await sleep(speed)

      setCurrentOperation(`Comparing: array[${slow}] = ${array[slow].value} with array[${fast}] = ${array[fast].value}`)

      if (array[slow].value !== array[fast].value) {
        slow++
        if (slow !== fast) {
          // Simulate moving the unique element
          setCurrentOperation(`Moving ${array[fast].value} to position ${slow}`)
          await sleep(speed / 2)
        }
      }

      fast++
      await sleep(speed / 2)
    }

    // Highlight the unique portion
    const uniqueArray = array.map((item, index) => ({
      ...item,
      isLeftPointer: false,
      isRightPointer: false,
      isTarget: index <= slow,
      isProcessed: index > slow
    }))
    setArray(uniqueArray)
    setOperationResult(`Unique elements: ${slow + 1} (highlighted in green)`)

    setIsPlaying(false)
    setCurrentOperation("")
  }

  const runAlgorithm = () => {
    switch (algorithm) {
      case "two-sum":
        twoSumAlgorithm()
        break
      case "palindrome":
        palindromeCheck()
        break
      case "container":
        containerWithMostWater()
        break
      case "remove-duplicates":
        removeDuplicates()
        break
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Two Pointers Technique Visualizer</CardTitle>
          <CardDescription>
            Interactive visualization of convergent and divergent pointer patterns
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
                      ${element.isTarget 
                        ? 'border-green-500 bg-green-100 text-green-800' 
                        : element.isProcessed
                        ? 'border-gray-400 bg-gray-100 text-gray-600'
                        : 'border-gray-300 bg-white text-gray-700'
                      }
                      transition-all duration-300
                    `}
                  >
                    {element.value}
                    {element.isLeftPointer && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <ArrowLeft className="w-4 h-4 text-blue-600" />
                        <div className="text-xs text-blue-600 font-semibold">L</div>
                      </div>
                    )}
                    {element.isRightPointer && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <ArrowRight className="w-4 h-4 text-red-600" />
                        <div className="text-xs text-red-600 font-semibold">R</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600 text-center">
              <span className="inline-flex items-center mr-4">
                <ArrowLeft className="w-4 h-4 text-blue-600 mr-1" />
                Left Pointer
              </span>
              <span className="inline-flex items-center">
                <ArrowRight className="w-4 h-4 text-red-600 mr-1" />
                Right Pointer
              </span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  <option value="two-sum">Two Sum (Convergent)</option>
                  <option value="palindrome">Palindrome Check</option>
                  <option value="container">Container With Most Water</option>
                  <option value="remove-duplicates">Remove Duplicates (Divergent)</option>
                </select>
                {algorithm === "two-sum" && (
                  <Input
                    placeholder="Target sum"
                    value={targetSum}
                    onChange={(e) => setTargetSum(e.target.value)}
                    disabled={isPlaying}
                  />
                )}
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
                          isLeftPointer: false,
                          isRightPointer: false,
                          isTarget: false,
                          isProcessed: false
                        }))
                        setArray(initArray)
                        setRightPointer(initArray.length - 1)
                        e.currentTarget.value = ''
                      }
                    }
                  }}
                />
                <div className="text-xs text-gray-500">
                  Press Enter to apply. Example: 1,2,3,4,5
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Convergent Pointers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><strong>Two Sum:</strong> Find pair that sums to target</div>
                  <div><strong>Palindrome:</strong> Check if array reads same forwards/backwards</div>
                  <div><strong>Container:</strong> Find maximum water container area</div>
                  <div className="text-xs text-gray-600 mt-2">
                    Pointers start at opposite ends and move toward each other
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Divergent Pointers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><strong>Remove Duplicates:</strong> Slow/fast pointer technique</div>
                  <div><strong>Partition:</strong> Separate elements by condition</div>
                  <div><strong>Dutch Flag:</strong> Sort 3 colors efficiently</div>
                  <div className="text-xs text-gray-600 mt-2">
                    Pointers start together and move at different speeds
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Complexity Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Time Complexity Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">Two Sum</Badge>
                  <div className="text-2xl font-bold text-green-600">O(n)</div>
                  <div className="text-sm text-gray-600">Linear scan</div>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">Palindrome</Badge>
                  <div className="text-2xl font-bold text-green-600">O(n)</div>
                  <div className="text-sm text-gray-600">Single pass</div>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">Container</Badge>
                  <div className="text-2xl font-bold text-green-600">O(n)</div>
                  <div className="text-sm text-gray-600">One traversal</div>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">Remove Dups</Badge>
                  <div className="text-2xl font-bold text-green-600">O(n)</div>
                  <div className="text-sm text-gray-600">In-place</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <strong>Space Complexity:</strong> O(1) - All algorithms use constant extra space
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
} 