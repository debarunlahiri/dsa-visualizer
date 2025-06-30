"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { 
  ChevronDown, 
  ChevronRight, 
  Target, 
  Lightbulb, 
  Code, 
  CheckCircle,
  BookOpen,
  TrendingUp,
  Zap,
  Brain,
  Timer,
  Award,
  Filter,
  Search
} from "lucide-react"

export const PatternsCheatSheetVisualizer: React.FC = () => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set([
    'overview', 'easy-patterns', 'medium-patterns', 'hard-patterns'
  ]))
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all')
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'leetcode' | 'hackerrank' | 'codeforces'>('all')

  const toggleSection = (section: string) => {
    const newOpenSections = new Set(openSections)
    if (newOpenSections.has(section)) {
      newOpenSections.delete(section)
    } else {
      newOpenSections.add(section)
    }
    setOpenSections(newOpenSections)
  }

  // Pattern definitions with comprehensive details
  const patterns = {
    easy: [
      {
        name: "Two Pointers",
        difficulty: "Easy",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        platforms: ["leetcode", "hackerrank", "codeforces"],
        description: "Use two pointers to traverse array/string from different positions",
        keywords: ["sorted array", "palindrome", "pair sum", "two sum"],
        whenToUse: [
          "Array/string is sorted",
          "Looking for pairs that meet criteria",
          "Palindrome checking",
          "Removing duplicates from sorted array"
        ],
        commonProblems: [
          "Two Sum II (LeetCode #167)",
          "Valid Palindrome (LeetCode #125)",
          "Remove Duplicates (LeetCode #26)",
          "Container With Most Water (LeetCode #11)"
        ],
        template: `def two_pointers_template(arr):
    left, right = 0, len(arr) - 1
    
    while left < right:
        # Check condition
        if condition_met(arr[left], arr[right]):
            return result
        elif arr[left] + arr[right] < target:
            left += 1  # Need larger sum
        else:
            right -= 1  # Need smaller sum
    
    return default_result`,
        tips: [
          "Start with pointers at opposite ends",
          "Move pointers based on problem logic",
          "Watch for edge cases with empty arrays",
          "Consider three pointers for triplet problems"
        ]
      },
      {
        name: "Sliding Window",
        difficulty: "Easy",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        platforms: ["leetcode", "hackerrank", "codeforces"],
        description: "Maintain a window of elements and slide it across the array",
        keywords: ["subarray", "substring", "maximum", "minimum", "k elements"],
        whenToUse: [
          "Finding subarrays/substrings of fixed size",
          "Maximum/minimum in sliding window",
          "Longest substring with condition",
          "All anagrams/permutations"
        ],
        commonProblems: [
          "Maximum Average Subarray (LeetCode #643)",
          "Longest Substring Without Repeating Characters (LeetCode #3)",
          "Minimum Window Substring (LeetCode #76)",
          "Find All Anagrams (LeetCode #438)"
        ],
        template: `def sliding_window_template(arr, k):
    if not arr or k > len(arr):
        return []
    
    # Initialize window
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    # Slide the window
    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum`,
        tips: [
          "Use hash map for character counting",
          "Two pointers for variable window size",
          "Deque for maintaining min/max in window",
          "Reset window when condition breaks"
        ]
      },
      {
        name: "Hash Map/Set",
        difficulty: "Easy", 
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        platforms: ["leetcode", "hackerrank", "codeforces"],
        description: "Use hash structures for O(1) lookups and frequency counting",
        keywords: ["frequency", "duplicates", "lookup", "complement", "anagram"],
        whenToUse: [
          "Need fast lookups (avoid nested loops)",
          "Counting frequencies",
          "Finding complements/pairs",
          "Detecting duplicates"
        ],
        commonProblems: [
          "Two Sum (LeetCode #1)",
          "Group Anagrams (LeetCode #49)",
          "Contains Duplicate (LeetCode #217)",
          "First Unique Character (LeetCode #387)"
        ],
        template: `def hash_map_template(arr):
    freq_map = {}  # or collections.Counter()
    
    for item in arr:
        # Count frequency
        freq_map[item] = freq_map.get(item, 0) + 1
        
        # Or check for complement
        complement = target - item
        if complement in freq_map:
            return True
    
    return False`,
        tips: [
          "Counter from collections for frequency",
          "defaultdict for cleaner code", 
          "Set for simple existence checks",
          "Store indices as values when needed"
        ]
      }
    ],
    medium: [
      {
        name: "Binary Search",
        difficulty: "Medium",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        platforms: ["leetcode", "hackerrank", "codeforces"],
        description: "Search in sorted space or find boundaries",
        keywords: ["sorted", "search", "boundary", "peak", "rotation"],
        whenToUse: [
          "Array is sorted or rotated sorted",
          "Finding peak/valley elements",
          "Search insert position",
          "Finding boundaries (first/last occurrence)"
        ],
        commonProblems: [
          "Search in Rotated Sorted Array (LeetCode #33)",
          "Find Peak Element (LeetCode #162)",
          "Search for Range (LeetCode #34)",
          "Sqrt(x) (LeetCode #69)"
        ],
        template: `def binary_search_template(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1`,
        tips: [
          "Use left + (right - left) // 2 to avoid overflow",
          "Consider <= vs < in while condition",
          "Handle rotated arrays with extra conditions",
          "Binary search on answer for optimization problems"
        ]
      },
      {
        name: "Tree Traversal (DFS/BFS)",
        difficulty: "Medium",
        timeComplexity: "O(n)",
        spaceComplexity: "O(h) for DFS, O(w) for BFS",
        platforms: ["leetcode", "hackerrank", "codeforces"],
        description: "Navigate trees using depth-first or breadth-first approaches",
        keywords: ["tree", "traversal", "path", "level", "ancestor"],
        whenToUse: [
          "Tree/graph problems",
          "Path finding",
          "Level-order processing",
          "Finding ancestors/descendants"
        ],
        commonProblems: [
          "Binary Tree Level Order (LeetCode #102)",
          "Path Sum (LeetCode #112)",
          "Lowest Common Ancestor (LeetCode #236)",
          "Serialize/Deserialize Binary Tree (LeetCode #297)"
        ],
        template: `# DFS Template
def dfs(node, target):
    if not node:
        return False
    
    if node.val == target:
        return True
    
    return dfs(node.left, target) or dfs(node.right, target)

# BFS Template  
def bfs(root):
    if not root:
        return []
    
    queue = [root]
    result = []
    
    while queue:
        level_size = len(queue)
        level = []
        
        for _ in range(level_size):
            node = queue.pop(0)
            level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(level)
    
    return result`,
        tips: [
          "Use stack for DFS, queue for BFS",
          "Track level size for level-order traversal",
          "Preorder: process-left-right",
          "Inorder: left-process-right (gives sorted for BST)"
        ]
      },
      {
        name: "Dynamic Programming",
        difficulty: "Medium",
        timeComplexity: "O(n²) typical",
        spaceComplexity: "O(n) or O(n²)",
        platforms: ["leetcode", "hackerrank", "codeforces"],
        description: "Break problems into subproblems and store results",
        keywords: ["optimal", "maximum", "minimum", "ways", "subsequence"],
        whenToUse: [
          "Optimization problems (max/min)",
          "Counting problems (number of ways)",
          "Decision problems (yes/no)",
          "Overlapping subproblems"
        ],
        commonProblems: [
          "Climbing Stairs (LeetCode #70)",
          "Coin Change (LeetCode #322)",
          "Longest Increasing Subsequence (LeetCode #300)",
          "Edit Distance (LeetCode #72)"
        ],
        template: `def dp_template(n):
    # Step 1: Define dp array
    dp = [0] * (n + 1)
    
    # Step 2: Base cases
    dp[0] = base_case_0
    dp[1] = base_case_1
    
    # Step 3: Fill dp array
    for i in range(2, n + 1):
        dp[i] = recurrence_relation(dp, i)
    
    return dp[n]`,
        tips: [
          "Start with recursive solution + memoization",
          "Convert to bottom-up for better space",
          "Look for state variables",
          "Optimize space if only previous values needed"
        ]
      }
    ],
    hard: [
      {
        name: "Graph Algorithms",
        difficulty: "Hard",
        timeComplexity: "O(V + E) to O(V²)",
        spaceComplexity: "O(V + E)",
        platforms: ["leetcode", "hackerrank", "codeforces"],
        description: "Complex graph traversal, shortest paths, and connectivity",
        keywords: ["graph", "shortest path", "cycle", "connectivity", "topological"],
        whenToUse: [
          "Shortest path problems",
          "Cycle detection",
          "Strongly connected components", 
          "Minimum spanning tree",
          "Topological sorting"
        ],
        commonProblems: [
          "Course Schedule (LeetCode #207)",
          "Network Delay Time (LeetCode #743)",
          "Critical Connections (LeetCode #1192)",
          "Cheapest Flights Within K Stops (LeetCode #787)"
        ],
        template: `# Dijkstra's Algorithm Template
import heapq

def dijkstra(graph, start):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    pq = [(0, start)]
    
    while pq:
        curr_dist, u = heapq.heappop(pq)
        
        if curr_dist > dist[u]:
            continue
            
        for v, weight in graph[u]:
            distance = curr_dist + weight
            
            if distance < dist[v]:
                dist[v] = distance
                heapq.heappush(pq, (distance, v))
    
    return dist`,
        tips: [
          "Use Union-Find for connectivity problems",
          "DFS for cycle detection in directed graphs",
          "BFS for shortest path in unweighted graphs",
          "Dijkstra for weighted shortest path"
        ]
      },
      {
        name: "Advanced DP Patterns",
        difficulty: "Hard", 
        timeComplexity: "O(n³) or higher",
        spaceComplexity: "O(n²) or higher",
        platforms: ["leetcode", "hackerrank", "codeforces"],
        description: "Complex DP with multiple dimensions and states",
        keywords: ["interval", "range", "state machine", "bitmask", "digit"],
        whenToUse: [
          "Interval DP problems",
          "State machine DP",
          "Bitmask DP for subsets",
          "Digit DP for number ranges"
        ],
        commonProblems: [
          "Burst Balloons (LeetCode #312)",
          "Regular Expression Matching (LeetCode #10)",
          "Palindrome Partitioning II (LeetCode #132)",
          "Maximum Profit in Job Scheduling (LeetCode #1235)"
        ],
        template: `# Interval DP Template
def interval_dp(arr):
    n = len(arr)
    dp = [[0] * n for _ in range(n)]
    
    # Length 1 intervals
    for i in range(n):
        dp[i][i] = base_case(arr[i])
    
    # Length 2 to n intervals
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            
            # Try all possible splits
            for k in range(i, j):
                dp[i][j] = max(
                    dp[i][j],
                    dp[i][k] + dp[k+1][j] + cost(i, k, j)
                )
    
    return dp[0][n-1]`,
        tips: [
          "Think about states and transitions",
          "Use memoization for complex recursive solutions",
          "Consider space optimization techniques",
          "Break into smaller subproblems"
        ]
      },
      {
        name: "String Algorithms",
        difficulty: "Hard",
        timeComplexity: "O(n + m) to O(n²)",
        spaceComplexity: "O(n + m)",
        platforms: ["leetcode", "hackerrank", "codeforces"],
        description: "Advanced string processing and pattern matching",
        keywords: ["pattern", "suffix", "prefix", "palindrome", "matching"],
        whenToUse: [
          "Pattern matching problems",
          "String transformation",
          "Palindrome problems",
          "Suffix/prefix analysis"
        ],
        commonProblems: [
          "KMP Pattern Matching",
          "Longest Palindromic Substring (LeetCode #5)",
          "Edit Distance (LeetCode #72)",
          "Shortest Palindrome (LeetCode #214)"
        ],
        template: `# KMP Algorithm Template
def kmp_search(text, pattern):
    def build_lps(pattern):
        lps = [0] * len(pattern)
        length = 0
        i = 1
        
        while i < len(pattern):
            if pattern[i] == pattern[length]:
                length += 1
                lps[i] = length
                i += 1
            else:
                if length != 0:
                    length = lps[length - 1]
                else:
                    lps[i] = 0
                    i += 1
        return lps
    
    lps = build_lps(pattern)
    i = j = 0
    
    while i < len(text):
        if pattern[j] == text[i]:
            i += 1
            j += 1
        
        if j == len(pattern):
            return i - j  # Found match
        elif i < len(text) and pattern[j] != text[i]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1
    
    return -1`,
        tips: [
          "Learn KMP for efficient pattern matching",
          "Use rolling hash for string hashing",
          "Consider trie for multiple pattern matching",
          "DP for string transformation problems"
        ]
      }
    ]
  }

  const PatternCard = ({ pattern }: { pattern: any }) => {
    const [expanded, setExpanded] = useState(false)
    
    const difficultyColors = {
      Easy: 'bg-green-500',
      Medium: 'bg-yellow-500',
      Hard: 'bg-red-500'
    }

    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-blue-400 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              {pattern.name}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={`${difficultyColors[pattern.difficulty]} text-white text-xs`}>
                {pattern.difficulty}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(!expanded)}
                className="text-slate-400 hover:text-white"
              >
                {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <p className="text-sm text-slate-300">{pattern.description}</p>
        </CardHeader>
        
        <Collapsible open={expanded} onOpenChange={setExpanded}>
          <CollapsibleContent>
            <CardContent className="space-y-6">
              
              {/* Complexity and Platforms */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-1">
                    <Timer className="w-4 h-4" />
                    Time Complexity
                  </h4>
                  <Badge variant="outline" className="text-xs">{pattern.timeComplexity}</Badge>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Space Complexity</h4>
                  <Badge variant="outline" className="text-xs">{pattern.spaceComplexity}</Badge>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Platforms</h4>
                  <div className="flex flex-wrap gap-1">
                    {pattern.platforms.map((platform: string) => (
                      <Badge key={platform} variant="secondary" className="text-xs capitalize">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Keywords */}
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-1">
                  <Search className="w-4 h-4" />
                  Keywords to Look For
                </h4>
                <div className="flex flex-wrap gap-1">
                  {pattern.keywords.map((keyword: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="text-xs bg-blue-900 text-blue-200">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* When to Use */}
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  When to Use This Pattern
                </h4>
                <ul className="space-y-1">
                  {pattern.whenToUse.map((use: string, idx: number) => (
                    <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                      {use}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Problems */}
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  Common Problems
                </h4>
                <ul className="space-y-1">
                  {pattern.commonProblems.map((problem: string, idx: number) => (
                    <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0" />
                      {problem}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Template */}
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-1">
                  <Code className="w-4 h-4" />
                  Code Template
                </h4>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-600">
                  <pre className="text-xs text-slate-300 overflow-x-auto">
                    <code>{pattern.template}</code>
                  </pre>
                </div>
              </div>

              {/* Tips */}
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-1">
                  <Lightbulb className="w-4 h-4" />
                  Pro Tips
                </h4>
                <ul className="space-y-1">
                  {pattern.tips.map((tip: string, idx: number) => (
                    <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      
      {/* Header Overview */}
      <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-slate-700">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Award className="w-8 h-8 text-yellow-400" />
            Complete DSA Patterns Cheat Sheet
          </CardTitle>
          <p className="text-lg text-slate-300 max-w-4xl mx-auto">
            Master competitive programming with this comprehensive collection of problem-solving patterns. 
            From LeetCode Easy to Codeforces Div1, these patterns cover 90% of all coding interview and contest problems.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400">15+</div>
              <div className="text-sm text-slate-400">Core Patterns</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-400">100+</div>
              <div className="text-sm text-slate-400">Practice Problems</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-400">4</div>
              <div className="text-sm text-slate-400">Major Platforms</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-400">3</div>
              <div className="text-sm text-slate-400">Difficulty Levels</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different difficulty levels */}
      <Tabs defaultValue="easy" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="easy" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Easy Patterns
          </TabsTrigger>
          <TabsTrigger value="medium" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white">
            Medium Patterns
          </TabsTrigger>
          <TabsTrigger value="hard" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            Hard Patterns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="easy" className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-green-400 mb-2 flex items-center justify-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Easy Patterns - Foundation Building
            </h2>
            <p className="text-slate-400">
              Master these patterns first. They form the foundation for 60% of Easy problems on LeetCode and HackerRank.
            </p>
          </div>
          <div className="grid gap-6">
            {patterns.easy.map((pattern, index) => (
              <PatternCard key={index} pattern={pattern} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="medium" className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-yellow-400 mb-2 flex items-center justify-center gap-2">
              <Zap className="w-6 h-6" />
              Medium Patterns - Interview Ready
            </h2>
            <p className="text-slate-400">
              These patterns appear in 70% of technical interviews. Master them for FAANG-level preparation.
            </p>
          </div>
          <div className="grid gap-6">
            {patterns.medium.map((pattern, index) => (
              <PatternCard key={index} pattern={pattern} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hard" className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-red-400 mb-2 flex items-center justify-center gap-2">
              <Brain className="w-6 h-6" />
              Hard Patterns - Competition Level
            </h2>
            <p className="text-slate-400">
              Advanced patterns for competitive programming, system design, and senior-level interviews.
            </p>
          </div>
          <div className="grid gap-6">
            {patterns.hard.map((pattern, index) => (
              <PatternCard key={index} pattern={pattern} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Study Strategy Section */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl text-blue-400 flex items-center gap-2">
            <Target className="w-6 h-6" />
            How to Use This Cheat Sheet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">For Interviews</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Start with Easy patterns, master the templates
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Practice 5-10 problems per pattern
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Time yourself - aim for 15-20 minutes per Easy problem
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Focus on explaining your thought process
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">For Competitive Programming</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  Learn all patterns but focus on Hard ones
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  Practice implementation speed
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  Study advanced topics like FFT, Heavy-Light Decomposition
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  Participate in weekly contests on all platforms
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">⚡ Quick Recognition Guide</h3>
            <p className="text-sm text-slate-300 mb-3">
              When you see these keywords in a problem, immediately think of the corresponding pattern:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <strong className="text-blue-400">Array/String + "sorted"</strong> → Two Pointers or Binary Search<br/>
                <strong className="text-blue-400">Subarray/substring + "maximum/minimum"</strong> → Sliding Window<br/>
                <strong className="text-blue-400">"frequency" or "count"</strong> → Hash Map<br/>
                <strong className="text-blue-400">Tree + "path" or "ancestor"</strong> → DFS/BFS
              </div>
              <div>
                <strong className="text-blue-400">"optimal" or "maximum ways"</strong> → Dynamic Programming<br/>
                <strong className="text-blue-400">Graph + "shortest path"</strong> → BFS or Dijkstra<br/>
                <strong className="text-blue-400">"pattern matching"</strong> → KMP or Rolling Hash<br/>
                <strong className="text-blue-400">Intervals or ranges</strong> → Interval DP or Sweep Line
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  )
} 