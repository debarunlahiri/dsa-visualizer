import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const dfsExplanationContent = (
  <AlgorithmExplanation>
    <h2>Depth-First Search (DFS)</h2>
    <p>
      Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before
      backtracking. It uses a stack data structure (either explicitly or through recursion) to keep track of the
      vertices to visit next.
    </p>
    <h3>How it Works:</h3>
    <ol>
      <li>Start from a given vertex (source node).</li>
      <li>Mark the current vertex as visited.</li>
      <li>
        For each unvisited adjacent vertex of the current vertex, recursively perform DFS (or use a stack in the
        iterative approach).
      </li>
      <li>Backtrack when no more unvisited adjacent vertices are available.</li>
    </ol>
    <h3>Applications:</h3>
    <ul>
      <li>Finding connected components in a graph</li>
      <li>Topological sorting</li>
      <li>Detecting cycles in a graph</li>
      <li>Path finding</li>
      <li>Solving puzzles with only one solution</li>
    </ul>
    <h3>Time Complexity:</h3>
    <p>$$O(V + E)$$ where V is the number of vertices and E is the number of edges.</p>
    <h3>Space Complexity:</h3>
    <p>$$O(V)$$ for the visited array and recursion stack (or explicit stack).</p>
  </AlgorithmExplanation>
)

