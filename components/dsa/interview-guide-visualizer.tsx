"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Target, Lightbulb, Code, CheckCircle } from "lucide-react"

const InterviewGuideVisualizer: React.FC = () => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set([
    'framework', 'easy', 'medium', 'hard', 'example'
  ]))

  const toggleSection = (section: string) => {
    const newOpenSections = new Set(openSections)
    if (newOpenSections.has(section)) {
      newOpenSections.delete(section)
    } else {
      newOpenSections.add(section)
    }
    setOpenSections(newOpenSections)
  }

  const FrameworkSection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-400 mb-2">The U.P.E.R. Framework</h2>
        <p className="text-slate-300">A step-by-step method to approach ANY coding problem</p>
      </div>
      
      <div className="grid gap-6">
        {[
          {
            letter: "U",
            title: "Understand & Clarify",
            icon: <Target className="w-6 h-6" />,
            description: "Restate the problem, clarify inputs/outputs, identify constraints & edge cases",
            details: [
              "Restate the problem in your own words",
              "Clarify input/output formats",
              "Ask about constraints (array size, number ranges)",
              "Identify edge cases (empty input, duplicates, etc.)"
            ]
          },
          {
            letter: "P",
            title: "Plan & Strategize",
            icon: <Lightbulb className="w-6 h-6" />,
            description: "Start with brute-force, then optimize using the right data structure",
            details: [
              "Start with the most obvious, simplest solution",
              "Analyze time and space complexity",
              "Identify bottlenecks and optimization opportunities",
              "Choose the right data structure from the cheat sheet"
            ]
          },
          {
            letter: "E",
            title: "Execute (Implement)",
            icon: <Code className="w-6 h-6" />,
            description: "Write clean, modular code with good naming conventions",
            details: [
              "Talk as you code, explaining each part",
              "Use clean, descriptive variable names",
              "Write modular code with helper functions",
              "Implement your optimized solution"
            ]
          },
          {
            letter: "R",
            title: "Review & Refactor",
            icon: <CheckCircle className="w-6 h-6" />,
            description: "Test with examples, verify complexity, and refactor if needed",
            details: [
              "Dry run with a simple example and edge case",
              "Test your solution mentally",
              "Confirm final time and space complexity",
              "Refactor for readability if possible"
            ]
          }
        ].map((step, index) => (
          <Card key={step.letter} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {step.letter}
                </div>
                {step.icon}
                <span className="text-blue-400">{step.title}</span>
              </CardTitle>
              <p className="text-slate-300 ml-16">{step.description}</p>
            </CardHeader>
            <CardContent className="ml-16">
              <ul className="space-y-2">
                {step.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const DataStructureCard = ({ title, level, timeComplexity, spaceComplexity, keywords, description, whenToUse, pros, cons }: {
    title: string
    level: 'Easy' | 'Medium' | 'Hard'
    timeComplexity: string
    spaceComplexity: string
    keywords: string[]
    description: string
    whenToUse: string[]
    pros: string[]
    cons: string[]
  }) => {
    const levelColors = {
      Easy: 'bg-green-500',
      Medium: 'bg-yellow-500', 
      Hard: 'bg-red-500'
    }

    return (
      <Card className="bg-slate-800 border-slate-700 h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-blue-400">{title}</CardTitle>
            <Badge className={`${levelColors[level]} text-white`}>
              {level}
            </Badge>
          </div>
          <p className="text-sm text-slate-300">{description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-300 mb-1">Time Complexity</h4>
              <Badge variant="outline" className="text-xs">{timeComplexity}</Badge>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-300 mb-1">Space Complexity</h4>
              <Badge variant="outline" className="text-xs">{spaceComplexity}</Badge>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-2">Keywords</h4>
            <div className="flex flex-wrap gap-1">
              {keywords.map((keyword, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-2">When to Use</h4>
            <ul className="space-y-1">
              {whenToUse.map((use, idx) => (
                <li key={idx} className="text-xs text-slate-400 flex items-start gap-1">
                  <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                  {use}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-green-400 mb-2">Pros</h4>
              <ul className="space-y-1">
                {pros.map((pro, idx) => (
                  <li key={idx} className="text-xs text-slate-400 flex items-start gap-1">
                    <div className="w-1 h-1 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-red-400 mb-2">Cons</h4>
              <ul className="space-y-1">
                {cons.map((con, idx) => (
                  <li key={idx} className="text-xs text-slate-400 flex items-start gap-1">
                    <div className="w-1 h-1 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const ExampleSection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-400 mb-2">Example Walkthrough</h2>
        <p className="text-slate-300">Applying the U.P.E.R. Framework to "Two Sum"</p>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl text-blue-400">Problem: Two Sum</CardTitle>
          <p className="text-slate-300">
            Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-blue-400 mb-2">U - Understand</h3>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>• Restate: "Find two different indices whose values sum to target"</li>
                <li>• Input: Array of integers, target integer</li>
                <li>• Output: Array with two indices</li>
                <li>• Constraints: Exactly one solution exists, can't use same element twice</li>
              </ul>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-semibold text-yellow-400 mb-2">P - Plan</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-slate-300">Brute Force:</h4>
                  <p className="text-sm text-slate-400">Nested loop to check every pair. O(n²) time, O(1) space.</p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-300">Optimized:</h4>
                  <p className="text-sm text-slate-400">Use Hash Map to store seen numbers. O(n) time, O(n) space.</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-green-400 mb-2">E - Execute</h3>
              <div className="bg-slate-900 p-4 rounded-lg">
                <pre className="text-sm text-slate-300 overflow-x-auto">
{`def two_sum(nums, target):
    seen_map = {}  # {value: index}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in seen_map:
            return [seen_map[complement], i]
        
        seen_map[num] = i
    
    return []`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-purple-400 mb-2">R - Review</h3>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>• Dry run: [2,7,11,15], target=9 → [0,1] ✓</li>
                <li>• Edge cases: [3,3], target=6 → [0,1] ✓</li>
                <li>• Final complexity: O(n) time, O(n) space ✓</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const easyDataStructures = [
    {
      title: "Array / String",
      level: "Easy" as const,
      timeComplexity: "Access: O(1), Search: O(n)",
      spaceComplexity: "O(1) - O(n)",
      keywords: ["sequence", "index", "fixed-size", "contiguous"],
      description: "Contiguous block of memory holding elements of the same type",
      whenToUse: [
        "Store sequence of items",
        "Need fast random access by index",
        "Fixed-size collection",
        "Two Pointers on sorted array",
        "Sliding Window problems"
      ],
      pros: ["Fast random access O(1)", "Cache-friendly", "Simple to use"],
      cons: ["Fixed size in some languages", "Slow insertion/deletion O(n)"]
    },
    {
      title: "Hash Map / Dictionary",
      level: "Easy" as const,
      timeComplexity: "All ops: O(1) avg",
      spaceComplexity: "O(n)",
      keywords: ["frequency", "duplicates", "lookup", "caching", "memoization"],
      description: "Stores key-value pairs using hash function for fast access",
      whenToUse: [
        "Count frequencies",
        "Find duplicates",
        "Fast lookups by key",
        "Optimize brute force solutions",
        "Caching/memoization"
      ],
      pros: ["Incredibly fast average case", "Flexible key types", "Dynamic size"],
      cons: ["Unordered", "Extra space overhead", "Worst case O(n)"]
    }
  ]

  const mediumDataStructures = [
    {
      title: "Linked List",
      level: "Medium" as const,
      timeComplexity: "Access: O(n), Insert/Delete: O(1)",
      spaceComplexity: "O(n)",
      keywords: ["dynamic size", "insertion", "deletion", "no random access"],
      description: "Sequence of nodes where each node points to the next",
      whenToUse: [
        "Unknown or changing input size",
        "Fast insertion/deletion needed",
        "No need for random access",
        "Fast & Slow pointers technique"
      ],
      pros: ["Dynamic size", "Fast insertion/deletion O(1)", "Memory efficient"],
      cons: ["No random access", "Extra memory for pointers", "Not cache-friendly"]
    },
    {
      title: "Stack (LIFO)",
      level: "Medium" as const,
      timeComplexity: "All ops: O(1)",
      spaceComplexity: "O(n)",
      keywords: ["LIFO", "parentheses", "undo", "backtracking", "next greater"],
      description: "Last-In, First-Out structure - add/remove from top only",
      whenToUse: [
        "LIFO behavior needed",
        "Parentheses matching",
        "Undo functionality",
        "Backtracking algorithms",
        "Next smaller/greater element"
      ],
      pros: ["Simple operations", "All O(1) operations", "Natural recursion support"],
      cons: ["Limited access pattern", "Can cause stack overflow"]
    },
    {
      title: "Queue (FIFO)",
      level: "Medium" as const,
      timeComplexity: "All ops: O(1)",
      spaceComplexity: "O(n)",
      keywords: ["FIFO", "BFS", "level-order", "processing order"],
      description: "First-In, First-Out structure - add to back, remove from front",
      whenToUse: [
        "FIFO behavior needed",
        "Breadth-First Search (BFS)",
        "Level-order traversal",
        "Process items in order received"
      ],
      pros: ["Fair processing order", "All O(1) operations", "Perfect for BFS"],
      cons: ["Limited access pattern", "Memory overhead"]
    }
  ]

  const hardDataStructures = [
    {
      title: "Binary Search Tree",
      level: "Hard" as const,
      timeComplexity: "All ops: O(log n) balanced",
      spaceComplexity: "O(n)",
      keywords: ["sorted", "k-th element", "successor", "range queries"],
      description: "Tree where left descendants < node < right descendants",
      whenToUse: [
        "Data needs to stay sorted",
        "Find k-th smallest/largest",
        "Find successor/predecessor",
        "Range queries"
      ],
      pros: ["Keeps data sorted", "Fast search/insert/delete", "In-order gives sorted"],
      cons: ["Can become unbalanced O(n)", "More complex than arrays"]
    },
    {
      title: "Heap / Priority Queue",
      level: "Hard" as const,
      timeComplexity: "Find min/max: O(1), Insert/Delete: O(log n)",
      spaceComplexity: "O(n)",
      keywords: ["top K", "median", "priority", "scheduling"],
      description: "Tree satisfying heap property - parent always smaller/larger than children",
      whenToUse: [
        "Find top K elements",
        "Find median in stream",
        "Priority-based scheduling",
        "Dijkstra's algorithm"
      ],
      pros: ["Fast min/max access", "Efficient for priority queues", "Used in many algorithms"],
      cons: ["Not good for arbitrary search", "More complex than arrays"]
    },
    {
      title: "Graph",
      level: "Hard" as const,
      timeComplexity: "Varies by algorithm",
      spaceComplexity: "O(V + E)",
      keywords: ["network", "shortest path", "maze", "cycles", "dependencies"],
      description: "Collection of nodes (vertices) connected by edges",
      whenToUse: [
        "Network of connected things",
        "Find shortest path",
        "Navigate maze",
        "Detect cycles",
        "Topological sorting"
      ],
      pros: ["Models complex relationships", "Many powerful algorithms", "Flexible structure"],
      cons: ["Complex algorithms", "High space complexity", "Can be hard to visualize"]
    },
    {
      title: "Trie / Prefix Tree",
      level: "Hard" as const,
      timeComplexity: "Insert/Search: O(L) where L = word length",
      spaceComplexity: "O(ALPHABET_SIZE * N * M)",
      keywords: ["autocomplete", "prefix", "spell checker", "word search"],
      description: "Tree for storing strings where each node represents a character",
      whenToUse: [
        "Autocomplete features",
        "Spell checker",
        "Find words with common prefix",
        "Word search problems"
      ],
      pros: ["Fast prefix operations", "Memory efficient for shared prefixes", "Natural string operations"],
      cons: ["High memory overhead", "Complex implementation", "Limited to string operations"]
    }
  ]

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-slate-900 text-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          DSA Interview Cheat Sheet
        </h1>
        <p className="text-xl text-slate-300">
          Complete guide from problem-solving framework to data structures
        </p>
      </div>

      <Tabs defaultValue="framework" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800">
          <TabsTrigger value="framework">Framework</TabsTrigger>
          <TabsTrigger value="easy">Easy (Foundation)</TabsTrigger>
          <TabsTrigger value="medium">Medium (Linear)</TabsTrigger>
          <TabsTrigger value="hard">Hard (Complex)</TabsTrigger>
          <TabsTrigger value="example">Example</TabsTrigger>
        </TabsList>

        <TabsContent value="framework">
          <FrameworkSection />
        </TabsContent>

        <TabsContent value="easy">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-400 mb-2">Level: Easy (Foundational)</h2>
              <p className="text-slate-300">Master these first - they're the building blocks</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {easyDataStructures.map((ds, idx) => (
                <DataStructureCard key={idx} {...ds} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="medium">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">Level: Medium (Linear & Non-Linear)</h2>
              <p className="text-slate-300">Essential structures for most interview problems</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediumDataStructures.map((ds, idx) => (
                <DataStructureCard key={idx} {...ds} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hard">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-400 mb-2">Level: Hard (Hierarchical & Complex)</h2>
              <p className="text-slate-300">Advanced structures for complex problems</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {hardDataStructures.map((ds, idx) => (
                <DataStructureCard key={idx} {...ds} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="example">
          <ExampleSection />
        </TabsContent>
      </Tabs>

      <Card className="mt-8 bg-gradient-to-r from-blue-900 to-purple-900 border-blue-500">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-blue-400 mb-4">💡 Key Interview Tips</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Always start with brute force - shows you can solve it</li>
              <li>• Talk through your thought process out loud</li>
              <li>• Ask clarifying questions before coding</li>
              <li>• Test your solution with examples and edge cases</li>
            </ul>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Use the cheat sheet keywords to identify the right approach</li>
              <li>• Hash Map is often the key to optimizing O(n²) solutions</li>
              <li>• Practice the U.P.E.R. framework until it's second nature</li>
              <li>• Remember: the journey matters more than the destination</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default InterviewGuideVisualizer 