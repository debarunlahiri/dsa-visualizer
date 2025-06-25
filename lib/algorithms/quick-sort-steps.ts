import type { ArrayElement } from "./bubble-sort-steps"

export interface QuickSortStep {
  array: ArrayElement[]
  description: string
  pivotIndex?: number
  pivotValue?: number
  leftPointer?: number // i
  rightPointer?: number // j (or current element being compared)
  partitionRange?: [number, number] // [low, high] of current partition
  swapping?: [number, number]
  sortedIndices?: number[] // Elements confirmed in final sorted position
}

export function generateQuickSortSteps(initialArray: number[]): QuickSortStep[] {
  const initialElements: ArrayElement[] = initialArray.map((value, index) => ({
    id: `quick-el-${index}-${value}`,
    value,
  }))

  const steps: QuickSortStep[] = []
  const elements = initialElements.map((el) => ({ ...el }))
  const currentSortedIndices: number[] = []

  steps.push({
    array: elements.map((el) => ({ ...el })),
    description: "Initial array for Quick Sort.",
    sortedIndices: [...currentSortedIndices],
  })

  function partition(arr: ArrayElement[], low: number, high: number): number {
    const pivot = arr[high] // Choosing last element as pivot
    let i = low - 1 // Index of smaller element

    steps.push({
      array: arr.map((el) => ({ ...el })),
      description: `Partitioning subarray from index ${low} to ${high}. Pivot is ${pivot.value} (at index ${high}).`,
      pivotIndex: high,
      pivotValue: pivot.value,
      leftPointer: i,
      partitionRange: [low, high],
      sortedIndices: [...currentSortedIndices],
    })

    for (let j = low; j < high; j++) {
      steps.push({
        array: arr.map((el) => ({ ...el })),
        description: `Comparing element ${arr[j].value} (at index ${j}) with pivot ${pivot.value}. Left pointer (i) is at ${i}.`,
        pivotIndex: high,
        pivotValue: pivot.value,
        leftPointer: i,
        rightPointer: j,
        partitionRange: [low, high],
        sortedIndices: [...currentSortedIndices],
      })
      if (arr[j].value < pivot.value) {
        i++
        steps.push({
          array: arr.map((el) => ({ ...el })),
          description: `${arr[j].value} < ${pivot.value}. Incrementing left pointer (i) to ${i}. Swapping ${arr[i].value} and ${arr[j].value}.`,
          pivotIndex: high,
          pivotValue: pivot.value,
          leftPointer: i,
          rightPointer: j,
          swapping: [i, j],
          partitionRange: [low, high],
          sortedIndices: [...currentSortedIndices],
        })
        ;[arr[i], arr[j]] = [arr[j], arr[i]] // Swap
        steps.push({
          array: arr.map((el) => ({ ...el })),
          description: `Swap complete. Array: [${arr.map((e) => e.value).join(", ")}]`,
          pivotIndex: high,
          pivotValue: pivot.value,
          leftPointer: i,
          rightPointer: j, // j still points to the original position of the swapped element
          partitionRange: [low, high],
          sortedIndices: [...currentSortedIndices],
        })
      } else {
        steps.push({
          array: arr.map((el) => ({ ...el })),
          description: `${arr[j].value} >= ${pivot.value}. No swap needed for ${arr[j].value}. Left pointer (i) remains ${i}.`,
          pivotIndex: high,
          pivotValue: pivot.value,
          leftPointer: i,
          rightPointer: j,
          partitionRange: [low, high],
          sortedIndices: [...currentSortedIndices],
        })
      }
    }

    // Swap pivot with element at i + 1
    steps.push({
      array: arr.map((el) => ({ ...el })),
      description: `Placing pivot ${pivot.value}. Swapping with element ${arr[i + 1].value} (at index ${i + 1}).`,
      pivotIndex: high, // Pivot is still conceptually at high before this swap
      pivotValue: pivot.value,
      leftPointer: i + 1, // This is where pivot will land
      swapping: [i + 1, high],
      partitionRange: [low, high],
      sortedIndices: [...currentSortedIndices],
    })
    ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    const pivotFinalIndex = i + 1
    currentSortedIndices.push(pivotFinalIndex)
    currentSortedIndices.sort((a, b) => a - b)

    steps.push({
      array: arr.map((el) => ({ ...el })),
      description: `Pivot ${arr[pivotFinalIndex].value} is now in its sorted position at index ${pivotFinalIndex}.`,
      pivotIndex: pivotFinalIndex, // Pivot's new final position
      partitionRange: [low, high],
      sortedIndices: [...currentSortedIndices],
    })
    return pivotFinalIndex
  }

  function quickSortRecursive(arr: ArrayElement[], low: number, high: number) {
    if (low < high) {
      steps.push({
        array: arr.map((el) => ({ ...el })),
        description: `Recursive call for Quick Sort on subarray from index ${low} to ${high}.`,
        partitionRange: [low, high],
        sortedIndices: [...currentSortedIndices],
      })
      const pi = partition(arr, low, high)

      steps.push({
        array: arr.map((el) => ({ ...el })),
        description: `Pivot placed. Recursively sorting left subarray (indices ${low} to ${pi - 1}).`,
        partitionRange: [low, pi - 1],
        sortedIndices: [...currentSortedIndices],
      })
      quickSortRecursive(arr, low, pi - 1)

      steps.push({
        array: arr.map((el) => ({ ...el })),
        description: `Recursively sorting right subarray (indices ${pi + 1} to ${high}).`,
        partitionRange: [pi + 1, high],
        sortedIndices: [...currentSortedIndices],
      })
      quickSortRecursive(arr, pi + 1, high)
    } else if (low === high) {
      // Single element subarray is sorted
      if (!currentSortedIndices.includes(low)) {
        currentSortedIndices.push(low)
        currentSortedIndices.sort((a, b) => a - b)
      }
      steps.push({
        array: arr.map((el) => ({ ...el })),
        description: `Subarray from index ${low} to ${high} has 1 element, considered sorted.`,
        partitionRange: [low, high],
        sortedIndices: [...currentSortedIndices],
      })
    } else {
      // low > high, empty subarray
      steps.push({
        array: arr.map((el) => ({ ...el })),
        description: `Subarray from index ${low} to ${high} is empty, considered sorted.`,
        partitionRange: [low, high], // or undefined
        sortedIndices: [...currentSortedIndices],
      })
    }
  }

  quickSortRecursive(elements, 0, elements.length - 1)

  // Ensure all elements are marked sorted if not caught by recursion end
  const finalSorted = Array.from({ length: elements.length }, (_, i) => i)

  steps.push({
    array: elements.map((el) => ({ ...el })),
    description: "Quick Sort complete. Array is sorted.",
    sortedIndices: finalSorted,
  })
  return steps
}
