import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const binaryTreeTraversalExplanationContent = (
  <AlgorithmExplanation>
    <h2>Binary Tree Traversals</h2>
    <p>
      Tree traversal is the process of visiting each node in a tree data structure exactly once in a systematic way.
      There are three common methods to traverse a binary tree:
    </p>
    <h3>1. Inorder Traversal (Left, Root, Right)</h3>
    <p>Visit the left subtree, then the root node, then the right subtree.</p>
    <h3>2. Preorder Traversal (Root, Left, Right)</h3>
    <p>Visit the root node first, then the left subtree, then the right subtree.</p>
    <h3>3. Postorder Traversal (Left, Right, Root)</h3>
    <p>Visit the left subtree, then the right subtree, then the root node.</p>
    <h3>Time Complexity:</h3>
    <p>$$O(n)$$ where n is the number of nodes in the tree.</p>
    <h3>Space Complexity:</h3>
    <p>$$O(h)$$ where h is the height of the tree (due to recursion stack).</p>
  </AlgorithmExplanation>
)

export const binaryTreeTraversalCodeSnippets = {
  python: `# Binary Tree Traversal Implementation in Python
# Time Complexity: O(n) for all traversals
# Space Complexity: O(h) where h is tree height

class TreeNode:
    """Node class for binary tree with value and left/right pointers."""
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder_traversal(root):
    """
    Inorder traversal: Left -> Root -> Right
    For BST, this gives sorted order.
    """
    result = []
    if root:
        result.extend(inorder_traversal(root.left))
        result.append(root.val)
        result.extend(inorder_traversal(root.right))
    return result

def preorder_traversal(root):
    """
    Preorder traversal: Root -> Left -> Right
    Used for creating copy of tree.
    """
    result = []
    if root:
        result.append(root.val)
        result.extend(preorder_traversal(root.left))
        result.extend(preorder_traversal(root.right))
    return result

def postorder_traversal(root):
    """
    Postorder traversal: Left -> Right -> Root
    Used for deleting tree safely.
    """
    result = []
    if root:
        result.extend(postorder_traversal(root.left))
        result.extend(postorder_traversal(root.right))
        result.append(root.val)
    return result

def level_order_traversal(root):
    """
    Level order traversal (BFS): Visit level by level.
    """
    if not root:
        return []
    
    result = []
    queue = [root]
    
    while queue:
        node = queue.pop(0)
        result.append(node.val)
        
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    
    return result

# Iterative implementations
def inorder_iterative(root):
    """Iterative inorder traversal using stack."""
    result = []
    stack = []
    current = root
    
    while stack or current:
        while current:
            stack.append(current)
            current = current.left
        
        current = stack.pop()
        result.append(current.val)
        current = current.right
    
    return result

# Example usage:
# root = TreeNode(1)
# root.left = TreeNode(2)
# root.right = TreeNode(3)
# root.left.left = TreeNode(4)
# root.left.right = TreeNode(5)
# print("Inorder:", inorder_traversal(root))  # [4, 2, 5, 1, 3]`,
  javascript: `/**
 * Binary Tree Traversal Implementation in JavaScript
 * Time Complexity: O(n) for all traversals
 * Space Complexity: O(h) where h is tree height
 */

/**
 * Node class for binary tree with value and left/right pointers.
 */
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * Inorder traversal: Left -> Root -> Right
 * For BST, this gives sorted order.
 * @param {TreeNode} root - Root of the tree
 * @returns {number[]} Array of values in inorder
 */
function inorderTraversal(root) {
    const result = [];
    if (root) {
        result.push(...inorderTraversal(root.left));
        result.push(root.val);
        result.push(...inorderTraversal(root.right));
    }
    return result;
}

/**
 * Preorder traversal: Root -> Left -> Right
 * Used for creating copy of tree.
 * @param {TreeNode} root - Root of the tree
 * @returns {number[]} Array of values in preorder
 */
function preorderTraversal(root) {
    const result = [];
    if (root) {
        result.push(root.val);
        result.push(...preorderTraversal(root.left));
        result.push(...preorderTraversal(root.right));
    }
    return result;
}

/**
 * Postorder traversal: Left -> Right -> Root
 * Used for deleting tree safely.
 * @param {TreeNode} root - Root of the tree
 * @returns {number[]} Array of values in postorder
 */
function postorderTraversal(root) {
    const result = [];
    if (root) {
        result.push(...postorderTraversal(root.left));
        result.push(...postorderTraversal(root.right));
        result.push(root.val);
    }
    return result;
}

/**
 * Level order traversal (BFS): Visit level by level.
 * @param {TreeNode} root - Root of the tree
 * @returns {number[]} Array of values level by level
 */
function levelOrderTraversal(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node.val);
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    
    return result;
}

/**
 * Iterative inorder traversal using stack.
 * @param {TreeNode} root - Root of the tree
 * @returns {number[]} Array of values in inorder
 */
function inorderIterative(root) {
    const result = [];
    const stack = [];
    let current = root;
    
    while (stack.length > 0 || current) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        
        current = stack.pop();
        result.push(current.val);
        current = current.right;
    }
    
    return result;
}

// Example usage:
// const root = new TreeNode(1);
// root.left = new TreeNode(2);
// root.right = new TreeNode(3);
// root.left.left = new TreeNode(4);
// root.left.right = new TreeNode(5);
// console.log("Inorder:", inorderTraversal(root)); // [4, 2, 5, 1, 3]

module.exports = { TreeNode, inorderTraversal, preorderTraversal, postorderTraversal, levelOrderTraversal };`,
  typescript: `/**
 * Binary Tree Traversal Implementation in TypeScript
 * Time Complexity: O(n) for all traversals
 * Space Complexity: O(h) where h is tree height
 */

/**
 * Node class for binary tree with value and left/right pointers.
 */
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

/**
 * Inorder traversal: Left -> Root -> Right
 * For BST, this gives sorted order.
 * @param root - Root of the tree
 * @returns Array of values in inorder
 */
function inorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];
    if (root) {
        result.push(...inorderTraversal(root.left));
        result.push(root.val);
        result.push(...inorderTraversal(root.right));
    }
    return result;
}

/**
 * Preorder traversal: Root -> Left -> Right
 * Used for creating copy of tree.
 * @param root - Root of the tree
 * @returns Array of values in preorder
 */
function preorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];
    if (root) {
        result.push(root.val);
        result.push(...preorderTraversal(root.left));
        result.push(...preorderTraversal(root.right));
    }
    return result;
}

/**
 * Postorder traversal: Left -> Right -> Root
 * Used for deleting tree safely.
 * @param root - Root of the tree
 * @returns Array of values in postorder
 */
function postorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];
    if (root) {
        result.push(...postorderTraversal(root.left));
        result.push(...postorderTraversal(root.right));
        result.push(root.val);
    }
    return result;
}

/**
 * Level order traversal (BFS): Visit level by level.
 * @param root - Root of the tree
 * @returns Array of values level by level
 */
function levelOrderTraversal(root: TreeNode | null): number[] {
    if (!root) return [];
    
    const result: number[] = [];
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
        const node = queue.shift()!;
        result.push(node.val);
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    
    return result;
}

/**
 * Iterative inorder traversal using stack.
 * @param root - Root of the tree
 * @returns Array of values in inorder
 */
function inorderIterative(root: TreeNode | null): number[] {
    const result: number[] = [];
    const stack: TreeNode[] = [];
    let current: TreeNode | null = root;
    
    while (stack.length > 0 || current) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        
        current = stack.pop()!;
        result.push(current.val);
        current = current.right;
    }
    
    return result;
}

// Example usage:
// const root = new TreeNode(1);
// root.left = new TreeNode(2);
// root.right = new TreeNode(3);
// root.left.left = new TreeNode(4);
// root.left.right = new TreeNode(5);
// console.log("Inorder:", inorderTraversal(root)); // [4, 2, 5, 1, 3]

export { TreeNode, inorderTraversal, preorderTraversal, postorderTraversal, levelOrderTraversal };`,

  java: `/**
 * Binary Tree Traversal Implementation in Java
 * Time Complexity: O(n) for all traversals
 * Space Complexity: O(h) where h is tree height
 */

import java.util.*;

/**
 * Node class for binary tree with value and left/right pointers.
 */
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class BinaryTreeTraversal {
    
    /**
     * Inorder traversal: Left -> Root -> Right
     * For BST, this gives sorted order.
     * @param root Root of the tree
     * @return List of values in inorder
     */
    public static List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root != null) {
            result.addAll(inorderTraversal(root.left));
            result.add(root.val);
            result.addAll(inorderTraversal(root.right));
        }
        return result;
    }
    
    /**
     * Preorder traversal: Root -> Left -> Right
     * Used for creating copy of tree.
     * @param root Root of the tree
     * @return List of values in preorder
     */
    public static List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root != null) {
            result.add(root.val);
            result.addAll(preorderTraversal(root.left));
            result.addAll(preorderTraversal(root.right));
        }
        return result;
    }
    
    /**
     * Postorder traversal: Left -> Right -> Root
     * Used for deleting tree safely.
     * @param root Root of the tree
     * @return List of values in postorder
     */
    public static List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root != null) {
            result.addAll(postorderTraversal(root.left));
            result.addAll(postorderTraversal(root.right));
            result.add(root.val);
        }
        return result;
    }
    
    /**
     * Level order traversal (BFS): Visit level by level.
     * @param root Root of the tree
     * @return List of values level by level
     */
    public static List<Integer> levelOrderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            result.add(node.val);
            
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        
        return result;
    }
    
    /**
     * Iterative inorder traversal using stack.
     * @param root Root of the tree
     * @return List of values in inorder
     */
    public static List<Integer> inorderIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;
        
        while (!stack.isEmpty() || current != null) {
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            
            current = stack.pop();
            result.add(current.val);
            current = current.right;
        }
        
        return result;
    }
    
    /**
     * Example usage and testing.
     */
    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);
        
        System.out.println("Inorder: " + inorderTraversal(root)); // [4, 2, 5, 1, 3]
        System.out.println("Preorder: " + preorderTraversal(root)); // [1, 2, 4, 5, 3]
        System.out.println("Postorder: " + postorderTraversal(root)); // [4, 5, 2, 3, 1]
        System.out.println("Level Order: " + levelOrderTraversal(root)); // [1, 2, 3, 4, 5]
    }
}`,

  cpp: `/**
 * Binary Tree Traversal Implementation in C++
 * Time Complexity: O(n) for all traversals
 * Space Complexity: O(h) where h is tree height
 */

#include <iostream>
#include <vector>
#include <queue>
#include <stack>

/**
 * Node structure for binary tree with value and left/right pointers.
 */
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode* left, TreeNode* right) : val(x), left(left), right(right) {}
};

class BinaryTreeTraversal {
public:
    /**
     * Inorder traversal: Left -> Root -> Right
     * For BST, this gives sorted order.
     * @param root Root of the tree
     * @return Vector of values in inorder
     */
    static std::vector<int> inorderTraversal(TreeNode* root) {
        std::vector<int> result;
        if (root) {
            std::vector<int> left = inorderTraversal(root->left);
            result.insert(result.end(), left.begin(), left.end());
            result.push_back(root->val);
            std::vector<int> right = inorderTraversal(root->right);
            result.insert(result.end(), right.begin(), right.end());
        }
        return result;
    }
    
    /**
     * Preorder traversal: Root -> Left -> Right
     * Used for creating copy of tree.
     * @param root Root of the tree
     * @return Vector of values in preorder
     */
    static std::vector<int> preorderTraversal(TreeNode* root) {
        std::vector<int> result;
        if (root) {
            result.push_back(root->val);
            std::vector<int> left = preorderTraversal(root->left);
            result.insert(result.end(), left.begin(), left.end());
            std::vector<int> right = preorderTraversal(root->right);
            result.insert(result.end(), right.begin(), right.end());
        }
        return result;
    }
    
    /**
     * Postorder traversal: Left -> Right -> Root
     * Used for deleting tree safely.
     * @param root Root of the tree
     * @return Vector of values in postorder
     */
    static std::vector<int> postorderTraversal(TreeNode* root) {
        std::vector<int> result;
        if (root) {
            std::vector<int> left = postorderTraversal(root->left);
            result.insert(result.end(), left.begin(), left.end());
            std::vector<int> right = postorderTraversal(root->right);
            result.insert(result.end(), right.begin(), right.end());
            result.push_back(root->val);
        }
        return result;
    }
    
    /**
     * Level order traversal (BFS): Visit level by level.
     * @param root Root of the tree
     * @return Vector of values level by level
     */
    static std::vector<int> levelOrderTraversal(TreeNode* root) {
        std::vector<int> result;
        if (!root) return result;
        
        std::queue<TreeNode*> queue;
        queue.push(root);
        
        while (!queue.empty()) {
            TreeNode* node = queue.front();
            queue.pop();
            result.push_back(node->val);
            
            if (node->left) queue.push(node->left);
            if (node->right) queue.push(node->right);
        }
        
        return result;
    }
    
    /**
     * Iterative inorder traversal using stack.
     * @param root Root of the tree
     * @return Vector of values in inorder
     */
    static std::vector<int> inorderIterative(TreeNode* root) {
        std::vector<int> result;
        std::stack<TreeNode*> stack;
        TreeNode* current = root;
        
        while (!stack.empty() || current) {
            while (current) {
                stack.push(current);
                current = current->left;
            }
            
            current = stack.top();
            stack.pop();
            result.push_back(current->val);
            current = current->right;
        }
        
        return result;
    }
};

// Example usage:
/*
int main() {
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);
    
    std::vector<int> inorder = BinaryTreeTraversal::inorderTraversal(root);
    std::cout << "Inorder: ";
    for (int val : inorder) std::cout << val << " "; // 4 2 5 1 3
    std::cout << std::endl;
    
    return 0;
}
*/`,

  csharp: `/**
 * Binary Tree Traversal Implementation in C#
 * Time Complexity: O(n) for all traversals
 * Space Complexity: O(h) where h is tree height
 */

using System;
using System.Collections.Generic;

/// <summary>
/// Node class for binary tree with value and left/right pointers.
/// </summary>
public class TreeNode 
{
    public int val;
    public TreeNode left;
    public TreeNode right;
    
    public TreeNode(int val = 0, TreeNode left = null, TreeNode right = null) 
    {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/// <summary>
/// Binary Tree Traversal implementation with various traversal methods.
/// </summary>
public class BinaryTreeTraversal 
{
    /// <summary>
    /// Inorder traversal: Left -> Root -> Right
    /// For BST, this gives sorted order.
    /// </summary>
    /// <param name="root">Root of the tree</param>
    /// <returns>List of values in inorder</returns>
    public static List<int> InorderTraversal(TreeNode root) 
    {
        List<int> result = new List<int>();
        if (root != null) 
        {
            result.AddRange(InorderTraversal(root.left));
            result.Add(root.val);
            result.AddRange(InorderTraversal(root.right));
        }
        return result;
    }
    
    /// <summary>
    /// Preorder traversal: Root -> Left -> Right
    /// Used for creating copy of tree.
    /// </summary>
    /// <param name="root">Root of the tree</param>
    /// <returns>List of values in preorder</returns>
    public static List<int> PreorderTraversal(TreeNode root) 
    {
        List<int> result = new List<int>();
        if (root != null) 
        {
            result.Add(root.val);
            result.AddRange(PreorderTraversal(root.left));
            result.AddRange(PreorderTraversal(root.right));
        }
        return result;
    }
    
    /// <summary>
    /// Postorder traversal: Left -> Right -> Root
    /// Used for deleting tree safely.
    /// </summary>
    /// <param name="root">Root of the tree</param>
    /// <returns>List of values in postorder</returns>
    public static List<int> PostorderTraversal(TreeNode root) 
    {
        List<int> result = new List<int>();
        if (root != null) 
        {
            result.AddRange(PostorderTraversal(root.left));
            result.AddRange(PostorderTraversal(root.right));
            result.Add(root.val);
        }
        return result;
    }
    
    /// <summary>
    /// Level order traversal (BFS): Visit level by level.
    /// </summary>
    /// <param name="root">Root of the tree</param>
    /// <returns>List of values level by level</returns>
    public static List<int> LevelOrderTraversal(TreeNode root) 
    {
        List<int> result = new List<int>();
        if (root == null) return result;
        
        Queue<TreeNode> queue = new Queue<TreeNode>();
        queue.Enqueue(root);
        
        while (queue.Count > 0) 
        {
            TreeNode node = queue.Dequeue();
            result.Add(node.val);
            
            if (node.left != null) queue.Enqueue(node.left);
            if (node.right != null) queue.Enqueue(node.right);
        }
        
        return result;
    }
    
    /// <summary>
    /// Iterative inorder traversal using stack.
    /// </summary>
    /// <param name="root">Root of the tree</param>
    /// <returns>List of values in inorder</returns>
    public static List<int> InorderIterative(TreeNode root) 
    {
        List<int> result = new List<int>();
        Stack<TreeNode> stack = new Stack<TreeNode>();
        TreeNode current = root;
        
        while (stack.Count > 0 || current != null) 
        {
            while (current != null) 
            {
                stack.Push(current);
                current = current.left;
            }
            
            current = stack.Pop();
            result.Add(current.val);
            current = current.right;
        }
        
        return result;
    }
}

// Example usage:
/*
class Program 
{
    static void Main() 
    {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);
        
        List<int> inorder = BinaryTreeTraversal.InorderTraversal(root);
        Console.WriteLine("Inorder: " + string.Join(", ", inorder)); // 4, 2, 5, 1, 3
    }
}
*/`,

  php: `<?php
/**
 * Binary Tree Traversal Implementation in PHP
 * Time Complexity: O(n) for all traversals
 * Space Complexity: O(h) where h is tree height
 */

/**
 * Node class for binary tree with value and left/right pointers.
 */
class TreeNode {
    public $val;
    public $left;
    public $right;
    
    public function __construct($val = 0, $left = null, $right = null) {
        $this->val = $val;
        $this->left = $left;
        $this->right = $right;
    }
}

/**
 * Binary Tree Traversal implementation with various traversal methods.
 */
class BinaryTreeTraversal {
    
    /**
     * Inorder traversal: Left -> Root -> Right
     * For BST, this gives sorted order.
     * @param TreeNode|null $root Root of the tree
     * @return array Array of values in inorder
     */
    public static function inorderTraversal($root) {
        $result = [];
        if ($root !== null) {
            $result = array_merge($result, self::inorderTraversal($root->left));
            $result[] = $root->val;
            $result = array_merge($result, self::inorderTraversal($root->right));
        }
        return $result;
    }
    
    /**
     * Preorder traversal: Root -> Left -> Right
     * Used for creating copy of tree.
     * @param TreeNode|null $root Root of the tree
     * @return array Array of values in preorder
     */
    public static function preorderTraversal($root) {
        $result = [];
        if ($root !== null) {
            $result[] = $root->val;
            $result = array_merge($result, self::preorderTraversal($root->left));
            $result = array_merge($result, self::preorderTraversal($root->right));
        }
        return $result;
    }
    
    /**
     * Postorder traversal: Left -> Right -> Root
     * Used for deleting tree safely.
     * @param TreeNode|null $root Root of the tree
     * @return array Array of values in postorder
     */
    public static function postorderTraversal($root) {
        $result = [];
        if ($root !== null) {
            $result = array_merge($result, self::postorderTraversal($root->left));
            $result = array_merge($result, self::postorderTraversal($root->right));
            $result[] = $root->val;
        }
        return $result;
    }
    
    /**
     * Level order traversal (BFS): Visit level by level.
     * @param TreeNode|null $root Root of the tree
     * @return array Array of values level by level
     */
    public static function levelOrderTraversal($root) {
        $result = [];
        if ($root === null) return $result;
        
        $queue = [$root];
        
        while (!empty($queue)) {
            $node = array_shift($queue);
            $result[] = $node->val;
            
            if ($node->left !== null) $queue[] = $node->left;
            if ($node->right !== null) $queue[] = $node->right;
        }
        
        return $result;
    }
    
    /**
     * Iterative inorder traversal using stack.
     * @param TreeNode|null $root Root of the tree
     * @return array Array of values in inorder
     */
    public static function inorderIterative($root) {
        $result = [];
        $stack = [];
        $current = $root;
        
        while (!empty($stack) || $current !== null) {
            while ($current !== null) {
                $stack[] = $current;
                $current = $current->left;
            }
            
            $current = array_pop($stack);
            $result[] = $current->val;
            $current = $current->right;
        }
        
        return $result;
    }
}

// Example usage:
/*
$root = new TreeNode(1);
$root->left = new TreeNode(2);
$root->right = new TreeNode(3);
$root->left->left = new TreeNode(4);
$root->left->right = new TreeNode(5);

$inorder = BinaryTreeTraversal::inorderTraversal($root);
echo "Inorder: " . implode(", ", $inorder) . "\n"; // 4, 2, 5, 1, 3
*/
?>`,

  ruby: `# Binary Tree Traversal Implementation in Ruby
# Time Complexity: O(n) for all traversals
# Space Complexity: O(h) where h is tree height

##
# Node class for binary tree with value and left/right pointers.
class TreeNode
  attr_accessor :val, :left, :right
  
  def initialize(val = 0, left = nil, right = nil)
    @val = val
    @left = left
    @right = right
  end
end

##
# Binary Tree Traversal implementation with various traversal methods.
class BinaryTreeTraversal
  
  ##
  # Inorder traversal: Left -> Root -> Right
  # For BST, this gives sorted order.
  # @param root [TreeNode, nil] Root of the tree
  # @return [Array<Integer>] Array of values in inorder
  def self.inorder_traversal(root)
    result = []
    if root
      result += inorder_traversal(root.left)
      result << root.val
      result += inorder_traversal(root.right)
    end
    result
  end
  
  ##
  # Preorder traversal: Root -> Left -> Right
  # Used for creating copy of tree.
  # @param root [TreeNode, nil] Root of the tree
  # @return [Array<Integer>] Array of values in preorder
  def self.preorder_traversal(root)
    result = []
    if root
      result << root.val
      result += preorder_traversal(root.left)
      result += preorder_traversal(root.right)
    end
    result
  end
  
  ##
  # Postorder traversal: Left -> Right -> Root
  # Used for deleting tree safely.
  # @param root [TreeNode, nil] Root of the tree
  # @return [Array<Integer>] Array of values in postorder
  def self.postorder_traversal(root)
    result = []
    if root
      result += postorder_traversal(root.left)
      result += postorder_traversal(root.right)
      result << root.val
    end
    result
  end
  
  ##
  # Level order traversal (BFS): Visit level by level.
  # @param root [TreeNode, nil] Root of the tree
  # @return [Array<Integer>] Array of values level by level
  def self.level_order_traversal(root)
    result = []
    return result unless root
    
    queue = [root]
    
    until queue.empty?
      node = queue.shift
      result << node.val
      
      queue << node.left if node.left
      queue << node.right if node.right
    end
    
    result
  end
  
  ##
  # Iterative inorder traversal using stack.
  # @param root [TreeNode, nil] Root of the tree
  # @return [Array<Integer>] Array of values in inorder
  def self.inorder_iterative(root)
    result = []
    stack = []
    current = root
    
    while !stack.empty? || current
      while current
        stack.push(current)
        current = current.left
      end
      
      current = stack.pop
      result << current.val
      current = current.right
    end
    
    result
  end
end

# Example usage:
# root = TreeNode.new(1)
# root.left = TreeNode.new(2)
# root.right = TreeNode.new(3)
# root.left.left = TreeNode.new(4)
# root.left.right = TreeNode.new(5)
# 
# inorder = BinaryTreeTraversal.inorder_traversal(root)
# puts "Inorder: #{inorder.join(', ')}" # 4, 2, 5, 1, 3`,

  swift: `/**
 * Binary Tree Traversal Implementation in Swift
 * Time Complexity: O(n) for all traversals
 * Space Complexity: O(h) where h is tree height
 */

import Foundation

/**
 * Node class for binary tree with value and left/right pointers.
 */
class TreeNode {
    var val: Int
    var left: TreeNode?
    var right: TreeNode?
    
    init() { self.val = 0; self.left = nil; self.right = nil; }
    init(_ val: Int) { self.val = val; self.left = nil; self.right = nil; }
    init(_ val: Int, _ left: TreeNode?, _ right: TreeNode?) {
        self.val = val
        self.left = left
        self.right = right
    }
}

/**
 * Binary Tree Traversal implementation with various traversal methods.
 */
class BinaryTreeTraversal {
    
    /**
     * Inorder traversal: Left -> Root -> Right
     * For BST, this gives sorted order.
     * - Parameter root: Root of the tree
     * - Returns: Array of values in inorder
     */
    static func inorderTraversal(_ root: TreeNode?) -> [Int] {
        var result: [Int] = []
        if let root = root {
            result.append(contentsOf: inorderTraversal(root.left))
            result.append(root.val)
            result.append(contentsOf: inorderTraversal(root.right))
        }
        return result
    }
    
    /**
     * Preorder traversal: Root -> Left -> Right
     * Used for creating copy of tree.
     * - Parameter root: Root of the tree
     * - Returns: Array of values in preorder
     */
    static func preorderTraversal(_ root: TreeNode?) -> [Int] {
        var result: [Int] = []
        if let root = root {
            result.append(root.val)
            result.append(contentsOf: preorderTraversal(root.left))
            result.append(contentsOf: preorderTraversal(root.right))
        }
        return result
    }
    
    /**
     * Postorder traversal: Left -> Right -> Root
     * Used for deleting tree safely.
     * - Parameter root: Root of the tree
     * - Returns: Array of values in postorder
     */
    static func postorderTraversal(_ root: TreeNode?) -> [Int] {
        var result: [Int] = []
        if let root = root {
            result.append(contentsOf: postorderTraversal(root.left))
            result.append(contentsOf: postorderTraversal(root.right))
            result.append(root.val)
        }
        return result
    }
    
    /**
     * Level order traversal (BFS): Visit level by level.
     * - Parameter root: Root of the tree
     * - Returns: Array of values level by level
     */
    static func levelOrderTraversal(_ root: TreeNode?) -> [Int] {
        var result: [Int] = []
        guard let root = root else { return result }
        
        var queue: [TreeNode] = [root]
        
        while !queue.isEmpty {
            let node = queue.removeFirst()
            result.append(node.val)
            
            if let left = node.left { queue.append(left) }
            if let right = node.right { queue.append(right) }
        }
        
        return result
    }
    
    /**
     * Iterative inorder traversal using stack.
     * - Parameter root: Root of the tree
     * - Returns: Array of values in inorder
     */
    static func inorderIterative(_ root: TreeNode?) -> [Int] {
        var result: [Int] = []
        var stack: [TreeNode] = []
        var current = root
        
        while !stack.isEmpty || current != nil {
            while let curr = current {
                stack.append(curr)
                current = curr.left
            }
            
            current = stack.removeLast()
            result.append(current!.val)
            current = current!.right
        }
        
        return result
    }
}

// Example usage:
/*
let root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left?.left = TreeNode(4)
root.left?.right = TreeNode(5)

let inorder = BinaryTreeTraversal.inorderTraversal(root)
print("Inorder: \\(inorder)") // [4, 2, 5, 1, 3]
*/`,

  go: `/**
 * Binary Tree Traversal Implementation in Go
 * Time Complexity: O(n) for all traversals
 * Space Complexity: O(h) where h is tree height
 */

package main

import "fmt"

// TreeNode represents a node in the binary tree with value and left/right pointers.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// NewTreeNode creates a new TreeNode with the given value.
func NewTreeNode(val int) *TreeNode {
	return &TreeNode{Val: val, Left: nil, Right: nil}
}

// inorderTraversal performs inorder traversal: Left -> Root -> Right
// For BST, this gives sorted order.
func inorderTraversal(root *TreeNode) []int {
	var result []int
	if root != nil {
		result = append(result, inorderTraversal(root.Left)...)
		result = append(result, root.Val)
		result = append(result, inorderTraversal(root.Right)...)
	}
	return result
}

// preorderTraversal performs preorder traversal: Root -> Left -> Right
// Used for creating copy of tree.
func preorderTraversal(root *TreeNode) []int {
	var result []int
	if root != nil {
		result = append(result, root.Val)
		result = append(result, preorderTraversal(root.Left)...)
		result = append(result, preorderTraversal(root.Right)...)
	}
	return result
}

// postorderTraversal performs postorder traversal: Left -> Right -> Root
// Used for deleting tree safely.
func postorderTraversal(root *TreeNode) []int {
	var result []int
	if root != nil {
		result = append(result, postorderTraversal(root.Left)...)
		result = append(result, postorderTraversal(root.Right)...)
		result = append(result, root.Val)
	}
	return result
}

// levelOrderTraversal performs level order traversal (BFS): Visit level by level.
func levelOrderTraversal(root *TreeNode) []int {
	var result []int
	if root == nil {
		return result
	}
	
	queue := []*TreeNode{root}
	
	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		result = append(result, node.Val)
		
		if node.Left != nil {
			queue = append(queue, node.Left)
		}
		if node.Right != nil {
			queue = append(queue, node.Right)
		}
	}
	
	return result
}

// inorderIterative performs iterative inorder traversal using stack.
func inorderIterative(root *TreeNode) []int {
	var result []int
	var stack []*TreeNode
	current := root
	
	for len(stack) > 0 || current != nil {
		for current != nil {
			stack = append(stack, current)
			current = current.Left
		}
		
		current = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		result = append(result, current.Val)
		current = current.Right
	}
	
	return result
}

// Example usage:
/*
func main() {
	root := NewTreeNode(1)
	root.Left = NewTreeNode(2)
	root.Right = NewTreeNode(3)
	root.Left.Left = NewTreeNode(4)
	root.Left.Right = NewTreeNode(5)
	
	inorder := inorderTraversal(root)
	fmt.Println("Inorder:", inorder) // [4 2 5 1 3]
	
	preorder := preorderTraversal(root)
	fmt.Println("Preorder:", preorder) // [1 2 4 5 3]
	
	postorder := postorderTraversal(root)
	fmt.Println("Postorder:", postorder) // [4 5 2 3 1]
	
	levelOrder := levelOrderTraversal(root)
	fmt.Println("Level Order:", levelOrder) // [1 2 3 4 5]
}
*/`
}