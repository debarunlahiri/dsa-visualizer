import { AlgorithmExplanation } from "../algorithm-data"

export const slidingWindowExplanationContent: AlgorithmExplanation = {
  title: "Sliding Window Technique",
  description: "An efficient technique for solving problems involving contiguous subarrays or substrings by maintaining a window that slides across the data structure.",
  
  sections: [
    {
      title: "What is Sliding Window?",
      content: `The Sliding Window technique is a computational method used to efficiently solve problems that involve finding optimal solutions within a contiguous subset of elements. Instead of checking every possible subarray (which would be O(n²) or O(n³)), we maintain a "window" that slides across the array, updating our solution incrementally.

**Key Concepts:**
• **Window**: A contiguous subset of elements
• **Left and Right pointers**: Define the window boundaries  
• **Sliding**: Moving the window by expanding or contracting it
• **Optimization**: Maintaining the best solution as we slide

**Types of Sliding Window:**
1. **Fixed Size Window**: Window size remains constant
2. **Variable Size Window**: Window size changes based on conditions`
    },
    
    {
      title: "How Sliding Window Works",
      content: `**Fixed Size Window Process:**
1. Initialize window of size k at the beginning
2. Calculate initial result for first window
3. Slide window by one position (remove leftmost, add rightmost)
4. Update result incrementally
5. Repeat until window reaches the end

**Variable Size Window Process:**
1. Start with left and right pointers at beginning
2. Expand window by moving right pointer
3. When condition is violated, contract from left
4. Track optimal solution throughout the process
5. Continue until right pointer reaches end

**Why It's Efficient:**
• Avoids redundant calculations
• Each element is visited at most twice
• Reduces time complexity from O(n²) to O(n)`
    },

    {
      title: "Common Sliding Window Patterns",
      content: `**1. Maximum/Minimum Sum Subarray of Size K**
Find the maximum sum of any contiguous subarray of size k.

**2. Longest Substring with K Distinct Characters**
Find the longest substring that contains exactly k distinct characters.

**3. Minimum Window Substring**
Find the minimum window in string S that contains all characters of string T.

**4. Longest Substring Without Repeating Characters**
Find the length of the longest substring without repeating characters.

**5. Maximum Sliding Window**
Find the maximum element in every sliding window of size k.

**6. Subarray with Given Sum**
Find if there exists a subarray with sum equal to target.`
    },

    {
      title: "Time & Space Complexity",
      content: `**Time Complexity:**
• Fixed Window: O(n) - each element visited once
• Variable Window: O(n) - each element visited at most twice
• With additional data structures (like HashMap): O(n) average

**Space Complexity:**
• Basic sliding window: O(1) - only pointers needed
• With HashMap for character counting: O(k) where k is unique elements
• With deque for maximum in window: O(k) where k is window size

**Comparison with Brute Force:**
• Brute Force: O(n²) or O(n³) for subarray problems
• Sliding Window: O(n) - massive improvement!`
    },

    {
      title: "Real-World Applications",
      content: `**1. Network Traffic Analysis**
• Monitor network bandwidth usage over time windows
• Detect traffic spikes or anomalies
• Calculate moving averages for performance metrics

**2. Financial Trading Systems**
• Moving averages for stock prices
• Risk assessment over time windows
• High-frequency trading algorithms

**3. Web Analytics & Monitoring**
• Rate limiting (requests per time window)
• Performance monitoring (response times)
• User activity tracking

**4. Data Stream Processing**
• Real-time analytics on streaming data
• Fraud detection in transaction streams
• IoT sensor data analysis

**5. Computer Graphics & Image Processing**
• Image filtering and convolution
• Video frame analysis
• Pattern recognition in images

**6. Database Query Optimization**
• Range queries optimization
• Index scanning strategies
• Time-series data analysis

**7. Machine Learning**
• Feature extraction from time series
• Sequence analysis in NLP
• Sliding window for training data

**8. Operating Systems**
• Memory management (page replacement)
• Process scheduling algorithms
• Buffer management`
    },

    {
      title: "Advantages & Disadvantages",
      content: `**Advantages:**
✅ **Efficiency**: Reduces time complexity significantly
✅ **Memory Friendly**: Usually requires O(1) extra space
✅ **Intuitive**: Easy to understand and implement
✅ **Versatile**: Works for many different problem types
✅ **Optimal**: Often provides the best possible solution
✅ **Real-time**: Suitable for streaming data processing

**Disadvantages:**
❌ **Pattern Recognition**: Need to identify when to use it
❌ **Implementation Complexity**: Variable window can be tricky
❌ **Edge Cases**: Handling empty arrays, single elements
❌ **Not Universal**: Doesn't work for all subarray problems
❌ **Condition Management**: Complex conditions can be challenging

**When to Use Sliding Window:**
• Problems involving contiguous subarrays/substrings
• Finding optimal solutions in sequences
• When brute force leads to O(n²) or worse
• Stream processing scenarios
• When you need to maintain running statistics`
    },

    {
      title: "Implementation Tips",
      content: `**Best Practices:**
1. **Identify the Pattern**: Recognize if it's fixed or variable window
2. **Define Window Clearly**: What constitutes a valid window?
3. **Handle Edge Cases**: Empty arrays, single elements, invalid inputs
4. **Optimize Data Structures**: Use appropriate structures for tracking
5. **Test Thoroughly**: Various window sizes and edge conditions

**Common Mistakes:**
• Not handling window expansion/contraction correctly
• Forgetting to update auxiliary data structures
• Off-by-one errors in pointer management
• Not considering empty or single-element cases
• Inefficient data structure choices

**Debugging Tips:**
• Print window boundaries at each step
• Verify auxiliary data structure consistency
• Test with small, known examples first
• Check boundary conditions carefully`
    }
  ],

  codeExamples: [
    {
      title: "Maximum Sum Subarray of Size K (Fixed Window)",
      language: "python",
      code: `def max_sum_subarray_k(arr, k):
    """
    Find maximum sum of subarray of size k using sliding window.
    Time: O(n), Space: O(1)
    """
    if len(arr) < k:
        return -1
    
    # Calculate sum of first window
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    # Slide the window
    for i in range(k, len(arr)):
        # Remove leftmost element, add rightmost element
        window_sum = window_sum - arr[i - k] + arr[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum

# Example usage
arr = [1, 4, 2, 9, 5, 10, 23, 8, 14, 6]
k = 4
result = max_sum_subarray_k(arr, k)
print(f"Maximum sum of subarray of size {k}: {result}")  # Output: 39`
    },
    
    {
      title: "Longest Substring Without Repeating Characters (Variable Window)",
      language: "python",
      code: `def longest_substring_without_repeating(s):
    """
    Find length of longest substring without repeating characters.
    Time: O(n), Space: O(min(m,n)) where m is charset size
    """
    if not s:
        return 0
    
    char_set = set()
    left = 0
    max_length = 0
    
    for right in range(len(s)):
        # If character is already in window, shrink from left
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        
        # Add current character and update max length
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)
    
    return max_length

# Example usage
s = "abcabcbb"
result = longest_substring_without_repeating(s)
print(f"Length of longest substring: {result}")  # Output: 3`
    },
    
    {
      title: "Minimum Window Substring",
      language: "python",
      code: `def min_window_substring(s, t):
    """
    Find minimum window in s that contains all characters of t.
    Time: O(|s| + |t|), Space: O(|s| + |t|)
    """
    if not s or not t:
        return ""
    
    # Count characters in t
    dict_t = {}
    for char in t:
        dict_t[char] = dict_t.get(char, 0) + 1
    
    required = len(dict_t)  # Number of unique characters in t
    formed = 0  # Number of unique characters in current window with desired frequency
    
    window_counts = {}
    left = 0
    min_len = float('inf')
    min_left = 0
    
    for right in range(len(s)):
        # Add character from right to window
        char = s[right]
        window_counts[char] = window_counts.get(char, 0) + 1
        
        # Check if current character's frequency matches desired frequency
        if char in dict_t and window_counts[char] == dict_t[char]:
            formed += 1
        
        # Try to contract window until it's no longer valid
        while left <= right and formed == required:
            char = s[left]
            
            # Update minimum window if current is smaller
            if right - left + 1 < min_len:
                min_len = right - left + 1
                min_left = left
            
            # Remove character from left of window
            window_counts[char] -= 1
            if char in dict_t and window_counts[char] < dict_t[char]:
                formed -= 1
            
            left += 1
    
    return "" if min_len == float('inf') else s[min_left:min_left + min_len]

# Example usage
s = "ADOBECODEBANC"
t = "ABC"
result = min_window_substring(s, t)
print(f"Minimum window substring: '{result}'")  # Output: "BANC"`
    }
  ]
}

