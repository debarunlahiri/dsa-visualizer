import React from 'react';

export const backtrackingBasicsExplanationContent = (
  <div className="space-y-6">
    <section>
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">🌟 What is Backtracking?</h2>
      <div className="bg-muted/50 p-6 rounded-lg">
        <p className="text-lg mb-4">
          Imagine you're in a big maze trying to find the exit. You walk down a path, but then you hit a dead end. 
          What do you do? You <strong>go back</strong> (backtrack) to where you made your last choice and try a different path!
        </p>
        <p className="text-lg mb-4">
          <strong>Backtracking</strong> is exactly like exploring a maze. It's a problem-solving method where we:
        </p>
        <ul className="list-disc list-inside text-lg space-y-2">
          <li>🚶 <strong>Try a solution step by step</strong></li>
          <li>🚫 <strong>If we hit a dead end, we go back and try something else</strong></li>
          <li>✅ <strong>Keep trying until we find the right solution</strong></li>
          <li>🎯 <strong>Find ALL possible solutions if needed</strong></li>
        </ul>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">🧩 How Does Backtracking Work?</h3>
      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="mb-3">Think of backtracking like solving a jigsaw puzzle:</p>
        <div className="space-y-3">
          <div className="bg-card p-3 rounded border-l-4 border-green-500">
            <strong>Step 1: Try</strong> - Pick a puzzle piece and try to place it
          </div>
          <div className="bg-card p-3 rounded border-l-4 border-yellow-500">
            <strong>Step 2: Check</strong> - Does it fit? Does it look right?
          </div>
          <div className="bg-card p-3 rounded border-l-4 border-red-500">
            <strong>Step 3: Backtrack</strong> - If it doesn't fit, remove it and try another piece
          </div>
          <div className="bg-card p-3 rounded border-l-4 border-blue-500">
            <strong>Step 4: Repeat</strong> - Keep trying until the puzzle is complete!
          </div>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">🎮 Real-World Examples</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2">🌟 N-Queens Problem</h4>
          <p className="text-sm">Place N queens on a chessboard so none can attack each other. If a queen attacks another, backtrack and try a different position!</p>
        </div>
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2">🧩 Sudoku Solver</h4>
          <p className="text-sm">Fill in numbers 1-9. If a number breaks the rules, erase it and try another number!</p>
        </div>
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2">🗝️ Maze Solving</h4>
          <p className="text-sm">Find the path to the exit. If you hit a wall, go back and try a different route!</p>
        </div>
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2">🎒 Subset Problems</h4>
          <p className="text-sm">Find all combinations that add up to a target. Include or exclude items, backtrack if the sum is wrong!</p>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-3">⚡ The Backtracking Recipe</h3>
      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="mb-3">Every backtracking solution follows this pattern:</p>
        <div className="space-y-3 text-sm font-mono">
          <div className="bg-card p-3 rounded">
            <strong>1. Base Case:</strong> Are we done? Did we solve it?
          </div>
          <div className="bg-card p-3 rounded">
            <strong>2. Try All Options:</strong> For each possible choice...
          </div>
          <div className="bg-card p-3 rounded">
            <strong>3. Make Choice:</strong> Add this option to our solution
          </div>
          <div className="bg-card p-3 rounded">
            <strong>4. Recurse:</strong> Try to solve the rest of the problem
          </div>
          <div className="bg-card p-3 rounded">
            <strong>5. Undo Choice:</strong> Remove this option (backtrack!)
          </div>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">🔍 Step-by-Step Example: N-Queens (4x4)</h3>
      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-bold mb-2">Let's place 4 queens on a 4x4 chessboard!</h4>
        <div className="space-y-3 text-sm">
          <div className="bg-card p-3 rounded">
            <strong>Step 1:</strong> Place first queen in row 0, column 0<br/>
            <code>Q . . .</code><br/>
            <code>. . . .</code><br/>
            <code>. . . .</code><br/>
            <code>. . . .</code>
          </div>
          <div className="bg-card p-3 rounded">
            <strong>Step 2:</strong> Try to place second queen in row 1<br/>
            <code>Q . . .</code><br/>
            <code>. . Q .</code><br/>
            <code>. . . .</code><br/>
            <code>. . . .</code><br/>
            <em>Queen at (1,2) doesn't attack queen at (0,0) ✅</em>
          </div>
          <div className="bg-card p-3 rounded">
            <strong>Step 3:</strong> Try to place third queen in row 2<br/>
            <em>Can't place anywhere in row 2 without attacking! 🚫</em><br/>
            <strong>BACKTRACK!</strong> Remove queen from (1,2) and try (1,3)
          </div>
          <div className="bg-card p-3 rounded">
            <strong>Step 4:</strong> Try queen at (1,3)<br/>
            <em>Still can't place third queen! 🚫</em><br/>
            <strong>BACKTRACK!</strong> Remove queen from (0,0) and try (0,1)
          </div>
          <p className="text-muted-foreground mt-2">...and so on! We keep trying and backtracking until we find a valid solution.</p>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400 mb-3">🚀 Tips for Success</h3>
      <div className="bg-muted/50 p-4 rounded-lg">
        <ul className="space-y-2 text-sm">
          <li>🎯 <strong>Start small:</strong> Practice with small examples first</li>
          <li>🧠 <strong>Think recursively:</strong> Break the problem into smaller pieces</li>
          <li>✅ <strong>Check constraints early:</strong> Don't waste time on invalid paths</li>
          <li>📝 <strong>Keep track of choices:</strong> Remember what you've tried</li>
          <li>🔄 <strong>Don't forget to undo:</strong> Always clean up before trying the next option</li>
          <li>🐌 <strong>Be patient:</strong> Backtracking can be slow, but it finds all solutions!</li>
        </ul>
      </div>
    </section>
  </div>
);

