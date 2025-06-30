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
    <Collapsible open={openSections.has('framework')} onOpenChange={() => toggleSection('framework')}>
      <Card className="glass-card border border-white/10">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors">
            <CardTitle className="flex items-center justify-between text-xl text-blue-400">
              <div className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                The U.P.E.R. Framework Breakdown:
              </div>
              {openSections.has('framework') ? 
                <ChevronDown className="w-5 h-5" /> : 
                <ChevronRight className="w-5 h-5" />
              }
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="glass border border-white/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-300 mb-2 flex items-center gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">U</span>
                  Understand
                </h3>
                <p className="text-gray-300 mb-2">Clarify the problem, inputs, outputs, and constraints</p>
                <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
                  <li>What are the input types and constraints?</li>
                  <li>What should the function return?</li>
                  <li>Are there edge cases to consider?</li>
                  <li>Can I assume the input is valid?</li>
                </ul>
              </div>

              <div className="glass border border-white/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-300 mb-2 flex items-center gap-2">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">P</span>
                  Plan
                </h3>
                <p className="text-gray-300 mb-2">Start with brute force, then optimize using appropriate data structures</p>
                <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
                  <li>What's the brute force approach?</li>
                  <li>Can I use a hash map to optimize?</li>
                  <li>Is the data sorted? Can I use two pointers?</li>
                  <li>Do I need to explore all possibilities? Consider backtracking</li>
                </ul>
              </div>

              <div className="glass border border-white/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-300 mb-2 flex items-center gap-2">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">E</span>
                  Execute
                </h3>
                <p className="text-gray-300 mb-2">Implement clean, well-commented code</p>
                <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
                  <li>Start with the optimal approach you planned</li>
                  <li>Write clean, readable code</li>
                  <li>Add comments for complex logic</li>
                  <li>Use meaningful variable names</li>
                </ul>
              </div>

              <div className="glass border border-white/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-300 mb-2 flex items-center gap-2">
                  <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">R</span>
                  Review
                </h3>
                <p className="text-gray-300 mb-2">Test with examples, verify complexity, and refactor</p>
                <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
                  <li>Test with the provided examples</li>
                  <li>Consider edge cases</li>
                  <li>Verify time and space complexity</li>
                  <li>Can the code be simplified or optimized further?</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )

  const DataStructureCard = ({ title, level, timeComplexity, spaceComplexity, keywords, description, whenToUse, pros, cons }: any) => (
    <Card className="glass-card border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg text-blue-400">{title}</span>
          <Badge variant={level === 'Easy' ? 'default' : level === 'Medium' ? 'secondary' : 'destructive'} className="text-xs">
            {level}
          </Badge>
        </CardTitle>
        <p className="text-sm text-gray-300">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <strong className="text-blue-400">Time: </strong>
            <span className="text-gray-300">{timeComplexity}</span>
          </div>
          <div>
            <strong className="text-blue-400">Space: </strong>
            <span className="text-gray-300">{spaceComplexity}</span>
          </div>
        </div>

        <div>
          <strong className="text-blue-400 text-sm">Keywords: </strong>
          <div className="flex flex-wrap gap-1 mt-1">
            {keywords.map((keyword: string, idx: number) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>

        <Collapsible>
          <CollapsibleTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer text-sm text-blue-400 hover:text-blue-300">
              <ChevronRight className="w-4 h-4" />
              <span>When to Use</span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-2">
            <div>
              <strong className="text-green-400 text-sm">When to Use:</strong>
              <ul className="text-xs text-gray-400 list-disc list-inside mt-1 space-y-1">
                {whenToUse.map((use: string, idx: number) => (
                  <li key={idx}>{use}</li>
                ))}
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <strong className="text-green-400 text-sm">Pros:</strong>
                <ul className="text-xs text-gray-400 list-disc list-inside mt-1 space-y-1">
                  {pros.map((pro: string, idx: number) => (
                    <li key={idx}>{pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong className="text-red-400 text-sm">Cons:</strong>
                <ul className="text-xs text-gray-400 list-disc list-inside mt-1 space-y-1">
                  {cons.map((con: string, idx: number) => (
                    <li key={idx}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )

  const ExampleSection = () => (
    <Card className="glass-card border border-white/10">
      <CardHeader>
        <CardTitle className="text-xl text-blue-400 flex items-center gap-2">
          <Code className="w-6 h-6" />
          Real Example: Two Sum
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="glass border border-white/10 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-300 mb-2">Problem Statement</h3>
          <p className="text-gray-300 text-sm">
            Given an array of integers and a target sum, return indices of two numbers that add up to target.
          </p>
        </div>

        <div className="space-y-4">
          <div className="glass border border-white/10 rounded-lg p-4">
            <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
              <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">U</span>
              Understand
            </h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Input: array of integers, target integer</li>
              <li>• Output: array of two indices</li>
              <li>• Assume exactly one solution exists</li>
              <li>• Can't use same element twice</li>
            </ul>
          </div>

          <div className="glass border border-white/10 rounded-lg p-4">
            <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
              <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">P</span>
              Plan
            </h4>
            <div className="text-sm text-gray-300 space-y-2">
              <p><strong>Approach 1 (Brute Force):</strong> Try all pairs - O(n²) time</p>
              <p><strong>Approach 2 (Optimized):</strong> Use hash map for O(1) lookups - O(n) time</p>
              <p><strong>Key insight:</strong> For each number, check if its complement exists</p>
            </div>
          </div>

          <div className="glass border border-white/10 rounded-lg p-4">
            <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
              <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">E</span>
              Execute
            </h4>
            <pre className="bg-black/30 border border-white/10 rounded p-3 text-xs text-gray-300 overflow-x-auto">
{`def two_sum(nums, target):
    # Hash map to store value -> index
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        # Check if complement exists
        if complement in num_map:
            return [num_map[complement], i]
        
        # Store current number and index
        num_map[num] = i
    
    return []  # No solution found`}
            </pre>
          </div>

          <div className="glass border border-white/10 rounded-lg p-4">
            <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
              <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">R</span>
              Review
            </h4>
            <div className="text-sm text-gray-300 space-y-2">
              <p><strong>Test:</strong> nums = [2,7,11,15], target = 9 → [0,1] ✓</p>
              <p><strong>Time Complexity:</strong> O(n) - single pass through array</p>
              <p><strong>Space Complexity:</strong> O(n) - hash map storage</p>
              <p><strong>Edge cases:</strong> Empty array, no solution, duplicate numbers</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const easyDataStructures = [
    {
      title: "Array",
      level: "Easy" as const,
      timeComplexity: "Access: O(1), Search: O(n), Insert/Delete: O(n)",
      spaceComplexity: "O(n)",
      keywords: ["index", "iteration", "subarray", "sorted"],
      description: "Contiguous memory locations storing elements of the same type",
      whenToUse: [
        "Know the size beforehand",
        "Need fast random access by index",
        "Want cache-friendly memory layout",
        "Simple iteration over elements"
      ],
      pros: ["Constant time access", "Memory efficient", "Cache friendly", "Simple to use"],
      cons: ["Fixed size", "Expensive insertion/deletion", "Wasted space if not full"]
    },
    {
      title: "Hash Map / Hash Table",
      level: "Easy" as const,
      timeComplexity: "Average: O(1) all ops, Worst: O(n)",
      spaceComplexity: "O(n)",
      keywords: ["frequency", "lookup", "duplicate", "complement"],
      description: "Key-value pairs with fast lookup using hash function",
      whenToUse: [
        "Need fast lookups by key",
        "Counting frequency of elements",
        "Finding complements or pairs",
        "Avoiding nested loops"
      ],
      pros: ["Very fast average case", "Flexible key types", "Dynamic sizing", "Intuitive interface"],
      cons: ["No ordering", "Hash collisions", "Memory overhead", "Worst case O(n)"]
    }
  ]

  const mediumDataStructures = [
    {
      title: "Stack",
      level: "Medium" as const,
      timeComplexity: "Push/Pop: O(1), Search: O(n)",
      spaceComplexity: "O(n)",
      keywords: ["LIFO", "parentheses", "undo", "call stack", "brackets"],
      description: "Last In First Out (LIFO) data structure",
      whenToUse: [
        "Need to reverse order",
        "Matching parentheses/brackets",
        "Undo operations",
        "Function call management",
        "Expression evaluation"
      ],
      pros: ["Simple operations", "Memory efficient", "Fast push/pop", "Natural recursion helper"],
      cons: ["Limited access pattern", "No random access", "Can overflow", "Only top element accessible"]
    },
    {
      title: "Queue",
      level: "Medium" as const,
      timeComplexity: "Enqueue/Dequeue: O(1), Search: O(n)",
      spaceComplexity: "O(n)",
      keywords: ["FIFO", "BFS", "scheduling", "buffer"],
      description: "First In First Out (FIFO) data structure",
      whenToUse: [
        "Process items in order received",
        "Breadth-first search",
        "Task scheduling",
        "Buffer for data streams"
      ],
      pros: ["Fair ordering", "Simple interface", "Good for BFS", "Natural for streaming"],
      cons: ["Limited access pattern", "No random access", "Memory overhead", "Only ends accessible"]
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
    <div className="w-full max-w-7xl mx-auto p-6 text-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          DSA Cheat Sheet
        </h1>
        <p className="text-xl text-gray-300">
          Complete guide from problem-solving framework to data structures
        </p>
      </div>

      <div className="space-y-8">
        <FrameworkSection />

        <Tabs defaultValue="easy" className="w-full">
          <TabsList className="grid w-full grid-cols-4 glass border border-white/10">
            <TabsTrigger value="easy" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Easy
            </TabsTrigger>
            <TabsTrigger value="medium" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white">
              Medium  
            </TabsTrigger>
            <TabsTrigger value="hard" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Hard
            </TabsTrigger>
            <TabsTrigger value="example" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Example
            </TabsTrigger>
          </TabsList>

          <TabsContent value="easy">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-green-400 mb-2">Level: Easy (Linear & Direct)</h2>
                <p className="text-gray-300">Master these first - they solve 70% of Easy problems</p>
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
                <h2 className="text-2xl font-bold text-yellow-400 mb-2">Level: Medium (Sequential & Ordered)</h2>
                <p className="text-gray-300">Essential for process control and ordering</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
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
                <p className="text-gray-300">Advanced structures for complex problems</p>
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

        <Card className="glass-card border border-white/10">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-blue-400 mb-4">💡 Key Interview Tips</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Always start with brute force - shows you can solve it</li>
                <li>• Talk through your thought process out loud</li>
                <li>• Ask clarifying questions before coding</li>
                <li>• Test your solution with examples and edge cases</li>
              </ul>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Use the cheat sheet keywords to identify the right approach</li>
                <li>• Hash Map is often the key to optimizing O(n²) solutions</li>
                <li>• Practice the U.P.E.R. framework until it's second nature</li>
                <li>• Remember: the journey matters more than the destination</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default InterviewGuideVisualizer 