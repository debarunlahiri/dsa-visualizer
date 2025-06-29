import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const bfsExplanationContent = (
  <AlgorithmExplanation>
    <h2>Breadth-First Search (BFS)</h2>
    <p>
      Breadth-First Search (BFS) is a graph traversal algorithm that explores all vertices at the current depth level
      before moving on to vertices at the next depth level. It uses a queue data structure to keep track of the
      vertices to visit next.
    </p>
    <h3>How it Works:</h3>
    <ol>
      <li>Start from a given vertex (source node) and add it to a queue.</li>
      <li>Mark the source vertex as visited.</li>
      <li>While the queue is not empty:
        <ul>
          <li>Dequeue a vertex from the front of the queue.</li>
          <li>For each unvisited adjacent vertex of the dequeued vertex:
            <ul>
              <li>Mark it as visited.</li>
              <li>Enqueue it.</li>
            </ul>
          </li>
        </ul>
      </li>
    </ol>
    <h3>Applications:</h3>
    <ul>
      <li>Finding the shortest path in an unweighted graph</li>
      <li>Level-order traversal of trees</li>
      <li>Finding connected components</li>
      <li>Web crawling</li>
      <li>Social networking (finding connections)</li>
    </ul>
    <h3>Time Complexity:</h3>
    <p>$$O(V + E)$$ where V is the number of vertices and E is the number of edges.</p>
    <h3>Space Complexity:</h3>
    <p>$$O(V)$$ for the visited array and the queue.</p>
  </AlgorithmExplanation>
)

