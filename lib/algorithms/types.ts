import type React from "react"

export interface Algorithm {
  id: string
  title: string
  component: React.ComponentType
  explanation?: React.ReactNode | any
  codeSnippets?: Record<string, string> | CodeSnippet[]
}

export interface AlgorithmCategory {
  id: string
  title: string
  algorithms: Algorithm[]
}

export interface AlgorithmExplanation {
  introduction: React.ReactNode
  concepts: Array<{
    title: string
    content: React.ReactNode
  }>
}

export interface CodeSnippet {
  title: string
  language: string
  code: string
} 