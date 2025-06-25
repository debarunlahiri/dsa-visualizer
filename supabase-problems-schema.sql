-- Additional schema for storing problems in Supabase
-- Run this after the main supabase-schema.sql

-- Create problems table
CREATE TABLE IF NOT EXISTS problems (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) NOT NULL DEFAULT 'easy',
    category TEXT NOT NULL DEFAULT 'general',
    tags TEXT[] DEFAULT '{}',
    examples JSONB DEFAULT '[]',
    constraints JSONB DEFAULT '{}',
    hints TEXT[] DEFAULT '{}',
    solution_template JSONB DEFAULT '{}', -- Templates for different languages
    test_cases JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for problems table
CREATE INDEX IF NOT EXISTS idx_problems_slug ON problems(slug);
CREATE INDEX IF NOT EXISTS idx_problems_difficulty ON problems(difficulty);
CREATE INDEX IF NOT EXISTS idx_problems_category ON problems(category);
CREATE INDEX IF NOT EXISTS idx_problems_is_active ON problems(is_active);
CREATE INDEX IF NOT EXISTS idx_problems_tags ON problems USING GIN(tags);

-- Create trigger for problems updated_at
CREATE TRIGGER update_problems_updated_at 
    BEFORE UPDATE ON problems 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS for problems
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;

-- Create policies for problems (public read access)
CREATE POLICY "Allow public read access on problems" 
    ON problems FOR SELECT 
    USING (is_active = true);

CREATE POLICY "Allow public insert access on problems" 
    ON problems FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow public update access on problems" 
    ON problems FOR UPDATE 
    USING (true);

-- Insert sample problems
INSERT INTO problems (slug, title, description, difficulty, category, tags, examples, constraints, solution_template, test_cases)
VALUES 
-- Two Sum Problem
('two-sum', 'Two Sum', 
'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.',
'easy', 'arrays', 
ARRAY['array', 'hash-table', 'two-pointers'],
'[
  {
    "input": "nums = [2,7,11,15], target = 9",
    "output": "[0,1]",
    "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
  },
  {
    "input": "nums = [3,2,4], target = 6",
    "output": "[1,2]",
    "explanation": "Because nums[1] + nums[2] == 6, we return [1, 2]."
  }
]'::jsonb,
'{
  "constraints": [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists."
  ]
}'::jsonb,
'{
  "javascript": "function twoSum(nums, target) {\n    // Your code here\n}",
  "python": "def two_sum(nums, target):\n    # Your code here\n    pass",
  "java": "public int[] twoSum(int[] nums, int target) {\n    // Your code here\n}",
  "cpp": "vector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n}"
}'::jsonb,
'[
  {
    "input": {"nums": [2,7,11,15], "target": 9},
    "expected": [0,1]
  },
  {
    "input": {"nums": [3,2,4], "target": 6},
    "expected": [1,2]
  },
  {
    "input": {"nums": [3,3], "target": 6},
    "expected": [0,1]
  }
]'::jsonb),

-- Reverse String Problem
('reverse-string', 'Reverse String',
'Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.',
'easy', 'strings',
ARRAY['string', 'two-pointers', 'recursion'],
'[
  {
    "input": "s = [\"h\",\"e\",\"l\",\"l\",\"o\"]",
    "output": "[\"o\",\"l\",\"l\",\"e\",\"h\"]"
  },
  {
    "input": "s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]",
    "output": "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]"
  }
]'::jsonb,
'{
  "constraints": [
    "1 <= s.length <= 10^5",
    "s[i] is a printable ascii character."
  ]
}'::jsonb,
'{
  "javascript": "function reverseString(s) {\n    // Your code here\n}",
  "python": "def reverse_string(s):\n    # Your code here\n    pass",
  "java": "public void reverseString(char[] s) {\n    // Your code here\n}",
  "cpp": "void reverseString(vector<char>& s) {\n    // Your code here\n}"
}'::jsonb,
'[
  {
    "input": {"s": ["h","e","l","l","o"]},
    "expected": ["o","l","l","e","h"]
  },
  {
    "input": {"s": ["H","a","n","n","a","h"]},
    "expected": ["h","a","n","n","a","H"]
  }
]'::jsonb),

