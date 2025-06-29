import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const triesExplanationContent = (
  <AlgorithmExplanation>
    <h2>Tries (Prefix Trees)</h2>
    <p>
      A <strong>Trie</strong> (pronounced "try") is a tree data structure that stores a dynamic set of strings, 
      where the keys are usually strings. It's also called a <strong>prefix tree</strong> because it's excellent 
      for prefix-based operations like autocomplete and spell checking.
    </p>

    <h3>Key Properties:</h3>
    <ul>
      <li><strong>Each node represents a character</strong></li>
      <li><strong>Path from root to node = prefix</strong></li>
      <li><strong>Efficient prefix searching</strong> - $$O(m)$$ where m is string length</li>
      <li><strong>Space efficient</strong> for large sets of strings with common prefixes</li>
      <li><strong>Perfect for autocomplete</strong>, spell checkers, and IP routing</li>
    </ul>

    <h3>Common Operations:</h3>
    <ul>
      <li><strong>Insert:</strong> $$O(m)$$ - Add a word to the trie</li>
      <li><strong>Search:</strong> $$O(m)$$ - Check if word exists</li>
      <li><strong>StartsWith:</strong> $$O(m)$$ - Check if prefix exists</li>
      <li><strong>Delete:</strong> $$O(m)$$ - Remove a word</li>
    </ul>

    <h3>Real-World Applications:</h3>
    <ul>
      <li><strong>Autocomplete systems</strong> - Search engines, IDEs</li>
      <li><strong>Spell checkers</strong> - Word processors, browsers</li>
      <li><strong>IP routing</strong> - Network routing tables</li>
      <li><strong>Phone directories</strong> - T9 predictive text</li>
      <li><strong>Genome sequencing</strong> - DNA sequence analysis</li>
    </ul>

    <h3>Trie Node Structure:</h3>
    <p>Each node in a trie contains:</p>
    <ul>
      <li><strong>Children array/map</strong> - Links to child nodes (usually 26 for lowercase letters)</li>
      <li><strong>isEndOfWord flag</strong> - Marks if this node represents the end of a valid word</li>
      <li><strong>Optional: count/frequency</strong> - For counting word occurrences</li>
    </ul>

    <h3>Space Optimization:</h3>
    <p>Tries can be optimized for space:</p>
    <ul>
      <li><strong>Compressed Trie (Radix Tree)</strong> - Merge single-child nodes</li>
      <li><strong>HashMap instead of array</strong> - Only store existing children</li>
      <li><strong>Ternary Search Trie</strong> - Use binary search tree structure</li>
    </ul>
  </AlgorithmExplanation>
)

