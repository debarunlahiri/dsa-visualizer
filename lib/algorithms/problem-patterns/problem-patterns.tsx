import type React from "react"
import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const problemPatternsExplanationContent = (
  <AlgorithmExplanation>
    <h2>Complete DSA Patterns & Problem-Solving Cheat Sheet</h2>
    <p>
      This comprehensive guide covers all essential patterns for solving DSA problems across different difficulty levels 
      and platforms including LeetCode, HackerRank, Codeforces, and more. Master these patterns to solve 90% of coding 
      interview and competitive programming problems.
    </p>
    
    <h3>What This Guide Covers:</h3>
    <ol>
      <li><strong>15+ Core Patterns:</strong> From basic Two Pointers to advanced Graph Algorithms</li>
      <li><strong>Difficulty Progression:</strong> Easy → Medium → Hard patterns with clear learning path</li>
      <li><strong>Platform Coverage:</strong> Problems from LeetCode, HackerRank, Codeforces, and more</li>
      <li><strong>Code Templates:</strong> Ready-to-use templates for each pattern</li>
      <li><strong>Recognition Guide:</strong> Keywords and signals to identify which pattern to use</li>
    </ol>

    <h3>Easy Patterns (Foundation Level):</h3>
    <ul>
      <li><strong>Two Pointers:</strong> O(n) solution for sorted arrays, palindromes, pair problems</li>
      <li><strong>Sliding Window:</strong> Subarray/substring problems with fixed or variable window</li>
      <li><strong>Hash Map/Set:</strong> O(1) lookups, frequency counting, avoiding nested loops</li>
      <li><strong>Basic Sorting:</strong> When to use which sorting algorithm</li>
    </ul>

    <h3>Medium Patterns (Interview Level):</h3>
    <ul>
      <li><strong>Binary Search:</strong> Search in sorted/rotated arrays, finding boundaries</li>
      <li><strong>Tree Traversal:</strong> DFS and BFS for tree/graph problems</li>
      <li><strong>Dynamic Programming:</strong> Optimization problems with overlapping subproblems</li>
      <li><strong>Backtracking:</strong> Constraint satisfaction and combination problems</li>
      <li><strong>Stack/Queue:</strong> Monotonic stacks, BFS traversal patterns</li>
    </ul>

    <h3>Hard Patterns (Competition Level):</h3>
    <ul>
      <li><strong>Graph Algorithms:</strong> Dijkstra, Union-Find, strongly connected components</li>
      <li><strong>Advanced DP:</strong> Interval DP, bitmask DP, digit DP</li>
      <li><strong>String Algorithms:</strong> KMP, rolling hash, suffix arrays</li>
      <li><strong>Segment Trees:</strong> Range queries and updates</li>
      <li><strong>Number Theory:</strong> GCD, prime factorization, modular arithmetic</li>
    </ul>

    <h3>Pattern Recognition Strategy:</h3>
    <p>
      The key to competitive programming success is quickly recognizing which pattern applies to a problem. 
      This guide provides keyword mapping, complexity analysis, and common problem variations for each pattern.
    </p>

    <h3>Platform-Specific Tips:</h3>
    <ul>
      <li><strong>LeetCode:</strong> Focus on clean code and optimal solutions</li>
      <li><strong>HackerRank:</strong> Pay attention to input/output formatting</li>
      <li><strong>Codeforces:</strong> Optimize for speed and handle large inputs</li>
      <li><strong>Interviews:</strong> Explain your thought process using the U.P.E.R. framework</li>
    </ul>

    <h3>Study Recommendations:</h3>
    <p>
      Start with Easy patterns and practice 5-10 problems per pattern. Time yourself and aim for 
      pattern recognition within 2-3 minutes. Use the code templates as starting points but 
      customize them for specific problems.
    </p>
  </AlgorithmExplanation>
)

