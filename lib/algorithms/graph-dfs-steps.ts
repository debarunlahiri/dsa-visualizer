import type { GraphNode, GraphEdge, AdjacencyList } from "./graph-bfs-steps" // Reuse types

export interface DFSStep {
  description: string
  stack: string[] // Node IDs in the stack (conceptual, for visualization)
  visited: Set<string> // Node IDs that have been visited
  currentNodeId?: string // Node ID currently being processed
  currentNeighborId?: string // Neighbor ID being checked/pushed
  path: { [nodeId: string]: string | null } // To reconstruct path (optional, shows discovery path)
  graphNodes: GraphNode[]
  graphEdges: GraphEdge[]
  isBacktracking?: boolean // True if moving up from a completed subtree
}

export function generateDFSSteps(nodes: GraphNode[], edges: GraphEdge[], startNodeId: string): DFSStep[] {
  const steps: DFSStep[] = []
  const adj: AdjacencyList = {}
  nodes.forEach((node) => (adj[node.id] = []))
  edges.forEach((edge) => {
    adj[edge.from]?.push(edge.to)
    // For undirected graph, add: adj[edge.to]?.push(edge.from);
  })

  const visited: Set<string> = new Set()
  const path: { [nodeId: string]: string | null } = {}
  nodes.forEach((node) => (path[node.id] = null))
  const recursionStackForVis: string[] = [] // For visualizing the conceptual stack

  function dfsRecursive(u: string, parentId: string | null) {
    visited.add(u)
    recursionStackForVis.push(u)
    path[u] = parentId

    steps.push({
      description: `Visiting node ${u}. Added to visited set and recursion stack.`,
      stack: [...recursionStackForVis],
      visited: new Set(visited),
      currentNodeId: u,
      path: { ...path },
      graphNodes: nodes,
      graphEdges: edges,
    })

    for (const v of adj[u] || []) {
      steps.push({
        description: `Checking neighbor ${v} of node ${u}.`,
        stack: [...recursionStackForVis],
        visited: new Set(visited),
        currentNodeId: u,
        currentNeighborId: v,
        path: { ...path },
        graphNodes: nodes,
        graphEdges: edges,
      })
      if (!visited.has(v)) {
        steps.push({
          description: `Neighbor ${v} not visited. Recursively calling DFS on ${v}.`,
          stack: [...recursionStackForVis], // Stack before recursive call for v
          visited: new Set(visited),
          currentNodeId: u, // u is still current before diving into v
          currentNeighborId: v, // v is the one being explored next
          path: { ...path },
          graphNodes: nodes,
          graphEdges: edges,
        })
        dfsRecursive(v, u)
        // After recursive call returns (backtracking from v)
        steps.push({
          description: `Returned from DFS(${v}). Backtracking to ${u}.`,
          stack: [...recursionStackForVis], // recursionStackForVis for u is active again
          visited: new Set(visited),
          currentNodeId: u, // u is current again
          path: { ...path },
          graphNodes: nodes,
          graphEdges: edges,
          isBacktracking: true,
          currentNeighborId: v, // Show which path we backtracked from
        })
      } else {
        steps.push({
          description: `Neighbor ${v} already visited. Skipping.`,
          stack: [...recursionStackForVis],
          visited: new Set(visited),
          currentNodeId: u,
          currentNeighborId: v,
          path: { ...path },
          graphNodes: nodes,
          graphEdges: edges,
        })
      }
    }
    recursionStackForVis.pop()
    steps.push({
      description: `Finished exploring neighbors of ${u}. Popping ${u} from recursion stack.`,
      stack: [...recursionStackForVis],
      visited: new Set(visited),
      currentNodeId: u, // u is being finished
      path: { ...path },
      graphNodes: nodes,
      graphEdges: edges,
      isBacktracking: true, // Indicates finishing this node's exploration
    })
  }

  steps.push({
    description: `Starting DFS from node ${startNodeId}. Initializing visited set.`,
    stack: [],
    visited: new Set(),
    path: { ...path },
    graphNodes: nodes,
    graphEdges: edges,
  })

  dfsRecursive(startNodeId, null)

  steps.push({
    description: "DFS complete.",
    stack: [],
    visited: new Set(visited),
    path: { ...path },
    graphNodes: nodes,
    graphEdges: edges,
  })
  return steps
}
