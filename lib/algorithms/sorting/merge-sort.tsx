import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const mergeSortExplanationContent = (
  <AlgorithmExplanation>
    <h2>Merge Sort</h2>
    <p>
      Merge Sort is an efficient, comparison-based, divide and conquer sorting algorithm. Most implementations produce a
      stable sort, meaning that the order of equal elements is the same in the input and output.
    </p>
    <h3>How it Works (Divide and Conquer):</h3>
    <ol>
      <li>
        <strong>Divide:</strong> If the list has more than one element, divide the unsorted list into two sublists of
        about equal size.
      </li>
      <li>
        <strong>Conquer:</strong> Recursively sort each sublist. If a sublist has only one element, it is considered
        sorted.
      </li>
      <li>
        <strong>Combine (Merge):</strong> Merge the two sorted sublists back into one sorted list. This is done by
        comparing elements from each sublist and placing the smaller one into the new list, repeating until all elements
        from both sublists are merged.
      </li>
    </ol>
    <h3>Time Complexity:</h3>
    <ul>
      <li>
        <strong>Worst-case:</strong> $$O(n \log n)$$
      </li>
      <li>
        <strong>Average-case:</strong> $$O(n \log n)$$
      </li>
      <li>
        <strong>Best-case:</strong> $$O(n \log n)$$
      </li>
    </ul>
    <h3>Space Complexity:</h3>
    <p>
      $$O(n)$$ for typical implementations that use an auxiliary array for merging. In-place merge sort variations exist
      but are more complex.
    </p>
  </AlgorithmExplanation>
)

