import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const recursionBasicsExplanationContent = (
  <AlgorithmExplanation>
    <h2>Recursion - Like Russian Dolls! 🪆</h2>
    <p>
      Have you ever seen Russian dolls? You open one doll and find another doll inside, 
      then another, and another, until you reach the smallest one. That's exactly how recursion works!
    </p>

    <h3>What is Recursion?</h3>
    <p>
      Recursion is when a function calls itself to solve a smaller version of the same problem. 
      It's like looking into two mirrors facing each other - you see the same thing getting smaller!
    </p>

    <h3>Parts of Recursion:</h3>
    <ol>
      <li><strong>Base Case:</strong> The stopping condition (like the smallest Russian doll)</li>
      <li><strong>Recursive Case:</strong> The function calling itself with a smaller problem</li>
      <li><strong>Progress:</strong> Each call should get closer to the base case</li>
    </ol>

    <h3>Real-Life Examples:</h3>
    <ul>
      <li><strong>Russian Dolls:</strong> Open a doll, find another doll, repeat until smallest</li>
      <li><strong>Counting Down:</strong> "10, 9, 8, 7... until you reach 0!"</li>
      <li><strong>Family Tree:</strong> Your parents, their parents, going back in time</li>
      <li><strong>Folders:</strong> Folder inside folder inside folder</li>
    </ul>

    <h3>Simple Recursion Rules:</h3>
    <ul>
      <li>Always have a base case (when to stop)</li>
      <li>Make the problem smaller each time</li>
      <li>Trust that it will work for smaller problems</li>
      <li>Make sure you're moving toward the base case</li>
    </ul>

    <h3>Common Recursive Problems:</h3>
    <ul>
      <li><strong>Factorial:</strong> 5! = 5 × 4 × 3 × 2 × 1</li>
      <li><strong>Fibonacci:</strong> Each number is sum of previous two</li>
      <li><strong>Tower of Hanoi:</strong> Moving disks puzzle</li>
      <li><strong>Tree Traversal:</strong> Visiting all nodes in a tree</li>
      <li><strong>Maze Solving:</strong> Try every path until you find the exit</li>
    </ul>

    <h3>Why Use Recursion?</h3>
    <ul>
      <li>Some problems are naturally recursive</li>
      <li>Code becomes shorter and more elegant</li>
      <li>Easier to understand for certain problems</li>
      <li>Great for divide-and-conquer algorithms</li>
      <li>Perfect for tree and graph problems</li>
    </ul>

    <h3>When NOT to Use Recursion:</h3>
    <ul>
      <li>When iteration is simpler</li>
      <li>When you might run out of memory (stack overflow)</li>
      <li>When performance is critical (recursion can be slower)</li>
      <li>When the problem doesn't naturally break into smaller parts</li>
    </ul>

    <h3>Recursion vs Iteration (The Choice):</h3>
    <ul>
      <li><strong>Recursion:</strong> Like Russian dolls - elegant but uses more memory</li>
      <li><strong>Iteration:</strong> Like a loop - more efficient but sometimes harder to read</li>
    </ul>

    <h3>Fun Facts:</h3>
    <ul>
      <li>Your brain uses recursion when you think about thinking!</li>
      <li>Fractals in nature (like snowflakes) are recursive patterns</li>
      <li>Google's search algorithm originally used recursion</li>
      <li>Many video games use recursion for AI and pathfinding</li>
    </ul>

    <h3>Recursion Step-by-Step (Like Following a Recipe):</h3>
    <ol>
      <li>Check if we've reached the base case (are we done?)</li>
      <li>If yes, return the simple answer</li>
      <li>If no, break the problem into a smaller piece</li>
      <li>Call the same function with the smaller piece</li>
      <li>Combine the result with what we have</li>
    </ol>
  </AlgorithmExplanation>
)

export const recursionBasicsCodeSnippets = {
  python: `# Simple Recursion Examples

def countdown(n):
    """Count down like a rocket launch!"""
    if n <= 0:
        print("🚀 BLAST OFF!")
        return
    print(f"{n}...")
    countdown(n - 1)

def factorial(n):
    """Calculate n! = n × (n-1) × ... × 1"""
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Examples
countdown(5)
print(f"5! = {factorial(5)}")`,

  javascript: `// Simple Recursion Examples

function countdown(n) {
    if (n <= 0) {
        console.log("🚀 BLAST OFF!");
        return;
    }
    console.log(\`\${n}...\`);
    countdown(n - 1);
}

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Examples
countdown(5);
console.log(\`5! = \${factorial(5)}\`);`,

  java: `// Simple Recursion Examples

public class RecursionExample {
    public static void countdown(int n) {
        if (n <= 0) {
            System.out.println("🚀 BLAST OFF!");
            return;
        }
        System.out.println(n + "...");
        countdown(n - 1);
    }
    
    public static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
    
    public static void main(String[] args) {
        countdown(5);
        System.out.println("5! = " + factorial(5));
    }
}`
} 