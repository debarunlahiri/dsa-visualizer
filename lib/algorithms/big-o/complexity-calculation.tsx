import React from "react"

export const complexityCalculationExplanationContent = (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">How to Calculate Time Complexity</h3>
      <p className="text-slate-300 leading-relaxed mb-4">
        Time complexity analysis involves counting the number of operations an algorithm performs 
        relative to the input size. Follow these systematic steps:
      </p>
      
      <div className="space-y-4">
        <div className="bg-slate-800 p-4 rounded-md">
          <h4 className="text-white font-medium mb-2">Step 1: Identify Basic Operations</h4>
          <p className="text-slate-300 text-sm">
            Count fundamental operations like comparisons, assignments, arithmetic operations, 
            and function calls. Ignore constants and focus on operations that scale with input size.
          </p>
        </div>
        
        <div className="bg-slate-800 p-4 rounded-md">
          <h4 className="text-white font-medium mb-2">Step 2: Analyze Loop Structures</h4>
          <ul className="text-slate-300 text-sm space-y-1 list-disc list-inside">
            <li><span className="text-yellow-400">Single loop (1 to n):</span> O(n)</li>
            <li><span className="text-orange-400">Nested loops (n × n):</span> O(n²)</li>
            <li><span className="text-blue-400">Loop with halving (n/2 each time):</span> O(log n)</li>
            <li><span className="text-red-400">Triple nested loops:</span> O(n³)</li>
          </ul>
        </div>
        
        <div className="bg-slate-800 p-4 rounded-md">
          <h4 className="text-white font-medium mb-2">Step 3: Handle Recursive Functions</h4>
          <p className="text-slate-300 text-sm">
            Use the Master Theorem or draw recursion trees. Count recursive calls and 
            work done at each level. T(n) = a×T(n/b) + f(n) where:
          </p>
          <ul className="text-slate-300 text-sm mt-2 space-y-1 list-disc list-inside ml-4">
            <li>a = number of recursive calls</li>
            <li>n/b = size of each subproblem</li>
            <li>f(n) = work done outside recursive calls</li>
          </ul>
        </div>
        
        <div className="bg-slate-800 p-4 rounded-md">
          <h4 className="text-white font-medium mb-2">Step 4: Consider Best, Average, Worst Cases</h4>
          <p className="text-slate-300 text-sm">
            Analyze different input scenarios. For sorting algorithms, consider already sorted, 
            reverse sorted, and random data. Choose the most relevant case for your analysis.
          </p>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white mb-3">How to Calculate Space Complexity</h3>
      <p className="text-slate-300 leading-relaxed mb-4">
        Space complexity measures memory usage relative to input size. Consider both auxiliary 
        space and input space:
      </p>
      
      <div className="space-y-4">
        <div className="bg-slate-800 p-4 rounded-md">
          <h4 className="text-white font-medium mb-2">Step 1: Identify Memory Usage</h4>
          <ul className="text-slate-300 text-sm space-y-1 list-disc list-inside">
            <li><span className="text-green-400">Variables:</span> Usually O(1) unless arrays/objects</li>
            <li><span className="text-blue-400">Data structures:</span> Arrays, lists, trees, etc.</li>
            <li><span className="text-purple-400">Recursion stack:</span> Function call stack depth</li>
            <li><span className="text-yellow-400">Dynamic allocation:</span> malloc, new, etc.</li>
          </ul>
        </div>
        
        <div className="bg-slate-800 p-4 rounded-md">
          <h4 className="text-white font-medium mb-2">Step 2: Count Auxiliary Space</h4>
          <p className="text-slate-300 text-sm">
            Auxiliary space excludes input size. Count extra memory used by algorithm:
            temporary arrays, recursion stack, hash tables, etc.
          </p>
        </div>
        
        <div className="bg-slate-800 p-4 rounded-md">
          <h4 className="text-white font-medium mb-2">Step 3: Analyze Recursion Depth</h4>
          <p className="text-slate-300 text-sm">
            Maximum recursion depth determines stack space. Linear recursion = O(n), 
            binary tree recursion = O(log n) for balanced, O(n) for skewed.
          </p>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Common Patterns & Rules</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded-md">
          <h4 className="text-white font-medium mb-2">Drop Constants</h4>
          <p className="text-slate-300 text-sm">
            O(2n) → O(n)<br/>
            O(n + 100) → O(n)<br/>
            O(n/2) → O(n)
          </p>
        </div>
        
        <div className="bg-slate-800 p-4 rounded-md">
          <h4 className="text-white font-medium mb-2">Drop Lower Terms</h4>
          <p className="text-slate-300 text-sm">
            O(n² + n) → O(n²)<br/>
            O(n log n + n) → O(n log n)<br/>
            O(2ⁿ + n³) → O(2ⁿ)
          </p>
        </div>
        
        <div className="bg-slate-800 p-4 rounded-md">
          <h4 className="text-white font-medium mb-2">Add Complexities</h4>
          <p className="text-slate-300 text-sm">
            Sequential operations:<br/>
            O(n) + O(m) = O(n + m)<br/>
            O(n) + O(n²) = O(n²)
          </p>
        </div>
        
        <div className="bg-slate-800 p-4 rounded-md">
          <h4 className="text-white font-medium mb-2">Multiply Complexities</h4>
          <p className="text-slate-300 text-sm">
            Nested operations:<br/>
            O(n) × O(m) = O(n × m)<br/>
            O(n) × O(log n) = O(n log n)
          </p>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Step-by-Step Analysis Examples</h3>
      <div className="space-y-4">
        <div className="bg-slate-800 p-4 rounded-md">
          <h4 className="text-white font-medium mb-2">Example 1: Nested Loops</h4>
          <pre className="text-slate-300 text-sm bg-slate-900 p-3 rounded mt-2 overflow-x-auto">
{`for (int i = 0; i < n; i++) {        // Runs n times
  for (int j = 0; j < n; j++) {      // Runs n times for each i
    // O(1) operation                // 1 operation
  }
}
// Total: n × n × 1 = n² operations → O(n²)`}
          </pre>
        </div>
        
        <div className="bg-slate-800 p-4 rounded-md">
          <h4 className="text-white font-medium mb-2">Example 2: Binary Search</h4>
          <pre className="text-slate-300 text-sm bg-slate-900 p-3 rounded mt-2 overflow-x-auto">
{`while (left <= right) {             // Runs log n times
  mid = (left + right) / 2;         // O(1)
  if (arr[mid] == target) return;   // O(1)
  else if (arr[mid] < target)       // O(1)
    left = mid + 1;
  else right = mid - 1;
}
// Total: log n × O(1) = O(log n)`}
          </pre>
        </div>
        
        <div className="bg-slate-800 p-4 rounded-md">
          <h4 className="text-white font-medium mb-2">Example 3: Merge Sort</h4>
          <pre className="text-slate-300 text-sm bg-slate-900 p-3 rounded mt-2 overflow-x-auto">
{`mergeSort(arr) {
  if (arr.length <= 1) return;     // O(1)
  
  // Divide: log n levels
  left = mergeSort(arr[0...mid]);  // T(n/2)
  right = mergeSort(arr[mid...n]); // T(n/2)
  
  // Conquer: O(n) at each level
  return merge(left, right);       // O(n)
}
// T(n) = 2T(n/2) + O(n) = O(n log n)`}
          </pre>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Quick Reference: Common Complexities</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-600">
              <th className="text-left p-2 text-white">Data Structure/Algorithm</th>
              <th className="text-left p-2 text-yellow-400">Time Complexity</th>
              <th className="text-left p-2 text-blue-400">Space Complexity</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-b border-slate-700">
              <td className="p-2">Array Access</td>
              <td className="p-2">O(1)</td>
              <td className="p-2">O(1)</td>
            </tr>
            <tr className="border-b border-slate-700">
              <td className="p-2">Linear Search</td>
              <td className="p-2">O(n)</td>
              <td className="p-2">O(1)</td>
            </tr>
            <tr className="border-b border-slate-700">
              <td className="p-2">Binary Search</td>
              <td className="p-2">O(log n)</td>
              <td className="p-2">O(1)</td>
            </tr>
            <tr className="border-b border-slate-700">
              <td className="p-2">Bubble Sort</td>
              <td className="p-2">O(n²)</td>
              <td className="p-2">O(1)</td>
            </tr>
            <tr className="border-b border-slate-700">
              <td className="p-2">Merge Sort</td>
              <td className="p-2">O(n log n)</td>
              <td className="p-2">O(n)</td>
            </tr>
            <tr className="border-b border-slate-700">
              <td className="p-2">Quick Sort</td>
              <td className="p-2">O(n log n) avg, O(n²) worst</td>
              <td className="p-2">O(log n)</td>
            </tr>
            <tr className="border-b border-slate-700">
              <td className="p-2">Hash Table</td>
              <td className="p-2">O(1) avg, O(n) worst</td>
              <td className="p-2">O(n)</td>
            </tr>
            <tr className="border-b border-slate-700">
              <td className="p-2">Binary Tree (balanced)</td>
              <td className="p-2">O(log n)</td>
              <td className="p-2">O(n)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
)

