import type { ArrayElement } from "./bubble-sort-steps"

export interface HeapSortStep {
  array: ArrayElement[]
  description: string
  heapSize?: number // Current size of the heap
  rootIndex?: number // Root of subtree being heapified
  largestIndex?: number // Index of largest among root, left, right
  leftIndex?: number
  rightIndex?: number
  swapping?: [number, number]
  sortedIndices?: number[] // Elements in their final sorted positions (at the end of the array)
  isBuildingHeap?: boolean
  isExtracting?: boolean
}

export function generateHeapSortSteps(initialArray: number[]): HeapSortStep[] {
  const initialElements: ArrayElement[] = initialArray.map((value, index) => ({
    id: `heap-el-${index}-${value}`,
    value,
  }))

  const steps: HeapSortStep[] = []
  const elements = initialElements.map((el) => ({ ...el }))
  const n = elements.length
  const currentSortedIndices: number[] = []

  steps.push({
    array: elements.map((el) => ({ ...el })),
    description: "Initial array for Heap Sort.",
    sortedIndices: [...currentSortedIndices],
  })

  // Heapify subtree rooted at index i.
  // n is size of heap
  function heapify(arr: ArrayElement[], heapN: number, i: number) {
    let largest = i // Initialize largest as root
    const l = 2 * i + 1 // left = 2*i + 1
    const r = 2 * i + 2 // right = 2*i + 2

    steps.push({
      array: arr.map((el) => ({ ...el })),
      description: `Heapifying subtree rooted at index ${i}. Heap size: ${heapN}. Comparing root (${arr[i].value}) with children.`,
      heapSize: heapN,
      rootIndex: i,
      leftIndex: l < heapN ? l : undefined,
      rightIndex: r < heapN ? r : undefined,
      sortedIndices: [...currentSortedIndices],
      isBuildingHeap: !steps.some((s) => s.isExtracting), // True if still in build phase
    })

    let currentLargestVal = arr[largest].value
    let largestDesc = `Root (${arr[largest].value} at index ${largest}) is current largest.`

    if (l < heapN && arr[l].value > currentLargestVal) {
      largestDesc = `Left child ${arr[l].value} (at ${l}) > current largest ${currentLargestVal}. New largest is ${arr[l].value}.`
      largest = l
      currentLargestVal = arr[l].value
    } else if (l < heapN) {
      largestDesc = `Left child ${arr[l].value} (at ${l}) <= current largest ${currentLargestVal}. Largest remains ${currentLargestVal}.`
    }

    if (r < heapN && arr[r].value > currentLargestVal) {
      largestDesc = `Right child ${arr[r].value} (at ${r}) > current largest ${currentLargestVal}. New largest is ${arr[r].value}.`
      largest = r
    } else if (r < heapN) {
      largestDesc += ` Right child ${arr[r].value} (at ${r}) <= current largest ${currentLargestVal}. Largest remains ${currentLargestVal}.`
    }

    steps.push({
      array: arr.map((el) => ({ ...el })),
      description: largestDesc,
      heapSize: heapN,
      rootIndex: i,
      leftIndex: l < heapN ? l : undefined,
      rightIndex: r < heapN ? r : undefined,
      largestIndex: largest,
      sortedIndices: [...currentSortedIndices],
      isBuildingHeap: !steps.some((s) => s.isExtracting),
    })

    if (largest !== i) {
      steps.push({
        array: arr.map((el) => ({ ...el })),
        description: `Largest is not root. Swapping root ${arr[i].value} (at ${i}) with ${arr[largest].value} (at ${largest}).`,
        heapSize: heapN,
        rootIndex: i,
        largestIndex: largest,
        swapping: [i, largest],
        sortedIndices: [...currentSortedIndices],
        isBuildingHeap: !steps.some((s) => s.isExtracting),
      })
      ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
      steps.push({
        array: arr.map((el) => ({ ...el })),
        description: `Swap complete. Recursively heapify the affected sub-tree rooted at ${largest}.`,
        heapSize: heapN,
        rootIndex: i, // Original root
        largestIndex: largest, // New root of subtree to heapify
        sortedIndices: [...currentSortedIndices],
        isBuildingHeap: !steps.some((s) => s.isExtracting),
      })
      heapify(arr, heapN, largest)
    } else {
      steps.push({
        array: arr.map((el) => ({ ...el })),
        description: `Root (${arr[i].value} at index ${i}) is already the largest. Subtree is heapified.`,
        heapSize: heapN,
        rootIndex: i,
        largestIndex: i,
        sortedIndices: [...currentSortedIndices],
        isBuildingHeap: !steps.some((s) => s.isExtracting),
      })
    }
  }

  // Build heap (rearrange array)
  steps.push({
    array: elements.map((el) => ({ ...el })),
    description: "Building max heap...",
    isBuildingHeap: true,
    sortedIndices: [...currentSortedIndices],
  })
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(elements, n, i)
  }
  steps.push({
    array: elements.map((el) => ({ ...el })),
    description: "Max heap built. Now extracting elements.",
    heapSize: n,
    isBuildingHeap: false,
    isExtracting: true,
    sortedIndices: [...currentSortedIndices],
  })

  // One by one extract an element from heap
  for (let i = n - 1; i > 0; i--) {
    steps.push({
      array: elements.map((el) => ({ ...el })),
      description: `Extracting max element ${elements[0].value} (root). Swapping with last element of heap ${elements[i].value} (at index ${i}).`,
      heapSize: i + 1, // Heap size before this extraction's swap
      swapping: [0, i],
      isExtracting: true,
      sortedIndices: [...currentSortedIndices],
    })
    ;[elements[0], elements[i]] = [elements[i], elements[0]] // Move current root to end

    currentSortedIndices.push(i)
    currentSortedIndices.sort((a, b) => a - b)

    steps.push({
      array: elements.map((el) => ({ ...el })),
      description: `Element ${elements[i].value} moved to sorted position ${i}. Heap size reduced to ${i}. Heapifying root.`,
      heapSize: i, // New heap size
      rootIndex: 0,
      isExtracting: true,
      sortedIndices: [...currentSortedIndices],
    })
    heapify(elements, i, 0) // call max heapify on the reduced heap
  }

  // The first element is also sorted now
  if (!currentSortedIndices.includes(0) && n > 0) {
    currentSortedIndices.push(0)
    currentSortedIndices.sort((a, b) => a - b)
  }

  steps.push({
    array: elements.map((el) => ({ ...el })),
    description: "Heap Sort complete. Array is sorted.",
    sortedIndices: [...currentSortedIndices],
  })
  return steps
}
