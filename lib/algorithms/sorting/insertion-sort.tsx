import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const insertionSortExplanationContent = (
  <AlgorithmExplanation>
    <h2>Insertion Sort</h2>
    <p>
      Insertion Sort is a simple sorting algorithm that builds the final sorted array (or list) one item at a time. It
      is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort,
      but it can be quite efficient for small lists or mostly sorted lists.
    </p>
    <h3>How it Works:</h3>
    <ol>
      <li>Start with the second element (index 1) as the key. The first element (index 0) is considered sorted.</li>
      <li>
        Compare the key with its predecessor. If the key is smaller than its predecessor, compare it to the elements
        before.
      </li>
      <li>
        Move the greater elements one position up to make space for the key. This process continues until an element
        smaller than or equal to the key is found, or the beginning of the list is reached.
      </li>
      <li>Insert the key into its correct position.</li>
      <li>Repeat for each element in the unsorted part of the array.</li>
    </ol>
    <h3>Time Complexity:</h3>
    <ul>
      <li>
        <strong>Worst-case:</strong> $$O(n^2)$$ comparisons and swaps (when the array is in reverse order).
      </li>
      <li>
        <strong>Average-case:</strong> $$O(n^2)$$ comparisons and swaps.
      </li>
      <li>
        <strong>Best-case:</strong> $$O(n)$$ comparisons, $$O(1)$$ swaps (when the array is already sorted).
      </li>
    </ul>
    <h3>Space Complexity:</h3>
    <p>$$O(1)$$ (in-place sorting algorithm).</p>
  </AlgorithmExplanation>
)

