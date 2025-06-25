import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const arrayBasicsExplanationContent = (
  <AlgorithmExplanation>
    <h2>Array Fundamentals</h2>
    <p>
      Arrays are one of the most fundamental data structures in computer science. They store elements in contiguous memory locations, 
      allowing constant-time access to any element by its index. Arrays form the building blocks for many other data structures 
      and algorithms.
    </p>

    <h3>How Arrays Work:</h3>
    <ol>
      <li><strong>Contiguous Memory:</strong> Elements are stored in consecutive memory locations</li>
      <li><strong>Indexing:</strong> Each element has a unique index (typically 0-based)</li>
      <li><strong>Random Access:</strong> Any element can be accessed directly using its index</li>
      <li><strong>Fixed Size:</strong> Static arrays have a predetermined size that cannot be changed at runtime</li>
    </ol>

    <h3>Types of Arrays:</h3>
    <ul>
      <li><strong>Static Arrays:</strong> Fixed size determined at compile time</li>
      <li><strong>Dynamic Arrays:</strong> Size can grow/shrink during runtime (e.g., JavaScript arrays, Python lists, Java ArrayList)</li>
      <li><strong>Multi-dimensional Arrays:</strong> Arrays of arrays, useful for matrices and tables</li>
    </ul>

    <h3>Time Complexity:</h3>
    <ul>
      <li><strong>Access:</strong> $$O(1)$$ - Direct index access</li>
      <li><strong>Search:</strong> $$O(n)$$ - Linear search through unsorted array</li>
      <li><strong>Insertion:</strong> $$O(n)$$ - May need to shift elements</li>
      <li><strong>Deletion:</strong> $$O(n)$$ - May need to shift elements</li>
    </ul>

    <h3>Space Complexity:</h3>
    <p>$$O(n)$$ where n is the number of elements</p>

    <h3>Real-World Use Cases:</h3>
    <ul>
      <li><strong>Database Systems:</strong> Storing records in tables, indexing for quick lookups</li>
      <li><strong>Image Processing:</strong> Pixel data representation (2D arrays for images, 3D for videos)</li>
      <li><strong>Gaming:</strong> Game boards (chess, tic-tac-toe), tile maps, inventory systems</li>
      <li><strong>Financial Applications:</strong> Stock prices over time, portfolio management</li>
      <li><strong>Scientific Computing:</strong> Mathematical matrices, experimental data points</li>
      <li><strong>Web Development:</strong> Form data, API responses, user lists</li>
      <li><strong>Mobile Apps:</strong> Contact lists, photo galleries, message threads</li>
      <li><strong>Operating Systems:</strong> Process tables, memory management, file systems</li>
    </ul>

    <h3>Common Array Operations:</h3>
    <ul>
      <li><strong>Traversal:</strong> Visiting each element exactly once</li>
      <li><strong>Searching:</strong> Finding specific elements or values</li>
      <li><strong>Sorting:</strong> Arranging elements in order</li>
      <li><strong>Insertion/Deletion:</strong> Adding or removing elements</li>
      <li><strong>Merging:</strong> Combining multiple arrays</li>
    </ul>

    <h3>Advantages:</h3>
    <ul>
      <li>Fast access to elements by index</li>
      <li>Memory efficient (no extra pointers)</li>
      <li>Cache-friendly due to spatial locality</li>
      <li>Simple to understand and implement</li>
    </ul>

    <h3>Disadvantages:</h3>
    <ul>
      <li>Fixed size in static arrays</li>
      <li>Expensive insertions and deletions</li>
      <li>Wasted memory if not fully utilized</li>
      <li>No built-in bounds checking in some languages</li>
    </ul>

    <h3>When to Use Arrays:</h3>
    <ul>
      <li>When you need frequent random access to elements</li>
      <li>When memory usage is a concern</li>
      <li>When implementing other data structures</li>
      <li>When dealing with mathematical computations</li>
      <li>When the size of data is known in advance</li>
    </ul>
  </AlgorithmExplanation>
)

