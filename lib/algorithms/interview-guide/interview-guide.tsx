import type React from "react"
import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const interviewGuideExplanationContent = (
  <AlgorithmExplanation>
    <h2>DSA Interview Cheat Sheet</h2>
    <p>
      This comprehensive guide provides a structured approach to tackling any coding interview problem. 
      It's designed to take you from understanding the problem to implementing an optimal solution using 
      the proven U.P.E.R. framework.
    </p>
    
    <h3>What You'll Learn:</h3>
    <ol>
      <li><strong>The U.P.E.R. Framework:</strong> A systematic approach to problem-solving that impresses interviewers</li>
      <li><strong>Data Structures Cheat Sheet:</strong> When to use which data structure, organized by difficulty</li>
      <li><strong>Complexity Analysis:</strong> How to quickly identify time and space requirements</li>
      <li><strong>Real Examples:</strong> See the framework applied to classic problems like Two Sum</li>
    </ol>

    <h3>The U.P.E.R. Framework Breakdown:</h3>
    <ul>
      <li><strong>U - Understand:</strong> Clarify the problem, inputs, outputs, and constraints</li>
      <li><strong>P - Plan:</strong> Start with brute force, then optimize using appropriate data structures</li>
      <li><strong>E - Execute:</strong> Implement clean, well-commented code</li>
      <li><strong>R - Review:</strong> Test with examples, verify complexity, and refactor</li>
    </ul>

    <h3>Key Success Patterns:</h3>
    <p>
      Most interview problems follow predictable patterns. Hash Maps are often the key to optimizing 
      O(n²) brute force solutions to O(n). Two pointers work great on sorted arrays. BFS is perfect 
      for shortest path in unweighted graphs. This cheat sheet helps you quickly identify these patterns.
    </p>

    <h3>Why This Works:</h3>
    <p>
      This approach works because it demonstrates both technical competence and structured thinking. 
      Interviewers care more about your problem-solving process than getting the perfect answer immediately. 
      By following U.P.E.R., you show that you can break down complex problems systematically.
    </p>

    <h3>Practice Strategy:</h3>
    <p>
      Use this guide as a reference while practicing problems on LeetCode, HackerRank, or other platforms. 
      Don't just solve problems—practice the framework until it becomes second nature. Time yourself 
      explaining the U.P.E.R. steps for different problem types.
    </p>
  </AlgorithmExplanation>
)

