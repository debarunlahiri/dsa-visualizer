"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UnionFindNode {
  id: number
  parent: number
  rank: number
  size: number
}

class UnionFindDataStructure {
  nodes: UnionFindNode[]
  components: number

  constructor(n: number) {
    this.nodes = Array.from({ length: n }, (_, i) => ({
      id: i,
      parent: i,
      rank: 0,
      size: 1
    }))
    this.components = n
  }

  find(x: number): number {
    if (this.nodes[x].parent !== x) {
      // Path compression
      this.nodes[x].parent = this.find(this.nodes[x].parent)
    }
    return this.nodes[x].parent
  }

  union(x: number, y: number): boolean {
    const rootX = this.find(x)
    const rootY = this.find(y)

    if (rootX === rootY) return false

    // Union by rank
    if (this.nodes[rootX].rank < this.nodes[rootY].rank) {
      this.nodes[rootX].parent = rootY
      this.nodes[rootY].size += this.nodes[rootX].size
    } else if (this.nodes[rootX].rank > this.nodes[rootY].rank) {
      this.nodes[rootY].parent = rootX
      this.nodes[rootX].size += this.nodes[rootY].size
    } else {
      this.nodes[rootY].parent = rootX
      this.nodes[rootX].size += this.nodes[rootY].size
      this.nodes[rootX].rank += 1
    }

    this.components -= 1
    return true
  }

  connected(x: number, y: number): boolean {
    return this.find(x) === this.find(y)
  }

  getSize(x: number): number {
    return this.nodes[this.find(x)].size
  }

  getComponents(): { [root: number]: number[] } {
    const components: { [root: number]: number[] } = {}
    
    for (let i = 0; i < this.nodes.length; i++) {
      const root = this.find(i)
      if (!components[root]) {
        components[root] = []
      }
      components[root].push(i)
    }
    
    return components
  }
}

interface NodeVisualizationProps {
  node: UnionFindNode
  isRoot: boolean
  isHighlighted: boolean
  children: number[]
}