export const dfsCodeSnippets = {
  python: `def dfs_recursive(graph, start, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(start)
    print(start, end=' ')
    
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)
    
    return visited

def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    
    while stack:
        vertex = stack.pop()
        if vertex not in visited:
            visited.add(vertex)
            print(vertex, end=' ')
            
            # Add neighbors to stack in reverse order
            for neighbor in reversed(graph[vertex]):
                if neighbor not in visited:
                    stack.append(neighbor)
    
    return visited`,
  javascript: `function dfsRecursive(graph, start, visited = new Set()) {
  visited.add(start);
  console.log(start);
  
  for (const neighbor of graph[start] || []) {
    if (!visited.has(neighbor)) {
      dfsRecursive(graph, neighbor, visited);
    }
  }
  
  return visited;
}

function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  
  while (stack.length > 0) {
    const vertex = stack.pop();
    if (!visited.has(vertex)) {
      visited.add(vertex);
      console.log(vertex);
      
      // Add neighbors to stack in reverse order
      const neighbors = graph[vertex] || [];
      for (let i = neighbors.length - 1; i >= 0; i--) {
        if (!visited.has(neighbors[i])) {
          stack.push(neighbors[i]);
        }
      }
    }
  }
  
  return visited;
}`,
  typescript: `function dfsRecursive(graph: Record<string, string[]>, start: string, visited: Set<string> = new Set()): Set<string> {
  visited.add(start);
  console.log(start);
  
  for (const neighbor of graph[start] || []) {
    if (!visited.has(neighbor)) {
      dfsRecursive(graph, neighbor, visited);
    }
  }
  
  return visited;
}

function dfsIterative(graph: Record<string, string[]>, start: string): Set<string> {
  const visited = new Set<string>();
  const stack: string[] = [start];
  
  while (stack.length > 0) {
    const vertex = stack.pop()!;
    if (!visited.has(vertex)) {
      visited.add(vertex);
      console.log(vertex);
      
      // Add neighbors to stack in reverse order
      const neighbors = graph[vertex] || [];
      for (let i = neighbors.length - 1; i >= 0; i--) {
        if (!visited.has(neighbors[i])) {
          stack.push(neighbors[i]);
        }
      }
    }
  }
  
  return visited;
}`,

  java: `import java.util.*;

public class DFS {
    // Recursive DFS implementation
    public static void dfsRecursive(Map<Integer, List<Integer>> graph, int start, Set<Integer> visited) {
        visited.add(start);
        System.out.print(start + " ");
        
        for (int neighbor : graph.getOrDefault(start, new ArrayList<>())) {
            if (!visited.contains(neighbor)) {
                dfsRecursive(graph, neighbor, visited);
            }
        }
    }
    
    // Iterative DFS implementation
    public static Set<Integer> dfsIterative(Map<Integer, List<Integer>> graph, int start) {
        Set<Integer> visited = new HashSet<>();
        Stack<Integer> stack = new Stack<>();
        stack.push(start);
        
        while (!stack.isEmpty()) {
            int vertex = stack.pop();
            if (!visited.contains(vertex)) {
                visited.add(vertex);
                System.out.print(vertex + " ");
                
                // Add neighbors to stack in reverse order
                List<Integer> neighbors = graph.getOrDefault(vertex, new ArrayList<>());
                for (int i = neighbors.size() - 1; i >= 0; i--) {
                    if (!visited.contains(neighbors.get(i))) {
                        stack.push(neighbors.get(i));
                    }
                }
            }
        }
        
        return visited;
    }
}`,

  cpp: `#include <iostream>
#include <vector>
#include <stack>
#include <unordered_set>
#include <unordered_map>

class DFS {
public:
    // Recursive DFS implementation
    static void dfsRecursive(const std::unordered_map<int, std::vector<int>>& graph, 
                           int start, std::unordered_set<int>& visited) {
        visited.insert(start);
        std::cout << start << " ";
        
        auto it = graph.find(start);
        if (it != graph.end()) {
            for (int neighbor : it->second) {
                if (visited.find(neighbor) == visited.end()) {
                    dfsRecursive(graph, neighbor, visited);
                }
            }
        }
    }
    
    // Iterative DFS implementation
    static std::unordered_set<int> dfsIterative(const std::unordered_map<int, std::vector<int>>& graph, int start) {
        std::unordered_set<int> visited;
        std::stack<int> stack;
        stack.push(start);
        
        while (!stack.empty()) {
            int vertex = stack.top();
            stack.pop();
            
            if (visited.find(vertex) == visited.end()) {
                visited.insert(vertex);
                std::cout << vertex << " ";
                
                auto it = graph.find(vertex);
                if (it != graph.end()) {
                    // Add neighbors to stack in reverse order
                    const auto& neighbors = it->second;
                    for (auto rit = neighbors.rbegin(); rit != neighbors.rend(); ++rit) {
                        if (visited.find(*rit) == visited.end()) {
                            stack.push(*rit);
                        }
                    }
                }
            }
        }
        
        return visited;
    }
};`,

  csharp: `using System;
using System.Collections.Generic;

public class DFS 
{
    // Recursive DFS implementation
    public static void DfsRecursive(Dictionary<int, List<int>> graph, int start, HashSet<int> visited) 
    {
        visited.Add(start);
        Console.Write(start + " ");
        
        if (graph.ContainsKey(start)) 
        {
            foreach (int neighbor in graph[start]) 
            {
                if (!visited.Contains(neighbor)) 
                {
                    DfsRecursive(graph, neighbor, visited);
                }
            }
        }
    }
    
    // Iterative DFS implementation
    public static HashSet<int> DfsIterative(Dictionary<int, List<int>> graph, int start) 
    {
        HashSet<int> visited = new HashSet<int>();
        Stack<int> stack = new Stack<int>();
        stack.Push(start);
        
        while (stack.Count > 0) 
        {
            int vertex = stack.Pop();
            if (!visited.Contains(vertex)) 
            {
                visited.Add(vertex);
                Console.Write(vertex + " ");
                
                if (graph.ContainsKey(vertex)) 
                {
                    // Add neighbors to stack in reverse order
                    List<int> neighbors = graph[vertex];
                    for (int i = neighbors.Count - 1; i >= 0; i--) 
                    {
                        if (!visited.Contains(neighbors[i])) 
                        {
                            stack.Push(neighbors[i]);
                        }
                    }
                }
            }
        }
        
        return visited;
    }
}`,

  php: `<?php
class DFS {
    // Recursive DFS implementation
    public static function dfsRecursive($graph, $start, &$visited = []) {
        $visited[$start] = true;
        echo $start . " ";
        
        if (isset($graph[$start])) {
            foreach ($graph[$start] as $neighbor) {
                if (!isset($visited[$neighbor])) {
                    self::dfsRecursive($graph, $neighbor, $visited);
                }
            }
        }
        
        return $visited;
    }
    
    // Iterative DFS implementation
    public static function dfsIterative($graph, $start) {
        $visited = [];
        $stack = [$start];
        
        while (!empty($stack)) {
            $vertex = array_pop($stack);
            if (!isset($visited[$vertex])) {
                $visited[$vertex] = true;
                echo $vertex . " ";
                
                if (isset($graph[$vertex])) {
                    // Add neighbors to stack in reverse order
                    $neighbors = array_reverse($graph[$vertex]);
                    foreach ($neighbors as $neighbor) {
                        if (!isset($visited[$neighbor])) {
                            $stack[] = $neighbor;
                        }
                    }
                }
            }
        }
        
        return $visited;
    }
}
?>`,

  ruby: `class DFS
  # Recursive DFS implementation
  def self.dfs_recursive(graph, start, visited = Set.new)
    visited.add(start)
    print "#{start} "
    
    if graph[start]
      graph[start].each do |neighbor|
        dfs_recursive(graph, neighbor, visited) unless visited.include?(neighbor)
      end
    end
    
    visited
  end
  
  # Iterative DFS implementation
  def self.dfs_iterative(graph, start)
    visited = Set.new
    stack = [start]
    
    while !stack.empty?
      vertex = stack.pop
      unless visited.include?(vertex)
        visited.add(vertex)
        print "#{vertex} "
        
        if graph[vertex]
          # Add neighbors to stack in reverse order
          graph[vertex].reverse.each do |neighbor|
            stack.push(neighbor) unless visited.include?(neighbor)
          end
        end
      end
    end
    
    visited
  end
end`,

  swift: `import Foundation

class DFS {
    // Recursive DFS implementation
    static func dfsRecursive(_ graph: [Int: [Int]], _ start: Int, _ visited: inout Set<Int>) {
        visited.insert(start)
        print("\\(start) ", terminator: "")
        
        if let neighbors = graph[start] {
            for neighbor in neighbors {
                if !visited.contains(neighbor) {
                    dfsRecursive(graph, neighbor, &visited)
                }
            }
        }
    }
    
    // Iterative DFS implementation
    static func dfsIterative(_ graph: [Int: [Int]], _ start: Int) -> Set<Int> {
        var visited = Set<Int>()
        var stack = [start]
        
        while !stack.isEmpty {
            let vertex = stack.removeLast()
            if !visited.contains(vertex) {
                visited.insert(vertex)
                print("\\(vertex) ", terminator: "")
                
                if let neighbors = graph[vertex] {
                    // Add neighbors to stack in reverse order
                    for neighbor in neighbors.reversed() {
                        if !visited.contains(neighbor) {
                            stack.append(neighbor)
                        }
                    }
                }
            }
        }
        
        return visited
    }
}`,

  go: `package main

import "fmt"

// dfsRecursive performs recursive DFS traversal
func dfsRecursive(graph map[int][]int, start int, visited map[int]bool) {
    visited[start] = true
    fmt.Printf("%d ", start)
    
    if neighbors, ok := graph[start]; ok {
        for _, neighbor := range neighbors {
            if !visited[neighbor] {
                dfsRecursive(graph, neighbor, visited)
            }
        }
    }
}

// dfsIterative performs iterative DFS traversal
func dfsIterative(graph map[int][]int, start int) map[int]bool {
    visited := make(map[int]bool)
    stack := []int{start}
    
    for len(stack) > 0 {
        vertex := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        
        if !visited[vertex] {
            visited[vertex] = true
            fmt.Printf("%d ", vertex)
            
            if neighbors, ok := graph[vertex]; ok {
                // Add neighbors to stack in reverse order
                for i := len(neighbors) - 1; i >= 0; i-- {
                    if !visited[neighbors[i]] {
                        stack = append(stack, neighbors[i])
                    }
                }
            }
        }
    }
    
         return visited
 }`
} 