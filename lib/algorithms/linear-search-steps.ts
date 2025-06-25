import type { ArrayElement } from "./bubble-sort-steps"

export interface LinearSearchStep {
  array: ArrayElement[]
  target: number
  currentIndex?: number
  foundIndex?: number
  description: string
  searchComplete?: boolean
}

export function generateLinearSearchSteps(array: number[], target: number): LinearSearchStep[] {
  const elements: ArrayElement[] = array.map((value, index) => ({
    id: `ls-el-${index}-${value}`,
    value,
  }))

  const steps: LinearSearchStep[] = []

  steps.push({
    array: elements.map((el) => ({ ...el })),
    target,
    description: `Initial array for Linear Search. Target: ${target}.`,
  })

  let found = false
  for (let i = 0; i < elements.length; i++) {
    steps.push({
      array: elements.map((el) => ({ ...el })),
      target,
      currentIndex: i,
      description: `Comparing target ${target} with element ${elements[i].value} at index ${i}.`,
    })
    if (elements[i].value === target) {
      steps.push({
        array: elements.map((el) => ({ ...el })),
        target,
        currentIndex: i,
        foundIndex: i,
        description: `Target ${target} found at index ${i}!`,
        searchComplete: true,
      })
      found = true
      break
    }
  }

  if (!found) {
    steps.push({
      array: elements.map((el) => ({ ...el })),
      target,
      description: `Target ${target} not found in the array.`,
      searchComplete: true,
    })
  }
  return steps
}
