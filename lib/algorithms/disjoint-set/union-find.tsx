import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const unionFindExplanationContent = (
  <AlgorithmExplanation>
    <h2>Disjoint Set Union (Union-Find)</h2>
    <p>
      <strong>Disjoint Set Union (DSU)</strong>, also known as <strong>Union-Find</strong>, is a data structure 
      that keeps track of a set of elements partitioned into a number of disjoint (non-overlapping) subsets. 
      It provides near-constant-time operations to add new sets, merge existing sets, and determine whether 
      elements are in the same set.
    </p>

    <h3>Key Operations:</h3>
    <ul>
      <li><strong>Find:</strong> Find which set an element belongs to - Returns the representative (root)</li>
      <li><strong>Union:</strong> Merge two sets into one - Combines sets containing two given elements</li>
      <li><strong>MakeSet:</strong> Create a new set with one element - Initialize element as its own parent</li>
      <li><strong>Connected:</strong> Check if two elements are in same set - Compare their root representatives</li>
    </ul>

    <h3>Key Optimizations:</h3>
    <ul>
      <li><strong>Path Compression</strong> - Make all nodes point directly to root during Find</li>
      <li><strong>Union by Rank</strong> - Always attach smaller tree under root of larger tree</li>
      <li><strong>Union by Size</strong> - Attach tree with fewer nodes to tree with more nodes</li>
      <li><strong>Both optimizations</strong> give nearly $$O(1)$$ amortized time per operation</li>
    </ul>

    <h3>Time Complexity:</h3>
    <ul>
      <li><strong>Without optimizations:</strong> Find: $$O(n)$$, Union: $$O(n)$$</li>
      <li><strong>With Path Compression + Union by Rank:</strong> Find: $$O(α(n))$$, Union: $$O(α(n))$$</li>
      <li><strong>α(n):</strong> Inverse Ackermann function (practically constant for all reasonable inputs)</li>
    </ul>

    <h3>Real-World Applications:</h3>
    <ul>
      <li><strong>Network connectivity</strong> - Check if two computers are connected</li>
      <li><strong>Kruskal's MST algorithm</strong> - Detect cycles while building minimum spanning tree</li>
      <li><strong>Percolation theory</strong> - Model systems with randomly blocked sites</li>
      <li><strong>Image processing</strong> - Connected component labeling</li>
      <li><strong>Social networks</strong> - Find groups of connected friends</li>
      <li><strong>Compiler design</strong> - Register allocation and interference graphs</li>
    </ul>

    <h3>Basic Implementation:</h3>
    <p>Simple implementation using parent array:</p>
    <ul>
      <li><strong>Parent array</strong> - Each element points to its parent</li>
      <li><strong>Root identification</strong> - Element is root if parent[i] == i</li>
      <li><strong>Find operation</strong> - Follow parent pointers until reaching root</li>
      <li><strong>Union operation</strong> - Make root of one tree child of root of another</li>
    </ul>
  </AlgorithmExplanation>
)

