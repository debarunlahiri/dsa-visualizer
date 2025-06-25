import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const linearSearchExplanationContent = (
  <AlgorithmExplanation>
    <h2>Linear Search</h2>
    <p>
      Linear Search, also known as sequential search, is a simple method for finding an element within a list. It
      sequentially checks each element of the list until a match is found or the whole list has been searched.
    </p>
    <h3>How it Works:</h3>
    <ol>
      <li>
        Start from the leftmost element of the list and one by one compare the target element with each element of the
        list.
      </li>
      <li>If the target element matches with an element, return the index of that element.</li>
      <li>
        If the target element doesn't match with any of the elements and the end of the list is reached, return -1 (or
        an indicator that the element was not found).
      </li>
    </ol>
    <h3>Time Complexity:</h3>
    <ul>
      <li>
        <strong>Worst-case:</strong> $$O(n)$$ (target is at the end or not present).
      </li>
      <li>
        <strong>Average-case:</strong> $$O(n)$$
      </li>
      <li>
        <strong>Best-case:</strong> $$O(1)$$ (target is the first element).
      </li>
    </ul>
    <h3>Space Complexity:</h3>
    <p>$$O(1)$$ (as it only requires a few variables for the loop and comparison).</p>
    <p>Linear search can be used on unsorted lists. For sorted lists, Binary Search is generally more efficient.</p>
  </AlgorithmExplanation>
)

