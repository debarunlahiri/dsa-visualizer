import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const fibonacciExplanationContent = (
  <AlgorithmExplanation>
    <h2>Fibonacci with Memoization</h2>
    <p>
      The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones. Dynamic
      Programming optimizes the naive recursive approach by storing previously computed results to avoid redundant
      calculations.
    </p>
    <h3>Problem:</h3>
    <p>Calculate the nth Fibonacci number where F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n ≥ 2.</p>
    <h3>Approaches:</h3>
    <ol>
      <li>
        <strong>Naive Recursion:</strong> Simple but exponential time complexity due to overlapping subproblems.
      </li>
      <li>
        <strong>Memoization (Top-Down DP):</strong> Cache results of function calls to avoid recomputation.
      </li>
      <li>
        <strong>Tabulation (Bottom-Up DP):</strong> Build solution iteratively from smaller subproblems.
      </li>
      <li>
        <strong>Space Optimized:</strong> Use only two variables since we only need the last two values.
      </li>
    </ol>
    <h3>Time Complexity:</h3>
    <ul>
      <li>
        <strong>Naive Recursion:</strong> $$O(2^n)$$ - exponential
      </li>
      <li>
        <strong>Memoization/Tabulation:</strong> $$O(n)$$ - linear
      </li>
      <li>
        <strong>Space Optimized:</strong> $$O(n)$$ time, $$O(1)$$ space
      </li>
    </ul>
    <h3>Space Complexity:</h3>
    <ul>
      <li>
        <strong>Memoization:</strong> $$O(n)$$ for the cache + $$O(n)$$ for recursion stack
      </li>
      <li>
        <strong>Tabulation:</strong> $$O(n)$$ for the DP array
      </li>
      <li>
        <strong>Space Optimized:</strong> $$O(1)$$
      </li>
    </ul>
  </AlgorithmExplanation>
)

