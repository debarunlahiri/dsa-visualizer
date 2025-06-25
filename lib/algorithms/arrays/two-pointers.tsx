import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const twoPointersExplanationContent = (
  <AlgorithmExplanation>
    <h2>Two Pointers Technique</h2>
    <p>
      The Two Pointers technique is a powerful algorithmic approach that uses two pointers to traverse a data structure, 
      typically an array or string. The pointers can move in the same direction or towards each other, depending on the problem. 
      This technique often reduces time complexity from O(n²) to O(n) for many array problems.
    </p>

    <h3>Types of Two Pointers:</h3>
    <ol>
      <li><strong>Opposite Direction (Convergent):</strong> Two pointers start from opposite ends and move towards each other</li>
      <li><strong>Same Direction (Divergent):</strong> Both pointers start from the same position and move in the same direction</li>
      <li><strong>Sliding Window:</strong> Two pointers maintain a window of elements with specific properties</li>
    </ol>

    <h3>How Two Pointers Work:</h3>
    <ol>
      <li><strong>Initialize:</strong> Place pointers at strategic positions (usually start/end or both at start)</li>
      <li><strong>Condition Check:</strong> Compare elements at pointer positions</li>
      <li><strong>Move Pointers:</strong> Advance pointers based on the condition</li>
      <li><strong>Repeat:</strong> Continue until pointers meet or cross over</li>
    </ol>

    <h3>Common Patterns:</h3>
    <ul>
      <li><strong>Target Sum:</strong> Find pairs that sum to a target value</li>
      <li><strong>Palindrome Check:</strong> Verify if string/array is palindromic</li>
      <li><strong>Container Problems:</strong> Find maximum area, volume, etc.</li>
      <li><strong>Merge Operations:</strong> Merge two sorted arrays</li>
      <li><strong>Duplicate Removal:</strong> Remove duplicates in-place</li>
    </ul>

    <h3>Time Complexity:</h3>
    <ul>
      <li><strong>Best Case:</strong> $$O(n)$$ - Single pass through the array</li>
      <li><strong>Average Case:</strong> $$O(n)$$ - Linear traversal</li>
      <li><strong>Worst Case:</strong> $$O(n)$$ - Still linear</li>
    </ul>

    <h3>Space Complexity:</h3>
    <p>$$O(1)$$ - Only using two pointer variables (constant extra space)</p>

    <h3>Real-World Use Cases:</h3>
    <ul>
      <li><strong>Database Query Optimization:</strong> Efficiently joining sorted tables</li>
      <li><strong>Image Processing:</strong> Finding symmetric patterns, edge detection</li>
      <li><strong>Text Processing:</strong> Palindrome detection, string matching algorithms</li>
      <li><strong>Financial Analysis:</strong> Finding pairs of stocks with desired price differences</li>
      <li><strong>Bioinformatics:</strong> DNA sequence alignment and pattern matching</li>
      <li><strong>Network Security:</strong> Detecting symmetric encryption patterns</li>
      <li><strong>Game Development:</strong> Collision detection, pathfinding optimizations</li>
      <li><strong>Data Compression:</strong> Finding repeating patterns efficiently</li>
      <li><strong>Social Media:</strong> Finding mutual connections, matching algorithms</li>
      <li><strong>E-commerce:</strong> Product recommendation systems (finding similar items)</li>
    </ul>

    <h3>Classic Problems Solved:</h3>
    <ul>
      <li><strong>Two Sum (Sorted Array):</strong> Find pair that sums to target</li>
      <li><strong>Three Sum:</strong> Find triplets that sum to zero</li>
      <li><strong>Container With Most Water:</strong> Maximum area between lines</li>
      <li><strong>Valid Palindrome:</strong> Check if string is palindrome</li>
      <li><strong>Remove Duplicates:</strong> Remove duplicates from sorted array</li>
      <li><strong>Merge Sorted Arrays:</strong> Combine two sorted arrays</li>
      <li><strong>Trapping Rain Water:</strong> Calculate trapped rainwater</li>
    </ul>

    <h3>Advantages:</h3>
    <ul>
      <li>Reduces time complexity from O(n²) to O(n)</li>
      <li>Uses constant extra space O(1)</li>
      <li>Simple and intuitive approach</li>
      <li>Works well with sorted data</li>
      <li>Easy to implement and debug</li>
    </ul>

    <h3>Limitations:</h3>
    <ul>
      <li>Requires sorted data for many applications</li>
      <li>Not suitable for all array problems</li>
      <li>Logic can be tricky for complex conditions</li>
      <li>May need modification for duplicate handling</li>
    </ul>

    <h3>When to Use Two Pointers:</h3>
    <ul>
      <li>Working with sorted arrays or strings</li>
      <li>Looking for pairs or triplets with specific properties</li>
      <li>Need to compare elements from different positions</li>
      <li>Want to reduce O(n²) time complexity to O(n)</li>
      <li>Checking for palindromes or symmetric patterns</li>
      <li>Merging or partitioning arrays</li>
    </ul>

    <h3>Problem-Solving Template:</h3>
    <ol>
      <li>Identify if the problem can benefit from two pointers</li>
      <li>Determine pointer placement (start/end or both at start)</li>
      <li>Define the condition for moving pointers</li>
      <li>Implement the pointer movement logic</li>
      <li>Handle edge cases (empty array, single element)</li>
    </ol>
  </AlgorithmExplanation>
)