export const backtrackingBasicsCodeSnippets = {
  python: `# Backtracking Examples in Python
# Let's solve some classic problems!

def solve_n_queens(n):
    """Solve the N-Queens problem using backtracking"""
    def is_safe(board, row, col):
        # Check if placing a queen at (row, col) is safe
        
        # Check column
        for i in range(row):
            if board[i] == col:
                return False
        
        # Check diagonal (top-left to bottom-right)
        for i in range(row):
            if board[i] - i == col - row:
                return False
        
        # Check diagonal (top-right to bottom-left)
        for i in range(row):
            if board[i] + i == col + row:
                return False
        
        return True
    
    def backtrack(board, row):
        # Base case: all queens placed
        if row == n:
            return [board[:]]  # Found a solution!
        
        solutions = []
        # Try placing queen in each column of current row
        for col in range(n):
            if is_safe(board, row, col):
                # Make choice: place queen
                board[row] = col
                
                # Recurse: solve rest of the problem
                solutions.extend(backtrack(board, row + 1))
                
                # Undo choice: remove queen (backtrack!)
                board[row] = -1
        
        return solutions
    
    # Start with empty board
    board = [-1] * n
    return backtrack(board, 0)

# Find all solutions to 4-Queens
print("🔲 Solving 4-Queens Problem")
print("=" * 30)

solutions = solve_n_queens(4)
print(f"Found {len(solutions)} solutions!")

for i, solution in enumerate(solutions):
    print(f"\\nSolution {i + 1}:")
    for row in range(4):
        line = ""
        for col in range(4):
            if solution[row] == col:
                line += "Q "
            else:
                line += ". "
        print(line)

# Generate all permutations
def generate_permutations(arr):
    """Generate all permutations of an array"""
    def backtrack(current_perm):
        # Base case: permutation is complete
        if len(current_perm) == len(arr):
            permutations.append(current_perm[:])
            return
        
        # Try each unused element
        for num in arr:
            if num not in current_perm:
                # Make choice: add element
                current_perm.append(num)
                
                # Recurse
                backtrack(current_perm)
                
                # Undo choice: remove element
                current_perm.pop()
    
    permutations = []
    backtrack([])
    return permutations

print("\\n🔄 Generate Permutations")
print("=" * 30)

arr = [1, 2, 3]
perms = generate_permutations(arr)

print(f"Array: {arr}")
print(f"All permutations ({len(perms)} total):")
for perm in perms:
    print(f"  {perm}")`,

  javascript: `// Backtracking Examples in JavaScript

function solveNQueens(n) {
    const solutions = [];
    const board = new Array(n).fill(-1);
    
    function isSafe(row, col) {
        // Check if placing queen at (row, col) is safe
        for (let i = 0; i < row; i++) {
            // Check column
            if (board[i] === col) return false;
            
            // Check diagonals
            if (Math.abs(board[i] - col) === Math.abs(i - row)) {
                return false;
            }
        }
        return true;
    }
    
    function backtrack(row) {
        // Base case: all queens placed
        if (row === n) {
            solutions.push([...board]);
            return;
        }
        
        // Try placing queen in each column
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                // Make choice
                board[row] = col;
                
                // Recurse
                backtrack(row + 1);
                
                // Undo choice (backtrack!)
                board[row] = -1;
            }
        }
    }
    
    backtrack(0);
    return solutions;
}

// Solve 4-Queens
console.log("👑 Solving 4-Queens Problem");
console.log("=".repeat(30));

const solutions = solveNQueens(4);
console.log(\`Found \${solutions.length} solutions!\`);

solutions.forEach((solution, index) => {
    console.log(\`\\nSolution \${index + 1}:\`);
    for (let row = 0; row < 4; row++) {
        let line = "";
        for (let col = 0; col < 4; col++) {
            line += solution[row] === col ? "Q " : ". ";
        }
        console.log(line);
    }
});

// Generate combinations
function generateCombinations(arr, k) {
    const combinations = [];
    
    function backtrack(start, currentCombo) {
        // Base case: combination is complete
        if (currentCombo.length === k) {
            combinations.push([...currentCombo]);
            return;
        }
        
        // Try each remaining element
        for (let i = start; i < arr.length; i++) {
            // Make choice
            currentCombo.push(arr[i]);
            
            // Recurse with next starting position
            backtrack(i + 1, currentCombo);
            
            // Undo choice
            currentCombo.pop();
        }
    }
    
    backtrack(0, []);
    return combinations;
}

console.log("\\n🎲 Generate Combinations");
console.log("=".repeat(30));

const numbers = [1, 2, 3, 4, 5];
const k = 3;
const combos = generateCombinations(numbers, k);

console.log(\`Numbers: [\${numbers.join(', ')}]\`);
console.log(\`Choose \${k} elements\`);
console.log(\`Found \${combos.length} combinations:\`);

combos.forEach(combo => {
    console.log(\`  [\${combo.join(', ')}]\`);
});`,

  java: `import java.util.*;

public class BacktrackingExamples {
    
    // N-Queens Problem
    public static List<List<Integer>> solveNQueens(int n) {
        List<List<Integer>> solutions = new ArrayList<>();
        int[] board = new int[n];
        Arrays.fill(board, -1);
        
        backtrackQueens(board, 0, n, solutions);
        return solutions;
    }
    
    private static void backtrackQueens(int[] board, int row, int n, 
                                       List<List<Integer>> solutions) {
        // Base case: all queens placed
        if (row == n) {
            List<Integer> solution = new ArrayList<>();
            for (int pos : board) {
                solution.add(pos);
            }
            solutions.add(solution);
            return;
        }
        
        // Try placing queen in each column
        for (int col = 0; col < n; col++) {
            if (isSafe(board, row, col)) {
                // Make choice
                board[row] = col;
                
                // Recurse
                backtrackQueens(board, row + 1, n, solutions);
                
                // Undo choice (backtrack!)
                board[row] = -1;
            }
        }
    }
    
    private static boolean isSafe(int[] board, int row, int col) {
        for (int i = 0; i < row; i++) {
            // Check column and diagonals
            if (board[i] == col || 
                Math.abs(board[i] - col) == Math.abs(i - row)) {
                return false;
            }
        }
        return true;
    }
    
    public static void main(String[] args) {
        System.out.println("🏰 Backtracking Examples");
        System.out.println("=".repeat(30));
        
        // Solve 4-Queens
        System.out.println("\\n👑 4-Queens Solutions:");
        List<List<Integer>> queensSolutions = solveNQueens(4);
        System.out.println("Found " + queensSolutions.size() + " solutions!");
        
        for (int i = 0; i < queensSolutions.size(); i++) {
            System.out.println("\\nSolution " + (i + 1) + ":");
            List<Integer> solution = queensSolutions.get(i);
            for (int row = 0; row < 4; row++) {
                StringBuilder line = new StringBuilder();
                for (int col = 0; col < 4; col++) {
                    if (solution.get(row) == col) {
                        line.append("Q ");
                    } else {
                        line.append(". ");
                    }
                }
                System.out.println(line.toString());
            }
        }
    }
}`
}; 