import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const hashTableExplanationContent = (
  <AlgorithmExplanation>
    <h2>Hash Table (Separate Chaining)</h2>
    <p>
      A Hash Table is a data structure that implements an associative array abstract data type, a structure that can map
      keys to values. A hash table uses a hash function to compute an index, also called a hash code, into an array of
      buckets or slots, from which the desired value can be found.
    </p>
    <h3>How it Works:</h3>
    <ol>
      <li>
        <strong>Hash Function:</strong> Takes a key and returns an index in the array where the value should be stored.
      </li>
      <li>
        <strong>Collision Handling:</strong> When two keys hash to the same index, we need a strategy to handle this:
        <ul>
          <li><strong>Separate Chaining:</strong> Each bucket contains a linked list of key-value pairs.</li>
          <li><strong>Open Addressing:</strong> Find another open slot using probing techniques.</li>
        </ul>
      </li>
      <li>
        <strong>Load Factor:</strong> The ratio of filled slots to total slots. When it gets too high, the table is
        resized.
      </li>
    </ol>
    <h3>Time Complexity:</h3>
    <ul>
      <li>
        <strong>Average case:</strong> $$O(1)$$ for insert, search, delete
      </li>
      <li>
        <strong>Worst case:</strong> $$O(n)$$ when all keys hash to the same bucket
      </li>
    </ul>
    <h3>Space Complexity:</h3>
    <p>$$O(n)$$ where n is the number of key-value pairs stored.</p>
  </AlgorithmExplanation>
)

