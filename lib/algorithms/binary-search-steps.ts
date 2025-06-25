import type { ArrayElement } from "./bubble-sort-steps"

export interface BinarySearchStep {
  array: ArrayElement[] // Must be sorted
  target: number
  low: number
  high: number
  mid?: number
  foundIndex?: number
  description: string
  searchComplete?: boolean
}

export function generateBinarySearchSteps(sortedArray: number[], target: number): BinarySearchStep[] {
  const elements: ArrayElement[] = sortedArray.map((value, index) => ({
    id: `bs-el-${index}-${value}`,
    value,
  }))

  const steps: BinarySearchStep[] = []
  let low = 0
  let high = elements.length - 1
  let foundIndex: number | undefined = undefined

  steps.push({
    array: elements.map((el) => ({ ...el })),
    target,
    low,
    high,
    description: `Initial state for Binary Search. Target: ${target}. Range: [${low}, ${high}].`,
  })

  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2)
    steps.push({
      array: elements.map((el) => ({ ...el })),
      target,
      low,
      high,
      mid,
      description: `Calculating middle: mid = floor((${low} + ${high}) / 2) = ${mid}. Value at mid (${elements[mid].value}).`,
    })

    if (elements[mid].value === target) {
      foundIndex = mid
      steps.push({
        array: elements.map((el) => ({ ...el })),
        target,
        low,
        high,
        mid,
        foundIndex,
        description: `Target ${target} found at index ${mid}!`,
        searchComplete: true,
      })
      break
    }

    if (elements[mid].value < target) {
      const oldLow = low
      low = mid + 1
      steps.push({
        array: elements.map((el) => ({ ...el })),
        target,
        low: oldLow, // Show previous low for clarity
        high,
        mid,
        description: `${elements[mid].value} < ${target}. Target might be in the right half. New low: ${low}.`,
      })
    } else {
      const oldHigh = high
      high = mid - 1
      steps.push({
        array: elements.map((el) => ({ ...el })),
        target,
        low,
        high: oldHigh, // Show previous high
        mid,
        description: `${elements[mid].value} > ${target}. Target might be in the left half. New high: ${high}.`,
      })
    }
    if (low > high && foundIndex === undefined) {
      steps.push({
        array: elements.map((el) => ({ ...el })),
        target,
        low,
        high,
        description: `Low (${low}) is now greater than High (${high}). Target ${target} not found.`,
        searchComplete: true,
      })
    }
  }

  if (foundIndex === undefined && (steps.length === 0 || !steps[steps.length - 1].searchComplete)) {
    steps.push({
      array: elements.map((el) => ({ ...el })),
      target,
      low,
      high,
      description: `Target ${target} not found in the array. Search range exhausted.`,
      searchComplete: true,
    })
  }

  return steps
}
