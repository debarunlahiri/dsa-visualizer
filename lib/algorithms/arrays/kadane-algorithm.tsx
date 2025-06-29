import React from "react"
import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const kadaneAlgorithmExplanationContent = (
  <AlgorithmExplanation>
    <h2>Kadane's Algorithm (Maximum Subarray Sum)</h2>
    <p>
      An efficient dynamic programming algorithm to find the maximum sum of any contiguous subarray in linear time.
    </p>
    
    <h3>What is Kadane's Algorithm?</h3>
    <p>
      Kadane's Algorithm is a dynamic programming technique used to solve the Maximum Subarray Sum problem efficiently. 
      Given an array of integers (which may include negative numbers), it finds the contiguous subarray with the largest sum in O(n) time and O(1) space.
    </p>
    <p>
      <strong>The Problem:</strong><br/>
      Given array: [-2, 1, -3, 4, -1, 2, 1, -5, 4]<br/>
      Find the contiguous subarray with maximum sum: [4, -1, 2, 1] = 6
    </p>
    <p>
      <strong>Key Insight:</strong><br/>
      At each position, we decide whether to:
    </p>
    <ol>
      <li>Start a new subarray from current element</li>
      <li>Extend the existing subarray to include current element</li>
    </ol>
    <p>
      <strong>Core Principle:</strong><br/>
      If the sum so far becomes negative, it's better to start fresh from the current element rather than carrying the negative sum forward.
    </p>

    <h3>How Kadane's Algorithm Works</h3>
    <p>
      <strong>Step-by-Step Process:</strong>
    </p>
    <ol>
      <li>Initialize: max_sum = first element, current_sum = first element</li>
      <li>For each element from index 1 to n-1:
        <ul>
          <li>current_sum = max(element, current_sum + element)</li>
          <li>max_sum = max(max_sum, current_sum)</li>
        </ul>
      </li>
      <li>Return max_sum</li>
    </ol>

    <h3>Time & Space Complexity</h3>
    <ul>
      <li><strong>Time Complexity:</strong> $$O(n)$$ - Single pass through the array</li>
      <li><strong>Space Complexity:</strong> $$O(1)$$ - Only uses a few variables</li>
    </ul>

    <h3>Real-World Applications</h3>
    <ul>
      <li><strong>Financial Analysis:</strong> Stock trading, maximum profit periods</li>
      <li><strong>Data Analytics:</strong> Time series analysis, peak performance periods</li>
      <li><strong>Machine Learning:</strong> Feature selection, signal processing</li>
      <li><strong>Gaming:</strong> Score maximization algorithms</li>
      <li><strong>Bioinformatics:</strong> DNA sequence analysis</li>
    </ul>
  </AlgorithmExplanation>
)

export const kadaneAlgorithmCodeSnippets = {
  python: `# Basic Kadane's Algorithm
def kadane_max_sum(arr):
    if not arr:
        return 0
    
    max_sum = current_sum = arr[0]
    for i in range(1, len(arr)):
        current_sum = max(arr[i], current_sum + arr[i])
        max_sum = max(max_sum, current_sum)
    return max_sum

# With subarray tracking
def kadane_with_subarray(arr):
    max_sum = current_sum = arr[0]
    start = end = 0
    temp_start = 0
    
    for i in range(1, len(arr)):
        if current_sum < 0:
            current_sum = arr[i]
            temp_start = i
        else:
            current_sum += arr[i]
        
        if current_sum > max_sum:
            max_sum = current_sum
            start = temp_start
            end = i
    
    return max_sum, start, end`,

  javascript: `// Basic Kadane's Algorithm
function kadaneMaxSum(arr) {
    if (arr.length === 0) return 0;
    
    let maxSum = arr[0];
    let currentSum = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        currentSum = Math.max(arr[i], currentSum + arr[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}

// With subarray tracking
function kadaneWithSubarray(arr) {
    let maxSum = arr[0];
    let currentSum = arr[0];
    let start = 0, end = 0, tempStart = 0;
    
    for (let i = 1; i < arr.length; i++) {
        if (currentSum < 0) {
            currentSum = arr[i];
            tempStart = i;
        } else {
            currentSum += arr[i];
        }
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }
    }
    
    return { maxSum, start, end };
}`,

  java: `// Basic Kadane's Algorithm
public static int kadaneMaxSum(int[] arr) {
    if (arr.length == 0) return 0;
    
    int maxSum = arr[0];
    int currentSum = arr[0];
    
    for (int i = 1; i < arr.length; i++) {
        currentSum = Math.max(arr[i], currentSum + arr[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}

// With subarray tracking
public static class KadaneResult {
    int maxSum, start, end;
    KadaneResult(int maxSum, int start, int end) {
        this.maxSum = maxSum; this.start = start; this.end = end;
    }
}

public static KadaneResult kadaneWithSubarray(int[] arr) {
    int maxSum = arr[0], currentSum = arr[0];
    int start = 0, end = 0, tempStart = 0;
    
    for (int i = 1; i < arr.length; i++) {
        if (currentSum < 0) {
            currentSum = arr[i];
            tempStart = i;
        } else {
            currentSum += arr[i];
        }
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }
    }
    
    return new KadaneResult(maxSum, start, end);
}`,

  cpp: `// Basic Kadane's Algorithm
int kadaneMaxSum(vector<int>& arr) {
    if (arr.empty()) return 0;
    
    int maxSum = arr[0];
    int currentSum = arr[0];
    
    for (int i = 1; i < arr.size(); i++) {
        currentSum = max(arr[i], currentSum + arr[i]);
        maxSum = max(maxSum, currentSum);
    }
    
    return maxSum;
}

// With subarray tracking
struct KadaneResult {
    int maxSum, start, end;
};

KadaneResult kadaneWithSubarray(vector<int>& arr) {
    int maxSum = arr[0], currentSum = arr[0];
    int start = 0, end = 0, tempStart = 0;
    
    for (int i = 1; i < arr.size(); i++) {
        if (currentSum < 0) {
            currentSum = arr[i];
            tempStart = i;
        } else {
            currentSum += arr[i];
        }
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }
    }
    
    return {maxSum, start, end};
}`
} 