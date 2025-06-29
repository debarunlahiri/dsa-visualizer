"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TrieNode {
  children: Map<string, TrieNode>
  isEndOfWord: boolean
  id: string
}

class TrieDataStructure {
  root: TrieNode
  private nodeCounter: number

  constructor() {
    this.root = {
      children: new Map(),
      isEndOfWord: false,
      id: 'root'
    }
    this.nodeCounter = 0
  }

  insert(word: string): void {
    let current = this.root
    
    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, {
          children: new Map(),
          isEndOfWord: false,
          id: `node-${++this.nodeCounter}`
        })
      }
      current = current.children.get(char)!
    }
    
    current.isEndOfWord = true
  }

  search(word: string): boolean {
    let current = this.root
    
    for (const char of word) {
      if (!current.children.has(char)) {
        return false
      }
      current = current.children.get(char)!
    }
    
    return current.isEndOfWord
  }

  startsWith(prefix: string): boolean {
    let current = this.root
    
    for (const char of prefix) {
      if (!current.children.has(char)) {
        return false
      }
      current = current.children.get(char)!
    }
    
    return true
  }

  getAllWordsWithPrefix(prefix: string): string[] {
    let current = this.root
    
    // Navigate to the end of prefix
    for (const char of prefix) {
      if (!current.children.has(char)) {
        return []
      }
      current = current.children.get(char)!
    }
    
    // Collect all words from this point
    const words: string[] = []
    this.dfsCollectWords(current, prefix, words)
    return words
  }

  private dfsCollectWords(node: TrieNode, currentWord: string, words: string[]): void {
    if (node.isEndOfWord) {
      words.push(currentWord)
    }
    
    for (const [char, childNode] of node.children) {
      this.dfsCollectWords(childNode, currentWord + char, words)
    }
  }
}

interface TrieVisualizationProps {
  node: TrieNode
  char?: string
  level: number
  path: string
  highlightedPath?: string
  searchResult?: 'found' | 'not-found' | 'prefix'
}

