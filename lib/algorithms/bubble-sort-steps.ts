export interface ArrayElement {
  id: string // Unique and stable identifier for each element
  value: number
}

export interface BubbleSortStep {
  array: ArrayElement[] // Current state of the array
  comparing?: [number, number] // Indices of elements being compared
  swapping?: [number, number] // Indices of elements currently in the process of swapping (visual cue)
  swapped?: [number, number] // Indices of elements that have just completed a swap
  sortedIndices: number[] // Indices of elements that are in their final sorted position
  description: string // Textual explanation of the current step
  passCompleted?: number // Indicates which pass (i) just completed
}

export function generateBubbleSortSteps(initialArray: number[]): BubbleSortStep[] {
  const initialElements: ArrayElement[] = initialArray.map((value, index) => ({
    id: `el-${index}-${value}`, // Deterministic unique ID
    value,
  }))

  const steps: BubbleSortStep[] = []
  const elements = initialElements.map((el) => ({ ...el })) // Work with a mutable copy
  const n = elements.length
  const currentSortedIndices: number[] = []

  // Initial state
  steps.push({
    array: elements.map((el) => ({ ...el })),
    sortedIndices: [...currentSortedIndices],
    description: "Initial array. Click 'Play' or 'Next' to start.",
  })

  for (let i = 0; i < n - 1; i++) {
    let swappedInPass = false
    for (let j = 0; j < n - i - 1; j++) {
      // Step: Comparing
      steps.push({
        array: elements.map((el) => ({ ...el })),
        comparing: [j, j + 1],
        sortedIndices: [...currentSortedIndices],
        description: `Comparing ${elements[j].value} (at index ${j}) and ${elements[j + 1].value} (at index ${j + 1}).`,
      })

      if (elements[j].value > elements[j + 1].value) {
        // Step: About to swap
        steps.push({
          array: elements.map((el) => ({ ...el })),
          comparing: [j, j + 1], // Still highlighting comparison
          swapping: [j, j + 1], // Indicate these are about to be swapped
          sortedIndices: [...currentSortedIndices],
          description: `${elements[j].value} > ${elements[j + 1].value}. Swapping elements.`,
        })

        // Perform swap
        ;[elements[j], elements[j + 1]] = [elements[j + 1], elements[j]]
        swappedInPass = true

        // Step: Swap completed
        steps.push({
          array: elements.map((el) => ({ ...el })),
          swapped: [j, j + 1], // Indicate these were just swapped
          sortedIndices: [...currentSortedIndices],
          description: `Elements swapped. Array is now [${elements.map((e) => e.value).join(", ")}].`,
        })
      } else {
        // Step: No swap
        steps.push({
          array: elements.map((el) => ({ ...el })),
          comparing: [j, j + 1],
          sortedIndices: [...currentSortedIndices],
          description: `${elements[j].value} <= ${elements[j + 1].value}. No swap needed.`,
        })
      }
    }

    // Mark the element at its new sorted position (n - 1 - i)
    currentSortedIndices.push(n - 1 - i)
    currentSortedIndices.sort((a, b) => a - b) // Keep sortedIndices sorted for consistent checks

    steps.push({
      array: elements.map((el) => ({ ...el })),
      sortedIndices: [...currentSortedIndices],
      description: `Pass ${i + 1} complete. Element ${elements[n - 1 - i].value} is in its sorted position.`,
      passCompleted: i,
    })

    if (!swappedInPass) {
      // Optimization: if no swaps in a pass, array is sorted
      // Mark all remaining elements as sorted
      for (let k = 0; k < n - 1 - i; k++) {
        if (!currentSortedIndices.includes(k)) {
          currentSortedIndices.push(k)
        }
      }
      currentSortedIndices.sort((a, b) => a - b)
      steps.push({
        array: elements.map((el) => ({ ...el })),
        sortedIndices: [...currentSortedIndices],
        description: "Array is sorted (no swaps in the last pass). All elements are in final positions.",
      })
      break // Exit outer loop
    }
  }

  // Ensure all elements are marked as sorted in the final step if not broken early
  // This handles the case where the loop finishes naturally (e.g. last two elements sorted)
  if (currentSortedIndices.length < n) {
    const finalSortedIndices = Array.from({ length: n }, (_, k) => k)
    steps.push({
      array: elements.map((el) => ({ ...el })),
      sortedIndices: finalSortedIndices,
      description: "Sorting complete. All elements are in their final sorted positions.",
    })
  }

  return steps
}
