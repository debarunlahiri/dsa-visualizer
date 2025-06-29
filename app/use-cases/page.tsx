"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Building2, Code2, Database, Globe, Smartphone, Cpu, ShoppingCart, Users, MapPin, Search, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"

interface UseCase {
  title: string
  description: string
  industry: string
  company?: string
  icon: React.ReactNode
  complexity: "Low" | "Medium" | "High"
  impact: "Low" | "Medium" | "High"
}

interface CodeExample {
  title: string
  language: string
  code: string
  description: string
  source: string
}

interface AlgorithmUseCases {
  algorithm: string
  category: string
  description: string
  useCases: UseCase[]
  keyBenefits: string[]
  realWorldExamples: string[]
  codeExamples?: CodeExample[]
}

const algorithmUseCases: AlgorithmUseCases[] = [
  // Sorting Algorithms
  {
    algorithm: "Bubble Sort",
    category: "Sorting",
    description: "Simple comparison-based sorting algorithm with O(n²) time complexity",
    useCases: [
      {
        title: "Educational Purposes",
        description: "Teaching sorting concepts and algorithm analysis in computer science courses",
        industry: "Education",
        company: "Universities, Coding Bootcamps",
        icon: <Building2 className="w-5 h-5" />,
        complexity: "Low",
        impact: "Low"
      },
      {
        title: "Small Dataset Sorting",
        description: "Sorting very small arrays where simplicity is more important than efficiency",
        industry: "Embedded Systems",
        company: "Microcontroller Applications",
        icon: <Cpu className="w-5 h-5" />,
        complexity: "Low",
        impact: "Low"
      }
    ],
    keyBenefits: [
      "Simple to understand and implement",
      "In-place sorting algorithm",
      "Stable sorting (preserves relative order)",
      "Good for educational purposes"
    ],
    realWorldExamples: [
      "Algorithm textbook examples",
      "Coding practice",
      "Simple embedded system sorting",
      "Prototype and proof-of-concept code"
    ],
    codeExamples: [
      {
        title: "Basic Bubble Sort Implementation",
        language: "javascript",
        code: `// Simple bubble sort used in educational contexts
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Usage in educational platforms
const studentGrades = [85, 92, 78, 96, 88];
const sortedGrades = bubbleSort(studentGrades);`,
        description: "Basic implementation used in coding bootcamps and computer science courses",
        source: "Educational Platforms"
      }
    ]
  },
  {
    algorithm: "Selection Sort",
    category: "Sorting",
    description: "Simple sorting algorithm that finds minimum element and places it at the beginning",
    useCases: [
      {
        title: "Memory-Constrained Systems",
        description: "Sorting in systems where memory writes are expensive or limited",
        industry: "Embedded Systems",
        company: "IoT Devices, Sensors",
        icon: <Cpu className="w-5 h-5" />,
        complexity: "Low",
        impact: "Medium"
      },
      {
        title: "Educational Demonstrations",
        description: "Teaching selection-based algorithms and comparison counting",
        industry: "Education",
        company: "Computer Science Education",
        icon: <Building2 className="w-5 h-5" />,
        complexity: "Low",
        impact: "Low"
      }
    ],
    keyBenefits: [
      "Minimizes number of swaps",
      "In-place sorting algorithm",
      "Simple implementation",
      "Predictable performance"
    ],
    realWorldExamples: [
      "Flash memory optimization (minimal writes)",
      "Educational algorithm visualization",
      "Simple sorting in resource-constrained devices",
      "Algorithm complexity analysis examples"
    ]
  },
  {
    algorithm: "Insertion Sort",
    category: "Sorting",
    description: "Efficient sorting algorithm for small datasets and nearly sorted arrays",
    useCases: [
      {
        title: "Hybrid Sorting Algorithms",
        description: "Used as a subroutine in advanced sorting algorithms like Timsort and Introsort",
        industry: "Programming Languages",
        company: "Python, Java Standard Libraries",
        icon: <Code2 className="w-5 h-5" />,
        complexity: "Medium",
        impact: "High"
      },
      {
        title: "Online Sorting",
        description: "Sorting data as it arrives in real-time streaming applications",
        industry: "Data Streaming",
        company: "Real-time Analytics",
        icon: <Database className="w-5 h-5" />,
        complexity: "Low",
        impact: "Medium"
      },
      {
        title: "Small Array Optimization",
        description: "Optimizing sorting for small arrays in performance-critical applications",
        industry: "High-Performance Computing",
        company: "Game Engines, Scientific Computing",
        icon: <TrendingUp className="w-5 h-5" />,
        complexity: "Medium",
        impact: "Medium"
      }
    ],
    keyBenefits: [
      "Excellent for small datasets",
      "Adaptive (efficient for nearly sorted data)",
      "Stable and in-place",
      "Simple implementation"
    ],
    realWorldExamples: [
      "Python's Timsort algorithm",
      "Java's dual-pivot quicksort fallback",
      "Card game sorting implementations",
      "Real-time data insertion and sorting"
    ]
  },
  {
    algorithm: "Quick Sort",
    category: "Sorting",
    description: "Divide-and-conquer sorting algorithm with average O(n log n) time complexity",
    useCases: [
      {
        title: "Database Query Optimization",
        description: "Used in database management systems to sort query results efficiently",
        industry: "Database Systems",
        company: "PostgreSQL, MySQL",
        icon: <Database className="w-5 h-5" />,
        complexity: "High",
        impact: "High"
      },
      {
        title: "Operating System Process Scheduling",
        description: "Sorting processes by priority or execution time in OS schedulers",
        industry: "System Software",
        company: "Linux Kernel",
        icon: <Cpu className="w-5 h-5" />,
        complexity: "Medium",
        impact: "High"
      },
      {
        title: "E-commerce Product Sorting",
        description: "Sorting products by price, rating, or popularity on shopping platforms",
        industry: "E-commerce",
        company: "Amazon, eBay",
        icon: <ShoppingCart className="w-5 h-5" />,
        complexity: "Low",
        impact: "Medium"
      }
    ],
    keyBenefits: [
      "In-place sorting with minimal memory overhead",
      "Excellent average-case performance",
      "Cache-efficient due to good locality of reference",
      "Widely optimized in standard libraries"
    ],
    realWorldExamples: [
      "Java's Arrays.sort() for primitive types",
      "C++ std::sort() implementation",
      "Database index maintenance",
      "File system directory sorting"
    ],
    codeExamples: [
      {
        title: "Java Arrays.sort() Implementation",
        language: "java",
        code: `// Simplified version of Java's Arrays.sort() for primitives
public static void sort(int[] a) {
    DualPivotQuicksort.sort(a, 0, a.length - 1, null, 0, 0);
}

// Real usage in Java applications
import java.util.Arrays;

public class DatabaseQueryOptimizer {
    public void sortQueryResults(int[] resultIds) {
        // This uses optimized quicksort internally
        Arrays.sort(resultIds);
        
        // Now results are sorted for efficient processing
        processResults(resultIds);
    }
    
    private void processResults(int[] sortedIds) {
        // Process sorted results efficiently
        for (int id : sortedIds) {
            // Database operations on sorted data
            fetchRecordById(id);
        }
    }
}`,
        description: "Java's highly optimized dual-pivot quicksort used in production systems",
        source: "OpenJDK"
      },
      {
        title: "PostgreSQL Query Sorting",
        language: "c",
        code: `/* PostgreSQL's tuplesort.c - Real database sorting */
void tuplesort_performsort(Tuplesortstate *state) {
    if (state->memtupcount > 1) {
        /* Use quicksort for in-memory sorting */
        qsort_tuple(state->memtuples, 
                   state->memtupcount,
                   state->comparetup,
                   state);
    }
}

/* Quick sort implementation for database tuples */
static void qsort_tuple(SortTuple *a, size_t n,
                       int (*cmp)(const SortTuple *a, 
                                 const SortTuple *b,
                                 Tuplesortstate *state),
                       Tuplesortstate *state) {
    /* Optimized quicksort for database records */
    if (n < 2) return;
    
    /* Partition and recursively sort */
    size_t pivot = partition_tuples(a, n, cmp, state);
    qsort_tuple(a, pivot, cmp, state);
    qsort_tuple(a + pivot + 1, n - pivot - 1, cmp, state);
}`,
        description: "PostgreSQL uses quicksort for sorting query results and building indexes",
        source: "PostgreSQL Source Code"
      }
    ]
  },
  {
    algorithm: "Merge Sort",
    category: "Sorting",
    description: "Stable divide-and-conquer sorting with guaranteed O(n log n) performance",
    useCases: [
      {
        title: "External Sorting for Big Data",
        description: "Sorting massive datasets that don't fit in memory using disk-based merge operations",
        industry: "Big Data",
        company: "Apache Spark, Hadoop",
        icon: <Database className="w-5 h-5" />,
        complexity: "High",
        impact: "High"
      },
      {
        title: "Version Control Systems",
        description: "Merging sorted lists of file changes in Git and other VCS",
        industry: "Software Development",
        company: "Git, SVN",
        icon: <Code2 className="w-5 h-5" />,
        complexity: "Medium",
        impact: "High"
      },
      {
        title: "Financial Transaction Processing",
        description: "Maintaining chronological order of transactions while merging from multiple sources",
        industry: "Finance",
        company: "Banks, Trading Platforms",
        icon: <TrendingUp className="w-5 h-5" />,
        complexity: "Medium",
        impact: "High"
      }
    ],
    keyBenefits: [
      "Stable sorting preserves relative order",
      "Guaranteed O(n log n) worst-case performance",
      "Excellent for external sorting",
      "Parallelizable for multi-core systems"
    ],
    realWorldExamples: [
      "MapReduce shuffle phase",
      "Database external merge joins",
      "Audio/video stream merging",
      "Distributed system data consolidation"
    ]
  },
  {
    algorithm: "Heap Sort",
    category: "Sorting",
    description: "In-place sorting using binary heap data structure",
    useCases: [
      {
        title: "Real-time Systems",
        description: "Priority-based task scheduling in embedded and real-time systems",
        industry: "Embedded Systems",
        company: "Automotive, IoT",
        icon: <Cpu className="w-5 h-5" />,
        complexity: "High",
        impact: "High"
      },
      {
        title: "Memory-Constrained Environments",
        description: "Sorting in systems with limited memory where in-place sorting is crucial",
        industry: "Mobile Development",
        company: "Android, iOS",
        icon: <Smartphone className="w-5 h-5" />,
        complexity: "Medium",
        impact: "Medium"
      }
    ],
    keyBenefits: [
      "In-place sorting with O(1) space complexity",
      "Guaranteed O(n log n) time complexity",
      "No worst-case quadratic behavior",
      "Useful for priority queue implementation"
    ],
    realWorldExamples: [
      "Operating system task schedulers",
      "Embedded system firmware",
      "Game engine priority systems",
      "Network packet scheduling"
    ]
  },
  {
    algorithm: "Counting Sort",
    category: "Sorting",
    description: "Linear time sorting for integers with limited range",
    useCases: [
      {
        title: "Age-based User Sorting",
        description: "Sorting users by age in social media platforms and demographics analysis",
        industry: "Social Media",
        company: "Facebook, Instagram",
        icon: <Users className="w-5 h-5" />,
        complexity: "Low",
        impact: "Medium"
      },
      {
        title: "Grade Distribution Analysis",
        description: "Sorting student grades and generating histograms in educational systems",
        industry: "Education",
        company: "Educational Platforms",
        icon: <Building2 className="w-5 h-5" />,
        complexity: "Low",
        impact: "Medium"
      }
    ],
    keyBenefits: [
      "Linear O(n + k) time complexity",
      "Stable sorting algorithm",
      "Excellent for small integer ranges",
      "Simple implementation"
    ],
    realWorldExamples: [
      "Histogram generation",
      "Bucket sorting preprocessing",
      "Character frequency counting",
      "Survey data analysis"
    ]
  },
  {
    algorithm: "Radix Sort",
    category: "Sorting",
    description: "Non-comparative sorting algorithm for integers and strings",
    useCases: [
      {
        title: "IP Address Sorting",
        description: "Sorting network IP addresses for routing tables and network analysis",
        industry: "Networking",
        company: "Cisco, Network Equipment",
        icon: <Globe className="w-5 h-5" />,
        complexity: "Medium",
        impact: "High"
      },
      {
        title: "String Sorting in Databases",
        description: "Efficiently sorting large volumes of string data in database systems",
        industry: "Database Systems",
        company: "Oracle, MongoDB",
        icon: <Database className="w-5 h-5" />,
        complexity: "Medium",
        impact: "Medium"
      }
    ],
    keyBenefits: [
      "Linear time complexity O(d × n)",
      "Stable sorting algorithm",
      "Excellent for fixed-width data",
      "No comparison operations needed"
    ],
    realWorldExamples: [
      "Network routing table maintenance",
      "Postal code sorting",
      "Credit card number processing",
      "Lexicographic string sorting"
    ]
  },

  // Searching Algorithms
  {
    algorithm: "Binary Search",
    category: "Searching",
    description: "Efficient O(log n) search algorithm for sorted arrays",
    useCases: [
      {
        title: "Database Index Lookups",
        description: "Finding records in sorted database indexes with logarithmic time complexity",
        industry: "Database Systems",
        company: "All major databases",
        icon: <Database className="w-5 h-5" />,
        complexity: "Medium",
        impact: "High"
      },
      {
        title: "Version Control Systems",
        description: "Finding specific commits or versions in Git's sorted commit history",
        industry: "Software Development",
        company: "Git, GitHub",
        icon: <Code2 className="w-5 h-5" />,
        complexity: "Low",
        impact: "Medium"
      },
      {
        title: "Search Engine Autocomplete",
        description: "Finding matching suggestions in sorted dictionaries for search autocomplete",
        industry: "Search Engines",
        company: "Google, Bing",
        icon: <Search className="w-5 h-5" />,
        complexity: "Medium",
        impact: "High"
      }
    ],
    keyBenefits: [
      "Logarithmic time complexity O(log n)",
      "Memory efficient",
      "Simple to implement and understand",
      "Optimal for sorted data"
    ],
    realWorldExamples: [
      "Dictionary and spell-check systems",
      "Library catalog systems",
      "Phone book applications",
      "Binary search in debugging (git bisect)"
    ],
    codeExamples: [
      {
        title: "Google Search Autocomplete",
        language: "javascript",
        code: `// Simplified version of search autocomplete using binary search
class SearchAutocomplete {
    constructor(suggestions) {
        // Pre-sorted array of search suggestions
        this.suggestions = suggestions.sort();
    }
    
    findSuggestions(prefix) {
        const results = [];
        const startIndex = this.binarySearchFirst(prefix);
        
        if (startIndex === -1) return results;
        
        // Collect all suggestions starting with prefix
        for (let i = startIndex; i < this.suggestions.length; i++) {
            if (this.suggestions[i].startsWith(prefix)) {
                results.push(this.suggestions[i]);
                if (results.length >= 10) break; // Limit results
            } else {
                break;
            }
        }
        return results;
    }
    
    binarySearchFirst(prefix) {
        let left = 0, right = this.suggestions.length - 1;
        let result = -1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (this.suggestions[mid].startsWith(prefix)) {
                result = mid;
                right = mid - 1; // Continue searching left
            } else if (this.suggestions[mid] < prefix) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return result;
    }
}

// Usage in search engines
const autocomplete = new SearchAutocomplete([
    "javascript", "java", "python", "react", "node.js"
]);
const suggestions = autocomplete.findSuggestions("ja"); // ["java", "javascript"]`,
        description: "Binary search enables fast autocomplete in search engines with millions of queries",
        source: "Search Engine Implementation"
      },
      {
        title: "Git Bisect Implementation",
        language: "bash",
        code: `#!/bin/bash
# Git bisect uses binary search to find the commit that introduced a bug

# Real git bisect workflow
git bisect start
git bisect bad                    # Current commit is bad
git bisect good v1.0             # v1.0 is known good

# Git automatically picks middle commit using binary search
# Equivalent to: commit = (good_commit + bad_commit) / 2

# Test the commit
make test
if [ $? -eq 0 ]; then
    git bisect good              # This commit is good
else
    git bisect bad               # This commit is bad
fi

# Git continues binary search until it finds the exact commit
# O(log n) complexity instead of O(n) linear search

# Example: Finding bug in 1000 commits
# Linear search: up to 1000 tests
# Binary search: only ~10 tests needed`,
        description: "Git bisect uses binary search to efficiently find the commit that introduced a bug",
        source: "Git Source Control"
      },
      {
        title: "Database Index Lookup",
        language: "sql",
        code: `-- MySQL B-tree index uses binary search principles
-- When you query with WHERE clause on indexed column

SELECT * FROM users WHERE user_id = 12345;

-- MySQL internally does something like this:
-- 1. Binary search on B-tree index pages
-- 2. Find the leaf page containing user_id = 12345
-- 3. Binary search within the leaf page
-- 4. Return the row location

-- Index structure (simplified):
-- Root: [1000, 5000, 9000]
--   ├─ Page1: [1-999]
--   ├─ Page2: [1000-4999] ← Binary search finds this page
--   ├─ Page3: [5000-8999]
--   └─ Page4: [9000+]

-- Within Page2: Binary search for exact match
-- [1000, 1500, 2000, 2500, 3000, ..., 4999]
--                     ↑
--              Binary search continues here`,
        description: "Database indexes use binary search for O(log n) record lookups",
        source: "MySQL Documentation"
      }
    ]
  },
  {
    algorithm: "Linear Search",
    category: "Searching",
    description: "Simple sequential search through unsorted data",
    useCases: [
      {
        title: "Small Dataset Searches",
        description: "Searching through small collections where sorting overhead isn't justified",
        industry: "General Software",
        company: "Various applications",
        icon: <Search className="w-5 h-5" />,
        complexity: "Low",
        impact: "Low"
      },
      {
        title: "Unsorted Data Streams",
        description: "Real-time searching in streaming data where sorting isn't possible",
        industry: "Data Streaming",
        company: "Apache Kafka, Stream Processing",
        icon: <Database className="w-5 h-5" />,
        complexity: "Low",
        impact: "Medium"
      }
    ],
    keyBenefits: [
      "Works on unsorted data",
      "Simple implementation",
      "No preprocessing required",
      "Memory efficient"
    ],
    realWorldExamples: [
      "Finding items in shopping carts",
      "Searching recent browser history",
      "Finding contacts in small address books",
      "Debugging and testing scenarios"
    ]
  },

  // Tree Data Structures
  {
    algorithm: "Binary Search Tree",
    category: "Trees",
    description: "Hierarchical data structure for efficient searching, insertion, and deletion",
    useCases: [
      {
        title: "Database Indexing",
        description: "B-trees and B+ trees in database systems for efficient data retrieval",
        industry: "Database Systems",
        company: "MySQL, PostgreSQL, Oracle",
        icon: <Database className="w-5 h-5" />,
        complexity: "High",
        impact: "High"
      },
      {
        title: "File System Organization",
        description: "Directory structures and file indexing in operating systems",
        industry: "Operating Systems",
        company: "Windows, Linux, macOS",
        icon: <Cpu className="w-5 h-5" />,
        complexity: "High",
        impact: "High"
      },
      {
        title: "Expression Parsing",
        description: "Parsing mathematical expressions and building syntax trees in compilers",
        industry: "Compiler Design",
        company: "Programming Language Compilers",
        icon: <Code2 className="w-5 h-5" />,
        complexity: "Medium",
        impact: "High"
      }
    ],
    keyBenefits: [
      "Efficient search, insert, delete operations",
      "Maintains sorted order",
      "Dynamic size adjustment",
      "In-order traversal gives sorted sequence"
    ],
    realWorldExamples: [
      "MySQL InnoDB storage engine",
      "File system directory structures",
      "Compiler symbol tables",
      "Priority queue implementations"
    ]
  },
  {
    algorithm: "Binary Tree Traversal",
    category: "Trees",
    description: "Systematic methods to visit all nodes in a binary tree",
    useCases: [
      {
        title: "HTML DOM Manipulation",
        description: "Traversing and manipulating HTML document structure in web browsers",
        industry: "Web Development",
        company: "All web browsers",
        icon: <Globe className="w-5 h-5" />,
        complexity: "Medium",
        impact: "High"
      },
      {
        title: "File System Operations",
        description: "Directory traversal for file operations like search, backup, and indexing",
        industry: "System Software",
        company: "Operating Systems",
        icon: <Cpu className="w-5 h-5" />,
        complexity: "Medium",
        impact: "High"
      },
      {
        title: "Decision Tree Evaluation",
        description: "Traversing decision trees in machine learning and AI systems",
        industry: "Machine Learning",
        company: "ML Frameworks",
        icon: <TrendingUp className="w-5 h-5" />,
        complexity: "Medium",
        impact: "Medium"
      }
    ],
    keyBenefits: [
      "Systematic node visitation",
      "Different orders for different purposes",
      "Foundation for tree algorithms",
      "Memory efficient traversal"
    ],
    realWorldExamples: [
      "XML/JSON parsing",
      "Syntax tree evaluation",
      "Game tree traversal",
      "Organizational hierarchy processing"
    ]
  },

  // Graph Algorithms
  {
    algorithm: "Breadth-First Search (BFS)",
    category: "Graphs",
    description: "Level-by-level graph traversal algorithm",
    useCases: [
      {
        title: "Social Network Analysis",
        description: "Finding shortest connection paths between users in social networks",
        industry: "Social Media",
        company: "Facebook, LinkedIn",
        icon: <Users className="w-5 h-5" />,
        complexity: "Medium",
        impact: "High"
      },
      {
        title: "GPS Navigation Systems",
        description: "Finding shortest routes between locations in mapping applications",
        industry: "Navigation",
        company: "Google Maps, Waze",
        icon: <MapPin className="w-5 h-5" />,
        complexity: "High",
        impact: "High"
      },
      {
        title: "Network Broadcasting",
        description: "Efficient message broadcasting in computer networks",
        industry: "Networking",
        company: "Network Infrastructure",
        icon: <Globe className="w-5 h-5" />,
        complexity: "Medium",
        impact: "Medium"
      }
    ],
    keyBenefits: [
      "Finds shortest unweighted paths",
      "Level-order traversal",
      "Optimal for unweighted graphs",
      "Guarantees minimum steps"
    ],
    realWorldExamples: [
      "Six degrees of separation calculations",
      "Shortest path in unweighted graphs",
      "Web crawling strategies",
      "Puzzle solving (like 15-puzzle)"
    ]
  },
  {
    algorithm: "Depth-First Search (DFS)",
    category: "Graphs",
    description: "Deep exploration graph traversal algorithm",
    useCases: [
      {
        title: "Maze Solving Algorithms",
        description: "Finding paths through mazes and labyrinth-like structures",
        industry: "Gaming",
        company: "Game Development",
        icon: <Cpu className="w-5 h-5" />,
        complexity: "Medium",
        impact: "Medium"
      },
      {
        title: "Dependency Resolution",
        description: "Resolving package dependencies in software package managers",
        industry: "Software Development",
        company: "npm, pip, Maven",
        icon: <Code2 className="w-5 h-5" />,
        complexity: "High",
        impact: "High"
      },
      {
        title: "Topological Sorting",
        description: "Ordering tasks with dependencies in project management systems",
        industry: "Project Management",
        company: "Build Systems, CI/CD",
        icon: <Building2 className="w-5 h-5" />,
        complexity: "Medium",
        impact: "High"
      }
    ],
    keyBenefits: [
      "Memory efficient (uses recursion stack)",
      "Finds connected components",
      "Detects cycles in graphs",
      "Useful for backtracking algorithms"
    ],
    realWorldExamples: [
      "Git branch traversal",
      "Compiler dependency analysis",
      "Sudoku and puzzle solvers",
      "Web scraping and crawling"
    ]
  },

  // Hashing
  {
    algorithm: "Hash Table",
    category: "Hashing",
    description: "Key-value data structure with average O(1) access time",
    useCases: [
      {
        title: "Database Caching",
        description: "Caching frequently accessed data in database systems and web applications",
        industry: "Web Development",
        company: "Redis, Memcached",
        icon: <Database className="w-5 h-5" />,
        complexity: "Medium",
        impact: "High"
      },
      {
        title: "User Session Management",
        description: "Storing and retrieving user session data in web applications",
        industry: "Web Development",
        company: "All web frameworks",
        icon: <Globe className="w-5 h-5" />,
        complexity: "Low",
        impact: "High"
      },
      {
        title: "Compiler Symbol Tables",
        description: "Storing variable and function names during compilation process",
        industry: "Compiler Design",
        company: "Programming Language Compilers",
        icon: <Code2 className="w-5 h-5" />,
        complexity: "Medium",
        impact: "High"
      }
    ],
    keyBenefits: [
      "Average O(1) access time",
      "Efficient key-value storage",
      "Dynamic resizing capability",
      "Widely supported in programming languages"
    ],
    realWorldExamples: [
      "Python dictionaries",
      "JavaScript objects/Maps",
      "Database hash indexes",
      "Blockchain transaction verification"
    ],
    codeExamples: [
      {
        title: "Redis Cache Implementation",
        language: "c",
        code: `/* Redis hash table implementation (simplified) */
typedef struct dictEntry {
    void *key;
    union {
        void *val;
        uint64_t u64;
        int64_t s64;
        double d;
    } v;
    struct dictEntry *next;     /* Next entry in collision chain */
} dictEntry;

typedef struct dictht {
    dictEntry **table;          /* Hash table array */
    unsigned long size;         /* Hash table size */
    unsigned long sizemask;     /* Size mask (size-1) */
    unsigned long used;         /* Number of entries */
} dictht;

/* Hash function used by Redis */
uint64_t siphash(const uint8_t *in, const size_t inlen, 
                 const uint8_t *k) {
    /* SipHash algorithm for secure hashing */
    return hash_value;
}

/* Get value from hash table - O(1) average case */
dictEntry *dictFind(dict *d, const void *key) {
    dictEntry *he;
    uint64_t h, idx, table;
    
    if (d->ht[0].used + d->ht[1].used == 0) return NULL;
    
    h = dictHashKey(d, key);
    for (table = 0; table <= 1; table++) {
        idx = h & d->ht[table].sizemask;
        he = d->ht[table].table[idx];
        
        /* Handle collisions with chaining */
        while(he) {
            if (key==he->key || dictCompareKeys(d, key, he->key))
                return he;
            he = he->next;
        }
    }
    return NULL;
}`,
        description: "Redis uses hash tables for O(1) key-value operations, serving millions of requests per second",
        source: "Redis Source Code"
      },
      {
        title: "Node.js V8 Object Properties",
        language: "javascript",
        code: `// V8 JavaScript engine uses hash tables for object properties
// When you create an object, V8 internally uses hash maps

class UserSession {
    constructor() {
        // V8 creates a hidden hash table for these properties
        this.userId = null;
        this.sessionToken = null;
        this.permissions = [];
        this.lastActivity = Date.now();
    }
    
    // Property access is O(1) due to hash table
    setPermission(permission) {
        this.permissions.push(permission);
    }
}

// Real-world usage in web applications
const sessionStore = new Map(); // JavaScript Map uses hash table

function createSession(userId) {
    const sessionId = generateSessionId();
    const session = new UserSession();
    session.userId = userId;
    session.sessionToken = sessionId;
    
    // O(1) insertion into hash table
    sessionStore.set(sessionId, session);
    return sessionId;
}

function getSession(sessionId) {
    // O(1) lookup in hash table
    return sessionStore.get(sessionId);
}

// Used by millions of web applications for session management
const session = getSession("abc123");
if (session && session.lastActivity > Date.now() - 3600000) {
    // Session is valid and not expired
    processRequest(session);
}`,
        description: "JavaScript engines use hash tables for object properties and Maps, enabling fast web applications",
        source: "V8 JavaScript Engine"
      },
      {
        title: "Python Dictionary Implementation",
        language: "python",
        code: `# Python's dict implementation uses open addressing hash table
# CPython source: Objects/dictobject.c

class WebFrameworkRouter:
    def __init__(self):
        # Python dict uses hash table internally
        self.routes = {}  # O(1) average case lookup
        
    def add_route(self, path, handler):
        """Add a route - O(1) average case"""
        self.routes[path] = handler
        
    def find_handler(self, path):
        """Find handler for path - O(1) average case"""
        return self.routes.get(path)

# Real usage in web frameworks like Flask/Django
router = WebFrameworkRouter()

# Adding routes (used by Flask, Django, FastAPI)
router.add_route('/api/users', handle_users)
router.add_route('/api/posts', handle_posts)
router.add_route('/api/auth', handle_auth)

# Request routing - happens millions of times per day
def handle_request(request_path):
    handler = router.find_handler(request_path)  # O(1) lookup
    if handler:
        return handler(request_path)
    else:
        return "404 Not Found"

# Example: Instagram handles billions of requests using hash tables
# for routing, caching, and data storage`,
        description: "Python dictionaries power web frameworks, enabling fast request routing and data access",
        source: "CPython Implementation"
      }
    ]
  },

  // Dynamic Programming
  {
    algorithm: "Fibonacci (Memoization)",
    category: "Dynamic Programming",
    description: "Optimizing recursive algorithms by storing computed results",
    useCases: [
      {
        title: "Financial Modeling",
        description: "Calculating compound interest and investment growth patterns",
        industry: "Finance",
        company: "Financial Institutions",
        icon: <TrendingUp className="w-5 h-5" />,
        complexity: "Low",
        impact: "Medium"
      },
      {
        title: "Algorithm Optimization",
        description: "Teaching memoization concepts for optimizing recursive algorithms",
        industry: "Education",
        company: "Educational Platforms",
        icon: <Building2 className="w-5 h-5" />,
        complexity: "Medium",
        impact: "Medium"
      }
    ],
    keyBenefits: [
      "Eliminates redundant calculations",
      "Reduces time complexity dramatically",
      "Foundation for dynamic programming",
      "Easy to understand and implement"
    ],
    realWorldExamples: [
      "Recursive function optimization",
      "Mathematical sequence calculations",
      "Algorithm problems",
      "Performance optimization tutorials"
    ]
  },
  {
    algorithm: "0/1 Knapsack",
    category: "Dynamic Programming",
    description: "Optimization problem for resource allocation with constraints",
    useCases: [
      {
        title: "Resource Allocation",
        description: "Optimizing server resource allocation in cloud computing platforms",
        industry: "Cloud Computing",
        company: "AWS, Azure, Google Cloud",
        icon: <Cpu className="w-5 h-5" />,
        complexity: "High",
        impact: "High"
      },
      {
        title: "Investment Portfolio Optimization",
        description: "Selecting optimal investment combinations within budget constraints",
        industry: "Finance",
        company: "Investment Firms",
        icon: <TrendingUp className="w-5 h-5" />,
        complexity: "High",
        impact: "High"
      },
      {
        title: "Cargo Loading Optimization",
        description: "Maximizing cargo value while respecting weight and space constraints",
        industry: "Logistics",
        company: "Shipping Companies",
        icon: <Building2 className="w-5 h-5" />,
        complexity: "Medium",
        impact: "High"
      }
    ],
    keyBenefits: [
      "Optimal solution guarantee",
      "Handles complex constraints",
      "Applicable to many optimization problems",
      "Foundation for advanced DP algorithms"
    ],
    realWorldExamples: [
      "Memory allocation in operating systems",
      "Budget allocation in project management",
      "Feature selection in machine learning",
      "Cutting stock problems in manufacturing"
    ]
  },

  // Greedy Algorithms
  {
    algorithm: "Activity Selection",
    category: "Greedy",
    description: "Selecting maximum number of non-overlapping activities",
    useCases: [
      {
        title: "Meeting Room Scheduling",
        description: "Optimizing conference room bookings in office management systems",
        industry: "Office Management",
        company: "Corporate Software",
        icon: <Building2 className="w-5 h-5" />,
        complexity: "Low",
        impact: "Medium"
      },
      {
        title: "CPU Process Scheduling",
        description: "Scheduling processes to maximize CPU utilization in operating systems",
        industry: "Operating Systems",
        company: "OS Schedulers",
        icon: <Cpu className="w-5 h-5" />,
        complexity: "Medium",
        impact: "High"
      },
      {
        title: "Event Planning Optimization",
        description: "Maximizing number of events that can be attended or organized",
        industry: "Event Management",
        company: "Event Planning Software",
        icon: <Clock className="w-5 h-5" />,
        complexity: "Low",
        impact: "Medium"
      }
    ],
    keyBenefits: [
      "Simple greedy approach",
      "Optimal for this specific problem",
      "Linear time complexity",
      "Easy to understand and implement"
    ],
    realWorldExamples: [
      "Calendar application scheduling",
      "Resource booking systems",
      "Task scheduling in project management",
      "Interval scheduling in various domains"
    ]
  }
]