export const linearSearchCodeSnippets = {
  python: `# Linear Search Implementation in Python
# Time Complexity: O(n) in worst case, O(1) in best case
# Space Complexity: O(1)

def linear_search(arr, target):
    """
    Searches for a target value in an array using linear search.
    
    Args:
        arr: List of elements to search in
        target: Value to search for
    
    Returns:
        Index of target if found, -1 otherwise
    """
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

def linear_search_all_occurrences(arr, target):
    """
    Finds all occurrences of a target value in an array.
    
    Args:
        arr: List of elements to search in
        target: Value to search for
    
    Returns:
        List of indices where target is found
    """
    indices = []
    for i in range(len(arr)):
        if arr[i] == target:
            indices.append(i)
    return indices

def linear_search_with_condition(arr, condition_func):
    """
    Searches for the first element that satisfies a condition.
    
    Args:
        arr: List of elements to search in
        condition_func: Function that returns True for target element
    
    Returns:
        Index of first element satisfying condition, -1 if not found
    """
    for i in range(len(arr)):
        if condition_func(arr[i]):
            return i
    return -1

# Example usage:
# numbers = [64, 34, 25, 12, 22, 11, 90]
# index = linear_search(numbers, 22)
# print(f"Element 22 found at index: {index}")  # Output: Element 22 found at index: 4
# 
# # Search with condition (find first even number)
# even_index = linear_search_with_condition(numbers, lambda x: x % 2 == 0)
# print(f"First even number at index: {even_index}")  # Output: First even number at index: 0`,

  javascript: `/**
 * Linear Search Implementation in JavaScript
 * Time Complexity: O(n) in worst case, O(1) in best case
 * Space Complexity: O(1)
 */

/**
 * Searches for a target value in an array using linear search.
 * @param {any[]} arr - Array of elements to search in
 * @param {any} target - Value to search for
 * @returns {number} Index of target if found, -1 otherwise
 */
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

/**
 * Finds all occurrences of a target value in an array.
 * @param {any[]} arr - Array of elements to search in
 * @param {any} target - Value to search for
 * @returns {number[]} Array of indices where target is found
 */
function linearSearchAllOccurrences(arr, target) {
    const indices = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            indices.push(i);
        }
    }
    return indices;
}

/**
 * Searches for the first element that satisfies a condition.
 * @param {any[]} arr - Array of elements to search in
 * @param {Function} conditionFunc - Function that returns true for target element
 * @returns {number} Index of first element satisfying condition, -1 if not found
 */
function linearSearchWithCondition(arr, conditionFunc) {
    for (let i = 0; i < arr.length; i++) {
        if (conditionFunc(arr[i])) {
            return i;
        }
    }
    return -1;
}

/**
 * Searches from the end of the array (reverse linear search).
 * @param {any[]} arr - Array of elements to search in
 * @param {any} target - Value to search for
 * @returns {number} Index of target if found, -1 otherwise
 */
function linearSearchReverse(arr, target) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

// Example usage:
// const numbers = [64, 34, 25, 12, 22, 11, 90];
// const index = linearSearch(numbers, 22);
// console.log(\`Element 22 found at index: \${index}\`); // Output: Element 22 found at index: 4
//
// // Search with condition (find first even number)
// const evenIndex = linearSearchWithCondition(numbers, x => x % 2 === 0);
// console.log(\`First even number at index: \${evenIndex}\`); // Output: First even number at index: 0

module.exports = { 
    linearSearch, 
    linearSearchAllOccurrences, 
    linearSearchWithCondition, 
    linearSearchReverse 
};`,

  java: `/**
 * Linear Search Implementation in Java
 * Time Complexity: O(n) in worst case, O(1) in best case
 * Space Complexity: O(1)
 */

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

public class LinearSearch {
    
    /**
     * Searches for a target value in an array using linear search.
     * @param arr Array of integers to search in
     * @param target Value to search for
     * @return Index of target if found, -1 otherwise
     */
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }
    
    /**
     * Finds all occurrences of a target value in an array.
     * @param arr Array of integers to search in
     * @param target Value to search for
     * @return List of indices where target is found
     */
    public static List<Integer> linearSearchAllOccurrences(int[] arr, int target) {
        List<Integer> indices = new ArrayList<>();
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                indices.add(i);
            }
        }
        return indices;
    }
    
    /**
     * Searches for the first element that satisfies a condition.
     * @param arr Array of integers to search in
     * @param condition Predicate function for the condition
     * @return Index of first element satisfying condition, -1 if not found
     */
    public static int linearSearchWithCondition(int[] arr, Predicate<Integer> condition) {
        for (int i = 0; i < arr.length; i++) {
            if (condition.test(arr[i])) {
                return i;
            }
        }
        return -1;
    }
    
    /**
     * Searches from the end of the array (reverse linear search).
     * @param arr Array of integers to search in
     * @param target Value to search for
     * @return Index of target if found, -1 otherwise
     */
    public static int linearSearchReverse(int[] arr, int target) {
        for (int i = arr.length - 1; i >= 0; i--) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }
    
    /**
     * Generic linear search for any comparable type.
     * @param <T> Type that extends Comparable
     * @param arr Array of elements to search in
     * @param target Value to search for
     * @return Index of target if found, -1 otherwise
     */
    public static <T extends Comparable<T>> int linearSearchGeneric(T[] arr, T target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i].compareTo(target) == 0) {
                return i;
            }
        }
        return -1;
    }
    
    // Example usage
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        int index = linearSearch(numbers, 22);
        System.out.println("Element 22 found at index: " + index); // Output: 4
        
        // Search with condition (find first even number)
        int evenIndex = linearSearchWithCondition(numbers, x -> x % 2 == 0);
        System.out.println("First even number at index: " + evenIndex); // Output: 0
        
        // Find all occurrences
        List<Integer> allIndices = linearSearchAllOccurrences(numbers, 22);
        System.out.println("All occurrences of 22: " + allIndices);
    }
}`,

  cpp: `/**
 * Linear Search Implementation in C++
 * Time Complexity: O(n) in worst case, O(1) in best case
 * Space Complexity: O(1)
 */

#include <iostream>
#include <vector>
#include <functional>
#include <algorithm>

/**
 * Searches for a target value in a vector using linear search.
 * @param arr Vector of integers to search in
 * @param target Value to search for
 * @return Index of target if found, -1 otherwise
 */
int linearSearch(const std::vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}

/**
 * Finds all occurrences of a target value in a vector.
 * @param arr Vector of integers to search in
 * @param target Value to search for
 * @return Vector of indices where target is found
 */
std::vector<int> linearSearchAllOccurrences(const std::vector<int>& arr, int target) {
    std::vector<int> indices;
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            indices.push_back(i);
        }
    }
    return indices;
}

/**
 * Searches for the first element that satisfies a condition.
 * @param arr Vector of integers to search in
 * @param condition Function that returns true for target element
 * @return Index of first element satisfying condition, -1 if not found
 */
int linearSearchWithCondition(const std::vector<int>& arr, std::function<bool(int)> condition) {
    for (int i = 0; i < arr.size(); i++) {
        if (condition(arr[i])) {
            return i;
        }
    }
    return -1;
}

/**
 * Searches from the end of the vector (reverse linear search).
 * @param arr Vector of integers to search in
 * @param target Value to search for
 * @return Index of target if found, -1 otherwise
 */
int linearSearchReverse(const std::vector<int>& arr, int target) {
    for (int i = arr.size() - 1; i >= 0; i--) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}

/**
 * Template function for linear search with any comparable type.
 * @param arr Vector of elements to search in
 * @param target Value to search for
 * @return Index of target if found, -1 otherwise
 */
template<typename T>
int linearSearchGeneric(const std::vector<T>& arr, const T& target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}

// Example usage
int main() {
    std::vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    
    int index = linearSearch(numbers, 22);
    std::cout << "Element 22 found at index: " << index << std::endl; // Output: 4
    
    // Search with condition (find first even number)
    int evenIndex = linearSearchWithCondition(numbers, [](int x) { return x % 2 == 0; });
    std::cout << "First even number at index: " << evenIndex << std::endl; // Output: 0
    
    // Find all occurrences
    std::vector<int> allIndices = linearSearchAllOccurrences(numbers, 22);
    std::cout << "All occurrences of 22: ";
    for (int idx : allIndices) {
        std::cout << idx << " ";
    }
    std::cout << std::endl;
    
    return 0;
}`,

  csharp: `/**
 * Linear Search Implementation in C#
 * Time Complexity: O(n) in worst case, O(1) in best case
 * Space Complexity: O(1)
 */

using System;
using System.Collections.Generic;
using System.Linq;

public class LinearSearch 
{
    /// <summary>
    /// Searches for a target value in an array using linear search.
    /// </summary>
    /// <param name="arr">Array of integers to search in</param>
    /// <param name="target">Value to search for</param>
    /// <returns>Index of target if found, -1 otherwise</returns>
    public static int Search(int[] arr, int target) 
    {
        for (int i = 0; i < arr.Length; i++) 
        {
            if (arr[i] == target) 
            {
                return i;
            }
        }
        return -1;
    }
    
    /// <summary>
    /// Finds all occurrences of a target value in an array.
    /// </summary>
    /// <param name="arr">Array of integers to search in</param>
    /// <param name="target">Value to search for</param>
    /// <returns>List of indices where target is found</returns>
    public static List<int> SearchAllOccurrences(int[] arr, int target) 
    {
        List<int> indices = new List<int>();
        for (int i = 0; i < arr.Length; i++) 
        {
            if (arr[i] == target) 
            {
                indices.Add(i);
            }
        }
        return indices;
    }
    
    /// <summary>
    /// Searches for the first element that satisfies a condition.
    /// </summary>
    /// <param name="arr">Array of integers to search in</param>
    /// <param name="condition">Function that returns true for target element</param>
    /// <returns>Index of first element satisfying condition, -1 if not found</returns>
    public static int SearchWithCondition(int[] arr, Func<int, bool> condition) 
    {
        for (int i = 0; i < arr.Length; i++) 
        {
            if (condition(arr[i])) 
            {
                return i;
            }
        }
        return -1;
    }
    
    /// <summary>
    /// Searches from the end of the array (reverse linear search).
    /// </summary>
    /// <param name="arr">Array of integers to search in</param>
    /// <param name="target">Value to search for</param>
    /// <returns>Index of target if found, -1 otherwise</returns>
    public static int SearchReverse(int[] arr, int target) 
    {
        for (int i = arr.Length - 1; i >= 0; i--) 
        {
            if (arr[i] == target) 
            {
                return i;
            }
        }
        return -1;
    }
    
    /// <summary>
    /// Generic linear search for any comparable type.
    /// </summary>
    /// <typeparam name="T">Type that implements IComparable</typeparam>
    /// <param name="arr">Array of elements to search in</param>
    /// <param name="target">Value to search for</param>
    /// <returns>Index of target if found, -1 otherwise</returns>
    public static int SearchGeneric<T>(T[] arr, T target) where T : IComparable<T>
    {
        for (int i = 0; i < arr.Length; i++) 
        {
            if (arr[i].CompareTo(target) == 0) 
            {
                return i;
            }
        }
        return -1;
    }
    
    // Example usage
    public static void Main(string[] args) 
    {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        int index = Search(numbers, 22);
        Console.WriteLine($"Element 22 found at index: {index}"); // Output: 4
        
        // Search with condition (find first even number)
        int evenIndex = SearchWithCondition(numbers, x => x % 2 == 0);
        Console.WriteLine($"First even number at index: {evenIndex}"); // Output: 0
        
        // Find all occurrences
        List<int> allIndices = SearchAllOccurrences(numbers, 22);
        Console.WriteLine($"All occurrences of 22: [{string.Join(", ", allIndices)}]");
    }
}`,

  php: `<?php
/**
 * Linear Search Implementation in PHP
 * Time Complexity: O(n) in worst case, O(1) in best case
 * Space Complexity: O(1)
 */

/**
 * Searches for a target value in an array using linear search.
 * @param array $arr Array of elements to search in
 * @param mixed $target Value to search for
 * @return int Index of target if found, -1 otherwise
 */
function linearSearch($arr, $target) {
    for ($i = 0; $i < count($arr); $i++) {
        if ($arr[$i] === $target) {
            return $i;
        }
    }
    return -1;
}

/**
 * Finds all occurrences of a target value in an array.
 * @param array $arr Array of elements to search in
 * @param mixed $target Value to search for
 * @return array Array of indices where target is found
 */
function linearSearchAllOccurrences($arr, $target) {
    $indices = [];
    for ($i = 0; $i < count($arr); $i++) {
        if ($arr[$i] === $target) {
            $indices[] = $i;
        }
    }
    return $indices;
}

/**
 * Searches for the first element that satisfies a condition.
 * @param array $arr Array of elements to search in
 * @param callable $conditionFunc Function that returns true for target element
 * @return int Index of first element satisfying condition, -1 if not found
 */
function linearSearchWithCondition($arr, $conditionFunc) {
    for ($i = 0; $i < count($arr); $i++) {
        if ($conditionFunc($arr[$i])) {
            return $i;
        }
    }
    return -1;
}

/**
 * Searches from the end of the array (reverse linear search).
 * @param array $arr Array of elements to search in
 * @param mixed $target Value to search for
 * @return int Index of target if found, -1 otherwise
 */
function linearSearchReverse($arr, $target) {
    for ($i = count($arr) - 1; $i >= 0; $i--) {
        if ($arr[$i] === $target) {
            return $i;
        }
    }
    return -1;
}

/**
 * Searches using PHP's built-in array functions for comparison.
 * @param array $arr Array of elements to search in
 * @param mixed $target Value to search for
 * @return int Index of target if found, -1 otherwise
 */
function linearSearchBuiltIn($arr, $target) {
    $index = array_search($target, $arr, true); // strict comparison
    return $index !== false ? $index : -1;
}

// Example usage
$numbers = [64, 34, 25, 12, 22, 11, 90];

$index = linearSearch($numbers, 22);
echo "Element 22 found at index: $index\\n"; // Output: 4

// Search with condition (find first even number)
$evenIndex = linearSearchWithCondition($numbers, function($x) { return $x % 2 === 0; });
echo "First even number at index: $evenIndex\\n"; // Output: 0

// Find all occurrences
$allIndices = linearSearchAllOccurrences($numbers, 22);
echo "All occurrences of 22: [" . implode(", ", $allIndices) . "]\\n";
?>`,

  ruby: `# Linear Search Implementation in Ruby
# Time Complexity: O(n) in worst case, O(1) in best case
# Space Complexity: O(1)

# Searches for a target value in an array using linear search.
# @param arr [Array] Array of elements to search in
# @param target [Object] Value to search for
# @return [Integer] Index of target if found, -1 otherwise
def linear_search(arr, target)
  arr.each_with_index do |element, index|
    return index if element == target
  end
  -1
end

# Alternative implementation using simple loop
def linear_search_simple(arr, target)
  (0...arr.length).each do |i|
    return i if arr[i] == target
  end
  -1
end

# Finds all occurrences of a target value in an array.
# @param arr [Array] Array of elements to search in
# @param target [Object] Value to search for
# @return [Array] Array of indices where target is found
def linear_search_all_occurrences(arr, target)
  indices = []
  arr.each_with_index do |element, index|
    indices << index if element == target
  end
  indices
end

# Searches for the first element that satisfies a condition.
# @param arr [Array] Array of elements to search in
# @param condition [Proc] Block/proc that returns true for target element
# @return [Integer] Index of first element satisfying condition, -1 if not found
def linear_search_with_condition(arr, &condition)
  arr.each_with_index do |element, index|
    return index if condition.call(element)
  end
  -1
end

# Searches from the end of the array (reverse linear search).
# @param arr [Array] Array of elements to search in
# @param target [Object] Value to search for
# @return [Integer] Index of target if found, -1 otherwise
def linear_search_reverse(arr, target)
  (arr.length - 1).downto(0) do |i|
    return i if arr[i] == target
  end
  -1
end

# Ruby idiomatic way using built-in methods
def linear_search_ruby_way(arr, target)
  index = arr.index(target)
  index || -1
end

# Find element with condition using Ruby's find_index
def linear_search_find_index(arr, &condition)
  index = arr.find_index(&condition)
  index || -1
end

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]

index = linear_search(numbers, 22)
puts "Element 22 found at index: #{index}" # Output: 4

# Search with condition (find first even number)
even_index = linear_search_with_condition(numbers) { |x| x.even? }
puts "First even number at index: #{even_index}" # Output: 0

# Using Ruby's idiomatic way
ruby_index = linear_search_ruby_way(numbers, 22)
puts "Ruby way - Element 22 found at index: #{ruby_index}" # Output: 4

# Find all occurrences
all_indices = linear_search_all_occurrences(numbers, 22)
puts "All occurrences of 22: #{all_indices}"`,

  swift: `/**
 * Linear Search Implementation in Swift
 * Time Complexity: O(n) in worst case, O(1) in best case
 * Space Complexity: O(1)
 */

import Foundation

/**
 * Searches for a target value in an array using linear search.
 * - Parameter arr: Array of elements to search in
 * - Parameter target: Value to search for
 * - Returns: Index of target if found, nil otherwise
 */
func linearSearch<T: Equatable>(_ arr: [T], target: T) -> Int? {
    for (index, element) in arr.enumerated() {
        if element == target {
            return index
        }
    }
    return nil
}

/**
 * Alternative implementation returning -1 instead of nil.
 * - Parameter arr: Array of integers to search in
 * - Parameter target: Value to search for
 * - Returns: Index of target if found, -1 otherwise
 */
func linearSearchInt(_ arr: [Int], target: Int) -> Int {
    for i in 0..<arr.count {
        if arr[i] == target {
            return i
        }
    }
    return -1
}

/**
 * Finds all occurrences of a target value in an array.
 * - Parameter arr: Array of elements to search in
 * - Parameter target: Value to search for
 * - Returns: Array of indices where target is found
 */
func linearSearchAllOccurrences<T: Equatable>(_ arr: [T], target: T) -> [Int] {
    var indices: [Int] = []
    for (index, element) in arr.enumerated() {
        if element == target {
            indices.append(index)
        }
    }
    return indices
}

/**
 * Searches for the first element that satisfies a condition.
 * - Parameter arr: Array of elements to search in
 * - Parameter condition: Closure that returns true for target element
 * - Returns: Index of first element satisfying condition, nil if not found
 */
func linearSearchWithCondition<T>(_ arr: [T], condition: (T) -> Bool) -> Int? {
    for (index, element) in arr.enumerated() {
        if condition(element) {
            return index
        }
    }
    return nil
}

/**
 * Searches from the end of the array (reverse linear search).
 * - Parameter arr: Array of elements to search in
 * - Parameter target: Value to search for
 * - Returns: Index of target if found, nil otherwise
 */
func linearSearchReverse<T: Equatable>(_ arr: [T], target: T) -> Int? {
    for i in stride(from: arr.count - 1, through: 0, by: -1) {
        if arr[i] == target {
            return i
        }
    }
    return nil
}

/**
 * Swift idiomatic way using built-in methods.
 * - Parameter arr: Array of elements to search in
 * - Parameter target: Value to search for
 * - Returns: Index of target if found, nil otherwise
 */
func linearSearchSwiftWay<T: Equatable>(_ arr: [T], target: T) -> Int? {
    return arr.firstIndex(of: target)
}

/**
 * Find element with condition using Swift's built-in methods.
 * - Parameter arr: Array of elements to search in
 * - Parameter condition: Closure that returns true for target element
 * - Returns: Index of first element satisfying condition, nil if not found
 */
func linearSearchFirstIndex<T>(_ arr: [T], condition: (T) -> Bool) -> Int? {
    return arr.firstIndex(where: condition)
}

// Example usage
let numbers = [64, 34, 25, 12, 22, 11, 90]

if let index = linearSearch(numbers, target: 22) {
    print("Element 22 found at index: \\(index)") // Output: 4
} else {
    print("Element not found")
}

// Search with condition (find first even number)
if let evenIndex = linearSearchWithCondition(numbers, condition: { $0 % 2 == 0 }) {
    print("First even number at index: \\(evenIndex)") // Output: 0
}

// Using Swift's idiomatic way
if let swiftIndex = linearSearchSwiftWay(numbers, target: 22) {
    print("Swift way - Element 22 found at index: \\(swiftIndex)") // Output: 4
}

// Find all occurrences
let allIndices = linearSearchAllOccurrences(numbers, target: 22)
print("All occurrences of 22: \\(allIndices)")`,

  go: `/**
 * Linear Search Implementation in Go
 * Time Complexity: O(n) in worst case, O(1) in best case
 * Space Complexity: O(1)
 */

package main

import "fmt"

// linearSearch searches for a target value in a slice using linear search.
// Returns the index of target if found, -1 otherwise.
func linearSearch(arr []int, target int) int {
    for i, element := range arr {
        if element == target {
            return i
        }
    }
    return -1
}

// linearSearchAllOccurrences finds all occurrences of a target value in a slice.
// Returns a slice of indices where target is found.
func linearSearchAllOccurrences(arr []int, target int) []int {
    var indices []int
    for i, element := range arr {
        if element == target {
            indices = append(indices, i)
        }
    }
    return indices
}

// linearSearchWithCondition searches for the first element that satisfies a condition.
// Returns the index of first element satisfying condition, -1 if not found.
func linearSearchWithCondition(arr []int, condition func(int) bool) int {
    for i, element := range arr {
        if condition(element) {
            return i
        }
    }
    return -1
}

// linearSearchReverse searches from the end of the slice (reverse linear search).
// Returns the index of target if found, -1 otherwise.
func linearSearchReverse(arr []int, target int) int {
    for i := len(arr) - 1; i >= 0; i-- {
        if arr[i] == target {
            return i
        }
    }
    return -1
}

// linearSearchGeneric is a generic implementation for any comparable type.
// Note: This uses interface{} and type assertion for demonstration.
// In Go 1.18+, you could use generics with type constraints.
func linearSearchGeneric(arr []interface{}, target interface{}) int {
    for i, element := range arr {
        if element == target {
            return i
        }
    }
    return -1
}

// linearSearchString searches for a string in a slice of strings.
func linearSearchString(arr []string, target string) int {
    for i, element := range arr {
        if element == target {
            return i
        }
    }
    return -1
}

// containsElement checks if an element exists in the slice (returns boolean).
func containsElement(arr []int, target int) bool {
    return linearSearch(arr, target) != -1
}

// Example usage
func main() {
    numbers := []int{64, 34, 25, 12, 22, 11, 90}
    
    index := linearSearch(numbers, 22)
    fmt.Printf("Element 22 found at index: %d\\n", index) // Output: 4
    
    // Search with condition (find first even number)
    evenIndex := linearSearchWithCondition(numbers, func(x int) bool { return x%2 == 0 })
    fmt.Printf("First even number at index: %d\\n", evenIndex) // Output: 0
    
    // Find all occurrences
    allIndices := linearSearchAllOccurrences(numbers, 22)
    fmt.Printf("All occurrences of 22: %v\\n", allIndices)
    
    // Check if element exists
    exists := containsElement(numbers, 22)
    fmt.Printf("Does 22 exist in array? %v\\n", exists) // Output: true
    
    // String search example
    fruits := []string{"apple", "banana", "orange", "grape"}
    fruitIndex := linearSearchString(fruits, "orange")
    fmt.Printf("Orange found at index: %d\\n", fruitIndex) // Output: 2
}`
} 