export const hashTableCodeSnippets = {
  python: `class HashNode:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.next = None

class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [None] * self.size
        self.count = 0
    
    def _hash(self, key):
        return hash(key) % self.size
    
    def insert(self, key, value):
        index = self._hash(key)
        
        if self.table[index] is None:
            self.table[index] = HashNode(key, value)
            self.count += 1
        else:
            current = self.table[index]
            while current:
                if current.key == key:
                    current.value = value
                    return
                if current.next is None:
                    break
                current = current.next
            current.next = HashNode(key, value)
            self.count += 1
    
    def search(self, key):
        index = self._hash(key)
        current = self.table[index]
        
        while current:
            if current.key == key:
                return current.value
            current = current.next
        
        return None`,
  javascript: `class HashNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  constructor(size = 10) {
    this.size = size;
    this.table = new Array(size).fill(null);
    this.count = 0;
  }
  
  _hash(key) {
    let hash = 0;
    const str = key.toString();
    for (let i = 0; i < str.length; i++) {
      hash = (hash + str.charCodeAt(i) * i) % this.size;
    }
    return hash;
  }
  
  insert(key, value) {
    const index = this._hash(key);
    
    if (this.table[index] === null) {
      this.table[index] = new HashNode(key, value);
      this.count++;
    } else {
      let current = this.table[index];
      while (current) {
        if (current.key === key) {
          current.value = value;
          return;
        }
        if (current.next === null) break;
        current = current.next;
      }
      current.next = new HashNode(key, value);
      this.count++;
    }
  }
  
  search(key) {
    const index = this._hash(key);
    let current = this.table[index];
    
    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    
    return null;
  }
}`,
  typescript: `class HashNode<T> {
  key: string;
  value: T;
  next: HashNode<T> | null;
  
  constructor(key: string, value: T) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable<T> {
  private size: number;
  private table: (HashNode<T> | null)[];
  private count: number;
  
  constructor(size: number = 10) {
    this.size = size;
    this.table = new Array(size).fill(null);
    this.count = 0;
  }
  
  private _hash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.size;
    }
    return hash;
  }
  
  insert(key: string, value: T): void {
    const index = this._hash(key);
    
    if (this.table[index] === null) {
      this.table[index] = new HashNode(key, value);
      this.count++;
    } else {
      let current = this.table[index];
      while (current) {
        if (current.key === key) {
          current.value = value;
          return;
        }
        if (current.next === null) break;
        current = current.next;
      }
      current.next = new HashNode(key, value);
      this.count++;
    }
  }
  
  search(key: string): T | null {
    const index = this._hash(key);
    let current = this.table[index];
    
    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    
    return null;
  }
}`,

  java: `import java.util.*;

class HashNode {
    String key;
    Object value;
    HashNode next;
    
    public HashNode(String key, Object value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

public class HashTable {
    private int size;
    private HashNode[] table;
    private int count;
    
    public HashTable(int size) {
        this.size = size;
        this.table = new HashNode[size];
        this.count = 0;
    }
    
    private int hash(String key) {
        int hash = 0;
        for (int i = 0; i < key.length(); i++) {
            hash = (hash + key.charAt(i) * i) % size;
        }
        return Math.abs(hash);
    }
    
    public void insert(String key, Object value) {
        int index = hash(key);
        
        if (table[index] == null) {
            table[index] = new HashNode(key, value);
            count++;
        } else {
            HashNode current = table[index];
            while (current != null) {
                if (current.key.equals(key)) {
                    current.value = value;
                    return;
                }
                if (current.next == null) break;
                current = current.next;
            }
            current.next = new HashNode(key, value);
            count++;
        }
    }
    
    public Object search(String key) {
        int index = hash(key);
        HashNode current = table[index];
        
        while (current != null) {
            if (current.key.equals(key)) {
                return current.value;
            }
            current = current.next;
        }
        
        return null;
    }
}`,

  cpp: `#include <iostream>
#include <string>
#include <vector>

template<typename T>
struct HashNode {
    std::string key;
    T value;
    HashNode* next;
    
    HashNode(const std::string& k, const T& v) : key(k), value(v), next(nullptr) {}
};

template<typename T>
class HashTable {
private:
    int size;
    std::vector<HashNode<T>*> table;
    int count;
    
    int hash(const std::string& key) {
        int hash = 0;
        for (size_t i = 0; i < key.length(); i++) {
            hash = (hash + key[i] * i) % size;
        }
        return std::abs(hash);
    }
    
public:
    HashTable(int s = 10) : size(s), table(s, nullptr), count(0) {}
    
    void insert(const std::string& key, const T& value) {
        int index = hash(key);
        
        if (table[index] == nullptr) {
            table[index] = new HashNode<T>(key, value);
            count++;
        } else {
            HashNode<T>* current = table[index];
            while (current != nullptr) {
                if (current->key == key) {
                    current->value = value;
                    return;
                }
                if (current->next == nullptr) break;
                current = current->next;
            }
            current->next = new HashNode<T>(key, value);
            count++;
        }
    }
    
    T* search(const std::string& key) {
        int index = hash(key);
        HashNode<T>* current = table[index];
        
        while (current != nullptr) {
            if (current->key == key) {
                return &(current->value);
            }
            current = current->next;
        }
        
        return nullptr;
    }
};`,

  csharp: `using System;

public class HashNode 
{
    public string Key { get; set; }
    public object Value { get; set; }
    public HashNode Next { get; set; }
    
    public HashNode(string key, object value) 
    {
        Key = key;
        Value = value;
        Next = null;
    }
}

public class HashTable 
{
    private int size;
    private HashNode[] table;
    private int count;
    
    public HashTable(int size = 10) 
    {
        this.size = size;
        this.table = new HashNode[size];
        this.count = 0;
    }
    
    private int Hash(string key) 
    {
        int hash = 0;
        for (int i = 0; i < key.Length; i++) 
        {
            hash = (hash + key[i] * i) % size;
        }
        return Math.Abs(hash);
    }
    
    public void Insert(string key, object value) 
    {
        int index = Hash(key);
        
        if (table[index] == null) 
        {
            table[index] = new HashNode(key, value);
            count++;
        } 
        else 
        {
            HashNode current = table[index];
            while (current != null) 
            {
                if (current.Key == key) 
                {
                    current.Value = value;
                    return;
                }
                if (current.Next == null) break;
                current = current.Next;
            }
            current.Next = new HashNode(key, value);
            count++;
        }
    }
    
    public object Search(string key) 
    {
        int index = Hash(key);
        HashNode current = table[index];
        
        while (current != null) 
        {
            if (current.Key == key) 
            {
                return current.Value;
            }
            current = current.Next;
        }
        
        return null;
    }
}`,

  php: `<?php
class HashNode {
    public $key;
    public $value;
    public $next;
    
    public function __construct($key, $value) {
        $this->key = $key;
        $this->value = $value;
        $this->next = null;
    }
}

class HashTable {
    private $size;
    private $table;
    private $count;
    
    public function __construct($size = 10) {
        $this->size = $size;
        $this->table = array_fill(0, $size, null);
        $this->count = 0;
    }
    
    private function hash($key) {
        $hash = 0;
        for ($i = 0; $i < strlen($key); $i++) {
            $hash = ($hash + ord($key[$i]) * $i) % $this->size;
        }
        return abs($hash);
    }
    
    public function insert($key, $value) {
        $index = $this->hash($key);
        
        if ($this->table[$index] === null) {
            $this->table[$index] = new HashNode($key, $value);
            $this->count++;
        } else {
            $current = $this->table[$index];
            while ($current !== null) {
                if ($current->key === $key) {
                    $current->value = $value;
                    return;
                }
                if ($current->next === null) break;
                $current = $current->next;
            }
            $current->next = new HashNode($key, $value);
            $this->count++;
        }
    }
    
    public function search($key) {
        $index = $this->hash($key);
        $current = $this->table[$index];
        
        while ($current !== null) {
            if ($current->key === $key) {
                return $current->value;
            }
            $current = $current->next;
        }
        
        return null;
    }
}
?>`,

  ruby: `class HashNode
  attr_accessor :key, :value, :next
  
  def initialize(key, value)
    @key = key
    @value = value
    @next = nil
  end
end

class HashTable
  def initialize(size = 10)
    @size = size
    @table = Array.new(size)
    @count = 0
  end
  
  private
  
  def hash(key)
    hash = 0
    key.to_s.each_char.with_index do |char, i|
      hash = (hash + char.ord * i) % @size
    end
    hash.abs
  end
  
  public
  
  def insert(key, value)
    index = hash(key)
    
    if @table[index].nil?
      @table[index] = HashNode.new(key, value)
      @count += 1
    else
      current = @table[index]
      while current
        if current.key == key
          current.value = value
          return
        end
        break if current.next.nil?
        current = current.next
      end
      current.next = HashNode.new(key, value)
      @count += 1
    end
  end
  
  def search(key)
    index = hash(key)
    current = @table[index]
    
    while current
      return current.value if current.key == key
      current = current.next
    end
    
    nil
  end
end`,

  swift: `import Foundation

class HashNode {
    var key: String
    var value: Any
    var next: HashNode?
    
    init(key: String, value: Any) {
        self.key = key
        self.value = value
        self.next = nil
    }
}

class HashTable {
    private var size: Int
    private var table: [HashNode?]
    private var count: Int
    
    init(size: Int = 10) {
        self.size = size
        self.table = Array(repeating: nil, count: size)
        self.count = 0
    }
    
    private func hash(_ key: String) -> Int {
        var hash = 0
        for (index, char) in key.enumerated() {
            hash = (hash + Int(char.asciiValue ?? 0) * index) % size
        }
        return abs(hash)
    }
    
    func insert(key: String, value: Any) {
        let index = hash(key)
        
        if table[index] == nil {
            table[index] = HashNode(key: key, value: value)
            count += 1
        } else {
            var current = table[index]
            while let node = current {
                if node.key == key {
                    node.value = value
                    return
                }
                if node.next == nil { break }
                current = node.next
            }
            current?.next = HashNode(key: key, value: value)
            count += 1
        }
    }
    
    func search(key: String) -> Any? {
        let index = hash(key)
        var current = table[index]
        
        while let node = current {
            if node.key == key {
                return node.value
            }
            current = node.next
        }
        
        return nil
    }
}`,

  go: `package main

import (
    "fmt"
    "math"
)

type HashNode struct {
    Key   string
    Value interface{}
    Next  *HashNode
}

type HashTable struct {
    size  int
    table []*HashNode
    count int
}

func NewHashTable(size int) *HashTable {
    return &HashTable{
        size:  size,
        table: make([]*HashNode, size),
        count: 0,
    }
}

func (ht *HashTable) hash(key string) int {
    hash := 0
    for i, char := range key {
        hash = (hash + int(char)*i) % ht.size
    }
    return int(math.Abs(float64(hash)))
}

func (ht *HashTable) Insert(key string, value interface{}) {
    index := ht.hash(key)
    
    if ht.table[index] == nil {
        ht.table[index] = &HashNode{Key: key, Value: value}
        ht.count++
    } else {
        current := ht.table[index]
        for current != nil {
            if current.Key == key {
                current.Value = value
                return
            }
            if current.Next == nil {
                break
            }
            current = current.Next
        }
        current.Next = &HashNode{Key: key, Value: value}
        ht.count++
    }
}

func (ht *HashTable) Search(key string) interface{} {
    index := ht.hash(key)
    current := ht.table[index]
    
    for current != nil {
        if current.Key == key {
            return current.Value
        }
        current = current.Next
    }
    
    return nil
}`
} 