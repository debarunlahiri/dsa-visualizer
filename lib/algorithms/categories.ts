import type { AlgorithmCategory } from "./types"

// Import all existing visualizer components
import BubbleSortVisualizer from "@/components/dsa/bubble-sort-visualizer"
import SelectionSortVisualizer from "@/components/dsa/selection-sort-visualizer"
import InsertionSortVisualizer from "@/components/dsa/insertion-sort-visualizer"
import MergeSortVisualizer from "@/components/dsa/merge-sort-visualizer"
import QuickSortVisualizer from "@/components/dsa/quick-sort-visualizer"
import HeapSortVisualizer from "@/components/dsa/heap-sort-visualizer"
import CountingSortVisualizer from "@/components/dsa/counting-sort-visualizer"
import RadixSortVisualizer from "@/components/dsa/radix-sort-visualizer"
import LinearSearchVisualizer from "@/components/dsa/linear-search-visualizer"
import BinarySearchVisualizer from "@/components/dsa/binary-search-visualizer"
import BSTVisualizer from "@/components/dsa/bst-visualizer"
import GraphBFSVisualizer from "@/components/dsa/graph-bfs-visualizer"
import GraphDFSVisualizer from "@/components/dsa/graph-dfs-visualizer"
import HashingConceptualVisualizer from "@/components/dsa/hashing-conceptual-visualizer"
import DPFibonacciVisualizer from "@/components/dsa/dp-fibonacci-visualizer"
import DPKnapsack01Visualizer from "@/components/dsa/dp-knapsack-01-visualizer"
import GreedyActivitySelectionVisualizer from "@/components/dsa/greedy-activity-selection-visualizer"
import BigOComplexityVisualizer from "@/components/dsa/big-o-complexity-visualizer"
import ComplexityCalculatorVisualizer from "@/components/dsa/complexity-calculator-visualizer"

// Import new working components
import ArrayBasicsVisualizer from "../../components/dsa/array-basics-visualizer"
import TwoPointersVisualizer from "../../components/dsa/two-pointers-visualizer"
import SlidingWindowVisualizer from "../../components/dsa/sliding-window-visualizer"
import PrefixSumVisualizer from "../../components/dsa/prefix-sum-visualizer"
import KadaneAlgorithmVisualizer from "../../components/dsa/kadane-algorithm-visualizer"
import LinkedListVisualizer from "../../components/dsa/linked-list-visualizer"
import InterviewGuideVisualizer from "../../components/dsa/interview-guide-visualizer"
import StackVisualizer from "../../components/dsa/stack-visualizer"
import QueueVisualizer from "../../components/dsa/queue-visualizer"
import RecursionVisualizer from "../../components/dsa/recursion-visualizer"
import StringVisualizer from "../../components/dsa/string-visualizer"
import HeapVisualizer from "../../components/dsa/heap-visualizer"
import BacktrackingVisualizer from "../../components/dsa/backtracking-visualizer"

// Import new advanced visualizer components
import TrieVisualizer from "../../components/dsa/trie-visualizer"
import UnionFindVisualizer from "../../components/dsa/union-find-visualizer"

// Import comprehensive patterns cheat sheet visualizer
import { PatternsCheatSheetVisualizer } from "../../components/dsa/patterns-cheat-sheet-visualizer"

// Import all existing algorithm data
import { bubbleSortExplanationContent, bubbleSortCodeSnippets } from "./sorting/bubble-sort"
import { selectionSortExplanationContent, selectionSortCodeSnippets } from "./sorting/selection-sort"
import { insertionSortExplanationContent, insertionSortCodeSnippets } from "./sorting/insertion-sort"
import { mergeSortExplanationContent, mergeSortCodeSnippets } from "./sorting/merge-sort"
import { quickSortExplanationContent, quickSortCodeSnippets } from "./sorting/quick-sort"
import { heapSortExplanationContent, heapSortCodeSnippets } from "./sorting/heap-sort"
import { countingSortExplanationContent, countingSortCodeSnippets } from "./sorting/counting-sort"
import { radixSortExplanationContent, radixSortCodeSnippets } from "./sorting/radix-sort"
import { linearSearchExplanationContent, linearSearchCodeSnippets } from "./searching/linear-search"
import { binarySearchExplanationContent, binarySearchCodeSnippets } from "./searching/binary-search"
import { binaryTreeTraversalExplanationContent, binaryTreeTraversalCodeSnippets } from "./trees/binary-tree-traversal"
import { bstExplanationContent, bstCodeSnippets } from "./trees/bst"
import { dfsExplanationContent, dfsCodeSnippets } from "./graphs/dfs"
import { bfsExplanationContent, bfsCodeSnippets } from "./graphs/bfs"
import { hashTableExplanationContent, hashTableCodeSnippets } from "./hashing/hash-table"
import { fibonacciExplanationContent, fibonacciCodeSnippets } from "./dynamic-programming/fibonacci"
import { knapsack01ExplanationContent, knapsack01CodeSnippets } from "./dynamic-programming/knapsack-01"
import { activitySelectionExplanationContent, activitySelectionCodeSnippets } from "./greedy/activity-selection"
import { bigOComplexityExplanationContent, bigOComplexityCodeSnippets } from "./big-o/big-o-complexity"
import { complexityCalculationExplanationContent, complexityCalculationCodeSnippets } from "./big-o/complexity-calculation"

