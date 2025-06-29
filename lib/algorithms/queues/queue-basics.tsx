import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const queueBasicsExplanationContent = (
  <AlgorithmExplanation>
    <h2>Queue Data Structure - Like Waiting in Line! 🚶‍♀️🚶‍♂️</h2>
    <p>
      Have you ever waited in line at the cafeteria, movie theater, or amusement park? 
      The first person in line gets served first, and new people join at the back. 
      That's exactly how a queue works in programming!
    </p>

    <h3>What is a Queue?</h3>
    <p>
      A queue is like a waiting line where the first person who arrives gets served first. 
      It follows the "First In, First Out" (FIFO) rule - just like a fair waiting line!
    </p>

    <h3>Queue Operations (What Can We Do?):</h3>
    <ol>
      <li><strong>Enqueue:</strong> Add someone to the back of the line</li>
      <li><strong>Dequeue:</strong> Remove someone from the front of the line</li>
      <li><strong>Front/Peek:</strong> See who's first in line without removing them</li>
      <li><strong>IsEmpty:</strong> Check if the line is empty (nobody waiting)</li>
      <li><strong>Size:</strong> Count how many people are in line</li>
    </ol>

    <h3>Real-Life Examples Kids Can Understand:</h3>
    <ul>
      <li><strong>School Lunch Line:</strong> First to line up, first to get lunch</li>
      <li><strong>Playground Slide:</strong> Kids wait their turn to go down</li>
      <li><strong>Doctor's Office:</strong> Patients wait to be called in order</li>
      <li><strong>Drive-Through:</strong> Cars are served in the order they arrive</li>
      <li><strong>Boarding a Bus:</strong> First person at the stop boards first</li>
      <li><strong>Video Game Queue:</strong> Waiting to join an online game</li>
    </ul>

    <h3>How Fast Are Queue Operations?</h3>
    <ul>
      <li><strong>Enqueue (joining line):</strong> $$O(1)$$ - Super fast! Just go to the back</li>
      <li><strong>Dequeue (leaving line):</strong> $$O(1)$$ - Super fast! First person leaves</li>
      <li><strong>Front (checking who's first):</strong> $$O(1)$$ - Super fast! Just look</li>
      <li><strong>Search:</strong> $$O(n)$$ - Slow, might need to check everyone in line</li>
    </ul>

    <h3>Cool Things We Use Queues For:</h3>
    <ul>
      <li><strong>Task Scheduling:</strong> Computers decide which program runs next</li>
      <li><strong>Printing:</strong> Documents wait in line to be printed</li>
      <li><strong>Web Servers:</strong> Websites handle requests in order</li>
      <li><strong>Breadth-First Search:</strong> Exploring all neighbors before going deeper</li>
      <li><strong>Buffer Systems:</strong> Streaming videos and music</li>
      <li><strong>Call Centers:</strong> "Your call is important to us, please hold..."</li>
    </ul>

    <h3>Types of Queues:</h3>
    <ul>
      <li><strong>Simple Queue:</strong> Basic line - first in, first out</li>
      <li><strong>Circular Queue:</strong> Like musical chairs - the end connects to the beginning</li>
      <li><strong>Priority Queue:</strong> VIP line - some people get to go first based on importance</li>
      <li><strong>Dequeue (Double-ended):</strong> Can add/remove from both ends</li>
    </ul>

    <h3>Queue Rules (Important!):</h3>
    <ul>
      <li>New people always join at the BACK (rear)</li>
      <li>People only leave from the FRONT</li>
      <li>No cutting in line! (That wouldn't be fair)</li>
      <li>If the queue is empty, nobody can leave!</li>
    </ul>

    <h3>When Should You Use a Queue?</h3>
    <ul>
      <li>When you need to process things in the order they arrived</li>
      <li>When fairness is important (first come, first served)</li>
      <li>When you're managing resources (like printers or processors)</li>
      <li>When implementing breadth-first search algorithms</li>
    </ul>

    <h3>Fun Facts:</h3>
    <ul>
      <li>Your computer uses queues to manage which programs get to use the processor!</li>
      <li>When you stream a video, it uses a queue to buffer the next parts</li>
      <li>Online games use queues to match players fairly</li>
      <li>Even your keyboard has a queue for the keys you press!</li>
    </ul>

    <h3>Queue vs Stack (The Difference):</h3>
    <ul>
      <li><strong>Stack:</strong> Like a stack of plates - last in, first out (LIFO)</li>
      <li><strong>Queue:</strong> Like a waiting line - first in, first out (FIFO)</li>
    </ul>
  </AlgorithmExplanation>
)

export const queueBasicsCodeSnippets = {
  python: `# Queue Implementation in Python
from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()  # Using deque for efficient operations
    
    def enqueue(self, item):
        """Add item to the back of the queue (join the line)"""
        self.items.append(item)
        print(f"{item} joined the queue")
    
    def dequeue(self):
        """Remove and return the front item (serve the first person)"""
        if self.is_empty():
            print("Queue is empty! Nobody to serve.")
            return None
        item = self.items.popleft()  # Remove from front
        print(f"{item} was served and left the queue")
        return item
    
    def front(self):
        """Look at who's first in line without serving them"""
        if self.is_empty():
            print("Queue is empty! Nobody in line.")
            return None
        return self.items[0]  # First item
    
    def is_empty(self):
        """Check if the queue has no one waiting"""
        return len(self.items) == 0
    
    def size(self):
        """Count how many people are in the queue"""
        return len(self.items)
    
    def display(self):
        """Show everyone in the queue (front to back)"""
        if self.is_empty():
            print("Queue is empty!")
        else:
            print("Queue (front to back):", list(self.items))

# Let's simulate a ice cream shop!
print("=== Ice Cream Shop Queue ===")
ice_cream_queue = Queue()

# Kids joining the line
kids = ["Alice", "Bob", "Charlie", "Diana", "Eve"]
for kid in kids:
    ice_cream_queue.enqueue(kid)

# Show the line
ice_cream_queue.display()
print(f"Queue size: {ice_cream_queue.size()}")

# See who's first
print(f"Next customer: {ice_cream_queue.front()}")

# Serve some customers
print("\\nServing customers:")
for _ in range(3):
    ice_cream_queue.dequeue()

# Show remaining line
ice_cream_queue.display()

# More kids join
ice_cream_queue.enqueue("Frank")
ice_cream_queue.enqueue("Grace")
ice_cream_queue.display()`,

  javascript: `// Queue Implementation in JavaScript
class Queue {
    constructor() {
        this.items = [];
        this.frontIndex = 0;
    }
    
    enqueue(item) {
        this.items.push(item);
        console.log(\`\${item} joined the queue\`);
    }
    
    dequeue() {
        if (this.isEmpty()) {
            console.log("Queue is empty! Nobody to serve.");
            return null;
        }
        const item = this.items[this.frontIndex];
        this.frontIndex++;
        console.log(\`\${item} was served and left the queue\`);
        return item;
    }
    
    front() {
        if (this.isEmpty()) {
            console.log("Queue is empty! Nobody in line.");
            return null;
        }
        return this.items[this.frontIndex];
    }
    
    isEmpty() {
        return this.frontIndex >= this.items.length;
    }
    
    size() {
        return this.items.length - this.frontIndex;
    }
    
    display() {
        if (this.isEmpty()) {
            console.log("Queue is empty!");
        } else {
            const activeItems = this.items.slice(this.frontIndex);
            console.log("Queue (front to back):", activeItems);
        }
    }
}

// Movie theater example
console.log("=== Movie Theater Queue ===");
const movieQueue = new Queue();

const people = ["Alex", "Beth", "Chris", "Dana", "Evan"];
people.forEach(person => movieQueue.enqueue(person));

movieQueue.display();
console.log(\`Next customer: \${movieQueue.front()}\`);

for (let i = 0; i < 3; i++) {
    movieQueue.dequeue();
}
movieQueue.display();`,

  java: `// Queue Implementation in Java
import java.util.*;

public class QueueExample {
    static class MyQueue<T> {
        private LinkedList<T> items;
        
        public MyQueue() {
            items = new LinkedList<>();
        }
        
        public void enqueue(T item) {
            items.addLast(item);
            System.out.println(item + " joined the queue");
        }
        
        public T dequeue() {
            if (isEmpty()) {
                System.out.println("Queue is empty!");
                return null;
            }
            T item = items.removeFirst();
            System.out.println(item + " was served");
            return item;
        }
        
        public T front() {
            return isEmpty() ? null : items.getFirst();
        }
        
        public boolean isEmpty() {
            return items.isEmpty();
        }
        
        public int size() {
            return items.size();
        }
        
        public void display() {
            System.out.println("Queue: " + items);
        }
    }
    
    public static void main(String[] args) {
        MyQueue<String> restaurantQueue = new MyQueue<>();
        
        String[] orders = {"Burger", "Pizza", "Salad"};
        for (String order : orders) {
            restaurantQueue.enqueue(order);
        }
        
        restaurantQueue.display();
        restaurantQueue.dequeue();
        restaurantQueue.display();
    }
}`
} 