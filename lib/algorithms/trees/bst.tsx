import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const bstExplanationContent = (
  <AlgorithmExplanation>
    <h2>Binary Search Tree (BST)</h2>
    <p>
      A Binary Search Tree is a hierarchical data structure in which each node has at most two children, referred to as
      the left child and the right child. For each node, all elements in the left subtree are less than the node, and
      all elements in the right subtree are greater than the node.
    </p>
    <h3>Properties:</h3>
    <ul>
      <li>The left subtree of a node contains only nodes with keys less than the node's key.</li>
      <li>The right subtree of a node contains only nodes with keys greater than the node's key.</li>
      <li>The left and right subtree each must also be a binary search tree.</li>
      <li>There must be no duplicate nodes.</li>
    </ul>
    <h3>Basic Operations:</h3>
    <ul>
      <li><strong>Search:</strong> Find a specific value in the tree</li>
      <li><strong>Insert:</strong> Add a new node to the tree</li>
      <li><strong>Delete:</strong> Remove a node from the tree</li>
      <li><strong>Traversal:</strong> Visit all nodes (Inorder, Preorder, Postorder)</li>
    </ul>
    <h3>Time Complexity:</h3>
    <ul>
      <li><strong>Average case:</strong> $$O(\log n)$$ for search, insert, delete</li>
      <li><strong>Worst case:</strong> $$O(n)$$ when the tree becomes skewed (like a linked list)</li>
      <li><strong>Best case:</strong> $$O(\log n)$$ when the tree is balanced</li>
    </ul>
    <h3>Space Complexity:</h3>
    <p>$$O(n)$$ where n is the number of nodes in the tree.</p>
  </AlgorithmExplanation>
)

