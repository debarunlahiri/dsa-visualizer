import type React from "react"
import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export interface Algorithm {
  id: string
  title: string
  component: React.ComponentType
  explanation?: React.ReactNode
  codeSnippets?: Record<string, string>
}

export interface AlgorithmCategory {
  id: string
  title: string
  algorithms: Algorithm[]
}

// --- Bubble Sort Content ---
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
  python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
  javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
  }
  return arr;
}`,
  typescript: `function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
  }
  return arr;
}`
} 