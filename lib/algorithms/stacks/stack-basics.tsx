import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const stackBasicsExplanationContent = (
  <AlgorithmExplanation>
    <h2>Stack Data Structure - Like a Stack of Plates! 🍽️</h2>
    <p>
      Imagine you're washing dishes and stacking clean plates on top of each other. When you need a plate, 
      you take the one from the top, right? That's exactly how a stack works in programming!
    </p>

    <h3>What is a Stack?</h3>
    <p>
      A stack is like a tower of things where you can only add or remove items from the top. 
      It follows the "Last In, First Out" (LIFO) rule - just like those plates!
    </p>

    <h3>Stack Operations (What Can We Do?):</h3>
    <ol>
      <li><strong>Push:</strong> Add something to the top (like placing a plate on the stack)</li>
      <li><strong>Pop:</strong> Remove something from the top (like taking a plate off)</li>
      <li><strong>Peek/Top:</strong> Look at what's on top without removing it</li>
      <li><strong>IsEmpty:</strong> Check if the stack is empty (no plates left)</li>
      <li><strong>Size:</strong> Count how many items are in the stack</li>
    </ol>

    <h3>Real-Life Examples Kids Can Understand:</h3>
    <ul>
      <li><strong>Stack of Books:</strong> You add books on top and take them from the top</li>
      <li><strong>Stack of Pancakes:</strong> The last pancake you make goes on top, and you eat from the top</li>
      <li><strong>Toy Blocks:</strong> Building a tower by adding blocks on top</li>
      <li><strong>Undo Button:</strong> When you make a mistake, undo takes you back to the last thing you did</li>
      <li><strong>Web Browser:</strong> The back button takes you to the last page you visited</li>
    </ul>

    <h3>How Fast Are Stack Operations?</h3>
    <ul>
      <li><strong>Push (adding):</strong> $$O(1)$$ - Super fast! Like placing one plate</li>
      <li><strong>Pop (removing):</strong> $$O(1)$$ - Super fast! Like taking one plate</li>
      <li><strong>Peek (looking):</strong> $$O(1)$$ - Super fast! Just a quick look</li>
      <li><strong>Search:</strong> $$O(n)$$ - Slow, you might need to check every item</li>
    </ul>

    <h3>Cool Things We Use Stacks For:</h3>
    <ul>
      <li><strong>Undo/Redo:</strong> In games, drawing apps, text editors</li>
      <li><strong>Back Button:</strong> In web browsers and mobile apps</li>
      <li><strong>Math Calculations:</strong> Solving expressions like (2 + 3) * 4</li>
      <li><strong>Memory Management:</strong> How programs remember where they are</li>
      <li><strong>Function Calls:</strong> When one function calls another function</li>
      <li><strong>Matching Parentheses:</strong> Checking if ( ) [ ] { } are properly matched</li>
    </ul>

    <h3>Stack Rules (Important!):</h3>
    <ul>
      <li>You can only add items to the TOP</li>
      <li>You can only remove items from the TOP</li>
      <li>You can only see the TOP item without removing others</li>
      <li>If the stack is empty, you can't remove anything!</li>
    </ul>

    <h3>When Should You Use a Stack?</h3>
    <ul>
      <li>When you need to reverse the order of things</li>
      <li>When you need to remember things in "last first" order</li>
      <li>When you're tracking steps that need to be undone</li>
      <li>When solving puzzles that require backtracking</li>
    </ul>

    <h3>Fun Facts:</h3>
    <ul>
      <li>Your computer uses stacks to remember function calls!</li>
      <li>The "call stack" is why infinite recursion causes "stack overflow"</li>
      <li>Calculators use stacks to solve math problems in the right order</li>
      <li>Even your brain uses stack-like thinking when following instructions!</li>
    </ul>
  </AlgorithmExplanation>
)