export const interviewGuideCodeSnippets = {
  python: `# Two Sum - Complete U.P.E.R. Example
def two_sum(nums, target):
    """
    U - Understand: Find two indices whose values sum to target
    P - Plan: Use hash map to optimize from O(n²) to O(n)
    E - Execute: Implement the optimized solution
    R - Review: Test and verify complexity
    """
    seen_map = {}  # {value: index}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        # Check if complement exists in our map
        if complement in seen_map:
            return [seen_map[complement], i]
        
        # Store current number and its index
        seen_map[num] = i
    
    return []  # No solution found

# Framework Application Template
def solve_problem(input_data):
    # U - Understand & Clarify
    # - What is the input format?
    # - What should the output be?
    # - What are the constraints?
    # - What are the edge cases?
    
    # P - Plan & Strategize
    # 1. Brute force approach (always start here)
    # 2. Identify bottlenecks
    # 3. Choose optimal data structure
    # 4. Optimize the solution
    
    # E - Execute (Implement)
    # Write clean, well-commented code
    
    # R - Review & Refactor
    # Test with examples and edge cases
    pass`,

  javascript: `// Two Sum - Complete U.P.E.R. Example
function twoSum(nums, target) {
    /*
    U - Understand: Find two indices whose values sum to target
    P - Plan: Use Map to optimize from O(n²) to O(n)
    E - Execute: Implement the optimized solution
    R - Review: Test and verify complexity
    */
    const seenMap = new Map(); // value -> index
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        // Check if complement exists in our map
        if (seenMap.has(complement)) {
            return [seenMap.get(complement), i];
        }
        
        // Store current number and its index
        seenMap.set(nums[i], i);
    }
    
    return []; // No solution found
}

// Common Data Structure Patterns
const patterns = {
    // Hash Map for O(1) lookups
    frequencyCount: (arr) => {
        const freq = new Map();
        for (const item of arr) {
            freq.set(item, (freq.get(item) || 0) + 1);
        }
        return freq;
    },
    
    // Two Pointers for sorted arrays
    twoPointers: (arr, target) => {
        let left = 0, right = arr.length - 1;
        while (left < right) {
            const sum = arr[left] + arr[right];
            if (sum === target) return [left, right];
            else if (sum < target) left++;
            else right--;
        }
        return [-1, -1];
    },
    
    // Sliding Window for subarrays
    slidingWindow: (arr, k) => {
        let windowSum = arr.slice(0, k).reduce((a, b) => a + b, 0);
        let maxSum = windowSum;
        
        for (let i = k; i < arr.length; i++) {
            windowSum = windowSum - arr[i - k] + arr[i];
            maxSum = Math.max(maxSum, windowSum);
        }
        return maxSum;
    }
};`,

  typescript: `// Two Sum - Complete U.P.E.R. Example
function twoSum(nums: number[], target: number): number[] {
    /*
    U - Understand: Find two indices whose values sum to target
    P - Plan: Use Map to optimize from O(n²) to O(n)
    E - Execute: Implement the optimized solution
    R - Review: Test and verify complexity
    */
    const seenMap = new Map<number, number>(); // value -> index
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        // Check if complement exists in our map
        if (seenMap.has(complement)) {
            return [seenMap.get(complement)!, i];
        }
        
        // Store current number and its index
        seenMap.set(nums[i], i);
    }
    
    return []; // No solution found
}

// Data Structure Selection Guide
interface DataStructurePattern {
    name: string;
    timeComplexity: string;
    spaceComplexity: string;
    useCase: string;
    keywords: string[];
}

const dataStructureGuide: DataStructurePattern[] = [
    {
        name: "Hash Map",
        timeComplexity: "O(1) average",
        spaceComplexity: "O(n)",
        useCase: "Fast lookups, frequency counting, avoiding O(n²)",
        keywords: ["frequency", "duplicates", "lookup", "optimize"]
    },
    {
        name: "Two Pointers",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        useCase: "Sorted array problems, finding pairs",
        keywords: ["sorted", "pair", "sum", "palindrome"]
    },
    {
        name: "Stack",
        timeComplexity: "O(1) operations",
        spaceComplexity: "O(n)",
        useCase: "LIFO behavior, parentheses, backtracking",
        keywords: ["LIFO", "parentheses", "undo", "next greater"]
    },
    {
        name: "Queue",
        timeComplexity: "O(1) operations", 
        spaceComplexity: "O(n)",
        useCase: "FIFO behavior, BFS, level-order traversal",
        keywords: ["FIFO", "BFS", "level-order", "process order"]
    }
];

// U.P.E.R. Framework Template
function solveWithUPER<T, R>(input: T): R {
    // U - Understand & Clarify
    // - What is the input type and format?
    // - What should the output type be?
    // - What are the constraints and edge cases?
    
    // P - Plan & Strategize  
    // 1. Brute force approach (O(n²) usually)
    // 2. Identify bottlenecks in the brute force
    // 3. Select appropriate data structure
    // 4. Optimize to better complexity
    
    // E - Execute (Implement)
    // Write clean, typed, well-documented code
    
    // R - Review & Refactor
    // Test with examples, verify complexity, clean up
    
    throw new Error("Implementation needed");
}`,

  java: `// Two Sum - Complete U.P.E.R. Example
import java.util.*;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        /*
        U - Understand: Find two indices whose values sum to target
        P - Plan: Use HashMap to optimize from O(n²) to O(n)
        E - Execute: Implement the optimized solution
        R - Review: Test and verify complexity
        */
        Map<Integer, Integer> seenMap = new HashMap<>(); // value -> index
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            // Check if complement exists in our map
            if (seenMap.containsKey(complement)) {
                return new int[]{seenMap.get(complement), i};
            }
            
            // Store current number and its index
            seenMap.put(nums[i], i);
        }
        
        return new int[]{}; // No solution found
    }
}

// Common Patterns for Interview Success
class InterviewPatterns {
    
    // Pattern 1: Hash Map for frequency counting
    public Map<Character, Integer> countFrequency(String s) {
        Map<Character, Integer> freq = new HashMap<>();
        for (char c : s.toCharArray()) {
            freq.put(c, freq.getOrDefault(c, 0) + 1);
        }
        return freq;
    }
    
    // Pattern 2: Two Pointers for sorted arrays
    public int[] twoPointersSum(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int sum = arr[left] + arr[right];
            if (sum == target) return new int[]{left, right};
            else if (sum < target) left++;
            else right--;
        }
        return new int[]{-1, -1};
    }
    
    // Pattern 3: Sliding Window for subarray problems
    public int maxSumSubarray(int[] arr, int k) {
        int windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += arr[i];
        }
        
        int maxSum = windowSum;
        for (int i = k; i < arr.length; i++) {
            windowSum = windowSum - arr[i - k] + arr[i];
            maxSum = Math.max(maxSum, windowSum);
        }
        return maxSum;
    }
}`
} 