export const fibonacciCodeSnippets = {
  python: `# Memoization (Top-Down DP)
def fibonacci_memo(n, memo=None):
    if memo is None:
        memo = {}
    
    if n in memo:
        return memo[n]
    
    if n <= 1:
        return n
    
    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]

# Tabulation (Bottom-Up DP)
def fibonacci_tab(n):
    if n <= 1:
        return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]

# Space Optimized
def fibonacci_optimized(n):
    if n <= 1:
        return n
    
    prev2, prev1 = 0, 1
    
    for i in range(2, n + 1):
        current = prev1 + prev2
        prev2, prev1 = prev1, current
    
    return prev1`,
  javascript: `// Memoization (Top-Down DP)
function fibonacciMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  
  if (n <= 1) return n;
  
  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}

// Tabulation (Bottom-Up DP)
function fibonacciTab(n) {
  if (n <= 1) return n;
  
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}

// Space Optimized
function fibonacciOptimized(n) {
  if (n <= 1) return n;
  
  let prev2 = 0, prev1 = 1;
  
  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}`,
  typescript: `// Memoization (Top-Down DP)
function fibonacciMemo(n: number, memo: Record<number, number> = {}): number {
  if (n in memo) return memo[n];
  
  if (n <= 1) return n;
  
  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}

// Tabulation (Bottom-Up DP)
function fibonacciTab(n: number): number {
  if (n <= 1) return n;
  
  const dp: number[] = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}

// Space Optimized
function fibonacciOptimized(n: number): number {
  if (n <= 1) return n;
  
  let prev2 = 0, prev1 = 1;
  
  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}`,

  java: `import java.util.*;

public class Fibonacci {
    // Memoization (Top-Down DP)
    public static long fibonacciMemo(int n) {
        Map<Integer, Long> memo = new HashMap<>();
        return fibonacciMemoHelper(n, memo);
    }
    
    private static long fibonacciMemoHelper(int n, Map<Integer, Long> memo) {
        if (memo.containsKey(n)) return memo.get(n);
        
        if (n <= 1) return n;
        
        long result = fibonacciMemoHelper(n - 1, memo) + fibonacciMemoHelper(n - 2, memo);
        memo.put(n, result);
        return result;
    }
    
    // Tabulation (Bottom-Up DP)
    public static long fibonacciTab(int n) {
        if (n <= 1) return n;
        
        long[] dp = new long[n + 1];
        dp[0] = 0;
        dp[1] = 1;
        
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
    }
    
    // Space Optimized
    public static long fibonacciOptimized(int n) {
        if (n <= 1) return n;
        
        long prev2 = 0, prev1 = 1;
        
        for (int i = 2; i <= n; i++) {
            long current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
}`,

  cpp: `#include <iostream>
#include <vector>
#include <unordered_map>

class Fibonacci {
public:
    // Memoization (Top-Down DP)
    static long long fibonacciMemo(int n) {
        std::unordered_map<int, long long> memo;
        return fibonacciMemoHelper(n, memo);
    }
    
private:
    static long long fibonacciMemoHelper(int n, std::unordered_map<int, long long>& memo) {
        if (memo.find(n) != memo.end()) return memo[n];
        
        if (n <= 1) return n;
        
        long long result = fibonacciMemoHelper(n - 1, memo) + fibonacciMemoHelper(n - 2, memo);
        memo[n] = result;
        return result;
    }
    
public:
    // Tabulation (Bottom-Up DP)
    static long long fibonacciTab(int n) {
        if (n <= 1) return n;
        
        std::vector<long long> dp(n + 1);
        dp[0] = 0;
        dp[1] = 1;
        
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
    }
    
    // Space Optimized
    static long long fibonacciOptimized(int n) {
        if (n <= 1) return n;
        
        long long prev2 = 0, prev1 = 1;
        
        for (int i = 2; i <= n; i++) {
            long long current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
};`,

  csharp: `using System;
using System.Collections.Generic;

public class Fibonacci 
{
    // Memoization (Top-Down DP)
    public static long FibonacciMemo(int n) 
    {
        Dictionary<int, long> memo = new Dictionary<int, long>();
        return FibonacciMemoHelper(n, memo);
    }
    
    private static long FibonacciMemoHelper(int n, Dictionary<int, long> memo) 
    {
        if (memo.ContainsKey(n)) return memo[n];
        
        if (n <= 1) return n;
        
        long result = FibonacciMemoHelper(n - 1, memo) + FibonacciMemoHelper(n - 2, memo);
        memo[n] = result;
        return result;
    }
    
    // Tabulation (Bottom-Up DP)
    public static long FibonacciTab(int n) 
    {
        if (n <= 1) return n;
        
        long[] dp = new long[n + 1];
        dp[0] = 0;
        dp[1] = 1;
        
        for (int i = 2; i <= n; i++) 
        {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
    }
    
    // Space Optimized
    public static long FibonacciOptimized(int n) 
    {
        if (n <= 1) return n;
        
        long prev2 = 0, prev1 = 1;
        
        for (int i = 2; i <= n; i++) 
        {
            long current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
}`,

  php: `<?php
class Fibonacci {
    // Memoization (Top-Down DP)
    public static function fibonacciMemo($n, &$memo = []) {
        if (isset($memo[$n])) return $memo[$n];
        
        if ($n <= 1) return $n;
        
        $memo[$n] = self::fibonacciMemo($n - 1, $memo) + self::fibonacciMemo($n - 2, $memo);
        return $memo[$n];
    }
    
    // Tabulation (Bottom-Up DP)
    public static function fibonacciTab($n) {
        if ($n <= 1) return $n;
        
        $dp = array_fill(0, $n + 1, 0);
        $dp[1] = 1;
        
        for ($i = 2; $i <= $n; $i++) {
            $dp[$i] = $dp[$i - 1] + $dp[$i - 2];
        }
        
        return $dp[$n];
    }
    
    // Space Optimized
    public static function fibonacciOptimized($n) {
        if ($n <= 1) return $n;
        
        $prev2 = 0;
        $prev1 = 1;
        
        for ($i = 2; $i <= $n; $i++) {
            $current = $prev1 + $prev2;
            $prev2 = $prev1;
            $prev1 = $current;
        }
        
        return $prev1;
    }
}
?>`,

  ruby: `class Fibonacci
  # Memoization (Top-Down DP)
  def self.fibonacci_memo(n, memo = {})
    return memo[n] if memo.key?(n)
    
    return n if n <= 1
    
    memo[n] = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo)
    memo[n]
  end
  
  # Tabulation (Bottom-Up DP)
  def self.fibonacci_tab(n)
    return n if n <= 1
    
    dp = Array.new(n + 1, 0)
    dp[1] = 1
    
    (2..n).each do |i|
      dp[i] = dp[i - 1] + dp[i - 2]
    end
    
    dp[n]
  end
  
  # Space Optimized
  def self.fibonacci_optimized(n)
    return n if n <= 1
    
    prev2, prev1 = 0, 1
    
    (2..n).each do |i|
      current = prev1 + prev2
      prev2, prev1 = prev1, current
    end
    
    prev1
  end
end`,

  swift: `import Foundation

class Fibonacci {
    // Memoization (Top-Down DP)
    static func fibonacciMemo(_ n: Int, memo: inout [Int: Int]) -> Int {
        if let cached = memo[n] { return cached }
        
        if n <= 1 { return n }
        
        let result = fibonacciMemo(n - 1, memo: &memo) + fibonacciMemo(n - 2, memo: &memo)
        memo[n] = result
        return result
    }
    
    static func fibonacciMemo(_ n: Int) -> Int {
        var memo: [Int: Int] = [:]
        return fibonacciMemo(n, memo: &memo)
    }
    
    // Tabulation (Bottom-Up DP)
    static func fibonacciTab(_ n: Int) -> Int {
        if n <= 1 { return n }
        
        var dp = Array(repeating: 0, count: n + 1)
        dp[1] = 1
        
        for i in 2...n {
            dp[i] = dp[i - 1] + dp[i - 2]
        }
        
        return dp[n]
    }
    
    // Space Optimized
    static func fibonacciOptimized(_ n: Int) -> Int {
        if n <= 1 { return n }
        
        var prev2 = 0, prev1 = 1
        
        for _ in 2...n {
            let current = prev1 + prev2
            prev2 = prev1
            prev1 = current
        }
        
        return prev1
    }
}`,

  go: `package main

// Memoization (Top-Down DP)
func fibonacciMemo(n int) int {
    memo := make(map[int]int)
    return fibonacciMemoHelper(n, memo)
}

func fibonacciMemoHelper(n int, memo map[int]int) int {
    if val, exists := memo[n]; exists {
        return val
    }
    
    if n <= 1 {
        return n
    }
    
    result := fibonacciMemoHelper(n-1, memo) + fibonacciMemoHelper(n-2, memo)
    memo[n] = result
    return result
}

// Tabulation (Bottom-Up DP)
func fibonacciTab(n int) int {
    if n <= 1 {
        return n
    }
    
    dp := make([]int, n+1)
    dp[0] = 0
    dp[1] = 1
    
    for i := 2; i <= n; i++ {
        dp[i] = dp[i-1] + dp[i-2]
    }
    
    return dp[n]
}

// Space Optimized
func fibonacciOptimized(n int) int {
    if n <= 1 {
        return n
    }
    
    prev2, prev1 := 0, 1
    
    for i := 2; i <= n; i++ {
        current := prev1 + prev2
        prev2, prev1 = prev1, current
    }
    
    return prev1
}`
} 