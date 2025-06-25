"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Plus, Minus, Search, ArrowRight } from "lucide-react"

interface ListNode {
  value: number
  next: ListNode | null
  id: string
  isHighlighted: boolean
  isHead: boolean
  isTail: boolean
  isBeingProcessed: boolean
}

interface LinkedListVisualizerProps {
  initialValues?: number[]
}

export default function LinkedListVisualizer({ initialValues = [1, 2, 3, 4, 5] }: LinkedListVisualizerProps) {
  const [head, setHead] = useState<ListNode | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentOperation, setCurrentOperation] = useState("")
  const [operationResult, setOperationResult] = useState("")
  const [speed, setSpeed] = useState(1000)
  const [inputValue, setInputValue] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [insertPosition, setInsertPosition] = useState("")
  const [operation, setOperation] = useState<string>("insert-end")

  // Initialize linked list
  useEffect(() => {
    resetList()
  }, [initialValues])

  const resetList = () => {
    let newHead: ListNode | null = null
    let current: ListNode | null = null

    initialValues.forEach((value, index) => {
      const newNode: ListNode = {
        value,
        next: null,
        id: `node-${index}-${Date.now()}`,
        isHighlighted: false,
        isHead: index === 0,
        isTail: index === initialValues.length - 1,
        isBeingProcessed: false
      }

      if (!newHead) {
        newHead = newNode
        current = newNode
      } else if (current) {
        current.next = newNode
        current = newNode
      }
    })

    setHead(newHead)
    setCurrentOperation("")
    setOperationResult("")
    setIsPlaying(false)
  }

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const updateNodeHighlight = (nodeId: string, highlight: boolean, processing: boolean = false) => {
    const updateNode = (node: ListNode | null): ListNode | null => {
      if (!node) return null
      
      const updatedNode = {
        ...node,
        isHighlighted: node.id === nodeId ? highlight : node.isHighlighted,
        isBeingProcessed: node.id === nodeId ? processing : node.isBeingProcessed,
        next: updateNode(node.next)
      }
      
      return updatedNode
    }

    setHead(updateNode(head))
  }

  const clearAllHighlights = () => {
    const clearNode = (node: ListNode | null): ListNode | null => {
      if (!node) return null
      
      return {
        ...node,
        isHighlighted: false,
        isBeingProcessed: false,
        next: clearNode(node.next)
      }
    }

    setHead(clearNode(head))
  }

  const updateHeadTailMarkers = (newHead: ListNode | null) => {
    const updateMarkers = (node: ListNode | null, isFirst: boolean = true): ListNode | null => {
      if (!node) return null
      
      const isLast = node.next === null
      
      return {
        ...node,
        isHead: isFirst,
        isTail: isLast,
        next: updateMarkers(node.next, false)
      }
    }

    return updateMarkers(newHead)
  }

  // Insert at beginning
  const insertAtBeginning = async (value: number) => {
    setIsPlaying(true)
    setCurrentOperation(`Inserting ${value} at the beginning...`)
    
    const newNode: ListNode = {
      value,
      next: head,
      id: `node-${Date.now()}`,
      isHighlighted: true,
      isHead: true,
      isTail: head === null,
      isBeingProcessed: true
    }

    await sleep(speed / 2)
    setCurrentOperation(`Creating new node with value ${value}`)
    await sleep(speed / 2)
    
    setCurrentOperation(`Linking new node to current head`)
    const updatedHead = updateHeadTailMarkers(newNode)
    setHead(updatedHead)
    
    await sleep(speed)
    setOperationResult(`Successfully inserted ${value} at the beginning`)
    setIsPlaying(false)
    
    setTimeout(() => {
      clearAllHighlights()
    }, speed)
  }

  // Insert at end
  const insertAtEnd = async (value: number) => {
    setIsPlaying(true)
    setCurrentOperation(`Inserting ${value} at the end...`)

    const newNode: ListNode = {
      value,
      next: null,
      id: `node-${Date.now()}`,
      isHighlighted: true,
      isHead: head === null,
      isTail: true,
      isBeingProcessed: true
    }

    if (!head) {
      setHead(newNode)
      setCurrentOperation(`List was empty, new node becomes head`)
    } else {
      setCurrentOperation(`Traversing to find the tail...`)
      
      // Find tail and update
      const findTailAndInsert = (node: ListNode): ListNode => {
        if (!node.next) {
          setCurrentOperation(`Found tail, linking new node`)
          return {
            ...node,
            next: newNode,
            isTail: false,
            isBeingProcessed: true
          }
        }
        
        return {
          ...node,
          isBeingProcessed: true,
          next: findTailAndInsert(node.next)
        }
      }

      await sleep(speed)
      const updatedHead = findTailAndInsert(head)
      setHead(updatedHead)
    }

    await sleep(speed)
    setOperationResult(`Successfully inserted ${value} at the end`)
    setIsPlaying(false)
    
    setTimeout(() => {
      clearAllHighlights()
    }, speed)
  }

  // Delete by value
  const deleteByValue = async (value: number) => {
    setIsPlaying(true)
    setCurrentOperation(`Searching for node with value ${value}...`)

    if (!head) {
      setOperationResult("List is empty, nothing to delete")
      setIsPlaying(false)
      return
    }

    // If head needs to be deleted
    if (head.value === value) {
      setCurrentOperation(`Found ${value} at head, removing...`)
      updateNodeHighlight(head.id, true, true)
      await sleep(speed)
      
      const newHead = updateHeadTailMarkers(head.next)
      setHead(newHead)
      setOperationResult(`Successfully deleted ${value} from the beginning`)
    } else {
      // Search for node to delete
      let found = false
      
      const deleteNode = (node: ListNode | null, prev: ListNode | null = null): ListNode | null => {
        if (!node) return null
        
        if (node.value === value && !found) {
          found = true
          setCurrentOperation(`Found ${value}, removing node...`)
          
          if (prev) {
            return {
              ...prev,
              next: node.next
            }
          }
          
          return node.next
        }
        
        return {
          ...node,
          isBeingProcessed: true,
          next: deleteNode(node.next, node)
        }
      }

      await sleep(speed)
      const updatedHead = deleteNode(head)
      
      if (found) {
        setHead(updateHeadTailMarkers(updatedHead))
        setOperationResult(`Successfully deleted ${value}`)
      } else {
        setOperationResult(`Value ${value} not found in the list`)
      }
    }

    setIsPlaying(false)
    setTimeout(() => {
      clearAllHighlights()
    }, speed)
  }

  // Search for value
  const searchForValue = async (value: number) => {
    setIsPlaying(true)
    setCurrentOperation(`Searching for value ${value}...`)
    
    if (!head) {
      setOperationResult("List is empty")
      setIsPlaying(false)
      return
    }

    let current = head
    let position = 0
    let found = false

    while (current) {
      updateNodeHighlight(current.id, true, true)
      setCurrentOperation(`Checking node at position ${position} with value ${current.value}`)
      
      await sleep(speed)
      
      if (current.value === value) {
        setOperationResult(`Found ${value} at position ${position}`)
        found = true
        break
      }
      
      updateNodeHighlight(current.id, false, false)
      current = current.next
      position++
    }

    if (!found) {
      setOperationResult(`Value ${value} not found in the list`)
    }

    setIsPlaying(false)
  }

  // Reverse linked list
  const reverseList = async () => {
    setIsPlaying(true)
    setCurrentOperation("Reversing the linked list...")

    if (!head || !head.next) {
      setOperationResult("List has 0 or 1 elements, nothing to reverse")
      setIsPlaying(false)
      return
    }

    let prev: ListNode | null = null
    let current: ListNode | null = head
    let next: ListNode | null = null

    const nodes: ListNode[] = []
    let temp = head
    while (temp) {
      nodes.push(temp)
      temp = temp.next
    }

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      updateNodeHighlight(node.id, true, true)
      setCurrentOperation(`Processing node ${i} with value ${node.value}`)
      
      await sleep(speed)
      
      next = current?.next || null
      
      if (current) {
        current.next = prev
        prev = current
      }
      
      current = next
      updateNodeHighlight(node.id, false, false)
    }

    const reversedHead = updateHeadTailMarkers(prev)
    setHead(reversedHead)
    setOperationResult("Successfully reversed the linked list")
    setIsPlaying(false)
  }

  const executeOperation = async () => {
    if (isPlaying) return

    const value = parseInt(inputValue)
    const searchVal = parseInt(searchValue)
    const position = parseInt(insertPosition)

    clearAllHighlights()
    setOperationResult("")

    switch (operation) {
      case "insert-beginning":
        if (!isNaN(value)) {
          await insertAtBeginning(value)
        }
        break
      case "insert-end":
        if (!isNaN(value)) {
          await insertAtEnd(value)
        }
        break
      case "delete":
        if (!isNaN(value)) {
          await deleteByValue(value)
        }
        break
      case "search":
        if (!isNaN(searchVal)) {
          await searchForValue(searchVal)
        }
        break
      case "reverse":
        await reverseList()
        break
    }
  }

  const getListAsArray = (): number[] => {
    const result: number[] = []
    let current = head
    while (current) {
      result.push(current.value)
      current = current.next
    }
    return result
  }

  const getListLength = (): number => {
    let count = 0
    let current = head
    while (current) {
      count++
      current = current.next
    }
    return count
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Linked List Visualizer</CardTitle>
          <CardDescription>
            Interactive visualization of linked list operations: insert, delete, search, and reverse
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* List Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-gray-600">Length</div>
              <div className="text-2xl font-bold text-blue-600">{getListLength()}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Head Value</div>
              <div className="text-2xl font-bold text-green-600">
                {head ? head.value : "NULL"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Array Representation</div>
              <div className="text-lg font-mono text-purple-600">
                [{getListAsArray().join(", ")}]
              </div>
            </div>
          </div>

          {/* Linked List Visualization */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Linked List Structure</h3>
            <div className="flex flex-wrap items-center gap-2 p-6 bg-white border rounded-lg min-h-[100px] overflow-x-auto">
              {!head ? (
                <div className="text-gray-500 text-lg">Empty List (NULL)</div>
              ) : (
                (() => {
                  const nodes: JSX.Element[] = []
                  let current = head
                  let index = 0

                  while (current) {
                    const node = current
                    nodes.push(
                      <div key={node.id} className="flex items-center">
                        {/* Node */}
                        <div
                          className={`
                            relative flex items-center border-2 rounded-lg p-3 min-w-[80px] transition-all duration-500
                            ${node.isBeingProcessed
                              ? 'border-yellow-500 bg-yellow-100 text-yellow-800 scale-110 shadow-lg'
                              : node.isHighlighted
                              ? 'border-blue-500 bg-blue-100 text-blue-800 shadow-md'
                              : 'border-gray-300 bg-white text-gray-700'
                            }
                          `}
                        >
                          {/* Head marker */}
                          {node.isHead && (
                            <Badge 
                              variant="outline" 
                              className="absolute -top-6 left-0 text-xs border-green-500 text-green-600 bg-green-50"
                            >
                              HEAD
                            </Badge>
                          )}
                          
                          {/* Tail marker */}
                          {node.isTail && (
                            <Badge 
                              variant="outline" 
                              className="absolute -top-6 right-0 text-xs border-red-500 text-red-600 bg-red-50"
                            >
                              TAIL
                            </Badge>
                          )}

                          <div className="text-center">
                            <div className="text-lg font-bold">{node.value}</div>
                            <div className="text-xs text-gray-500">Index: {index}</div>
                          </div>
                        </div>

                        {/* Arrow to next node */}
                        {node.next && (
                          <div className="flex items-center mx-2">
                            <ArrowRight className="w-6 h-6 text-gray-400" />
                          </div>
                        )}

                        {/* NULL indicator for last node */}
                        {!node.next && (
                          <div className="flex items-center mx-2">
                            <ArrowRight className="w-6 h-6 text-gray-400" />
                            <div className="text-gray-500 font-mono ml-2">NULL</div>
                          </div>
                        )}
                      </div>
                    )

                    current = current.next
                    index++
                  }

                  return nodes
                })()
              )}
            </div>
          </div>

          {/* Current Operation */}
          {currentOperation && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="font-medium text-blue-800">Current Operation:</div>
              <div className="text-blue-700 mt-1">{currentOperation}</div>
            </div>
          )}

          {/* Operation Result */}
          {operationResult && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="font-medium text-green-800">Result:</div>
              <div className="text-green-700 mt-1">{operationResult}</div>
            </div>
          )}

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Operation Selection */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Operation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <select
                  value={operation}
                  onChange={(e) => setOperation(e.target.value)}
                  className="w-full p-2 border rounded"
                  disabled={isPlaying}
                >
                  <option value="insert-beginning">Insert at Beginning</option>
                  <option value="insert-end">Insert at End</option>
                  <option value="delete">Delete by Value</option>
                  <option value="search">Search for Value</option>
                  <option value="reverse">Reverse List</option>
                </select>
                <Button 
                  onClick={executeOperation} 
                  disabled={isPlaying}
                  className="w-full"
                >
                  {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                  Execute Operation
                </Button>
              </CardContent>
            </Card>

            {/* Input Values */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Input Values</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {(operation === "insert-beginning" || operation === "insert-end" || operation === "delete") && (
                  <Input
                    placeholder="Enter value"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={isPlaying}
                    type="number"
                  />
                )}
                {operation === "search" && (
                  <Input
                    placeholder="Search value"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    disabled={isPlaying}
                    type="number"
                  />
                )}
                <div className="text-xs text-gray-500">
                  {operation === "insert-beginning" && "Value to insert at the beginning"}
                  {operation === "insert-end" && "Value to insert at the end"}
                  {operation === "delete" && "Value to delete from the list"}
                  {operation === "search" && "Value to search for in the list"}
                  {operation === "reverse" && "No input needed - reverses entire list"}
                </div>
              </CardContent>
            </Card>

            {/* Speed & Reset */}
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
                  onClick={resetList} 
                  disabled={isPlaying}
                  className="w-full"
                  variant="outline"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset List
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Custom List Input */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Create Custom List</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input
                placeholder="Enter numbers separated by commas (e.g., 1,2,3,4,5)"
                disabled={isPlaying}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const input = e.currentTarget.value
                    const newValues = input.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n))
                    if (newValues.length > 0) {
                      initialValues.splice(0, initialValues.length, ...newValues)
                      resetList()
                      e.currentTarget.value = ''
                    }
                  }
                }}
              />
              <div className="text-xs text-gray-500">
                Press Enter to create a new list. Example: 10,20,30,40
              </div>
            </CardContent>
          </Card>

          {/* Complexity Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Operation Complexities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><strong>Insert at Beginning:</strong> O(1) - Direct head update</div>
                  <div><strong>Insert at End:</strong> O(n) - Must traverse to tail</div>
                  <div><strong>Delete by Value:</strong> O(n) - May need to search entire list</div>
                  <div><strong>Search:</strong> O(n) - Linear search through list</div>
                  <div><strong>Reverse:</strong> O(n) - Single pass with pointer manipulation</div>
                  <div className="text-xs text-gray-600 mt-2">
                    n = number of nodes in the list
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Concepts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><strong>Head:</strong> First node in the list</div>
                  <div><strong>Tail:</strong> Last node (points to NULL)</div>
                  <div><strong>Node:</strong> Contains data and pointer to next</div>
                  <div><strong>NULL:</strong> End of list indicator</div>
                  <div><strong>Traversal:</strong> Following next pointers</div>
                  <div className="text-xs text-gray-600 mt-2">
                    Dynamic size, sequential access, efficient insertion/deletion
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 