import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const radixSortExplanationContent = (
  <AlgorithmExplanation>
    <h2>Radix Sort</h2>
    <p>
      Radix Sort is a non-comparison based integer sorting algorithm that sorts data with integer keys by grouping keys
      by the individual digits which share the same significant position and value. It processes digits from least
      significant (LSD) to most significant (MSD), or vice-versa.
    </p>
    <h3>How it Works (LSD Radix Sort):</h3>
    <ol>
      <li>Find the maximum number in the array to determine the number of digits (passes needed).</li>
      <li>
        For each digit position (from least significant to most significant):
        <ul>
          <li>
            Sort the array elements based on the current digit using a stable sorting algorithm (like Counting Sort).
          </li>
        </ul>
      </li>
      <li>After processing all digit positions, the array will be sorted.</li>
    </ol>
    <h3>Time Complexity:</h3>
    <p>
      $$O(d \cdot (n + k))$$, where d is the number of digits in the maximum number, n is the number of elements, and k
      is the base (radix, typically 10 for decimal numbers). If k is constant and d is proportional to $$\log_k M$$
      (where M is max value), it can be $$O(n \log M)$$.
    </p>
    <h3>Space Complexity:</h3>
    <p>$$O(n + k)$$ (primarily due to the stable sort like Counting Sort used internally).</p>
    <p>
      <strong>Note:</strong> Radix sort is efficient for large numbers of elements with a relatively small number of
      digits.
    </p>
  </AlgorithmExplanation>
)

export const radixSortCodeSnippets = {
  python: `# Radix Sort Implementation in Python
# Time Complexity: O(d * (n + k)) where d is digits, k is range
# Space Complexity: O(n + k)

def radix_sort(arr):
    """
    Sorts an array using the radix sort algorithm.
    Works only for non-negative integers.
    
    Args:
        arr: List of non-negative integers
    
    Returns:
        Sorted list
    """
    if not arr:
        return arr
    
    # Find the maximum number to know number of digits
    max_num = max(arr)
    
    # Do counting sort for every digit
    exp = 1
    while max_num // exp > 0:
        arr = counting_sort_by_digit(arr, exp)
        exp *= 10
    
    return arr

def counting_sort_by_digit(arr, exp):
    """
    Counting sort based on digit represented by exp.
    
    Args:
        arr: Array to sort
        exp: Current digit position (1, 10, 100, ...)
    
    Returns:
        Array sorted by current digit
    """
    n = len(arr)
    output = [0] * n
    count = [0] * 10  # Count array for digits 0-9
    
    # Store count of occurrences of each digit
    for i in range(n):
        index = (arr[i] // exp) % 10
        count[index] += 1
    
    # Change count[i] to actual position of this digit in output[]
    for i in range(1, 10):
        count[i] += count[i - 1]
    
    # Build the output array
    for i in range(n - 1, -1, -1):
        index = (arr[i] // exp) % 10
        output[count[index] - 1] = arr[i]
        count[index] -= 1
    
    return output

def get_digit_count(num):
    """Helper function to count digits in a number."""
    if num == 0:
        return 1
    count = 0
    while num > 0:
        count += 1
        num //= 10
    return count

# Example usage:
# numbers = [170, 45, 75, 90, 2, 802, 24, 66]
# sorted_numbers = radix_sort(numbers)
# print(sorted_numbers)  # Output: [2, 24, 45, 66, 75, 90, 170, 802]`,

  javascript: `/**
 * Radix Sort Implementation in JavaScript
 * Time Complexity: O(d * (n + k)) where d is digits, k is range
 * Space Complexity: O(n + k)
 */

/**
 * Sorts an array using the radix sort algorithm.
 * Works only for non-negative integers.
 * @param {number[]} arr - Array of non-negative integers to sort
 * @returns {number[]} Sorted array
 */
function radixSort(arr) {
    if (arr.length === 0) {
        return arr;
    }
    
    // Find the maximum number to know number of digits
    const maxNum = Math.max(...arr);
    
    // Do counting sort for every digit
    let exp = 1;
    let sortedArr = [...arr]; // Create copy
    
    while (Math.floor(maxNum / exp) > 0) {
        sortedArr = countingSortByDigit(sortedArr, exp);
        exp *= 10;
    }
    
    return sortedArr;
}

/**
 * Counting sort based on digit represented by exp.
 * @param {number[]} arr - Array to sort
 * @param {number} exp - Current digit position (1, 10, 100, ...)
 * @returns {number[]} Array sorted by current digit
 */
function countingSortByDigit(arr, exp) {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0); // Count array for digits 0-9
    
    // Store count of occurrences of each digit
    for (let i = 0; i < n; i++) {
        const index = Math.floor(arr[i] / exp) % 10;
        count[index]++;
    }
    
    // Change count[i] to actual position of this digit in output[]
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
        const index = Math.floor(arr[i] / exp) % 10;
        output[count[index] - 1] = arr[i];
        count[index]--;
    }
    
    return output;
}

/**
 * Helper function to count digits in a number.
 * @param {number} num - Number to count digits
 * @returns {number} Number of digits
 */
function getDigitCount(num) {
    if (num === 0) return 1;
    let count = 0;
    while (num > 0) {
        count++;
        num = Math.floor(num / 10);
    }
    return count;
}

// Example usage:
// const numbers = [170, 45, 75, 90, 2, 802, 24, 66];
// const sortedNumbers = radixSort(numbers);
// console.log(sortedNumbers); // Output: [2, 24, 45, 66, 75, 90, 170, 802]

module.exports = { radixSort, countingSortByDigit, getDigitCount };
    const maxNum = getMax(arr);

    const countingSortByDigit = (arr, exp) => {
        const output = new Array(arr.length);
        const count = new Array(10).fill(0);
        for (let i = 0; i < arr.length; i++) {
            count[Math.floor(arr[i] / exp) % 10]++;
        }
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
        for (let i = arr.length - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }
        for (let i = 0; i < arr.length; i++) arr[i] = output[i];
    };

    for (let exp = 1; Math.floor(maxNum / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
    return arr;
}`,
  typescript: `function radixSort(arr: number[]): number[] {
  if (arr.length === 0) return [];
  const getMax = (arr: number[]) => Math.max(...arr);
  const maxNum = getMax(arr);

  const countingSortByDigit = (arrToSort: number[], exp: number) => {
    const output = new Array(arrToSort.length);
    const count = new Array(10).fill(0);
    for (let i = 0; i < arrToSort.length; i++) {
      count[Math.floor(arrToSort[i] / exp) % 10]++;
    }
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
    for (let i = arrToSort.length - 1; i >= 0; i--) {
      const digit = Math.floor(arrToSort[i] / exp) % 10;
      output[count[digit] - 1] = arrToSort[i];
      count[digit]--;
    }
    for (let i = 0; i < arrToSort.length; i++) arrToSort[i] = output[i];
  };

  for (let exp = 1; Math.floor(maxNum / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp);
  }
  return arr;
}`,
} 