export const arrayBasicsCodeSnippets = {
  python: `# Array Basics in Python
# Python uses lists which are dynamic arrays

# Creating arrays
numbers = [1, 2, 3, 4, 5]
strings = ["apple", "banana", "cherry"]
mixed = [1, "hello", 3.14, True]

# Array operations
print("Original array:", numbers)

# Access elements (O(1))
first_element = numbers[0]  # 1
last_element = numbers[-1]  # 5 (negative indexing)

# Modify elements (O(1))
numbers[0] = 10
print("After modification:", numbers)

# Length of array
size = len(numbers)
print("Array size:", size)

# Add elements
numbers.append(6)        # Add to end (O(1) amortized)
numbers.insert(0, 0)     # Insert at beginning (O(n))
print("After additions:", numbers)

# Remove elements
numbers.pop()            # Remove last element (O(1))
numbers.remove(10)       # Remove specific value (O(n))
print("After removals:", numbers)

# Traversal
print("Traversal:")
for i, value in enumerate(numbers):
    print(f"Index {i}: {value}")

# Search
target = 3
if target in numbers:
    index = numbers.index(target)
    print(f"Found {target} at index {index}")

# Slicing
subset = numbers[1:4]  # Elements from index 1 to 3
print("Subset:", subset)

# 2D Array (Matrix)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print("Matrix element at (1,1):", matrix[1][1])  # 5

# Array comprehension
squares = [x**2 for x in range(5)]
print("Squares:", squares)`,

  javascript: `// Array Basics in JavaScript
// JavaScript arrays are dynamic and can hold mixed types

// Creating arrays
let numbers = [1, 2, 3, 4, 5];
let strings = ["apple", "banana", "cherry"];
let mixed = [1, "hello", 3.14, true];

console.log("Original array:", numbers);

// Access elements (O(1))
let firstElement = numbers[0];  // 1
let lastElement = numbers[numbers.length - 1];  // 5

// Modify elements (O(1))
numbers[0] = 10;
console.log("After modification:", numbers);

// Length of array
let size = numbers.length;
console.log("Array size:", size);

// Add elements
numbers.push(6);        // Add to end (O(1) amortized)
numbers.unshift(0);     // Add to beginning (O(n))
console.log("After additions:", numbers);

// Remove elements
numbers.pop();          // Remove last element (O(1))
numbers.shift();        // Remove first element (O(n))
console.log("After removals:", numbers);

// Traversal methods
console.log("Traversal:");
numbers.forEach((value, index) => {
    console.log(\`Index \${index}: \${value}\`);
});

// Search
let target = 3;
let index = numbers.indexOf(target);
if (index !== -1) {
    console.log(\`Found \${target} at index \${index}\`);
}

// Array methods
let doubled = numbers.map(x => x * 2);
console.log("Doubled:", doubled);

let evens = numbers.filter(x => x % 2 === 0);
console.log("Even numbers:", evens);

let sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("Sum:", sum);

// Slicing
let subset = numbers.slice(1, 4);  // Elements from index 1 to 3
console.log("Subset:", subset);

// 2D Array (Matrix)
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log("Matrix element at (1,1):", matrix[1][1]);  // 5

// Spread operator
let copy = [...numbers];
let combined = [...numbers, ...strings];
console.log("Combined:", combined);`,

  java: `// Array Basics in Java
import java.util.*;

public class ArrayBasics {
    public static void main(String[] args) {
        // Creating arrays
        int[] numbers = {1, 2, 3, 4, 5};
        String[] strings = {"apple", "banana", "cherry"};
        
        System.out.println("Original array: " + Arrays.toString(numbers));
        
        // Access elements (O(1))
        int firstElement = numbers[0];  // 1
        int lastElement = numbers[numbers.length - 1];  // 5
        
        // Modify elements (O(1))
        numbers[0] = 10;
        System.out.println("After modification: " + Arrays.toString(numbers));
        
        // Length of array
        int size = numbers.length;
        System.out.println("Array size: " + size);
        
        // Traversal
        System.out.println("Traversal:");
        for (int i = 0; i < numbers.length; i++) {
            System.out.println("Index " + i + ": " + numbers[i]);
        }
        
        // Enhanced for loop
        System.out.println("Enhanced for loop:");
        for (int value : numbers) {
            System.out.println("Value: " + value);
        }
        
        // Search
        int target = 3;
        int index = linearSearch(numbers, target);
        if (index != -1) {
            System.out.println("Found " + target + " at index " + index);
        }
        
        // Dynamic array using ArrayList
        ArrayList<Integer> dynamicArray = new ArrayList<>();
        dynamicArray.add(1);
        dynamicArray.add(2);
        dynamicArray.add(3);
        
        System.out.println("Dynamic array: " + dynamicArray);
        
        // ArrayList operations
        dynamicArray.add(0, 0);  // Insert at beginning
        dynamicArray.remove(Integer.valueOf(2));  // Remove specific value
        System.out.println("After operations: " + dynamicArray);
        
        // 2D Array (Matrix)
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        System.out.println("Matrix element at (1,1): " + matrix[1][1]);  // 5
        
        // Array utilities
        int[] copy = Arrays.copyOf(numbers, numbers.length);
        Arrays.sort(copy);
        System.out.println("Sorted copy: " + Arrays.toString(copy));
    }
    
    // Linear search implementation
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }
}`,

  cpp: `// Array Basics in C++
#include <iostream>
#include <vector>
#include <array>
#include <algorithm>

int main() {
    // Static array
    int numbers[5] = {1, 2, 3, 4, 5};
    std::cout << "Original array: ";
    for (int i = 0; i < 5; i++) {
        std::cout << numbers[i] << " ";
    }
    std::cout << std::endl;
    
    // Access elements (O(1))
    int firstElement = numbers[0];  // 1
    int lastElement = numbers[4];   // 5
    
    // Modify elements (O(1))
    numbers[0] = 10;
    std::cout << "After modification: ";
    for (int i = 0; i < 5; i++) {
        std::cout << numbers[i] << " ";
    }
    std::cout << std::endl;
    
    // Size of static array
    int size = sizeof(numbers) / sizeof(numbers[0]);
    std::cout << "Array size: " << size << std::endl;
    
    // Dynamic array using std::vector
    std::vector<int> dynamicArray = {1, 2, 3, 4, 5};
    std::cout << "Dynamic array: ";
    for (int value : dynamicArray) {
        std::cout << value << " ";
    }
    std::cout << std::endl;
    
    // Vector operations
    dynamicArray.push_back(6);           // Add to end (O(1) amortized)
    dynamicArray.insert(dynamicArray.begin(), 0);  // Insert at beginning (O(n))
    std::cout << "After additions: ";
    for (int value : dynamicArray) {
        std::cout << value << " ";
    }
    std::cout << std::endl;
    
    // Remove elements
    dynamicArray.pop_back();             // Remove last element (O(1))
    dynamicArray.erase(dynamicArray.begin());  // Remove first element (O(n))
    std::cout << "After removals: ";
    for (int value : dynamicArray) {
        std::cout << value << " ";
    }
    std::cout << std::endl;
    
    // Search
    int target = 3;
    auto it = std::find(dynamicArray.begin(), dynamicArray.end(), target);
    if (it != dynamicArray.end()) {
        int index = std::distance(dynamicArray.begin(), it);
        std::cout << "Found " << target << " at index " << index << std::endl;
    }
    
    // 2D Array (Matrix)
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    std::cout << "Matrix element at (1,1): " << matrix[1][1] << std::endl;  // 5
    
    // std::array (C++11)
    std::array<int, 5> stdArray = {1, 2, 3, 4, 5};
    std::cout << "std::array size: " << stdArray.size() << std::endl;
    
    // Sorting
    std::sort(dynamicArray.begin(), dynamicArray.end());
    std::cout << "Sorted array: ";
    for (int value : dynamicArray) {
        std::cout << value << " ";
    }
    std::cout << std::endl;
    
    return 0;
}`
} 