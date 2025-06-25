export interface KnapsackItem {
  id: string
  weight: number
  value: number
}

export interface KnapsackStep {
  description: string
  dpTable: number[][] // The DP table: dp[i][w]
  items: KnapsackItem[]
  capacity: number
  currentItemIndex?: number // Index of item being considered (i in dp[i][w])
  currentWeight?: number // Current capacity being considered (w in dp[i][w])
  includedItem?: boolean // True if currentItem is included for currentWeight
  maxValue?: number // Max value found so far (or final)
  selectedItems?: KnapsackItem[] // Items included in the optimal solution
  phase: "init" | "filling_table" | "backtracking" | "complete"
}

export function generateKnapsack01Steps(items: KnapsackItem[], capacity: number): KnapsackStep[] {
  const steps: KnapsackStep[] = []
  const n = items.length

  // Initialize DP table with 0s
  // dp[i][w] will be the maximum value that can be obtained with a capacity of w using items up to index i-1
  const dpTable = Array(n + 1)
    .fill(null)
    .map(() => Array(capacity + 1).fill(0))

  steps.push({
    description: `Initializing DP table for ${n} items and capacity ${capacity}. dp[i][w] = max value using first i items with capacity w.`,
    dpTable: dpTable.map((row) => [...row]),
    items,
    capacity,
    phase: "init",
  })

  // Fill DP table
  for (let i = 1; i <= n; i++) {
    const currentItem = items[i - 1]
    for (let w = 0; w <= capacity; w++) {
      steps.push({
        description: `Considering item ${i} (${currentItem.weight}w, ${currentItem.value}v) for capacity ${w}.`,
        dpTable: dpTable.map((row) => [...row]),
        items,
        capacity,
        currentItemIndex: i - 1,
        currentWeight: w,
        phase: "filling_table",
      })

      if (currentItem.weight <= w) {
        // Option 1: Include the current item
        const valueWithItem = currentItem.value + dpTable[i - 1][w - currentItem.weight]
        // Option 2: Exclude the current item
        const valueWithoutItem = dpTable[i - 1][w]

        if (valueWithItem > valueWithoutItem) {
          dpTable[i][w] = valueWithItem
          steps.push({
            description: `Including item ${i} is better (${valueWithItem} > ${valueWithoutItem}). dp[${i}][${w}] = ${dpTable[i][w]}.`,
            dpTable: dpTable.map((row) => [...row]),
            items,
            capacity,
            currentItemIndex: i - 1,
            currentWeight: w,
            includedItem: true,
            phase: "filling_table",
          })
        } else {
          dpTable[i][w] = valueWithoutItem
          steps.push({
            description: `Excluding item ${i} is better or equal (${valueWithoutItem} >= ${valueWithItem}). dp[${i}][${w}] = ${dpTable[i][w]}.`,
            dpTable: dpTable.map((row) => [...row]),
            items,
            capacity,
            currentItemIndex: i - 1,
            currentWeight: w,
            includedItem: false,
            phase: "filling_table",
          })
        }
      } else {
        // Current item's weight is more than current capacity w, so we can't include it
        dpTable[i][w] = dpTable[i - 1][w] // Value is same as without this item
        steps.push({
          description: `Item ${i} (${currentItem.weight}w) cannot fit in capacity ${w}. dp[${i}][${w}] = dp[${i - 1}][${w}] = ${dpTable[i][w]}.`,
          dpTable: dpTable.map((row) => [...row]),
          items,
          capacity,
          currentItemIndex: i - 1,
          currentWeight: w,
          includedItem: false,
          phase: "filling_table",
        })
      }
    }
  }

  const maxValue = dpTable[n][capacity]
  steps.push({
    description: `DP table filled. Maximum value is ${maxValue}. Now backtracking to find items.`,
    dpTable: dpTable.map((row) => [...row]),
    items,
    capacity,
    maxValue,
    phase: "backtracking",
  })

  // Backtrack to find selected items
  const selectedItems: KnapsackItem[] = []
  let remainingCapacity = capacity
  for (let i = n; i > 0 && remainingCapacity > 0; i--) {
    steps.push({
      description: `Backtracking: Checking item ${i}. Current max value for capacity ${remainingCapacity} is ${dpTable[i][remainingCapacity]}. Value without item ${i} is ${dpTable[i - 1][remainingCapacity]}.`,
      dpTable: dpTable.map((row) => [...row]),
      items,
      capacity,
      maxValue,
      currentItemIndex: i - 1, // Highlight item being considered for selection
      currentWeight: remainingCapacity, // Highlight column in DP table
      selectedItems: [...selectedItems],
      phase: "backtracking",
    })
    if (dpTable[i][remainingCapacity] !== dpTable[i - 1][remainingCapacity]) {
      // This item was included
      const includedItem = items[i - 1]
      selectedItems.unshift(includedItem) // Add to front as we are going backwards
      remainingCapacity -= includedItem.weight
      steps.push({
        description: `Item ${i} (${includedItem.weight}w, ${includedItem.value}v) was included. Remaining capacity: ${remainingCapacity}.`,
        dpTable: dpTable.map((row) => [...row]),
        items,
        capacity,
        maxValue,
        currentItemIndex: i - 1,
        currentWeight: remainingCapacity + includedItem.weight, // Show original capacity for this decision
        includedItem: true, // Mark as included in this step for visualization
        selectedItems: [...selectedItems],
        phase: "backtracking",
      })
    } else {
      steps.push({
        description: `Item ${i} was not included.`,
        dpTable: dpTable.map((row) => [...row]),
        items,
        capacity,
        maxValue,
        currentItemIndex: i - 1,
        currentWeight: remainingCapacity,
        includedItem: false,
        selectedItems: [...selectedItems],
        phase: "backtracking",
      })
    }
  }

  steps.push({
    description: `0/1 Knapsack complete. Max value: ${maxValue}. Selected items: ${selectedItems.map((item) => `(w:${item.weight}, v:${item.value})`).join(", ")}.`,
    dpTable: dpTable.map((row) => [...row]),
    items,
    capacity,
    maxValue,
    selectedItems: [...selectedItems],
    phase: "complete",
  })

  return steps
}
