import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const countingSortExplanationContent = (
  <AlgorithmExplanation>
    <h2>Counting Sort</h2>
    <p>
      Counting Sort is a non-comparison based sorting algorithm that works well when there is a limited range of input
      values. It counts the number of occurrences of each distinct element and uses this information to place elements
      directly into their sorted positions.
    </p>
    <h3>How it Works:</h3>
    <ol>
      <li>
        <strong>Find Range:</strong> Determine the maximum value (k) in the input array to know the range of input
        values (0 to k).
      </li>
      <li>
        <strong>Initialize Count Array:</strong> Create a count array (e.g., `count`) of size `k+1` and initialize all
        elements to 0.
      </li>
      <li>
        <strong>Store Counts:</strong> Iterate through the input array. For each element, increment its corresponding
        count in the `count` array. (e.g., `count[arr[i]]++`).
      </li>
      <li>
        <strong>Store Cumulative Counts:</strong> Modify the `count` array such that each element at each index stores
        the sum of previous counts. This now contains the positions of elements in the output array. (e.g., `count[i] =
        count[i] + count[i-1]`).
      </li>
      <li>
        <strong>Build Output Array:</strong> Iterate through the input array in reverse order. For each element
        `arr[i]`, place it in the output array at the index `count[arr[i]] - 1`. Then, decrement `count[arr[i]]`.
      </li>
    </ol>
    <h3>Time Complexity:</h3>
    <p>$$O(n + k)$$, where n is the number of elements and k is the range of input values.</p>
    <h3>Space Complexity:</h3>
    <p>$$O(n + k)$$ (for the count array and the output array).</p>
    <p>
      <strong>Note:</strong> Counting sort is efficient if the range of input data (k) is not significantly greater than
      the number of objects to be sorted (n). It is often used as a subroutine in Radix Sort. It is stable.
    </p>
  </AlgorithmExplanation>
)

