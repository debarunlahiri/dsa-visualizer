import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const selectionSortExplanationContent = (
  <AlgorithmExplanation>
    <h2>Selection Sort</h2>
    <p>
      Selection Sort is an in-place comparison sorting algorithm. It divides the input list into two parts: a sorted
      sublist of items which is built up from left to right at the front (left) of the list and a sublist of the
      remaining unsorted items that occupy the rest of the list.
    </p>
    <h3>How it Works:</h3>
    <ol>
      <li>Find the minimum element in the unsorted part of the array.</li>
      <li>Swap this minimum element with the first element of the unsorted part.</li>
      <li>
        Move the boundary between the sorted and unsorted parts one element to the right. The element just swapped is
        now considered part of the sorted sublist.
      </li>
      <li>Repeat steps 1-3 until the entire array is sorted.</li>
    </ol>
    <h3>Time Complexity:</h3>
    <ul>
      <li>
        <strong>Worst-case:</strong> $$O(n^2)$$ comparisons, $$O(n)$$ swaps.
      </li>
      <li>
        <strong>Average-case:</strong> $$O(n^2)$$ comparisons, $$O(n)$$ swaps.
      </li>
      <li>
        <strong>Best-case:</strong> $$O(n^2)$$ comparisons, $$O(n)$$ swaps.
      </li>
    </ul>
    <h3>Space Complexity:</h3>
    <p>$$O(1)$$ (in-place sorting algorithm).</p>
  </AlgorithmExplanation>
)