export const twoPointersCodeSnippets = {
  python: `# Two Pointers Technique in Python
# Various implementations and use cases

def two_sum_sorted(arr, target):
    """
    Find two numbers in sorted array that sum to target
    Time: O(n), Space: O(1)
    """
    left, right = 0, len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        
        if current_sum == target:
            return [left, right]  # Return indices
        elif current_sum < target:
            left += 1  # Need larger sum
        else:
            right -= 1  # Need smaller sum
    
    return [-1, -1]  # Not found

def is_palindrome(s):
    """
    Check if string is palindrome using two pointers
    Time: O(n), Space: O(1)
    """
    # Clean string: remove non-alphanumeric and convert to lowercase
    cleaned = ''.join(char.lower() for char in s if char.isalnum())
    
    left, right = 0, len(cleaned) - 1
    
    while left < right:
        if cleaned[left] != cleaned[right]:
            return False
        left += 1
        right -= 1
    
    return True

def remove_duplicates(arr):
    """
    Remove duplicates from sorted array in-place
    Time: O(n), Space: O(1)
    """
    if not arr:
        return 0
    
    # Two pointers: slow for unique elements, fast for scanning
    slow = 0
    
    for fast in range(1, len(arr)):
        if arr[fast] != arr[slow]:
            slow += 1
            arr[slow] = arr[fast]
    
    return slow + 1  # New length

def container_with_most_water(heights):
    """
    Find maximum area that can be formed by two lines
    Time: O(n), Space: O(1)
    """
    left, right = 0, len(heights) - 1
    max_area = 0
    
    while left < right:
        # Calculate current area
        width = right - left
        height = min(heights[left], heights[right])
        area = width * height
        max_area = max(max_area, area)
        
        # Move pointer with smaller height
        if heights[left] < heights[right]:
            left += 1
        else:
            right -= 1
    
    return max_area

def three_sum(arr):
    """
    Find all unique triplets that sum to zero
    Time: O(n²), Space: O(1) extra
    """
    arr.sort()
    result = []
    
    for i in range(len(arr) - 2):
        # Skip duplicates for first element
        if i > 0 and arr[i] == arr[i - 1]:
            continue
        
        left, right = i + 1, len(arr) - 1
        
        while left < right:
            current_sum = arr[i] + arr[left] + arr[right]
            
            if current_sum == 0:
                result.append([arr[i], arr[left], arr[right]])
                
                # Skip duplicates
                while left < right and arr[left] == arr[left + 1]:
                    left += 1
                while left < right and arr[right] == arr[right - 1]:
                    right -= 1
                
                left += 1
                right -= 1
            elif current_sum < 0:
                left += 1
            else:
                right -= 1
    
    return result

def merge_sorted_arrays(arr1, arr2):
    """
    Merge two sorted arrays using two pointers
    Time: O(m + n), Space: O(m + n)
    """
    result = []
    i = j = 0
    
    # Compare elements and add smaller one
    while i < len(arr1) and j < len(arr2):
        if arr1[i] <= arr2[j]:
            result.append(arr1[i])
            i += 1
        else:
            result.append(arr2[j])
            j += 1
    
    # Add remaining elements
    result.extend(arr1[i:])
    result.extend(arr2[j:])
    
    return result

# Example usage and testing
if __name__ == "__main__":
    # Test Two Sum
    print("Two Sum:", two_sum_sorted([2, 7, 11, 15], 9))  # [0, 1]
    
    # Test Palindrome
    print("Palindrome:", is_palindrome("A man, a plan, a canal: Panama"))  # True
    
    # Test Remove Duplicates
    nums = [1, 1, 2, 2, 3, 4, 4, 5]
    length = remove_duplicates(nums)
    print(f"Unique elements: {nums[:length]}")  # [1, 2, 3, 4, 5]
    
    # Test Container with Most Water
    print("Max Area:", container_with_most_water([1, 8, 6, 2, 5, 4, 8, 3, 7]))  # 49
    
    # Test Three Sum
    print("Three Sum:", three_sum([-1, 0, 1, 2, -1, -4]))  # [[-1, -1, 2], [-1, 0, 1]]`,

  javascript: `// Two Pointers Technique in JavaScript
// Various implementations and use cases

function twoSumSorted(arr, target) {
    /**
     * Find two numbers in sorted array that sum to target
     * Time: O(n), Space: O(1)
     */
    let left = 0, right = arr.length - 1;
    
    while (left < right) {
        const currentSum = arr[left] + arr[right];
        
        if (currentSum === target) {
            return [left, right]; // Return indices
        } else if (currentSum < target) {
            left++; // Need larger sum
        } else {
            right--; // Need smaller sum
        }
    }
    
    return [-1, -1]; // Not found
}

function isPalindrome(s) {
    /**
     * Check if string is palindrome using two pointers
     * Time: O(n), Space: O(1)
     */
    // Clean string: remove non-alphanumeric and convert to lowercase
    const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    let left = 0, right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

function removeDuplicates(arr) {
    /**
     * Remove duplicates from sorted array in-place
     * Time: O(n), Space: O(1)
     */
    if (arr.length === 0) return 0;
    
    // Two pointers: slow for unique elements, fast for scanning
    let slow = 0;
    
    for (let fast = 1; fast < arr.length; fast++) {
        if (arr[fast] !== arr[slow]) {
            slow++;
            arr[slow] = arr[fast];
        }
    }
    
    return slow + 1; // New length
}

function containerWithMostWater(heights) {
    /**
     * Find maximum area that can be formed by two lines
     * Time: O(n), Space: O(1)
     */
    let left = 0, right = heights.length - 1;
    let maxArea = 0;
    
    while (left < right) {
        // Calculate current area
        const width = right - left;
        const height = Math.min(heights[left], heights[right]);
        const area = width * height;
        maxArea = Math.max(maxArea, area);
        
        // Move pointer with smaller height
        if (heights[left] < heights[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxArea;
}

function threeSum(arr) {
    /**
     * Find all unique triplets that sum to zero
     * Time: O(n²), Space: O(1) extra
     */
    arr.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < arr.length - 2; i++) {
        // Skip duplicates for first element
        if (i > 0 && arr[i] === arr[i - 1]) continue;
        
        let left = i + 1, right = arr.length - 1;
        
        while (left < right) {
            const currentSum = arr[i] + arr[left] + arr[right];
            
            if (currentSum === 0) {
                result.push([arr[i], arr[left], arr[right]]);
                
                // Skip duplicates
                while (left < right && arr[left] === arr[left + 1]) left++;
                while (left < right && arr[right] === arr[right - 1]) right--;
                
                left++;
                right--;
            } else if (currentSum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}

function mergeSortedArrays(arr1, arr2) {
    /**
     * Merge two sorted arrays using two pointers
     * Time: O(m + n), Space: O(m + n)
     */
    const result = [];
    let i = 0, j = 0;
    
    // Compare elements and add smaller one
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            result.push(arr1[i]);
            i++;
        } else {
            result.push(arr2[j]);
            j++;
        }
    }
    
    // Add remaining elements
    result.push(...arr1.slice(i));
    result.push(...arr2.slice(j));
    
    return result;
}

// Example usage and testing
console.log("Two Sum:", twoSumSorted([2, 7, 11, 15], 9)); // [0, 1]
console.log("Palindrome:", isPalindrome("A man, a plan, a canal: Panama")); // true
console.log("Max Area:", containerWithMostWater([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
console.log("Three Sum:", threeSum([-1, 0, 1, 2, -1, -4])); // [[-1, -1, 2], [-1, 0, 1]]

module.exports = {
    twoSumSorted,
    isPalindrome,
    removeDuplicates,
    containerWithMostWater,
    threeSum,
    mergeSortedArrays
};`,

  java: `// Two Pointers Technique in Java
import java.util.*;

public class TwoPointers {
    
    /**
     * Find two numbers in sorted array that sum to target
     * Time: O(n), Space: O(1)
     */
    public static int[] twoSumSorted(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        
        while (left < right) {
            int currentSum = arr[left] + arr[right];
            
            if (currentSum == target) {
                return new int[]{left, right}; // Return indices
            } else if (currentSum < target) {
                left++; // Need larger sum
            } else {
                right--; // Need smaller sum
            }
        }
        
        return new int[]{-1, -1}; // Not found
    }
    
    /**
     * Check if string is palindrome using two pointers
     * Time: O(n), Space: O(1)
     */
    public static boolean isPalindrome(String s) {
        // Convert to lowercase and keep only alphanumeric
        StringBuilder cleaned = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (Character.isLetterOrDigit(c)) {
                cleaned.append(Character.toLowerCase(c));
            }
        }
        
        int left = 0, right = cleaned.length() - 1;
        
        while (left < right) {
            if (cleaned.charAt(left) != cleaned.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        
        return true;
    }
    
    /**
     * Remove duplicates from sorted array in-place
     * Time: O(n), Space: O(1)
     */
    public static int removeDuplicates(int[] arr) {
        if (arr.length == 0) return 0;
        
        // Two pointers: slow for unique elements, fast for scanning
        int slow = 0;
        
        for (int fast = 1; fast < arr.length; fast++) {
            if (arr[fast] != arr[slow]) {
                slow++;
                arr[slow] = arr[fast];
            }
        }
        
        return slow + 1; // New length
    }
    
    /**
     * Find maximum area that can be formed by two lines
     * Time: O(n), Space: O(1)
     */
    public static int containerWithMostWater(int[] heights) {
        int left = 0, right = heights.length - 1;
        int maxArea = 0;
        
        while (left < right) {
            // Calculate current area
            int width = right - left;
            int height = Math.min(heights[left], heights[right]);
            int area = width * height;
            maxArea = Math.max(maxArea, area);
            
            // Move pointer with smaller height
            if (heights[left] < heights[right]) {
                left++;
            } else {
                right--;
            }
        }
        
        return maxArea;
    }
    
    /**
     * Find all unique triplets that sum to zero
     * Time: O(n²), Space: O(1) extra
     */
    public static List<List<Integer>> threeSum(int[] arr) {
        Arrays.sort(arr);
        List<List<Integer>> result = new ArrayList<>();
        
        for (int i = 0; i < arr.length - 2; i++) {
            // Skip duplicates for first element
            if (i > 0 && arr[i] == arr[i - 1]) continue;
            
            int left = i + 1, right = arr.length - 1;
            
            while (left < right) {
                int currentSum = arr[i] + arr[left] + arr[right];
                
                if (currentSum == 0) {
                    result.add(Arrays.asList(arr[i], arr[left], arr[right]));
                    
                    // Skip duplicates
                    while (left < right && arr[left] == arr[left + 1]) left++;
                    while (left < right && arr[right] == arr[right - 1]) right--;
                    
                    left++;
                    right--;
                } else if (currentSum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        
        return result;
    }
    
    // Example usage
    public static void main(String[] args) {
        // Test Two Sum
        int[] result1 = twoSumSorted(new int[]{2, 7, 11, 15}, 9);
        System.out.println("Two Sum: " + Arrays.toString(result1)); // [0, 1]
        
        // Test Palindrome
        System.out.println("Palindrome: " + isPalindrome("A man, a plan, a canal: Panama")); // true
        
        // Test Remove Duplicates
        int[] nums = {1, 1, 2, 2, 3, 4, 4, 5};
        int length = removeDuplicates(nums);
        System.out.println("Unique elements: " + Arrays.toString(Arrays.copyOf(nums, length)));
        
        // Test Container with Most Water
        System.out.println("Max Area: " + containerWithMostWater(new int[]{1, 8, 6, 2, 5, 4, 8, 3, 7})); // 49
        
        // Test Three Sum
        System.out.println("Three Sum: " + threeSum(new int[]{-1, 0, 1, 2, -1, -4}));
    }
}`,

  cpp: `// Two Pointers Technique in C++
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
#include <cctype>

class TwoPointers {
public:
    /**
     * Find two numbers in sorted array that sum to target
     * Time: O(n), Space: O(1)
     */
    static std::vector<int> twoSumSorted(std::vector<int>& arr, int target) {
        int left = 0, right = arr.size() - 1;
        
        while (left < right) {
            int currentSum = arr[left] + arr[right];
            
            if (currentSum == target) {
                return {left, right}; // Return indices
            } else if (currentSum < target) {
                left++; // Need larger sum
            } else {
                right--; // Need smaller sum
            }
        }
        
        return {-1, -1}; // Not found
    }
    
    /**
     * Check if string is palindrome using two pointers
     * Time: O(n), Space: O(1)
     */
    static bool isPalindrome(std::string s) {
        // Clean string: keep only alphanumeric and convert to lowercase
        std::string cleaned = "";
        for (char c : s) {
            if (std::isalnum(c)) {
                cleaned += std::tolower(c);
            }
        }
        
        int left = 0, right = cleaned.length() - 1;
        
        while (left < right) {
            if (cleaned[left] != cleaned[right]) {
                return false;
            }
            left++;
            right--;
        }
        
        return true;
    }
    
    /**
     * Remove duplicates from sorted array in-place
     * Time: O(n), Space: O(1)
     */
    static int removeDuplicates(std::vector<int>& arr) {
        if (arr.empty()) return 0;
        
        // Two pointers: slow for unique elements, fast for scanning
        int slow = 0;
        
        for (int fast = 1; fast < arr.size(); fast++) {
            if (arr[fast] != arr[slow]) {
                slow++;
                arr[slow] = arr[fast];
            }
        }
        
        return slow + 1; // New length
    }
    
    /**
     * Find maximum area that can be formed by two lines
     * Time: O(n), Space: O(1)
     */
    static int containerWithMostWater(std::vector<int>& heights) {
        int left = 0, right = heights.size() - 1;
        int maxArea = 0;
        
        while (left < right) {
            // Calculate current area
            int width = right - left;
            int height = std::min(heights[left], heights[right]);
            int area = width * height;
            maxArea = std::max(maxArea, area);
            
            // Move pointer with smaller height
            if (heights[left] < heights[right]) {
                left++;
            } else {
                right--;
            }
        }
        
        return maxArea;
    }
    
    /**
     * Find all unique triplets that sum to zero
     * Time: O(n²), Space: O(1) extra
     */
    static std::vector<std::vector<int>> threeSum(std::vector<int>& arr) {
        std::sort(arr.begin(), arr.end());
        std::vector<std::vector<int>> result;
        
        for (int i = 0; i < arr.size() - 2; i++) {
            // Skip duplicates for first element
            if (i > 0 && arr[i] == arr[i - 1]) continue;
            
            int left = i + 1, right = arr.size() - 1;
            
            while (left < right) {
                int currentSum = arr[i] + arr[left] + arr[right];
                
                if (currentSum == 0) {
                    result.push_back({arr[i], arr[left], arr[right]});
                    
                    // Skip duplicates
                    while (left < right && arr[left] == arr[left + 1]) left++;
                    while (left < right && arr[right] == arr[right - 1]) right--;
                    
                    left++;
                    right--;
                } else if (currentSum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        
        return result;
    }
};

// Example usage
int main() {
    // Test Two Sum
    std::vector<int> arr1 = {2, 7, 11, 15};
    auto result1 = TwoPointers::twoSumSorted(arr1, 9);
    std::cout << "Two Sum: [" << result1[0] << ", " << result1[1] << "]" << std::endl;
    
    // Test Palindrome
    std::cout << "Palindrome: " << TwoPointers::isPalindrome("A man, a plan, a canal: Panama") << std::endl;
    
    // Test Remove Duplicates
    std::vector<int> nums = {1, 1, 2, 2, 3, 4, 4, 5};
    int length = TwoPointers::removeDuplicates(nums);
    std::cout << "Unique elements: ";
    for (int i = 0; i < length; i++) {
        std::cout << nums[i] << " ";
    }
    std::cout << std::endl;
    
    // Test Container with Most Water
    std::vector<int> heights = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    std::cout << "Max Area: " << TwoPointers::containerWithMostWater(heights) << std::endl;
    
    return 0;
}`
} 