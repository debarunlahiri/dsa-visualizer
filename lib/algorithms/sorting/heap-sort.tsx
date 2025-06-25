import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const heapSortExplanationContent = (
  <AlgorithmExplanation>
    <h2>Heap Sort</h2>
    <p>
      Heap Sort is a comparison-based sorting technique based on a Binary Heap data structure. It is similar to
      selection sort where we first find the maximum element and place the maximum element at the end. We repeat the
      same process for the remaining elements.
    </p>
    <h3>How it Works:</h3>
    <ol>
      <li>
        <strong>Build a Max Heap:</strong> Convert the input array into a max heap. A max heap is a complete binary tree
        where the value of each internal node is greater than or equal to the values of its children.
      </li>
      <li>
        <strong>Sort:</strong> Repeatedly extract the maximum element from the heap (which is always the root) and place
        it at the end of the sorted portion of the array.
        <ul>
          <li>Swap the root (max element) with the last element of the heap.</li>
          <li>Reduce the size of the heap by one.</li>
          <li>Heapify the root of the tree to maintain the max heap property.</li>
        </ul>
      </li>
      <li>Repeat step 2 until the heap is empty.</li>
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
    <p>$$O(1)$$ (in-place sorting algorithm).</p>
  </AlgorithmExplanation>
)