export const problemPatternsCodeSnippets = {
  python: `# Complete DSA Patterns Cheat Sheet - Python Templates

# ===== EASY PATTERNS =====

# 1. TWO POINTERS PATTERN
def two_pointers_template(arr, target):
    """Use when: sorted array, palindrome, pair sum"""
    left, right = 0, len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return [-1, -1]

# 2. SLIDING WINDOW PATTERN  
def sliding_window_template(arr, k):
    """Use when: subarray/substring, fixed/variable window"""
    if k > len(arr):
        return 0
    
    # Fixed window
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum

# 3. HASH MAP PATTERN
def hash_map_frequency(arr):
    """Use when: frequency counting, fast lookups"""
    from collections import Counter
    
    freq = Counter(arr)
    return freq

# ===== MEDIUM PATTERNS =====

# 4. BINARY SEARCH PATTERN
def binary_search_template(arr, target):
    """Use when: sorted array, search space reduction"""
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# 5. DYNAMIC PROGRAMMING PATTERN
def dp_template(n):
    """Use when: optimal substructure, overlapping subproblems"""
    dp = [0] * (n + 1)
    
    # Base cases
    dp[0] = 1
    if n >= 1:
        dp[1] = 1
    
    # Fill DP array
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]

# ===== HARD PATTERNS =====

# 6. DIJKSTRA'S ALGORITHM
def dijkstra_template(graph, start):
    """Use when: shortest path in weighted graph"""
    import heapq
    
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
    
    return dist

# PATTERN RECOGNITION GUIDE
pattern_keywords = {
    "sorted array + two elements": "Two Pointers",
    "subarray + maximum/minimum": "Sliding Window",
    "frequency or count": "Hash Map",
    "tree + path": "DFS",
    "level order": "BFS",
    "optimal + subproblems": "Dynamic Programming",
    "shortest path": "BFS/Dijkstra",
    "combinations + constraints": "Backtracking"
}`,

  javascript: `// Complete DSA Patterns Cheat Sheet - JavaScript Templates

// ===== EASY PATTERNS =====

// 1. TWO POINTERS PATTERN
function twoPointersTemplate(arr, target) {
    // Use when: sorted array, palindrome, pair sum
    let left = 0, right = arr.length - 1;
    
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return [-1, -1];
}

// 2. SLIDING WINDOW PATTERN
function slidingWindowTemplate(arr, k) {
    // Use when: subarray/substring, fixed/variable window
    if (k > arr.length) return 0;
    
    let windowSum = arr.slice(0, k).reduce((a, b) => a + b, 0);
    let maxSum = windowSum;
    
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}

// 3. HASH MAP PATTERN
function hashMapFrequency(arr) {
    // Use when: frequency counting, fast lookups
    const freq = new Map();
    
    for (const item of arr) {
        freq.set(item, (freq.get(item) || 0) + 1);
    }
    
    return freq;
}

// ===== MEDIUM PATTERNS =====

// 4. BINARY SEARCH PATTERN
function binarySearchTemplate(arr, target) {
    // Use when: sorted array, search space reduction
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// 5. DYNAMIC PROGRAMMING PATTERN
function dpTemplate(n) {
    // Use when: optimal substructure, overlapping subproblems
    const dp = new Array(n + 1).fill(0);
    
    // Base cases
    dp[0] = 1;
    if (n >= 1) dp[1] = 1;
    
    // Fill DP array
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// ===== HARD PATTERNS =====

// 6. DIJKSTRA'S ALGORITHM
function dijkstraTemplate(graph, start) {
    // Use when: shortest path in weighted graph
    const dist = {};
    const visited = new Set();
    
    // Initialize distances
    for (const node in graph) {
        dist[node] = Infinity;
    }
    dist[start] = 0;
    
    // Priority queue simulation
    const pq = [[0, start]];
    
    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        const [currDist, u] = pq.shift();
        
        if (visited.has(u)) continue;
        visited.add(u);
        
        for (const [v, weight] of graph[u] || []) {
            const distance = currDist + weight;
            
            if (distance < dist[v]) {
                dist[v] = distance;
                pq.push([distance, v]);
            }
        }
    }
    
    return dist;
}

// PATTERN RECOGNITION GUIDE
const patternKeywords = {
    "sorted array + two elements": "Two Pointers",
    "subarray + maximum/minimum": "Sliding Window",
    "frequency or count": "Hash Map",
    "tree + path": "DFS",
    "level order": "BFS",
    "optimal + subproblems": "Dynamic Programming",
    "shortest path": "BFS/Dijkstra",
    "combinations + constraints": "Backtracking"
};`,

  typescript: `// Complete DSA Patterns Cheat Sheet - TypeScript Templates

// ===== EASY PATTERNS =====

// 1. TWO POINTERS PATTERN
function twoPointersTemplate(arr: number[], target: number): number[] {
    // Use when: sorted array, palindrome, pair sum
    let left = 0, right = arr.length - 1;
    
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return [-1, -1];
}

// 2. SLIDING WINDOW PATTERN
function slidingWindowTemplate(arr: number[], k: number): number {
    // Use when: subarray/substring, fixed/variable window
    if (k > arr.length) return 0;
    
    let windowSum = arr.slice(0, k).reduce((a, b) => a + b, 0);
    let maxSum = windowSum;
    
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}

// 3. HASH MAP PATTERN
function hashMapFrequency<T>(arr: T[]): Map<T, number> {
    // Use when: frequency counting, fast lookups
    const freq = new Map<T, number>();
    
    for (const item of arr) {
        freq.set(item, (freq.get(item) || 0) + 1);
    }
    
    return freq;
}

// ===== MEDIUM PATTERNS =====

// 4. BINARY SEARCH PATTERN
function binarySearchTemplate(arr: number[], target: number): number {
    // Use when: sorted array, search space reduction
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// 5. DYNAMIC PROGRAMMING PATTERN
function dpTemplate(n: number): number {
    // Use when: optimal substructure, overlapping subproblems
    const dp: number[] = new Array(n + 1).fill(0);
    
    // Base cases
    dp[0] = 1;
    if (n >= 1) dp[1] = 1;
    
    // Fill DP array
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// ===== HARD PATTERNS =====

// Graph type definition
type Graph = Record<string, [string, number][]>;

// 6. DIJKSTRA'S ALGORITHM
function dijkstraTemplate(graph: Graph, start: string): Record<string, number> {
    // Use when: shortest path in weighted graph
    const dist: Record<string, number> = {};
    const visited = new Set<string>();
    
    // Initialize distances
    for (const node in graph) {
        dist[node] = Infinity;
    }
    dist[start] = 0;
    
    // Priority queue simulation
    const pq: [number, string][] = [[0, start]];
    
    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        const [currDist, u] = pq.shift()!;
        
        if (visited.has(u)) continue;
        visited.add(u);
        
        for (const [v, weight] of graph[u] || []) {
            const distance = currDist + weight;
            
            if (distance < dist[v]) {
                dist[v] = distance;
                pq.push([distance, v]);
            }
        }
    }
    
    return dist;
}

// PATTERN RECOGNITION INTERFACE
interface PatternGuide {
    keywords: string[];
    pattern: string;
    timeComplexity: string;
    commonProblems: string[];
}

const patternRecognition: PatternGuide[] = [
    {
        keywords: ["sorted array", "two elements", "pair sum"],
        pattern: "Two Pointers",
        timeComplexity: "O(n)",
        commonProblems: ["Two Sum II", "3Sum", "Container With Most Water"]
    },
    {
        keywords: ["subarray", "substring", "maximum", "minimum"],
        pattern: "Sliding Window",
        timeComplexity: "O(n)",
        commonProblems: ["Longest Substring", "Maximum Average Subarray"]
    },
    {
        keywords: ["frequency", "count", "duplicates"],
        pattern: "Hash Map",
        timeComplexity: "O(n)",
        commonProblems: ["Two Sum", "Group Anagrams", "Contains Duplicate"]
    }
];`
}