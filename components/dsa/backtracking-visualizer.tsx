"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const BacktrackingVisualizer = () => {
  const [currentProblem, setCurrentProblem] = useState<'queens' | 'subsets'>('queens')
  const [board, setBoard] = useState<number[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [solutions, setSolutions] = useState<number[][]>([])
  const [currentStep, setCurrentStep] = useState('')
  const [subsetTarget, setSubsetTarget] = useState(5)
  const [subsetNumbers] = useState([1, 2, 3, 4])
  const [foundSubsets, setFoundSubsets] = useState<number[][]>([])

  // N-Queens solver with visualization
  const solveNQueens = async (n: number) => {
    setIsAnimating(true)
    setSolutions([])
    setBoard(new Array(n).fill(-1))
    setCurrentStep('Starting N-Queens solver...')
    
    const allSolutions: number[][] = []
    
    const isSafe = (board: number[], row: number, col: number): boolean => {
      for (let i = 0; i < row; i++) {
        if (board[i] === col || Math.abs(board[i] - col) === Math.abs(i - row)) {
          return false
        }
      }
      return true
    }
    
    const backtrack = async (currentBoard: number[], row: number): Promise<void> => {
      if (row === n) {
        allSolutions.push([...currentBoard])
        setSolutions([...allSolutions])
        setCurrentStep(`Found solution ${allSolutions.length}!`)
        await new Promise(resolve => setTimeout(resolve, 1000))
        return
      }
      
      for (let col = 0; col < n; col++) {
        if (isSafe(currentBoard, row, col)) {
          // Make choice
          currentBoard[row] = col
          setBoard([...currentBoard])
          setCurrentStep(`Placing queen at row ${row}, column ${col}`)
          await new Promise(resolve => setTimeout(resolve, 500))
          
          // Recurse
          await backtrack(currentBoard, row + 1)
          
          // Undo choice (backtrack)
          currentBoard[row] = -1
          setBoard([...currentBoard])
          setCurrentStep(`Backtracking from row ${row}, column ${col}`)
          await new Promise(resolve => setTimeout(resolve, 300))
        }
      }
    }
    
    await backtrack(new Array(n).fill(-1), 0)
    setIsAnimating(false)
    setCurrentStep(`Completed! Found ${allSolutions.length} solutions.`)
  }

  // Subset sum solver
  const solveSubsetSum = async () => {
    setIsAnimating(true)
    setFoundSubsets([])
    setCurrentStep('Finding subsets that sum to target...')
    
    const allSubsets: number[][] = []
    
    const backtrack = async (index: number, currentSubset: number[], currentSum: number): Promise<void> => {
      if (currentSum === subsetTarget) {
        allSubsets.push([...currentSubset])
        setFoundSubsets([...allSubsets])
        setCurrentStep(`Found subset: [${currentSubset.join(', ')}] = ${currentSum}`)
        await new Promise(resolve => setTimeout(resolve, 800))
        return
      }
      
      if (index >= subsetNumbers.length || currentSum > subsetTarget) {
        return
      }
      
      // Include current number
      currentSubset.push(subsetNumbers[index])
      setCurrentStep(`Trying with ${subsetNumbers[index]}: [${currentSubset.join(', ')}] = ${currentSum + subsetNumbers[index]}`)
      await new Promise(resolve => setTimeout(resolve, 400))
      
      await backtrack(index + 1, currentSubset, currentSum + subsetNumbers[index])
      
      // Backtrack - exclude current number
      currentSubset.pop()
      setCurrentStep(`Backtracking - removing ${subsetNumbers[index]}`)
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Try without current number
      await backtrack(index + 1, currentSubset, currentSum)
    }
    
    await backtrack(0, [], 0)
    setIsAnimating(false)
    setCurrentStep(`Completed! Found ${allSubsets.length} subsets.`)
  }

  const renderChessBoard = (size: number, queensPositions: number[]) => {
    return (
      <div className="grid gap-1 mx-auto" style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, maxWidth: '300px' }}>
        {Array.from({ length: size * size }, (_, index) => {
          const row = Math.floor(index / size)
          const col = index % size
          const isQueen = queensPositions[row] === col
          const isBlack = (row + col) % 2 === 1
          
          return (
            <div
              key={index}
              className={`
                w-8 h-8 flex items-center justify-center text-lg font-bold
                ${isBlack ? 'bg-gray-600 dark:bg-gray-700' : 'bg-gray-200 dark:bg-gray-300'}
                ${isQueen ? 'text-yellow-400' : 'text-gray-400 dark:text-gray-600'}
              `}
            >
              {isQueen ? '♛' : ''}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔍 Backtracking Algorithm Visualizer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Problem Selection */}
          <div className="flex gap-2">
            <Button 
              onClick={() => setCurrentProblem('queens')}
              variant={currentProblem === 'queens' ? 'default' : 'outline'}
            >
              👑 N-Queens Problem
            </Button>
            <Button 
              onClick={() => setCurrentProblem('subsets')}
              variant={currentProblem === 'subsets' ? 'default' : 'outline'}
            >
              🎯 Subset Sum Problem
            </Button>
          </div>

          {/* Current Step Display */}
          {currentStep && (
            <div className="bg-muted border p-3 rounded-lg">
              <p className="font-medium">{currentStep}</p>
            </div>
          )}

          {/* N-Queens Problem */}
          {currentProblem === 'queens' && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">👑 N-Queens Problem</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Place N queens on an N×N chessboard so that no two queens attack each other.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => solveNQueens(4)} 
                      disabled={isAnimating}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {isAnimating ? 'Solving...' : 'Solve 4-Queens'}
                    </Button>
                  </div>

                  {board.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Current Board State:</h4>
                      {renderChessBoard(4, board)}
                    </div>
                  )}

                  {solutions.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Solutions Found: {solutions.length}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {solutions.map((solution, index) => (
                          <div key={index} className="border rounded p-3">
                            <h5 className="font-medium mb-2">Solution {index + 1}:</h5>
                            {renderChessBoard(4, solution)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Subset Sum Problem */}
          {currentProblem === 'subsets' && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Subset Sum Problem</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Find all subsets of numbers that add up to the target sum.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span>Numbers: [{subsetNumbers.join(', ')}]</span>
                    <span>Target: {subsetTarget}</span>
                  </div>

                  <Button 
                    onClick={solveSubsetSum} 
                    disabled={isAnimating}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isAnimating ? 'Finding...' : 'Find Subsets'}
                  </Button>

                  {foundSubsets.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Subsets Found: {foundSubsets.length}</h4>
                      <div className="flex flex-wrap gap-2">
                        {foundSubsets.map((subset, index) => (
                          <Badge key={index} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-3 py-1">
                            [{subset.join(', ')}] = {subset.reduce((a, b) => a + b, 0)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Key Concepts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🔑 Key Backtracking Concepts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400">The Process:</h4>
                  <ul className="text-sm space-y-1">
                    <li>1. 🎯 Make a choice</li>
                    <li>2. 🚀 Explore consequences</li>
                    <li>3. 🚫 If it leads to failure, undo</li>
                    <li>4. 🔄 Try the next option</li>
                    <li>5. ✅ Repeat until solved</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400">When to Use:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• 🧩 Constraint satisfaction problems</li>
                    <li>• 🎲 Finding all combinations</li>
                    <li>• 🎯 Optimization problems</li>
                    <li>• 🌟 Puzzle solving</li>
                    <li>• 🎮 Game AI decisions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

export default BacktrackingVisualizer 