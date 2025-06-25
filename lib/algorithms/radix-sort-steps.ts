import type { ArrayElement } from "./bubble-sort-steps"

export interface RadixSortStep {
  array: ArrayElement[]
  description: string
  digitPlace: number // e.g., 1s, 10s, 100s place
  buckets?: ArrayElement[][] // Buckets for each digit (0-9)
  isDistributing?: boolean // True when moving elements to buckets
  isCollecting?: boolean // True when collecting elements from buckets
  currentElementValue?: number
  currentElementIndex?: number // Index in main array being processed
  currentBucketIndex?: number // Index of bucket being processed
  maxDigits?: number
}

// Helper function for counting sort by digit (used by Radix Sort)
function countingSortByDigit(arr: ArrayElement[], digitPlace: number, steps: RadixSortStep[], maxDigits: number) {
  const n = arr.length
  const output: ArrayElement[] = new Array(n)
  const count = new Array(10).fill(0) // For digits 0-9

  steps.push({
    array: arr.map((el) => ({ ...el })),
    description: `Starting counting sort for digit place ${digitPlace}. Initializing buckets (counts).`,
    digitPlace,
    isDistributing: true,
    buckets: Array(10)
      .fill(null)
      .map(() => []),
    maxDigits,
  })

  // Store count of occurrences in count[]
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i].value / digitPlace) % 10
    count[digit]++
    steps.push({
      array: arr.map((el) => ({ ...el })),
      description: `Processing element ${arr[i].value}. Digit at place ${digitPlace} is ${digit}. Incrementing count for digit ${digit}.`,
      digitPlace,
      isDistributing: true,
      currentElementValue: arr[i].value,
      currentElementIndex: i,
      currentBucketIndex: digit, // Conceptually, this is the bucket
      // buckets: (update conceptual buckets if desired, for now count array shows this)
      maxDigits,
    })
  }

  // Change count[i] so that count[i] now contains actual
  // position of this digit in output[]
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1]
  }
  steps.push({
    array: arr.map((el) => ({ ...el })),
    description: `Calculated cumulative counts for digit positions. Count array: [${count.join(", ")}]`,
    digitPlace,
    isDistributing: false, // Done distributing for counts
    // buckets: ...
    maxDigits,
  })

  // Build the output array
  // To maintain stability, iterate from end of original array
  const tempBucketsForStep: ArrayElement[][] = Array(10)
    .fill(null)
    .map(() => [])

  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i].value / digitPlace) % 10
    output[count[digit] - 1] = arr[i]
    tempBucketsForStep[digit].unshift(arr[i]) // Add to front for correct order in bucket vis

    steps.push({
      array: arr.map((el) => ({ ...el })), // Show original array state
      description: `Placing element ${arr[i].value} (digit ${digit}) into its sorted position based on current digit. Output index: ${count[digit] - 1}.`,
      digitPlace,
      isDistributing: true, // Still in the phase of distributing to conceptual sorted order
      currentElementValue: arr[i].value,
      currentElementIndex: i,
      currentBucketIndex: digit,
      buckets: tempBucketsForStep.map((b) => b.map((el) => ({ ...el }))), // Show buckets filling up
      maxDigits,
    })
    count[digit]--
  }

  // Copy the output array to arr[], so that arr[] now
  // contains sorted numbers according to current digit
  for (let i = 0; i < n; i++) {
    arr[i] = output[i]
  }
  steps.push({
    array: arr.map((el) => ({ ...el })),
    description: `Collected elements from buckets. Array sorted by digit place ${digitPlace}.`,
    digitPlace,
    isCollecting: true,
    buckets: tempBucketsForStep.map((b) => b.map((el) => ({ ...el }))), // Show final buckets for this pass
    maxDigits,
  })
}

export function generateRadixSortSteps(initialArray: number[]): RadixSortStep[] {
  if (initialArray.length === 0) {
    return [{ array: [], description: "Array is empty.", digitPlace: 1 }]
  }
  const initialElements: ArrayElement[] = initialArray.map((value, index) => ({
    id: `radix-el-${index}-${value}`,
    value,
  }))

  const steps: RadixSortStep[] = []
  const elements = initialElements.map((el) => ({ ...el }))

  steps.push({
    array: elements.map((el) => ({ ...el })),
    description: "Initial array for Radix Sort.",
    digitPlace: 1,
  })

  const maxVal = Math.max(...elements.map((el) => el.value), 0)
  const maxDigits = maxVal === 0 ? 1 : Math.floor(Math.log10(maxVal)) + 1

  for (let digitPlace = 1; Math.floor(maxVal / digitPlace) > 0; digitPlace *= 10) {
    steps.push({
      array: elements.map((el) => ({ ...el })),
      description: `Sorting by digit place: ${digitPlace}s.`,
      digitPlace,
      maxDigits,
    })
    countingSortByDigit(elements, digitPlace, steps, maxDigits)
  }

  steps.push({
    array: elements.map((el) => ({ ...el })),
    description: "Radix Sort complete. Array is sorted.",
    digitPlace: Math.pow(10, maxDigits - 1), // Show last significant digit place
    maxDigits,
  })
  return steps
}