export const mergeSortCodeSnippets = {
  python: `# Merge Sort Implementation in Python
# Time Complexity: O(n log n) in all cases
# Space Complexity: O(n)

def merge_sort(arr):
    """
    Sorts an array using the merge sort algorithm.
    
    Args:
        arr: List of comparable elements
    
    Returns:
        Sorted list
    """
    if len(arr) <= 1:
        return arr
    
    # Divide the array into two halves
    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]
    
    # Recursively sort both halves
    left = merge_sort(left)
    right = merge_sort(right)
    
    # Merge the sorted halves
    return merge(left, right)

def merge(left, right):
    """
    Merges two sorted arrays into a single sorted array.
    
    Args:
        left: First sorted array
        right: Second sorted array
    
    Returns:
        Merged sorted array
    """
    result = []
    i = j = 0
    
    # Compare elements and merge in sorted order
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Add remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result

# Example usage:
# numbers = [64, 34, 25, 12, 22, 11, 90]
# sorted_numbers = merge_sort(numbers)
# print(sorted_numbers)  # Output: [11, 12, 22, 25, 34, 64, 90]`,

  javascript: `/**
 * Merge Sort Implementation in JavaScript
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(n)
 */

/**
 * Sorts an array using the merge sort algorithm.
 * @param {number[]} arr - Array of numbers to sort
 * @returns {number[]} Sorted array
 */
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    // Divide the array into two halves
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    
    // Recursively sort both halves
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);
    
    // Merge the sorted halves
    return merge(sortedLeft, sortedRight);
}

/**
 * Merges two sorted arrays into a single sorted array.
 * @param {number[]} left - First sorted array
 * @param {number[]} right - Second sorted array
 * @returns {number[]} Merged sorted array
 */
function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    // Compare elements and merge in sorted order
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    // Add remaining elements
    while (i < left.length) {
        result.push(left[i]);
        i++;
    }
    
    while (j < right.length) {
        result.push(right[j]);
        j++;
    }
    
    return result;
}

// Example usage:
// const numbers = [64, 34, 25, 12, 22, 11, 90];
// const sortedNumbers = mergeSort(numbers);
// console.log(sortedNumbers); // Output: [11, 12, 22, 25, 34, 64, 90]

module.exports = { mergeSort, merge };`,

  java: `/**
 * Merge Sort Implementation in Java
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(n)
 */

import java.util.Arrays;

public class MergeSort {
    
    /**
     * Sorts an array using the merge sort algorithm.
     * @param arr Array of integers to sort
     * @return Sorted array
     */
    public static int[] mergeSort(int[] arr) {
        if (arr.length <= 1) {
            return arr.clone();
        }
        
        // Divide the array into two halves
        int mid = arr.length / 2;
        int[] left = Arrays.copyOfRange(arr, 0, mid);
        int[] right = Arrays.copyOfRange(arr, mid, arr.length);
        
        // Recursively sort both halves
        left = mergeSort(left);
        right = mergeSort(right);
        
        // Merge the sorted halves
        return merge(left, right);
    }
    
    /**
     * Merges two sorted arrays into a single sorted array.
     * @param left First sorted array
     * @param right Second sorted array
     * @return Merged sorted array
     */
    private static int[] merge(int[] left, int[] right) {
        int[] result = new int[left.length + right.length];
        int i = 0, j = 0, k = 0;
        
        // Compare elements and merge in sorted order
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                result[k] = left[i];
                i++;
            } else {
                result[k] = right[j];
                j++;
            }
            k++;
        }
        
        // Add remaining elements
        while (i < left.length) {
            result[k] = left[i];
            i++;
            k++;
        }
        
        while (j < right.length) {
            result[k] = right[j];
            j++;
            k++;
        }
        
        return result;
    }
    
    // Example usage
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original array: " + Arrays.toString(numbers));
        
        int[] sortedNumbers = mergeSort(numbers);
        System.out.println("Sorted array: " + Arrays.toString(sortedNumbers));
        // Output: [11, 12, 22, 25, 34, 64, 90]
    }
}`,

  cpp: `/**
 * Merge Sort Implementation in C++
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(n)
 */

#include <iostream>
#include <vector>

/**
 * Sorts a vector using the merge sort algorithm.
 * @param arr Vector of integers to sort
 * @return Sorted vector
 */
std::vector<int> mergeSort(std::vector<int> arr) {
    if (arr.size() <= 1) {
        return arr;
    }
    
    // Divide the array into two halves
    int mid = arr.size() / 2;
    std::vector<int> left(arr.begin(), arr.begin() + mid);
    std::vector<int> right(arr.begin() + mid, arr.end());
    
    // Recursively sort both halves
    left = mergeSort(left);
    right = mergeSort(right);
    
    // Merge the sorted halves
    return merge(left, right);
}

/**
 * Merges two sorted vectors into a single sorted vector.
 * @param left First sorted vector
 * @param right Second sorted vector
 * @return Merged sorted vector
 */
std::vector<int> merge(const std::vector<int>& left, const std::vector<int>& right) {
    std::vector<int> result;
    int i = 0, j = 0;
    
    // Compare elements and merge in sorted order
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) {
            result.push_back(left[i]);
            i++;
        } else {
            result.push_back(right[j]);
            j++;
        }
    }
    
    // Add remaining elements
    while (i < left.size()) {
        result.push_back(left[i]);
        i++;
    }
    
    while (j < right.size()) {
        result.push_back(right[j]);
        j++;
    }
    
    return result;
}

// Example usage
int main() {
    std::vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    std::cout << "Original array: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    std::vector<int> sortedNumbers = mergeSort(numbers);
    std::cout << "Sorted array: ";
    for (int num : sortedNumbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    // Output: 11 12 22 25 34 64 90
    
    return 0;
}`,

  csharp: `/**
 * Merge Sort Implementation in C#
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(n)
 */

using System;
using System.Linq;

public class MergeSort 
{
    /// <summary>
    /// Sorts an array using the merge sort algorithm.
    /// </summary>
    /// <param name="arr">Array of integers to sort</param>
    /// <returns>Sorted array</returns>
    public static int[] Sort(int[] arr) 
    {
        if (arr.Length <= 1) 
        {
            return (int[])arr.Clone();
        }
        
        // Divide the array into two halves
        int mid = arr.Length / 2;
        int[] left = arr.Take(mid).ToArray();
        int[] right = arr.Skip(mid).ToArray();
        
        // Recursively sort both halves
        left = Sort(left);
        right = Sort(right);
        
        // Merge the sorted halves
        return Merge(left, right);
    }
    
    /// <summary>
    /// Merges two sorted arrays into a single sorted array.
    /// </summary>
    /// <param name="left">First sorted array</param>
    /// <param name="right">Second sorted array</param>
    /// <returns>Merged sorted array</returns>
    private static int[] Merge(int[] left, int[] right) 
    {
        int[] result = new int[left.Length + right.Length];
        int i = 0, j = 0, k = 0;
        
        // Compare elements and merge in sorted order
        while (i < left.Length && j < right.Length) 
        {
            if (left[i] <= right[j]) 
            {
                result[k] = left[i];
                i++;
            } 
            else 
            {
                result[k] = right[j];
                j++;
            }
            k++;
        }
        
        // Add remaining elements
        while (i < left.Length) 
        {
            result[k] = left[i];
            i++;
            k++;
        }
        
        while (j < right.Length) 
        {
            result[k] = right[j];
            j++;
            k++;
        }
        
        return result;
    }
    
    // Example usage
    public static void Main(string[] args) 
    {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        Console.WriteLine("Original array: [" + string.Join(", ", numbers) + "]");
        
        int[] sortedNumbers = Sort(numbers);
        Console.WriteLine("Sorted array: [" + string.Join(", ", sortedNumbers) + "]");
        // Output: [11, 12, 22, 25, 34, 64, 90]
    }
}`,

  php: `<?php
/**
 * Merge Sort Implementation in PHP
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(n)
 */

/**
 * Sorts an array using the merge sort algorithm.
 * @param array $arr Array of numbers to sort
 * @return array Sorted array
 */
function mergeSort($arr) {
    if (count($arr) <= 1) {
        return $arr;
    }
    
    // Divide the array into two halves
    $mid = intval(count($arr) / 2);
    $left = array_slice($arr, 0, $mid);
    $right = array_slice($arr, $mid);
    
    // Recursively sort both halves
    $left = mergeSort($left);
    $right = mergeSort($right);
    
    // Merge the sorted halves
    return mergeArrays($left, $right);
}

/**
 * Merges two sorted arrays into a single sorted array.
 * @param array $left First sorted array
 * @param array $right Second sorted array
 * @return array Merged sorted array
 */
function mergeArrays($left, $right) {
    $result = [];
    $i = $j = 0;
    
    // Compare elements and merge in sorted order
    while ($i < count($left) && $j < count($right)) {
        if ($left[$i] <= $right[$j]) {
            $result[] = $left[$i];
            $i++;
        } else {
            $result[] = $right[$j];
            $j++;
        }
    }
    
    // Add remaining elements
    while ($i < count($left)) {
        $result[] = $left[$i];
        $i++;
    }
    
    while ($j < count($right)) {
        $result[] = $right[$j];
        $j++;
    }
    
    return $result;
}

// Example usage
$numbers = [64, 34, 25, 12, 22, 11, 90];
echo "Original array: [" . implode(", ", $numbers) . "]\\n";

$sortedNumbers = mergeSort($numbers);
echo "Sorted array: [" . implode(", ", $sortedNumbers) . "]\\n";
// Output: [11, 12, 22, 25, 34, 64, 90]
?>`,

  ruby: `# Merge Sort Implementation in Ruby
# Time Complexity: O(n log n) in all cases
# Space Complexity: O(n)

# Sorts an array using the merge sort algorithm.
# @param arr [Array] Array of comparable elements
# @return [Array] Sorted array
def merge_sort(arr)
  return arr if arr.length <= 1
  
  # Divide the array into two halves
  mid = arr.length / 2
  left = arr[0...mid]
  right = arr[mid..-1]
  
  # Recursively sort both halves
  left = merge_sort(left)
  right = merge_sort(right)
  
  # Merge the sorted halves
  merge(left, right)
end

# Merges two sorted arrays into a single sorted array.
# @param left [Array] First sorted array
# @param right [Array] Second sorted array
# @return [Array] Merged sorted array
def merge(left, right)
  result = []
  i = j = 0
  
  # Compare elements and merge in sorted order
  while i < left.length && j < right.length
    if left[i] <= right[j]
      result << left[i]
      i += 1
    else
      result << right[j]
      j += 1
    end
  end
  
  # Add remaining elements
  result.concat(left[i..-1]) if i < left.length
  result.concat(right[j..-1]) if j < right.length
  
  result
end

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
puts "Original array: #{numbers}"

sorted_numbers = merge_sort(numbers)
puts "Sorted array: #{sorted_numbers}"
# Output: [11, 12, 22, 25, 34, 64, 90]`,

  swift: `/**
 * Merge Sort Implementation in Swift
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(n)
 */

import Foundation

/**
 * Sorts an array using the merge sort algorithm.
 * - Parameter arr: Array of integers to sort
 * - Returns: Sorted array
 */
func mergeSort(_ arr: [Int]) -> [Int] {
    guard arr.count > 1 else { return arr }
    
    // Divide the array into two halves
    let mid = arr.count / 2
    let left = Array(arr[0..<mid])
    let right = Array(arr[mid..<arr.count])
    
    // Recursively sort both halves
    let sortedLeft = mergeSort(left)
    let sortedRight = mergeSort(right)
    
    // Merge the sorted halves
    return merge(sortedLeft, sortedRight)
}

/**
 * Merges two sorted arrays into a single sorted array.
 * - Parameter left: First sorted array
 * - Parameter right: Second sorted array
 * - Returns: Merged sorted array
 */
func merge(_ left: [Int], _ right: [Int]) -> [Int] {
    var result: [Int] = []
    var i = 0, j = 0
    
    // Compare elements and merge in sorted order
    while i < left.count && j < right.count {
        if left[i] <= right[j] {
            result.append(left[i])
            i += 1
        } else {
            result.append(right[j])
            j += 1
        }
    }
    
    // Add remaining elements
    while i < left.count {
        result.append(left[i])
        i += 1
    }
    
    while j < right.count {
        result.append(right[j])
        j += 1
    }
    
    return result
}

// Example usage
let numbers = [64, 34, 25, 12, 22, 11, 90]
print("Original array: \\(numbers)")

let sortedNumbers = mergeSort(numbers)
print("Sorted array: \\(sortedNumbers)")
// Output: [11, 12, 22, 25, 34, 64, 90]`,

  go: `/**
 * Merge Sort Implementation in Go
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(n)
 */

package main

import "fmt"

// mergeSort sorts a slice using the merge sort algorithm.
// It returns a new sorted slice without modifying the original.
func mergeSort(arr []int) []int {
    if len(arr) <= 1 {
        // Create a copy to maintain consistency
        result := make([]int, len(arr))
        copy(result, arr)
        return result
    }
    
    // Divide the array into two halves
    mid := len(arr) / 2
    left := make([]int, mid)
    right := make([]int, len(arr)-mid)
    
    copy(left, arr[:mid])
    copy(right, arr[mid:])
    
    // Recursively sort both halves
    left = mergeSort(left)
    right = mergeSort(right)
    
    // Merge the sorted halves
    return merge(left, right)
}

// merge combines two sorted slices into a single sorted slice.
func merge(left, right []int) []int {
    result := make([]int, 0, len(left)+len(right))
    i, j := 0, 0
    
    // Compare elements and merge in sorted order
    for i < len(left) && j < len(right) {
        if left[i] <= right[j] {
            result = append(result, left[i])
            i++
        } else {
            result = append(result, right[j])
            j++
        }
    }
    
    // Add remaining elements
    for i < len(left) {
        result = append(result, left[i])
        i++
    }
    
    for j < len(right) {
        result = append(result, right[j])
        j++
    }
    
    return result
}

// Example usage
func main() {
    numbers := []int{64, 34, 25, 12, 22, 11, 90}
    fmt.Printf("Original array: %v\\n", numbers)
    
    sortedNumbers := mergeSort(numbers)
    fmt.Printf("Sorted array: %v\\n", sortedNumbers)
    // Output: [11 12 22 25 34 64 90]
}`
} 