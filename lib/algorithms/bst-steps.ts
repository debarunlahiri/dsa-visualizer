import { type TreeNodeData, createTreeNode } from "./bst-node"

export interface BSTStep {
  treeRoot: TreeNodeData | null
  description: string
  currentNodeValue?: number // Value of node being visited/compared
  insertedNodeValue?: number // Value of node just inserted
  traversalPath?: number[] // For inorder traversal visualization
  traversalHighlightValue?: number // Current node in traversal
  action:
    | "compare"
    | "traverseLeft"
    | "traverseRight"
    | "insert"
    | "startInsert"
    | "startTraversal"
    | "traversedNode"
    | "traversalComplete"
    | "idle"
}

// --- BST Insertion ---
export function generateBSTInsertSteps(root: TreeNodeData | null, value: number): BSTStep[] {
  const steps: BSTStep[] = []
  let currentRoot = root ? JSON.parse(JSON.stringify(root)) : null // Deep copy for modification

  function insertRecursive(
    node: TreeNodeData | null,
    val: number,
    x = 0,
    y = 0,
    parentX?: number,
    parentY?: number,
    level = 0,
  ): TreeNodeData {
    const stepRootCopy = currentRoot ? JSON.parse(JSON.stringify(currentRoot)) : null

    if (!node) {
      const newNode = createTreeNode(val, x, y, parentX, parentY)
      newNode.isNew = true // Mark as new for initial highlight
      steps.push({
        treeRoot: stepRootCopy, // State *before* insertion
        description: `Node is null. Inserting ${val}.`,
        currentNodeValue: parentX !== undefined && parentY !== undefined ? findNodeByPos(stepRootCopy, parentX, parentY)?.value : undefined, // Highlight parent
        insertedNodeValue: val,
        action: "insert",
      })
      return newNode
    }

    steps.push({
      treeRoot: stepRootCopy,
      description: `Comparing ${val} with ${node.value}.`,
      currentNodeValue: node.value,
      action: "compare",
    })

    if (val < node.value) {
      steps.push({
        treeRoot: stepRootCopy,
        description: `${val} < ${node.value}. Traversing left.`,
        currentNodeValue: node.value,
        action: "traverseLeft",
      })
      node.left = insertRecursive(node.left, val, x - 50 / (level + 1.5), y + 60, node.x, node.y, level + 1)
    } else if (val > node.value) {
      steps.push({
        treeRoot: stepRootCopy,
        description: `${val} > ${node.value}. Traversing right.`,
        currentNodeValue: node.value,
        action: "traverseRight",
      })
      node.right = insertRecursive(node.right, val, x + 50 / (level + 1.5), y + 60, node.x, node.y, level + 1)
    } else {
      // Value already exists
      steps.push({
        treeRoot: stepRootCopy,
        description: `${val} already exists in the tree. No insertion.`,
        currentNodeValue: node.value,
        action: "idle", // Or some 'duplicate' action
      })
      return node // No change
    }
    return node
  }

  // Helper to find node by original position if needed for highlighting parent during insertion
  function findNodeByPos(node: TreeNodeData | null, x: number, y: number): TreeNodeData | null {
    if (!node) return null
    if (node.x === x && node.y === y) return node
    return findNodeByPos(node.left, x, y) || findNodeByPos(node.right, x, y)
  }

  steps.push({
    treeRoot: currentRoot,
    description: `Starting insertion of ${value}.`,
    action: "startInsert",
  })

  // Assign initial positions if root is null
  const initialX = 300 // Arbitrary starting X for root
  const initialY = 50 // Arbitrary starting Y for root

  currentRoot = insertRecursive(currentRoot, value, initialX, initialY)

  // Final step showing the tree with the new node (and remove 'isNew' highlight)
  const finalRootCopy = JSON.parse(JSON.stringify(currentRoot))
  function clearIsNew(node: TreeNodeData | null) {
    if (!node) return
    if (node.isNew) node.isNew = false
    clearIsNew(node.left)
    clearIsNew(node.right)
  }
  clearIsNew(finalRootCopy)

  steps.push({
    treeRoot: finalRootCopy,
    description: `Insertion of ${value} complete.`,
    insertedNodeValue: value, // Keep highlighting the inserted node in the final step
    action: "idle",
  })

  return steps
}