export const countingSortCodeSnippets = {
  python: `# Counting Sort Implementation in Python
# Time Complexity: O(n + k) where k is the range of input
# Space Complexity: O(k)

def counting_sort(arr, max_val=None):
    """
    Sorts an array using the counting sort algorithm.
    Works only for non-negative integers.
    
    Args:
        arr: List of non-negative integers
        max_val: Maximum value in the array (optional)
    
    Returns:
        Sorted list
    """
    if not arr:
        return arr
    
    # Find the maximum value if not provided
    if max_val is None:
        max_val = max(arr)
    
    # Create counting array
    count = [0] * (max_val + 1)
    
    # Count occurrences of each element
    for num in arr:
        count[num] += 1
    
    # Modify count array to store actual positions
    for i in range(1, len(count)):
        count[i] += count[i - 1]
        
    # Build the output array
    output = [0] * len(arr)
    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i]] - 1] = arr[i]
        count[arr[i]] -= 1
        
    return output

def counting_sort_simple(arr):
    """
    Simple version of counting sort that directly reconstructs the array.
    """
    if not arr:
        return arr
    
    max_val = max(arr)
    count = [0] * (max_val + 1)
    
    # Count occurrences
    for num in arr:
        count[num] += 1
    
    # Reconstruct the sorted array
    result = []
    for value, freq in enumerate(count):
        result.extend([value] * freq)
    
    return result

# Example usage:
# numbers = [4, 2, 2, 8, 3, 3, 1]
# sorted_numbers = counting_sort(numbers)
# print(sorted_numbers)  # Output: [1, 2, 2, 3, 3, 4, 8]`,

  javascript: `/**
 * Counting Sort Implementation in JavaScript
 * Time Complexity: O(n + k) where k is the range of input
 * Space Complexity: O(k)
 */

/**
 * Sorts an array using the counting sort algorithm.
 * Works only for non-negative integers.
 * @param {number[]} arr - Array of non-negative integers to sort
 * @param {number} maxVal - Maximum value in the array (optional)
 * @returns {number[]} Sorted array
 */
function countingSort(arr, maxVal = null) {
    if (arr.length === 0) {
        return arr;
    }
    
    // Find the maximum value if not provided
    if (maxVal === null) {
        maxVal = Math.max(...arr);
    }
    
    // Create counting array
    const count = new Array(maxVal + 1).fill(0);
    
    // Count occurrences of each element
    for (const num of arr) {
        count[num]++;
    }
    
    // Modify count array to store actual positions
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }
    
    // Build the output array
    const output = new Array(arr.length);
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    
    return output;
}

/**
 * Simple version of counting sort that directly reconstructs the array.
 * @param {number[]} arr - Array of non-negative integers to sort
 * @returns {number[]} Sorted array
 */
function countingSortSimple(arr) {
    if (arr.length === 0) {
        return arr;
    }
    
    const maxVal = Math.max(...arr);
    const count = new Array(maxVal + 1).fill(0);
    
    // Count occurrences
    for (const num of arr) {
        count[num]++;
    }
    
    // Reconstruct the sorted array
    const result = [];
    for (let value = 0; value < count.length; value++) {
        for (let freq = 0; freq < count[value]; freq++) {
            result.push(value);
        }
    }
    
    return result;
}

// Example usage:
// const numbers = [4, 2, 2, 8, 3, 3, 1];
// const sortedNumbers = countingSort(numbers);
// console.log(sortedNumbers); // Output: [1, 2, 2, 3, 3, 4, 8]

module.exports = { countingSort, countingSortSimple };`,

  java: `/**
 * Counting Sort Implementation in Java
 * Time Complexity: O(n + k) where k is the range of input
 * Space Complexity: O(k)
 */

import java.util.Arrays;

public class CountingSort {
    
    /**
     * Sorts an array using the counting sort algorithm.
     * Works only for non-negative integers.
     * @param arr Array of non-negative integers to sort
     * @param maxVal Maximum value in the array
     * @return Sorted array
     */
    public static int[] countingSort(int[] arr, int maxVal) {
        if (arr.length == 0) {
            return arr.clone();
        }
        
        // Create counting array
        int[] count = new int[maxVal + 1];
        
        // Count occurrences of each element
        for (int num : arr) {
            count[num]++;
        }
        
        // Modify count array to store actual positions
        for (int i = 1; i < count.length; i++) {
            count[i] += count[i - 1];
        }
        
        // Build the output array
        int[] output = new int[arr.length];
        for (int i = arr.length - 1; i >= 0; i--) {
            output[count[arr[i]] - 1] = arr[i];
            count[arr[i]]--;
        }
        
        return output;
    }
    
    /**
     * Overloaded version that finds max value automatically.
     * @param arr Array of non-negative integers to sort
     * @return Sorted array
     */
    public static int[] countingSort(int[] arr) {
        if (arr.length == 0) {
            return arr.clone();
        }
        
        int maxVal = Arrays.stream(arr).max().orElse(0);
        return countingSort(arr, maxVal);
    }
    
    /**
     * Simple version of counting sort that directly reconstructs the array.
     * @param arr Array of non-negative integers to sort
     * @return Sorted array
     */
    public static int[] countingSortSimple(int[] arr) {
        if (arr.length == 0) {
            return arr.clone();
        }
        
        int maxVal = Arrays.stream(arr).max().orElse(0);
        int[] count = new int[maxVal + 1];
        
        // Count occurrences
        for (int num : arr) {
            count[num]++;
        }
        
        // Reconstruct the sorted array
        int[] result = new int[arr.length];
        int index = 0;
        for (int value = 0; value < count.length; value++) {
            for (int freq = 0; freq < count[value]; freq++) {
                result[index++] = value;
            }
        }
        
        return result;
    }
    
    // Example usage
    public static void main(String[] args) {
        int[] numbers = {4, 2, 2, 8, 3, 3, 1};
        System.out.println("Original array: " + Arrays.toString(numbers));
        
        int[] sortedNumbers = countingSort(numbers);
        System.out.println("Sorted array: " + Arrays.toString(sortedNumbers));
        // Output: [1, 2, 2, 3, 3, 4, 8]
    }
}`,

  cpp: `/**
 * Counting Sort Implementation in C++
 * Time Complexity: O(n + k) where k is the range of input
 * Space Complexity: O(k)
 */

#include <iostream>
#include <vector>
#include <algorithm>

/**
 * Sorts a vector using the counting sort algorithm.
 * Works only for non-negative integers.
 * @param arr Vector of non-negative integers to sort
 * @param maxVal Maximum value in the array
 * @return Sorted vector
 */
std::vector<int> countingSort(std::vector<int> arr, int maxVal) {
    if (arr.empty()) {
        return arr;
    }
    
    // Create counting array
    std::vector<int> count(maxVal + 1, 0);
    
    // Count occurrences of each element
    for (int num : arr) {
        count[num]++;
    }
    
    // Modify count array to store actual positions
    for (int i = 1; i < count.size(); i++) {
        count[i] += count[i - 1];
    }
    
    // Build the output array
    std::vector<int> output(arr.size());
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    
    return output;
}

/**
 * Overloaded version that finds max value automatically.
 * @param arr Vector of non-negative integers to sort
 * @return Sorted vector
 */
std::vector<int> countingSort(std::vector<int> arr) {
    if (arr.empty()) {
        return arr;
    }
    
    int maxVal = *std::max_element(arr.begin(), arr.end());
    return countingSort(arr, maxVal);
}

/**
 * Simple version of counting sort that directly reconstructs the array.
 * @param arr Vector of non-negative integers to sort
 * @return Sorted vector
 */
std::vector<int> countingSortSimple(std::vector<int> arr) {
    if (arr.empty()) {
        return arr;
    }
    
    int maxVal = *std::max_element(arr.begin(), arr.end());
    std::vector<int> count(maxVal + 1, 0);
    
    // Count occurrences
    for (int num : arr) {
        count[num]++;
    }
    
    // Reconstruct the sorted array
    std::vector<int> result;
    for (int value = 0; value < count.size(); value++) {
        for (int freq = 0; freq < count[value]; freq++) {
            result.push_back(value);
        }
    }
    
    return result;
}

// Example usage
int main() {
    std::vector<int> numbers = {4, 2, 2, 8, 3, 3, 1};
    std::cout << "Original array: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    std::vector<int> sortedNumbers = countingSort(numbers);
    std::cout << "Sorted array: ";
    for (int num : sortedNumbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    // Output: 1 2 2 3 3 4 8
    
    return 0;
}`,

  csharp: `/**
 * Counting Sort Implementation in C#
 * Time Complexity: O(n + k) where k is the range of input
 * Space Complexity: O(k)
 */

using System;
using System.Linq;

public class CountingSort 
{
    /// <summary>
    /// Sorts an array using the counting sort algorithm.
    /// Works only for non-negative integers.
    /// </summary>
    /// <param name="arr">Array of non-negative integers to sort</param>
    /// <param name="maxVal">Maximum value in the array</param>
    /// <returns>Sorted array</returns>
    public static int[] Sort(int[] arr, int maxVal) 
    {
        if (arr.Length == 0) 
        {
            return (int[])arr.Clone();
        }
        
        // Create counting array
        int[] count = new int[maxVal + 1];
        
        // Count occurrences of each element
        foreach (int num in arr) 
        {
            count[num]++;
        }
        
        // Modify count array to store actual positions
        for (int i = 1; i < count.Length; i++) 
        {
            count[i] += count[i - 1];
        }
        
        // Build the output array
        int[] output = new int[arr.Length];
        for (int i = arr.Length - 1; i >= 0; i--) 
        {
            output[count[arr[i]] - 1] = arr[i];
            count[arr[i]]--;
        }
        
        return output;
    }
    
    /// <summary>
    /// Overloaded version that finds max value automatically.
    /// </summary>
    /// <param name="arr">Array of non-negative integers to sort</param>
    /// <returns>Sorted array</returns>
    public static int[] Sort(int[] arr) 
    {
        if (arr.Length == 0) 
        {
            return (int[])arr.Clone();
        }
        
        int maxVal = arr.Max();
        return Sort(arr, maxVal);
    }
    
    /// <summary>
    /// Simple version of counting sort that directly reconstructs the array.
    /// </summary>
    /// <param name="arr">Array of non-negative integers to sort</param>
    /// <returns>Sorted array</returns>
    public static int[] SortSimple(int[] arr) 
    {
        if (arr.Length == 0) 
        {
            return (int[])arr.Clone();
        }
        
        int maxVal = arr.Max();
        int[] count = new int[maxVal + 1];
        
        // Count occurrences
        foreach (int num in arr) 
        {
            count[num]++;
        }
        
        // Reconstruct the sorted array
        int[] result = new int[arr.Length];
        int index = 0;
        for (int value = 0; value < count.Length; value++) 
        {
            for (int freq = 0; freq < count[value]; freq++) 
            {
                result[index++] = value;
            }
        }
        
        return result;
    }
    
    // Example usage
    public static void Main(string[] args) 
    {
        int[] numbers = {4, 2, 2, 8, 3, 3, 1};
        Console.WriteLine("Original array: [" + string.Join(", ", numbers) + "]");
        
        int[] sortedNumbers = Sort(numbers);
        Console.WriteLine("Sorted array: [" + string.Join(", ", sortedNumbers) + "]");
        // Output: [1, 2, 2, 3, 3, 4, 8]
    }
}`,

  php: `<?php
/**
 * Counting Sort Implementation in PHP
 * Time Complexity: O(n + k) where k is the range of input
 * Space Complexity: O(k)
 */

/**
 * Sorts an array using the counting sort algorithm.
 * Works only for non-negative integers.
 * @param array $arr Array of non-negative integers to sort
 * @param int $maxVal Maximum value in the array (optional)
 * @return array Sorted array
 */
function countingSort($arr, $maxVal = null) {
    if (empty($arr)) {
        return $arr;
    }
    
    // Find the maximum value if not provided
    if ($maxVal === null) {
        $maxVal = max($arr);
    }
    
    // Create counting array
    $count = array_fill(0, $maxVal + 1, 0);
    
    // Count occurrences of each element
    foreach ($arr as $num) {
        $count[$num]++;
    }
    
    // Modify count array to store actual positions
    for ($i = 1; $i < count($count); $i++) {
        $count[$i] += $count[$i - 1];
    }
    
    // Build the output array
    $output = array_fill(0, count($arr), 0);
    for ($i = count($arr) - 1; $i >= 0; $i--) {
        $output[$count[$arr[$i]] - 1] = $arr[$i];
        $count[$arr[$i]]--;
    }
    
    return $output;
}

/**
 * Simple version of counting sort that directly reconstructs the array.
 * @param array $arr Array of non-negative integers to sort
 * @return array Sorted array
 */
function countingSortSimple($arr) {
    if (empty($arr)) {
        return $arr;
    }
    
    $maxVal = max($arr);
    $count = array_fill(0, $maxVal + 1, 0);
    
    // Count occurrences
    foreach ($arr as $num) {
        $count[$num]++;
    }
    
    // Reconstruct the sorted array
    $result = [];
    for ($value = 0; $value < count($count); $value++) {
        for ($freq = 0; $freq < $count[$value]; $freq++) {
            $result[] = $value;
        }
    }
    
    return $result;
}

// Example usage
$numbers = [4, 2, 2, 8, 3, 3, 1];
echo "Original array: [" . implode(", ", $numbers) . "]\\n";

$sortedNumbers = countingSort($numbers);
echo "Sorted array: [" . implode(", ", $sortedNumbers) . "]\\n";
// Output: [1, 2, 2, 3, 3, 4, 8]
?>`,

  ruby: `# Counting Sort Implementation in Ruby
# Time Complexity: O(n + k) where k is the range of input
# Space Complexity: O(k)

# Sorts an array using the counting sort algorithm.
# Works only for non-negative integers.
# @param arr [Array] Array of non-negative integers
# @param max_val [Integer] Maximum value in the array (optional)
# @return [Array] Sorted array
def counting_sort(arr, max_val = nil)
  return arr if arr.empty?
  
  # Find the maximum value if not provided
  max_val ||= arr.max
  
  # Create counting array
  count = Array.new(max_val + 1, 0)
  
  # Count occurrences of each element
  arr.each { |num| count[num] += 1 }
  
  # Modify count array to store actual positions
  (1...count.length).each do |i|
    count[i] += count[i - 1]
  end
  
  # Build the output array
  output = Array.new(arr.length)
  (arr.length - 1).downto(0) do |i|
    output[count[arr[i]] - 1] = arr[i]
    count[arr[i]] -= 1
  end
  
  output
end

# Simple version of counting sort that directly reconstructs the array.
# @param arr [Array] Array of non-negative integers
# @return [Array] Sorted array
def counting_sort_simple(arr)
  return arr if arr.empty?
  
  max_val = arr.max
  count = Array.new(max_val + 1, 0)
  
  # Count occurrences
  arr.each { |num| count[num] += 1 }
  
  # Reconstruct the sorted array
  result = []
  count.each_with_index do |freq, value|
    freq.times { result << value }
  end
  
  result
end

# Example usage
numbers = [4, 2, 2, 8, 3, 3, 1]
puts "Original array: #{numbers}"

sorted_numbers = counting_sort(numbers)
puts "Sorted array: #{sorted_numbers}"
# Output: [1, 2, 2, 3, 3, 4, 8]`,

  swift: `/**
 * Counting Sort Implementation in Swift
 * Time Complexity: O(n + k) where k is the range of input
 * Space Complexity: O(k)
 */

import Foundation

/**
 * Sorts an array using the counting sort algorithm.
 * Works only for non-negative integers.
 * - Parameter arr: Array of non-negative integers to sort
 * - Parameter maxVal: Maximum value in the array (optional)
 * - Returns: Sorted array
 */
func countingSort(_ arr: [Int], maxVal: Int? = nil) -> [Int] {
    guard !arr.isEmpty else { return arr }
    
    // Find the maximum value if not provided
    let maxValue = maxVal ?? arr.max()!
    
    // Create counting array
    var count = Array(repeating: 0, count: maxValue + 1)
    
    // Count occurrences of each element
    for num in arr {
        count[num] += 1
    }
    
    // Modify count array to store actual positions
    for i in 1..<count.count {
        count[i] += count[i - 1]
    }
    
    // Build the output array
    var output = Array(repeating: 0, count: arr.count)
    for i in stride(from: arr.count - 1, through: 0, by: -1) {
        output[count[arr[i]] - 1] = arr[i]
        count[arr[i]] -= 1
    }
    
    return output
}

/**
 * Simple version of counting sort that directly reconstructs the array.
 * - Parameter arr: Array of non-negative integers to sort
 * - Returns: Sorted array
 */
func countingSortSimple(_ arr: [Int]) -> [Int] {
    guard !arr.isEmpty else { return arr }
    
    let maxVal = arr.max()!
    var count = Array(repeating: 0, count: maxVal + 1)
    
    // Count occurrences
    for num in arr {
        count[num] += 1
    }
    
    // Reconstruct the sorted array
    var result: [Int] = []
    for (value, freq) in count.enumerated() {
        for _ in 0..<freq {
            result.append(value)
        }
    }
    
    return result
}

// Example usage
let numbers = [4, 2, 2, 8, 3, 3, 1]
print("Original array: \\(numbers)")

let sortedNumbers = countingSort(numbers)
print("Sorted array: \\(sortedNumbers)")
// Output: [1, 2, 2, 3, 3, 4, 8]`,

  go: `/**
 * Counting Sort Implementation in Go
 * Time Complexity: O(n + k) where k is the range of input
 * Space Complexity: O(k)
 */

package main

import "fmt"

// countingSort sorts a slice using the counting sort algorithm.
// Works only for non-negative integers.
// It returns a new sorted slice without modifying the original.
func countingSort(arr []int, maxVal int) []int {
    if len(arr) == 0 {
        result := make([]int, len(arr))
        copy(result, arr)
        return result
    }
    
    // Create counting array
    count := make([]int, maxVal+1)
    
    // Count occurrences of each element
    for _, num := range arr {
        count[num]++
    }
    
    // Modify count array to store actual positions
    for i := 1; i < len(count); i++ {
        count[i] += count[i-1]
    }
    
    // Build the output array
    output := make([]int, len(arr))
    for i := len(arr) - 1; i >= 0; i-- {
        output[count[arr[i]]-1] = arr[i]
        count[arr[i]]--
    }
    
    return output
}

// countingSortAuto automatically finds the maximum value and sorts.
func countingSortAuto(arr []int) []int {
    if len(arr) == 0 {
        result := make([]int, len(arr))
        copy(result, arr)
        return result
    }
    
    // Find maximum value
    maxVal := arr[0]
    for _, num := range arr {
        if num > maxVal {
            maxVal = num
        }
    }
    
    return countingSort(arr, maxVal)
}

// countingSortSimple is a simple version that directly reconstructs the array.
func countingSortSimple(arr []int) []int {
    if len(arr) == 0 {
        result := make([]int, len(arr))
        copy(result, arr)
        return result
    }
    
    // Find maximum value
    maxVal := arr[0]
    for _, num := range arr {
        if num > maxVal {
            maxVal = num
        }
    }
    
    // Create counting array
    count := make([]int, maxVal+1)
    
    // Count occurrences
    for _, num := range arr {
        count[num]++
    }
    
    // Reconstruct the sorted array
    var result []int
    for value, freq := range count {
        for i := 0; i < freq; i++ {
            result = append(result, value)
        }
    }
    
    return result
}

// Example usage
func main() {
    numbers := []int{4, 2, 2, 8, 3, 3, 1}
    fmt.Printf("Original array: %v\\n", numbers)
    
    sortedNumbers := countingSortAuto(numbers)
    fmt.Printf("Sorted array: %v\\n", sortedNumbers)
    // Output: [1 2 2 3 3 4 8]
}`
} 