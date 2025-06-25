import { AlgorithmExplanation } from "../algorithm-data"

export const linkedListBasicsExplanationContent: AlgorithmExplanation = {
  title: "Linked List Fundamentals",
  description: "A linear data structure where elements are stored in nodes, each containing data and a reference to the next node, enabling dynamic memory allocation.",
  
  sections: [
    {
      title: "What is a Linked List?",
      content: `A Linked List is a linear data structure where elements (called nodes) are stored in sequence, but unlike arrays, the elements are not stored in contiguous memory locations. Each node contains two parts:
1. **Data**: The actual value stored in the node
2. **Next/Link**: A reference (pointer) to the next node in the sequence

**Key Characteristics:**
• **Dynamic Size**: Can grow or shrink during runtime
• **Non-contiguous Memory**: Nodes can be scattered throughout memory
• **Sequential Access**: Must traverse from head to reach any element
• **No Random Access**: Cannot directly access elements by index like arrays

**Basic Structure:**
[Data|Next] -> [Data|Next] -> [Data|Next] -> NULL

**Memory Layout:**
Unlike arrays where elements are stored consecutively:
Array: [1][2][3][4] (contiguous memory)
Linked List: [1|*] -> [2|*] -> [3|*] -> [4|NULL] (scattered memory)`
    },
    
    {
      title: "Types of Linked Lists",
      content: `**1. Singly Linked List**
• Each node points to the next node
• Traversal only in forward direction
• Last node points to NULL
• Most common and basic type

**2. Doubly Linked List**
• Each node has two pointers: next and previous
• Can traverse in both directions
• More memory overhead but more flexible
• Useful for bidirectional operations

**3. Circular Linked List**
• Last node points back to the first node
• No NULL pointer at the end
• Can be singly or doubly circular
• Useful for round-robin scheduling

**4. Circular Doubly Linked List**
• Combines circular and doubly linked features
• First node's prev points to last node
• Last node's next points to first node
• Maximum flexibility but highest memory cost

**Visual Representation:**
Singly: A -> B -> C -> NULL
Doubly: NULL <- A <-> B <-> C -> NULL
Circular: A -> B -> C -> A (forms a circle)`
    },

    {
      title: "Basic Operations & Complexity",
      content: `**1. Insertion Operations:**
• **At Beginning (Head)**: O(1) - Just update head pointer
• **At End (Tail)**: O(n) without tail pointer, O(1) with tail pointer
• **At Position**: O(n) - Need to traverse to position
• **After Given Node**: O(1) - If we have reference to the node

**2. Deletion Operations:**
• **From Beginning**: O(1) - Update head pointer
• **From End**: O(n) - Need to find second-to-last node
• **By Value**: O(n) - Search then delete
• **At Position**: O(n) - Traverse to position

**3. Search Operations:**
• **Search by Value**: O(n) - Linear search only
• **Access by Index**: O(n) - Must traverse from head

**4. Other Operations:**
• **Length/Size**: O(n) unless maintained separately
• **Display/Print**: O(n) - Must visit each node
• **Reverse**: O(n) - Single pass with pointer manipulation

**Comparison with Arrays:**
| Operation | Array | Linked List |
|-----------|-------|-------------|
| Access | O(1) | O(n) |
| Search | O(n) | O(n) |
| Insert at start | O(n) | O(1) |
| Insert at end | O(1) | O(n) |
| Delete at start | O(n) | O(1) |
| Memory | Contiguous | Scattered |`
    },

    {
      title: "Advantages & Disadvantages",
      content: `**Advantages:**
✅ **Dynamic Size**: Can grow/shrink at runtime
✅ **Memory Efficient**: Only allocate what's needed
✅ **Easy Insertion/Deletion**: At beginning in O(1)
✅ **No Memory Waste**: No pre-allocated unused space
✅ **Flexible**: Can implement other data structures
✅ **No Size Limit**: Limited only by available memory

**Disadvantages:**
❌ **No Random Access**: Cannot access elements by index directly
❌ **Extra Memory**: Each node needs space for pointer
❌ **Poor Cache Locality**: Nodes scattered in memory
❌ **Sequential Access Only**: Must traverse from head
❌ **No Backward Traversal**: In singly linked lists
❌ **Pointer Overhead**: Additional memory for each link

**When to Use Linked Lists:**
• Frequent insertions/deletions at the beginning
• Unknown or highly variable data size
• Implementing other data structures (stacks, queues)
• Memory is fragmented
• Don't need random access to elements

**When NOT to Use:**
• Need frequent random access by index
• Memory is limited (pointer overhead matters)
• Cache performance is critical
• Mostly read operations with few modifications`
    },

    {
      title: "Real-World Applications",
      content: `**1. Operating Systems**
• **Process Management**: Process control blocks linked in queues
• **Memory Management**: Free memory blocks linked together
• **File Systems**: Directory structures and file allocation
• **Device Drivers**: I/O request queues

**2. Web Browsers**
• **Browser History**: Back/forward navigation using doubly linked list
• **Tab Management**: Open tabs as nodes in a linked structure
• **Bookmark Organization**: Hierarchical bookmark folders
• **Cache Management**: LRU cache implementation

**3. Music/Media Players**
• **Playlist Management**: Songs linked in playback order
• **Shuffle Mode**: Random traversal of linked song list
• **Repeat Functionality**: Circular linked list for continuous play
• **Queue Management**: Next-up song queue

**4. Text Editors**
• **Undo/Redo Operations**: Command history as linked list
• **Text Buffer**: Large documents as linked blocks
• **Find/Replace**: Search results linked for navigation
• **Autocomplete**: Suggestion lists

**5. Games & Graphics**
• **Game Object Management**: Entities in game world
• **Animation Sequences**: Keyframes linked in timeline
• **Collision Detection**: Spatial partitioning structures
• **Resource Loading**: Asset loading queues

**6. Database Systems**
• **Hash Table Chaining**: Collision resolution
• **B+ Trees**: Leaf node linking for range queries
• **Transaction Logs**: Ordered transaction records
• **Index Structures**: Linked index entries

**7. Network Programming**
• **Packet Queues**: Network packet buffering
• **Routing Tables**: Next-hop information
• **Connection Pools**: Available connection management
• **Protocol Stacks**: Layered protocol handling

**8. Compiler Design**
• **Symbol Tables**: Variable and function storage
• **Abstract Syntax Trees**: Parse tree nodes
• **Code Generation**: Instruction sequences
• **Optimization**: Control flow graphs`
    },

    {
      title: "Implementation Patterns",
      content: `**1. Node Definition Patterns:**
\`\`\`
// Simple Node
class Node {
    data: any
    next: Node | null
}

// Generic Node
class Node<T> {
    data: T
    next: Node<T> | null
}
\`\`\`

**2. List Management Patterns:**
• **Head-only**: Track only the first node
• **Head + Tail**: Track both first and last nodes
• **Head + Size**: Track first node and list length
• **Dummy Head**: Use sentinel node to simplify operations

**3. Common Implementation Techniques:**
• **Recursive Operations**: Elegant but may cause stack overflow
• **Iterative Operations**: More efficient, less memory usage
• **Two-Pointer Technique**: Fast/slow pointers for cycle detection
• **Sentinel Nodes**: Dummy nodes to handle edge cases

**4. Memory Management:**
• **Manual**: Explicit allocation/deallocation
• **Garbage Collected**: Automatic memory management
• **Smart Pointers**: RAII in C++
• **Pool Allocation**: Pre-allocate node pools`
    },

    {
      title: "Common Problems & Solutions",
      content: `**1. Cycle Detection (Floyd's Algorithm)**
Use fast and slow pointers to detect if list has a cycle.

**2. Finding Middle Element**
Use two pointers: one moves 1 step, other moves 2 steps.

**3. Reversing a Linked List**
Iteratively or recursively reverse the links.

**4. Merging Two Sorted Lists**
Compare elements and merge in sorted order.

**5. Removing Duplicates**
Traverse and remove nodes with duplicate values.

**6. Finding Nth Node from End**
Use two pointers separated by N positions.

**7. Intersection of Two Lists**
Find the common node where two lists merge.

**8. Palindrome Check**
Reverse second half and compare with first half.

**Common Pitfalls:**
❌ Null pointer dereference
❌ Memory leaks in manual memory management
❌ Losing reference to nodes during operations
❌ Infinite loops in circular lists
❌ Off-by-one errors in position calculations`
    }
  ],

  codeExamples: [
    {
      title: "Basic Singly Linked List Implementation",
      language: "python",
      code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class LinkedList:
    def __init__(self):
        self.head = None
        self.size = 0
    
    def insert_at_beginning(self, val):
        """Insert at the beginning - O(1)"""
        new_node = ListNode(val)
        new_node.next = self.head
        self.head = new_node
        self.size += 1
    
    def insert_at_end(self, val):
        """Insert at the end - O(n)"""
        new_node = ListNode(val)
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
        self.size += 1
    
    def insert_at_position(self, pos, val):
        """Insert at specific position - O(n)"""
        if pos == 0:
            self.insert_at_beginning(val)
            return
        
        new_node = ListNode(val)
        current = self.head
        for _ in range(pos - 1):
            if not current:
                raise IndexError("Position out of bounds")
            current = current.next
        
        new_node.next = current.next
        current.next = new_node
        self.size += 1
    
    def delete_by_value(self, val):
        """Delete first occurrence of value - O(n)"""
        if not self.head:
            return False
        
        if self.head.val == val:
            self.head = self.head.next
            self.size -= 1
            return True
        
        current = self.head
        while current.next:
            if current.next.val == val:
                current.next = current.next.next
                self.size -= 1
                return True
            current = current.next
        return False
    
    def search(self, val):
        """Search for value - O(n)"""
        current = self.head
        position = 0
        while current:
            if current.val == val:
                return position
            current = current.next
            position += 1
        return -1
    
    def display(self):
        """Display all elements - O(n)"""
        result = []
        current = self.head
        while current:
            result.append(current.val)
            current = current.next
        return result
    
    def reverse(self):
        """Reverse the linked list - O(n)"""
        prev = None
        current = self.head
        
        while current:
            next_temp = current.next
            current.next = prev
            prev = current
            current = next_temp
        
        self.head = prev

# Example usage
ll = LinkedList()
ll.insert_at_beginning(1)
ll.insert_at_end(2)
ll.insert_at_end(3)
print(f"List: {ll.display()}")  # [1, 2, 3]
ll.reverse()
print(f"Reversed: {ll.display()}")  # [3, 2, 1]`
    },
    
    {
      title: "Doubly Linked List Implementation",
      language: "python",
      code: `class DoublyListNode:
    def __init__(self, val=0, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0
    
    def insert_at_beginning(self, val):
        """Insert at beginning - O(1)"""
        new_node = DoublyListNode(val)
        
        if not self.head:
            self.head = self.tail = new_node
        else:
            new_node.next = self.head
            self.head.prev = new_node
            self.head = new_node
        
        self.size += 1
    
    def insert_at_end(self, val):
        """Insert at end - O(1) with tail pointer"""
        new_node = DoublyListNode(val)
        
        if not self.tail:
            self.head = self.tail = new_node
        else:
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node
        
        self.size += 1
    
    def delete_node(self, node):
        """Delete specific node - O(1) if we have reference"""
        if not node:
            return
        
        if node.prev:
            node.prev.next = node.next
        else:
            self.head = node.next
        
        if node.next:
            node.next.prev = node.prev
        else:
            self.tail = node.prev
        
        self.size -= 1
    
    def display_forward(self):
        """Display from head to tail"""
        result = []
        current = self.head
        while current:
            result.append(current.val)
            current = current.next
        return result
    
    def display_backward(self):
        """Display from tail to head"""
        result = []
        current = self.tail
        while current:
            result.append(current.val)
            current = current.prev
        return result

# Example usage
dll = DoublyLinkedList()
dll.insert_at_end(1)
dll.insert_at_end(2)
dll.insert_at_end(3)
print(f"Forward: {dll.display_forward()}")   # [1, 2, 3]
print(f"Backward: {dll.display_backward()}") # [3, 2, 1]`
    },
    
    {
      title: "Common Linked List Algorithms",
      language: "python",
      code: `def detect_cycle(head):
    """Floyd's Cycle Detection Algorithm - O(n) time, O(1) space"""
    if not head or not head.next:
        return False
    
    slow = fast = head
    
    # Phase 1: Detect if cycle exists
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    
    return False

def find_middle(head):
    """Find middle element using two pointers - O(n) time, O(1) space"""
    if not head:
        return None
    
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    return slow

def merge_sorted_lists(l1, l2):
    """Merge two sorted linked lists - O(n+m) time, O(1) space"""
    dummy = ListNode(0)
    current = dummy
    
    while l1 and l2:
        if l1.val <= l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    
    # Attach remaining nodes
    current.next = l1 or l2
    
    return dummy.next

def remove_nth_from_end(head, n):
    """Remove nth node from end using two pointers"""
    dummy = ListNode(0)
    dummy.next = head
    first = second = dummy
    
    # Move first pointer n+1 steps ahead
    for _ in range(n + 1):
        first = first.next
    
    # Move both pointers until first reaches end
    while first:
        first = first.next
        second = second.next
    
    # Remove the nth node from end
    second.next = second.next.next
    
    return dummy.next

def is_palindrome(head):
    """Check if linked list is palindrome"""
    if not head or not head.next:
        return True
    
    # Find middle
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    # Reverse second half
    prev = None
    current = slow
    while current:
        next_temp = current.next
        current.next = prev
        prev = current
        current = next_temp
    
    # Compare first and second half
    first_half = head
    second_half = prev
    
    while second_half:
        if first_half.val != second_half.val:
            return False
        first_half = first_half.next
        second_half = second_half.next
    
    return True`
    }
  ]
}

