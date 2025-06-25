import { AlgorithmExplanation } from "../algorithm-data"

export const prefixSumExplanationContent: AlgorithmExplanation = {
  title: "Prefix Sum / Prefix Product",
  description: "A preprocessing technique that allows for efficient calculation of range sums and products by storing cumulative values.",
  
  sections: [
    {
      title: "What is Prefix Sum?",
      content: `Prefix Sum (also called Cumulative Sum) is a preprocessing technique where we create an auxiliary array that stores the cumulative sum of elements from the beginning of the array up to each position. This enables us to calculate the sum of any subarray in constant time.

**Key Concepts:**
• **Prefix Array**: prefix[i] = sum of elements from index 0 to i
• **Range Sum**: sum(i, j) = prefix[j] - prefix[i-1]
• **Preprocessing**: O(n) time to build prefix array
• **Query**: O(1) time to answer range sum queries

**Formula:**
• prefix[0] = arr[0]
• prefix[i] = prefix[i-1] + arr[i] for i > 0
• sum(i, j) = prefix[j] - prefix[i-1] (if i > 0)
• sum(0, j) = prefix[j]`
    },
    
    {
      title: "How Prefix Sum Works",
      content: `**Building Prefix Sum Array:**
1. Initialize prefix[0] = arr[0]
2. For each position i from 1 to n-1:
   - prefix[i] = prefix[i-1] + arr[i]
3. Now prefix[i] contains sum of elements from 0 to i

**Answering Range Queries:**
1. To find sum from index i to j:
   - If i == 0: return prefix[j]
   - If i > 0: return prefix[j] - prefix[i-1]

**Why It's Efficient:**
• Without prefix sum: O(n) per query
• With prefix sum: O(1) per query after O(n) preprocessing
• For multiple queries: massive time savings`
    },

    {
      title: "Prefix Sum vs Prefix Product",
      content: `**Prefix Sum:**
• Stores cumulative sums: [1,2,3] → [1,3,6]
• Range sum: prefix[j] - prefix[i-1]
• Handles negative numbers naturally
• Most common variant

**Prefix Product:**
• Stores cumulative products: [2,3,4] → [2,6,24]
• Range product: prefix[j] / prefix[i-1]
• Must handle zeros carefully (division by zero)
• Useful for certain mathematical problems

**Prefix XOR:**
• Stores cumulative XOR: [1,2,3] → [1,3,0]
• Range XOR: prefix[j] ^ prefix[i-1]
• Self-inverse property: a ^ a = 0`
    },

    {
      title: "Common Prefix Sum Patterns",
      content: `**1. Range Sum Queries**
Given array, answer multiple queries for sum of elements in range [i, j].

**2. Subarray Sum Equals K**
Find number of subarrays with sum equal to k using prefix sum + HashMap.

**3. Maximum Subarray Sum (Kadane's Algorithm)**
Can be viewed as finding optimal prefix sum difference.

**4. 2D Prefix Sum**
Extension to matrices for rectangle sum queries.

**5. Difference Array**
Inverse of prefix sum - efficient range updates.

**6. Binary Indexed Tree (Fenwick Tree)**
Advanced data structure based on prefix sum concept.`
    },

    {
      title: "Time & Space Complexity",
      content: `**Time Complexity:**
• Building prefix array: O(n)
• Single range query: O(1)
• Multiple queries (q queries): O(n + q) total
• Without prefix sum: O(n × q) for q queries

**Space Complexity:**
• Prefix sum array: O(n) extra space
• In-place possible if original array can be modified
• 2D prefix sum: O(m × n) for m×n matrix

**Trade-off Analysis:**
• Preprocessing cost: O(n) time and space
• Query benefit: O(n) → O(1) per query
• Worth it when: number of queries > 1`
    },

    {
      title: "Real-World Applications",
      content: `**1. Database Query Optimization**
• Range aggregation queries (SUM, AVG over date ranges)
• OLAP cubes and data warehousing
• Time-series data analysis

**2. Computer Graphics & Image Processing**
• Summed Area Tables for fast rectangle sum queries
• Integral images in computer vision
• Texture filtering and anti-aliasing

**3. Financial Systems**
• Portfolio performance over time periods
• Moving averages and technical indicators
• Risk assessment and exposure calculations

**4. Game Development**
• Damage calculations over time ranges
• Resource accumulation systems
• Leaderboard and ranking systems

**5. Scientific Computing**
• Numerical integration approximations
• Signal processing and filtering
• Statistical analysis of large datasets

**6. Web Analytics**
• Page views, user sessions over time periods
• Performance metrics aggregation
• A/B testing result analysis

**7. IoT and Sensor Networks**
• Environmental data aggregation
• Energy consumption monitoring
• Predictive maintenance analytics

**8. Machine Learning**
• Feature engineering for time series
• Sliding window statistics
• Batch processing optimizations`
    },

    {
      title: "Advantages & Disadvantages",
      content: `**Advantages:**
✅ **Speed**: O(1) range queries after preprocessing
✅ **Simplicity**: Easy to understand and implement
✅ **Versatility**: Works with sums, products, XOR, etc.
✅ **Memory Efficient**: Only O(n) extra space needed
✅ **Parallelizable**: Prefix computation can be parallelized
✅ **Immutable Friendly**: Original array unchanged

**Disadvantages:**
❌ **Preprocessing Cost**: O(n) time and space upfront
❌ **Static Data**: Doesn't handle array updates efficiently
❌ **Overflow Risk**: Large sums may cause integer overflow
❌ **Limited Operations**: Only works for associative operations
❌ **Memory Usage**: Requires additional storage

**When to Use Prefix Sum:**
• Multiple range sum queries on static array
• Need O(1) query time after preprocessing
• Array doesn't change frequently
• Working with associative operations (sum, product, XOR)

**When NOT to Use:**
• Single query or very few queries
• Array changes frequently (use Fenwick Tree instead)
• Non-associative operations
• Memory is extremely constrained`
    },

    {
      title: "Advanced Techniques",
      content: `**2D Prefix Sum (Summed Area Table):**
For matrix range sum queries in O(1) time.

**Difference Array:**
Inverse operation - efficient for range updates.

**Prefix Sum with HashMap:**
Solve subarray sum problems efficiently.

**Modular Prefix Sum:**
Handle large numbers with modular arithmetic.

**Lazy Propagation:**
Combine with segment trees for range updates.

**Common Pitfalls:**
• Index out of bounds when i = 0
• Integer overflow with large sums
• Forgetting to handle empty ranges
• Incorrect formula for range queries`
    }
  ],

  codeExamples: [
    {
      title: "Basic Prefix Sum Implementation",
      language: "python",
      code: `def build_prefix_sum(arr):
    """
    Build prefix sum array for range sum queries.
    Time: O(n), Space: O(n)
    """
    n = len(arr)
    prefix = [0] * n
    prefix[0] = arr[0]
    
    for i in range(1, n):
        prefix[i] = prefix[i-1] + arr[i]
    
    return prefix

def range_sum(prefix, i, j):
    """
    Get sum of elements from index i to j (inclusive).
    Time: O(1)
    """
    if i == 0:
        return prefix[j]
    return prefix[j] - prefix[i-1]

# Example usage
arr = [1, 2, 3, 4, 5]
prefix = build_prefix_sum(arr)
print(f"Prefix array: {prefix}")  # [1, 3, 6, 10, 15]
print(f"Sum[1,3]: {range_sum(prefix, 1, 3)}")  # 9 (2+3+4)
print(f"Sum[0,4]: {range_sum(prefix, 0, 4)}")  # 15 (1+2+3+4+5)`
    },
    
    {
      title: "Subarray Sum Equals K",
      language: "python",
      code: `def subarray_sum_equals_k(nums, k):
    """
    Count number of subarrays with sum equal to k.
    Uses prefix sum + HashMap technique.
    Time: O(n), Space: O(n)
    """
    count = 0
    prefix_sum = 0
    prefix_count = {0: 1}  # prefix_sum -> frequency
    
    for num in nums:
        prefix_sum += num
        
        # If (prefix_sum - k) exists, we found subarrays
        if prefix_sum - k in prefix_count:
            count += prefix_count[prefix_sum - k]
        
        # Update frequency of current prefix sum
        prefix_count[prefix_sum] = prefix_count.get(prefix_sum, 0) + 1
    
    return count

# Example usage
nums = [1, 1, 1]
k = 2
result = subarray_sum_equals_k(nums, k)
print(f"Number of subarrays with sum {k}: {result}")  # Output: 2`
    },
    
    {
      title: "2D Prefix Sum (Summed Area Table)",
      language: "python",
      code: `def build_2d_prefix_sum(matrix):
    """
    Build 2D prefix sum for rectangle sum queries.
    Time: O(m*n), Space: O(m*n)
    """
    if not matrix or not matrix[0]:
        return []
    
    m, n = len(matrix), len(matrix[0])
    prefix = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            prefix[i][j] = (matrix[i-1][j-1] + 
                          prefix[i-1][j] + 
                          prefix[i][j-1] - 
                          prefix[i-1][j-1])
    
    return prefix

def rectangle_sum(prefix, r1, c1, r2, c2):
    """
    Get sum of rectangle from (r1,c1) to (r2,c2) inclusive.
    Time: O(1)
    """
    # Convert to 1-indexed for prefix array
    r1, c1, r2, c2 = r1 + 1, c1 + 1, r2 + 1, c2 + 1
    
    return (prefix[r2][c2] - 
            prefix[r1-1][c2] - 
            prefix[r2][c1-1] + 
            prefix[r1-1][c1-1])

# Example usage
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
prefix_2d = build_2d_prefix_sum(matrix)
result = rectangle_sum(prefix_2d, 0, 0, 1, 1)  # Sum of 2x2 top-left
print(f"Rectangle sum: {result}")  # Output: 12 (1+2+4+5)`
    }
  ]
}

