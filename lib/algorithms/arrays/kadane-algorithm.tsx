import { AlgorithmExplanation } from "../algorithm-data"

export const kadaneAlgorithmExplanationContent: AlgorithmExplanation = {
  title: "Kadane's Algorithm (Maximum Subarray Sum)",
  description: "An efficient dynamic programming algorithm to find the maximum sum of any contiguous subarray in linear time.",
  
  sections: [
    {
      title: "What is Kadane's Algorithm?",
      content: `Kadane's Algorithm is a dynamic programming technique used to solve the Maximum Subarray Sum problem efficiently. Given an array of integers (which may include negative numbers), it finds the contiguous subarray with the largest sum in O(n) time and O(1) space.

**The Problem:**
Given array: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Find the contiguous subarray with maximum sum: [4, -1, 2, 1] = 6

**Key Insight:**
At each position, we decide whether to:
1. Start a new subarray from current element
2. Extend the existing subarray to include current element

**Core Principle:**
If the sum so far becomes negative, it's better to start fresh from the current element rather than carrying the negative sum forward.`
    },
    
    {
      title: "How Kadane's Algorithm Works",
      content: `**Step-by-Step Process:**
1. Initialize: max_sum = first element, current_sum = first element
2. For each element from index 1 to n-1:
   - current_sum = max(element, current_sum + element)
   - max_sum = max(max_sum, current_sum)
3. Return max_sum

**Intuition:**
• current_sum tracks the maximum sum ending at current position
• If current_sum becomes negative, reset it (start new subarray)
• max_sum keeps track of the overall maximum found so far

**Example Walkthrough:**
Array: [-2, 1, -3, 4, -1, 2, 1, -5, 4]

i=0: current_sum = -2, max_sum = -2
i=1: current_sum = max(1, -2+1) = 1, max_sum = max(-2, 1) = 1
i=2: current_sum = max(-3, 1-3) = -2, max_sum = max(1, -2) = 1
i=3: current_sum = max(4, -2+4) = 4, max_sum = max(1, 4) = 4
i=4: current_sum = max(-1, 4-1) = 3, max_sum = max(4, 3) = 4
i=5: current_sum = max(2, 3+2) = 5, max_sum = max(4, 5) = 5
i=6: current_sum = max(1, 5+1) = 6, max_sum = max(5, 6) = 6
i=7: current_sum = max(-5, 6-5) = 1, max_sum = max(6, 1) = 6
i=8: current_sum = max(4, 1+4) = 5, max_sum = max(6, 5) = 6

Result: Maximum subarray sum = 6`
    },

    {
      title: "Algorithm Variants",
      content: `**1. Basic Kadane's (Maximum Sum Only)**
Returns just the maximum sum value.

**2. Enhanced Kadane's (With Indices)**
Also tracks the start and end indices of the maximum subarray.

**3. Modified for All Negative Numbers**
Handles edge case where all elements are negative.

**4. Circular Array Variant**
Finds maximum subarray sum in a circular array.

**5. 2D Kadane's**
Extension to find maximum sum rectangle in a 2D matrix.

**6. K-Kadane's**
Find maximum sum of exactly K elements (not necessarily contiguous).`
    },

    {
      title: "Time & Space Complexity",
      content: `**Time Complexity: O(n)**
• Single pass through the array
• Constant work per element
• Linear time regardless of input values

**Space Complexity: O(1)**
• Only uses a few variables
• No additional data structures needed
• In-place algorithm

**Comparison with Brute Force:**
• Brute Force: O(n³) - check all subarrays
• Optimized Brute Force: O(n²) - use prefix sums
• Kadane's Algorithm: O(n) - optimal solution

**Why It's Optimal:**
• Every element must be examined at least once
• No way to solve faster than O(n)
• Achieves theoretical lower bound`
    },

    {
      title: "Real-World Applications",
      content: `**1. Financial Analysis**
• Stock trading: maximum profit from buy/sell sequence
• Portfolio optimization: best performing period
• Risk assessment: worst-case loss analysis

**2. Data Analytics**
• Time series analysis: peak performance periods
• Sensor data: maximum signal strength intervals
• Web analytics: highest traffic periods

**3. Machine Learning**
• Feature selection: most informative subsequences
• Signal processing: noise reduction and pattern detection
• Anomaly detection: unusual activity periods

**4. Gaming & Entertainment**
• Score maximization in games
• Performance analytics in sports
• Content recommendation systems

**5. Resource Management**
• CPU scheduling: optimal task grouping
• Memory allocation: efficient buffer management
• Network optimization: bandwidth utilization

**6. Image Processing**
• Maximum intensity regions
• Edge detection algorithms
• Pattern recognition

**7. Bioinformatics**
• DNA sequence analysis
• Protein folding predictions
• Gene expression analysis

**8. Operations Research**
• Supply chain optimization
• Production scheduling
• Quality control analysis`
    },

    {
      title: "Edge Cases & Variations",
      content: `**Edge Cases to Consider:**
1. **All Negative Numbers**: Return the least negative number
2. **Empty Array**: Handle appropriately (return 0 or error)
3. **Single Element**: The element itself is the answer
4. **All Positive Numbers**: Sum of entire array
5. **Alternating Signs**: Complex subarray patterns

**Common Variations:**
1. **Return Subarray Indices**: Track start and end positions
2. **Multiple Subarrays**: Find top-k maximum subarrays
3. **Minimum Subarray Sum**: Flip signs and apply Kadane's
4. **Circular Array**: Handle wrap-around cases
5. **2D Matrix**: Maximum sum rectangle problem

**Implementation Considerations:**
• Integer overflow for large sums
• Floating-point precision for decimal arrays
• Thread safety for parallel processing
• Memory efficiency for large datasets`
    },

    {
      title: "Common Mistakes & Tips",
      content: `**Common Mistakes:**
❌ Forgetting to handle all-negative arrays
❌ Not updating max_sum correctly
❌ Confusing current_sum reset logic
❌ Off-by-one errors in index tracking
❌ Integer overflow in large arrays

**Best Practices:**
✅ Always handle edge cases first
✅ Use clear variable names (current_sum, max_sum)
✅ Test with various input patterns
✅ Consider integer overflow protection
✅ Document the algorithm's assumptions

**Debugging Tips:**
• Print current_sum and max_sum at each step
• Verify with small, known examples first
• Check boundary conditions carefully
• Test with all-negative and all-positive arrays
• Trace through the algorithm manually

**Optimization Tips:**
• Use early termination if possible
• Consider parallel processing for very large arrays
• Cache-friendly memory access patterns
• Minimize function call overhead`
    }
  ],

  codeExamples: [
    {
      title: "Basic Kadane's Algorithm",
      language: "python",
      code: `def kadane_algorithm(arr):
    """
    Find maximum sum of contiguous subarray using Kadane's algorithm.
    Time: O(n), Space: O(1)
    """
    if not arr:
        return 0
    
    max_sum = current_sum = arr[0]
    
    for i in range(1, len(arr)):
        # Either start new subarray or extend existing one
        current_sum = max(arr[i], current_sum + arr[i])
        # Update overall maximum
        max_sum = max(max_sum, current_sum)
    
    return max_sum

# Example usage
arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
result = kadane_algorithm(arr)
print(f"Maximum subarray sum: {result}")  # Output: 6`
    },
    
    {
      title: "Kadane's with Subarray Indices",
      language: "python",
      code: `def kadane_with_indices(arr):
    """
    Find maximum subarray sum and return sum with start/end indices.
    Time: O(n), Space: O(1)
    """
    if not arr:
        return 0, -1, -1
    
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
    
    return max_sum, start, end

# Example usage
arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
max_sum, start, end = kadane_with_indices(arr)
print(f"Maximum sum: {max_sum}")
print(f"Subarray: {arr[start:end+1]}")
print(f"Indices: [{start}, {end}]")`
    },
    
    {
      title: "2D Kadane's (Maximum Sum Rectangle)",
      language: "python",
      code: `def kadane_1d(arr):
    """Helper function: 1D Kadane's algorithm"""
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
    
    return max_sum, start, end

def kadane_2d(matrix):
    """
    Find maximum sum rectangle in 2D matrix.
    Time: O(n²m), Space: O(n) where matrix is n×m
    """
    if not matrix or not matrix[0]:
        return 0
    
    rows, cols = len(matrix), len(matrix[0])
    max_sum = float('-inf')
    result = {}
    
    for top in range(rows):
        temp = [0] * cols
        
        for bottom in range(top, rows):
            # Add current row to temp array
            for col in range(cols):
                temp[col] += matrix[bottom][col]
            
            # Apply 1D Kadane's to temp array
            current_sum, left, right = kadane_1d(temp)
            
            if current_sum > max_sum:
                max_sum = current_sum
                result = {
                    'sum': max_sum,
                    'top': top,
                    'bottom': bottom,
                    'left': left,
                    'right': right
                }
    
    return result

# Example usage
matrix = [
    [1, 2, -1, -4, -20],
    [-8, -3, 4, 2, 1],
    [3, 8, 10, 1, 3],
    [-4, -1, 1, 7, -6]
]
result = kadane_2d(matrix)
print(f"Maximum rectangle sum: {result['sum']}")
print(f"Rectangle coordinates: ({result['top']}, {result['left']}) to ({result['bottom']}, {result['right']})")`
    }
  ]
}

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