// --- BST Inorder Traversal ---
export function generateBSTInorderTraversalSteps(root: TreeNodeData | null): BSTStep[] {
  const steps: BSTStep[] = []
  const traversalPath: number[] = []
  const treeCopy = root ? JSON.parse(JSON.stringify(root)) : null // Work on a copy

  function inorderRecursive(node: TreeNodeData | null) {
    if (!node) {
      return
    }

    steps.push({
      treeRoot: treeCopy,
      description: `Visiting node ${node.value}. Checking left subtree.`,
      currentNodeValue: node.value,
      traversalPath: [...traversalPath],
      action: "traverseLeft",
    })
    inorderRecursive(node.left)

    traversalPath.push(node.value)
    steps.push({
      treeRoot: treeCopy,
      description: `Node ${node.value} added to inorder traversal. Path: [${traversalPath.join(", ")}]`,
      currentNodeValue: node.value,
      traversalPath: [...traversalPath],
      traversalHighlightValue: node.value,
      action: "traversedNode",
    })

    steps.push({
      treeRoot: treeCopy,
      description: `Visiting node ${node.value}. Checking right subtree.`,
      currentNodeValue: node.value,
      traversalPath: [...traversalPath],
      action: "traverseRight",
    })
    inorderRecursive(node.right)
  }

  if (!treeCopy) {
    steps.push({ treeRoot: null, description: "Tree is empty.", action: "idle" })
    return steps
  }

  steps.push({
    treeRoot: treeCopy,
    description: "Starting Inorder Traversal (Left-Root-Right).",
    action: "startTraversal",
  })
  inorderRecursive(treeCopy)
  steps.push({
    treeRoot: treeCopy,
    description: `Inorder Traversal complete. Path: [${traversalPath.join(", ")}]`,
    traversalPath: [...traversalPath],
    action: "traversalComplete",
  })
  return steps
}

// --- BST Preorder Traversal ---
export function generateBSTPreorderTraversalSteps(root: TreeNodeData | null): BSTStep[] {
  const steps: BSTStep[] = []
  const traversalPath: number[] = []
  const treeCopy = root ? JSON.parse(JSON.stringify(root)) : null

  function preorderRecursive(node: TreeNodeData | null) {
    if (!node) {
      return
    }

    traversalPath.push(node.value)
    steps.push({
      treeRoot: treeCopy,
      description: `Node ${node.value} added to preorder traversal (Root). Path: [${traversalPath.join(", ")}]`,
      currentNodeValue: node.value,
      traversalPath: [...traversalPath],
      traversalHighlightValue: node.value,
      action: "traversedNode",
    })

    steps.push({
      treeRoot: treeCopy,
      description: `Visiting node ${node.value}. Checking left subtree.`,
      currentNodeValue: node.value,
      traversalPath: [...traversalPath],
      action: "traverseLeft",
    })
    preorderRecursive(node.left)

    steps.push({
      treeRoot: treeCopy,
      description: `Visiting node ${node.value}. Checking right subtree.`,
      currentNodeValue: node.value,
      traversalPath: [...traversalPath],
      action: "traverseRight",
    })
    preorderRecursive(node.right)
  }

  if (!treeCopy) {
    steps.push({ treeRoot: null, description: "Tree is empty.", action: "idle" })
    return steps
  }

  steps.push({
    treeRoot: treeCopy,
    description: "Starting Preorder Traversal (Root-Left-Right).",
    action: "startTraversal",
  })
  preorderRecursive(treeCopy)
  steps.push({
    treeRoot: treeCopy,
    description: `Preorder Traversal complete. Path: [${traversalPath.join(", ")}]`,
    traversalPath: [...traversalPath],
    action: "traversalComplete",
  })
  return steps
}

// --- BST Postorder Traversal ---
export function generateBSTPostorderTraversalSteps(root: TreeNodeData | null): BSTStep[] {
  const steps: BSTStep[] = []
  const traversalPath: number[] = []
  const treeCopy = root ? JSON.parse(JSON.stringify(root)) : null

  function postorderRecursive(node: TreeNodeData | null) {
    if (!node) {
      return
    }

    steps.push({
      treeRoot: treeCopy,
      description: `Visiting node ${node.value}. Checking left subtree.`,
      currentNodeValue: node.value,
      traversalPath: [...traversalPath],
      action: "traverseLeft",
    })
    postorderRecursive(node.left)

    steps.push({
      treeRoot: treeCopy,
      description: `Visiting node ${node.value}. Checking right subtree.`,
      currentNodeValue: node.value,
      traversalPath: [...traversalPath],
      action: "traverseRight",
    })
    postorderRecursive(node.right)

    traversalPath.push(node.value)
    steps.push({
      treeRoot: treeCopy,
      description: `Node ${node.value} added to postorder traversal (Root). Path: [${traversalPath.join(", ")}]`,
      currentNodeValue: node.value,
      traversalPath: [...traversalPath],
      traversalHighlightValue: node.value,
      action: "traversedNode",
    })
  }

  if (!treeCopy) {
    steps.push({ treeRoot: null, description: "Tree is empty.", action: "idle" })
    return steps
  }

  steps.push({
    treeRoot: treeCopy,
    description: "Starting Postorder Traversal (Left-Right-Root).",
    action: "startTraversal",
  })
  postorderRecursive(treeCopy)
  steps.push({
    treeRoot: treeCopy,
    description: `Postorder Traversal complete. Path: [${traversalPath.join(", ")}]`,
    traversalPath: [...traversalPath],
    action: "traversalComplete",
  })
  return steps
}