export const bfsCodeSnippets = {
  python: `from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    result = []
    
    while queue:
        vertex = queue.popleft()
        result.append(vertex)
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result

def bfs_shortest_path(graph, start, end):
    if start == end:
        return [start]
    
    visited = set([start])
    queue = deque([(start, [start])])
    
    while queue:
        vertex, path = queue.popleft()
        
        for neighbor in graph[vertex]:
            if neighbor == end:
                return path + [neighbor]
            elif neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    
    return None  # No path found`,
  javascript: `function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);
  const result = [];
  
  while (queue.length > 0) {
    const vertex = queue.shift();
    result.push(vertex);
    
    for (const neighbor of graph[vertex] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}

function bfsShortestPath(graph, start, end) {
  if (start === end) return [start];
  
  const visited = new Set([start]);
  const queue = [[start, [start]]];
  
  while (queue.length > 0) {
    const [vertex, path] = queue.shift();
    
    for (const neighbor of graph[vertex] || []) {
      if (neighbor === end) {
        return [...path, neighbor];
      } else if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }
  
  return null; // No path found
}`,
  typescript: `function bfs(graph: Record<string, string[]>, start: string): string[] {
  const visited = new Set<string>();
  const queue: string[] = [start];
  visited.add(start);
  const result: string[] = [];
  
  while (queue.length > 0) {
    const vertex = queue.shift()!;
    result.push(vertex);
    
    for (const neighbor of graph[vertex] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}

function bfsShortestPath(graph: Record<string, string[]>, start: string, end: string): string[] | null {
  if (start === end) return [start];
  
  const visited = new Set<string>([start]);
  const queue: [string, string[]][] = [[start, [start]]];
  
  while (queue.length > 0) {
    const [vertex, path] = queue.shift()!;
    
    for (const neighbor of graph[vertex] || []) {
      if (neighbor === end) {
        return [...path, neighbor];
      } else if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }
  
  return null; // No path found
}`,

  java: `import java.util.*;

public class BFS {
    // Basic BFS traversal
    public static List<Integer> bfs(Map<Integer, List<Integer>> graph, int start) {
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();
        List<Integer> result = new ArrayList<>();
        
        queue.offer(start);
        visited.add(start);
        
        while (!queue.isEmpty()) {
            int vertex = queue.poll();
            result.add(vertex);
            
            for (int neighbor : graph.getOrDefault(vertex, new ArrayList<>())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.offer(neighbor);
                }
            }
        }
        
        return result;
    }
    
    // BFS shortest path
    public static List<Integer> bfsShortestPath(Map<Integer, List<Integer>> graph, int start, int end) {
        if (start == end) return Arrays.asList(start);
        
        Set<Integer> visited = new HashSet<>(Arrays.asList(start));
        Queue<List<Integer>> queue = new LinkedList<>();
        queue.offer(Arrays.asList(start));
        
        while (!queue.isEmpty()) {
            List<Integer> path = queue.poll();
            int vertex = path.get(path.size() - 1);
            
            for (int neighbor : graph.getOrDefault(vertex, new ArrayList<>())) {
                if (neighbor == end) {
                    List<Integer> newPath = new ArrayList<>(path);
                    newPath.add(neighbor);
                    return newPath;
                } else if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    List<Integer> newPath = new ArrayList<>(path);
                    newPath.add(neighbor);
                    queue.offer(newPath);
                }
            }
        }
        
        return null; // No path found
    }
}`,

  cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <unordered_set>
#include <unordered_map>

class BFS {
public:
    // Basic BFS traversal
    static std::vector<int> bfs(const std::unordered_map<int, std::vector<int>>& graph, int start) {
        std::unordered_set<int> visited;
        std::queue<int> queue;
        std::vector<int> result;
        
        queue.push(start);
        visited.insert(start);
        
        while (!queue.empty()) {
            int vertex = queue.front();
            queue.pop();
            result.push_back(vertex);
            
            auto it = graph.find(vertex);
            if (it != graph.end()) {
                for (int neighbor : it->second) {
                    if (visited.find(neighbor) == visited.end()) {
                        visited.insert(neighbor);
                        queue.push(neighbor);
                    }
                }
            }
        }
        
        return result;
    }
}`,

  csharp: `using System;
using System.Collections.Generic;

public class BFS 
{
    public static List<int> BfsTraversal(Dictionary<int, List<int>> graph, int start) 
    {
        HashSet<int> visited = new HashSet<int>();
        Queue<int> queue = new Queue<int>();
        List<int> result = new List<int>();
        
        queue.Enqueue(start);
        visited.Add(start);
        
        while (queue.Count > 0) 
        {
            int vertex = queue.Dequeue();
            result.Add(vertex);
            
            if (graph.ContainsKey(vertex)) 
            {
                foreach (int neighbor in graph[vertex]) 
                {
                    if (!visited.Contains(neighbor)) 
                    {
                        visited.Add(neighbor);
                        queue.Enqueue(neighbor);
                    }
                }
            }
        }
        
        return result;
    }
}`,

  php: `<?php
class BFS {
    public static function bfs($graph, $start) {
        $visited = [];
        $queue = [$start];
        $result = [];
        $visited[$start] = true;
        
        while (!empty($queue)) {
            $vertex = array_shift($queue);
            $result[] = $vertex;
            
            if (isset($graph[$vertex])) {
                foreach ($graph[$vertex] as $neighbor) {
                    if (!isset($visited[$neighbor])) {
                        $visited[$neighbor] = true;
                        $queue[] = $neighbor;
                    }
                }
            }
        }
        
        return $result;
    }
}
?>`,

  ruby: `require 'set'

class BFS
  def self.bfs(graph, start)
    visited = Set.new
    queue = [start]
    result = []
    visited.add(start)
    
    while !queue.empty?
      vertex = queue.shift
      result << vertex
      
      if graph[vertex]
        graph[vertex].each do |neighbor|
          unless visited.include?(neighbor)
            visited.add(neighbor)
            queue << neighbor
          end
        end
      end
    end
    
    result
  end
end`,

  swift: `import Foundation

class BFS {
    static func bfs(_ graph: [Int: [Int]], _ start: Int) -> [Int] {
        var visited = Set<Int>()
        var queue = [start]
        var result: [Int] = []
        visited.insert(start)
        
        while !queue.isEmpty {
            let vertex = queue.removeFirst()
            result.append(vertex)
            
            if let neighbors = graph[vertex] {
                for neighbor in neighbors {
                    if !visited.contains(neighbor) {
                        visited.insert(neighbor)
                        queue.append(neighbor)
                    }
                }
            }
        }
        
        return result
    }
}`,

  go: `package main

func bfs(graph map[int][]int, start int) []int {
    visited := make(map[int]bool)
    queue := []int{start}
    result := []int{}
    visited[start] = true
    
    for len(queue) > 0 {
        vertex := queue[0]
        queue = queue[1:]
        result = append(result, vertex)
        
        if neighbors, ok := graph[vertex]; ok {
            for _, neighbor := range neighbors {
                if !visited[neighbor] {
                    visited[neighbor] = true
                    queue = append(queue, neighbor)
                }
            }
        }
    }
    
    return result
}`
} 