export const linkedListBasicsCodeSnippets = {
  python: `# Basic Node Definition
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Basic Operations
def insert_at_beginning(head, val):
    new_node = ListNode(val)
    new_node.next = head
    return new_node

def insert_at_end(head, val):
    new_node = ListNode(val)
    if not head:
        return new_node
    
    current = head
    while current.next:
        current = current.next
    current.next = new_node
    return head

def delete_by_value(head, val):
    if not head:
        return None
    
    if head.val == val:
        return head.next
    
    current = head
    while current.next:
        if current.next.val == val:
            current.next = current.next.next
            break
        current = current.next
    return head

def reverse_list(head):
    prev = None
    current = head
    
    while current:
        next_temp = current.next
        current.next = prev
        prev = current
        current = next_temp
    
    return prev`,

  javascript: `// Basic Node Definition
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// Basic Operations
function insertAtBeginning(head, val) {
    const newNode = new ListNode(val);
    newNode.next = head;
    return newNode;
}

function insertAtEnd(head, val) {
    const newNode = new ListNode(val);
    if (!head) return newNode;
    
    let current = head;
    while (current.next) {
        current = current.next;
    }
    current.next = newNode;
    return head;
}

function deleteByValue(head, val) {
    if (!head) return null;
    
    if (head.val === val) {
        return head.next;
    }
    
    let current = head;
    while (current.next) {
        if (current.next.val === val) {
            current.next = current.next.next;
            break;
        }
        current = current.next;
    }
    return head;
}

function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current) {
        const nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }
    
    return prev;
}`,

  java: `// Basic Node Definition
class ListNode {
    int val;
    ListNode next;
    
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

// Basic Operations
public static ListNode insertAtBeginning(ListNode head, int val) {
    ListNode newNode = new ListNode(val);
    newNode.next = head;
    return newNode;
}

public static ListNode insertAtEnd(ListNode head, int val) {
    ListNode newNode = new ListNode(val);
    if (head == null) return newNode;
    
    ListNode current = head;
    while (current.next != null) {
        current = current.next;
    }
    current.next = newNode;
    return head;
}

public static ListNode deleteByValue(ListNode head, int val) {
    if (head == null) return null;
    
    if (head.val == val) {
        return head.next;
    }
    
    ListNode current = head;
    while (current.next != null) {
        if (current.next.val == val) {
            current.next = current.next.next;
            break;
        }
        current = current.next;
    }
    return head;
}

public static ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode current = head;
    
    while (current != null) {
        ListNode nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }
    
    return prev;
}`,

  cpp: `// Basic Node Definition
struct ListNode {
    int val;
    ListNode* next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode* next) : val(x), next(next) {}
};

// Basic Operations
ListNode* insertAtBeginning(ListNode* head, int val) {
    ListNode* newNode = new ListNode(val);
    newNode->next = head;
    return newNode;
}

ListNode* insertAtEnd(ListNode* head, int val) {
    ListNode* newNode = new ListNode(val);
    if (!head) return newNode;
    
    ListNode* current = head;
    while (current->next) {
        current = current->next;
    }
    current->next = newNode;
    return head;
}

ListNode* deleteByValue(ListNode* head, int val) {
    if (!head) return nullptr;
    
    if (head->val == val) {
        ListNode* temp = head;
        head = head->next;
        delete temp;
        return head;
    }
    
    ListNode* current = head;
    while (current->next) {
        if (current->next->val == val) {
            ListNode* temp = current->next;
            current->next = current->next->next;
            delete temp;
            break;
        }
        current = current->next;
    }
    return head;
}

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* current = head;
    
    while (current) {
        ListNode* nextTemp = current->next;
        current->next = prev;
        prev = current;
        current = nextTemp;
    }
    
    return prev;
}`
} 