export const stackBasicsCodeSnippets = {
  python: `# Stack Implementation in Python
# We can use a list as a stack!

class Stack:
    def __init__(self):
        self.items = []  # Empty list to store our stack items
    
    def push(self, item):
        """Add item to the top of the stack (like placing a plate)"""
        self.items.append(item)
        print(f"Pushed {item} onto the stack")
    
    def pop(self):
        """Remove and return the top item (like taking a plate)"""
        if self.is_empty():
            print("Stack is empty! Can't remove anything.")
            return None
        item = self.items.pop()
        print(f"Popped {item} from the stack")
        return item
    
    def peek(self):
        """Look at the top item without removing it"""
        if self.is_empty():
            print("Stack is empty! Nothing to peek at.")
            return None
        return self.items[-1]  # Last item in the list
    
    def is_empty(self):
        """Check if the stack has no items"""
        return len(self.items) == 0
    
    def size(self):
        """Count how many items are in the stack"""
        return len(self.items)
    
    def display(self):
        """Show all items in the stack (top to bottom)"""
        if self.is_empty():
            print("Stack is empty!")
        else:
            print("Stack (top to bottom):", self.items[::-1])

# Let's play with our stack!
print("=== Stack of Toys Example ===")
toy_stack = Stack()

# Adding toys to our stack
toy_stack.push("Teddy Bear")
toy_stack.push("Toy Car")
toy_stack.push("Building Blocks")
toy_stack.push("Doll")

# Show our stack
toy_stack.display()
print(f"Stack size: {toy_stack.size()}")

# Look at the top toy
print(f"Top toy: {toy_stack.peek()}")

# Remove toys one by one
toy_stack.pop()  # Remove Doll
toy_stack.pop()  # Remove Building Blocks
toy_stack.display()

# Add another toy
toy_stack.push("Puzzle")
toy_stack.display()

# Real-world example: Undo functionality
print("\\n=== Undo Example ===")
undo_stack = Stack()

# Simulating actions in a drawing app
actions = ["Draw circle", "Draw square", "Draw triangle", "Color red"]
for action in actions:
    undo_stack.push(action)
    print(f"Action: {action}")

print("\\nNow let's undo some actions:")
for _ in range(2):
    last_action = undo_stack.pop()
    if last_action:
        print(f"Undoing: {last_action}")

print("Remaining actions:")
undo_stack.display()`,

  javascript: `// Stack Implementation in JavaScript
// Fun and easy to understand!

class Stack {
    constructor() {
        this.items = [];  // Empty array to store our stack items
    }
    
    push(item) {
        // Add item to the top of the stack (like placing a plate)
        this.items.push(item);
        console.log(\`Pushed \${item} onto the stack\`);
    }
    
    pop() {
        // Remove and return the top item (like taking a plate)
        if (this.isEmpty()) {
            console.log("Stack is empty! Can't remove anything.");
            return null;
        }
        const item = this.items.pop();
        console.log(\`Popped \${item} from the stack\`);
        return item;
    }
    
    peek() {
        // Look at the top item without removing it
        if (this.isEmpty()) {
            console.log("Stack is empty! Nothing to peek at.");
            return null;
        }
        return this.items[this.items.length - 1];  // Last item in array
    }
    
    isEmpty() {
        // Check if the stack has no items
        return this.items.length === 0;
    }
    
    size() {
        // Count how many items are in the stack
        return this.items.length;
    }
    
    display() {
        // Show all items in the stack (top to bottom)
        if (this.isEmpty()) {
            console.log("Stack is empty!");
        } else {
            console.log("Stack (top to bottom):", [...this.items].reverse());
        }
    }
}

// Let's play with our stack!
console.log("=== Stack of Cookies Example ===");
const cookieStack = new Stack();

// Adding cookies to our stack
cookieStack.push("Chocolate Chip Cookie");
cookieStack.push("Oatmeal Cookie");
cookieStack.push("Sugar Cookie");
cookieStack.push("Gingerbread Cookie");

// Show our stack
cookieStack.display();
console.log(\`Stack size: \${cookieStack.size()}\`);

// Look at the top cookie
console.log(\`Top cookie: \${cookieStack.peek()}\`);

// Eat cookies one by one (remove from top)
cookieStack.pop();  // Eat Gingerbread Cookie
cookieStack.pop();  // Eat Sugar Cookie
cookieStack.display();

// Add another cookie
cookieStack.push("Double Chocolate Cookie");
cookieStack.display();

// Real-world example: Browser history
console.log("\\n=== Browser History Example ===");
const browserHistory = new Stack();

// Visiting websites
const websites = ["google.com", "youtube.com", "github.com", "stackoverflow.com"];
websites.forEach(site => {
    browserHistory.push(site);
    console.log(\`Visited: \${site}\`);
});

console.log("\\nUsing back button:");
for (let i = 0; i < 2; i++) {
    const lastSite = browserHistory.pop();
    if (lastSite) {
        console.log(\`Going back from: \${lastSite}\`);
    }
}

console.log("Current browsing history:");
browserHistory.display();

// Checking balanced parentheses (advanced example)
function isBalanced(expression) {
    const stack = new Stack();
    const pairs = { '(': ')', '[': ']', '{': '}' };
    
    for (let char of expression) {
        if (char in pairs) {
            // Opening bracket - push to stack
            stack.push(char);
        } else if (Object.values(pairs).includes(char)) {
            // Closing bracket - check if it matches
            if (stack.isEmpty()) return false;
            const last = stack.pop();
            if (pairs[last] !== char) return false;
        }
    }
    
    return stack.isEmpty();  // Should be empty if balanced
}

console.log("\\n=== Balanced Parentheses Check ===");
const expressions = ["()", "()[]{}", "([{}])", "(()", "([)]"];
expressions.forEach(expr => {
    console.log(\`"\${expr}" is \${isBalanced(expr) ? 'balanced' : 'not balanced'}\`);
});`,

  java: `// Stack Implementation in Java
import java.util.*;

public class StackExample {
    
    // Custom Stack class for learning
    static class MyStack<T> {
        private ArrayList<T> items;
        
        public MyStack() {
            items = new ArrayList<>();
        }
        
        // Add item to the top of the stack
        public void push(T item) {
            items.add(item);
            System.out.println("Pushed " + item + " onto the stack");
        }
        
        // Remove and return the top item
        public T pop() {
            if (isEmpty()) {
                System.out.println("Stack is empty! Can't remove anything.");
                return null;
            }
            T item = items.remove(items.size() - 1);
            System.out.println("Popped " + item + " from the stack");
            return item;
        }
        
        // Look at the top item without removing it
        public T peek() {
            if (isEmpty()) {
                System.out.println("Stack is empty! Nothing to peek at.");
                return null;
            }
            return items.get(items.size() - 1);
        }
        
        // Check if the stack is empty
        public boolean isEmpty() {
            return items.size() == 0;
        }
        
        // Get the size of the stack
        public int size() {
            return items.size();
        }
        
        // Show all items in the stack
        public void display() {
            if (isEmpty()) {
                System.out.println("Stack is empty!");
            } else {
                System.out.print("Stack (top to bottom): ");
                for (int i = items.size() - 1; i >= 0; i--) {
                    System.out.print(items.get(i) + " ");
                }
                System.out.println();
            }
        }
    }
    
    public static void main(String[] args) {
        // Stack of Books Example
        System.out.println("=== Stack of Books Example ===");
        MyStack<String> bookStack = new MyStack<>();
        
        // Adding books to our stack
        bookStack.push("Harry Potter");
        bookStack.push("Lord of the Rings");
        bookStack.push("The Hobbit");
        bookStack.push("Chronicles of Narnia");
        
        // Show our stack
        bookStack.display();
        System.out.println("Stack size: " + bookStack.size());
        
        // Look at the top book
        System.out.println("Top book: " + bookStack.peek());
        
        // Remove books one by one
        bookStack.pop();  // Remove Chronicles of Narnia
        bookStack.pop();  // Remove The Hobbit
        bookStack.display();
        
        // Add another book
        bookStack.push("Percy Jackson");
        bookStack.display();
        
        // Using Java's built-in Stack
        System.out.println("\\n=== Using Java's Built-in Stack ===");
        Stack<Integer> numberStack = new Stack<>();
        
        // Push numbers
        for (int i = 1; i <= 5; i++) {
            numberStack.push(i * 10);
            System.out.println("Pushed: " + (i * 10));
        }
        
        System.out.println("Stack: " + numberStack);
        
        // Pop numbers
        while (!numberStack.isEmpty()) {
            System.out.println("Popped: " + numberStack.pop());
        }
        
        // Real-world example: Function call simulation
        System.out.println("\\n=== Function Call Stack Example ===");
        simulateFunctionCalls();
    }
    
    // Simulating how function calls work with a stack
    static void simulateFunctionCalls() {
        Stack<String> callStack = new Stack<>();
        
        // Simulating nested function calls
        callStack.push("main()");
        System.out.println("Called main() - Stack: " + callStack);
        
        callStack.push("functionA()");
        System.out.println("Called functionA() - Stack: " + callStack);
        
        callStack.push("functionB()");
        System.out.println("Called functionB() - Stack: " + callStack);
        
        callStack.push("functionC()");
        System.out.println("Called functionC() - Stack: " + callStack);
        
        // Functions completing and returning
        System.out.println("\\nFunctions completing:");
        while (!callStack.isEmpty()) {
            String function = callStack.pop();
            System.out.println("Completed " + function + " - Stack: " + callStack);
        }
    }
}`
} 