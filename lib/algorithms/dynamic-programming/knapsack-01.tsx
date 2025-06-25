import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const knapsack01ExplanationContent = (
  <AlgorithmExplanation>
    <h2>0/1 Knapsack Problem</h2>
    <p>
      The 0/1 Knapsack problem is a classic optimization problem where you have a knapsack with a weight limit and a set
      of items, each with a weight and value. The goal is to maximize the total value of items in the knapsack without
      exceeding the weight limit. Each item can either be taken (1) or not taken (0).
    </p>
    <h3>Problem Statement:</h3>
    <p>
      Given n items with weights w[0..n-1] and values v[0..n-1], and a knapsack with capacity W, find the maximum value
      that can be obtained.
    </p>
    <h3>Dynamic Programming Approach:</h3>
    <ol>
      <li>
        <strong>Subproblem:</strong> dp[i][w] = maximum value using first i items with weight limit w
      </li>
      <li>
        <strong>Base Case:</strong> dp[0][w] = 0 (no items), dp[i][0] = 0 (no capacity)
      </li>
      <li>
        <strong>Recurrence:</strong> For each item i and weight w:
        <ul>
          <li>If weight[i] ≤ w: dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])</li>
          <li>Else: dp[i][w] = dp[i-1][w] (can't include item)</li>
        </ul>
      </li>
    </ol>
    <h3>Time Complexity:</h3>
    <p>$$O(n \times W)$$ where n is the number of items and W is the knapsack capacity.</p>
    <h3>Space Complexity:</h3>
    <ul>
      <li>
        <strong>Standard DP:</strong> $$O(n \times W)$$ for the 2D DP table
      </li>
      <li>
        <strong>Space Optimized:</strong> $$O(W)$$ using only one row
      </li>
    </ul>
    <h3>Applications:</h3>
    <ul>
      <li>Resource allocation</li>
      <li>Budget optimization</li>
      <li>Portfolio selection</li>
      <li>Loading cargo</li>
    </ul>
  </AlgorithmExplanation>
)