export const bstCodeSnippets = {
  python: `# Binary Search Tree Implementation in Python
# Time Complexity: O(log n) average, O(n) worst case
# Space Complexity: O(n)

class TreeNode:
    """Node class for BST with value and left/right pointers."""
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class BST:
    """Binary Search Tree implementation with insert, search, delete operations."""
    
    def __init__(self):
        """Initialize empty BST."""
        self.root = None
    
    def insert(self, val):
        """Insert a value into the BST."""
        self.root = self._insert_recursive(self.root, val)
    
    def _insert_recursive(self, node, val):
        """Recursively insert value maintaining BST property."""
        if not node:
            return TreeNode(val)
        
        if val < node.val:
            node.left = self._insert_recursive(node.left, val)
        elif val > node.val:
            node.right = self._insert_recursive(node.right, val)
        # Duplicate values are ignored
        
        return node
    
    def search(self, val):
        """Search for a value in the BST."""
        return self._search_recursive(self.root, val)
    
    def _search_recursive(self, node, val):
        """Recursively search for value in BST."""
        if not node or node.val == val:
            return node
        
        if val < node.val:
            return self._search_recursive(node.left, val)
        return self._search_recursive(node.right, val)
    
    def delete(self, val):
        """Delete a value from the BST."""
        self.root = self._delete_recursive(self.root, val)
    
    def _delete_recursive(self, node, val):
        """Recursively delete value maintaining BST property."""
        if not node:
            return node
        
        if val < node.val:
            node.left = self._delete_recursive(node.left, val)
        elif val > node.val:
            node.right = self._delete_recursive(node.right, val)
        else:
            # Node to be deleted found
            if not node.left:
                return node.right
            elif not node.right:
                return node.left
            
            # Node with two children - get inorder successor
            min_node = self._find_min(node.right)
            node.val = min_node.val
            node.right = self._delete_recursive(node.right, min_node.val)
        
        return node
    
    def _find_min(self, node):
        """Find minimum value node in subtree."""
        while node.left:
            node = node.left
        return node
    
    def inorder_traversal(self):
        """Return inorder traversal of BST."""
        result = []
        self._inorder_helper(self.root, result)
        return result
    
    def _inorder_helper(self, node, result):
        """Helper for inorder traversal."""
        if node:
            self._inorder_helper(node.left, result)
            result.append(node.val)
            self._inorder_helper(node.right, result)

# Example usage:
# bst = BST()
# values = [50, 30, 70, 20, 40, 60, 80]
# for val in values:
#     bst.insert(val)
# print(bst.inorder_traversal())  # [20, 30, 40, 50, 60, 70, 80]`,
  javascript: `/**
 * Binary Search Tree Implementation in JavaScript
 * Time Complexity: O(log n) average, O(n) worst case
 * Space Complexity: O(n)
 */

/**
 * Node class for BST with value and left/right pointers.
 */
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * Binary Search Tree implementation with insert, search, delete operations.
 */
class BST {
    constructor() {
        this.root = null;
    }
    
    /**
     * Insert a value into the BST.
     * @param {number} val - Value to insert
     */
    insert(val) {
        this.root = this._insertRecursive(this.root, val);
    }
    
    /**
     * Recursively insert value maintaining BST property.
     * @param {TreeNode} node - Current node
     * @param {number} val - Value to insert
     * @returns {TreeNode} Updated node
     */
    _insertRecursive(node, val) {
        if (!node) {
            return new TreeNode(val);
        }
        
        if (val < node.val) {
            node.left = this._insertRecursive(node.left, val);
        } else if (val > node.val) {
            node.right = this._insertRecursive(node.right, val);
        }
        // Duplicate values are ignored
        
        return node;
    }
    
    /**
     * Search for a value in the BST.
     * @param {number} val - Value to search for
     * @returns {TreeNode|null} Found node or null
     */
    search(val) {
        return this._searchRecursive(this.root, val);
    }
    
    /**
     * Recursively search for value in BST.
     * @param {TreeNode} node - Current node
     * @param {number} val - Value to search for
     * @returns {TreeNode|null} Found node or null
     */
    _searchRecursive(node, val) {
        if (!node || node.val === val) {
            return node;
        }
        
        if (val < node.val) {
            return this._searchRecursive(node.left, val);
        }
        return this._searchRecursive(node.right, val);
    }
    
    /**
     * Delete a value from the BST.
     * @param {number} val - Value to delete
     */
    delete(val) {
        this.root = this._deleteRecursive(this.root, val);
    }
    
    /**
     * Recursively delete value maintaining BST property.
     * @param {TreeNode} node - Current node
     * @param {number} val - Value to delete
     * @returns {TreeNode|null} Updated node
     */
    _deleteRecursive(node, val) {
        if (!node) return node;
        
        if (val < node.val) {
            node.left = this._deleteRecursive(node.left, val);
        } else if (val > node.val) {
            node.right = this._deleteRecursive(node.right, val);
        } else {
            // Node to be deleted found
            if (!node.left) return node.right;
            if (!node.right) return node.left;
            
            // Node with two children - get inorder successor
            const minNode = this._findMin(node.right);
            node.val = minNode.val;
            node.right = this._deleteRecursive(node.right, minNode.val);
        }
        return node;
    }
    
    /**
     * Find minimum value node in subtree.
     * @param {TreeNode} node - Root of subtree
     * @returns {TreeNode} Node with minimum value
     */
    _findMin(node) {
        while (node.left) {
            node = node.left;
        }
        return node;
    }
    
    /**
     * Return inorder traversal of BST.
     * @returns {number[]} Array of values in sorted order
     */
    inorderTraversal() {
        const result = [];
        this._inorderHelper(this.root, result);
        return result;
    }
    
    /**
     * Helper for inorder traversal.
     * @param {TreeNode} node - Current node
     * @param {number[]} result - Array to store results
     */
    _inorderHelper(node, result) {
        if (node) {
            this._inorderHelper(node.left, result);
            result.push(node.val);
            this._inorderHelper(node.right, result);
        }
    }
}

// Example usage:
// const bst = new BST();
// const values = [50, 30, 70, 20, 40, 60, 80];
// values.forEach(val => bst.insert(val));
// console.log(bst.inorderTraversal()); // [20, 30, 40, 50, 60, 70, 80]

module.exports = { BST, TreeNode };`,
  typescript: `/**
 * Binary Search Tree Implementation in TypeScript
 * Time Complexity: O(log n) average, O(n) worst case
 * Space Complexity: O(n)
 */

/**
 * Node class for BST with value and left/right pointers.
 */
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    
    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * Binary Search Tree implementation with insert, search, delete operations.
 */
class BST {
    root: TreeNode | null;
    
    constructor() {
        this.root = null;
    }
    
    /**
     * Insert a value into the BST.
     * @param val - Value to insert
     */
    insert(val: number): void {
        this.root = this._insertRecursive(this.root, val);
    }
    
    /**
     * Recursively insert value maintaining BST property.
     * @param node - Current node
     * @param val - Value to insert
     * @returns Updated node
     */
    private _insertRecursive(node: TreeNode | null, val: number): TreeNode {
        if (!node) {
            return new TreeNode(val);
        }
        
        if (val < node.val) {
            node.left = this._insertRecursive(node.left, val);
        } else if (val > node.val) {
            node.right = this._insertRecursive(node.right, val);
        }
        // Duplicate values are ignored
        
        return node;
    }
    
    /**
     * Search for a value in the BST.
     * @param val - Value to search for
     * @returns Found node or null
     */
    search(val: number): TreeNode | null {
        return this._searchRecursive(this.root, val);
    }
    
    /**
     * Recursively search for value in BST.
     * @param node - Current node
     * @param val - Value to search for
     * @returns Found node or null
     */
    private _searchRecursive(node: TreeNode | null, val: number): TreeNode | null {
        if (!node || node.val === val) {
            return node;
        }
        
        if (val < node.val) {
            return this._searchRecursive(node.left, val);
        }
        return this._searchRecursive(node.right, val);
    }
    
    /**
     * Delete a value from the BST.
     * @param val - Value to delete
     */
    delete(val: number): void {
        this.root = this._deleteRecursive(this.root, val);
    }
    
    /**
     * Recursively delete value maintaining BST property.
     * @param node - Current node
     * @param val - Value to delete
     * @returns Updated node
     */
    private _deleteRecursive(node: TreeNode | null, val: number): TreeNode | null {
        if (!node) return node;
        
        if (val < node.val) {
            node.left = this._deleteRecursive(node.left, val);
        } else if (val > node.val) {
            node.right = this._deleteRecursive(node.right, val);
        } else {
            // Node to be deleted found
            if (!node.left) return node.right;
            if (!node.right) return node.left;
            
            // Node with two children - get inorder successor
            const minNode = this._findMin(node.right);
            node.val = minNode.val;
            node.right = this._deleteRecursive(node.right, minNode.val);
        }
        return node;
    }
    
    /**
     * Find minimum value node in subtree.
     * @param node - Root of subtree
     * @returns Node with minimum value
     */
    private _findMin(node: TreeNode): TreeNode {
        while (node.left) {
            node = node.left;
        }
        return node;
    }
    
    /**
     * Return inorder traversal of BST.
     * @returns Array of values in sorted order
     */
    inorderTraversal(): number[] {
        const result: number[] = [];
        this._inorderHelper(this.root, result);
        return result;
    }
    
    /**
     * Helper for inorder traversal.
     * @param node - Current node
     * @param result - Array to store results
     */
    private _inorderHelper(node: TreeNode | null, result: number[]): void {
        if (node) {
            this._inorderHelper(node.left, result);
            result.push(node.val);
            this._inorderHelper(node.right, result);
        }
    }
}

// Example usage:
// const bst = new BST();
// const values = [50, 30, 70, 20, 40, 60, 80];
// values.forEach(val => bst.insert(val));
// console.log(bst.inorderTraversal()); // [20, 30, 40, 50, 60, 70, 80]

export { BST, TreeNode };`,
  java: `/**
 * Binary Search Tree Implementation in Java
 * Time Complexity: O(log n) average, O(n) worst case
 * Space Complexity: O(n)
 */

import java.util.*;

/**
 * Node class for BST with value and left/right pointers.
 */
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    
    /**
     * Constructor for TreeNode.
     * @param val Value for the node
     */
    TreeNode(int val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
    
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * Binary Search Tree implementation with insert, search, delete operations.
 */
public class BST {
    private TreeNode root;
    
    /**
     * Initialize empty BST.
     */
    public BST() {
        this.root = null;
    }
    
    /**
     * Insert a value into the BST.
     * @param val Value to insert
     */
    public void insert(int val) {
        root = insertRecursive(root, val);
    }
    
    /**
     * Recursively insert value maintaining BST property.
     * @param node Current node
     * @param val Value to insert
     * @return Updated node
     */
    private TreeNode insertRecursive(TreeNode node, int val) {
        if (node == null) {
            return new TreeNode(val);
        }
        
        if (val < node.val) {
            node.left = insertRecursive(node.left, val);
        } else if (val > node.val) {
            node.right = insertRecursive(node.right, val);
        }
        // Duplicate values are ignored
        
        return node;
    }
    
    /**
     * Search for a value in the BST.
     * @param val Value to search for
     * @return Found node or null
     */
    public TreeNode search(int val) {
        return searchRecursive(root, val);
    }
    
    /**
     * Recursively search for value in BST.
     * @param node Current node
     * @param val Value to search for
     * @return Found node or null
     */
    private TreeNode searchRecursive(TreeNode node, int val) {
        if (node == null || node.val == val) {
            return node;
        }
        
        if (val < node.val) {
            return searchRecursive(node.left, val);
        }
        return searchRecursive(node.right, val);
    }
    
    /**
     * Delete a value from the BST.
     * @param val Value to delete
     */
    public void delete(int val) {
        root = deleteRecursive(root, val);
    }
    
    /**
     * Recursively delete value maintaining BST property.
     * @param node Current node
     * @param val Value to delete
     * @return Updated node
     */
    private TreeNode deleteRecursive(TreeNode node, int val) {
        if (node == null) return node;
        
        if (val < node.val) {
            node.left = deleteRecursive(node.left, val);
        } else if (val > node.val) {
            node.right = deleteRecursive(node.right, val);
        } else {
            // Node to be deleted found
            if (node.left == null) return node.right;
            if (node.right == null) return node.left;
            
            // Node with two children - get inorder successor
            TreeNode minNode = findMin(node.right);
            node.val = minNode.val;
            node.right = deleteRecursive(node.right, minNode.val);
        }
        return node;
    }
    
    /**
     * Find minimum value node in subtree.
     * @param node Root of subtree
     * @return Node with minimum value
     */
    private TreeNode findMin(TreeNode node) {
        while (node.left != null) {
            node = node.left;
        }
        return node;
    }
    
    /**
     * Return inorder traversal of BST.
     * @return List of values in sorted order
     */
    public List<Integer> inorderTraversal() {
        List<Integer> result = new ArrayList<>();
        inorderHelper(root, result);
        return result;
    }
    
    /**
     * Helper for inorder traversal.
     * @param node Current node
     * @param result List to store results
     */
    private void inorderHelper(TreeNode node, List<Integer> result) {
        if (node != null) {
            inorderHelper(node.left, result);
            result.add(node.val);
            inorderHelper(node.right, result);
        }
    }
    
    /**
     * Example usage and testing.
     */
    public static void main(String[] args) {
        BST bst = new BST();
        int[] values = {50, 30, 70, 20, 40, 60, 80};
        
        for (int val : values) {
            bst.insert(val);
        }
        
        System.out.println(bst.inorderTraversal()); // [20, 30, 40, 50, 60, 70, 80]
        
        System.out.println("Search 40: " + (bst.search(40) != null));
        System.out.println("Search 99: " + (bst.search(99) != null));
    }
}`,
  cpp: `/**
 * Binary Search Tree Implementation in C++
 * Time Complexity: O(log n) average, O(n) worst case
 * Space Complexity: O(n)
 */

#include <iostream>
#include <vector>
#include <memory>

/**
 * Node structure for BST with value and left/right pointers.
 */
struct TreeNode {
    int val;
    std::shared_ptr<TreeNode> left;
    std::shared_ptr<TreeNode> right;
    
    /**
     * Constructor for TreeNode.
     * @param value Value for the node
     */
    TreeNode(int value) : val(value), left(nullptr), right(nullptr) {}
    
    TreeNode(int value, std::shared_ptr<TreeNode> l, std::shared_ptr<TreeNode> r) 
        : val(value), left(l), right(r) {}
};

/**
 * Binary Search Tree implementation with insert, search, delete operations.
 */
class BST {
private:
    std::shared_ptr<TreeNode> root;
    
    /**
     * Recursively insert value maintaining BST property.
     * @param node Current node
     * @param val Value to insert
     * @return Updated node
     */
    std::shared_ptr<TreeNode> insertRecursive(std::shared_ptr<TreeNode> node, int val) {
        if (!node) {
            return std::make_shared<TreeNode>(val);
        }
        
        if (val < node->val) {
            node->left = insertRecursive(node->left, val);
        } else if (val > node->val) {
            node->right = insertRecursive(node->right, val);
        }
        // Duplicate values are ignored
        
        return node;
    }
    
    /**
     * Recursively search for value in BST.
     * @param node Current node
     * @param val Value to search for
     * @return Found node or nullptr
     */
    std::shared_ptr<TreeNode> searchRecursive(std::shared_ptr<TreeNode> node, int val) {
        if (!node || node->val == val) {
            return node;
        }
        
        if (val < node->val) {
            return searchRecursive(node->left, val);
        }
        return searchRecursive(node->right, val);
    }
    
    /**
     * Recursively delete value maintaining BST property.
     * @param node Current node
     * @param val Value to delete
     * @return Updated node
     */
    std::shared_ptr<TreeNode> deleteRecursive(std::shared_ptr<TreeNode> node, int val) {
        if (!node) return node;
        
        if (val < node->val) {
            node->left = deleteRecursive(node->left, val);
        } else if (val > node->val) {
            node->right = deleteRecursive(node->right, val);
        } else {
            // Node to be deleted found
            if (!node->left) return node->right;
            if (!node->right) return node->left;
            
            // Node with two children - get inorder successor
            std::shared_ptr<TreeNode> minNode = findMin(node->right);
            node->val = minNode->val;
            node->right = deleteRecursive(node->right, minNode->val);
        }
        return node;
    }
    
    /**
     * Find minimum value node in subtree.
     * @param node Root of subtree
     * @return Node with minimum value
     */
    std::shared_ptr<TreeNode> findMin(std::shared_ptr<TreeNode> node) {
        while (node->left) {
            node = node->left;
        }
        return node;
    }
    
    /**
     * Helper for inorder traversal.
     * @param node Current node
     * @param result Vector to store results
     */
    void inorderHelper(std::shared_ptr<TreeNode> node, std::vector<int>& result) {
        if (node) {
            inorderHelper(node->left, result);
            result.push_back(node->val);
            inorderHelper(node->right, result);
        }
    }
    
public:
    /**
     * Initialize empty BST.
     */
    BST() : root(nullptr) {}
    
    /**
     * Insert a value into the BST.
     * @param val Value to insert
     */
    void insert(int val) {
        root = insertRecursive(root, val);
    }
    
    /**
     * Search for a value in the BST.
     * @param val Value to search for
     * @return Found node or nullptr
     */
    std::shared_ptr<TreeNode> search(int val) {
        return searchRecursive(root, val);
    }
    
    /**
     * Delete a value from the BST.
     * @param val Value to delete
     */
    void deleteNode(int val) {
        root = deleteRecursive(root, val);
    }
    
    /**
     * Return inorder traversal of BST.
     * @return Vector of values in sorted order
     */
    std::vector<int> inorderTraversal() {
        std::vector<int> result;
        inorderHelper(root, result);
        return result;
    }
};

// Example usage:
/*
int main() {
    BST bst;
    std::vector<int> values = {50, 30, 70, 20, 40, 60, 80};
    
    for (int val : values) {
        bst.insert(val);
    }
    
    std::vector<int> traversal = bst.inorderTraversal();
    std::cout << "Inorder traversal: ";
    for (int val : traversal) {
        std::cout << val << " ";
    }
    std::cout << std::endl; // Output: 20 30 40 50 60 70 80
    
    std::cout << "Search 40: " << (bst.search(40) != nullptr) << std::endl;
    std::cout << "Search 99: " << (bst.search(99) != nullptr) << std::endl;
    
    return 0;
}
*/`,
  csharp: `/**
 * Binary Search Tree Implementation in C#
 * Time Complexity: O(log n) average, O(n) worst case
 * Space Complexity: O(n)
 */

using System;
using System.Collections.Generic;

/// <summary>
/// Node class for BST with value and left/right pointers.
/// </summary>
public class TreeNode 
{
    public int Val { get; set; }
    public TreeNode Left { get; set; }
    public TreeNode Right { get; set; }
    
    /// <summary>
    /// Constructor for TreeNode.
    /// </summary>
    /// <param name="val">Value for the node</param>
    public TreeNode(int val, TreeNode left = null, TreeNode right = null) 
    {
        Val = val;
        Left = left;
        Right = right;
    }
}

/// <summary>
/// Binary Search Tree implementation with insert, search, delete operations.
/// </summary>
public class BST 
{
    private TreeNode root;
    
    /// <summary>
    /// Initialize empty BST.
    /// </summary>
    public BST() 
    {
        root = null;
    }
    
    /// <summary>
    /// Insert a value into the BST.
    /// </summary>
    /// <param name="val">Value to insert</param>
    public void Insert(int val) 
    {
        root = InsertRecursive(root, val);
    }
    
    /// <summary>
    /// Recursively insert value maintaining BST property.
    /// </summary>
    /// <param name="node">Current node</param>
    /// <param name="val">Value to insert</param>
    /// <returns>Updated node</returns>
    private TreeNode InsertRecursive(TreeNode node, int val) 
    {
        if (node == null) 
        {
            return new TreeNode(val);
        }
        
        if (val < node.Val) 
        {
            node.Left = InsertRecursive(node.Left, val);
        } 
        else if (val > node.Val) 
        {
            node.Right = InsertRecursive(node.Right, val);
        }
        // Duplicate values are ignored
        
        return node;
    }
    
    /// <summary>
    /// Search for a value in the BST.
    /// </summary>
    /// <param name="val">Value to search for</param>
    /// <returns>Found node or null</returns>
    public TreeNode Search(int val) 
    {
        return SearchRecursive(root, val);
    }
    
    /// <summary>
    /// Recursively search for value in BST.
    /// </summary>
    /// <param name="node">Current node</param>
    /// <param name="val">Value to search for</param>
    /// <returns>Found node or null</returns>
    private TreeNode SearchRecursive(TreeNode node, int val) 
    {
        if (node == null || node.Val == val) 
        {
            return node;
        }
        
        if (val < node.Val) 
        {
            return SearchRecursive(node.Left, val);
        }
        return SearchRecursive(node.Right, val);
    }
    
    /// <summary>
    /// Delete a value from the BST.
    /// </summary>
    /// <param name="val">Value to delete</param>
    public void Delete(int val) 
    {
        root = DeleteRecursive(root, val);
    }
    
    /// <summary>
    /// Recursively delete value maintaining BST property.
    /// </summary>
    /// <param name="node">Current node</param>
    /// <param name="val">Value to delete</param>
    /// <returns>Updated node</returns>
    private TreeNode DeleteRecursive(TreeNode node, int val) 
    {
        if (node == null) return node;
        
        if (val < node.Val) 
        {
            node.Left = DeleteRecursive(node.Left, val);
        } 
        else if (val > node.Val) 
        {
            node.Right = DeleteRecursive(node.Right, val);
        } 
        else 
        {
            // Node to be deleted found
            if (node.Left == null) return node.Right;
            if (node.Right == null) return node.Left;
            
            // Node with two children - get inorder successor
            TreeNode minNode = FindMin(node.Right);
            node.Val = minNode.Val;
            node.Right = DeleteRecursive(node.Right, minNode.Val);
        }
        return node;
    }
    
    /// <summary>
    /// Find minimum value node in subtree.
    /// </summary>
    /// <param name="node">Root of subtree</param>
    /// <returns>Node with minimum value</returns>
    private TreeNode FindMin(TreeNode node) 
    {
        while (node.Left != null) 
        {
            node = node.Left;
        }
        return node;
    }
    
    /// <summary>
    /// Return inorder traversal of BST.
    /// </summary>
    /// <returns>List of values in sorted order</returns>
    public List<int> InorderTraversal() 
    {
        List<int> result = new List<int>();
        InorderHelper(root, result);
        return result;
    }
    
    /// <summary>
    /// Helper for inorder traversal.
    /// </summary>
    /// <param name="node">Current node</param>
    /// <param name="result">List to store results</param>
    private void InorderHelper(TreeNode node, List<int> result) 
    {
        if (node != null) 
        {
            InorderHelper(node.Left, result);
            result.Add(node.Val);
            InorderHelper(node.Right, result);
        }
    }
}

// Example usage:
/*
class Program 
{
    static void Main() 
    {
        BST bst = new BST();
        int[] values = {50, 30, 70, 20, 40, 60, 80};
        
        foreach (int val in values) 
        {
            bst.Insert(val);
        }
        
        List<int> traversal = bst.InorderTraversal();
        Console.WriteLine("Inorder traversal: " + string.Join(", ", traversal));
        // Output: 20, 30, 40, 50, 60, 70, 80
        
        Console.WriteLine("Search 40: " + (bst.Search(40) != null));
        Console.WriteLine("Search 99: " + (bst.Search(99) != null));
    }
}
*/`,
  php: `<?php
/**
 * Binary Search Tree Implementation in PHP
 * Time Complexity: O(log n) average, O(n) worst case
 * Space Complexity: O(n)
 */

/**
 * Node class for BST with value and left/right pointers.
 */
class TreeNode {
    public $val;
    public $left;
    public $right;
    
    /**
     * Constructor for TreeNode.
     * @param int $val Value for the node
     * @param TreeNode|null $left Left child
     * @param TreeNode|null $right Right child
     */
    public function __construct($val, $left = null, $right = null) {
        $this->val = $val;
        $this->left = $left;
        $this->right = $right;
    }
}

/**
 * Binary Search Tree implementation with insert, search, delete operations.
 */
class BST {
    private $root;
    
    /**
     * Initialize empty BST.
     */
    public function __construct() {
        $this->root = null;
    }
    
    /**
     * Insert a value into the BST.
     * @param int $val Value to insert
     */
    public function insert($val) {
        $this->root = $this->insertRecursive($this->root, $val);
    }
    
    /**
     * Recursively insert value maintaining BST property.
     * @param TreeNode|null $node Current node
     * @param int $val Value to insert
     * @return TreeNode Updated node
     */
    private function insertRecursive($node, $val) {
        if ($node === null) {
            return new TreeNode($val);
        }
        
        if ($val < $node->val) {
            $node->left = $this->insertRecursive($node->left, $val);
        } elseif ($val > $node->val) {
            $node->right = $this->insertRecursive($node->right, $val);
        }
        // Duplicate values are ignored
        
        return $node;
    }
    
    /**
     * Search for a value in the BST.
     * @param int $val Value to search for
     * @return TreeNode|null Found node or null
     */
    public function search($val) {
        return $this->searchRecursive($this->root, $val);
    }
    
    /**
     * Recursively search for value in BST.
     * @param TreeNode|null $node Current node
     * @param int $val Value to search for
     * @return TreeNode|null Found node or null
     */
    private function searchRecursive($node, $val) {
        if ($node === null || $node->val === $val) {
            return $node;
        }
        
        if ($val < $node->val) {
            return $this->searchRecursive($node->left, $val);
        }
        return $this->searchRecursive($node->right, $val);
    }
    
    /**
     * Delete a value from the BST.
     * @param int $val Value to delete
     */
    public function delete($val) {
        $this->root = $this->deleteRecursive($this->root, $val);
    }
    
    /**
     * Recursively delete value maintaining BST property.
     * @param TreeNode|null $node Current node
     * @param int $val Value to delete
     * @return TreeNode|null Updated node
     */
    private function deleteRecursive($node, $val) {
        if ($node === null) return $node;
        
        if ($val < $node->val) {
            $node->left = $this->deleteRecursive($node->left, $val);
        } elseif ($val > $node->val) {
            $node->right = $this->deleteRecursive($node->right, $val);
        } else {
            // Node to be deleted found
            if ($node->left === null) return $node->right;
            if ($node->right === null) return $node->left;
            
            // Node with two children - get inorder successor
            $minNode = $this->findMin($node->right);
            $node->val = $minNode->val;
            $node->right = $this->deleteRecursive($node->right, $minNode->val);
        }
        return $node;
    }
    
    /**
     * Find minimum value node in subtree.
     * @param TreeNode $node Root of subtree
     * @return TreeNode Node with minimum value
     */
    private function findMin($node) {
        while ($node->left !== null) {
            $node = $node->left;
        }
        return $node;
    }
    
    /**
     * Return inorder traversal of BST.
     * @return array Array of values in sorted order
     */
    public function inorderTraversal() {
        $result = [];
        $this->inorderHelper($this->root, $result);
        return $result;
    }
    
    /**
     * Helper for inorder traversal.
     * @param TreeNode|null $node Current node
     * @param array &$result Array to store results
     */
    private function inorderHelper($node, &$result) {
        if ($node !== null) {
            $this->inorderHelper($node->left, $result);
            $result[] = $node->val;
            $this->inorderHelper($node->right, $result);
        }
    }
}

// Example usage:
/*
$bst = new BST();
$values = [50, 30, 70, 20, 40, 60, 80];

foreach ($values as $val) {
    $bst->insert($val);
}

$traversal = $bst->inorderTraversal();
echo "Inorder traversal: " . implode(", ", $traversal) . "\n";
// Output: 20, 30, 40, 50, 60, 70, 80

echo "Search 40: " . ($bst->search(40) !== null ? "true" : "false") . "\n";
echo "Search 99: " . ($bst->search(99) !== null ? "true" : "false") . "\n";
*/
?>`,
  ruby: `# Binary Search Tree Implementation in Ruby
# Time Complexity: O(log n) average, O(n) worst case
# Space Complexity: O(n)

##
# Node class for BST with value and left/right pointers.
class TreeNode
  attr_accessor :val, :left, :right
  
  ##
  # Constructor for TreeNode.
  # @param val [Integer] Value for the node
  # @param left [TreeNode, nil] Left child
  # @param right [TreeNode, nil] Right child
  def initialize(val, left = nil, right = nil)
    @val = val
    @left = left
    @right = right
  end
end

##
# Binary Search Tree implementation with insert, search, delete operations.
class BST
  ##
  # Initialize empty BST.
  def initialize
    @root = nil
  end
  
  ##
  # Insert a value into the BST.
  # @param val [Integer] Value to insert
  def insert(val)
    @root = insert_recursive(@root, val)
  end
  
  ##
  # Search for a value in the BST.
  # @param val [Integer] Value to search for
  # @return [TreeNode, nil] Found node or nil
  def search(val)
    search_recursive(@root, val)
  end
  
  ##
  # Delete a value from the BST.
  # @param val [Integer] Value to delete
  def delete(val)
    @root = delete_recursive(@root, val)
  end
  
  ##
  # Return inorder traversal of BST.
  # @return [Array<Integer>] Array of values in sorted order
  def inorder_traversal
    result = []
    inorder_helper(@root, result)
    result
  end
  
  private
  
  ##
  # Recursively insert value maintaining BST property.
  # @param node [TreeNode, nil] Current node
  # @param val [Integer] Value to insert
  # @return [TreeNode] Updated node
  def insert_recursive(node, val)
    return TreeNode.new(val) if node.nil?
    
    if val < node.val
      node.left = insert_recursive(node.left, val)
    elsif val > node.val
      node.right = insert_recursive(node.right, val)
    end
    # Duplicate values are ignored
    
    node
  end
  
  ##
  # Recursively search for value in BST.
  # @param node [TreeNode, nil] Current node
  # @param val [Integer] Value to search for
  # @return [TreeNode, nil] Found node or nil
  def search_recursive(node, val)
    return node if node.nil? || node.val == val
    
    if val < node.val
      search_recursive(node.left, val)
    else
      search_recursive(node.right, val)
    end
  end
  
  ##
  # Recursively delete value maintaining BST property.
  # @param node [TreeNode, nil] Current node
  # @param val [Integer] Value to delete
  # @return [TreeNode, nil] Updated node
  def delete_recursive(node, val)
    return node if node.nil?
    
    if val < node.val
      node.left = delete_recursive(node.left, val)
    elsif val > node.val
      node.right = delete_recursive(node.right, val)
    else
      # Node to be deleted found
      return node.right if node.left.nil?
      return node.left if node.right.nil?
      
      # Node with two children - get inorder successor
      min_node = find_min(node.right)
      node.val = min_node.val
      node.right = delete_recursive(node.right, min_node.val)
    end
    node
  end
  
  ##
  # Find minimum value node in subtree.
  # @param node [TreeNode] Root of subtree
  # @return [TreeNode] Node with minimum value
  def find_min(node)
    node = node.left while node.left
    node
  end
  
  ##
  # Helper for inorder traversal.
  # @param node [TreeNode, nil] Current node
  # @param result [Array<Integer>] Array to store results
  def inorder_helper(node, result)
    return if node.nil?
    
    inorder_helper(node.left, result)
    result << node.val
    inorder_helper(node.right, result)
  end
end

# Example usage:
# bst = BST.new
# values = [50, 30, 70, 20, 40, 60, 80]
# 
# values.each { |val| bst.insert(val) }
# 
# puts "Inorder traversal: #{bst.inorder_traversal.join(', ')}"
# # Output: 20, 30, 40, 50, 60, 70, 80
# 
# puts "Search 40: #{!bst.search(40).nil?}"
# puts "Search 99: #{!bst.search(99).nil?}"`,
  swift: `/**
 * Binary Search Tree Implementation in Swift
 * Time Complexity: O(log n) average, O(n) worst case
 * Space Complexity: O(n)
 */

import Foundation

/**
 * Node class for BST with value and left/right pointers.
 */
class TreeNode {
    var val: Int
    var left: TreeNode?
    var right: TreeNode?
    
    /**
     * Constructor for TreeNode.
     * - Parameters:
     *   - val: Value for the node
     *   - left: Left child
     *   - right: Right child
     */
    init(_ val: Int, _ left: TreeNode? = nil, _ right: TreeNode? = nil) {
        self.val = val
        self.left = left
        self.right = right
    }
}

/**
 * Binary Search Tree implementation with insert, search, delete operations.
 */
class BST {
    private var root: TreeNode?
    
    /**
     * Initialize empty BST.
     */
    init() {
        root = nil
    }
    
    /**
     * Insert a value into the BST.
     * - Parameter val: Value to insert
     */
    func insert(_ val: Int) {
        root = insertRecursive(root, val)
    }
    
    /**
     * Recursively insert value maintaining BST property.
     * - Parameters:
     *   - node: Current node
     *   - val: Value to insert
     * - Returns: Updated node
     */
    private func insertRecursive(_ node: TreeNode?, _ val: Int) -> TreeNode {
        guard let node = node else {
            return TreeNode(val)
        }
        
        if val < node.val {
            node.left = insertRecursive(node.left, val)
        } else if val > node.val {
            node.right = insertRecursive(node.right, val)
        }
        // Duplicate values are ignored
        
        return node
    }
    
    /**
     * Search for a value in the BST.
     * - Parameter val: Value to search for
     * - Returns: Found node or nil
     */
    func search(_ val: Int) -> TreeNode? {
        return searchRecursive(root, val)
    }
    
    /**
     * Recursively search for value in BST.
     * - Parameters:
     *   - node: Current node
     *   - val: Value to search for
     * - Returns: Found node or nil
     */
    private func searchRecursive(_ node: TreeNode?, _ val: Int) -> TreeNode? {
        guard let node = node else { return nil }
        
        if node.val == val {
            return node
        }
        
        if val < node.val {
            return searchRecursive(node.left, val)
        } else {
            return searchRecursive(node.right, val)
        }
    }
    
    /**
     * Delete a value from the BST.
     * - Parameter val: Value to delete
     */
    func delete(_ val: Int) {
        root = deleteRecursive(root, val)
    }
    
    /**
     * Recursively delete value maintaining BST property.
     * - Parameters:
     *   - node: Current node
     *   - val: Value to delete
     * - Returns: Updated node
     */
    private func deleteRecursive(_ node: TreeNode?, _ val: Int) -> TreeNode? {
        guard let node = node else { return nil }
        
        if val < node.val {
            node.left = deleteRecursive(node.left, val)
        } else if val > node.val {
            node.right = deleteRecursive(node.right, val)
        } else {
            // Node to be deleted found
            if node.left == nil { return node.right }
            if node.right == nil { return node.left }
            
            // Node with two children - get inorder successor
            let minNode = findMin(node.right!)
            node.val = minNode.val
            node.right = deleteRecursive(node.right, minNode.val)
        }
        return node
    }
    
    /**
     * Find minimum value node in subtree.
     * - Parameter node: Root of subtree
     * - Returns: Node with minimum value
     */
    private func findMin(_ node: TreeNode) -> TreeNode {
        var current = node
        while let left = current.left {
            current = left
        }
        return current
    }
    
    /**
     * Return inorder traversal of BST.
     * - Returns: Array of values in sorted order
     */
    func inorderTraversal() -> [Int] {
        var result: [Int] = []
        inorderHelper(root, &result)
        return result
    }
    
    /**
     * Helper for inorder traversal.
     * - Parameters:
     *   - node: Current node
     *   - result: Array to store results
     */
    private func inorderHelper(_ node: TreeNode?, _ result: inout [Int]) {
        guard let node = node else { return }
        
        inorderHelper(node.left, &result)
        result.append(node.val)
        inorderHelper(node.right, &result)
    }
}

// Example usage:
/*
let bst = BST()
let values = [50, 30, 70, 20, 40, 60, 80]

for val in values {
    bst.insert(val)
}

let traversal = bst.inorderTraversal()
print("Inorder traversal: \\(traversal)") // [20, 30, 40, 50, 60, 70, 80]

print("Search 40: \\(bst.search(40) != nil)")
print("Search 99: \\(bst.search(99) != nil)")
*/`,
  go: `/**
 * Binary Search Tree Implementation in Go
 * Time Complexity: O(log n) average, O(n) worst case
 * Space Complexity: O(n)
 */

package main

import "fmt"

// TreeNode represents a node in the BST with value and left/right pointers.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// NewTreeNode creates a new TreeNode with the given value.
func NewTreeNode(val int) *TreeNode {
	return &TreeNode{
		Val:   val,
		Left:  nil,
		Right: nil,
	}
}

// BST represents a Binary Search Tree with insert, search, delete operations.
type BST struct {
	root *TreeNode
}

// NewBST creates a new empty BST.
func NewBST() *BST {
	return &BST{root: nil}
}

// Insert adds a value to the BST.
func (bst *BST) Insert(val int) {
	bst.root = bst.insertRecursive(bst.root, val)
}

// insertRecursive recursively inserts value maintaining BST property.
func (bst *BST) insertRecursive(node *TreeNode, val int) *TreeNode {
	if node == nil {
		return NewTreeNode(val)
	}
	
	if val < node.Val {
		node.Left = bst.insertRecursive(node.Left, val)
	} else if val > node.Val {
		node.Right = bst.insertRecursive(node.Right, val)
	}
	// Duplicate values are ignored
	
	return node
}

// Search looks for a value in the BST.
func (bst *BST) Search(val int) *TreeNode {
	return bst.searchRecursive(bst.root, val)
}

// searchRecursive recursively searches for value in BST.
func (bst *BST) searchRecursive(node *TreeNode, val int) *TreeNode {
	if node == nil || node.Val == val {
		return node
	}
	
	if val < node.Val {
		return bst.searchRecursive(node.Left, val)
	}
	return bst.searchRecursive(node.Right, val)
}

// Delete removes a value from the BST.
func (bst *BST) Delete(val int) {
	bst.root = bst.deleteRecursive(bst.root, val)
}

// deleteRecursive recursively deletes value maintaining BST property.
func (bst *BST) deleteRecursive(node *TreeNode, val int) *TreeNode {
	if node == nil {
		return node
	}
	
	if val < node.Val {
		node.Left = bst.deleteRecursive(node.Left, val)
	} else if val > node.Val {
		node.Right = bst.deleteRecursive(node.Right, val)
	} else {
		// Node to be deleted found
		if node.Left == nil {
			return node.Right
		}
		if node.Right == nil {
			return node.Left
		}
		
		// Node with two children - get inorder successor
		minNode := bst.findMin(node.Right)
		node.Val = minNode.Val
		node.Right = bst.deleteRecursive(node.Right, minNode.Val)
	}
	return node
}

// findMin finds the minimum value node in subtree.
func (bst *BST) findMin(node *TreeNode) *TreeNode {
	for node.Left != nil {
		node = node.Left
	}
	return node
}

// InorderTraversal returns inorder traversal of BST.
func (bst *BST) InorderTraversal() []int {
	var result []int
	bst.inorderHelper(bst.root, &result)
	return result
}

// inorderHelper is a helper function for inorder traversal.
func (bst *BST) inorderHelper(node *TreeNode, result *[]int) {
	if node != nil {
		bst.inorderHelper(node.Left, result)
		*result = append(*result, node.Val)
		bst.inorderHelper(node.Right, result)
	}
}

// Example usage:
/*
func main() {
	bst := NewBST()
	values := []int{50, 30, 70, 20, 40, 60, 80}
	
	for _, val := range values {
		bst.Insert(val)
	}
	
	traversal := bst.InorderTraversal()
	fmt.Println("Inorder traversal:", traversal) // [20 30 40 50 60 70 80]
	
	fmt.Println("Search 40:", bst.Search(40) != nil)
	fmt.Println("Search 99:", bst.Search(99) != nil)
}
*/`
} 