export const complexityCalculationCodeSnippets = {
  "time-analysis": `// Step-by-Step Time Complexity Analysis

// Example 1: Simple Loop
function sumArray(arr) {
  let sum = 0;                    // O(1) - constant operation
  for (let i = 0; i < arr.length; i++) {  // Loop runs n times
    sum += arr[i];                // O(1) - constant operation inside loop
  }
  return sum;                     // O(1) - constant operation
}
// Analysis: 1 + n×1 + 1 = n + 2 → O(n)

// Example 2: Nested Loops
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {        // Outer loop: n iterations
    for (let j = 0; j < arr.length - i - 1; j++) { // Inner loop: n-i iterations
      if (arr[j] > arr[j + 1]) {              // O(1) comparison
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // O(1) swap
      }
    }
  }
}
// Analysis: Σ(i=0 to n-1) Σ(j=0 to n-i-2) 1 = n(n-1)/2 → O(n²)`,

  "recursion-analysis": `// Analyzing Recursive Functions

// Example 1: Linear Recursion
function factorial(n) {
  if (n <= 1) return 1;           // Base case: O(1)
  return n * factorial(n - 1);    // Recursive case: O(1) + T(n-1)
}
// Recurrence: T(n) = T(n-1) + O(1) → O(n)

// Example 2: Binary Recursion
function fibonacci(n) {
  if (n <= 1) return n;           // Base case: O(1)
  return fibonacci(n-1) + fibonacci(n-2); // 2 recursive calls
}
// Recurrence: T(n) = T(n-1) + T(n-2) + O(1) → O(2^n)

// Example 3: Divide and Conquer
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));    // T(n/2)
  const right = mergeSort(arr.slice(mid));      // T(n/2)
  
  return merge(left, right);                    // O(n)
}
// Recurrence: T(n) = 2T(n/2) + O(n) → O(n log n)`,

  "space-analysis": `// Space Complexity Analysis

// Example 1: Constant Space
function findMax(arr) {
  let max = arr[0];               // O(1) space
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];               // O(1) space (reusing variable)
    }
  }
  return max;
}
// Space: O(1) - only using constant extra space

// Example 2: Linear Space
function reverseArray(arr) {
  let reversed = [];              // O(n) space - new array
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);        // Adding n elements
  }
  return reversed;
}
// Space: O(n) - creating array of size n

// Example 3: Recursion Stack Space
function towerOfHanoi(n, source, destination, auxiliary) {
  if (n === 1) {
    console.log(\`Move disk 1 from \${source} to \${destination}\`);
    return;
  }
  
  towerOfHanoi(n-1, source, auxiliary, destination);    // Stack depth n-1
  console.log(\`Move disk \${n} from \${source} to \${destination}\`);
  towerOfHanoi(n-1, auxiliary, destination, source);    // Stack depth n-1
}
// Space: O(n) - maximum recursion depth of n`,

  "master-theorem": `// Master Theorem for Divide-and-Conquer

// General form: T(n) = aT(n/b) + f(n)
// where a ≥ 1, b > 1, and f(n) is asymptotically positive

// Case 1: f(n) = O(n^(log_b(a) - ε)) for some ε > 0
// Result: T(n) = Θ(n^log_b(a))

// Case 2: f(n) = Θ(n^log_b(a))
// Result: T(n) = Θ(n^log_b(a) * log n)

// Case 3: f(n) = Ω(n^(log_b(a) + ε)) for some ε > 0
// and af(n/b) ≤ cf(n) for some c < 1 and sufficiently large n
// Result: T(n) = Θ(f(n))

// Examples:
// 1. Merge Sort: T(n) = 2T(n/2) + O(n)
//    a=2, b=2, f(n)=n, log_2(2)=1
//    Case 2: T(n) = O(n log n)

// 2. Binary Search: T(n) = T(n/2) + O(1)
//    a=1, b=2, f(n)=1, log_2(1)=0
//    Case 2: T(n) = O(log n)

// 3. Karatsuba Multiplication: T(n) = 3T(n/2) + O(n)
//    a=3, b=2, f(n)=n, log_2(3)≈1.585
//    Case 1: T(n) = O(n^1.585)`,

  "amortized-analysis": `// Amortized Analysis Techniques

// 1. Aggregate Method
function dynamicArray() {
  let arr = [];
  let capacity = 1;
  
  function push(item) {
    if (arr.length === capacity) {
      // Resize: copy all elements to new array
      let newArr = new Array(capacity * 2);
      for (let i = 0; i < arr.length; i++) {
        newArr[i] = arr[i];          // This happens infrequently
      }
      arr = newArr;
      capacity *= 2;
    }
    arr[arr.length] = item;          // This happens every time
  }
  
  return { push };
}
// Analysis: n insertions cost at most 2n operations
// Amortized cost per insertion: O(1)

// 2. Accounting Method
// Assign costs to operations such that expensive operations
// are "paid for" by cheaper operations

// 3. Potential Method
// Define a potential function Φ that represents stored energy
// Amortized cost = Actual cost + Φ(after) - Φ(before)`
} 