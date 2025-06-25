import type { ArrayElement } from "./bubble-sort-steps"

export interface MergeSortStep {
  array: ArrayElement[]
  description: string
  isMerging?: boolean
  mergeRange?: [number, number, number] // [left, mid, right] of current merge operation
  leftSubarray?: ArrayElement[] // For display during merge
  rightSubarray?: ArrayElement[] // For display during merge
  tempMergedArray?: ArrayElement[] // Shows elements being placed during merge
  copyingBack?: boolean // Indicates elements are being copied from temp to original
  highlightRange?: [number, number] // Range being focused on (e.g., for divide or copy)
  sortedIndices?: number[] // Track fully sorted portions if applicable (though merge sort sorts chunks)
}

export function generateMergeSortSteps(initialArray: number[]): MergeSortStep[] {
  const initialElements: ArrayElement[] = initialArray.map((value, index) => ({
    id: `merge-el-${index}-${value}`,
    value,
  }))

  const steps: MergeSortStep[] = []
  const elements = initialElements.map((el) => ({ ...el })) // Use let for reassignment after full sort

  steps.push({
    array: elements.map((el) => ({ ...el })),
    description: "Initial array for Merge Sort.",
  })

  function merge(arr: ArrayElement[], l: number, m: number, r: number) {
    const n1 = m - l + 1
    const n2 = r - m

    const L: ArrayElement[] = new Array(n1)
    const R: ArrayElement[] = new Array(n2)

    for (let i = 0; i < n1; i++) L[i] = arr[l + i]
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j]

    steps.push({
      array: arr.map((el) => ({ ...el })),
      description: `Preparing to merge subarrays.\nLeft: [${L.map((e) => e.value).join(", ")}] (indices ${l}-${m}).\nRight: [${R.map((e) => e.value).join(", ")}] (indices ${m + 1}-${r}).`,
      isMerging: true,
      mergeRange: [l, m, r],
      leftSubarray: L.map((el) => ({ ...el })),
      rightSubarray: R.map((el) => ({ ...el })),
      highlightRange: [l, r],
    })

    let i = 0,
      j = 0,
      k = l
    const currentMergeDisplay: ArrayElement[] = []

    while (i < n1 && j < n2) {
      steps.push({
        array: arr.map((el) => ({ ...el })),
        description: `Comparing elements:\nLeft subarray's current: ${L[i].value}.\nRight subarray's current: ${R[j].value}.`,
        isMerging: true,
        mergeRange: [l, m, r],
        leftSubarray: L.map((el, idx) => ({ ...el, highlight: idx === i })),
        rightSubarray: R.map((el, idx) => ({ ...el, highlight: idx === j })),
        tempMergedArray: [...currentMergeDisplay],
        highlightRange: [l, r],
      })
      if (L[i].value <= R[j].value) {
        currentMergeDisplay.push(L[i])
        arr[k] = L[i]
        i++
      } else {
        currentMergeDisplay.push(R[j])
        arr[k] = R[j]
        j++
      }
      steps.push({
        array: arr.map((el) => ({ ...el })), // Show main array being updated (though it's conceptual until copy back)
        description: `${arr[k].value} is smaller (or equal).\nPlacing it into the main array at current merge position.`,
        isMerging: true,
        mergeRange: [l, m, r],
        leftSubarray: L.map((el, idx) => ({ ...el, highlight: idx === i - 1 && L[i - 1] === arr[k] })),
        rightSubarray: R.map((el, idx) => ({ ...el, highlight: idx === j - 1 && R[j - 1] === arr[k] })),
        tempMergedArray: [...currentMergeDisplay],
        highlightRange: [k, k], // Highlight where it's placed in the main array
      })
      k++
    }

    while (i < n1) {
      currentMergeDisplay.push(L[i])
      arr[k] = L[i]
      steps.push({
        array: arr.map((el) => ({ ...el })),
        description: `Copying remaining element ${L[i].value} from left subarray.`,
        isMerging: true,
        mergeRange: [l, m, r],
        leftSubarray: L.map((el, idx) => ({ ...el, highlight: idx === i })),
        rightSubarray: R.map((el) => ({ ...el })),
        tempMergedArray: [...currentMergeDisplay],
        highlightRange: [k, k],
      })
      i++
      k++
    }

    while (j < n2) {
      currentMergeDisplay.push(R[j])
      arr[k] = R[j]
      steps.push({
        array: arr.map((el) => ({ ...el })),
        description: `Copying remaining element ${R[j].value} from right subarray.`,
        isMerging: true,
        mergeRange: [l, m, r],
        leftSubarray: L.map((el) => ({ ...el })),
        rightSubarray: R.map((el, idx) => ({ ...el, highlight: idx === j })),
        tempMergedArray: [...currentMergeDisplay],
        highlightRange: [k, k],
      })
      j++
      k++
    }
    steps.push({
      array: arr.map((el) => ({ ...el })),
      description: `Finished merging for range ${l}-${r}. Result: [${arr
        .slice(l, r + 1)
        .map((e) => e.value)
        .join(", ")}].`,
      isMerging: false,
      highlightRange: [l, r],
      copyingBack: true, // Indicates this range is now sorted from the merge
    })
  }

  function mergeSortRecursive(arr: ArrayElement[], l: number, r: number) {
    if (l >= r) {
      steps.push({
        array: arr.map((el) => ({ ...el })),
        description: `Base Case Reached for range [${l}, ${r}].\nSubarray has 1 or 0 elements, which is inherently sorted.`,
        highlightRange: [l, r],
      })
      return
    }
    const m = l + Math.floor((r - l) / 2)
    steps.push({
      array: arr.map((el) => ({ ...el })),
      description: `Recursive Call: MergeSort for the left part.\nRange: indices ${l} to ${m}.`,
      highlightRange: [l, m],
    })
    mergeSortRecursive(arr, l, m)
    steps.push({
      array: arr.map((el) => ({ ...el })),
      description: `Dividing: Right part from index ${m + 1} to ${r}.`,
      highlightRange: [m + 1, r],
    })
    mergeSortRecursive(arr, m + 1, r)
    merge(arr, l, m, r)
  }

  mergeSortRecursive(elements, 0, elements.length - 1)

  steps.push({
    array: elements.map((el) => ({ ...el })),
    description: "Merge Sort complete. Array is sorted.",
    sortedIndices: elements.map((_, idx) => idx), // All indices are sorted
  })
  return steps
}