const NodeVisualization: React.FC<NodeVisualizationProps> = ({
  node,
  isRoot,
  isHighlighted,
  children
}) => {
  const nodeColor = isHighlighted 
    ? 'bg-yellow-200 border-yellow-500' 
    : isRoot 
    ? 'bg-blue-200 border-blue-500' 
    : 'bg-gray-200 border-gray-400'

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className={`w-12 h-12 rounded-full border-2 flex flex-col items-center justify-center text-xs font-bold ${nodeColor}`}>
        <div>{node.id}</div>
        {isRoot && (
          <div className="text-xs text-blue-600">
            S:{node.size}
          </div>
        )}
      </div>
      
      {children.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center">
          {children.map(childId => (
            <div key={childId} className="flex flex-col items-center">
              <div className="w-px h-6 bg-gray-400"></div>
              <div className="w-10 h-10 rounded-full border-2 border-gray-400 bg-gray-100 flex items-center justify-center text-sm font-bold">
                {childId}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function UnionFindVisualizer() {
  const [unionFind, setUnionFind] = useState(new UnionFindDataStructure(8))
  const [numNodes, setNumNodes] = useState(8)
  const [element1, setElement1] = useState('')
  const [element2, setElement2] = useState('')
  const [findElement, setFindElement] = useState('')
  const [highlightedNodes, setHighlightedNodes] = useState<Set<number>>(new Set())
  const [message, setMessage] = useState('')
  const [operations, setOperations] = useState<string[]>([])

  useEffect(() => {
    setUnionFind(new UnionFindDataStructure(numNodes))
    setOperations([])
  }, [numNodes])

  const showMessage = useCallback((msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }, [])

  const addOperation = useCallback((operation: string) => {
    setOperations(prev => [...prev.slice(-4), operation])
  }, [])

  const handleUnion = () => {
    const el1 = parseInt(element1)
    const el2 = parseInt(element2)
    
    if (isNaN(el1) || isNaN(el2) || el1 < 0 || el1 >= numNodes || el2 < 0 || el2 >= numNodes) {
      showMessage('Please enter valid element numbers')
      return
    }

    const newUF = new UnionFindDataStructure(numNodes)
    // Copy current state
    unionFind.nodes.forEach((node, i) => {
      newUF.nodes[i] = { ...node }
    })
    newUF.components = unionFind.components

    const wasConnected = newUF.connected(el1, el2)
    const success = newUF.union(el1, el2)
    
    if (success) {
      showMessage(`Successfully united ${el1} and ${el2}`)
      addOperation(`Union(${el1}, ${el2})`)
      
      // Highlight the connected component
      const root = newUF.find(el1)
      const component = Object.values(newUF.getComponents()).find(comp => comp.includes(root))
      setHighlightedNodes(new Set(component))
      
      setTimeout(() => setHighlightedNodes(new Set()), 2000)
    } else {
      showMessage(`${el1} and ${el2} are already connected`)
    }
    
    setUnionFind(newUF)
    setElement1('')
    setElement2('')
  }

  const handleFind = () => {
    const el = parseInt(findElement)
    
    if (isNaN(el) || el < 0 || el >= numNodes) {
      showMessage('Please enter a valid element number')
      return
    }

    const root = unionFind.find(el)
    const size = unionFind.getSize(el)
    
    showMessage(`Element ${el} belongs to set with root ${root} (size: ${size})`)
    addOperation(`Find(${el}) = ${root}`)
    
    // Highlight the path to root
    const pathNodes = new Set<number>()
    let current = el
    while (current !== unionFind.nodes[current].parent) {
      pathNodes.add(current)
      current = unionFind.nodes[current].parent
    }
    pathNodes.add(current) // Add root
    
    setHighlightedNodes(pathNodes)
    setTimeout(() => setHighlightedNodes(new Set()), 2000)
    
    setFindElement('')
  }

  const handleConnected = () => {
    const el1 = parseInt(element1)
    const el2 = parseInt(element2)
    
    if (isNaN(el1) || isNaN(el2) || el1 < 0 || el1 >= numNodes || el2 < 0 || el2 >= numNodes) {
      showMessage('Please enter valid element numbers')
      return
    }

    const connected = unionFind.connected(el1, el2)
    showMessage(`${el1} and ${el2} are ${connected ? 'connected' : 'not connected'}`)
    addOperation(`Connected(${el1}, ${el2}) = ${connected}`)
    
    if (connected) {
      const root = unionFind.find(el1)
      const component = Object.values(unionFind.getComponents()).find(comp => comp.includes(root))
      setHighlightedNodes(new Set(component))
      setTimeout(() => setHighlightedNodes(new Set()), 2000)
    }
    
    setElement1('')
    setElement2('')
  }

  const reset = () => {
    setUnionFind(new UnionFindDataStructure(numNodes))
    setHighlightedNodes(new Set())
    setOperations([])
    showMessage('Reset to initial state')
  }

  const quickDemo = () => {
    const newUF = new UnionFindDataStructure(numNodes)
    
    // Demo connections
    const connections = [[0, 1], [2, 3], [1, 4], [5, 6]]
    connections.forEach(([a, b]) => {
      newUF.union(a, b)
    })
    
    setUnionFind(newUF)
    const ops = connections.map(([a, b]) => `Union(${a}, ${b})`)
    setOperations(ops)
    showMessage('Quick demo loaded!')
  }

  const components = unionFind.getComponents()
  const componentList = Object.entries(components).map(([root, members]) => ({
    root: parseInt(root),
    members,
    size: members.length
  }))

  // Build tree structure for visualization
  const buildTreeStructure = () => {
    const trees: { [root: number]: { node: UnionFindNode, children: number[] } } = {}
    
    Object.entries(components).forEach(([rootStr, members]) => {
      const root = parseInt(rootStr)
      const children = members.filter(m => m !== root)
      trees[root] = {
        node: unionFind.nodes[root],
        children
      }
    })
    
    return trees
  }

  const trees = buildTreeStructure()

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Union-Find (Disjoint Set Union) Visualizer</h2>
        <p className="text-gray-600">
          Union-Find efficiently tracks connected components and supports union and find operations.
        </p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Number of Elements</label>
              <Select value={numNodes.toString()} onValueChange={(v) => setNumNodes(parseInt(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 elements</SelectItem>
                  <SelectItem value="8">8 elements</SelectItem>
                  <SelectItem value="10">10 elements</SelectItem>
                  <SelectItem value="12">12 elements</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={reset} variant="outline" className="flex-1">
                Reset
              </Button>
              <Button onClick={quickDemo} variant="outline" className="flex-1">
                Quick Demo
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Operations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Element 1"
                value={element1}
                onChange={(e) => setElement1(e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="Element 2"
                value={element2}
                onChange={(e) => setElement2(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleUnion} className="flex-1">
                Union
              </Button>
              <Button onClick={handleConnected} className="flex-1">
                Connected?
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Element to find"
                value={findElement}
                onChange={(e) => setFindElement(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleFind}>
                Find Root
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Message */}
      {message && (
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-800 font-medium">{message}</p>
        </div>
      )}

      {/* Components Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Connected Components ({unionFind.components})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {componentList.map(({ root, members, size }) => (
              <div key={root} className="bg-gray-50 p-3 rounded-lg">
                <div className="font-semibold text-blue-800">Root: {root}</div>
                <div className="text-sm text-gray-600">Size: {size}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {members.map(member => (
                    <Badge 
                      key={member} 
                      variant={member === root ? "default" : "secondary"}
                      className={highlightedNodes.has(member) ? "bg-yellow-200" : ""}
                    >
                      {member}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Operations */}
      {operations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {operations.map((op, index) => (
                <div key={index} className="text-sm font-mono bg-gray-100 p-2 rounded">
                  {op}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tree Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tree Structure</CardTitle>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Blue circles = roots (with size)</p>
            <p>• Gray circles = children</p>
            <p>• Yellow = highlighted nodes</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-max p-4">
              <div className="flex flex-wrap gap-8 justify-center">
                {Object.entries(trees).map(([rootStr, { node, children }]) => {
                  const root = parseInt(rootStr)
                  return (
                    <NodeVisualization
                      key={root}
                      node={node}
                      isRoot={true}
                      isHighlighted={highlightedNodes.has(root)}
                      children={children}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parent Array Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Parent Array</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 bg-gray-100">Element</th>
                  {Array.from({ length: numNodes }, (_, i) => (
                    <th key={i} className="border p-2 bg-gray-100">{i}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-semibold">Parent</td>
                  {unionFind.nodes.map((node, i) => (
                    <td 
                      key={i} 
                      className={`border p-2 text-center ${
                        highlightedNodes.has(i) ? 'bg-yellow-100' : 
                        node.parent === i ? 'bg-blue-100' : 'bg-white'
                      }`}
                    >
                      {node.parent}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Rank</td>
                  {unionFind.nodes.map((node, i) => (
                    <td key={i} className="border p-2 text-center text-gray-600">
                      {node.rank}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Complexity Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Time Complexity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Without Optimizations:</h4>
              <ul className="space-y-1 text-sm">
                <li><strong>Find:</strong> O(n) - might traverse entire chain</li>
                <li><strong>Union:</strong> O(n) - includes find operations</li>
                <li><strong>Space:</strong> O(n) - parent array</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">With Path Compression + Union by Rank:</h4>
              <ul className="space-y-1 text-sm">
                <li><strong>Find:</strong> O(α(n)) ≈ O(1) amortized</li>
                <li><strong>Union:</strong> O(α(n)) ≈ O(1) amortized</li>
                <li><strong>α(n):</strong> Inverse Ackermann function (practically constant)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 