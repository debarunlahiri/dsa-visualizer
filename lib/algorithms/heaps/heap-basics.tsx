import React from 'react';

export const heapBasicsExplanationContent = (
  <div className="space-y-6">
    <section>
      <h2 className="text-2xl font-bold text-blue-600 mb-4">🏥 What is a Heap? (Priority Queue)</h2>
      <div className="bg-blue-50 p-6 rounded-lg">
        <p className="text-lg mb-4">
          Imagine you're at a hospital emergency room. When patients arrive, they don't get treated in the order they came in (like a regular line). 
          Instead, the most urgent cases go first! A broken arm waits while a heart attack gets immediate attention.
        </p>
        <p className="text-lg mb-4">
          A <strong>Heap</strong> (also called a Priority Queue) works exactly like this hospital system. It's a special tree where:
        </p>
        <ul className="list-disc list-inside text-lg space-y-2">
          <li>🔴 <strong>Most important item is always at the top</strong> (like the most urgent patient)</li>
          <li>🔄 <strong>When you take the top item, the next most important moves up</strong></li>
          <li>➕ <strong>When you add a new item, it finds its correct priority position</strong></li>
        </ul>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-green-600 mb-3">🌳 How Does a Heap Look?</h3>
      <div className="bg-green-50 p-4 rounded-lg">
        <p className="mb-3">A heap is a <strong>complete binary tree</strong> with a special rule:</p>
        <div className="bg-white p-4 rounded border-l-4 border-green-500">
          <p className="font-mono text-lg">
            📊 <strong>Max Heap:</strong> Parent ≥ Children (biggest on top)<br/>
            📊 <strong>Min Heap:</strong> Parent ≤ Children (smallest on top)
          </p>
        </div>
        <p className="mt-3 text-sm text-gray-600">
          Think of it like a family tree where the boss (parent) always has higher priority than their employees (children)!
        </p>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-purple-600 mb-3">🎮 Real-World Examples</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-bold text-purple-700 mb-2">🏥 Hospital Emergency Room</h4>
          <ul className="text-sm space-y-1">
            <li>• Heart attack patients (Priority 1)</li>
            <li>• Broken bones (Priority 2)</li>
            <li>• Common cold (Priority 3)</li>
          </ul>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-bold text-purple-700 mb-2">💻 Operating System Tasks</h4>
          <ul className="text-sm space-y-1">
            <li>• System critical tasks (High priority)</li>
            <li>• User applications (Medium priority)</li>
            <li>• Background updates (Low priority)</li>
          </ul>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-bold text-purple-700 mb-2">🎯 Video Game AI</h4>
          <ul className="text-sm space-y-1">
            <li>• Attack enemy (High priority)</li>
            <li>• Collect items (Medium priority)</li>
            <li>• Wander around (Low priority)</li>
          </ul>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-bold text-purple-700 mb-2">📧 Email System</h4>
          <ul className="text-sm space-y-1">
            <li>• Urgent emails (High priority)</li>
            <li>• Work emails (Medium priority)</li>
            <li>• Newsletter (Low priority)</li>
          </ul>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-orange-600 mb-3">⚡ Key Operations</h3>
      <div className="space-y-4">
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="font-bold text-orange-700 mb-2">1. 👆 Peek/Top - "Who's Next?"</h4>
          <p>Look at the most important item without removing it. Like checking who's next in the emergency room.</p>
          <p className="text-sm text-gray-600 mt-1">⏰ Time: O(1) - Super fast!</p>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="font-bold text-orange-700 mb-2">2. 🏆 Extract Max/Min - "Take the Most Important"</h4>
          <p>Remove and return the most important item. The next most important automatically moves to the top.</p>
          <p className="text-sm text-gray-600 mt-1">⏰ Time: O(log n) - Pretty fast!</p>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="font-bold text-orange-700 mb-2">3. ➕ Insert - "Add New Item"</h4>
          <p>Add a new item and let it "bubble up" to find its correct position based on priority.</p>
          <p className="text-sm text-gray-600 mt-1">⏰ Time: O(log n) - Pretty fast!</p>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-red-600 mb-3">🎯 Why Use Heaps?</h3>
      <div className="bg-red-50 p-4 rounded-lg">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold text-red-700 mb-2">✅ Advantages</h4>
            <ul className="text-sm space-y-1">
              <li>• Always know the most important item</li>
              <li>• Fast insertion and removal</li>
              <li>• Great for priority-based systems</li>
              <li>• Memory efficient</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-red-700 mb-2">❌ Disadvantages</h4>
            <ul className="text-sm space-y-1">
              <li>• Can't search for specific items easily</li>
              <li>• No random access to elements</li>
              <li>• Only care about the "most important"</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-indigo-600 mb-3">🔍 Step-by-Step Example</h3>
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h4 className="font-bold mb-2">Building a Max Heap with Numbers: [4, 1, 3, 2, 16, 9, 10, 14, 8, 7]</h4>
        <div className="space-y-3 text-sm font-mono">
          <div className="bg-white p-2 rounded">
            <strong>Step 1:</strong> Start with 4<br/>
            <code>    4</code>
          </div>
          <div className="bg-white p-2 rounded">
            <strong>Step 2:</strong> Add 1 (smaller than 4, so goes as child)<br/>
            <code>    4<br/>   /</code><br/>
            <code>  1</code>
          </div>
          <div className="bg-white p-2 rounded">
            <strong>Step 3:</strong> Add 3 (smaller than 4, so goes as right child)<br/>
            <code>    4<br/>   / \</code><br/>
            <code>  1   3</code>
          </div>
          <div className="bg-white p-2 rounded">
            <strong>Step 4:</strong> Add 16 (bigger than 4, so bubbles up to top!)<br/>
            <code>   16<br/>   / \</code><br/>
            <code>  4   3<br/> /</code><br/>
            <code>1</code>
          </div>
          <p className="text-gray-600 mt-2">...and so on! The heap maintains its property that parents are always ≥ children.</p>
        </div>
      </div>
    </section>
  </div>
);

