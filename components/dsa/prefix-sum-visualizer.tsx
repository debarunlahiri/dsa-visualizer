"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Calculator, Search } from "lucide-react"

interface ArrayElement {
  value: number
  prefixSum: number
  index: number
  isInRange: boolean
  isQueryStart: boolean
  isQueryEnd: boolean
  isHighlighted: boolean
}

interface PrefixSumVisualizerProps {
  initialArray?: number[]
}

export default function PrefixSumVisualizer({ initialArray = [3, 1, 4, 1, 5, 9, 2, 6] }: PrefixSumVisualizerProps) {
  const [array, setArray] = useState<ArrayElement[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentOperation, setCurrentOperation] = useState<string>("")
  const [speed, setSpeed] = useState(1000)
  const [queryStart, setQueryStart] = useState<string>("1")
  const [queryEnd, setQueryEnd] = useState<string>("4")
  const [targetSum, setTargetSum] = useState<string>("6")
  const [operationResult, setOperationResult] = useState<string>("")
  const [algorithm, setAlgorithm] = useState<string>("build-prefix")
  const [isBuilt, setIsBuilt] = useState(false)

  // Initialize array
  useEffect(() => {
    const initArray = initialArray.map((value, index) => ({
      value,
      prefixSum: 0,
      index,
      isInRange: false,
      isQueryStart: false,
      isQueryEnd: false,
      isHighlighted: false
    }))
    setArray(initArray)
    setIsBuilt(false)
  }, [initialArray])

  const resetVisualization = () => {
    setIsPlaying(false)
    setCurrentOperation("")
    setOperationResult("")
    setIsBuilt(false)
    const resetArray = array.map(item => ({
      ...item,
      prefixSum: 0,
      isInRange: false,
      isQueryStart: false,
      isQueryEnd: false,
      isHighlighted: false
    }))
    setArray(resetArray)
  }

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const updateArrayHighlight = (start: number = -1, end: number = -1, highlighted: number[] = []) => {
    const newArray = array.map((item, index) => ({
      ...item,
      isInRange: start !== -1 && end !== -1 && index >= start && index <= end,
      isQueryStart: index === start,
      isQueryEnd: index === end,
      isHighlighted: highlighted.includes(index)
    }))
    setArray(newArray)
  }

  // Build Prefix Sum Array
  const buildPrefixSum = async () => {
    setIsPlaying(true)
    setCurrentOperation("Building prefix sum array...")
    setOperationResult("")

    const newArray = [...array]
    
    // Initialize first element
    newArray[0].prefixSum = newArray[0].value
    setArray([...newArray])
    setCurrentOperation(`prefix[0] = ${newArray[0].value}`)
    await sleep(speed)

    // Build rest of prefix array
    for (let i = 1; i < newArray.length; i++) {
      updateArrayHighlight(-1, -1, [i-1, i])
      setCurrentOperation(`prefix[${i}] = prefix[${i-1}] + arr[${i}] = ${newArray[i-1].prefixSum} + ${newArray[i].value}`)
      await sleep(speed)
      
      newArray[i].prefixSum = newArray[i-1].prefixSum + newArray[i].value
      setArray([...newArray])
      setCurrentOperation(`prefix[${i}] = ${newArray[i].prefixSum}`)
      await sleep(speed / 2)
    }

    updateArrayHighlight()
    setIsBuilt(true)
    setOperationResult("Prefix sum array built successfully! Now you can perform O(1) range queries.")
    setIsPlaying(false)
    setCurrentOperation("")
  }

  // Range Sum Query
  const rangeQuery = async () => {
    if (!isBuilt) {
      setOperationResult("Please build prefix sum array first!")
      return
    }

    const start = parseInt(queryStart)
    const end = parseInt(queryEnd)
    
    if (start < 0 || end >= array.length || start > end) {
      setOperationResult("Invalid range! Please check your indices.")
      return
    }

    setIsPlaying(true)
    setCurrentOperation("Performing range sum query...")
    setOperationResult("")

    // Highlight the range
    updateArrayHighlight(start, end)
    setCurrentOperation(`Finding sum of elements from index ${start} to ${end}`)
    await sleep(speed)

    let result: number
    if (start === 0) {
      result = array[end].prefixSum
      setCurrentOperation(`sum(0, ${end}) = prefix[${end}] = ${result}`)
    } else {
      result = array[end].prefixSum - array[start - 1].prefixSum
      setCurrentOperation(`sum(${start}, ${end}) = prefix[${end}] - prefix[${start-1}] = ${array[end].prefixSum} - ${array[start-1].prefixSum} = ${result}`)
    }
    
    await sleep(speed)
    setOperationResult(`Range sum [${start}, ${end}] = ${result} (computed in O(1) time!)`)
    setIsPlaying(false)
    setCurrentOperation("")
  }

  // Subarray Sum Equals K
  const subarraySum = async () => {
    const target = parseInt(targetSum)
    if (isNaN(target)) return

    setIsPlaying(true)
    setCurrentOperation("Finding subarrays with sum equal to target...")
    setOperationResult("")

    let count = 0
    const prefixSumCount = new Map<number, number>()
    prefixSumCount.set(0, 1)
    let currentPrefixSum = 0

    for (let i = 0; i < array.length; i++) {
      // Update current prefix sum
      currentPrefixSum += array[i].value
      
      updateArrayHighlight(-1, -1, [i])
      setCurrentOperation(`At index ${i}: current prefix sum = ${currentPrefixSum}`)
      await sleep(speed)

      // Check if (currentPrefixSum - target) exists
      const needed = currentPrefixSum - target
      if (prefixSumCount.has(needed)) {
        const foundCount = prefixSumCount.get(needed)!
        count += foundCount
        setCurrentOperation(`Found ${foundCount} subarray(s) ending at index ${i} with sum ${target}`)
        await sleep(speed / 2)
      }

      // Update frequency map
      prefixSumCount.set(currentPrefixSum, (prefixSumCount.get(currentPrefixSum) || 0) + 1)
    }

    updateArrayHighlight()
    setOperationResult(`Total subarrays with sum ${target}: ${count}`)
    setIsPlaying(false)
    setCurrentOperation("")
  }

  // Maximum Subarray Sum using Prefix Sum concept
  const maxSubarraySum = async () => {
    setIsPlaying(true)
    setCurrentOperation("Finding maximum subarray sum using prefix sum concept...")
    setOperationResult("")

    let maxSum = array[0].value
    let currentSum = 0
    let bestStart = 0
    let bestEnd = 0
    let tempStart = 0

    for (let i = 0; i < array.length; i++) {
      updateArrayHighlight(-1, -1, [i])
      
      currentSum += array[i].value
      setCurrentOperation(`At index ${i}: current sum = ${currentSum}, max so far = ${maxSum}`)
      await sleep(speed)

      if (currentSum > maxSum) {
        maxSum = currentSum
        bestStart = tempStart
        bestEnd = i
        setCurrentOperation(`New maximum found: ${maxSum} from index ${bestStart} to ${bestEnd}`)
        await sleep(speed / 2)
      }

      if (currentSum < 0) {
        currentSum = 0
        tempStart = i + 1
        setCurrentOperation(`Reset sum to 0, new potential start: ${tempStart}`)
        await sleep(speed / 2)
      }
    }

    updateArrayHighlight(bestStart, bestEnd)
    setOperationResult(`Maximum subarray sum: ${maxSum} from index ${bestStart} to ${bestEnd}`)
    setIsPlaying(false)
    setCurrentOperation("")
  }

  const runAlgorithm = () => {
    switch (algorithm) {
      case "build-prefix":
        buildPrefixSum()
        break
      case "range-query":
        rangeQuery()
        break
      case "subarray-sum":
        subarraySum()
        break
      case "max-subarray":
        maxSubarraySum()
        break
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Prefix Sum Technique Visualizer</CardTitle>
          <CardDescription>
            Interactive visualization of prefix sum for range queries and subarray problems
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Array Visualization */}
          <div className="space-y-4">
            {/* Original Array */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Original Array</h3>
              <div className="flex flex-wrap gap-2 justify-center p-4 bg-gray-50 rounded-lg">
                {array.map((element, idx) => (
                  <div key={`orig-${idx}`} className="flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-1">Index: {element.index}</div>
                    <div
                      className={`
                        w-14 h-14 flex items-center justify-center rounded border-2 font-semibold text-sm
                        ${element.isInRange
                          ? 'border-blue-500 bg-blue-100 text-blue-800'
                          : element.isHighlighted
                          ? 'border-yellow-500 bg-yellow-100 text-yellow-800'
                          : 'border-gray-300 bg-white text-gray-700'
                        }
                        transition-all duration-300
                      `}
                    >
                      {element.value}
                    </div>
                    {element.isQueryStart && (
                      <div className="text-xs text-blue-600 font-semibold mt-1">START</div>
                    )}
                    {element.isQueryEnd && (
                      <div className="text-xs text-blue-600 font-semibold mt-1">END</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Prefix Sum Array */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Prefix Sum Array</h3>
              <div className="flex flex-wrap gap-2 justify-center p-4 bg-green-50 rounded-lg">
                {array.map((element, idx) => (
                  <div key={`prefix-${idx}`} className="flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-1">Index: {element.index}</div>
                    <div
                      className={`
                        w-14 h-14 flex items-center justify-center rounded border-2 font-semibold text-sm
                        ${element.prefixSum > 0
                          ? 'border-green-500 bg-green-100 text-green-800'
                          : 'border-gray-300 bg-gray-100 text-gray-600'
                        }
                        transition-all duration-300
                      `}
                    >
                      {element.prefixSum || 0}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      prefix[{idx}]
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-blue-500 bg-blue-100 rounded mr-2"></div>
                Query Range
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-yellow-500 bg-yellow-100 rounded mr-2"></div>
                Current Processing
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-green-500 bg-green-100 rounded mr-2"></div>
                Prefix Sum Built
              </div>
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
                  <option value="build-prefix">Build Prefix Sum</option>
                  <option value="range-query">Range Sum Query</option>
                  <option value="subarray-sum">Subarray Sum = K</option>
                  <option value="max-subarray">Max Subarray Sum</option>
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
                {algorithm === "range-query" && (
                  <>
                    <Input
                      placeholder="Start index"
                      value={queryStart}
                      onChange={(e) => setQueryStart(e.target.value)}
                      disabled={isPlaying}
                    />
                    <Input
                      placeholder="End index"
                      value={queryEnd}
                      onChange={(e) => setQueryEnd(e.target.value)}
                      disabled={isPlaying}
                    />
                  </>
                )}
                {algorithm === "subarray-sum" && (
                  <Input
                    placeholder="Target sum"
                    value={targetSum}
                    onChange={(e) => setTargetSum(e.target.value)}
                    disabled={isPlaying}
                  />
                )}
                <div className="text-xs text-gray-500">
                  {algorithm === "build-prefix" && "Builds prefix sum array"}
                  {algorithm === "range-query" && "Query sum in range [start, end]"}
                  {algorithm === "subarray-sum" && "Count subarrays with target sum"}
                  {algorithm === "max-subarray" && "Find maximum subarray sum"}
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
                          prefixSum: 0,
                          index,
                          isInRange: false,
                          isQueryStart: false,
                          isQueryEnd: false,
                          isHighlighted: false
                        }))
                        setArray(initArray)
                        resetVisualization()
                        e.currentTarget.value = ''
                      }
                    }
                  }}
                />
                <div className="text-xs text-gray-500">
                  Press Enter to apply. Example: 3,1,4,1,5
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
                <CardTitle className="text-lg">Prefix Sum Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><strong>Range Queries:</strong> Sum of elements in range [i,j] in O(1)</div>
                  <div><strong>Subarray Problems:</strong> Count/find subarrays with specific sum</div>
                  <div><strong>2D Extensions:</strong> Rectangle sum queries in matrices</div>
                  <div><strong>Difference Arrays:</strong> Efficient range updates</div>
                  <div className="text-xs text-gray-600 mt-2">
                    Preprocessing: O(n) time, Queries: O(1) time
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Formulas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm font-mono">
                  <div><strong>Build:</strong> prefix[i] = prefix[i-1] + arr[i]</div>
                  <div><strong>Query:</strong> sum(i,j) = prefix[j] - prefix[i-1]</div>
                  <div><strong>Special:</strong> sum(0,j) = prefix[j]</div>
                  <div><strong>HashMap:</strong> count[prefix_sum - target]</div>
                  <div className="text-xs text-gray-600 mt-2">
                    Watch out for index bounds and empty ranges!
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">Build</Badge>
                  <div className="text-2xl font-bold text-blue-600">O(n)</div>
                  <div className="text-sm text-gray-600">One-time preprocessing</div>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">Query</Badge>
                  <div className="text-2xl font-bold text-green-600">O(1)</div>
                  <div className="text-sm text-gray-600">Constant time lookup</div>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">Space</Badge>
                  <div className="text-2xl font-bold text-yellow-600">O(n)</div>
                  <div className="text-sm text-gray-600">Additional array</div>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">Multiple Queries</Badge>
                  <div className="text-2xl font-bold text-green-600">O(n+q)</div>
                  <div className="text-sm text-gray-600">vs O(n×q) naive</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <strong>Trade-off:</strong> O(n) preprocessing for O(1) queries - excellent for multiple range operations
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
} 