export const unionFindCodeSnippets = {
  python: `# Basic Union-Find Implementation
class UnionFind:
    def __init__(self, n):
        """Initialize Union-Find with n elements (0 to n-1)"""
        self.parent = list(range(n))  # Each element is its own parent initially
        self.rank = [0] * n           # Rank (approximate height) of each tree
        self.size = [1] * n           # Size of each component
        self.components = n           # Number of connected components
    
    def find(self, x):
        """Find root of element x with path compression"""
        if self.parent[x] != x:
            # Path compression: make parent point directly to root
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        """Union two sets containing x and y"""
        root_x = self.find(x)
        root_y = self.find(y)
        
        # Already in same set
        if root_x == root_y:
            return False
        
        # Union by rank: attach smaller rank tree under root of higher rank tree
        if self.rank[root_x] < self.rank[root_y]:
            root_x, root_y = root_y, root_x
        
        # Make root_x the parent of root_y
        self.parent[root_y] = root_x
        self.size[root_x] += self.size[root_y]
        
        # If ranks were equal, increase rank of new root
        if self.rank[root_x] == self.rank[root_y]:
            self.rank[root_x] += 1
        
        self.components -= 1
        return True
    
    def connected(self, x, y):
        """Check if x and y are in the same connected component"""
        return self.find(x) == self.find(y)
    
    def get_size(self, x):
        """Get size of component containing x"""
        return self.size[self.find(x)]
    
    def get_components(self):
        """Get number of connected components"""
        return self.components

# Example usage
uf = UnionFind(10)

# Connect some elements
uf.union(0, 1)
uf.union(1, 2)
uf.union(3, 4)

print(f"0 and 2 connected: {uf.connected(0, 2)}")  # True
print(f"0 and 3 connected: {uf.connected(0, 3)}")  # False
print(f"Components: {uf.get_components()}")          # 7
print(f"Size of component with 0: {uf.get_size(0)}")  # 3`,

  javascript: `// Union-Find Implementation in JavaScript
class UnionFind {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.rank = new Array(n).fill(0);
        this.size = new Array(n).fill(1);
        this.components = n;
    }
    
    find(x) {
        if (this.parent[x] !== x) {
            // Path compression
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) return false;
        
        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
            this.size[rootY] += this.size[rootX];
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
            this.size[rootX] += this.size[rootY];
        } else {
            this.parent[rootY] = rootX;
            this.size[rootX] += this.size[rootY];
            this.rank[rootX]++;
        }
        
        this.components--;
        return true;
    }
    
    connected(x, y) {
        return this.find(x) === this.find(y);
    }
    
    getSize(x) {
        return this.size[this.find(x)];
    }
    
    getComponents() {
        return this.components;
    }
}

// Example: Social network connections
const socialNetwork = new UnionFind(6);

// Friendships
const friendships = [
    [0, 1], [1, 2], [3, 4]  // Alice-Bob, Bob-Charlie, David-Eve
];

friendships.forEach(([person1, person2]) => {
    socialNetwork.union(person1, person2);
    console.log(\`\${person1} and \${person2} are now friends\`);
});

console.log(\`Alice(0) and Charlie(2) connected: \${socialNetwork.connected(0, 2)}\`);
console.log(\`Alice(0) and David(3) connected: \${socialNetwork.connected(0, 3)}\`);
console.log(\`Friend groups: \${socialNetwork.getComponents()}\`);
console.log(\`Alice's friend group size: \${socialNetwork.getSize(0)}\`);`,

  java: `// Union-Find Implementation in Java
public class UnionFind {
    private int[] parent;
    private int[] rank;
    private int[] size;
    private int components;
    
    public UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        size = new int[n];
        components = n;
        
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            size[i] = 1;
        }
    }
    
    public int find(int x) {
        if (parent[x] != x) {
            // Path compression
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
    
    public boolean union(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        
        if (rootX == rootY) return false;
        
        // Union by rank
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
            size[rootY] += size[rootX];
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
            size[rootX] += size[rootY];
        } else {
            parent[rootY] = rootX;
            size[rootX] += size[rootY];
            rank[rootX]++;
        }
        
        components--;
        return true;
    }
    
    public boolean connected(int x, int y) {
        return find(x) == find(y);
    }
    
    public int getSize(int x) {
        return size[find(x)];
    }
    
    public int getComponents() {
        return components;
    }
    
    // Example usage
    public static void main(String[] args) {
        UnionFind uf = new UnionFind(10);
        
        // Connect some elements
        uf.union(0, 1);
        uf.union(1, 2);
        uf.union(3, 4);
        
        System.out.println("0 and 2 connected: " + uf.connected(0, 2));  // true
        System.out.println("0 and 3 connected: " + uf.connected(0, 3));  // false
        System.out.println("Components: " + uf.getComponents());          // 7
        System.out.println("Size of component with 0: " + uf.getSize(0)); // 3
    }
}`
} 