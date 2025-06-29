"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface QueueItem {
  value: string
  id: number
}

export default function QueueVisualizer() {
  const [queue, setQueue] = useState<QueueItem[]>([])
  const [inputValue, setInputValue] = useState('')
  const [currentAction, setCurrentAction] = useState('')
  const [lastAction, setLastAction] = useState('')
  const [nextId, setNextId] = useState(1)

  const enqueue = () => {
    if (inputValue.trim()) {
      const newItem: QueueItem = {
        value: inputValue.trim(),
        id: nextId
      }
      setQueue(prev => [...prev, newItem])
      setLastAction(`"${inputValue}" joined the queue`)
      setCurrentAction('enqueue')
      setInputValue('')
      setNextId(prev => prev + 1)
      
      // Clear animation after delay
      setTimeout(() => setCurrentAction(''), 500)
    }
  }

  const dequeue = () => {
    if (queue.length > 0) {
      const frontItem = queue[0]
      setQueue(prev => prev.slice(1))
      setLastAction(`"${frontItem.value}" was served and left the queue`)
      setCurrentAction('dequeue')
      
      // Clear animation after delay
      setTimeout(() => setCurrentAction(''), 500)
    } else {
      setLastAction('Queue is empty! Nobody to serve.')
    }
  }

  const front = () => {
    if (queue.length > 0) {
      const frontItem = queue[0]
      setLastAction(`Next in line: "${frontItem.value}"`)
      setCurrentAction('front')
      
      // Clear animation after delay
      setTimeout(() => setCurrentAction(''), 500)
    } else {
      setLastAction('Queue is empty! Nobody is waiting.')
    }
  }

  const clear = () => {
    setQueue([])
    setLastAction('Queue cleared - everyone went home!')
    setCurrentAction('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      enqueue()
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Queue Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter person to join queue..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={enqueue} disabled={!inputValue.trim()}>
              Join Queue (Enqueue)
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={dequeue} variant="destructive" disabled={queue.length === 0}>
              Serve Next (Dequeue)
            </Button>
            <Button onClick={front} variant="outline" disabled={queue.length === 0}>
              Check Front
            </Button>
            <Button onClick={clear} variant="secondary" disabled={queue.length === 0}>
              Clear Queue
            </Button>
          </div>
          
          {lastAction && (
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                {lastAction}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Queue Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Queue Visualization (First In, First Out)
            <Badge variant="outline">
              People in line: {queue.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Direction indicators */}
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-red-600 dark:text-red-400">
                ← FRONT (Exit here)
              </div>
              <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                REAR (Join here) →
              </div>
            </div>
            
            {/* Queue items */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-4">
              {queue.length === 0 ? (
                <div className="w-full text-center text-gray-500 dark:text-gray-400 py-8">
                  <p className="text-lg font-medium">Queue is empty</p>
                  <p className="text-sm">Add people to the queue using the button above</p>
                </div>
              ) : (
                queue.map((item, index) => {
                  const isFront = index === 0
                  const isRear = index === queue.length - 1
                  const isAnimating = currentAction && 
                    ((currentAction === 'dequeue' && isFront) ||
                     (currentAction === 'enqueue' && isRear) ||
                     (currentAction === 'front' && isFront))
                  
                  return (
                    <div key={item.id} className="flex flex-col items-center space-y-1">
                      <div
                        className={`
                          relative w-16 h-16 bg-blue-500 text-white rounded-full
                          flex items-center justify-center font-semibold text-sm
                          border-2 border-blue-600 shadow-lg
                          transition-all duration-300 ease-in-out
                          ${isFront ? 'ring-2 ring-red-400' : ''}
                          ${isRear ? 'ring-2 ring-blue-400' : ''}
                          ${isAnimating && currentAction === 'enqueue' ? 'scale-110 bg-green-500' : ''}
                          ${isAnimating && currentAction === 'dequeue' ? 'scale-90 bg-red-500 opacity-50' : ''}
                          ${isAnimating && currentAction === 'front' ? 'scale-105 bg-yellow-500' : ''}
                        `}
                      >
                        {item.value}
                      </div>
                      
                      {/* Position labels */}
                      <div className="text-xs font-medium">
                        {isFront && (
                          <span className="text-red-600 dark:text-red-400">FRONT</span>
                        )}
                        {isRear && queue.length > 1 && (
                          <span className="text-blue-600 dark:text-blue-400">REAR</span>
                        )}
                        {!isFront && !isRear && (
                          <span className="text-gray-500">#{index + 1}</span>
                        )}
                      </div>
                      
                      {/* Arrow to next person */}
                      {index < queue.length - 1 && (
                        <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-1">
                          <div className="text-gray-400">→</div>
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
            
            {/* Service counter */}
            {queue.length > 0 && (
              <div className="flex items-center space-x-4">
                <div className="w-24 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    SERVICE<br/>COUNTER
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  ← People get served here
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Queue Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Queue Rules (FIFO - First In, First Out)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600 dark:text-green-400">✅ Fair Queue Rules:</h4>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                <li>• New people join at the REAR (back)</li>
                <li>• People are served from the FRONT</li>
                <li>• First to arrive, first to be served</li>
                <li>• No cutting in line!</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600 dark:text-red-400">❌ Queue Don'ts:</h4>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Can't serve people from the middle</li>
                <li>• Can't join in the middle of the line</li>
                <li>• Can't serve from an empty queue</li>
                <li>• Can't skip ahead in line</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Try These Queue Examples!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => {
                setQueue([])
                const customers = ['👨‍💼 John', '👩‍🎓 Sarah', '👴 Bob', '👧 Emma']
                customers.forEach((customer, index) => {
                  setTimeout(() => {
                    setQueue(prev => [...prev, { value: customer, id: nextId + index }])
                    setLastAction(`${customer} joined the queue`)
                  }, index * 600)
                })
                setNextId(prev => prev + 4)
              }}
              variant="outline"
              className="h-auto p-4 flex flex-col"
            >
              <span className="font-semibold">🏪 Store Queue</span>
              <span className="text-sm text-gray-600">Customers waiting to buy</span>
            </Button>
            
            <Button 
              onClick={() => {
                setQueue([])
                const students = ['📚 Alex', '✏️ Maya', '🎒 Sam', '📝 Luna']
                students.forEach((student, index) => {
                  setTimeout(() => {
                    setQueue(prev => [...prev, { value: student, id: nextId + index }])
                    setLastAction(`${student} joined lunch line`)
                  }, index * 600)
                })
                setNextId(prev => prev + 4)
              }}
              variant="outline"
              className="h-auto p-4 flex flex-col"
            >
              <span className="font-semibold">🍕 Lunch Line</span>
              <span className="text-sm text-gray-600">Students waiting for lunch</span>
            </Button>
            
            <Button 
              onClick={() => {
                setQueue([])
                const cars = ['🚗 Car1', '🚙 Car2', '🚕 Car3', '🚐 Car4']
                cars.forEach((car, index) => {
                  setTimeout(() => {
                    setQueue(prev => [...prev, { value: car, id: nextId + index }])
                    setLastAction(`${car} joined drive-through`)
                  }, index * 600)
                })
                setNextId(prev => prev + 4)
              }}
              variant="outline"
              className="h-auto p-4 flex flex-col"
            >
              <span className="font-semibold">🚗 Drive-Through</span>
              <span className="text-sm text-gray-600">Cars waiting for food</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 