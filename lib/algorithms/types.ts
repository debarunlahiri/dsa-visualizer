import type React from "react"

export interface Algorithm {
  id: string
  title: string
  component: React.ComponentType
  explanation?: React.ReactNode
  codeSnippets?: Record<string, string>
}

export interface AlgorithmCategory {
  id: string
  title: string
  algorithms: Algorithm[]
} 