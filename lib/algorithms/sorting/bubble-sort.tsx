import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const bubbleSortExplanationContent = (
  <AlgorithmExplanation>
    <h2>Bubble Sort</h2>
    <p>
      Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares
      adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the
      list is sorted. The algorithm gets its name because smaller elements "bubble" to the top of the list with each
      pass.
    </p>
    <h3>How it Works:</h3>
    <ol>
      <li>Start at the beginning of the array.</li>
      <li>Compare the first element with the second. If the first is greater than the second, swap them.</li>
      <li>Move to the next pair of elements (second and third), compare, and swap if necessary.</li>
      <li>
        Continue this process for all adjacent pairs until the end of the array. This completes one pass. After the
        first pass, the largest element will have "bubbled" to its correct position at the end of the array.
      </li>
      <li>
        Repeat the passes. For each subsequent pass, you need to compare one fewer element because the largest elements
        are already in place.
      </li>
      <li>The algorithm terminates when a pass completes with no swaps, indicating the array is sorted.</li>
    </ol>
    <h3>Time Complexity:</h3>
    <ul>
      <li>
        <strong>Worst-case and Average-case:</strong> $$O(n^2)$$. This occurs when the array is in reverse order or
        randomly ordered.
      </li>
      <li>
        <strong>Best-case:</strong> $$O(n)$$. This occurs when the array is already sorted, and we use an optimization
        to detect if no swaps occurred in a pass.
      </li>
    </ul>
    <h3>Space Complexity:</h3>
    <p>$$O(1)$$ (in-place sorting algorithm).</p>
  </AlgorithmExplanation>
)

