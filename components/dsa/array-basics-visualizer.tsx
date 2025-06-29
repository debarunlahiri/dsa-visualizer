"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Plus, Minus, Search } from "lucide-react"

interface ArrayElement {
  value: number
  index: number
  highlighted: boolean
  isAccessing: boolean
  isNew: boolean
}

interface ArrayVisualizerProps {
  initialArray?: number[]
}

const DEFAULT_ARRAY = [5, 2, 8, 1, 9, 3]

export default function ArrayBasicsVisualizer({ initialArray }: ArrayVisualizerProps) {
  const [array, setArray] = useState<ArrayElement[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentOperation, setCurrentOperation] = useState<string>("")
  const [currentStep, setCurrentStep] = useState(0)
  const [speed, setSpeed] = useState(1000)
  const [accessIndex, setAccessIndex] = useState<string>("")
  const [insertValue, setInsertValue] = useState<string>("")
  const [insertIndex, setInsertIndex] = useState<string>("")
  const [searchValue, setSearchValue] = useState<string>("")
  const [operationResult, setOperationResult] = useState<string>("")

  // Initialize array
  useEffect(() => {
    const arrayToUse = initialArray || DEFAULT_ARRAY
    const initArray = arrayToUse.map((value, index) => ({
      value,
      index,
      highlighted: false,
      isAccessing: false,
      isNew: false
    }))
    setArray(initArray)
  }, [initialArray?.join(',')])

  const resetVisualization = () => {
    setIsPlaying(false)
    setCurrentOperation("")
    setCurrentStep(0)
    setOperationResult("")
    const resetArray = array.map(item => ({
      ...item,
      highlighted: false,
      isAccessing: false,
      isNew: false
    }))
    setArray(resetArray)
  }

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  // Array Access Operation
  const accessElement = async () => {
    const index = parseInt(accessIndex)
    if (index < 0 || index >= array.length) {
      setOperationResult(`Invalid index: ${index}. Array bounds: 0 to ${array.length - 1}`)
      return
    }

    setIsPlaying(true)
    setCurrentOperation(`Accessing element at index ${index}`)
    setOperationResult("")

    // Highlight the accessed element
    const newArray = array.map((item, i) => ({
      ...item,
      isAccessing: i === index,
      highlighted: false
    }))
    setArray(newArray)
    await sleep(speed)

    setOperationResult(`Element at index ${index} is: ${array[index].value} (Time: O(1))`)
    setIsPlaying(false)
    setCurrentOperation("")

    // Clear highlighting after a moment
    setTimeout(() => {
      setArray(prev => prev.map(item => ({ ...item, isAccessing: false })))
    }, 2000)
  }

  // Array Search Operation
  const searchElement = async () => {
    const target = parseInt(searchValue)
    if (isNaN(target)) return

    setIsPlaying(true)
    setCurrentOperation(`Searching for value ${target}`)
    setOperationResult("")

    let found = false
    let foundIndex = -1

    // Linear search visualization
    for (let i = 0; i < array.length; i++) {
      const newArray = array.map((item, index) => ({
        ...item,
        highlighted: index === i,
        isAccessing: false,
        isNew: false
      }))
      setArray(newArray)
      await sleep(speed)

      if (array[i].value === target) {
        found = true
        foundIndex = i
        break
      }
    }

    if (found) {
      setOperationResult(`Found ${target} at index ${foundIndex} (Time: O(n) - Linear Search)`)
      // Keep the found element highlighted
      const finalArray = array.map((item, i) => ({
        ...item,
        highlighted: i === foundIndex,
        isAccessing: true
      }))
      setArray(finalArray)
    } else {
      setOperationResult(`Value ${target} not found in array (Time: O(n) - Linear Search)`)
      setArray(prev => prev.map(item => ({ ...item, highlighted: false })))
    }

    setIsPlaying(false)
    setCurrentOperation("")
  }

  // Array Insertion Operation
  const insertElement = async () => {
    const value = parseInt(insertValue)
    const index = parseInt(insertIndex)
    
    if (isNaN(value) || index < 0 || index > array.length) {
      setOperationResult(`Invalid input. Index must be between 0 and ${array.length}`)
      return
    }

    setIsPlaying(true)
    setCurrentOperation(`Inserting ${value} at index ${index}`)
    setOperationResult("")

    // Show the insertion process
    if (index < array.length) {
      // Need to shift elements
      setCurrentOperation(`Shifting elements to make space (this takes O(n) time)`)
      for (let i = array.length - 1; i >= index; i--) {
        const newArray = array.map((item, idx) => ({
          ...item,
          highlighted: idx >= index,
          isAccessing: false,
          isNew: false
        }))
        setArray(newArray)
        await sleep(speed / 2)
      }
    }

    // Insert the new element
    const newArray = [...array]
    newArray.splice(index, 0, {
      value,
      index,
      highlighted: false,
      isAccessing: false,
      isNew: true
    })

    // Update indices
    const updatedArray = newArray.map((item, i) => ({
      ...item,
      index: i
    }))

    setArray(updatedArray)
    await sleep(speed)

    setOperationResult(`Inserted ${value} at index ${index}. Array size is now ${updatedArray.length}. Time: O(n)`)
    setIsPlaying(false)
    setCurrentOperation("")

    // Clear highlighting
    setTimeout(() => {
      setArray(prev => prev.map(item => ({ ...item, isNew: false, highlighted: false })))
    }, 2000)
  }

  // Array Deletion Operation
  const deleteElement = async (targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= array.length) return

    setIsPlaying(true)
    setCurrentOperation(`Deleting element at index ${targetIndex}`)
    setOperationResult("")

    // Highlight the element to be deleted
    const highlightArray = array.map((item, i) => ({
      ...item,
      highlighted: i === targetIndex,
      isAccessing: false,
      isNew: false
    }))
    setArray(highlightArray)
    await sleep(speed)

    // Remove the element
    const newArray = array.filter((_, i) => i !== targetIndex)
    
    // Update indices and show shifting
    const updatedArray = newArray.map((item, i) => ({
      ...item,
      index: i,
      highlighted: i >= targetIndex
    }))

    setArray(updatedArray)
    await sleep(speed)

    setOperationResult(`Deleted element at index ${targetIndex}. Array size is now ${updatedArray.length}. Time: O(n)`)
    setIsPlaying(false)
    setCurrentOperation("")

    // Clear highlighting
    setTimeout(() => {
      setArray(prev => prev.map(item => ({ ...item, highlighted: false })))
    }, 2000)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Array Fundamentals Visualizer</span>
          </CardTitle>
          <CardDescription>
            Interactive visualization of array operations: access, search, insertion, and deletion
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Array Visualization */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Array Contents</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {array.map((element, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">Index: {element.index}</div>
                  <div
                    className={`
                      w-12 h-12 flex items-center justify-center rounded border-2 font-semibold text-sm
                      ${element.isAccessing 
                        ? 'border-blue-500 bg-blue-100 text-blue-800' 
                        : element.highlighted 
                        ? 'border-yellow-500 bg-yellow-100 text-yellow-800'
                        : element.isNew
                        ? 'border-green-500 bg-green-100 text-green-800'
                        : 'border-gray-300 bg-white text-gray-700'
                      }
                      transition-all duration-300
                    `}
                  >
                    {element.value}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-1 text-xs px-2 py-1 h-6"
                    onClick={() => deleteElement(element.index)}
                    disabled={isPlaying}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              Array Length: {array.length} | Memory: O(n) space complexity
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Access Element */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Access Element (O(1))</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input
                  placeholder="Index (0-based)"
                  value={accessIndex}
                  onChange={(e) => setAccessIndex(e.target.value)}
                  disabled={isPlaying}
                />
                <Button 
                  onClick={accessElement} 
                  disabled={isPlaying || !accessIndex}
                  className="w-full"
                  size="sm"
                >
                  Access
                </Button>
              </CardContent>
            </Card>

            {/* Search Element */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Search Element (O(n))</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input
                  placeholder="Value to search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  disabled={isPlaying}
                />
                <Button 
                  onClick={searchElement} 
                  disabled={isPlaying || !searchValue}
                  className="w-full"
                  size="sm"
                >
                  <Search className="w-4 h-4 mr-1" />
                  Search
                </Button>
              </CardContent>
            </Card>

            {/* Insert Element */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Insert Element (O(n))</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input
                  placeholder="Value"
                  value={insertValue}
                  onChange={(e) => setInsertValue(e.target.value)}
                  disabled={isPlaying}
                />
                <Input
                  placeholder="Index"
                  value={insertIndex}
                  onChange={(e) => setInsertIndex(e.target.value)}
                  disabled={isPlaying}
                />
                <Button 
                  onClick={insertElement} 
                  disabled={isPlaying || !insertValue || !insertIndex}
                  className="w-full"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Insert
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
                <Button 
                  onClick={resetVisualization} 
                  disabled={isPlaying}
                  className="w-full"
                  size="sm"
                  variant="outline"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Complexity Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Time Complexity Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">Access</Badge>
                  <div className="text-2xl font-bold text-green-600">O(1)</div>
                  <div className="text-sm text-gray-600">Constant time</div>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">Search</Badge>
                  <div className="text-2xl font-bold text-yellow-600">O(n)</div>
                  <div className="text-sm text-gray-600">Linear time</div>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">Insert</Badge>
                  <div className="text-2xl font-bold text-red-600">O(n)</div>
                  <div className="text-sm text-gray-600">Linear time</div>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">Delete</Badge>
                  <div className="text-2xl font-bold text-red-600">O(n)</div>
                  <div className="text-sm text-gray-600">Linear time</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <strong>Space Complexity:</strong> O(n) where n is the number of elements
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
} 