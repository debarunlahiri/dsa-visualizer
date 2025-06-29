"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface HeapItem {
  id: number
  value: string
  priority: number
}

const HeapVisualizer = () => {
  const [heap, setHeap] = useState<HeapItem[]>([])
  const [newTask, setNewTask] = useState('')
  const [newPriority, setNewPriority] = useState(1)
  const [currentScenario, setCurrentScenario] = useState<'hospital' | 'tasks' | 'custom'>('hospital')
  const [nextId, setNextId] = useState(1)
  const [lastOperation, setLastOperation] = useState<string>('')

  // Heap operations
  const getParentIndex = (index: number) => Math.floor((index - 1) / 2)
  const getLeftChildIndex = (index: number) => 2 * index + 1
  const getRightChildIndex = (index: number) => 2 * index + 2

  const heapifyUp = (newHeap: HeapItem[], index: number) => {
    if (index === 0) return newHeap
    
    const parentIndex = getParentIndex(index)
    if (newHeap[index].priority < newHeap[parentIndex].priority) {
      // Swap with parent
      [newHeap[index], newHeap[parentIndex]] = [newHeap[parentIndex], newHeap[index]]
      return heapifyUp(newHeap, parentIndex)
    }
    
    return newHeap
  }

  const heapifyDown = (newHeap: HeapItem[], index: number) => {
    const leftChildIndex = getLeftChildIndex(index)
    const rightChildIndex = getRightChildIndex(index)
    let minIndex = index

    if (leftChildIndex < newHeap.length && 
        newHeap[leftChildIndex].priority < newHeap[minIndex].priority) {
      minIndex = leftChildIndex
    }

    if (rightChildIndex < newHeap.length && 
        newHeap[rightChildIndex].priority < newHeap[minIndex].priority) {
      minIndex = rightChildIndex
    }

    if (minIndex !== index) {
      [newHeap[index], newHeap[minIndex]] = [newHeap[minIndex], newHeap[index]]
      return heapifyDown(newHeap, minIndex)
    }

    return newHeap
  }

  const insertItem = (value: string, priority: number) => {
    const newItem: HeapItem = {
      id: nextId,
      value,
      priority
    }
    
    const newHeap = [...heap, newItem]
    const finalHeap = heapifyUp(newHeap, newHeap.length - 1)
    
    setHeap(finalHeap)
    setNextId(nextId + 1)
    setLastOperation(`Added: "${value}" with priority ${priority}`)
  }

  const extractMin = () => {
    if (heap.length === 0) return

    const minItem = heap[0]
    const newHeap = [...heap]
    
    if (newHeap.length === 1) {
      setHeap([])
    } else {
      newHeap[0] = newHeap[newHeap.length - 1]
      newHeap.pop()
      const finalHeap = heapifyDown(newHeap, 0)
      setHeap(finalHeap)
    }
    
    setLastOperation(`Treated: "${minItem.value}" (priority ${minItem.priority})`)
  }

  const peek = () => {
    if (heap.length === 0) return null
    return heap[0]
  }

  const clearHeap = () => {
    setHeap([])
    setLastOperation('Cleared heap')
  }

  const loadHospitalScenario = () => {
    setCurrentScenario('hospital')
    setHeap([])
    setNextId(1)
    setLastOperation('Loaded hospital emergency room scenario')
    
    // Add some initial patients
    setTimeout(() => insertItem("Heart Attack Patient", 1), 100)
    setTimeout(() => insertItem("Broken Arm Patient", 3), 200)
    setTimeout(() => insertItem("Common Cold Patient", 5), 300)  
    setTimeout(() => insertItem("Car Accident Patient", 1), 400)
  }

  const loadTaskScenario = () => {
    setCurrentScenario('tasks')
    setHeap([])
    setNextId(1)
    setLastOperation('Loaded task management scenario')
    
    // Add some initial tasks
    setTimeout(() => insertItem("Fix critical bug", 1), 100)
    setTimeout(() => insertItem("Review code", 3), 200)
    setTimeout(() => insertItem("Update docs", 5), 300)
    setTimeout(() => insertItem("Security patch", 1), 400)
  }

  const addCustomItem = () => {
    if (newTask.trim()) {
      insertItem(newTask.trim(), newPriority)
      setNewTask('')
      setNewPriority(1)
    }
  }

  const getPriorityColor = (priority: number) => {
    if (priority === 1) return 'bg-red-500 text-white'
    if (priority === 2) return 'bg-orange-500 text-white'
    if (priority === 3) return 'bg-yellow-500 text-black'
    if (priority === 4) return 'bg-blue-500 text-white'
    return 'bg-gray-500 text-white'
  }

  const getPriorityLabel = (priority: number) => {
    if (priority === 1) return 'URGENT'
    if (priority === 2) return 'HIGH' 
    if (priority === 3) return 'MEDIUM'
    if (priority === 4) return 'LOW'
    return `P${priority}`
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏥 Interactive Heap (Priority Queue) Visualizer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scenario Selection */}
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={loadHospitalScenario}
              variant={currentScenario === 'hospital' ? 'default' : 'outline'}
              size="sm"
            >
              🏥 Hospital ER
            </Button>
            <Button 
              onClick={loadTaskScenario}
              variant={currentScenario === 'tasks' ? 'default' : 'outline'}
              size="sm"
            >
              💻 Task Manager
            </Button>
            <Button 
              onClick={() => setCurrentScenario('custom')}
              variant={currentScenario === 'custom' ? 'default' : 'outline'}
              size="sm"
            >
              ⚙️ Custom
            </Button>
          </div>

          {/* Current Status */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{heap.length}</div>
                <div className="text-sm text-gray-600">Items in Queue</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {peek() ? getPriorityLabel(peek()!.priority) : '-'}
                </div>
                <div className="text-sm text-gray-600">Next Priority</div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-600 truncate" title={peek()?.value}>
                  {peek()?.value || 'None'}
                </div>
                <div className="text-sm text-gray-600">Next Item</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {currentScenario === 'custom' && (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter task/item..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
                />
                <Input
                  type="number"
                  placeholder="Priority"
                  value={newPriority}
                  onChange={(e) => setNewPriority(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-24"
                  min="1"
                  max="10"
                />
                <Button onClick={addCustomItem} disabled={!newTask.trim()}>
                  ➕ Add
                </Button>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {currentScenario === 'hospital' && (
                <>
                  <Button onClick={() => insertItem("Heart Attack Patient", 1)} size="sm" className="bg-red-500 hover:bg-red-600">
                    🚨 Heart Attack (P1)
                  </Button>
                  <Button onClick={() => insertItem("Broken Bone Patient", 3)} size="sm" className="bg-yellow-500 hover:bg-yellow-600">
                    🦴 Broken Bone (P3)
                  </Button>
                  <Button onClick={() => insertItem("Cold Patient", 5)} size="sm" className="bg-gray-500 hover:bg-gray-600">
                    🤧 Common Cold (P5)
                  </Button>
                </>
              )}

              {currentScenario === 'tasks' && (
                <>
                  <Button onClick={() => insertItem("Critical Bug Fix", 1)} size="sm" className="bg-red-500 hover:bg-red-600">
                    🐛 Critical Bug (P1)
                  </Button>
                  <Button onClick={() => insertItem("Code Review", 3)} size="sm" className="bg-yellow-500 hover:bg-yellow-600">
                    👀 Code Review (P3)
                  </Button>
                  <Button onClick={() => insertItem("Update Docs", 5)} size="sm" className="bg-gray-500 hover:bg-gray-600">
                    📝 Documentation (P5)
                  </Button>
                </>
              )}

              <Button 
                onClick={extractMin} 
                disabled={heap.length === 0}
                className="bg-green-600 hover:bg-green-700"
              >
                🏆 Handle Next ({currentScenario === 'hospital' ? 'Treat' : 'Complete'})
              </Button>
              <Button onClick={clearHeap} variant="outline" size="sm">
                🗑️ Clear All
              </Button>
            </div>
          </div>

          {/* Last Operation */}
          {lastOperation && (
            <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Last Action:</strong> {lastOperation}
              </p>
            </div>
          )}

          {/* Simple Array Visualization */}
          {heap.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📊 Heap Queue (Priority Order)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    {heap.map((item, index) => (
                      <div 
                        key={item.id} 
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          index === 0 ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Badge className={`${getPriorityColor(item.priority)}`}>
                            {getPriorityLabel(item.priority)}
                          </Badge>
                          <span className="font-medium">{item.value}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Priority: {item.priority} | Index: {index}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center text-gray-500 py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-lg">🏥 Heap is empty - no patients waiting!</p>
              <p className="text-sm">Add some items to see the heap in action</p>
            </div>
          )}

          {/* Priority Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎯 Priority Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <Badge className="bg-red-500 text-white justify-center py-2">Priority 1 - URGENT</Badge>
                <Badge className="bg-orange-500 text-white justify-center py-2">Priority 2 - HIGH</Badge>
                <Badge className="bg-yellow-500 text-black justify-center py-2">Priority 3 - MEDIUM</Badge>
                <Badge className="bg-blue-500 text-white justify-center py-2">Priority 4 - LOW</Badge>
                <Badge className="bg-gray-500 text-white justify-center py-2">Priority 5+ - LOWEST</Badge>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Lower numbers = Higher priority. The heap always keeps the highest priority (lowest number) item at the top!
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

export default HeapVisualizer 