export default function UseCasesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedComplexity, setSelectedComplexity] = useState<string>("all")
  const [selectedImpact, setSelectedImpact] = useState<string>("all")

  const categories = ["all", ...Array.from(new Set(algorithmUseCases.map(item => item.category)))]
  const complexities = ["all", "Low", "Medium", "High"]
  const impacts = ["all", "Low", "Medium", "High"]

  const filteredUseCases = algorithmUseCases.filter(item => {
    const categoryMatch = selectedCategory === "all" || item.category === selectedCategory
    const complexityMatch = selectedComplexity === "all" || 
      item.useCases.some(useCase => useCase.complexity === selectedComplexity)
    const impactMatch = selectedImpact === "all" || 
      item.useCases.some(useCase => useCase.impact === selectedImpact)
    
    return categoryMatch && complexityMatch && impactMatch
  })

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "High": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Low": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Medium": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "High": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white p-1 sm:p-2">
                  <ArrowLeft className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Back to Visualizer</span>
                </Button>
              </Link>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white truncate">Real-World Use Cases</h1>
                <p className="text-xs sm:text-sm text-slate-400 hidden sm:block">Discover how algorithms and data structures power the digital world</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Introduction */}
        <div className="mb-6 sm:mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                From Theory to Practice
              </CardTitle>
              <CardDescription className="text-slate-300 text-sm sm:text-base">
                Every algorithm and data structure you learn has real applications in the software industry. 
                This comprehensive guide shows you exactly where and how these concepts are used in production systems, 
                from social media platforms to operating systems.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Statistics */}
        <div className="mb-6 sm:mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">{algorithmUseCases.length}</div>
                <div className="text-blue-200 text-xs sm:text-sm">Algorithms Covered</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-700">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {algorithmUseCases.reduce((total, alg) => total + alg.useCases.length, 0)}
                </div>
                <div className="text-green-200 text-xs sm:text-sm">Real-World Use Cases</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-900 to-purple-800 border-purple-700">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {Array.from(new Set(algorithmUseCases.flatMap(alg => alg.useCases.map(uc => uc.industry)))).length}
                </div>
                <div className="text-purple-200 text-xs sm:text-sm">Industries</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-900 to-orange-800 border-orange-700">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {categories.length - 1}
                </div>
                <div className="text-orange-200 text-xs sm:text-sm">Algorithm Categories</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 sm:mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-white text-base sm:text-lg">Filter Use Cases</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">Category</label>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">Complexity</label>
                  <select 
                    value={selectedComplexity} 
                    onChange={(e) => setSelectedComplexity(e.target.value)}
                    className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm"
                  >
                    {complexities.map(complexity => (
                      <option key={complexity} value={complexity}>
                        {complexity === "all" ? "All Complexities" : complexity}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">Business Impact</label>
                  <select 
                    value={selectedImpact} 
                    onChange={(e) => setSelectedImpact(e.target.value)}
                    className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm"
                  >
                    {impacts.map(impact => (
                      <option key={impact} value={impact}>
                        {impact === "all" ? "All Impact Levels" : impact}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Algorithm Use Cases */}
        <div className="space-y-6 sm:space-y-8">
          {filteredUseCases.map((algorithmData, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-white text-lg sm:text-xl">{algorithmData.algorithm}</CardTitle>
                    <CardDescription className="text-slate-300 mt-1 text-sm sm:text-base">
                      {algorithmData.description}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-slate-300 border-slate-600 self-start sm:self-center">
                    {algorithmData.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <Tabs defaultValue="use-cases" className="w-full">
                  <TabsList className={`grid w-full ${algorithmData.codeExamples ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'} bg-slate-700 text-xs sm:text-sm`}>
                    <TabsTrigger value="use-cases" className="text-slate-300 data-[state=active]:text-white">
                      Use Cases
                    </TabsTrigger>
                    <TabsTrigger value="benefits" className="text-slate-300 data-[state=active]:text-white">
                      Benefits
                    </TabsTrigger>
                    <TabsTrigger value="examples" className="text-slate-300 data-[state=active]:text-white">
                      Examples
                    </TabsTrigger>
                    {algorithmData.codeExamples && (
                      <TabsTrigger value="code" className="text-slate-300 data-[state=active]:text-white">
                        Code
                      </TabsTrigger>
                    )}
                  </TabsList>
                  
                  <TabsContent value="use-cases" className="mt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                      {algorithmData.useCases.map((useCase, useCaseIndex) => (
                        <Card key={useCaseIndex} className="bg-slate-700 border-slate-600">
                          <CardHeader className="pb-3 p-3 sm:p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                {useCase.icon}
                                <CardTitle className="text-white text-sm sm:text-base truncate">{useCase.title}</CardTitle>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                              <Badge className={`${getComplexityColor(useCase.complexity)} text-xs`}>
                                {useCase.complexity} Complexity
                              </Badge>
                              <Badge className={`${getImpactColor(useCase.impact)} text-xs`}>
                                {useCase.impact} Impact
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0 p-3 sm:p-4">
                            <p className="text-slate-300 text-xs sm:text-sm mb-2">{useCase.description}</p>
                            <div className="text-xs text-slate-400">
                              <p><strong>Industry:</strong> {useCase.industry}</p>
                              {useCase.company && <p><strong>Used by:</strong> {useCase.company}</p>}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="benefits" className="mt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                      {algorithmData.keyBenefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start gap-3 p-3 bg-slate-700 rounded-lg">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-slate-300 text-sm sm:text-base">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="examples" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {algorithmData.realWorldExamples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="flex items-start gap-3 p-3 bg-slate-700 rounded-lg">
                          <Code2 className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                          <p className="text-slate-300">{example}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  {algorithmData.codeExamples && (
                    <TabsContent value="code" className="mt-4">
                      <div className="space-y-6">
                        {algorithmData.codeExamples.map((codeExample, codeIndex) => (
                          <Card key={codeIndex} className="bg-slate-700 border-slate-600">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-white text-lg">{codeExample.title}</CardTitle>
                                <Badge variant="outline" className="text-slate-300 border-slate-500">
                                  {codeExample.language}
                                </Badge>
                              </div>
                              <CardDescription className="text-slate-300">
                                {codeExample.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="relative">
                                <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm">
                                  <code className="text-slate-200 whitespace-pre">
                                    {codeExample.code}
                                  </code>
                                </pre>
                                <div className="absolute top-2 right-2">
                                  <Badge variant="secondary" className="text-xs bg-slate-800 text-slate-300">
                                    {codeExample.source}
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Industry Overview */}
        <div className="mt-12">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-xl">Industry Impact Overview</CardTitle>
              <CardDescription className="text-slate-300">
                How different industries leverage algorithms and data structures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="tech-giants" className="border-slate-600">
                  <AccordionTrigger className="text-white hover:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Technology Giants (Google, Facebook, Amazon)
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-300">
                    <div className="space-y-3">
                      <p><strong>Search Engines:</strong> Binary search for autocomplete, hash tables for caching, graph algorithms for PageRank</p>
                      <p><strong>Social Networks:</strong> BFS for friend suggestions, graph algorithms for news feed ranking, hash tables for user sessions</p>
                      <p><strong>E-commerce:</strong> Sorting algorithms for product listings, recommendation systems using graph algorithms, inventory management with dynamic programming</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="financial" className="border-slate-600">
                  <AccordionTrigger className="text-white hover:text-slate-300">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Financial Services
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-300">
                    <div className="space-y-3">
                      <p><strong>High-Frequency Trading:</strong> Optimized sorting and searching algorithms for microsecond-level trade execution</p>
                      <p><strong>Risk Management:</strong> Dynamic programming for portfolio optimization, graph algorithms for fraud detection</p>
                      <p><strong>Blockchain:</strong> Hash functions for transaction verification, Merkle trees for data integrity</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="gaming" className="border-slate-600">
                  <AccordionTrigger className="text-white hover:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-5 h-5" />
                      Gaming Industry
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-300">
                    <div className="space-y-3">
                      <p><strong>Pathfinding:</strong> A* algorithm (based on BFS/DFS) for NPC movement and navigation</p>
                      <p><strong>Game State Management:</strong> Trees for decision making, hash tables for quick state lookups</p>
                      <p><strong>Procedural Generation:</strong> Various algorithms for creating game worlds and content</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="healthcare" className="border-slate-600">
                  <AccordionTrigger className="text-white hover:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Healthcare & Biotechnology
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-300">
                    <div className="space-y-3">
                      <p><strong>DNA Sequencing:</strong> String matching algorithms for genetic analysis</p>
                      <p><strong>Medical Imaging:</strong> Graph algorithms for image processing and analysis</p>
                      <p><strong>Drug Discovery:</strong> Dynamic programming for protein folding predictions</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-blue-900 to-purple-900 border-slate-700">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl">Ready to Master These Algorithms?</CardTitle>
              <CardDescription className="text-slate-300 text-lg">
                Go back to the interactive visualizer and see these algorithms in action
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                  <Code2 className="w-5 h-5 mr-2" />
                  Start Learning with Visualizations
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 p-4 text-center text-slate-500 text-sm mt-12">
        <p>&copy; {new Date().getFullYear()} DSA Visualizer - Real-World Applications Guide</p>
      </footer>
    </div>
  )
} 