export const insertionSortCodeSnippets = {
  python: `# Insertion Sort Implementation in Python
# Time Complexity: O(n²) worst case, O(n) best case
# Space Complexity: O(1)

def insertion_sort(arr):
    """
    Sorts an array using the insertion sort algorithm.
    
    Args:
        arr: List of comparable elements
    
    Returns:
        Sorted list
    """
    # Traverse from the second element to the end
    for i in range(1, len(arr)):
        key = arr[i]  # Current element to be positioned
        j = i - 1     # Index of the last element in sorted portion
        
        # Move elements of arr[0..i-1] that are greater than key
        # one position ahead of their current position
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        # Place key at after the element just smaller than it
        arr[j + 1] = key
    
    return arr

# Example usage:
# numbers = [64, 34, 25, 12, 22, 11, 90]
# sorted_numbers = insertion_sort(numbers.copy())
# print(sorted_numbers)  # Output: [11, 12, 22, 25, 34, 64, 90]`,

  javascript: `/**
 * Insertion Sort Implementation in JavaScript
 * Time Complexity: O(n²) worst case, O(n) best case
 * Space Complexity: O(1)
 */

/**
 * Sorts an array using the insertion sort algorithm.
 * @param {number[]} arr - Array of numbers to sort
 * @returns {number[]} Sorted array
 */
function insertionSort(arr) {
    // Traverse from the second element to the end
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];  // Current element to be positioned
        let j = i - 1;       // Index of the last element in sorted portion
        
        // Move elements of arr[0..i-1] that are greater than key
        // one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Place key at after the element just smaller than it
        arr[j + 1] = key;
    }
    
    return arr;
}

// Example usage:
// const numbers = [64, 34, 25, 12, 22, 11, 90];
// const sortedNumbers = insertionSort([...numbers]); // Create copy to avoid mutation
// console.log(sortedNumbers); // Output: [11, 12, 22, 25, 34, 64, 90]

module.exports = insertionSort;`,

  java: `/**
 * Insertion Sort Implementation in Java
 * Time Complexity: O(n²) worst case, O(n) best case
 * Space Complexity: O(1)
 */

import java.util.Arrays;

public class InsertionSort {
    
    /**
     * Sorts an array using the insertion sort algorithm.
     * @param arr Array of integers to sort
     * @return Sorted array
     */
    public static int[] insertionSort(int[] arr) {
        // Traverse from the second element to the end
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];  // Current element to be positioned
            int j = i - 1;     // Index of the last element in sorted portion
            
            // Move elements of arr[0..i-1] that are greater than key
            // one position ahead of their current position
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            
            // Place key at after the element just smaller than it
            arr[j + 1] = key;
        }
        
        return arr;
    }
    
    // Example usage
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original array: " + Arrays.toString(numbers));
        
        int[] sortedNumbers = insertionSort(numbers.clone());
        System.out.println("Sorted array: " + Arrays.toString(sortedNumbers));
        // Output: [11, 12, 22, 25, 34, 64, 90]
    }
}`,

  cpp: `/**
 * Insertion Sort Implementation in C++
 * Time Complexity: O(n²) worst case, O(n) best case
 * Space Complexity: O(1)
 */

#include <iostream>
#include <vector>

/**
 * Sorts a vector using the insertion sort algorithm.
 * @param arr Vector of integers to sort
 * @return Sorted vector
 */
std::vector<int> insertionSort(std::vector<int> arr) {
    // Traverse from the second element to the end
    for (int i = 1; i < arr.size(); i++) {
        int key = arr[i];  // Current element to be positioned
        int j = i - 1;     // Index of the last element in sorted portion
        
        // Move elements of arr[0..i-1] that are greater than key
        // one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Place key at after the element just smaller than it
        arr[j + 1] = key;
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
    
    std::vector<int> sortedNumbers = insertionSort(numbers);
    std::cout << "Sorted array: ";
    for (int num : sortedNumbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    // Output: 11 12 22 25 34 64 90
    
    return 0;
}`,

  csharp: `/**
 * Insertion Sort Implementation in C#
 * Time Complexity: O(n²) worst case, O(n) best case
 * Space Complexity: O(1)
 */

using System;

public class InsertionSort 
{
    /// <summary>
    /// Sorts an array using the insertion sort algorithm.
    /// </summary>
    /// <param name="arr">Array of integers to sort</param>
    /// <returns>Sorted array</returns>
    public static int[] Sort(int[] arr) 
    {
        // Traverse from the second element to the end
        for (int i = 1; i < arr.Length; i++) 
        {
            int key = arr[i];  // Current element to be positioned
            int j = i - 1;     // Index of the last element in sorted portion
            
            // Move elements of arr[0..i-1] that are greater than key
            // one position ahead of their current position
            while (j >= 0 && arr[j] > key) 
            {
                arr[j + 1] = arr[j];
                j--;
            }
            
            // Place key at after the element just smaller than it
            arr[j + 1] = key;
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
 * Insertion Sort Implementation in PHP
 * Time Complexity: O(n²) worst case, O(n) best case
 * Space Complexity: O(1)
 */

/**
 * Sorts an array using the insertion sort algorithm.
 * @param array $arr Array of numbers to sort
 * @return array Sorted array
 */
function insertionSort($arr) {
    $n = count($arr);
    
    // Traverse from the second element to the end
    for ($i = 1; $i < $n; $i++) {
        $key = $arr[$i];  // Current element to be positioned
        $j = $i - 1;      // Index of the last element in sorted portion
        
        // Move elements of arr[0..i-1] that are greater than key
        // one position ahead of their current position
        while ($j >= 0 && $arr[$j] > $key) {
            $arr[$j + 1] = $arr[$j];
            $j--;
        }
        
        // Place key at after the element just smaller than it
        $arr[$j + 1] = $key;
    }
    
    return $arr;
}

// Example usage
$numbers = [64, 34, 25, 12, 22, 11, 90];
echo "Original array: [" . implode(", ", $numbers) . "]\\n";

$sortedNumbers = insertionSort($numbers);
echo "Sorted array: [" . implode(", ", $sortedNumbers) . "]\\n";
// Output: [11, 12, 22, 25, 34, 64, 90]
?>`,

  ruby: `# Insertion Sort Implementation in Ruby
# Time Complexity: O(n²) worst case, O(n) best case
# Space Complexity: O(1)

# Sorts an array using the insertion sort algorithm.
# @param arr [Array] Array of comparable elements
# @return [Array] Sorted array
def insertion_sort(arr)
  # Traverse from the second element to the end
  (1...arr.length).each do |i|
    key = arr[i]  # Current element to be positioned
    j = i - 1     # Index of the last element in sorted portion
    
    # Move elements of arr[0..i-1] that are greater than key
    # one position ahead of their current position
    while j >= 0 && arr[j] > key
      arr[j + 1] = arr[j]
      j -= 1
    end
    
    # Place key at after the element just smaller than it
    arr[j + 1] = key
  end
  
  arr
end

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
puts "Original array: #{numbers}"

sorted_numbers = insertion_sort(numbers.dup) # Create copy to avoid mutation
puts "Sorted array: #{sorted_numbers}"
# Output: [11, 12, 22, 25, 34, 64, 90]`,

  swift: `/**
 * Insertion Sort Implementation in Swift
 * Time Complexity: O(n²) worst case, O(n) best case
 * Space Complexity: O(1)
 */

import Foundation

/**
 * Sorts an array using the insertion sort algorithm.
 * - Parameter arr: Array of integers to sort (passed as inout for in-place sorting)
 * - Returns: Sorted array
 */
func insertionSort(_ arr: inout [Int]) -> [Int] {
    // Traverse from the second element to the end
    for i in 1..<arr.count {
        let key = arr[i]  // Current element to be positioned
        var j = i - 1     // Index of the last element in sorted portion
        
        // Move elements of arr[0..i-1] that are greater than key
        // one position ahead of their current position
        while j >= 0 && arr[j] > key {
            arr[j + 1] = arr[j]
            j -= 1
        }
        
        // Place key at after the element just smaller than it
        arr[j + 1] = key
    }
    
    return arr
}

// Alternative version that doesn't modify the original array
func insertionSortCopy(_ arr: [Int]) -> [Int] {
    var sortedArray = arr
    return insertionSort(&sortedArray)
}

// Example usage
var numbers = [64, 34, 25, 12, 22, 11, 90]
print("Original array: \\(numbers)")

let sortedNumbers = insertionSortCopy(numbers)
print("Sorted array: \\(sortedNumbers)")
// Output: [11, 12, 22, 25, 34, 64, 90]`,

  go: `/**
 * Insertion Sort Implementation in Go
 * Time Complexity: O(n²) worst case, O(n) best case
 * Space Complexity: O(1)
 */

package main

import "fmt"

// insertionSort sorts a slice using the insertion sort algorithm.
// It returns a new sorted slice without modifying the original.
func insertionSort(arr []int) []int {
    // Create a copy to avoid modifying the original slice
    result := make([]int, len(arr))
    copy(result, arr)
    
    // Traverse from the second element to the end
    for i := 1; i < len(result); i++ {
        key := result[i]  // Current element to be positioned
        j := i - 1        // Index of the last element in sorted portion
        
        // Move elements of arr[0..i-1] that are greater than key
        // one position ahead of their current position
        for j >= 0 && result[j] > key {
            result[j + 1] = result[j]
            j--
        }
        
        // Place key at after the element just smaller than it
        result[j + 1] = key
    }
    
    return result
}

// insertionSortInPlace sorts a slice in place using the insertion sort algorithm.
func insertionSortInPlace(arr []int) {
    for i := 1; i < len(arr); i++ {
        key := arr[i]
        j := i - 1
        
        for j >= 0 && arr[j] > key {
            arr[j + 1] = arr[j]
            j--
        }
        
        arr[j + 1] = key
    }
}

// Example usage
func main() {
    numbers := []int{64, 34, 25, 12, 22, 11, 90}
    fmt.Printf("Original array: %v\\n", numbers)
    
    sortedNumbers := insertionSort(numbers)
    fmt.Printf("Sorted array: %v\\n", sortedNumbers)
    // Output: [11 12 22 25 34 64 90]
}`,
} 