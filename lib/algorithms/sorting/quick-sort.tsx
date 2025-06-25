import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const quickSortExplanationContent = (
  <AlgorithmExplanation>
    <h2>Quick Sort</h2>
    <p>
      Quick Sort is an efficient, comparison-based, divide and conquer sorting algorithm. It can be faster than Merge
      Sort in practice, but its worst-case performance is $$O(n^2)$$.
    </p>
    <h3>How it Works (Divide and Conquer):</h3>
    <ol>
      <li>
        <strong>Pick a Pivot:</strong> Choose an element from the array as a pivot. Common choices include the first,
        last, or a random element.
      </li>
      <li>
        <strong>Partition:</strong> Reorder the array so that all elements with values less than the pivot come before
        the pivot, while all elements with greater values come after it. After this partitioning, the pivot is in its
        final sorted position.
      </li>
      <li>
        <strong>Conquer:</strong> Recursively apply the above steps to the sub-array of elements with smaller values and
        separately to the sub-array of elements with greater values.
      </li>
    </ol>
    <h3>Time Complexity:</h3>
    <ul>
      <li>
        <strong>Worst-case:</strong> $$O(n^2)$$ (occurs when the pivot selection consistently results in highly
        unbalanced partitions, e.g., picking the smallest or largest element in an already sorted or reverse-sorted
        array).
      </li>
      <li>
        <strong>Average-case:</strong> $$O(n \log n)$$
      </li>
      <li>
        <strong>Best-case:</strong> $$O(n \log n)$$ (occurs when partitions are well-balanced).
      </li>
    </ul>
    <h3>Space Complexity:</h3>
    <p>
      $$O(\log n)$$ on average (due to the recursion call stack). Worst-case space complexity can be $$O(n)$$ if the
      recursion depth goes to n (unbalanced partitions).
    </p>
  </AlgorithmExplanation>
)

