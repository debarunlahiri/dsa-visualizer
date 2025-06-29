import React from "react"
import type { AlgorithmExplanation, CodeSnippet } from "../types"

export const dijkstraExplanationContent: AlgorithmExplanation = {
  introduction: (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-3">What is Dijkstra's Algorithm?</h3>
        <p className="text-gray-700">
          <strong>Dijkstra's algorithm</strong> is a graph search algorithm that finds the shortest path between 
          nodes in a weighted graph. It was conceived by Dutch computer scientist Edsger W. Dijkstra in 1956 
          and published in 1959. The algorithm works by maintaining a set of unvisited nodes and repeatedly 
          selecting the unvisited node with the smallest known distance from the source.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Key Properties</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Single-Source Shortest Path</strong> - Finds shortest paths from one source to all other vertices</li>
          <li><strong>Non-negative weights only</strong> - Cannot handle negative edge weights</li>
          <li><strong>Greedy algorithm</strong> - Always picks the closest unvisited vertex</li>
          <li><strong>Optimal</strong> - Guarantees shortest path if no negative weights</li>
          <li><strong>Time complexity</strong> - O((V + E) log V) with binary heap, O(V²) with array</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">How It Works</h3>
        <div className="bg-blue-50 p-4 rounded-lg space-y-3">
          <div><strong>1. Initialize:</strong> Set distance to source as 0, all others as infinity</div>
          <div><strong>2. Create set:</strong> Add all vertices to unvisited set</div>
          <div><strong>3. Select minimum:</strong> Pick unvisited vertex with minimum distance</div>
          <div><strong>4. Update neighbors:</strong> Calculate distances through current vertex</div>
          <div><strong>5. Mark visited:</strong> Remove current vertex from unvisited set</div>
          <div><strong>6. Repeat:</strong> Continue until all vertices are processed</div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Real-World Applications</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>GPS Navigation</strong> - Finding shortest routes between locations</li>
          <li><strong>Network routing</strong> - Internet packet routing protocols (OSPF)</li>
          <li><strong>Social networks</strong> - Finding degrees of separation</li>
          <li><strong>Flight connections</strong> - Cheapest flight paths</li>
          <li><strong>Game development</strong> - AI pathfinding in games</li>
          <li><strong>Robotics</strong> - Path planning for autonomous vehicles</li>
        </ul>
      </div>
    </div>
  ),
  
  concepts: [
    {
      title: "Relaxation Process",
      content: (
        <div>
          <p className="mb-3">The core concept in Dijkstra's algorithm:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Relaxation</strong> - Update distance if shorter path is found</li>
            <li><strong>Formula</strong> - if dist[u] + weight(u,v) &lt; dist[v], then update dist[v]</li>
            <li><strong>Greedy choice</strong> - Always relax from the closest unvisited vertex</li>
            <li><strong>Optimal substructure</strong> - Shortest path consists of shortest sub-paths</li>
          </ul>
        </div>
      )
    },
    {
      title: "Priority Queue Implementation",
      content: (
        <div>
          <p className="mb-3">Efficient implementation uses a priority queue:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Min-heap</strong> - Efficiently get vertex with minimum distance</li>
            <li><strong>Extract-min</strong> - O(log V) to get next vertex to process</li>
            <li><strong>Decrease-key</strong> - O(log V) to update distance when relaxing</li>
            <li><strong>Overall complexity</strong> - O((V + E) log V) with binary heap</li>
          </ul>
        </div>
      )
    },
    {
      title: "Limitations",
      content: (
        <div>
          <p className="mb-3">Important constraints and alternatives:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>No negative weights</strong> - Use Bellman-Ford for negative weights</li>
            <li><strong>Single source</strong> - Use Floyd-Warshall for all-pairs shortest paths</li>
            <li><strong>Dense graphs</strong> - O(V²) implementation might be better</li>
            <li><strong>A* algorithm</strong> - Better for specific target with heuristics</li>
          </ul>
        </div>
      )
    }
  ]
}