export const heapSortCodeSnippets = {
  python: `# Heap Sort Implementation in Python
# Time Complexity: O(n log n) in all cases
# Space Complexity: O(1)

def heap_sort(arr):
    """
    Sorts an array using the heap sort algorithm.
    
    Args:
        arr: List of comparable elements
    
    Returns:
        Sorted list
    """
    n = len(arr)
    
    # Build a max heap from the array
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements from heap one by one
    for i in range(n - 1, 0, -1):
        # Move current root to end
        arr[0], arr[i] = arr[i], arr[0]
        
        # Call max heapify on the reduced heap
        heapify(arr, i, 0)
    
    return arr

def heapify(arr, n, i):
    """
    Maintains the max heap property for a subtree rooted at index i.
    
    Args:
        arr: Array to heapify
        n: Size of heap
        i: Root index of subtree
    """
    largest = i       # Initialize largest as root
    left = 2 * i + 1  # Left child
    right = 2 * i + 2 # Right child
    
    # Check if left child exists and is greater than root
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    # Check if right child exists and is greater than largest so far
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    # If largest is not root, swap and continue heapifying
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

# Example usage:
# numbers = [64, 34, 25, 12, 22, 11, 90]
# sorted_numbers = heap_sort(numbers.copy())
# print(sorted_numbers)  # Output: [11, 12, 22, 25, 34, 64, 90]`,

  javascript: `/**
 * Heap Sort Implementation in JavaScript
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(1)
 */

/**
 * Sorts an array using the heap sort algorithm.
 * @param {number[]} arr - Array of numbers to sort
 * @returns {number[]} Sorted array
 */
function heapSort(arr) {
    const n = arr.length;
    
    // Build a max heap from the array
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [arr[0], arr[i]] = [arr[i], arr[0]];
        
        // Call max heapify on the reduced heap
        heapify(arr, i, 0);
    }
    
    return arr;
}

/**
 * Maintains the max heap property for a subtree rooted at index i.
 * @param {number[]} arr - Array to heapify
 * @param {number} n - Size of heap
 * @param {number} i - Root index of subtree
 */
function heapify(arr, n, i) {
    let largest = i;       // Initialize largest as root
    const left = 2 * i + 1;  // Left child
    const right = 2 * i + 2; // Right child
    
    // Check if left child exists and is greater than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    // Check if right child exists and is greater than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    // If largest is not root, swap and continue heapifying
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

// Example usage:
// const numbers = [64, 34, 25, 12, 22, 11, 90];
// const sortedNumbers = heapSort([...numbers]); // Create copy to avoid mutation
// console.log(sortedNumbers); // Output: [11, 12, 22, 25, 34, 64, 90]

module.exports = { heapSort, heapify };`,

  java: `/**
 * Heap Sort Implementation in Java
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(1)
 */

import java.util.Arrays;

public class HeapSort {
    
    /**
     * Sorts an array using the heap sort algorithm.
     * @param arr Array of integers to sort
     * @return Sorted array
     */
    public static int[] heapSort(int[] arr) {
        int n = arr.length;
        
        // Build a max heap from the array
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
        
        // Extract elements from heap one by one
        for (int i = n - 1; i > 0; i--) {
            // Move current root to end
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            
            // Call max heapify on the reduced heap
            heapify(arr, i, 0);
        }
        
        return arr;
    }
    
    /**
     * Maintains the max heap property for a subtree rooted at index i.
     * @param arr Array to heapify
     * @param n Size of heap
     * @param i Root index of subtree
     */
    private static void heapify(int[] arr, int n, int i) {
        int largest = i;       // Initialize largest as root
        int left = 2 * i + 1;  // Left child
        int right = 2 * i + 2; // Right child
        
        // Check if left child exists and is greater than root
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        
        // Check if right child exists and is greater than largest so far
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        
        // If largest is not root, swap and continue heapifying
        if (largest != i) {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            
            heapify(arr, n, largest);
        }
    }
    
    // Example usage
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original array: " + Arrays.toString(numbers));
        
        int[] sortedNumbers = heapSort(numbers.clone());
        System.out.println("Sorted array: " + Arrays.toString(sortedNumbers));
        // Output: [11, 12, 22, 25, 34, 64, 90]
    }
}`,

  cpp: `/**
 * Heap Sort Implementation in C++
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(1)
 */

#include <iostream>
#include <vector>
#include <algorithm>

/**
 * Sorts a vector using the heap sort algorithm.
 * @param arr Vector of integers to sort
 * @return Sorted vector
 */
std::vector<int> heapSort(std::vector<int> arr) {
    int n = arr.size();
    
    // Build a max heap from the array
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements from heap one by one
    for (int i = n - 1; i > 0; i--) {
        // Move current root to end
        std::swap(arr[0], arr[i]);
        
        // Call max heapify on the reduced heap
        heapify(arr, i, 0);
    }
    
    return arr;
}

/**
 * Maintains the max heap property for a subtree rooted at index i.
 * @param arr Vector to heapify
 * @param n Size of heap
 * @param i Root index of subtree
 */
void heapify(std::vector<int>& arr, int n, int i) {
    int largest = i;       // Initialize largest as root
    int left = 2 * i + 1;  // Left child
    int right = 2 * i + 2; // Right child
    
    // Check if left child exists and is greater than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    // Check if right child exists and is greater than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    // If largest is not root, swap and continue heapifying
    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

// Example usage
int main() {
    std::vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    std::cout << "Original array: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    std::vector<int> sortedNumbers = heapSort(numbers);
    std::cout << "Sorted array: ";
    for (int num : sortedNumbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    // Output: 11 12 22 25 34 64 90
    
    return 0;
}`,

  csharp: `/**
 * Heap Sort Implementation in C#
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(1)
 */

using System;

public class HeapSort 
{
    /// <summary>
    /// Sorts an array using the heap sort algorithm.
    /// </summary>
    /// <param name="arr">Array of integers to sort</param>
    /// <returns>Sorted array</returns>
    public static int[] Sort(int[] arr) 
    {
        int n = arr.Length;
        
        // Build a max heap from the array
        for (int i = n / 2 - 1; i >= 0; i--) 
        {
            Heapify(arr, n, i);
        }
        
        // Extract elements from heap one by one
        for (int i = n - 1; i > 0; i--) 
        {
            // Move current root to end
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            
            // Call max heapify on the reduced heap
            Heapify(arr, i, 0);
        }
        
        return arr;
    }
    
    /// <summary>
    /// Maintains the max heap property for a subtree rooted at index i.
    /// </summary>
    /// <param name="arr">Array to heapify</param>
    /// <param name="n">Size of heap</param>
    /// <param name="i">Root index of subtree</param>
    private static void Heapify(int[] arr, int n, int i) 
    {
        int largest = i;       // Initialize largest as root
        int left = 2 * i + 1;  // Left child
        int right = 2 * i + 2; // Right child
        
        // Check if left child exists and is greater than root
        if (left < n && arr[left] > arr[largest]) 
        {
            largest = left;
        }
        
        // Check if right child exists and is greater than largest so far
        if (right < n && arr[right] > arr[largest]) 
        {
            largest = right;
        }
        
        // If largest is not root, swap and continue heapifying
        if (largest != i) 
        {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            
            Heapify(arr, n, largest);
        }
    }
    
    // Example usage
    public static void Main(string[] args) 
    {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        Console.WriteLine("Original array: [" + string.Join(", ", numbers) + "]");
        
        int[] sortedNumbers = Sort((int[])numbers.Clone());
        Console.WriteLine("Sorted array: [" + string.Join(", ", sortedNumbers) + "]");
        // Output: [11, 12, 22, 25, 34, 64, 90]
    }
}`,

  php: `<?php
/**
 * Heap Sort Implementation in PHP
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(1)
 */

/**
 * Sorts an array using the heap sort algorithm.
 * @param array $arr Array of numbers to sort
 * @return array Sorted array
 */
function heapSort($arr) {
    $n = count($arr);
    
    // Build a max heap from the array
    for ($i = intval($n / 2) - 1; $i >= 0; $i--) {
        heapify($arr, $n, $i);
    }
    
    // Extract elements from heap one by one
    for ($i = $n - 1; $i > 0; $i--) {
        // Move current root to end
        $temp = $arr[0];
        $arr[0] = $arr[$i];
        $arr[$i] = $temp;
        
        // Call max heapify on the reduced heap
        heapify($arr, $i, 0);
    }
    
    return $arr;
}

/**
 * Maintains the max heap property for a subtree rooted at index i.
 * @param array $arr Array to heapify (passed by reference)
 * @param int $n Size of heap
 * @param int $i Root index of subtree
 */
function heapify(&$arr, $n, $i) {
    $largest = $i;           // Initialize largest as root
    $left = 2 * $i + 1;      // Left child
    $right = 2 * $i + 2;     // Right child
    
    // Check if left child exists and is greater than root
    if ($left < $n && $arr[$left] > $arr[$largest]) {
        $largest = $left;
    }
    
    // Check if right child exists and is greater than largest so far
    if ($right < $n && $arr[$right] > $arr[$largest]) {
        $largest = $right;
    }
    
    // If largest is not root, swap and continue heapifying
    if ($largest != $i) {
        $temp = $arr[$i];
        $arr[$i] = $arr[$largest];
        $arr[$largest] = $temp;
        
        heapify($arr, $n, $largest);
    }
}

// Example usage
$numbers = [64, 34, 25, 12, 22, 11, 90];
echo "Original array: [" . implode(", ", $numbers) . "]\\n";

$sortedNumbers = heapSort($numbers);
echo "Sorted array: [" . implode(", ", $sortedNumbers) . "]\\n";
// Output: [11, 12, 22, 25, 34, 64, 90]
?>`,

  ruby: `# Heap Sort Implementation in Ruby
# Time Complexity: O(n log n) in all cases
# Space Complexity: O(1)

# Sorts an array using the heap sort algorithm.
# @param arr [Array] Array of comparable elements
# @return [Array] Sorted array
def heap_sort(arr)
  n = arr.length
  
  # Build a max heap from the array
  (n / 2 - 1).downto(0) do |i|
    heapify(arr, n, i)
  end
  
  # Extract elements from heap one by one
  (n - 1).downto(1) do |i|
    # Move current root to end
    arr[0], arr[i] = arr[i], arr[0]
    
    # Call max heapify on the reduced heap
    heapify(arr, i, 0)
  end
  
  arr
end

# Maintains the max heap property for a subtree rooted at index i.
# @param arr [Array] Array to heapify
# @param n [Integer] Size of heap
# @param i [Integer] Root index of subtree
def heapify(arr, n, i)
  largest = i           # Initialize largest as root
  left = 2 * i + 1      # Left child
  right = 2 * i + 2     # Right child
  
  # Check if left child exists and is greater than root
  if left < n && arr[left] > arr[largest]
    largest = left
  end
  
  # Check if right child exists and is greater than largest so far
  if right < n && arr[right] > arr[largest]
    largest = right
  end
  
  # If largest is not root, swap and continue heapifying
  if largest != i
    arr[i], arr[largest] = arr[largest], arr[i]
    heapify(arr, n, largest)
  end
end

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
puts "Original array: #{numbers}"

sorted_numbers = heap_sort(numbers.dup) # Create copy to avoid mutation
puts "Sorted array: #{sorted_numbers}"
# Output: [11, 12, 22, 25, 34, 64, 90]`,

  swift: `/**
 * Heap Sort Implementation in Swift
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(1)
 */

import Foundation

/**
 * Sorts an array using the heap sort algorithm.
 * - Parameter arr: Array of integers to sort (passed as inout for in-place sorting)
 * - Returns: Sorted array
 */
func heapSort(_ arr: inout [Int]) -> [Int] {
    let n = arr.count
    
    // Build a max heap from the array
    for i in stride(from: n / 2 - 1, through: 0, by: -1) {
        heapify(&arr, n: n, i: i)
    }
    
    // Extract elements from heap one by one
    for i in stride(from: n - 1, through: 1, by: -1) {
        // Move current root to end
        arr.swapAt(0, i)
        
        // Call max heapify on the reduced heap
        heapify(&arr, n: i, i: 0)
    }
    
    return arr
}

/**
 * Maintains the max heap property for a subtree rooted at index i.
 * - Parameter arr: Array to heapify (passed as inout)
 * - Parameter n: Size of heap
 * - Parameter i: Root index of subtree
 */
func heapify(_ arr: inout [Int], n: Int, i: Int) {
    var largest = i           // Initialize largest as root
    let left = 2 * i + 1      // Left child
    let right = 2 * i + 2     // Right child
    
    // Check if left child exists and is greater than root
    if left < n && arr[left] > arr[largest] {
        largest = left
    }
    
    // Check if right child exists and is greater than largest so far
    if right < n && arr[right] > arr[largest] {
        largest = right
    }
    
    // If largest is not root, swap and continue heapifying
    if largest != i {
        arr.swapAt(i, largest)
        heapify(&arr, n: n, i: largest)
    }
}

// Alternative version that doesn't modify the original array
func heapSortCopy(_ arr: [Int]) -> [Int] {
    var sortedArray = arr
    return heapSort(&sortedArray)
}

// Example usage
var numbers = [64, 34, 25, 12, 22, 11, 90]
print("Original array: \\(numbers)")

let sortedNumbers = heapSortCopy(numbers)
print("Sorted array: \\(sortedNumbers)")
// Output: [11, 12, 22, 25, 34, 64, 90]`,

  go: `/**
 * Heap Sort Implementation in Go
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(1)
 */

package main

import "fmt"

// heapSort sorts a slice using the heap sort algorithm.
// It returns a new sorted slice without modifying the original.
func heapSort(arr []int) []int {
    // Create a copy to avoid modifying the original slice
    result := make([]int, len(arr))
    copy(result, arr)
    
    n := len(result)
    
    // Build a max heap from the array
    for i := n/2 - 1; i >= 0; i-- {
        heapify(result, n, i)
    }
    
    // Extract elements from heap one by one
    for i := n - 1; i > 0; i-- {
        // Move current root to end
        result[0], result[i] = result[i], result[0]
        
        // Call max heapify on the reduced heap
        heapify(result, i, 0)
    }
    
    return result
}

// heapify maintains the max heap property for a subtree rooted at index i.
func heapify(arr []int, n, i int) {
    largest := i           // Initialize largest as root
    left := 2*i + 1        // Left child
    right := 2*i + 2       // Right child
    
    // Check if left child exists and is greater than root
    if left < n && arr[left] > arr[largest] {
        largest = left
    }
    
    // Check if right child exists and is greater than largest so far
    if right < n && arr[right] > arr[largest] {
        largest = right
    }
    
    // If largest is not root, swap and continue heapifying
    if largest != i {
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
    }
}

// heapSortInPlace sorts a slice in place using the heap sort algorithm.
func heapSortInPlace(arr []int) {
    n := len(arr)
    
    // Build max heap
    for i := n/2 - 1; i >= 0; i-- {
        heapify(arr, n, i)
    }
    
    // Extract elements from heap one by one
    for i := n - 1; i > 0; i-- {
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    }
}

// Example usage
func main() {
    numbers := []int{64, 34, 25, 12, 22, 11, 90}
    fmt.Printf("Original array: %v\\n", numbers)
    
    sortedNumbers := heapSort(numbers)
    fmt.Printf("Sorted array: %v\\n", sortedNumbers)
    // Output: [11 12 22 25 34 64 90]
}`
} 