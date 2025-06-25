import React from "react"

export const bigOComplexityExplanationContent = (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">What is Big O Notation?</h3>
      <p className="text-slate-300 leading-relaxed">
        Big O notation is a mathematical notation used to describe the performance and complexity of algorithms. 
        It characterizes functions according to their growth rates and helps us understand how an algorithm's 
        runtime or space requirements grow as the input size increases.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Why is Big O Important?</h3>
      <ul className="list-disc list-inside text-slate-300 space-y-2">
        <li>Predicts algorithm performance as data size grows</li>
        <li>Helps choose the most efficient algorithm for a problem</li>
        <li>Allows comparison of algorithms independent of hardware/implementation</li>
        <li>Essential for designing scalable systems</li>
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Common Time Complexities</h3>
      <div className="space-y-3">
        <div className="bg-slate-800 p-3 rounded-md">
          <span className="font-mono text-green-400">O(1)</span> - <span className="text-white font-medium">Constant Time</span>
          <p className="text-slate-300 text-sm mt-1">Performance doesn't change with input size. Examples: Array access, Hash table lookup</p>
        </div>
        <div className="bg-slate-800 p-3 rounded-md">
          <span className="font-mono text-blue-400">O(log n)</span> - <span className="text-white font-medium">Logarithmic Time</span>
          <p className="text-slate-300 text-sm mt-1">Performance grows logarithmically. Examples: Binary search, Balanced tree operations</p>
        </div>
        <div className="bg-slate-800 p-3 rounded-md">
          <span className="font-mono text-yellow-400">O(n)</span> - <span className="text-white font-medium">Linear Time</span>
          <p className="text-slate-300 text-sm mt-1">Performance grows linearly with input. Examples: Linear search, Single loop</p>
        </div>
        <div className="bg-slate-800 p-3 rounded-md">
          <span className="font-mono text-orange-400">O(n log n)</span> - <span className="text-white font-medium">Linearithmic Time</span>
          <p className="text-slate-300 text-sm mt-1">Common in efficient sorting algorithms. Examples: Merge sort, Heap sort</p>
        </div>
        <div className="bg-slate-800 p-3 rounded-md">
          <span className="font-mono text-red-400">O(n²)</span> - <span className="text-white font-medium">Quadratic Time</span>
          <p className="text-slate-300 text-sm mt-1">Performance grows quadratically. Examples: Bubble sort, Nested loops</p>
        </div>
        <div className="bg-slate-800 p-3 rounded-md">
          <span className="font-mono text-purple-400">O(2ⁿ)</span> - <span className="text-white font-medium">Exponential Time</span>
          <p className="text-slate-300 text-sm mt-1">Performance doubles with each input increase. Examples: Recursive Fibonacci, Subset generation</p>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Best, Average, and Worst Case</h3>
      <p className="text-slate-300 leading-relaxed mb-3">
        Algorithms can have different performance characteristics depending on the input:
      </p>
      <ul className="list-disc list-inside text-slate-300 space-y-2">
        <li><span className="text-green-400 font-medium">Best Case:</span> Minimum time required for any input of size n</li>
        <li><span className="text-yellow-400 font-medium">Average Case:</span> Expected time over all possible inputs of size n</li>
        <li><span className="text-red-400 font-medium">Worst Case:</span> Maximum time required for any input of size n</li>
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Space Complexity</h3>
      <p className="text-slate-300 leading-relaxed">
        Space complexity measures the amount of memory an algorithm uses relative to the input size. 
        It includes both auxiliary space (extra space used by the algorithm) and the space used by the input itself.
      </p>
    </div>
  </div>
)

export const bigOComplexityCodeSnippets = {
  "constant": `// O(1) - Constant Time
function getFirstElement(arr) {
    return arr[0]; // Always takes same time
}

function hashTableLookup(table, key) {
    return table[key]; // Constant time access
}`,

  "logarithmic": `// O(log n) - Logarithmic Time
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1; // Cuts search space in half each iteration
}`,

  "linear": `// O(n) - Linear Time
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1; // May need to check every element
}

function sumArray(arr) {
    let sum = 0;
    for (let num of arr) {
        sum += num; // Must visit each element once
    }
    return sum;
}`,

  "linearithmic": `// O(n log n) - Linearithmic Time
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

// Divides array log n times, merges n elements each time`,

  "quadratic": `// O(n²) - Quadratic Time
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr; // Nested loops = n * n operations
}`,

  "exponential": `// O(2ⁿ) - Exponential Time
function fibonacci(n) {
    if (n <= 1) return n;
    
    return fibonacci(n - 1) + fibonacci(n - 2);
    // Each call creates 2 more calls, forming binary tree
}

function generateSubsets(arr) {
    if (arr.length === 0) return [[]];
    
    const first = arr[0];
    const rest = arr.slice(1);
    const subsetsWithoutFirst = generateSubsets(rest);
    const subsetsWithFirst = subsetsWithoutFirst.map(subset => [first, ...subset]);
    
    return [...subsetsWithoutFirst, ...subsetsWithFirst];
    // 2^n possible subsets
}`
} 