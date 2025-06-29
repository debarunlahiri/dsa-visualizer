"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function RecursionVisualizer() {
  const [result, setResult] = useState('')

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recursion Visualizer - Russian Dolls! 🪆</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-lg">
              Recursion is like Russian dolls - each function call opens another smaller version!
            </p>
            <Button onClick={() => setResult('Understanding recursion!')}>
              Learn Recursion
            </Button>
            {result && (
              <p className="text-green-600 font-semibold">{result}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 