export const prefixSumCodeSnippets = {
  python: `# Basic Prefix Sum
def prefix_sum(arr):
    prefix = [0] * len(arr)
    prefix[0] = arr[0]
    for i in range(1, len(arr)):
        prefix[i] = prefix[i-1] + arr[i]
    return prefix

# Range Sum Query
def range_sum(prefix, i, j):
    if i == 0:
        return prefix[j]
    return prefix[j] - prefix[i-1]

# Subarray Sum Count
def count_subarrays_with_sum(arr, target):
    count = 0
    prefix_sum = 0
    sum_count = {0: 1}
    
    for num in arr:
        prefix_sum += num
        count += sum_count.get(prefix_sum - target, 0)
        sum_count[prefix_sum] = sum_count.get(prefix_sum, 0) + 1
    
    return count`,

  javascript: `// Basic Prefix Sum
function prefixSum(arr) {
    const prefix = new Array(arr.length);
    prefix[0] = arr[0];
    for (let i = 1; i < arr.length; i++) {
        prefix[i] = prefix[i-1] + arr[i];
    }
    return prefix;
}

// Range Sum Query
function rangeSum(prefix, i, j) {
    if (i === 0) return prefix[j];
    return prefix[j] - prefix[i-1];
}

// Subarray Sum Count
function countSubarraysWithSum(arr, target) {
    let count = 0;
    let prefixSum = 0;
    const sumCount = new Map([[0, 1]]);
    
    for (const num of arr) {
        prefixSum += num;
        count += sumCount.get(prefixSum - target) || 0;
        sumCount.set(prefixSum, (sumCount.get(prefixSum) || 0) + 1);
    }
    
    return count;
}`,

  java: `// Basic Prefix Sum
public static int[] prefixSum(int[] arr) {
    int[] prefix = new int[arr.length];
    prefix[0] = arr[0];
    for (int i = 1; i < arr.length; i++) {
        prefix[i] = prefix[i-1] + arr[i];
    }
    return prefix;
}

// Range Sum Query
public static int rangeSum(int[] prefix, int i, int j) {
    if (i == 0) return prefix[j];
    return prefix[j] - prefix[i-1];
}

// Subarray Sum Count
public static int countSubarraysWithSum(int[] arr, int target) {
    int count = 0;
    int prefixSum = 0;
    Map<Integer, Integer> sumCount = new HashMap<>();
    sumCount.put(0, 1);
    
    for (int num : arr) {
        prefixSum += num;
        count += sumCount.getOrDefault(prefixSum - target, 0);
        sumCount.put(prefixSum, sumCount.getOrDefault(prefixSum, 0) + 1);
    }
    
    return count;
}`,

  cpp: `// Basic Prefix Sum
vector<int> prefixSum(vector<int>& arr) {
    vector<int> prefix(arr.size());
    prefix[0] = arr[0];
    for (int i = 1; i < arr.size(); i++) {
        prefix[i] = prefix[i-1] + arr[i];
    }
    return prefix;
}

// Range Sum Query
int rangeSum(vector<int>& prefix, int i, int j) {
    if (i == 0) return prefix[j];
    return prefix[j] - prefix[i-1];
}

// Subarray Sum Count
int countSubarraysWithSum(vector<int>& arr, int target) {
    int count = 0;
    int prefixSum = 0;
    unordered_map<int, int> sumCount;
    sumCount[0] = 1;
    
    for (int num : arr) {
        prefixSum += num;
        count += sumCount[prefixSum - target];
        sumCount[prefixSum]++;
    }
    
    return count;
}`
} 