-- Binary Search Problem
('binary-search', 'Binary Search',
'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.',
'easy', 'searching',
ARRAY['array', 'binary-search'],
'[
  {
    "input": "nums = [-1,0,3,5,9,12], target = 9",
    "output": "4",
    "explanation": "9 exists in nums and its index is 4"
  },
  {
    "input": "nums = [-1,0,3,5,9,12], target = 2",
    "output": "-1",
    "explanation": "2 does not exist in nums so return -1"
  }
]'::jsonb,
'{
  "constraints": [
    "1 <= nums.length <= 10^4",
    "-10^4 < nums[i], target < 10^4",
    "All the integers in nums are unique.",
    "nums is sorted in ascending order."
  ]
}'::jsonb,
'{
  "javascript": "function search(nums, target) {\n    // Your code here\n}",
  "python": "def search(nums, target):\n    # Your code here\n    pass",
  "java": "public int search(int[] nums, int target) {\n    // Your code here\n}",
  "cpp": "int search(vector<int>& nums, int target) {\n    // Your code here\n}"
}'::jsonb,
'[
  {
    "input": {"nums": [-1,0,3,5,9,12], "target": 9},
    "expected": 4
  },
  {
    "input": {"nums": [-1,0,3,5,9,12], "target": 2},
    "expected": -1
  },
  {
    "input": {"nums": [5], "target": 5},
    "expected": 0
  }
]'::jsonb),

-- Fibonacci Sequence Problem
('fibonacci-sequence', 'Fibonacci Number',
'The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,

F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.

Given n, calculate F(n).',
'easy', 'dynamic-programming',
ARRAY['math', 'dynamic-programming', 'recursion', 'memoization'],
'[
  {
    "input": "n = 2",
    "output": "1",
    "explanation": "F(2) = F(1) + F(0) = 1 + 0 = 1."
  },
  {
    "input": "n = 3",
    "output": "2",
    "explanation": "F(3) = F(2) + F(1) = 1 + 1 = 2."
  },
  {
    "input": "n = 4",
    "output": "3",
    "explanation": "F(4) = F(3) + F(2) = 2 + 1 = 3."
  }
]'::jsonb,
'{
  "constraints": [
    "0 <= n <= 30"
  ]
}'::jsonb,
'{
  "javascript": "function fib(n) {\n    // Your code here\n}",
  "python": "def fib(n):\n    # Your code here\n    pass",
  "java": "public int fib(int n) {\n    // Your code here\n}",
  "cpp": "int fib(int n) {\n    // Your code here\n}"
}'::jsonb,
'[
  {
    "input": {"n": 2},
    "expected": 1
  },
  {
    "input": {"n": 3},
    "expected": 2
  },
  {
    "input": {"n": 4},
    "expected": 3
  },
  {
    "input": {"n": 0},
    "expected": 0
  },
  {
    "input": {"n": 1},
    "expected": 1
  }
]'::jsonb),

-- Merge Sort Problem
('merge-sort', 'Merge Sort Implementation',
'Implement the merge sort algorithm to sort an array of integers in ascending order.

Merge sort is a divide-and-conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.',
'medium', 'sorting',
ARRAY['sorting', 'divide-and-conquer', 'recursion', 'merge-sort'],
'[
  {
    "input": "nums = [38,27,43,3,9,82,10]",
    "output": "[3,9,10,27,38,43,82]"
  },
  {
    "input": "nums = [5,2,4,6,1,3]",
    "output": "[1,2,3,4,5,6]"
  }
]'::jsonb,
'{
  "constraints": [
    "1 <= nums.length <= 1000",
    "-1000 <= nums[i] <= 1000"
  ]
}'::jsonb,
'{
  "javascript": "function mergeSort(nums) {\n    // Your code here\n}",
  "python": "def merge_sort(nums):\n    # Your code here\n    pass",
  "java": "public int[] mergeSort(int[] nums) {\n    // Your code here\n}",
  "cpp": "vector<int> mergeSort(vector<int>& nums) {\n    // Your code here\n}"
}'::jsonb,
'[
  {
    "input": {"nums": [38,27,43,3,9,82,10]},
    "expected": [3,9,10,27,38,43,82]
  },
  {
    "input": {"nums": [5,2,4,6,1,3]},
    "expected": [1,2,3,4,5,6]
  },
  {
    "input": {"nums": [1]},
    "expected": [1]
  }
]'::jsonb)

ON CONFLICT (slug) DO NOTHING; 