export const slidingWindowCodeSnippets = {
  python: `# Fixed Size Sliding Window
def fixed_window_max(arr, k):
    if len(arr) < k:
        return []
    
    result = []
    window_sum = sum(arr[:k])
    result.append(window_sum)
    
    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i-k] + arr[i]
        result.append(window_sum)
    
    return result

# Variable Size Sliding Window
def variable_window_sum(arr, target):
    left = 0
    current_sum = 0
    min_length = float('inf')
    
    for right in range(len(arr)):
        current_sum += arr[right]
        
        while current_sum >= target:
            min_length = min(min_length, right - left + 1)
            current_sum -= arr[left]
            left += 1
    
    return min_length if min_length != float('inf') else 0`,

  javascript: `// Fixed Size Sliding Window
function fixedWindowMax(arr, k) {
    if (arr.length < k) return [];
    
    const result = [];
    let windowSum = arr.slice(0, k).reduce((a, b) => a + b, 0);
    result.push(windowSum);
    
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        result.push(windowSum);
    }
    
    return result;
}

// Variable Size Sliding Window
function variableWindowSum(arr, target) {
    let left = 0;
    let currentSum = 0;
    let minLength = Infinity;
    
    for (let right = 0; right < arr.length; right++) {
        currentSum += arr[right];
        
        while (currentSum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            currentSum -= arr[left];
            left++;
        }
    }
    
    return minLength === Infinity ? 0 : minLength;
}`,

  java: `// Fixed Size Sliding Window
public static List<Integer> fixedWindowMax(int[] arr, int k) {
    List<Integer> result = new ArrayList<>();
    if (arr.length < k) return result;
    
    int windowSum = 0;
    for (int i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    result.add(windowSum);
    
    for (int i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        result.add(windowSum);
    }
    
    return result;
}

// Variable Size Sliding Window
public static int variableWindowSum(int[] arr, int target) {
    int left = 0;
    int currentSum = 0;
    int minLength = Integer.MAX_VALUE;
    
    for (int right = 0; right < arr.length; right++) {
        currentSum += arr[right];
        
        while (currentSum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            currentSum -= arr[left];
            left++;
        }
    }
    
    return minLength == Integer.MAX_VALUE ? 0 : minLength;
}`,

  cpp: `// Fixed Size Sliding Window
vector<int> fixedWindowMax(vector<int>& arr, int k) {
    vector<int> result;
    if (arr.size() < k) return result;
    
    int windowSum = 0;
    for (int i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    result.push_back(windowSum);
    
    for (int i = k; i < arr.size(); i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        result.push_back(windowSum);
    }
    
    return result;
}

// Variable Size Sliding Window
int variableWindowSum(vector<int>& arr, int target) {
    int left = 0;
    int currentSum = 0;
    int minLength = INT_MAX;
    
    for (int right = 0; right < arr.size(); right++) {
        currentSum += arr[right];
        
        while (currentSum >= target) {
            minLength = min(minLength, right - left + 1);
            currentSum -= arr[left];
            left++;
        }
    }
    
    return minLength == INT_MAX ? 0 : minLength;
}`
} 