import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const binarySearchExplanationContent = (
  <AlgorithmExplanation>
    <h2>Binary Search</h2>
    <p>
      Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly
      dividing in half the portion of the list that could contain the item, until you've narrowed down the possible
      locations to just one.
    </p>
    <h3>Prerequisites:</h3>
    <p>The array must be sorted in ascending order.</p>
    <h3>Algorithm Steps:</h3>
    <ol>
      <li>Compare the target value with the middle element of the array.</li>
      <li>If they match, return the middle index.</li>
      <li>If the target is less than the middle element, search the left half.</li>
      <li>If the target is greater than the middle element, search the right half.</li>
      <li>Repeat until the target is found or the search space is empty.</li>
    </ol>
    <h3>Time Complexity:</h3>
    <ul>
      <li><strong>Best case:</strong> $$O(1)$$ - target is at the middle</li>
      <li><strong>Average case:</strong> $$O(\log n)$$</li>
      <li><strong>Worst case:</strong> $$O(\log n)$$ - target is not found</li>
    </ul>
    <h3>Space Complexity:</h3>
    <ul>
      <li><strong>Iterative:</strong> $$O(1)$$</li>
      <li><strong>Recursive:</strong> $$O(\log n)$$ due to call stack</li>
    </ul>
  </AlgorithmExplanation>
)