const TrieVisualization: React.FC<TrieVisualizationProps> = ({ 
  node, 
  char, 
  level, 
  path, 
  highlightedPath = '',
  searchResult 
}) => {
  const isHighlighted = highlightedPath.startsWith(path) && highlightedPath.length > path.length
  const isExactMatch = highlightedPath === path
  const isEndOfWord = node.isEndOfWord

  const getNodeColor = () => {
    if (isExactMatch && searchResult === 'found') return 'bg-green-200 border-green-500'
    if (isExactMatch && searchResult === 'not-found') return 'bg-red-200 border-red-500'
    if (isExactMatch && searchResult === 'prefix') return 'bg-blue-200 border-blue-500'
    if (isHighlighted) return 'bg-yellow-100 border-yellow-400'
    if (isEndOfWord) return 'bg-purple-100 border-purple-400'
    return 'bg-gray-100 border-gray-300'
  }

  const children = Array.from(node.children.entries()).sort(([a], [b]) => a.localeCompare(b))

  return (
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm ${getNodeColor()}`}>
        {char || 'R'}
        {isEndOfWord && <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full"></span>}
      </div>
      
      {children.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-8 justify-center">
          {children.map(([childChar, childNode]) => (
            <div key={childChar} className="flex flex-col items-center">
              <div className="w-px h-8 bg-gray-300"></div>
              <TrieVisualization
                node={childNode}
                char={childChar}
                level={level + 1}
                path={path + childChar}
                highlightedPath={highlightedPath}
                searchResult={searchResult}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function TrieVisualizer() {
  const [trie, setTrie] = useState(new TrieDataStructure())
  const [inputWord, setInputWord] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const [prefixWord, setPrefixWord] = useState('')
  const [words, setWords] = useState<string[]>([])
  const [searchResult, setSearchResult] = useState<'found' | 'not-found' | 'prefix' | undefined>(undefined)
  const [highlightedPath, setHighlightedPath] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [message, setMessage] = useState('')

  const presetWords = ['cat', 'cats', 'car', 'card', 'care', 'careful', 'carry']

  useEffect(() => {
    // Initialize with preset words
    const newTrie = new TrieDataStructure()
    presetWords.forEach(word => {
      newTrie.insert(word)
    })
    setTrie(newTrie)
    setWords([...presetWords])
  }, [])

  const handleInsert = () => {
    if (inputWord.trim() && !words.includes(inputWord.trim().toLowerCase())) {
      const newTrie = new TrieDataStructure()
      const newWords = [...words, inputWord.trim().toLowerCase()]
      
      newWords.forEach(word => {
        newTrie.insert(word)
      })
      
      setTrie(newTrie)
      setWords(newWords)
      setMessage(`Added "${inputWord.trim()}" to the trie`)
      setInputWord('')
      
      setTimeout(() => setMessage(''), 2000)
    }
  }

  const handleSearch = () => {
    if (searchWord.trim()) {
      const found = trie.search(searchWord.trim().toLowerCase())
      setSearchResult(found ? 'found' : 'not-found')
      setHighlightedPath(searchWord.trim().toLowerCase())
      setMessage(found ? `"${searchWord.trim()}" found in trie!` : `"${searchWord.trim()}" not found`)
      
      setTimeout(() => {
        setSearchResult(undefined)
        setHighlightedPath('')
        setMessage('')
      }, 3000)
    }
  }

  const handlePrefix = () => {
    if (prefixWord.trim()) {
      const prefix = prefixWord.trim().toLowerCase()
      const hasPrefix = trie.startsWith(prefix)
      const prefixSuggestions = trie.getAllWordsWithPrefix(prefix)
      
      setSearchResult(hasPrefix ? 'prefix' : 'not-found')
      setHighlightedPath(prefix)
      setSuggestions(prefixSuggestions)
      setMessage(hasPrefix ? `Found ${prefixSuggestions.length} words with prefix "${prefix}"` : `No words start with "${prefix}"`)
      
      setTimeout(() => {
        setSearchResult(undefined)
        setHighlightedPath('')
        setSuggestions([])
        setMessage('')
      }, 5000)
    }
  }

  const clearTrie = () => {
    setTrie(new TrieDataStructure())
    setWords([])
    setMessage('Trie cleared')
    setTimeout(() => setMessage(''), 2000)
  }

  const resetToPreset = () => {
    const newTrie = new TrieDataStructure()
    presetWords.forEach(word => {
      newTrie.insert(word)
    })
    setTrie(newTrie)
    setWords([...presetWords])
    setMessage('Reset to preset words')
    setTimeout(() => setMessage(''), 2000)
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Trie (Prefix Tree) Visualizer</h2>
        <p className="text-gray-600">
          A trie is a tree data structure for storing strings. Each path from root to node represents a prefix.
        </p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Insert Word</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Enter word to insert"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
            />
            <Button onClick={handleInsert} disabled={!inputWord.trim()} className="w-full">
              Insert
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Search Word</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Enter word to search"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={!searchWord.trim()} className="w-full">
              Search
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Find Prefix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Enter prefix to find"
              value={prefixWord}
              onChange={(e) => setPrefixWord(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handlePrefix()}
            />
            <Button onClick={handlePrefix} disabled={!prefixWord.trim()} className="w-full">
              Find Prefix
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button onClick={resetToPreset} variant="outline">
          Reset to Preset
        </Button>
        <Button onClick={clearTrie} variant="outline">
          Clear Trie
        </Button>
      </div>

      {/* Message */}
      {message && (
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-800 font-medium">{message}</p>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Autocomplete Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <Badge key={index} variant="secondary">
                  {suggestion}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Words in Trie */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Words in Trie ({words.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {words.map((word, index) => (
              <Badge key={index} variant="outline">
                {word}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trie Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Trie Structure</CardTitle>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Purple dot = end of word</p>
            <p>• Yellow = highlighted path</p>
            <p>• Green = word found</p>
            <p>• Red = word not found</p>
            <p>• Blue = prefix found</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-max p-4">
              <TrieVisualization
                node={trie.root}
                level={0}
                path=""
                highlightedPath={highlightedPath}
                searchResult={searchResult}
              />
            </div>
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
              <h4 className="font-semibold mb-2">Time Complexities:</h4>
              <ul className="space-y-1 text-sm">
                <li><strong>Insert:</strong> O(m) where m = word length</li>
                <li><strong>Search:</strong> O(m) where m = word length</li>
                <li><strong>StartsWith:</strong> O(m) where m = prefix length</li>
                <li><strong>Delete:</strong> O(m) where m = word length</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Space Complexity:</h4>
              <ul className="space-y-1 text-sm">
                <li><strong>Storage:</strong> O(ALPHABET_SIZE × N × M)</li>
                <li><strong>Where:</strong> N = number of words, M = average word length</li>
                <li><strong>Optimized:</strong> Use hashmap instead of array for sparse tries</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 