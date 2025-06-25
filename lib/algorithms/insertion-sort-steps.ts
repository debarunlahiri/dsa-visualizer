import type { ArrayElement } from "./bubble-sort-steps" // Re-use ArrayElement

export interface InsertionSortStep {
  array: ArrayElement[]
  keyElementIndex?: number // Index of the element currently being considered (the "key")
  compareElementIndex?: number // Index of the element in the sorted portion being compared against the key
  isShifting?: boolean // True if elements are currently being shifted to make space
  justInsertedIndex?: number // Index where the key was just inserted
  sortedBoundaryIndex: number // Marks the end of the currently sorted portion (i.e., elements up to this index are sorted)
  description: string
  passCompleted?: number // Indicates which pass (i) just completed
}

export function generateInsertionSortSteps(initialArray: number[]): InsertionSortStep[] {
  const initialElements: ArrayElement[] = initialArray.map((value, index) => ({
    id: `ins-el-${index}-${value}`,
    value,
  }))

  const steps: InsertionSortStep[] = []
  const elements = initialElements.map((el) => ({ ...el }))
  const n = elements.length

  // Initial state
  steps.push({
    array: elements.map((el) => ({ ...el })),
    sortedBoundaryIndex: 0, // Initially, only the first element is (trivially) sorted
    description: "Initial array. First element is considered sorted. Click 'Play' or 'Next' to start Insertion Sort.",
  })

  for (let i = 1; i < n; i++) {
    const key = elements[i] // Current element to be inserted
    let j = i - 1

    // Step: Pick the key element
    steps.push({
      array: elements.map((el) => ({ ...el })),
      keyElementIndex: i,
      sortedBoundaryIndex: i - 1,
      description: `Pass ${i}: Picking element ${key.value} (at index ${i}) as the key to insert into the sorted portion.`,
    })

    // Compare key with elements in the sorted portion and shift them
    while (j >= 0 && elements[j].value > key.value) {
      // Step: Comparing key with elements[j]
      steps.push({
        array: elements.map((el) => ({ ...el })),
        keyElementIndex: i, // The key is still conceptually at i, though we're working with its value
        compareElementIndex: j,
        sortedBoundaryIndex: i - 1,
        description: `Comparing key ${key.value} with ${elements[j].value} (at index ${j}). Since ${elements[j].value} > ${key.value}, shift ${elements[j].value} to the right.`,
        isShifting: true,
      })

      elements[j + 1] = elements[j] // Shift element to the right

      // Step: Element shifted
      steps.push({
        array: elements.map((el) => ({ ...el })),
        keyElementIndex: i, // Key is still waiting
        compareElementIndex: j, // Show what was compared before shift
        sortedBoundaryIndex: i - 1,
        description: `Element ${elements[j + 1].value} (originally at ${j}) shifted to index ${j + 1}.`,
        isShifting: true,
      })
      j = j - 1
    }
    elements[j + 1] = key // Insert the key in its correct position

    // Step: Key inserted
    steps.push({
      array: elements.map((el) => ({ ...el })),
      justInsertedIndex: j + 1,
      sortedBoundaryIndex: i, // The sorted portion now extends to i
      description: `Key ${key.value} inserted at index ${j + 1}. Sorted portion now extends to index ${i}.`,
      passCompleted: i,
    })
  }

  steps.push({
    array: elements.map((el) => ({ ...el })),
    sortedBoundaryIndex: n - 1,
    description: "Insertion Sort complete. All elements are sorted.",
  })

  return steps
}
