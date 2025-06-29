"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface StackItem {
  value: string
  id: number
}

export default function StackVisualizer() {
  const [stack, setStack] = useState<StackItem[]>([])
  const [inputValue, setInputValue] = useState('')
  const [currentAction, setCurrentAction] = useState('')
  const [lastAction, setLastAction] = useState('')
  const [nextId, setNextId] = useState(1)

  const push = () => {
    if (inputValue.trim()) {
      const newItem: StackItem = {
        value: inputValue.trim(),
        id: nextId
      }
      setStack(prev => [...prev, newItem])
      setLastAction(`Pushed "${inputValue}" onto stack`)
      setCurrentAction('push')
      setInputValue('')
      setNextId(prev => prev + 1)
      
      // Clear animation after delay
      setTimeout(() => setCurrentAction(''), 500)
    }
  }

  const pop = () => {
    if (stack.length > 0) {
      const poppedItem = stack[stack.length - 1]
      setStack(prev => prev.slice(0, -1))
      setLastAction(`Popped "${poppedItem.value}" from stack`)
      setCurrentAction('pop')
      
      // Clear animation after delay
      setTimeout(() => setCurrentAction(''), 500)
    } else {
      setLastAction('Stack is empty! Cannot pop.')
    }
  }

  const peek = () => {
    if (stack.length > 0) {
      const topItem = stack[stack.length - 1]
      setLastAction(`Top item is: "${topItem.value}"`)
      setCurrentAction('peek')
      
      // Clear animation after delay
      setTimeout(() => setCurrentAction(''), 500)
    } else {
      setLastAction('Stack is empty! Nothing to peek at.')
    }
  }

  const clear = () => {
    setStack([])
    setLastAction('Stack cleared')
    setCurrentAction('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      push()
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Stack Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter item to push..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={push} disabled={!inputValue.trim()}>
              Push
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={pop} variant="destructive" disabled={stack.length === 0}>
              Pop
            </Button>
            <Button onClick={peek} variant="outline" disabled={stack.length === 0}>
              Peek
            </Button>
            <Button onClick={clear} variant="secondary" disabled={stack.length === 0}>
              Clear All
            </Button>
          </div>
          
          {lastAction && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                {lastAction}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stack Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Stack Visualization
            <Badge variant="outline">
              Size: {stack.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-2">
            {/* Stack items - rendered top to bottom */}
            <div className="flex flex-col-reverse space-y-reverse space-y-2 min-h-[200px] justify-end">
              {stack.map((item, index) => {
                const isTop = index === stack.length - 1
                const isAnimating = currentAction && isTop
                
                return (
                  <div
                    key={item.id}
                    className={`
                      relative w-32 h-12 bg-blue-500 text-white rounded-lg
                      flex items-center justify-center font-semibold
                      border-2 border-blue-600 shadow-lg
                      transition-all duration-300 ease-in-out
                      ${isTop ? 'ring-2 ring-yellow-400' : ''}
                      ${isAnimating && currentAction === 'push' ? 'scale-110 bg-green-500' : ''}
                      ${isAnimating && currentAction === 'pop' ? 'scale-90 bg-red-500 opacity-50' : ''}
                      ${isAnimating && currentAction === 'peek' ? 'scale-105 bg-yellow-500' : ''}
                    `}
                  >
                    {item.value}
                    {isTop && (
                      <div className="absolute -top-8 text-xs font-bold text-yellow-600 dark:text-yellow-400">
                        TOP
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            
            {/* Base of stack */}
            <div className="w-40 h-2 bg-gray-400 rounded-full"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Stack Base</p>
            
            {/* Empty state */}
            {stack.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <p className="text-lg font-medium">Stack is empty</p>
                <p className="text-sm">Add items using the Push button above</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stack Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Stack Rules (LIFO - Last In, First Out)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600 dark:text-green-400">✅ What you CAN do:</h4>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Push items to the TOP only</li>
                <li>• Pop items from the TOP only</li>
                <li>• Peek at the TOP item</li>
                <li>• Check if stack is empty</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600 dark:text-red-400">❌ What you CANNOT do:</h4>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Access items in the middle</li>
                <li>• Insert items anywhere but top</li>
                <li>• Remove items from the bottom</li>
                <li>• Pop from an empty stack</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Try These Examples!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => {
                setStack([])
                const items = ['🍎', '🍌', '🍊']
                items.forEach((item, index) => {
                  setTimeout(() => {
                    setStack(prev => [...prev, { value: item, id: nextId + index }])
                    setLastAction(`Pushed "${item}"`)
                  }, index * 500)
                })
                setNextId(prev => prev + 3)
              }}
              variant="outline"
              className="h-auto p-4 flex flex-col"
            >
              <span className="font-semibold">🍎 Fruit Stack</span>
              <span className="text-sm text-gray-600">Add fruits to stack</span>
            </Button>
            
            <Button 
              onClick={() => {
                setStack([])
                const items = ['📚', '📖', '📝']
                items.forEach((item, index) => {
                  setTimeout(() => {
                    setStack(prev => [...prev, { value: item, id: nextId + index }])
                    setLastAction(`Pushed "${item}"`)
                  }, index * 500)
                })
                setNextId(prev => prev + 3)
              }}
              variant="outline"
              className="h-auto p-4 flex flex-col"
            >
              <span className="font-semibold">📚 Book Stack</span>
              <span className="text-sm text-gray-600">Stack some books</span>
            </Button>
            
            <Button 
              onClick={() => {
                setStack([])
                const items = ['🍪', '🧁', '🍰']
                items.forEach((item, index) => {
                  setTimeout(() => {
                    setStack(prev => [...prev, { value: item, id: nextId + index }])
                    setLastAction(`Pushed "${item}"`)
                  }, index * 500)
                })
                setNextId(prev => prev + 3)
              }}
              variant="outline"
              className="h-auto p-4 flex flex-col"
            >
              <span className="font-semibold">🍪 Dessert Stack</span>
              <span className="text-sm text-gray-600">Stack sweet treats</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 