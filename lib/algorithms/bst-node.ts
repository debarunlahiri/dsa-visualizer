// Helper for BST and potentially other tree structures
export interface TreeNodeData {
  id: string
  value: number
  left: TreeNodeData | null
  right: TreeNodeData | null
  // For visualization purposes
  x?: number
  y?: number
  parentX?: number // For drawing lines
  parentY?: number // For drawing lines
  highlight?: boolean
  isNew?: boolean // To highlight newly inserted node
}

// Basic BST Node creation (not a class to keep it simple for step generation)
export function createTreeNode(
  value: number,
  x?: number,
  y?: number,
  parentX?: number,
  parentY?: number,
): TreeNodeData {
  return {
    id: `node-${value}`,
    value,
    left: null,
    right: null,
    x,
    y,
    parentX,
    parentY,
  }
}