export const triesCodeSnippets = {
  python: `# Basic Trie Implementation in Python
class TrieNode:
    def __init__(self):
        # Dictionary to store children nodes
        self.children = {}
        # Flag to mark end of word
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        """Insert a word into the trie"""
        current = self.root
        
        for char in word:
            # Create new node if character doesn't exist
            if char not in current.children:
                current.children[char] = TrieNode()
            current = current.children[char]
        
        # Mark end of word
        current.is_end_of_word = True
    
    def search(self, word):
        """Search for a word in the trie"""
        current = self.root
        
        for char in word:
            if char not in current.children:
                return False
            current = current.children[char]
        
        return current.is_end_of_word
    
    def starts_with(self, prefix):
        """Check if any word starts with given prefix"""
        current = self.root
        
        for char in prefix:
            if char not in current.children:
                return False
            current = current.children[char]
        
        return True

# Example usage
trie = Trie()
words = ["cat", "cats", "car", "card", "care", "careful"]

# Insert words
for word in words:
    trie.insert(word)

# Search operations
print(trie.search("cat"))      # True
print(trie.search("can"))      # False
print(trie.starts_with("car")) # True`,

  javascript: `// Trie Implementation in JavaScript
class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    insert(word) {
        let current = this.root;
        
        for (let char of word) {
            if (!current.children.has(char)) {
                current.children.set(char, new TrieNode());
            }
            current = current.children.get(char);
        }
        
        current.isEndOfWord = true;
    }
    
    search(word) {
        let current = this.root;
        
        for (let char of word) {
            if (!current.children.has(char)) {
                return false;
            }
            current = current.children.get(char);
        }
        
        return current.isEndOfWord;
    }
    
    startsWith(prefix) {
        let current = this.root;
        
        for (let char of prefix) {
            if (!current.children.has(char)) {
                return false;
            }
            current = current.children.get(char);
        }
        
        return true;
    }
    
    // Get all words with given prefix
    getWordsWithPrefix(prefix) {
        let current = this.root;
        
        // Navigate to prefix end
        for (let char of prefix) {
            if (!current.children.has(char)) {
                return [];
            }
            current = current.children.get(char);
        }
        
        // Collect all words from this point
        const words = [];
        this.dfsCollect(current, prefix, words);
        return words;
    }
    
    dfsCollect(node, currentWord, words) {
        if (node.isEndOfWord) {
            words.push(currentWord);
        }
        
        for (let [char, childNode] of node.children) {
            this.dfsCollect(childNode, currentWord + char, words);
        }
    }
}

// Usage example
const trie = new Trie();
const words = ["the", "there", "answer", "any", "by", "bye", "their"];

words.forEach(word => trie.insert(word));

console.log(trie.search("the"));        // true
console.log(trie.search("these"));      // false
console.log(trie.startsWith("th"));     // true
console.log(trie.getWordsWithPrefix("th")); // ["the", "there", "their"]`,

  java: `// Trie Implementation in Java
import java.util.*;

class TrieNode {
    Map<Character, TrieNode> children;
    boolean isEndOfWord;
    
    public TrieNode() {
        children = new HashMap<>();
        isEndOfWord = false;
    }
}

public class Trie {
    private TrieNode root;
    
    public Trie() {
        root = new TrieNode();
    }
    
    public void insert(String word) {
        TrieNode current = root;
        
        for (char ch : word.toCharArray()) {
            current.children.putIfAbsent(ch, new TrieNode());
            current = current.children.get(ch);
        }
        
        current.isEndOfWord = true;
    }
    
    public boolean search(String word) {
        TrieNode current = root;
        
        for (char ch : word.toCharArray()) {
            if (!current.children.containsKey(ch)) {
                return false;
            }
            current = current.children.get(ch);
        }
        
        return current.isEndOfWord;
    }
    
    public boolean startsWith(String prefix) {
        TrieNode current = root;
        
        for (char ch : prefix.toCharArray()) {
            if (!current.children.containsKey(ch)) {
                return false;
            }
            current = current.children.get(ch);
        }
        
        return true;
    }
    
    public List<String> getWordsWithPrefix(String prefix) {
        List<String> result = new ArrayList<>();
        TrieNode current = root;
        
        // Navigate to prefix end
        for (char ch : prefix.toCharArray()) {
            if (!current.children.containsKey(ch)) {
                return result;
            }
            current = current.children.get(ch);
        }
        
        // Collect all words from this point
        dfsCollect(current, prefix, result);
        return result;
    }
    
    private void dfsCollect(TrieNode node, String currentWord, List<String> result) {
        if (node.isEndOfWord) {
            result.add(currentWord);
        }
        
        for (Map.Entry<Character, TrieNode> entry : node.children.entrySet()) {
            dfsCollect(entry.getValue(), currentWord + entry.getKey(), result);
        }
    }
    
    // Example usage
    public static void main(String[] args) {
        Trie trie = new Trie();
        String[] words = {"cat", "cats", "car", "card", "care", "careful"};
        
        // Insert words
        for (String word : words) {
            trie.insert(word);
        }
        
        // Test operations
        System.out.println(trie.search("cat"));      // true
        System.out.println(trie.search("can"));      // false
        System.out.println(trie.startsWith("car"));  // true
        
        List<String> suggestions = trie.getWordsWithPrefix("car");
        System.out.println("Words starting with 'car': " + suggestions);
    }
}`
} 