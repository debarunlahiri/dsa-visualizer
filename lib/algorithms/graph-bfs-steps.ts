// Basic Graph Representation (Adjacency List)
export interface GraphNode {
  id: string // e.g., "A", "B" or "0", "1"
  value: string | number
  x: number // For visualization
  y: number // For visualization
}

export interface GraphEdge {
  from: string // id of source node
  to: string // id of target node
  id: string // unique edge id
}

export interface AdjacencyList {
  [nodeId: string]: string[] // Key: node.id, Value: array of neighbor ids
}

export interface BFSStep {
  description: string
  queue: string[] // Node IDs in the queue
  visited: Set<string> // Node IDs that have been visited
  currentNodeId?: string // Node ID currently being processed from queue
  currentNeighborId?: string // Neighbor ID being checked
  path: { [nodeId: string]: string | null } // To reconstruct path (optional)
  graphNodes: GraphNode[] // For rendering
  graphEdges: GraphEdge[] // For rendering
}

export function generateBFSSteps(nodes: GraphNode[], edges: GraphEdge[], startNodeId: string): BFSStep[] {
  const steps: BFSStep[] = []
  const adj: AdjacencyList = {}
  nodes.forEach((node) => (adj[node.id] = []))
  edges.forEach((edge) => {
    adj[edge.from]?.push(edge.to)
    // adj[edge.to]?.push(edge.from); // For undirected graph, add this line
  })

  const queue: string[] = []
  const visited: Set<string> = new Set()
  const path: { [nodeId: string]: string | null } = {}
  nodes.forEach((node) => (path[node.id] = null))

  steps.push({
    description: `Starting BFS from node ${startNodeId}. Initializing queue and visited set.`,
    queue: [],
    visited: new Set(),
    path: { ...path },
    graphNodes: nodes,
    graphEdges: edges,
  })

  queue.push(startNodeId)
  visited.add(startNodeId)
  steps.push({
    description: `Added start node ${startNodeId} to queue. Marked as visited.`,
    queue: [...queue],
    visited: new Set(visited),
    path: { ...path },
    graphNodes: nodes,
    graphEdges: edges,
  })

  while (queue.length > 0) {
    const u = queue.shift()! // Dequeue
    steps.push({
      description: `Dequeued node ${u}. Processing its neighbors.`,
      queue: [...queue], // Queue state after dequeue
      visited: new Set(visited),
      currentNodeId: u,
      path: { ...path },
      graphNodes: nodes,
      graphEdges: edges,
    })

    for (const v of adj[u] || []) {
      steps.push({
        description: `Checking neighbor ${v} of node ${u}.`,
        queue: [...queue],
        visited: new Set(visited),
        currentNodeId: u,
        currentNeighborId: v,
        path: { ...path },
        graphNodes: nodes,
        graphEdges: edges,
      })
      if (!visited.has(v)) {
        visited.add(v)
        queue.push(v)
        path[v] = u // Store predecessor for path reconstruction
        steps.push({
          description: `Neighbor ${v} not visited. Added to queue and marked as visited. Path to ${v} via ${u}.`,
          queue: [...queue],
          visited: new Set(visited),
          currentNodeId: u,
          currentNeighborId: v, // Keep highlighting neighbor being added
          path: { ...path },
          graphNodes: nodes,
          graphEdges: edges,
        })
      } else {
        steps.push({
          description: `Neighbor ${v} already visited. Skipping.`,
          queue: [...queue],
          visited: new Set(visited),
          currentNodeId: u,
          currentNeighborId: v,
          path: { ...path },
          graphNodes: nodes,
          graphEdges: edges,
        })
      }
    }
    steps.push({
      description: `Finished processing neighbors of node ${u}.`,
      queue: [...queue],
      visited: new Set(visited),
      currentNodeId: u, // Still highlight u as done with its direct processing
      path: { ...path },
      graphNodes: nodes,
      graphEdges: edges,
    })
  }

  steps.push({
    description: "BFS complete. Queue is empty.",
    queue: [],
    visited: new Set(visited),
    path: { ...path },
    graphNodes: nodes,
    graphEdges: edges,
  })
  return steps
}
