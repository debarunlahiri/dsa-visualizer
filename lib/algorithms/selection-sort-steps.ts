import type { ArrayElement } from "./bubble-sort-steps" // Re-use ArrayElement

export interface SelectionSortStep {
  array: ArrayElement[]
  currentIndex: number // The index we are trying to fill (i)
  minIndex: number // The index of the current minimum found in the unsorted part
  comparingIndex?: number // The index being compared against minIndex (j)
  swapping?: [number, number] // Indices being swapped
  swapped?: [number, number] // Indices that just completed a swap
  sortedIndices: number[]
  description: string
  passCompleted?: number // Indicates which pass (i) just completed
}

export function generateSelectionSortSteps(initialArray: number[]): SelectionSortStep[] {
  const initialElements: ArrayElement[] = initialArray.map((value, index) => ({
    id: `sel-el-${index}-${value}`,
    value,
  }))

  const steps: SelectionSortStep[] = []
  const elements = initialElements.map((el) => ({ ...el }))
  const n = elements.length
  const currentSortedIndices: number[] = []

  // Initial state
  steps.push({
    array: elements.map((el) => ({ ...el })),
    currentIndex: 0,
    minIndex: 0,
    sortedIndices: [...currentSortedIndices],
    description: "Initial array. Click 'Play' or 'Next' to start Selection Sort.",
  })

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i

    // Indicate the start of a new pass and what we're looking for
    steps.push({
      array: elements.map((el) => ({ ...el })),
      currentIndex: i,
      minIndex: minIdx, // Initially, min is the first element of unsorted part
      sortedIndices: [...currentSortedIndices],
      description: `Pass ${i + 1}: Finding the minimum element in the unsorted part (from index ${i}). Current minimum is ${elements[minIdx].value} at index ${minIdx}.`,
    })

    for (let j = i + 1; j < n; j++) {
      // Comparing elements[j] with elements[minIdx]
      steps.push({
        array: elements.map((el) => ({ ...el })),
        currentIndex: i,
        minIndex: minIdx,
        comparingIndex: j,
        sortedIndices: [...currentSortedIndices],
        description: `Comparing current minimum ${elements[minIdx].value} (at index ${minIdx}) with ${elements[j].value} (at index ${j}).`,
      })

      if (elements[j].value < elements[minIdx].value) {
        const oldMinIdx = minIdx
        minIdx = j
        // New minimum found
        steps.push({
          array: elements.map((el) => ({ ...el })),
          currentIndex: i,
          minIndex: minIdx, // Updated minIndex
          comparingIndex: j, // Still show what was compared
          sortedIndices: [...currentSortedIndices],
          description: `New minimum found: ${elements[minIdx].value} (at index ${minIdx}). Old minimum was ${elements[oldMinIdx].value}.`,
        })
      }
    }

    // After inner loop, minIdx holds the index of the minimum element for this pass
    if (minIdx !== i) {
      // About to swap
      steps.push({
        array: elements.map((el) => ({ ...el })),
        currentIndex: i,
        minIndex: minIdx, // This is the element that will be swapped into position i
        swapping: [i, minIdx],
        sortedIndices: [...currentSortedIndices],
        description: `Minimum for pass ${i + 1} is ${elements[minIdx].value} (at index ${minIdx}). Swapping with element ${elements[i].value} (at index ${i}).`,
      })

      // Perform swap
      ;[elements[i], elements[minIdx]] = [elements[minIdx], elements[i]]

      // Swap completed
      steps.push({
        array: elements.map((el) => ({ ...el })),
        currentIndex: i, // Position i is now sorted
        minIndex: i, // After swap, min element is at i
        swapped: [i, minIdx],
        sortedIndices: [...currentSortedIndices], // i will be added in the next step
        description: `Swap complete. Element ${elements[i].value} is now at index ${i}. Array: [${elements.map((e) => e.value).join(", ")}].`,
      })
    } else {
      steps.push({
        array: elements.map((el) => ({ ...el })),
        currentIndex: i,
        minIndex: i,
        sortedIndices: [...currentSortedIndices],
        description: `Element ${elements[i].value} (at index ${i}) is already in its correct sorted position for this pass. No swap needed.`,
      })
    }

    currentSortedIndices.push(i)
    currentSortedIndices.sort((a, b) => a - b)

    steps.push({
      array: elements.map((el) => ({ ...el })),
      currentIndex: i + 1 < n - 1 ? i + 1 : i, // Next i, or current if last meaningful pass
      minIndex: i + 1 < n - 1 ? i + 1 : i,
      sortedIndices: [...currentSortedIndices],
      description: `Pass ${i + 1} complete. Element ${elements[i].value} is sorted.`,
      passCompleted: i,
    })
  }

  // The last element n-1 is sorted by default after n-2 passes
  if (!currentSortedIndices.includes(n - 1) && n > 0) {
    currentSortedIndices.push(n - 1)
    currentSortedIndices.sort((a, b) => a - b)
  }

  steps.push({
    array: elements.map((el) => ({ ...el })),
    currentIndex: n - 1,
    minIndex: n - 1,
    sortedIndices: [...currentSortedIndices],
    description: "Selection Sort complete. All elements are sorted.",
  })

  return steps
}