export const quickSortCodeSnippets = {
  python: `# Quick Sort Implementation in Python
# Time Complexity: O(n log n) average case, O(n²) worst case
# Space Complexity: O(log n) average case due to recursion

import random

def quick_sort(arr):
    """
    Sorts an array using the quick sort algorithm.
    
    Args:
        arr: List of comparable elements
    
    Returns:
        Sorted list
    """
    if len(arr) <= 1:
        return arr
    
    # Choose pivot (using random pivot for better average performance)
    pivot_index = random.randint(0, len(arr) - 1)
    pivot = arr[pivot_index]
    
    # Partition the array into three parts
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    # Recursively sort left and right partitions
    return quick_sort(left) + middle + quick_sort(right)

def quick_sort_inplace(arr, low=0, high=None):
    """
    In-place quick sort implementation for better space efficiency.
    
    Args:
        arr: List to sort
        low: Starting index
        high: Ending index
    """
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        # Partition the array and get the pivot index
        pivot_index = partition(arr, low, high)
        
        # Recursively sort elements before and after partition
        quick_sort_inplace(arr, low, pivot_index - 1)
        quick_sort_inplace(arr, pivot_index + 1, high)

def partition(arr, low, high):
    """
    Lomuto partition scheme.
    Places the pivot element at its correct position in sorted array.
    """
    # Choose the rightmost element as pivot
    pivot = arr[high]
    
    # Pointer for greater element
    i = low - 1
    
    # Traverse through all elements
    for j in range(low, high):
        # If current element is smaller than or equal to pivot
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    # Swap the pivot element with the greater element specified by i
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    
    # Return the position from where partition is done
    return i + 1

# Example usage:
# numbers = [64, 34, 25, 12, 22, 11, 90]
# sorted_numbers = quick_sort(numbers.copy())
# print(sorted_numbers)  # Output: [11, 12, 22, 25, 34, 64, 90]`,

  javascript: `/**
 * Quick Sort Implementation in JavaScript
 * Time Complexity: O(n log n) average case, O(n²) worst case
 * Space Complexity: O(log n) average case due to recursion
 */

/**
 * Sorts an array using the quick sort algorithm.
 * @param {number[]} arr - Array of numbers to sort
 * @returns {number[]} Sorted array
 */
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    // Choose pivot (using middle element)
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];
    
    // Partition the array into three parts
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    // Recursively sort left and right partitions
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

/**
 * In-place quick sort implementation for better space efficiency.
 * @param {number[]} arr - Array to sort
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 */
function quickSortInPlace(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        // Partition the array and get the pivot index
        const pivotIndex = partition(arr, low, high);
        
        // Recursively sort elements before and after partition
        quickSortInPlace(arr, low, pivotIndex - 1);
        quickSortInPlace(arr, pivotIndex + 1, high);
    }
}

/**
 * Lomuto partition scheme.
 * Places the pivot element at its correct position in sorted array.
 * @param {number[]} arr - Array to partition
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @returns {number} Pivot index
 */
function partition(arr, low, high) {
    // Choose the rightmost element as pivot
    const pivot = arr[high];
    
    // Pointer for greater element
    let i = low - 1;
    
    // Traverse through all elements
    for (let j = low; j < high; j++) {
        // If current element is smaller than or equal to pivot
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
    }
    
    // Swap the pivot element with the greater element specified by i
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    
    // Return the position from where partition is done
    return i + 1;
}

// Example usage:
// const numbers = [64, 34, 25, 12, 22, 11, 90];
// const sortedNumbers = quickSort([...numbers]); // Create copy to avoid mutation
// console.log(sortedNumbers); // Output: [11, 12, 22, 25, 34, 64, 90]

module.exports = { quickSort, quickSortInPlace, partition };`,

  java: `/**
 * Quick Sort Implementation in Java
 * Time Complexity: O(n log n) average case, O(n²) worst case
 * Space Complexity: O(log n) average case due to recursion
 */

import java.util.Arrays;
import java.util.Random;

public class QuickSort {
    private static Random random = new Random();
    
    /**
     * Sorts an array using the quick sort algorithm.
     * @param arr Array of integers to sort
     * @return Sorted array
     */
    public static int[] quickSort(int[] arr) {
        int[] result = arr.clone();
        quickSortInPlace(result, 0, result.length - 1);
        return result;
    }
    
    /**
     * In-place quick sort implementation.
     * @param arr Array to sort
     * @param low Starting index
     * @param high Ending index
     */
    public static void quickSortInPlace(int[] arr, int low, int high) {
        if (low < high) {
            // Partition the array and get the pivot index
            int pivotIndex = partition(arr, low, high);
            
            // Recursively sort elements before and after partition
            quickSortInPlace(arr, low, pivotIndex - 1);
            quickSortInPlace(arr, pivotIndex + 1, high);
        }
    }
    
    /**
     * Lomuto partition scheme.
     * Places the pivot element at its correct position in sorted array.
     * @param arr Array to partition
     * @param low Starting index
     * @param high Ending index
     * @return Pivot index
     */
    private static int partition(int[] arr, int low, int high) {
        // Randomize pivot to improve average performance
        int randomIndex = low + random.nextInt(high - low + 1);
        swap(arr, randomIndex, high);
        
        // Choose the rightmost element as pivot
        int pivot = arr[high];
        
        // Pointer for greater element
        int i = low - 1;
        
        // Traverse through all elements
        for (int j = low; j < high; j++) {
            // If current element is smaller than or equal to pivot
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        
        // Swap the pivot element with the greater element specified by i
        swap(arr, i + 1, high);
        
        // Return the position from where partition is done
        return i + 1;
    }
    
    /**
     * Helper method to swap two elements in an array.
     * @param arr Array containing elements to swap
     * @param i First index
     * @param j Second index
     */
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    // Example usage
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original array: " + Arrays.toString(numbers));
        
        int[] sortedNumbers = quickSort(numbers);
        System.out.println("Sorted array: " + Arrays.toString(sortedNumbers));
        // Output: [11, 12, 22, 25, 34, 64, 90]
    }
}`,

  cpp: `/**
 * Quick Sort Implementation in C++
 * Time Complexity: O(n log n) average case, O(n²) worst case
 * Space Complexity: O(log n) average case due to recursion
 */

#include <iostream>
#include <vector>
#include <algorithm>
#include <random>

/**
 * Sorts a vector using the quick sort algorithm.
 * @param arr Vector of integers to sort
 * @return Sorted vector
 */
std::vector<int> quickSort(std::vector<int> arr) {
    quickSortInPlace(arr, 0, arr.size() - 1);
    return arr;
}

/**
 * In-place quick sort implementation.
 * @param arr Vector to sort
 * @param low Starting index
 * @param high Ending index
 */
void quickSortInPlace(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        // Partition the array and get the pivot index
        int pivotIndex = partition(arr, low, high);
        
        // Recursively sort elements before and after partition
        quickSortInPlace(arr, low, pivotIndex - 1);
        quickSortInPlace(arr, pivotIndex + 1, high);
    }
}

/**
 * Lomuto partition scheme.
 * Places the pivot element at its correct position in sorted array.
 * @param arr Vector to partition
 * @param low Starting index
 * @param high Ending index
 * @return Pivot index
 */
int partition(std::vector<int>& arr, int low, int high) {
    // Randomize pivot to improve average performance
    static std::random_device rd;
    static std::mt19937 gen(rd());
    std::uniform_int_distribution<> dis(low, high);
    int randomIndex = dis(gen);
    std::swap(arr[randomIndex], arr[high]);
    
    // Choose the rightmost element as pivot
    int pivot = arr[high];
    
    // Pointer for greater element
    int i = low - 1;
    
    // Traverse through all elements
    for (int j = low; j < high; j++) {
        // If current element is smaller than or equal to pivot
        if (arr[j] <= pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    
    // Swap the pivot element with the greater element specified by i
    std::swap(arr[i + 1], arr[high]);
    
    // Return the position from where partition is done
    return i + 1;
}

// Example usage
int main() {
    std::vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    std::cout << "Original array: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    std::vector<int> sortedNumbers = quickSort(numbers);
    std::cout << "Sorted array: ";
    for (int num : sortedNumbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    // Output: 11 12 22 25 34 64 90
    
    return 0;
}`,

  csharp: `/**
 * Quick Sort Implementation in C#
 * Time Complexity: O(n log n) average case, O(n²) worst case
 * Space Complexity: O(log n) average case due to recursion
 */

using System;

public class QuickSort 
{
    private static Random random = new Random();
    
    /// <summary>
    /// Sorts an array using the quick sort algorithm.
    /// </summary>
    /// <param name="arr">Array of integers to sort</param>
    /// <returns>Sorted array</returns>
    public static int[] Sort(int[] arr) 
    {
        int[] result = (int[])arr.Clone();
        QuickSortInPlace(result, 0, result.Length - 1);
        return result;
    }
    
    /// <summary>
    /// In-place quick sort implementation.
    /// </summary>
    /// <param name="arr">Array to sort</param>
    /// <param name="low">Starting index</param>
    /// <param name="high">Ending index</param>
    public static void QuickSortInPlace(int[] arr, int low, int high) 
    {
        if (low < high) 
        {
            // Partition the array and get the pivot index
            int pivotIndex = Partition(arr, low, high);
            
            // Recursively sort elements before and after partition
            QuickSortInPlace(arr, low, pivotIndex - 1);
            QuickSortInPlace(arr, pivotIndex + 1, high);
        }
    }
    
    /// <summary>
    /// Lomuto partition scheme.
    /// Places the pivot element at its correct position in sorted array.
    /// </summary>
    /// <param name="arr">Array to partition</param>
    /// <param name="low">Starting index</param>
    /// <param name="high">Ending index</param>
    /// <returns>Pivot index</returns>
    private static int Partition(int[] arr, int low, int high) 
    {
        // Randomize pivot to improve average performance
        int randomIndex = random.Next(low, high + 1);
        Swap(arr, randomIndex, high);
        
        // Choose the rightmost element as pivot
        int pivot = arr[high];
        
        // Pointer for greater element
        int i = low - 1;
        
        // Traverse through all elements
        for (int j = low; j < high; j++) 
        {
            // If current element is smaller than or equal to pivot
            if (arr[j] <= pivot) 
            {
                i++;
                Swap(arr, i, j);
            }
        }
        
        // Swap the pivot element with the greater element specified by i
        Swap(arr, i + 1, high);
        
        // Return the position from where partition is done
        return i + 1;
    }
    
    /// <summary>
    /// Helper method to swap two elements in an array.
    /// </summary>
    /// <param name="arr">Array containing elements to swap</param>
    /// <param name="i">First index</param>
    /// <param name="j">Second index</param>
    private static void Swap(int[] arr, int i, int j) 
    {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
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
 * Quick Sort Implementation in PHP
 * Time Complexity: O(n log n) average case, O(n²) worst case
 * Space Complexity: O(log n) average case due to recursion
 */

/**
 * Sorts an array using the quick sort algorithm.
 * @param array $arr Array of numbers to sort
 * @return array Sorted array
 */
function quickSort($arr) {
    if (count($arr) <= 1) {
        return $arr;
    }
    
    // Choose pivot (using middle element)
    $pivotIndex = intval(count($arr) / 2);
    $pivot = $arr[$pivotIndex];
    
    // Partition the array into three parts
    $left = array_filter($arr, function($x) use ($pivot) { return $x < $pivot; });
    $middle = array_filter($arr, function($x) use ($pivot) { return $x == $pivot; });
    $right = array_filter($arr, function($x) use ($pivot) { return $x > $pivot; });
    
    // Recursively sort left and right partitions
    return array_merge(quickSort($left), $middle, quickSort($right));
}

/**
 * In-place quick sort implementation.
 * @param array $arr Array to sort (passed by reference)
 * @param int $low Starting index
 * @param int $high Ending index
 */
function quickSortInPlace(&$arr, $low = 0, $high = null) {
    if ($high === null) {
        $high = count($arr) - 1;
    }
    
    if ($low < $high) {
        // Partition the array and get the pivot index
        $pivotIndex = partition($arr, $low, $high);
        
        // Recursively sort elements before and after partition
        quickSortInPlace($arr, $low, $pivotIndex - 1);
        quickSortInPlace($arr, $pivotIndex + 1, $high);
    }
}

/**
 * Lomuto partition scheme.
 * Places the pivot element at its correct position in sorted array.
 * @param array $arr Array to partition (passed by reference)
 * @param int $low Starting index
 * @param int $high Ending index
 * @return int Pivot index
 */
function partition(&$arr, $low, $high) {
    // Randomize pivot to improve average performance
    $randomIndex = mt_rand($low, $high);
    $temp = $arr[$randomIndex];
    $arr[$randomIndex] = $arr[$high];
    $arr[$high] = $temp;
    
    // Choose the rightmost element as pivot
    $pivot = $arr[$high];
    
    // Pointer for greater element
    $i = $low - 1;
    
    // Traverse through all elements
    for ($j = $low; $j < $high; $j++) {
        // If current element is smaller than or equal to pivot
        if ($arr[$j] <= $pivot) {
            $i++;
            // Swap elements
            $temp = $arr[$i];
            $arr[$i] = $arr[$j];
            $arr[$j] = $temp;
        }
    }
    
    // Swap the pivot element with the greater element specified by i
    $temp = $arr[$i + 1];
    $arr[$i + 1] = $arr[$high];
    $arr[$high] = $temp;
    
    // Return the position from where partition is done
    return $i + 1;
}

// Example usage
$numbers = [64, 34, 25, 12, 22, 11, 90];
echo "Original array: [" . implode(", ", $numbers) . "]\\n";

$sortedNumbers = quickSort($numbers);
echo "Sorted array: [" . implode(", ", $sortedNumbers) . "]\\n";
// Output: [11, 12, 22, 25, 34, 64, 90]
?>`,

  ruby: `# Quick Sort Implementation in Ruby
# Time Complexity: O(n log n) average case, O(n²) worst case
# Space Complexity: O(log n) average case due to recursion

# Sorts an array using the quick sort algorithm.
# @param arr [Array] Array of comparable elements
# @return [Array] Sorted array
def quick_sort(arr)
  return arr if arr.length <= 1
  
  # Choose pivot (using middle element)
  pivot_index = arr.length / 2
  pivot = arr[pivot_index]
  
  # Partition the array into three parts
  left = arr.select { |x| x < pivot }
  middle = arr.select { |x| x == pivot }
  right = arr.select { |x| x > pivot }
  
  # Recursively sort left and right partitions
  quick_sort(left) + middle + quick_sort(right)
end

# In-place quick sort implementation.
# @param arr [Array] Array to sort
# @param low [Integer] Starting index
# @param high [Integer] Ending index
def quick_sort_inplace!(arr, low = 0, high = arr.length - 1)
  if low < high
    # Partition the array and get the pivot index
    pivot_index = partition!(arr, low, high)
    
    # Recursively sort elements before and after partition
    quick_sort_inplace!(arr, low, pivot_index - 1)
    quick_sort_inplace!(arr, pivot_index + 1, high)
  end
end

# Lomuto partition scheme.
# Places the pivot element at its correct position in sorted array.
# @param arr [Array] Array to partition
# @param low [Integer] Starting index
# @param high [Integer] Ending index
# @return [Integer] Pivot index
def partition!(arr, low, high)
  # Randomize pivot to improve average performance
  random_index = rand(low..high)
  arr[random_index], arr[high] = arr[high], arr[random_index]
  
  # Choose the rightmost element as pivot
  pivot = arr[high]
  
  # Pointer for greater element
  i = low - 1
  
  # Traverse through all elements
  (low...high).each do |j|
    # If current element is smaller than or equal to pivot
    if arr[j] <= pivot
      i += 1
      arr[i], arr[j] = arr[j], arr[i] # Swap elements
    end
  end
  
  # Swap the pivot element with the greater element specified by i
  arr[i + 1], arr[high] = arr[high], arr[i + 1]
  
  # Return the position from where partition is done
  i + 1
end

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
puts "Original array: #{numbers}"

sorted_numbers = quick_sort(numbers.dup) # Create copy to avoid mutation
puts "Sorted array: #{sorted_numbers}"
# Output: [11, 12, 22, 25, 34, 64, 90]`,

  swift: `/**
 * Quick Sort Implementation in Swift
 * Time Complexity: O(n log n) average case, O(n²) worst case
 * Space Complexity: O(log n) average case due to recursion
 */

import Foundation

/**
 * Sorts an array using the quick sort algorithm.
 * - Parameter arr: Array of integers to sort
 * - Returns: Sorted array
 */
func quickSort(_ arr: [Int]) -> [Int] {
    guard arr.count > 1 else { return arr }
    
    // Choose pivot (using middle element)
    let pivotIndex = arr.count / 2
    let pivot = arr[pivotIndex]
    
    // Partition the array into three parts
    let left = arr.filter { $0 < pivot }
    let middle = arr.filter { $0 == pivot }
    let right = arr.filter { $0 > pivot }
    
    // Recursively sort left and right partitions
    return quickSort(left) + middle + quickSort(right)
}

/**
 * In-place quick sort implementation.
 * - Parameter arr: Array to sort (passed as inout for in-place sorting)
 * - Parameter low: Starting index
 * - Parameter high: Ending index
 */
func quickSortInPlace(_ arr: inout [Int], low: Int = 0, high: Int? = nil) {
    let high = high ?? arr.count - 1
    
    if low < high {
        // Partition the array and get the pivot index
        let pivotIndex = partition(&arr, low: low, high: high)
        
        // Recursively sort elements before and after partition
        quickSortInPlace(&arr, low: low, high: pivotIndex - 1)
        quickSortInPlace(&arr, low: pivotIndex + 1, high: high)
    }
}

/**
 * Lomuto partition scheme.
 * Places the pivot element at its correct position in sorted array.
 * - Parameter arr: Array to partition (passed as inout)
 * - Parameter low: Starting index
 * - Parameter high: Ending index
 * - Returns: Pivot index
 */
func partition(_ arr: inout [Int], low: Int, high: Int) -> Int {
    // Randomize pivot to improve average performance
    let randomIndex = Int.random(in: low...high)
    arr.swapAt(randomIndex, high)
    
    // Choose the rightmost element as pivot
    let pivot = arr[high]
    
    // Pointer for greater element
    var i = low - 1
    
    // Traverse through all elements
    for j in low..<high {
        // If current element is smaller than or equal to pivot
        if arr[j] <= pivot {
            i += 1
            arr.swapAt(i, j)
        }
    }
    
    // Swap the pivot element with the greater element specified by i
    arr.swapAt(i + 1, high)
    
    // Return the position from where partition is done
    return i + 1
}

// Example usage
var numbers = [64, 34, 25, 12, 22, 11, 90]
print("Original array: \\(numbers)")

let sortedNumbers = quickSort(numbers)
print("Sorted array: \\(sortedNumbers)")
// Output: [11, 12, 22, 25, 34, 64, 90]`,

  go: `/**
 * Quick Sort Implementation in Go
 * Time Complexity: O(n log n) average case, O(n²) worst case
 * Space Complexity: O(log n) average case due to recursion
 */

package main

import (
    "fmt"
    "math/rand"
    "time"
)

// quickSort sorts a slice using the quick sort algorithm.
// It returns a new sorted slice without modifying the original.
func quickSort(arr []int) []int {
    if len(arr) <= 1 {
        return arr
    }
    
    // Create a copy to avoid modifying the original slice
    result := make([]int, len(arr))
    copy(result, arr)
    
    quickSortInPlace(result, 0, len(result)-1)
    return result
}

// quickSortInPlace sorts a slice in place using the quick sort algorithm.
func quickSortInPlace(arr []int, low, high int) {
    if low < high {
        // Partition the array and get the pivot index
        pivotIndex := partition(arr, low, high)
        
        // Recursively sort elements before and after partition
        quickSortInPlace(arr, low, pivotIndex-1)
        quickSortInPlace(arr, pivotIndex+1, high)
    }
}

// partition implements Lomuto partition scheme.
// Places the pivot element at its correct position in sorted array.
func partition(arr []int, low, high int) int {
    // Randomize pivot to improve average performance
    rand.Seed(time.Now().UnixNano())
    randomIndex := low + rand.Intn(high-low+1)
    arr[randomIndex], arr[high] = arr[high], arr[randomIndex]
    
    // Choose the rightmost element as pivot
    pivot := arr[high]
    
    // Pointer for greater element
    i := low - 1
    
    // Traverse through all elements
    for j := low; j < high; j++ {
        // If current element is smaller than or equal to pivot
        if arr[j] <= pivot {
            i++
            arr[i], arr[j] = arr[j], arr[i] // Swap elements
        }
    }
    
    // Swap the pivot element with the greater element specified by i
    arr[i+1], arr[high] = arr[high], arr[i+1]
    
    // Return the position from where partition is done
    return i + 1
}

// Example usage
func main() {
    numbers := []int{64, 34, 25, 12, 22, 11, 90}
    fmt.Printf("Original array: %v\\n", numbers)
    
    sortedNumbers := quickSort(numbers)
    fmt.Printf("Sorted array: %v\\n", sortedNumbers)
    // Output: [11 12 22 25 34 64 90]
}`
}