// Import new working algorithm data
import { arrayBasicsExplanationContent, arrayBasicsCodeSnippets } from "./arrays/array-basics"
import { twoPointersExplanationContent, twoPointersCodeSnippets } from "./arrays/two-pointers"
import { slidingWindowExplanationContent, slidingWindowCodeSnippets } from "./arrays/sliding-window"
import { prefixSumExplanationContent, prefixSumCodeSnippets } from "./arrays/prefix-sum"
import { kadaneAlgorithmExplanationContent, kadaneAlgorithmCodeSnippets } from "./arrays/kadane-algorithm"
import { linkedListBasicsExplanationContent, linkedListBasicsCodeSnippets } from "./linked-lists/linked-list-basics"
import { interviewGuideExplanationContent, interviewGuideCodeSnippets } from "./interview-guide/interview-guide"
import { stackBasicsExplanationContent, stackBasicsCodeSnippets } from "./stacks/stack-basics"
import { queueBasicsExplanationContent, queueBasicsCodeSnippets } from "./queues/queue-basics"
import { recursionBasicsExplanationContent, recursionBasicsCodeSnippets } from "./recursion/recursion-basics"
import { stringBasicsExplanationContent, stringBasicsCodeSnippets } from "./strings/string-basics"
import { heapBasicsExplanationContent, heapBasicsCodeSnippets } from "./heaps/heap-basics"
import { backtrackingBasicsExplanationContent, backtrackingBasicsCodeSnippets } from "./backtracking/backtracking-basics"

// Import new advanced algorithm data
import { triesExplanationContent, triesCodeSnippets } from "./trees/tries"
import { unionFindExplanationContent, unionFindCodeSnippets } from "./disjoint-set/union-find"
import { dijkstraExplanationContent, dijkstraCodeSnippets } from "./graphs/dijkstra"
import { kmpExplanationContent, kmpCodeSnippets } from "./strings/kmp-algorithm"

// Import new comprehensive patterns guide
import { problemPatternsExplanationContent, problemPatternsCodeSnippets } from "./problem-patterns/problem-patterns"