export const dijkstraCodeSnippets: CodeSnippet[] = [
  {
    title: "Dijkstra's Algorithm (Python with heapq)",
    language: "python",
    code: `import heapq
from collections import defaultdict

def dijkstra(graph, start):
    """
    Find shortest paths from start vertex to all other vertices
    graph: adjacency list representation {vertex: [(neighbor, weight), ...]}
    start: starting vertex
    Returns: (distances, previous) dictionaries
    """
    # Initialize distances and previous vertices
    distances = {vertex: float('infinity') for vertex in graph}
    previous = {vertex: None for vertex in graph}
    distances[start] = 0
    
    # Priority queue: (distance, vertex)
    pq = [(0, start)]
    visited = set()
    
    while pq:
        # Get vertex with minimum distance
        current_distance, current_vertex = heapq.heappop(pq)
        
        # Skip if we've already processed this vertex
        if current_vertex in visited:
            continue
            
        # Mark as visited
        visited.add(current_vertex)
        
        # Check all neighbors
        for neighbor, weight in graph[current_vertex]:
            if neighbor not in visited:
                # Calculate new distance through current vertex
                new_distance = current_distance + weight
                
                # If we found a shorter path, update it
                if new_distance < distances[neighbor]:
                    distances[neighbor] = new_distance
                    previous[neighbor] = current_vertex
                    heapq.heappush(pq, (new_distance, neighbor))
    
    return distances, previous

def reconstruct_path(previous, start, target):
    """Reconstruct shortest path from start to target"""
    path = []
    current = target
    
    while current is not None:
        path.append(current)
        current = previous[current]
    
    path.reverse()
    
    # Check if path exists
    if path[0] == start:
        return path
    else:
        return []  # No path exists

# Example usage
graph = {
    'A': [('B', 4), ('C', 2)],
    'B': [('C', 1), ('D', 5)],
    'C': [('D', 8), ('E', 10)],
    'D': [('E', 2)],
    'E': []
}

distances, previous = dijkstra(graph, 'A')
print("Shortest distances from A:")
for vertex, distance in distances.items():
    print(f"  A -> {vertex}: {distance}")

print("\\nShortest path from A to E:")
path = reconstruct_path(previous, 'A', 'E')
print(" -> ".join(path))`
  },
  {
    title: "Dijkstra with Path Reconstruction",
    language: "python",
    code: `class DijkstraPathfinder:
    def __init__(self):
        self.graph = defaultdict(list)
    
    def add_edge(self, from_vertex, to_vertex, weight):
        """Add weighted edge to graph"""
        self.graph[from_vertex].append((to_vertex, weight))
    
    def shortest_path(self, start, target):
        """Find shortest path and distance from start to target"""
        distances = defaultdict(lambda: float('inf'))
        previous = {}
        distances[start] = 0
        
        pq = [(0, start)]
        visited = set()
        
        while pq:
            current_dist, current = heapq.heappop(pq)
            
            if current == target:
                # Found target, reconstruct path
                path = []
                while current is not None:
                    path.append(current)
                    current = previous.get(current)
                path.reverse()
                return distances[target], path
            
            if current in visited:
                continue
                
            visited.add(current)
            
            for neighbor, weight in self.graph[current]:
                if neighbor not in visited:
                    new_dist = current_dist + weight
                    if new_dist < distances[neighbor]:
                        distances[neighbor] = new_dist
                        previous[neighbor] = current
                        heapq.heappush(pq, (new_dist, neighbor))
        
        return float('inf'), []  # No path found
    
    def all_shortest_paths(self, start):
        """Find shortest paths from start to all reachable vertices"""
        distances = defaultdict(lambda: float('inf'))
        previous = {}
        distances[start] = 0
        
        pq = [(0, start)]
        visited = set()
        
        while pq:
            current_dist, current = heapq.heappop(pq)
            
            if current in visited:
                continue
                
            visited.add(current)
            
            for neighbor, weight in self.graph[current]:
                if neighbor not in visited:
                    new_dist = current_dist + weight
                    if new_dist < distances[neighbor]:
                        distances[neighbor] = new_dist
                        previous[neighbor] = current
                        heapq.heappush(pq, (new_dist, neighbor))
        
        return dict(distances), previous

# Example: City road network
pathfinder = DijkstraPathfinder()

# Add roads (bidirectional)
roads = [
    ('New York', 'Philadelphia', 95),
    ('New York', 'Boston', 215),
    ('Philadelphia', 'Washington', 140),
    ('Philadelphia', 'Pittsburgh', 305),
    ('Boston', 'Portland', 105),
    ('Washington', 'Richmond', 110),
    ('Pittsburgh', 'Cleveland', 135),
]

for city1, city2, distance in roads:
    pathfinder.add_edge(city1, city2, distance)
    pathfinder.add_edge(city2, city1, distance)  # Bidirectional

# Find shortest path
distance, path = pathfinder.shortest_path('New York', 'Richmond')
print(f"Shortest distance from New York to Richmond: {distance} miles")
print(f"Route: {' -> '.join(path)}")

# Find all shortest paths from New York
distances, _ = pathfinder.all_shortest_paths('New York')
print("\\nShortest distances from New York:")
for city, dist in sorted(distances.items()):
    print(f"  {city}: {dist} miles")`
  },
  {
    title: "Dijkstra for Grid/2D Array",
    language: "python",
    code: `def dijkstra_grid(grid, start, target):
    """
    Find shortest path in 2D grid where each cell has a cost
    grid: 2D array where grid[i][j] is the cost to enter cell (i,j)
    start: (row, col) starting position
    target: (row, col) target position
    """
    rows, cols = len(grid), len(grid[0])
    
    # Directions: up, down, left, right
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    
    # Initialize distances
    distances = [[float('inf')] * cols for _ in range(rows)]
    previous = {}
    
    start_row, start_col = start
    distances[start_row][start_col] = grid[start_row][start_col]
    
    # Priority queue: (distance, row, col)
    pq = [(grid[start_row][start_col], start_row, start_col)]
    visited = set()
    
    while pq:
        current_dist, row, col = heapq.heappop(pq)
        
        if (row, col) == target:
            # Reconstruct path
            path = []
            current = (row, col)
            while current in previous:
                path.append(current)
                current = previous[current]
            path.append(start)
            path.reverse()
            return current_dist, path
        
        if (row, col) in visited:
            continue
            
        visited.add((row, col))
        
        # Check all 4 directions
        for dr, dc in directions:
            new_row, new_col = row + dr, col + dc
            
            # Check bounds
            if (0 <= new_row < rows and 0 <= new_col < cols and 
                (new_row, new_col) not in visited):
                
                new_dist = current_dist + grid[new_row][new_col]
                
                if new_dist < distances[new_row][new_col]:
                    distances[new_row][new_col] = new_dist
                    previous[(new_row, new_col)] = (row, col)
                    heapq.heappush(pq, (new_dist, new_row, new_col))
    
    return float('inf'), []  # No path found

# Example: Navigation with terrain costs
terrain_grid = [
    [1, 3, 1, 1, 2],
    [1, 5, 3, 1, 1],
    [1, 1, 1, 4, 1],
    [2, 3, 2, 1, 1],
    [1, 1, 1, 1, 1]
]

cost, path = dijkstra_grid(terrain_grid, (0, 0), (4, 4))
print(f"Minimum cost to reach destination: {cost}")
print(f"Path: {path}")

# Visualize path
def print_path_on_grid(grid, path):
    result = [row[:] for row in grid]  # Copy grid
    for i, (row, col) in enumerate(path):
        if i == 0:
            result[row][col] = 'S'  # Start
        elif i == len(path) - 1:
            result[row][col] = 'E'  # End
        else:
            result[row][col] = '*'  # Path
    
    for row in result:
        print(' '.join(str(cell).rjust(2) for cell in row))

print("\\nPath visualization:")
print_path_on_grid(terrain_grid, path)`
  },
  {
    title: "JavaScript Implementation",
    language: "javascript",
    code: `class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    
    push(item) {
        this.heap.push(item);
        this.heapifyUp(this.heap.length - 1);
    }
    
    pop() {
        if (this.heap.length === 0) return null;
        
        const root = this.heap[0];
        const last = this.heap.pop();
        
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.heapifyDown(0);
        }
        
        return root;
    }
    
    heapifyUp(index) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (parentIndex >= 0 && this.heap[parentIndex][0] > this.heap[index][0]) {
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            this.heapifyUp(parentIndex);
        }
    }
    
    heapifyDown(index) {
        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;
        let smallest = index;
        
        if (leftChild < this.heap.length && this.heap[leftChild][0] < this.heap[smallest][0]) {
            smallest = leftChild;
        }
        
        if (rightChild < this.heap.length && this.heap[rightChild][0] < this.heap[smallest][0]) {
            smallest = rightChild;
        }
        
        if (smallest !== index) {
            [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
            this.heapifyDown(smallest);
        }
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
}

function dijkstra(graph, start) {
    const distances = {};
    const previous = {};
    const visited = new Set();
    
    // Initialize distances
    for (const vertex in graph) {
        distances[vertex] = Infinity;
        previous[vertex] = null;
    }
    distances[start] = 0;
    
    const pq = new PriorityQueue();
    pq.push([0, start]);
    
    while (!pq.isEmpty()) {
        const [currentDistance, currentVertex] = pq.pop();
        
        if (visited.has(currentVertex)) continue;
        visited.add(currentVertex);
        
        // Check neighbors
        for (const [neighbor, weight] of graph[currentVertex] || []) {
            if (!visited.has(neighbor)) {
                const newDistance = currentDistance + weight;
                
                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                    previous[neighbor] = currentVertex;
                    pq.push([newDistance, neighbor]);
                }
            }
        }
    }
    
    return { distances, previous };
}

function getShortestPath(previous, start, target) {
    const path = [];
    let current = target;
    
    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }
    
    return path[0] === start ? path : [];
}

// Example usage
const graph = {
    'A': [['B', 4], ['C', 2]],
    'B': [['C', 1], ['D', 5]],
    'C': [['D', 8], ['E', 10]],
    'D': [['E', 2]],
    'E': []
};

const { distances, previous } = dijkstra(graph, 'A');

console.log('Shortest distances from A:');
for (const [vertex, distance] of Object.entries(distances)) {
    console.log(\`  A -> \${vertex}: \${distance}\`);
}

const path = getShortestPath(previous, 'A', 'E');
console.log(\`\\nShortest path A to E: \${path.join(' -> ')}\`);`
  }
] 