export const bubbleSortCodeSnippets = {
  python: `# Bubble Sort Implementation in Python
# Time Complexity: O(n²) average/worst case, O(n) best case
# Space Complexity: O(1)

def bubble_sort(arr):
    """
    Sorts an array using the bubble sort algorithm.
    
    Args:
        arr: List of comparable elements
    
    Returns:
        Sorted list
    """
    n = len(arr)
    
    # Traverse through all array elements
    for i in range(n):
        swapped = False
        
        # Last i elements are already in place
        for j in range(0, n - i - 1):
            # Traverse the array from 0 to n-i-1
            # Swap if the element found is greater than the next element
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no two elements were swapped, array is sorted
        if not swapped:
            break
    
    return arr

# Example usage:
# numbers = [64, 34, 25, 12, 22, 11, 90]
# sorted_numbers = bubble_sort(numbers)
# print(sorted_numbers)  # Output: [11, 12, 22, 25, 34, 64, 90]`,

  javascript: `/**
 * Bubble Sort Implementation in JavaScript
 * Time Complexity: O(n²) average/worst case, O(n) best case
 * Space Complexity: O(1)
 */

function bubbleSort(arr) {
    /**
     * Sorts an array using the bubble sort algorithm.
     * @param {number[]} arr - Array of numbers to sort
     * @returns {number[]} Sorted array
     */
    const n = arr.length;
    
    // Traverse through all array elements
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        // Last i elements are already in place
        for (let j = 0; j < n - i - 1; j++) {
            // Traverse the array from 0 to n-i-1
            // Swap if the element found is greater than the next element
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // ES6 destructuring swap
                swapped = true;
            }
        }
        
        // If no two elements were swapped, array is sorted
        if (!swapped) {
            break;
        }
    }
    
    return arr;
}

// Example usage:
// const numbers = [64, 34, 25, 12, 22, 11, 90];
// const sortedNumbers = bubbleSort([...numbers]); // Create copy to avoid mutation
// console.log(sortedNumbers); // Output: [11, 12, 22, 25, 34, 64, 90]

module.exports = bubbleSort;`,

  java: `/**
 * Bubble Sort Implementation in Java
 * Time Complexity: O(n²) average/worst case, O(n) best case
 * Space Complexity: O(1)
 */

import java.util.Arrays;

public class BubbleSort {
    
    /**
     * Sorts an array using the bubble sort algorithm.
     * @param arr Array of integers to sort
     * @return Sorted array
     */
    public static int[] bubbleSort(int[] arr) {
        int n = arr.length;
        
        // Traverse through all array elements
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            
            // Last i elements are already in place
            for (int j = 0; j < n - i - 1; j++) {
                // Traverse the array from 0 to n-i-1
                // Swap if the element found is greater than the next element
                if (arr[j] > arr[j + 1]) {
                    // Swap elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            // If no two elements were swapped, array is sorted
            if (!swapped) {
                break;
            }
        }
        
        return arr;
    }
    
    // Example usage
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original array: " + Arrays.toString(numbers));
        
        int[] sortedNumbers = bubbleSort(numbers.clone());
        System.out.println("Sorted array: " + Arrays.toString(sortedNumbers));
        // Output: [11, 12, 22, 25, 34, 64, 90]
    }
}`,

  cpp: `/**
 * Bubble Sort Implementation in C++
 * Time Complexity: O(n²) average/worst case, O(n) best case
 * Space Complexity: O(1)
 */

#include <iostream>
#include <vector>
#include <algorithm>

/**
 * Sorts a vector using the bubble sort algorithm.
 * @param arr Vector of integers to sort
 * @return Sorted vector
 */
std::vector<int> bubbleSort(std::vector<int> arr) {
    int n = arr.size();
    
    // Traverse through all array elements
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        
        // Last i elements are already in place
        for (int j = 0; j < n - i - 1; j++) {
            // Traverse the array from 0 to n-i-1
            // Swap if the element found is greater than the next element
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]); // Built-in swap function
                swapped = true;
            }
        }
        
        // If no two elements were swapped, array is sorted
        if (!swapped) {
            break;
        }
    }
    
    return arr;
}

// Example usage
int main() {
    std::vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    std::cout << "Original array: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    std::vector<int> sortedNumbers = bubbleSort(numbers);
    std::cout << "Sorted array: ";
    for (int num : sortedNumbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    // Output: 11 12 22 25 34 64 90
    
    return 0;
}`,

  csharp: `/**
 * Bubble Sort Implementation in C#
 * Time Complexity: O(n²) average/worst case, O(n) best case
 * Space Complexity: O(1)
 */

using System;

public class BubbleSort 
{
    /// <summary>
    /// Sorts an array using the bubble sort algorithm.
    /// </summary>
    /// <param name="arr">Array of integers to sort</param>
    /// <returns>Sorted array</returns>
    public static int[] Sort(int[] arr) 
    {
        int n = arr.Length;
        
        // Traverse through all array elements
        for (int i = 0; i < n - 1; i++) 
        {
            bool swapped = false;
            
            // Last i elements are already in place
            for (int j = 0; j < n - i - 1; j++) 
            {
                // Traverse the array from 0 to n-i-1
                // Swap if the element found is greater than the next element
                if (arr[j] > arr[j + 1]) 
                {
                    // Swap elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            // If no two elements were swapped, array is sorted
            if (!swapped) 
            {
                break;
            }
        }
        
        return arr;
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
 * Bubble Sort Implementation in PHP
 * Time Complexity: O(n²) average/worst case, O(n) best case
 * Space Complexity: O(1)
 */

/**
 * Sorts an array using the bubble sort algorithm.
 * @param array $arr Array of numbers to sort
 * @return array Sorted array
 */
function bubbleSort($arr) {
    $n = count($arr);
    
    // Traverse through all array elements
    for ($i = 0; $i < $n - 1; $i++) {
        $swapped = false;
        
        // Last i elements are already in place
        for ($j = 0; $j < $n - $i - 1; $j++) {
            // Traverse the array from 0 to n-i-1
            // Swap if the element found is greater than the next element
            if ($arr[$j] > $arr[$j + 1]) {
                // Swap elements
                $temp = $arr[$j];
                $arr[$j] = $arr[$j + 1];
                $arr[$j + 1] = $temp;
                $swapped = true;
            }
        }
        
        // If no two elements were swapped, array is sorted
        if (!$swapped) {
            break;
        }
    }
    
    return $arr;
}

// Example usage
$numbers = [64, 34, 25, 12, 22, 11, 90];
echo "Original array: [" . implode(", ", $numbers) . "]\\n";

$sortedNumbers = bubbleSort($numbers);
echo "Sorted array: [" . implode(", ", $sortedNumbers) . "]\\n";
// Output: [11, 12, 22, 25, 34, 64, 90]
?>`,

  ruby: `# Bubble Sort Implementation in Ruby
# Time Complexity: O(n²) average/worst case, O(n) best case
# Space Complexity: O(1)

# Sorts an array using the bubble sort algorithm.
# @param arr [Array] Array of comparable elements
# @return [Array] Sorted array
def bubble_sort(arr)
  n = arr.length
  
  # Traverse through all array elements
  (0...n-1).each do |i|
    swapped = false
    
    # Last i elements are already in place
    (0...n-i-1).each do |j|
      # Traverse the array from 0 to n-i-1
      # Swap if the element found is greater than the next element
      if arr[j] > arr[j+1]
        arr[j], arr[j+1] = arr[j+1], arr[j] # Ruby parallel assignment swap
        swapped = true
      end
    end
    
    # If no two elements were swapped, array is sorted
    break unless swapped
  end
  
  arr
end

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
puts "Original array: #{numbers}"

sorted_numbers = bubble_sort(numbers.dup) # Create copy to avoid mutation
puts "Sorted array: #{sorted_numbers}"
# Output: [11, 12, 22, 25, 34, 64, 90]`,

  swift: `/**
 * Bubble Sort Implementation in Swift
 * Time Complexity: O(n²) average/worst case, O(n) best case
 * Space Complexity: O(1)
 */

import Foundation

/**
 * Sorts an array using the bubble sort algorithm.
 * - Parameter arr: Array of integers to sort (passed as inout for in-place sorting)
 * - Returns: Sorted array
 */
func bubbleSort(_ arr: inout [Int]) -> [Int] {
    let n = arr.count
    
    // Traverse through all array elements
    for i in 0..<n-1 {
        var swapped = false
        
        // Last i elements are already in place
        for j in 0..<n-i-1 {
            // Traverse the array from 0 to n-i-1
            // Swap if the element found is greater than the next element
            if arr[j] > arr[j+1] {
                arr.swapAt(j, j+1) // Swift's built-in swap method
                swapped = true
            }
        }
        
        // If no two elements were swapped, array is sorted
        if !swapped {
            break
        }
    }
    
    return arr
}

// Alternative version that doesn't modify the original array
func bubbleSortCopy(_ arr: [Int]) -> [Int] {
    var sortedArray = arr
    return bubbleSort(&sortedArray)
}

// Example usage
var numbers = [64, 34, 25, 12, 22, 11, 90]
print("Original array: \\(numbers)")

let sortedNumbers = bubbleSortCopy(numbers)
print("Sorted array: \\(sortedNumbers)")
// Output: [11, 12, 22, 25, 34, 64, 90]`,

  go: `/**
 * Bubble Sort Implementation in Go
 * Time Complexity: O(n²) average/worst case, O(n) best case
 * Space Complexity: O(1)
 */

package main

import "fmt"

// bubbleSort sorts a slice using the bubble sort algorithm.
// It returns a new sorted slice without modifying the original.
func bubbleSort(arr []int) []int {
    // Create a copy to avoid modifying the original slice
    result := make([]int, len(arr))
    copy(result, arr)
    
    n := len(result)
    
    // Traverse through all array elements
    for i := 0; i < n-1; i++ {
        swapped := false
        
        // Last i elements are already in place
        for j := 0; j < n-i-1; j++ {
            // Traverse the array from 0 to n-i-1
            // Swap if the element found is greater than the next element
            if result[j] > result[j+1] {
                result[j], result[j+1] = result[j+1], result[j] // Go parallel assignment swap
                swapped = true
            }
        }
        
        // If no two elements were swapped, array is sorted
        if !swapped {
            break
        }
    }
    
    return result
}

// bubbleSortInPlace sorts a slice in place using the bubble sort algorithm.
func bubbleSortInPlace(arr []int) {
    n := len(arr)
    
    for i := 0; i < n-1; i++ {
        swapped := false
        
        for j := 0; j < n-i-1; j++ {
            if arr[j] > arr[j+1] {
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = true
            }
        }
        
        if !swapped {
            break
        }
    }
}

// Example usage
func main() {
    numbers := []int{64, 34, 25, 12, 22, 11, 90}
    fmt.Printf("Original array: %v\\n", numbers)
    
    sortedNumbers := bubbleSort(numbers)
    fmt.Printf("Sorted array: %v\\n", sortedNumbers)
    // Output: [11 12 22 25 34 64 90]
}`
} 