export const binarySearchCodeSnippets = {
  python: `# Binary Search Implementation in Python
# Time Complexity: O(log n)
# Space Complexity: O(1) iterative, O(log n) recursive

def binary_search_iterative(arr, target):
    """
    Iterative binary search implementation.
    
    Args:
        arr: Sorted array to search in
        target: Value to search for
    
    Returns:
        Index of target if found, -1 otherwise
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2  # Avoid overflow
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

def binary_search_recursive(arr, target, left=0, right=None):
    """
    Recursive binary search implementation.
    
    Args:
        arr: Sorted array to search in
        target: Value to search for
        left: Left boundary index
        right: Right boundary index
    
    Returns:
        Index of target if found, -1 otherwise
    """
    if right is None:
        right = len(arr) - 1
    
    if left > right:
        return -1
    
    mid = left + (right - left) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)

# Example usage:
# arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
# target = 7
# index = binary_search_iterative(arr, target)
# print(f"Index of {target}: {index}")  # Output: 3`,

  javascript: `/**
 * Binary Search Implementation in JavaScript
 * Time Complexity: O(log n)
 * Space Complexity: O(1) iterative, O(log n) recursive
 */

/**
 * Iterative binary search implementation.
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to search for
 * @returns {number} Index of target if found, -1 otherwise
 */
function binarySearchIterative(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
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

/**
 * Recursive binary search implementation.
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to search for
 * @param {number} left - Left boundary index
 * @param {number} right - Right boundary index
 * @returns {number} Index of target if found, -1 otherwise
 */
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) {
        return -1;
    }
    
    const mid = Math.floor(left + (right - left) / 2);
    
    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

// Example usage:
// const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
// const target = 7;
// const index = binarySearchIterative(arr, target);
// console.log(\`Index of \${target}: \${index}\`); // Output: 3`,

  typescript: `/**
 * Binary Search Implementation in TypeScript
 * Time Complexity: O(log n)
 * Space Complexity: O(1) iterative, O(log n) recursive
 */

/**
 * Iterative binary search implementation.
 * @param arr - Sorted array to search in
 * @param target - Value to search for
 * @returns Index of target if found, -1 otherwise
 */
function binarySearchIterative(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;
    
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

/**
 * Recursive binary search implementation.
 * @param arr - Sorted array to search in
 * @param target - Value to search for
 * @param left - Left boundary index
 * @param right - Right boundary index
 * @returns Index of target if found, -1 otherwise
 */
function binarySearchRecursive(
    arr: number[], 
    target: number, 
    left: number = 0, 
    right: number = arr.length - 1
): number {
    if (left > right) {
        return -1;
    }
    
    const mid = Math.floor(left + (right - left) / 2);
    
    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

// Example usage:
// const arr: number[] = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
// const target = 7;
// const index = binarySearchIterative(arr, target);
// console.log(\`Index of \${target}: \${index}\`); // Output: 3`,

  java: `/**
 * Binary Search Implementation in Java
 * Time Complexity: O(log n)
 * Space Complexity: O(1) iterative, O(log n) recursive
 */

public class BinarySearch {
    
    /**
     * Iterative binary search implementation.
     * @param arr Sorted array to search in
     * @param target Value to search for
     * @return Index of target if found, -1 otherwise
     */
    public static int binarySearchIterative(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2; // Avoid overflow
            
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    }
    
    /**
     * Recursive binary search implementation.
     * @param arr Sorted array to search in
     * @param target Value to search for
     * @param left Left boundary index
     * @param right Right boundary index
     * @return Index of target if found, -1 otherwise
     */
    public static int binarySearchRecursive(int[] arr, int target, int left, int right) {
        if (left > right) {
            return -1;
        }
        
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            return binarySearchRecursive(arr, target, mid + 1, right);
        } else {
            return binarySearchRecursive(arr, target, left, mid - 1);
        }
    }
    
    /**
     * Wrapper method for recursive binary search.
     * @param arr Sorted array to search in
     * @param target Value to search for
     * @return Index of target if found, -1 otherwise
     */
    public static int binarySearch(int[] arr, int target) {
        return binarySearchRecursive(arr, target, 0, arr.length - 1);
    }
    
    /**
     * Example usage and testing.
     */
    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
        int target = 7;
        
        int index = binarySearchIterative(arr, target);
        System.out.println("Index of " + target + ": " + index); // Output: 3
        
        index = binarySearch(arr, target);
        System.out.println("Index (recursive) of " + target + ": " + index); // Output: 3
    }
}`,

  cpp: `/**
 * Binary Search Implementation in C++
 * Time Complexity: O(log n)
 * Space Complexity: O(1) iterative, O(log n) recursive
 */

#include <iostream>
#include <vector>

/**
 * Iterative binary search implementation.
 * @param arr Sorted vector to search in
 * @param target Value to search for
 * @return Index of target if found, -1 otherwise
 */
int binarySearchIterative(const std::vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2; // Avoid overflow
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

/**
 * Recursive binary search implementation.
 * @param arr Sorted vector to search in
 * @param target Value to search for
 * @param left Left boundary index
 * @param right Right boundary index
 * @return Index of target if found, -1 otherwise
 */
int binarySearchRecursive(const std::vector<int>& arr, int target, int left, int right) {
    if (left > right) {
        return -1;
    }
    
    int mid = left + (right - left) / 2;
    
    if (arr[mid] == target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

/**
 * Wrapper function for recursive binary search.
 * @param arr Sorted vector to search in
 * @param target Value to search for
 * @return Index of target if found, -1 otherwise
 */
int binarySearch(const std::vector<int>& arr, int target) {
    return binarySearchRecursive(arr, target, 0, arr.size() - 1);
}

// Example usage:
/*
int main() {
    std::vector<int> arr = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
    int target = 7;
    
    int index = binarySearchIterative(arr, target);
    std::cout << "Index of " << target << ": " << index << std::endl; // Output: 3
    
    index = binarySearch(arr, target);
    std::cout << "Index (recursive) of " << target << ": " << index << std::endl; // Output: 3
    
    return 0;
}
*/`,

  csharp: `/**
 * Binary Search Implementation in C#
 * Time Complexity: O(log n)
 * Space Complexity: O(1) iterative, O(log n) recursive
 */

using System;

public class BinarySearch 
{
    /// <summary>
    /// Iterative binary search implementation.
    /// </summary>
    /// <param name="arr">Sorted array to search in</param>
    /// <param name="target">Value to search for</param>
    /// <returns>Index of target if found, -1 otherwise</returns>
    public static int BinarySearchIterative(int[] arr, int target) 
    {
        int left = 0;
        int right = arr.Length - 1;
        
        while (left <= right) 
        {
            int mid = left + (right - left) / 2; // Avoid overflow
            
            if (arr[mid] == target) 
            {
                return mid;
            } 
            else if (arr[mid] < target) 
            {
                left = mid + 1;
            } 
            else 
            {
                right = mid - 1;
            }
        }
        
        return -1;
    }
    
    /// <summary>
    /// Recursive binary search implementation.
    /// </summary>
    /// <param name="arr">Sorted array to search in</param>
    /// <param name="target">Value to search for</param>
    /// <param name="left">Left boundary index</param>
    /// <param name="right">Right boundary index</param>
    /// <returns>Index of target if found, -1 otherwise</returns>
    public static int BinarySearchRecursive(int[] arr, int target, int left, int right) 
    {
        if (left > right) 
        {
            return -1;
        }
        
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) 
        {
            return mid;
        } 
        else if (arr[mid] < target) 
        {
            return BinarySearchRecursive(arr, target, mid + 1, right);
        } 
        else 
        {
            return BinarySearchRecursive(arr, target, left, mid - 1);
        }
    }
    
    /// <summary>
    /// Wrapper method for recursive binary search.
    /// </summary>
    /// <param name="arr">Sorted array to search in</param>
    /// <param name="target">Value to search for</param>
    /// <returns>Index of target if found, -1 otherwise</returns>
    public static int BinarySearchWrapper(int[] arr, int target) 
    {
        return BinarySearchRecursive(arr, target, 0, arr.Length - 1);
    }
}

// Example usage:
/*
class Program 
{
    static void Main() 
    {
        int[] arr = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
        int target = 7;
        
        int index = BinarySearch.BinarySearchIterative(arr, target);
        Console.WriteLine($"Index of {target}: {index}"); // Output: 3
        
        index = BinarySearch.BinarySearchWrapper(arr, target);
        Console.WriteLine($"Index (recursive) of {target}: {index}"); // Output: 3
    }
}
*/`,

  php: `<?php
/**
 * Binary Search Implementation in PHP
 * Time Complexity: O(log n)
 * Space Complexity: O(1) iterative, O(log n) recursive
 */

/**
 * Iterative binary search implementation.
 * @param array $arr Sorted array to search in
 * @param int $target Value to search for
 * @return int Index of target if found, -1 otherwise
 */
function binarySearchIterative(array $arr, int $target): int {
    $left = 0;
    $right = count($arr) - 1;
    
    while ($left <= $right) {
        $mid = $left + intval(($right - $left) / 2);
        
        if ($arr[$mid] === $target) {
            return $mid;
        } elseif ($arr[$mid] < $target) {
            $left = $mid + 1;
        } else {
            $right = $mid - 1;
        }
    }
    
    return -1;
}

/**
 * Recursive binary search implementation.
 * @param array $arr Sorted array to search in
 * @param int $target Value to search for
 * @param int $left Left boundary index
 * @param int $right Right boundary index
 * @return int Index of target if found, -1 otherwise
 */
function binarySearchRecursive(array $arr, int $target, int $left, int $right): int {
    if ($left > $right) {
        return -1;
    }
    
    $mid = $left + intval(($right - $left) / 2);
    
    if ($arr[$mid] === $target) {
        return $mid;
    } elseif ($arr[$mid] < $target) {
        return binarySearchRecursive($arr, $target, $mid + 1, $right);
    } else {
        return binarySearchRecursive($arr, $target, $left, $mid - 1);
    }
}

/**
 * Wrapper function for recursive binary search.
 * @param array $arr Sorted array to search in
 * @param int $target Value to search for
 * @return int Index of target if found, -1 otherwise
 */
function binarySearch(array $arr, int $target): int {
    return binarySearchRecursive($arr, $target, 0, count($arr) - 1);
}

// Example usage:
/*
$arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
$target = 7;

$index = binarySearchIterative($arr, $target);
echo "Index of $target: $index\n"; // Output: 3

$index = binarySearch($arr, $target);
echo "Index (recursive) of $target: $index\n"; // Output: 3
*/
?>`,

  ruby: `# Binary Search Implementation in Ruby
# Time Complexity: O(log n)
# Space Complexity: O(1) iterative, O(log n) recursive

##
# Iterative binary search implementation.
# @param arr [Array<Integer>] Sorted array to search in
# @param target [Integer] Value to search for
# @return [Integer] Index of target if found, -1 otherwise
def binary_search_iterative(arr, target)
  left = 0
  right = arr.length - 1
  
  while left <= right
    mid = left + (right - left) / 2
    
    if arr[mid] == target
      return mid
    elsif arr[mid] < target
      left = mid + 1
    else
      right = mid - 1
    end
  end
  
  -1
end

##
# Recursive binary search implementation.
# @param arr [Array<Integer>] Sorted array to search in
# @param target [Integer] Value to search for
# @param left [Integer] Left boundary index
# @param right [Integer] Right boundary index
# @return [Integer] Index of target if found, -1 otherwise
def binary_search_recursive(arr, target, left, right)
  return -1 if left > right
  
  mid = left + (right - left) / 2
  
  if arr[mid] == target
    mid
  elsif arr[mid] < target
    binary_search_recursive(arr, target, mid + 1, right)
  else
    binary_search_recursive(arr, target, left, mid - 1)
  end
end

##
# Wrapper method for recursive binary search.
# @param arr [Array<Integer>] Sorted array to search in
# @param target [Integer] Value to search for
# @return [Integer] Index of target if found, -1 otherwise
def binary_search(arr, target)
  binary_search_recursive(arr, target, 0, arr.length - 1)
end

# Example usage:
# arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
# target = 7
# 
# index = binary_search_iterative(arr, target)
# puts "Index of #{target}: #{index}" # Output: 3
# 
# index = binary_search(arr, target)
# puts "Index (recursive) of #{target}: #{index}" # Output: 3`,

  swift: `/**
 * Binary Search Implementation in Swift
 * Time Complexity: O(log n)
 * Space Complexity: O(1) iterative, O(log n) recursive
 */

import Foundation

/**
 * Iterative binary search implementation.
 * - Parameters:
 *   - arr: Sorted array to search in
 *   - target: Value to search for
 * - Returns: Index of target if found, -1 otherwise
 */
func binarySearchIterative(_ arr: [Int], _ target: Int) -> Int {
    var left = 0
    var right = arr.count - 1
    
    while left <= right {
        let mid = left + (right - left) / 2
        
        if arr[mid] == target {
            return mid
        } else if arr[mid] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    
    return -1
}

/**
 * Recursive binary search implementation.
 * - Parameters:
 *   - arr: Sorted array to search in
 *   - target: Value to search for
 *   - left: Left boundary index
 *   - right: Right boundary index
 * - Returns: Index of target if found, -1 otherwise
 */
func binarySearchRecursive(_ arr: [Int], _ target: Int, _ left: Int, _ right: Int) -> Int {
    if left > right {
        return -1
    }
    
    let mid = left + (right - left) / 2
    
    if arr[mid] == target {
        return mid
    } else if arr[mid] < target {
        return binarySearchRecursive(arr, target, mid + 1, right)
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1)
    }
}

/**
 * Wrapper function for recursive binary search.
 * - Parameters:
 *   - arr: Sorted array to search in
 *   - target: Value to search for
 * - Returns: Index of target if found, -1 otherwise
 */
func binarySearch(_ arr: [Int], _ target: Int) -> Int {
    return binarySearchRecursive(arr, target, 0, arr.count - 1)
}

// Example usage:
/*
let arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
let target = 7

let index = binarySearchIterative(arr, target)
print("Index of \\(target): \\(index)") // Output: 3

let indexRecursive = binarySearch(arr, target)
print("Index (recursive) of \\(target): \\(indexRecursive)") // Output: 3
*/`,

  go: `/**
 * Binary Search Implementation in Go
 * Time Complexity: O(log n)
 * Space Complexity: O(1) iterative, O(log n) recursive
 */

package main

import "fmt"

// binarySearchIterative performs iterative binary search.
func binarySearchIterative(arr []int, target int) int {
	left := 0
	right := len(arr) - 1
	
	for left <= right {
		mid := left + (right-left)/2
		
		if arr[mid] == target {
			return mid
		} else if arr[mid] < target {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}
	
	return -1
}

// binarySearchRecursive performs recursive binary search.
func binarySearchRecursive(arr []int, target, left, right int) int {
	if left > right {
		return -1
	}
	
	mid := left + (right-left)/2
	
	if arr[mid] == target {
		return mid
	} else if arr[mid] < target {
		return binarySearchRecursive(arr, target, mid+1, right)
	} else {
		return binarySearchRecursive(arr, target, left, mid-1)
	}
}

// binarySearch is a wrapper function for recursive binary search.
func binarySearch(arr []int, target int) int {
	return binarySearchRecursive(arr, target, 0, len(arr)-1)
}

// Example usage:
/*
func main() {
	arr := []int{1, 3, 5, 7, 9, 11, 13, 15, 17, 19}
	target := 7
	
	index := binarySearchIterative(arr, target)
	fmt.Printf("Index of %d: %d\n", target, index) // Output: 3
	
	indexRecursive := binarySearch(arr, target)
	fmt.Printf("Index (recursive) of %d: %d\n", target, indexRecursive) // Output: 3
}
*/`
} 