export const heapBasicsCodeSnippets = {
  python: `import heapq

# Python has a built-in min heap (heapq)
# For max heap, we can use negative values

class PriorityQueue:
    def __init__(self):
        self.heap = []
    
    def push(self, item, priority):
        """Add item with priority (lower number = higher priority)"""
        heapq.heappush(self.heap, (priority, item))
        print(f"Added: {item} with priority {priority}")
    
    def pop(self):
        """Remove and return highest priority item"""
        if self.heap:
            priority, item = heapq.heappop(self.heap)
            print(f"Removed: {item} (priority {priority})")
            return item
        return None
    
    def peek(self):
        """Look at highest priority item without removing"""
        if self.heap:
            return self.heap[0][1]
        return None
    
    def is_empty(self):
        return len(self.heap) == 0

# Example: Hospital Emergency Room
print("🏥 Hospital Emergency Room System")
print("=" * 40)

hospital = PriorityQueue()

# Add patients (lower number = more urgent)
hospital.push("Heart Attack Patient", 1)  # Most urgent
hospital.push("Broken Arm Patient", 3)   # Less urgent
hospital.push("Common Cold Patient", 5)   # Least urgent
hospital.push("Car Accident Patient", 1) # Most urgent

print("\nTreating patients in order of urgency:")
while not hospital.is_empty():
    next_patient = hospital.pop()
    print(f"Now treating: {next_patient}")

# Example: Simple Max Heap using negative values
print("\n🔢 Max Heap Example")
print("=" * 30)

max_heap = []
numbers = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7]

print("Building max heap...")
for num in numbers:
    # Use negative values to simulate max heap
    heapq.heappush(max_heap, -num)
    print(f"Added {num}, current max: {-max_heap[0]}")

print("\nExtracting elements in descending order:")
while max_heap:
    max_val = -heapq.heappop(max_heap)
    print(f"Extracted: {max_val}")`,

  javascript: `// Priority Queue (Heap) Implementation in JavaScript
class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    
    // Helper methods
    getLeftChildIndex(parentIndex) { return 2 * parentIndex + 1; }
    getRightChildIndex(parentIndex) { return 2 * parentIndex + 2; }
    getParentIndex(childIndex) { return Math.floor((childIndex - 1) / 2); }
    
    hasLeftChild(index) { return this.getLeftChildIndex(index) < this.heap.length; }
    hasRightChild(index) { return this.getRightChildIndex(index) < this.heap.length; }
    hasParent(index) { return this.getParentIndex(index) >= 0; }
    
    leftChild(index) { return this.heap[this.getLeftChildIndex(index)]; }
    rightChild(index) { return this.heap[this.getRightChildIndex(index)]; }
    parent(index) { return this.heap[this.getParentIndex(index)]; }
    
    swap(indexOne, indexTwo) {
        [this.heap[indexOne], this.heap[indexTwo]] = 
        [this.heap[indexTwo], this.heap[indexOne]];
    }
    
    peek() {
        if (this.heap.length === 0) return null;
        return this.heap[0];
    }
    
    // Remove and return the minimum element (root of min heap)
    poll() {
        if (this.heap.length === 0) return null;
        
        const item = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();
        return item;
    }
    
    // Add a new element
    add(item) {
        this.heap.push(item);
        this.heapifyUp();
    }
    
    heapifyUp() {
        let index = this.heap.length - 1;
        while (this.hasParent(index) && 
               this.parent(index).priority > this.heap[index].priority) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }
    
    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.hasRightChild(index) && 
                this.rightChild(index).priority < this.leftChild(index).priority) {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            
            if (this.heap[index].priority < this.heap[smallerChildIndex].priority) {
                break;
            } else {
                this.swap(index, smallerChildIndex);
            }
            index = smallerChildIndex;
        }
    }
}

// Example: Task Management System
console.log("💻 Task Management System");
console.log("=".repeat(40));

const taskQueue = new PriorityQueue();

// Add tasks (lower number = higher priority)
taskQueue.add({task: "Fix critical bug", priority: 1});
taskQueue.add({task: "Review code", priority: 3});
taskQueue.add({task: "Update documentation", priority: 5});
taskQueue.add({task: "Security patch", priority: 1});

console.log("Processing tasks in order of priority:");
while (taskQueue.heap.length > 0) {
    const nextTask = taskQueue.poll();
    console.log(\`Doing: \${nextTask.task} (priority \${nextTask.priority})\`);
}`,

  java: `import java.util.*;

// Java has built-in PriorityQueue (min heap by default)
public class HeapExample {
    
    // Custom class for priority queue items
    static class Task implements Comparable<Task> {
        String description;
        int priority;
        
        public Task(String description, int priority) {
            this.description = description;
            this.priority = priority;
        }
        
        @Override
        public int compareTo(Task other) {
            return Integer.compare(this.priority, other.priority);
        }
        
        @Override
        public String toString() {
            return description + " (priority " + priority + ")";
        }
    }
    
    public static void main(String[] args) {
        System.out.println("🏥 Hospital Emergency Room System");
        System.out.println("=".repeat(40));
        
        // Min heap for emergency room (lower number = higher priority)
        PriorityQueue<Task> emergencyRoom = new PriorityQueue<>();
        
        // Add patients
        emergencyRoom.add(new Task("Heart Attack Patient", 1));
        emergencyRoom.add(new Task("Broken Arm Patient", 3));
        emergencyRoom.add(new Task("Common Cold Patient", 5));
        emergencyRoom.add(new Task("Car Accident Patient", 1));
        
        System.out.println("Treating patients in order of urgency:");
        while (!emergencyRoom.isEmpty()) {
            Task nextPatient = emergencyRoom.poll();
            System.out.println("Now treating: " + nextPatient);
        }
        
        System.out.println("\n🔢 Max Heap Example");
        System.out.println("=".repeat(30));
        
        // Max heap using Collections.reverseOrder()
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        int[] numbers = {4, 1, 3, 2, 16, 9, 10, 14, 8, 7};
        
        System.out.println("Building max heap...");
        for (int num : numbers) {
            maxHeap.add(num);
            System.out.println("Added " + num + ", current max: " + maxHeap.peek());
        }
        
        System.out.println("\nExtracting elements in descending order:");
        while (!maxHeap.isEmpty()) {
            int max = maxHeap.poll();
            System.out.println("Extracted: " + max);
        }
    }
}`
}; 