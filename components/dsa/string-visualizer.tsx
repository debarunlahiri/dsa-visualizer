"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function StringVisualizer() {
  const [inputText, setInputText] = useState('racecar')
  const [result, setResult] = useState('')

  const checkPalindrome = () => {
    const cleaned = inputText.toLowerCase().replace(/[^a-z]/g, '')
    const reversed = cleaned.split('').reverse().join('')
    const isPalindrome = cleaned === reversed
    setResult(isPalindrome ? 'It\'s a palindrome! 🎉' : 'Not a palindrome')
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>String Algorithms - Playing with Words! 📝</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter text to check..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1"
            />
            <Button onClick={checkPalindrome}>
              Check Palindrome
            </Button>
          </div>
          
          {result && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="font-medium text-blue-800 dark:text-blue-200">
                {result}
              </p>
            </div>
          )}
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>A palindrome reads the same forwards and backwards!</p>
            <p>Try: "racecar", "madam", "A man a plan a canal Panama"</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 