export const knapsack01CodeSnippets = {
  python: `# Standard 2D DP approach
def knapsack_01(weights, values, capacity):
    n = len(weights)
    # dp[i][w] = max value with first i items and capacity w
    dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # Don't take item i-1
            dp[i][w] = dp[i-1][w]
            
            # Take item i-1 if possible
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], 
                              dp[i-1][w - weights[i-1]] + values[i-1])
    
    return dp[n][capacity]

# Space optimized version
def knapsack_01_optimized(weights, values, capacity):
    n = len(weights)
    dp = [0] * (capacity + 1)
    
    for i in range(n):
        # Traverse backwards to avoid using updated values
        for w in range(capacity, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    
    return dp[capacity]

# With item tracking
def knapsack_01_with_items(weights, values, capacity):
    n = len(weights)
    dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            dp[i][w] = dp[i-1][w]
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], 
                              dp[i-1][w - weights[i-1]] + values[i-1])
    
    # Backtrack to find selected items
    w = capacity
    selected_items = []
    for i in range(n, 0, -1):
        if dp[i][w] != dp[i-1][w]:
            selected_items.append(i-1)
            w -= weights[i-1]
    
    return dp[n][capacity], selected_items[::-1]`,
  javascript: `// Standard 2D DP approach
function knapsack01(weights, values, capacity) {
  const n = weights.length;
  // dp[i][w] = max value with first i items and capacity w
  const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      // Don't take item i-1
      dp[i][w] = dp[i-1][w];
      
      // Take item i-1 if possible
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(dp[i][w], 
                           dp[i-1][w - weights[i-1]] + values[i-1]);
      }
    }
  }
  
  return dp[n][capacity];
}

// Space optimized version
function knapsack01Optimized(weights, values, capacity) {
  const n = weights.length;
  const dp = new Array(capacity + 1).fill(0);
  
  for (let i = 0; i < n; i++) {
    // Traverse backwards to avoid using updated values
    for (let w = capacity; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }
  
  return dp[capacity];
}

// With item tracking
function knapsack01WithItems(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i-1][w];
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(dp[i][w], 
                           dp[i-1][w - weights[i-1]] + values[i-1]);
      }
    }
  }
  
  // Backtrack to find selected items
  let w = capacity;
  const selectedItems = [];
  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i-1][w]) {
      selectedItems.push(i-1);
      w -= weights[i-1];
    }
  }
  
  return { maxValue: dp[n][capacity], items: selectedItems.reverse() };
}`,
  typescript: `// Standard 2D DP approach
function knapsack01(weights: number[], values: number[], capacity: number): number {
  const n = weights.length;
  // dp[i][w] = max value with first i items and capacity w
  const dp: number[][] = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      // Don't take item i-1
      dp[i][w] = dp[i-1][w];
      
      // Take item i-1 if possible
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(dp[i][w], 
                           dp[i-1][w - weights[i-1]] + values[i-1]);
      }
    }
  }
  
  return dp[n][capacity];
}

// Space optimized version
function knapsack01Optimized(weights: number[], values: number[], capacity: number): number {
  const n = weights.length;
  const dp: number[] = new Array(capacity + 1).fill(0);
  
  for (let i = 0; i < n; i++) {
    // Traverse backwards to avoid using updated values
    for (let w = capacity; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }
  
  return dp[capacity];
}

// With item tracking
interface KnapsackResult {
  maxValue: number;
  items: number[];
}

function knapsack01WithItems(weights: number[], values: number[], capacity: number): KnapsackResult {
  const n = weights.length;
  const dp: number[][] = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i-1][w];
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(dp[i][w], 
                           dp[i-1][w - weights[i-1]] + values[i-1]);
      }
    }
  }
  
  // Backtrack to find selected items
  let w = capacity;
  const selectedItems: number[] = [];
  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i-1][w]) {
      selectedItems.push(i-1);
      w -= weights[i-1];
    }
  }
  
  return { maxValue: dp[n][capacity], items: selectedItems.reverse() };
}`,

  java: `import java.util.*;

public class Knapsack01 {
    // Standard 2D DP approach
    public static int knapsack01(int[] weights, int[] values, int capacity) {
        int n = weights.length;
        // dp[i][w] = max value with first i items and capacity w
        int[][] dp = new int[n + 1][capacity + 1];
        
        for (int i = 1; i <= n; i++) {
            for (int w = 0; w <= capacity; w++) {
                // Don't take item i-1
                dp[i][w] = dp[i-1][w];
                
                // Take item i-1 if possible
                if (weights[i-1] <= w) {
                    dp[i][w] = Math.max(dp[i][w], 
                                       dp[i-1][w - weights[i-1]] + values[i-1]);
                }
            }
        }
        
        return dp[n][capacity];
    }
    
    // Space optimized version
    public static int knapsack01Optimized(int[] weights, int[] values, int capacity) {
        int n = weights.length;
        int[] dp = new int[capacity + 1];
        
        for (int i = 0; i < n; i++) {
            // Traverse backwards to avoid using updated values
            for (int w = capacity; w >= weights[i]; w--) {
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
        
        return dp[capacity];
    }
}`,

  cpp: `#include <iostream>
#include <vector>
#include <algorithm>

class Knapsack01 {
public:
    // Standard 2D DP approach
    static int knapsack01(const std::vector<int>& weights, const std::vector<int>& values, int capacity) {
        int n = weights.size();
        // dp[i][w] = max value with first i items and capacity w
        std::vector<std::vector<int>> dp(n + 1, std::vector<int>(capacity + 1, 0));
        
        for (int i = 1; i <= n; i++) {
            for (int w = 0; w <= capacity; w++) {
                // Don't take item i-1
                dp[i][w] = dp[i-1][w];
                
                // Take item i-1 if possible
                if (weights[i-1] <= w) {
                    dp[i][w] = std::max(dp[i][w], 
                                       dp[i-1][w - weights[i-1]] + values[i-1]);
                }
            }
        }
        
        return dp[n][capacity];
    }
    
    // Space optimized version
    static int knapsack01Optimized(const std::vector<int>& weights, 
                                  const std::vector<int>& values, int capacity) {
        int n = weights.size();
        std::vector<int> dp(capacity + 1, 0);
        
        for (int i = 0; i < n; i++) {
            // Traverse backwards to avoid using updated values
            for (int w = capacity; w >= weights[i]; w--) {
                dp[w] = std::max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
        
        return dp[capacity];
    }
};`,

  csharp: `using System;
using System.Collections.Generic;

public class Knapsack01 
{
    // Standard 2D DP approach
    public static int Knapsack01DP(int[] weights, int[] values, int capacity) 
    {
        int n = weights.Length;
        // dp[i,w] = max value with first i items and capacity w
        int[,] dp = new int[n + 1, capacity + 1];
        
        for (int i = 1; i <= n; i++) 
        {
            for (int w = 0; w <= capacity; w++) 
            {
                // Don't take item i-1
                dp[i, w] = dp[i-1, w];
                
                // Take item i-1 if possible
                if (weights[i-1] <= w) 
                {
                    dp[i, w] = Math.Max(dp[i, w], 
                                       dp[i-1, w - weights[i-1]] + values[i-1]);
                }
            }
        }
        
        return dp[n, capacity];
    }
    
    // Space optimized version
    public static int Knapsack01Optimized(int[] weights, int[] values, int capacity) 
    {
        int n = weights.Length;
        int[] dp = new int[capacity + 1];
        
        for (int i = 0; i < n; i++) 
        {
            // Traverse backwards to avoid using updated values
            for (int w = capacity; w >= weights[i]; w--) 
            {
                dp[w] = Math.Max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
        
        return dp[capacity];
    }
}`,

  php: `<?php
class Knapsack01 {
    // Standard 2D DP approach
    public static function knapsack01($weights, $values, $capacity) {
        $n = count($weights);
        // dp[i][w] = max value with first i items and capacity w
        $dp = array_fill(0, $n + 1, array_fill(0, $capacity + 1, 0));
        
        for ($i = 1; $i <= $n; $i++) {
            for ($w = 0; $w <= $capacity; $w++) {
                // Don't take item i-1
                $dp[$i][$w] = $dp[$i-1][$w];
                
                // Take item i-1 if possible
                if ($weights[$i-1] <= $w) {
                    $dp[$i][$w] = max($dp[$i][$w], 
                                     $dp[$i-1][$w - $weights[$i-1]] + $values[$i-1]);
                }
            }
        }
        
        return $dp[$n][$capacity];
    }
    
    // Space optimized version
    public static function knapsack01Optimized($weights, $values, $capacity) {
        $n = count($weights);
        $dp = array_fill(0, $capacity + 1, 0);
        
        for ($i = 0; $i < $n; $i++) {
            // Traverse backwards to avoid using updated values
            for ($w = $capacity; $w >= $weights[$i]; $w--) {
                $dp[$w] = max($dp[$w], $dp[$w - $weights[$i]] + $values[$i]);
            }
        }
        
        return $dp[$capacity];
    }
}
?>`,

  ruby: `class Knapsack01
  # Standard 2D DP approach
  def self.knapsack_01(weights, values, capacity)
    n = weights.length
    # dp[i][w] = max value with first i items and capacity w
    dp = Array.new(n + 1) { Array.new(capacity + 1, 0) }
    
    (1..n).each do |i|
      (0..capacity).each do |w|
        # Don't take item i-1
        dp[i][w] = dp[i-1][w]
        
        # Take item i-1 if possible
        if weights[i-1] <= w
          dp[i][w] = [dp[i][w], 
                      dp[i-1][w - weights[i-1]] + values[i-1]].max
        end
      end
    end
    
    dp[n][capacity]
  end
  
  # Space optimized version
  def self.knapsack_01_optimized(weights, values, capacity)
    n = weights.length
    dp = Array.new(capacity + 1, 0)
    
    (0...n).each do |i|
      # Traverse backwards to avoid using updated values
      capacity.downto(weights[i]) do |w|
        dp[w] = [dp[w], dp[w - weights[i]] + values[i]].max
      end
    end
    
    dp[capacity]
  end
end`,

  swift: `import Foundation

class Knapsack01 {
    // Standard 2D DP approach
    static func knapsack01(_ weights: [Int], _ values: [Int], _ capacity: Int) -> Int {
        let n = weights.count
        // dp[i][w] = max value with first i items and capacity w
        var dp = Array(repeating: Array(repeating: 0, count: capacity + 1), count: n + 1)
        
        for i in 1...n {
            for w in 0...capacity {
                // Don't take item i-1
                dp[i][w] = dp[i-1][w]
                
                // Take item i-1 if possible
                if weights[i-1] <= w {
                    dp[i][w] = max(dp[i][w], 
                                  dp[i-1][w - weights[i-1]] + values[i-1])
                }
            }
        }
        
        return dp[n][capacity]
    }
    
    // Space optimized version
    static func knapsack01Optimized(_ weights: [Int], _ values: [Int], _ capacity: Int) -> Int {
        let n = weights.count
        var dp = Array(repeating: 0, count: capacity + 1)
        
        for i in 0..<n {
            // Traverse backwards to avoid using updated values
            for w in stride(from: capacity, through: weights[i], by: -1) {
                dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
            }
        }
        
        return dp[capacity]
    }
}`,

  go: `package main

// Standard 2D DP approach
func knapsack01(weights, values []int, capacity int) int {
    n := len(weights)
    // dp[i][w] = max value with first i items and capacity w
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, capacity+1)
    }
    
    for i := 1; i <= n; i++ {
        for w := 0; w <= capacity; w++ {
            // Don't take item i-1
            dp[i][w] = dp[i-1][w]
            
            // Take item i-1 if possible
            if weights[i-1] <= w {
                value := dp[i-1][w-weights[i-1]] + values[i-1]
                if value > dp[i][w] {
                    dp[i][w] = value
                }
            }
        }
    }
    
    return dp[n][capacity]
}

// Space optimized version
func knapsack01Optimized(weights, values []int, capacity int) int {
    n := len(weights)
    dp := make([]int, capacity+1)
    
    for i := 0; i < n; i++ {
        // Traverse backwards to avoid using updated values
        for w := capacity; w >= weights[i]; w-- {
            value := dp[w-weights[i]] + values[i]
            if value > dp[w] {
                dp[w] = value
            }
        }
    }
    
    return dp[capacity]
}`
} 