export const algorithmCategories: AlgorithmCategory[] = [
  // Part 0: Preparation & Strategy
  {
    id: "guide",
    title: "Strategy & Problem-Solving Framework",
    algorithms: [
      {
        id: "dsa-cheat-sheet",
        title: "Complete DSA Cheat Sheet & U.P.E.R. Framework",
        component: InterviewGuideVisualizer,
        explanation: interviewGuideExplanationContent,
        codeSnippets: interviewGuideCodeSnippets,
      },
      {
        id: "patterns-cheat-sheet",
        title: "DSA Patterns & Problem-Solving Cheat Sheet (LeetCode, HackerRank, Codeforces)",
        component: PatternsCheatSheetVisualizer,
        explanation: problemPatternsExplanationContent,
        codeSnippets: problemPatternsCodeSnippets,
      },
    ],
  },

  // Part 1: Foundational Concepts
  {
    id: "complexity-analysis",
    title: "Part 1: Complexity Analysis & Foundations",
    algorithms: [
      {
        id: "big-o-complexity",
        title: "Big O Notation (O, Ω, Θ)",
        component: BigOComplexityVisualizer,
        explanation: bigOComplexityExplanationContent,
        codeSnippets: bigOComplexityCodeSnippets,
      },
      {
        id: "complexity-calculation",
        title: "How to Calculate Time & Space Complexity",
        component: ComplexityCalculatorVisualizer,
        explanation: complexityCalculationExplanationContent,
        codeSnippets: complexityCalculationCodeSnippets,
      },
      {
        id: "recursion-basics",
        title: "Recursion Fundamentals",
        component: RecursionVisualizer,
        explanation: recursionBasicsExplanationContent,
        codeSnippets: recursionBasicsCodeSnippets,
      },
    ],
  },

  // Part 2: Core Data Structures - Linear
  {
    id: "arrays",
    title: "Part 2A: Arrays & Array Techniques",
    algorithms: [
      {
        id: "array-basics",
        title: "Array Fundamentals",
        component: ArrayBasicsVisualizer,
        explanation: arrayBasicsExplanationContent,
        codeSnippets: arrayBasicsCodeSnippets,
      },
      {
        id: "two-pointers",
        title: "Two Pointers Technique",
        component: TwoPointersVisualizer,
        explanation: twoPointersExplanationContent,
        codeSnippets: twoPointersCodeSnippets,
      },
      {
        id: "sliding-window",
        title: "Sliding Window Technique",
        component: SlidingWindowVisualizer,
        explanation: slidingWindowExplanationContent,
        codeSnippets: slidingWindowCodeSnippets,
      },
      {
        id: "prefix-sum",
        title: "Prefix Sum Technique",
        component: PrefixSumVisualizer,
        explanation: prefixSumExplanationContent,
        codeSnippets: prefixSumCodeSnippets,
      },
      {
        id: "kadane-algorithm",
        title: "Kadane's Algorithm (Maximum Subarray)",
        component: KadaneAlgorithmVisualizer,
        explanation: kadaneAlgorithmExplanationContent,
        codeSnippets: kadaneAlgorithmCodeSnippets,
      },
    ],
  },

  // Part 2B: Linked Lists
  {
    id: "linked-lists",
    title: "Part 2B: Linked Lists",
    algorithms: [
      {
        id: "linked-list-basics",
        title: "Linked List Fundamentals",
        component: LinkedListVisualizer,
        explanation: linkedListBasicsExplanationContent,
        codeSnippets: linkedListBasicsCodeSnippets,
      },
    ],
  },

  // Part 2C: Stacks & Queues
  {
    id: "stacks-queues",
    title: "Part 2C: Stacks & Queues",
    algorithms: [
      {
        id: "stack-basics",
        title: "Stack Data Structure (LIFO)",
        component: StackVisualizer,
        explanation: stackBasicsExplanationContent,
        codeSnippets: stackBasicsCodeSnippets,
      },
      {
        id: "queue-basics",
        title: "Queue Data Structure (FIFO)",
        component: QueueVisualizer,
        explanation: queueBasicsExplanationContent,
        codeSnippets: queueBasicsCodeSnippets,
      },
    ],
  },

  // Part 3: Core Algorithms
  {
    id: "searching",
    title: "Part 3A: Searching Algorithms",
    algorithms: [
      {
        id: "linear-search",
        title: "Linear Search",
        component: LinearSearchVisualizer,
        explanation: linearSearchExplanationContent,
        codeSnippets: linearSearchCodeSnippets,
      },
      {
        id: "binary-search",
        title: "Binary Search",
        component: BinarySearchVisualizer,
        explanation: binarySearchExplanationContent,
        codeSnippets: binarySearchCodeSnippets,
      },
    ],
  },
  {
    id: "sorting",
    title: "Part 3B: Sorting Algorithms",
    algorithms: [
      {
        id: "bubble-sort",
        title: "Bubble Sort (O(n²))",
        component: BubbleSortVisualizer,
        explanation: bubbleSortExplanationContent,
        codeSnippets: bubbleSortCodeSnippets,
      },
      {
        id: "selection-sort",
        title: "Selection Sort (O(n²))",
        component: SelectionSortVisualizer,
        explanation: selectionSortExplanationContent,
        codeSnippets: selectionSortCodeSnippets,
      },
      {
        id: "insertion-sort",
        title: "Insertion Sort (O(n²))",
        component: InsertionSortVisualizer,
        explanation: insertionSortExplanationContent,
        codeSnippets: insertionSortCodeSnippets,
      },
      {
        id: "merge-sort",
        title: "Merge Sort (O(n log n))",
        component: MergeSortVisualizer,
        explanation: mergeSortExplanationContent,
        codeSnippets: mergeSortCodeSnippets,
      },
      {
        id: "quick-sort",
        title: "Quick Sort (O(n log n))",
        component: QuickSortVisualizer,
        explanation: quickSortExplanationContent,
        codeSnippets: quickSortCodeSnippets,
      },
      {
        id: "heap-sort",
        title: "Heap Sort (O(n log n))",
        component: HeapSortVisualizer,
        explanation: heapSortExplanationContent,
        codeSnippets: heapSortCodeSnippets,
      },
      {
        id: "counting-sort",
        title: "Counting Sort (Linear Time)",
        component: CountingSortVisualizer,
        explanation: countingSortExplanationContent,
        codeSnippets: countingSortCodeSnippets,
      },
      {
        id: "radix-sort",
        title: "Radix Sort (Linear Time)",
        component: RadixSortVisualizer,
        explanation: radixSortExplanationContent,
        codeSnippets: radixSortCodeSnippets,
      },
    ],
  },

  // Part 2D: Hash Tables
  {
    id: "hashing",
    title: "Part 2D: Hash Tables",
    algorithms: [
      {
        id: "hash-table",
        title: "Hash Table Concepts & Applications",
        component: HashingConceptualVisualizer,
        explanation: hashTableExplanationContent,
        codeSnippets: hashTableCodeSnippets,
      },
    ],
  },

  // Part 2E: Trees & Heaps
  {
    id: "trees",
    title: "Part 2E: Trees & Heaps",
    algorithms: [
      {
        id: "binary-tree-traversal",
        title: "Binary Tree Traversals (DFS & BFS)",
        component: BSTVisualizer,
        explanation: binaryTreeTraversalExplanationContent,
        codeSnippets: binaryTreeTraversalCodeSnippets,
      },
      {
        id: "bst",
        title: "Binary Search Tree (BST)",
        component: BSTVisualizer,
        explanation: bstExplanationContent,
        codeSnippets: bstCodeSnippets,
      },
      {
        id: "heap-basics",
        title: "Heaps & Priority Queues",
        component: HeapVisualizer,
        explanation: heapBasicsExplanationContent,
        codeSnippets: heapBasicsCodeSnippets,
      },
      {
        id: "tries",
        title: "Tries (Prefix Trees)",
        component: TrieVisualizer,
        explanation: triesExplanationContent,
        codeSnippets: triesCodeSnippets,
      },
    ],
  },

  // Part 2F: Graphs & Connectivity
  {
    id: "graphs",
    title: "Part 2F: Graphs & Connectivity",
    algorithms: [
      {
        id: "bfs",
        title: "Breadth-First Search (BFS)",
        component: GraphBFSVisualizer,
        explanation: bfsExplanationContent,
        codeSnippets: bfsCodeSnippets,
      },
      {
        id: "dfs",
        title: "Depth-First Search (DFS)",
        component: GraphDFSVisualizer,
        explanation: dfsExplanationContent,
        codeSnippets: dfsCodeSnippets,
      },
      {
        id: "union-find",
        title: "Union-Find (Disjoint Set Union)",
        component: UnionFindVisualizer,
        explanation: unionFindExplanationContent,
        codeSnippets: unionFindCodeSnippets,
      },
    ],
  },

  // Part 3C: Advanced Graph Algorithms
  {
    id: "advanced-graphs",
    title: "Part 3C: Advanced Graph Algorithms",
    algorithms: [
      {
        id: "dijkstra",
        title: "Dijkstra's Shortest Path Algorithm",
        component: GraphBFSVisualizer, // TODO: Create DijkstraVisualizer
        explanation: dijkstraExplanationContent,
        codeSnippets: dijkstraCodeSnippets,
      },
    ],
  },

  // Enhanced Dynamic Programming section
  {
    id: "dynamic-programming",
    title: "Part 3D: Dynamic Programming",
    algorithms: [
      {
        id: "fibonacci",
        title: "Fibonacci Sequence (DP)",
        component: DPFibonacciVisualizer,
        explanation: fibonacciExplanationContent,
        codeSnippets: fibonacciCodeSnippets,
      },
      {
        id: "knapsack-01",
        title: "0/1 Knapsack Problem",
        component: DPKnapsack01Visualizer,
        explanation: knapsack01ExplanationContent,
        codeSnippets: knapsack01CodeSnippets,
      },
    ],
  },

  // Enhanced Greedy section
  {
    id: "greedy",
    title: "Part 3E: Greedy Algorithms",
    algorithms: [
      {
        id: "activity-selection",
        title: "Activity Selection Problem",
        component: GreedyActivitySelectionVisualizer,
        explanation: activitySelectionExplanationContent,
        codeSnippets: activitySelectionCodeSnippets,
      },
    ],
  },

  // Part 3F: String Algorithms
  {
    id: "strings",
    title: "Part 3F: String Algorithms",
    algorithms: [
      {
        id: "string-basics",
        title: "String Fundamentals & Pattern Matching",
        component: StringVisualizer,
        explanation: stringBasicsExplanationContent,
        codeSnippets: stringBasicsCodeSnippets,
      },
    ],
  },

  // Part 3G: Advanced Problem-Solving Techniques
  {
    id: "problem-solving",
    title: "Part 3G: Advanced Problem-Solving Techniques",
    algorithms: [
      {
        id: "backtracking-basics",
        title: "Backtracking Algorithm",
        component: BacktrackingVisualizer,
        explanation: backtrackingBasicsExplanationContent,
        codeSnippets: backtrackingBasicsCodeSnippets,
      },
    ],
  },
] 