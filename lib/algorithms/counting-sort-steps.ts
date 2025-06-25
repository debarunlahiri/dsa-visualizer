import type { ArrayElement } from "./bubble-sort-steps"

export interface CountingSortStep {
  array: ArrayElement[] // Original array
  description: string
  countArray?: number[] // The count array
  outputArray?: ArrayElement[] // The sorted output array being built
  currentElementValue?: number // Value of element being processed from input array
  currentIndex?: number // Index in input array or count array being accessed/updated
  outputIndex?: number // Index in output array where element is placed
  phase: "counting" | "calculating_positions" | "building_output" | "copying_back" | "complete"
  maxVal?: number // Maximum value in the array, used for count array size
}

export function generateCountingSortSteps(initialArray: number[]): CountingSortStep[] {
  if (initialArray.length === 0) {
    return [
      {
        array: [],
        description: "Initial array is empty. Nothing to sort.",
        phase: "complete",
      },
    ]
  }

  const initialElements: ArrayElement[] = initialArray.map((value, index) => ({
    id: `count-el-${index}-${value}`,
    value,
  }))

  const steps: CountingSortStep[] = []
  const elements = initialElements.map((el) => ({ ...el }))
  const n = elements.length
  const maxVal = Math.max(...elements.map((el) => el.value))

  steps.push({
    array: elements.map((el) => ({ ...el })),
    description: `Initial array. Max value is ${maxVal}. Preparing to count frequencies.`,
    phase: "counting",
    maxVal,
  })

  const countArray = new Array(maxVal + 1).fill(0)

  // Phase 1: Count frequencies
  for (let i = 0; i < n; i++) {
    countArray[elements[i].value]++
    steps.push({
      array: elements.map((el) => ({ ...el })),
      description: `Counting element ${elements[i].value} (at input index ${i}). Count for ${elements[i].value} is now ${countArray[elements[i].value]}.`,
      countArray: [...countArray],
      currentIndex: i,
      currentElementValue: elements[i].value,
      phase: "counting",
      maxVal,
    })
  }
  steps.push({
    array: elements.map((el) => ({ ...el })),
    description: `Finished counting frequencies. Count array: [${countArray.join(", ")}]`,
    countArray: [...countArray],
    phase: "calculating_positions",
    maxVal,
  })

  // Phase 2: Calculate cumulative counts (modify count array to store positions)
  for (let i = 1; i <= maxVal; i++) {
    countArray[i] += countArray[i - 1]
    steps.push({
      array: elements.map((el) => ({ ...el })),
      description: `Calculating cumulative count for value ${i}. New count: ${countArray[i]}. (Position for ${i} will be countArray[${i}] - 1)`,
      countArray: [...countArray],
      currentIndex: i, // Index in count array being updated
      phase: "calculating_positions",
      maxVal,
    })
  }
  steps.push({
    array: elements.map((el) => ({ ...el })),
    description: `Finished calculating cumulative counts. This array now stores end positions. Count array: [${countArray.join(", ")}]`,
    countArray: [...countArray],
    phase: "building_output",
    maxVal,
  })

  // Phase 3: Build output array
  const outputArray: ArrayElement[] = new Array(n)
  for (let i = n - 1; i >= 0; i--) {
    const currentElement = elements[i]
    const position = countArray[currentElement.value] - 1
    outputArray[position] = currentElement

    steps.push({
      array: elements.map((el) => ({ ...el })),
      description: `Processing element ${currentElement.value} (from input index ${i}). Its position in sorted output is ${position} (from countArray[${currentElement.value}] - 1).`,
      countArray: [...countArray], // Show count array before decrement
      outputArray: outputArray.map((el) => (el ? { ...el } : { id: "empty", value: -1 })), // Show output being built
      currentIndex: i,
      currentElementValue: currentElement.value,
      outputIndex: position,
      phase: "building_output",
      maxVal,
    })
    countArray[currentElement.value]-- // Decrement count for next same element
    steps.push({
      array: elements.map((el) => ({ ...el })),
      description: `Placed ${currentElement.value} at output index ${position}. Decremented count for ${currentElement.value} to ${countArray[currentElement.value]}.`,
      countArray: [...countArray], // Show count array after decrement
      outputArray: outputArray.map((el) => (el ? { ...el } : { id: "empty", value: -1 })),
      currentIndex: i,
      outputIndex: position,
      phase: "building_output",
      maxVal,
    })
  }
  steps.push({
    array: elements.map((el) => ({ ...el })), // Original array still shown
    description: `Finished building sorted output array: [${outputArray.map((e) => e.value).join(", ")}]`,
    countArray: [...countArray],
    outputArray: outputArray.map((el) => ({ ...el })),
    phase: "copying_back",
    maxVal,
  })

  // Phase 4: Copy output array back to original (or treat output as sorted)
  // For visualization, we'll update the main 'elements' array
  for (let i = 0; i < n; i++) {
    elements[i] = outputArray[i]
  }
  steps.push({
    array: elements.map((el) => ({ ...el })),
    description: "Counting Sort complete. Array is sorted.",
    outputArray: outputArray.map((el) => ({ ...el })),
    phase: "complete",
    maxVal,
  })

  return steps
}