export const selectionSortCodeSnippets = {
  python: `# Selection Sort Implementation in Python
# Time Complexity: O(n²) in all cases
# Space Complexity: O(1)

def selection_sort(arr):
    """
    Sorts an array using the selection sort algorithm.
    
    Args:
        arr: List of comparable elements
    
    Returns:
        Sorted list
    """
    n = len(arr)
    
    # Traverse through all array elements
    for i in range(n):
        # Find the minimum element in remaining unsorted array
        min_index = i
        
        for j in range(i + 1, n):
            # If we find a smaller element, update min_index
            if arr[j] < arr[min_index]:
                min_index = j
        
        # Swap the found minimum element with the first element
        arr[i], arr[min_index] = arr[min_index], arr[i]
    
    return arr

# Example usage:
# numbers = [64, 25, 12, 22, 11]
# sorted_numbers = selection_sort(numbers.copy())
# print(sorted_numbers)  # Output: [11, 12, 22, 25, 64]`,

  javascript: `/**
 * Selection Sort Implementation in JavaScript
 * Time Complexity: O(n²) in all cases
 * Space Complexity: O(1)
 */

/**
 * Sorts an array using the selection sort algorithm.
 * @param {number[]} arr - Array of numbers to sort
 * @returns {number[]} Sorted array
 */
function selectionSort(arr) {
    const n = arr.length;
    
    // Traverse through all array elements
    for (let i = 0; i < n; i++) {
        // Find the minimum element in remaining unsorted array
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            // If we find a smaller element, update minIndex
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap the found minimum element with the first element
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    
    return arr;
}

// Example usage:
// const numbers = [64, 25, 12, 22, 11];
// const sortedNumbers = selectionSort([...numbers]); // Create copy to avoid mutation
// console.log(sortedNumbers); // Output: [11, 12, 22, 25, 64]

module.exports = selectionSort;`,

  java: `/**
 * Selection Sort Implementation in Java
 * Time Complexity: O(n²) in all cases
 * Space Complexity: O(1)
 */

import java.util.Arrays;

public class SelectionSort {
    
    /**
     * Sorts an array using the selection sort algorithm.
     * @param arr Array of integers to sort
     * @return Sorted array
     */
    public static int[] selectionSort(int[] arr) {
        int n = arr.length;
        
        // Traverse through all array elements
        for (int i = 0; i < n; i++) {
            // Find the minimum element in remaining unsorted array
            int minIndex = i;
            
            for (int j = i + 1; j < n; j++) {
                // If we find a smaller element, update minIndex
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            
            // Swap the found minimum element with the first element
            if (minIndex != i) {
                int temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            }
        }
        
        return arr;
    }
    
    // Example usage
    public static void main(String[] args) {
        int[] numbers = {64, 25, 12, 22, 11};
        System.out.println("Original array: " + Arrays.toString(numbers));
        
        int[] sortedNumbers = selectionSort(numbers.clone());
        System.out.println("Sorted array: " + Arrays.toString(sortedNumbers));
        // Output: [11, 12, 22, 25, 64]
    }
}`,

  cpp: `/**
 * Selection Sort Implementation in C++
 * Time Complexity: O(n²) in all cases
 * Space Complexity: O(1)
 */

#include <iostream>
#include <vector>
#include <algorithm>

/**
 * Sorts a vector using the selection sort algorithm.
 * @param arr Vector of integers to sort
 * @return Sorted vector
 */
std::vector<int> selectionSort(std::vector<int> arr) {
    int n = arr.size();
    
    // Traverse through all array elements
    for (int i = 0; i < n; i++) {
        // Find the minimum element in remaining unsorted array
        int minIndex = i;
        
        for (int j = i + 1; j < n; j++) {
            // If we find a smaller element, update minIndex
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap the found minimum element with the first element
        if (minIndex != i) {
            std::swap(arr[i], arr[minIndex]);
        }
    }
    
    return arr;
}

// Example usage
int main() {
    std::vector<int> numbers = {64, 25, 12, 22, 11};
    std::cout << "Original array: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    std::vector<int> sortedNumbers = selectionSort(numbers);
    std::cout << "Sorted array: ";
    for (int num : sortedNumbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    // Output: 11 12 22 25 64
    
    return 0;
}`,

  csharp: `/**
 * Selection Sort Implementation in C#
 * Time Complexity: O(n²) in all cases
 * Space Complexity: O(1)
 */

using System;

public class SelectionSort 
{
    /// <summary>
    /// Sorts an array using the selection sort algorithm.
    /// </summary>
    /// <param name="arr">Array of integers to sort</param>
    /// <returns>Sorted array</returns>
    public static int[] Sort(int[] arr) 
    {
        int n = arr.Length;
        
        // Traverse through all array elements
        for (int i = 0; i < n; i++) 
        {
            // Find the minimum element in remaining unsorted array
            int minIndex = i;
            
            for (int j = i + 1; j < n; j++) 
            {
                // If we find a smaller element, update minIndex
                if (arr[j] < arr[minIndex]) 
                {
                    minIndex = j;
                }
            }
            
            // Swap the found minimum element with the first element
            if (minIndex != i) 
            {
                int temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            }
        }
        
        return arr;
    }
    
    // Example usage
    public static void Main(string[] args) 
    {
        int[] numbers = {64, 25, 12, 22, 11};
        Console.WriteLine("Original array: [" + string.Join(", ", numbers) + "]");
        
        int[] sortedNumbers = Sort((int[])numbers.Clone());
        Console.WriteLine("Sorted array: [" + string.Join(", ", sortedNumbers) + "]");
        // Output: [11, 12, 22, 25, 64]
    }
}`,

  php: `<?php
/**
 * Selection Sort Implementation in PHP
 * Time Complexity: O(n²) in all cases
 * Space Complexity: O(1)
 */

/**
 * Sorts an array using the selection sort algorithm.
 * @param array $arr Array of numbers to sort
 * @return array Sorted array
 */
function selectionSort($arr) {
    $n = count($arr);
    
    // Traverse through all array elements
    for ($i = 0; $i < $n; $i++) {
        // Find the minimum element in remaining unsorted array
        $minIndex = $i;
        
        for ($j = $i + 1; $j < $n; $j++) {
            // If we find a smaller element, update minIndex
            if ($arr[$j] < $arr[$minIndex]) {
                $minIndex = $j;
            }
        }
        
        // Swap the found minimum element with the first element
        if ($minIndex != $i) {
            $temp = $arr[$i];
            $arr[$i] = $arr[$minIndex];
            $arr[$minIndex] = $temp;
        }
    }
    
    return $arr;
}

// Example usage
$numbers = [64, 25, 12, 22, 11];
echo "Original array: [" . implode(", ", $numbers) . "]\\n";

$sortedNumbers = selectionSort($numbers);
echo "Sorted array: [" . implode(", ", $sortedNumbers) . "]\\n";
// Output: [11, 12, 22, 25, 64]
?>`,

  ruby: `# Selection Sort Implementation in Ruby
# Time Complexity: O(n²) in all cases
# Space Complexity: O(1)

# Sorts an array using the selection sort algorithm.
# @param arr [Array] Array of comparable elements
# @return [Array] Sorted array
def selection_sort(arr)
  n = arr.length
  
  # Traverse through all array elements
  (0...n).each do |i|
    # Find the minimum element in remaining unsorted array
    min_index = i
    
    (i + 1...n).each do |j|
      # If we find a smaller element, update min_index
      if arr[j] < arr[min_index]
        min_index = j
      end
    end
    
    # Swap the found minimum element with the first element
    if min_index != i
      arr[i], arr[min_index] = arr[min_index], arr[i]
    end
  end
  
  arr
end

# Example usage
numbers = [64, 25, 12, 22, 11]
puts "Original array: #{numbers}"

sorted_numbers = selection_sort(numbers.dup) # Create copy to avoid mutation
puts "Sorted array: #{sorted_numbers}"
# Output: [11, 12, 22, 25, 64]`,

  swift: `/**
 * Selection Sort Implementation in Swift
 * Time Complexity: O(n²) in all cases
 * Space Complexity: O(1)
 */

import Foundation

/**
 * Sorts an array using the selection sort algorithm.
 * - Parameter arr: Array of integers to sort (passed as inout for in-place sorting)
 * - Returns: Sorted array
 */
func selectionSort(_ arr: inout [Int]) -> [Int] {
    let n = arr.count
    
    // Traverse through all array elements
    for i in 0..<n {
        // Find the minimum element in remaining unsorted array
        var minIndex = i
        
        for j in (i + 1)..<n {
            // If we find a smaller element, update minIndex
            if arr[j] < arr[minIndex] {
                minIndex = j
            }
        }
        
        // Swap the found minimum element with the first element
        if minIndex != i {
            arr.swapAt(i, minIndex)
        }
    }
    
    return arr
}

// Alternative version that doesn't modify the original array
func selectionSortCopy(_ arr: [Int]) -> [Int] {
    var sortedArray = arr
    return selectionSort(&sortedArray)
}

// Example usage
var numbers = [64, 25, 12, 22, 11]
print("Original array: \\(numbers)")

let sortedNumbers = selectionSortCopy(numbers)
print("Sorted array: \\(sortedNumbers)")
// Output: [11, 12, 22, 25, 64]`,

  go: `/**
 * Selection Sort Implementation in Go
 * Time Complexity: O(n²) in all cases
 * Space Complexity: O(1)
 */

package main

import "fmt"

// selectionSort sorts a slice using the selection sort algorithm.
// It returns a new sorted slice without modifying the original.
func selectionSort(arr []int) []int {
    // Create a copy to avoid modifying the original slice
    result := make([]int, len(arr))
    copy(result, arr)
    
    n := len(result)
    
    // Traverse through all array elements
    for i := 0; i < n; i++ {
        // Find the minimum element in remaining unsorted array
        minIndex := i
        
        for j := i + 1; j < n; j++ {
            // If we find a smaller element, update minIndex
            if result[j] < result[minIndex] {
                minIndex = j
            }
        }
        
        // Swap the found minimum element with the first element
        if minIndex != i {
            result[i], result[minIndex] = result[minIndex], result[i]
        }
    }
    
    return result
}

// selectionSortInPlace sorts a slice in place using the selection sort algorithm.
func selectionSortInPlace(arr []int) {
    n := len(arr)
    
    for i := 0; i < n; i++ {
        minIndex := i
        
        for j := i + 1; j < n; j++ {
            if arr[j] < arr[minIndex] {
                minIndex = j
            }
        }
        
        if minIndex != i {
            arr[i], arr[minIndex] = arr[minIndex], arr[i]
        }
    }
}

// Example usage
func main() {
    numbers := []int{64, 25, 12, 22, 11}
    fmt.Printf("Original array: %v\\n", numbers)
    
    sortedNumbers := selectionSort(numbers)
    fmt.Printf("Sorted array: %v\\n", sortedNumbers)
    // Output: [11 12 22 25 64]
}`
} 