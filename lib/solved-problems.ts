export interface SolvedProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  category: string;
  tags: string[];
  leetcodeLink: string;
  timeComplexity: string;
  spaceComplexity: string;
  solutions: {
    [language: string]: {
      code: string;
      explanation: string;
    };
  };
  approach: string;
  keyInsights: string[];
}

export const PROGRAMMING_LANGUAGES = [
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'javascript', name: 'JavaScript', icon: '🟨' },
  { id: 'typescript', name: 'TypeScript', icon: '🔷' },
  { id: 'java', name: 'Java', icon: '☕' },
  { id: 'cpp', name: 'C++', icon: '⚡' },
  { id: 'csharp', name: 'C#', icon: '🔵' },
  { id: 'go', name: 'Go', icon: '🐹' },
  { id: 'ruby', name: 'Ruby', icon: '💎' },
  { id: 'swift', name: 'Swift', icon: '🦉' },
  { id: 'kotlin', name: 'Kotlin', icon: '🟣' }
];

export const SOLVED_PROBLEMS: SolvedProblem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    category: 'Array & Hashing',
    tags: ['Array', 'Hash Table'],
    leetcodeLink: 'https://leetcode.com/problems/two-sum/',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    approach: 'Hash Map',
    keyInsights: [
      'Use a hash map to store seen numbers and their indices',
      'For each number, check if target - number exists in the map',
      'Return indices when complement is found'
    ],
    solutions: {
      python: {
        code: `def twoSum(self, nums: List[int], target: int) -> List[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
        explanation: 'Uses a dictionary to store seen numbers and their indices. Time: O(n), Space: O(n)'
      },
      javascript: {
        code: `var twoSum = function(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
};`,
        explanation: 'Uses a Map to store seen numbers and their indices. Iterates once through the array.'
      },
      typescript: {
        code: `function twoSum(nums: number[], target: number): number[] {
    const seen = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement)!, i];
        }
        seen.set(nums[i], i);
    }
    return [];
}`,
        explanation: 'TypeScript version with proper type annotations for better type safety.'
      },
      java: {
        code: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (seen.containsKey(complement)) {
            return new int[]{seen.get(complement), i};
        }
        seen.put(nums[i], i);
    }
    return new int[]{};
}`,
        explanation: 'Uses HashMap to store seen numbers. Returns array of indices when complement is found.'
      },
      cpp: {
        code: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.find(complement) != seen.end()) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}`,
        explanation: 'Uses unordered_map for O(1) average lookup time. Returns vector of indices.'
      },
      csharp: {
        code: `public int[] TwoSum(int[] nums, int target) {
    Dictionary<int, int> seen = new Dictionary<int, int>();
    for (int i = 0; i < nums.Length; i++) {
        int complement = target - nums[i];
        if (seen.ContainsKey(complement)) {
            return new int[] { seen[complement], i };
        }
        seen[nums[i]] = i;
    }
    return new int[] { };
}`,
        explanation: 'Uses Dictionary for hash map functionality. Follows C# naming conventions.'
      },
      go: {
        code: `func twoSum(nums []int, target int) []int {
    seen := make(map[int]int)
    for i, num := range nums {
        complement := target - num
        if idx, exists := seen[complement]; exists {
            return []int{idx, i}
        }
        seen[num] = i
    }
    return []int{}
}`,
        explanation: 'Uses make() to create a map. Leverages Go\'s multiple return values for map lookup.'
      },
      ruby: {
        code: `def two_sum(nums, target)
    seen = {}
    nums.each_with_index do |num, i|
        complement = target - num
        return [seen[complement], i] if seen.key?(complement)
        seen[num] = i
    end
    []
end`,
        explanation: 'Uses hash for seen numbers. Ruby\'s each_with_index provides clean iteration.'
      },
      swift: {
        code: `func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
    var seen: [Int: Int] = [:]
    for (i, num) in nums.enumerated() {
        let complement = target - num
        if let seenIndex = seen[complement] {
            return [seenIndex, i]
        }
        seen[num] = i
    }
    return []
}`,
        explanation: 'Uses dictionary for seen values. Swift\'s enumerated() provides index and value.'
      },
      kotlin: {
        code: `fun twoSum(nums: IntArray, target: Int): IntArray {
    val seen = mutableMapOf<Int, Int>()
    for ((i, num) in nums.withIndex()) {
        val complement = target - num
        seen[complement]?.let { return intArrayOf(it, i) }
        seen[num] = i
    }
    return intArrayOf()
}`,
        explanation: 'Uses mutableMapOf for hash map. Kotlin\'s safe call operator (?.) handles null checks.'
      }
    }
  },
  {
    id: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
    category: 'Array & Hashing',
    tags: ['Array', 'Dynamic Programming'],
    leetcodeLink: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    approach: 'Single Pass',
    keyInsights: [
      'Keep track of minimum price seen so far',
      'Calculate profit at each step and keep maximum',
      'Only one pass needed through the array'
    ],
    solutions: {
      python: {
        code: `def maxProfit(self, prices: List[int]) -> int:
    min_price = float('inf')
    max_profit = 0
    
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    
    return max_profit`,
        explanation: 'Track minimum price and maximum profit in a single pass. Time: O(n), Space: O(1)'
      },
      javascript: {
        code: `var maxProfit = function(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (let price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    
    return maxProfit;
};`,
        explanation: 'Uses Infinity as initial minimum and tracks both min price and max profit.'
      },
      typescript: {
        code: `function maxProfit(prices: number[]): number {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    
    return maxProfit;
}`,
        explanation: 'TypeScript version with proper type annotations for input and return value.'
      },
      java: {
        code: `public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE;
    int maxProfit = 0;
    
    for (int price : prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    
    return maxProfit;
}`,
        explanation: 'Uses Integer.MAX_VALUE as initial minimum. Enhanced for loop for clean iteration.'
      },
      cpp: {
        code: `int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX;
    int maxProfit = 0;
    
    for (int price : prices) {
        minPrice = min(minPrice, price);
        maxProfit = max(maxProfit, price - minPrice);
    }
    
    return maxProfit;
}`,
        explanation: 'Uses INT_MAX constant and STL min/max functions for clean implementation.'
      },
      csharp: {
        code: `public int MaxProfit(int[] prices) {
    int minPrice = int.MaxValue;
    int maxProfit = 0;
    
    foreach (int price in prices) {
        minPrice = Math.Min(minPrice, price);
        maxProfit = Math.Max(maxProfit, price - minPrice);
    }
    
    return maxProfit;
}`,
        explanation: 'Uses int.MaxValue and foreach loop. Follows C# naming conventions.'
      },
      go: {
        code: `func maxProfit(prices []int) int {
    minPrice := math.MaxInt32
    maxProfit := 0
    
    for _, price := range prices {
        if price < minPrice {
            minPrice = price
        }
        if profit := price - minPrice; profit > maxProfit {
            maxProfit = profit
        }
    }
    
    return maxProfit
}`,
        explanation: 'Uses math.MaxInt32 and Go\'s range for iteration. Inline variable declaration.'
      },
      ruby: {
        code: `def max_profit(prices)
    min_price = Float::INFINITY
    max_profit = 0
    
    prices.each do |price|
        min_price = [min_price, price].min
        max_profit = [max_profit, price - min_price].max
    end
    
    max_profit
end`,
        explanation: 'Uses Float::INFINITY and Ruby\'s array min/max methods for clean code.'
      },
      swift: {
        code: `func maxProfit(_ prices: [Int]) -> Int {
    var minPrice = Int.max
    var maxProfit = 0
    
    for price in prices {
        minPrice = min(minPrice, price)
        maxProfit = max(maxProfit, price - minPrice)
    }
    
    return maxProfit
}`,
        explanation: 'Uses Int.max constant and Swift\'s built-in min/max functions.'
      },
      kotlin: {
        code: `fun maxProfit(prices: IntArray): Int {
    var minPrice = Int.MAX_VALUE
    var maxProfit = 0
    
    for (price in prices) {
        minPrice = minOf(minPrice, price)
        maxProfit = maxOf(maxProfit, price - minPrice)
    }
    
    return maxProfit
}`,
        explanation: 'Uses Int.MAX_VALUE and Kotlin\'s minOf/maxOf functions for clean implementation.'
      }
    }
  },
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    category: 'Array & Hashing',
    tags: ['Array', 'Hash Table', 'Sorting'],
    leetcodeLink: 'https://leetcode.com/problems/contains-duplicate/',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    approach: 'Hash Set',
    keyInsights: [
      'Use a hash set to track seen elements',
      'Return true immediately when duplicate found',
      'More efficient than sorting approach'
    ],
    solutions: {
      python: {
        code: `def containsDuplicate(self, nums: List[int]) -> bool:
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False

# Alternative one-liner
def containsDuplicate(self, nums: List[int]) -> bool:
    return len(nums) != len(set(nums))`,
        explanation: 'Hash set approach or compare lengths of list vs set. Both O(n) time and space.'
      },
      javascript: {
        code: `var containsDuplicate = function(nums) {
    const seen = new Set();
    for (let num of nums) {
        if (seen.has(num)) {
            return true;
        }
        seen.add(num);
    }
    return false;
};

// Alternative
var containsDuplicate = function(nums) {
    return nums.length !== new Set(nums).size;
};`,
        explanation: 'Set-based approach with early return or size comparison method.'
      },
      typescript: {
        code: `function containsDuplicate(nums: number[]): boolean {
    const seen = new Set<number>();
    for (const num of nums) {
        if (seen.has(num)) {
            return true;
        }
        seen.add(num);
    }
    return false;
}`,
        explanation: 'TypeScript with proper type annotations for Set and function signature.'
      },
      java: {
        code: `public boolean containsDuplicate(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    for (int num : nums) {
        if (!seen.add(num)) {
            return true;
        }
    }
    return false;
}`,
        explanation: 'Uses HashSet.add() return value - false indicates element already exists.'
      },
      cpp: {
        code: `bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> seen;
    for (int num : nums) {
        if (seen.find(num) != seen.end()) {
            return true;
        }
        seen.insert(num);
    }
    return false;
}`,
        explanation: 'Uses unordered_set for O(1) average lookup time with iterator-based checking.'
      },
      csharp: {
        code: `public bool ContainsDuplicate(int[] nums) {
    HashSet<int> seen = new HashSet<int>();
    foreach (int num in nums) {
        if (!seen.Add(num)) {
            return true;
        }
    }
    return false;
}`,
        explanation: 'HashSet.Add() returns false if element already exists, enabling clean check.'
      },
      go: {
        code: `func containsDuplicate(nums []int) bool {
    seen := make(map[int]bool)
    for _, num := range nums {
        if seen[num] {
            return true
        }
        seen[num] = true
    }
    return false
}`,
        explanation: 'Uses map with boolean values. Zero value of bool (false) works perfectly here.'
      },
      ruby: {
        code: `def contains_duplicate(nums)
    seen = Set.new
    nums.each do |num|
        return true unless seen.add?(num)
    end
    false
end`,
        explanation: 'Set.add? returns nil if element already exists, enabling clean conditional.'
      },
      swift: {
        code: `func containsDuplicate(_ nums: [Int]) -> Bool {
    var seen = Set<Int>()
    for num in nums {
        if seen.contains(num) {
            return true
        }
        seen.insert(num)
    }
    return false
}`,
        explanation: 'Uses Set with explicit contains check before insertion for clarity.'
      },
      kotlin: {
        code: `fun containsDuplicate(nums: IntArray): Boolean {
    val seen = mutableSetOf<Int>()
    for (num in nums) {
        if (!seen.add(num)) {
            return true
        }
    }
    return false
}`,
        explanation: 'MutableSet.add() returns false if element already exists, similar to Java.'
      }
    }
  },
  {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    category: 'Array & Hashing',
    tags: ['Hash Table', 'String', 'Sorting'],
    leetcodeLink: 'https://leetcode.com/problems/valid-anagram/',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    approach: 'Character Count',
    keyInsights: [
      'Count frequency of each character in both strings',
      'Compare character counts for equality',
      'Early return false if string lengths differ'
    ],
    solutions: {
      python: {
        code: `def isAnagram(self, s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    
    count = {}
    for char in s:
        count[char] = count.get(char, 0) + 1
    
    for char in t:
        if char not in count:
            return False
        count[char] -= 1
        if count[char] == 0:
            del count[char]
    
    return len(count) == 0

# Alternative using Counter
from collections import Counter
def isAnagram(self, s: str, t: str) -> bool:
    return Counter(s) == Counter(t)`,
        explanation: 'Count character frequencies using dictionary or Counter. Time: O(n), Space: O(1) for alphabet size.'
      },
      javascript: {
        code: `var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;
    
    const count = {};
    for (let char of s) {
        count[char] = (count[char] || 0) + 1;
    }
    
    for (let char of t) {
        if (!count[char]) return false;
        count[char]--;
    }
    
    return true;
};

// Alternative: sorting approach  
var isAnagram = function(s, t) {
    return s.split('').sort().join('') === t.split('').sort().join('');
};`,
        explanation: 'Character counting approach or sorting both strings and comparing.'
      },
      java: {
        code: `public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    
    int[] count = new int[26]; // for lowercase letters
    
    for (int i = 0; i < s.length(); i++) {
        count[s.charAt(i) - 'a']++;
        count[t.charAt(i) - 'a']--;
    }
    
    for (int c : count) {
        if (c != 0) return false;
    }
    
    return true;
}`,
        explanation: 'Uses array of size 26 for lowercase letters. Increment for s, decrement for t.'
      },
      cpp: {
        code: `bool isAnagram(string s, string t) {
    if (s.length() != t.length()) return false;
    
    vector<int> count(26, 0);
    
    for (int i = 0; i < s.length(); i++) {
        count[s[i] - 'a']++;
        count[t[i] - 'a']--;
    }
    
    return all_of(count.begin(), count.end(), [](int c) { return c == 0; });
}`,
        explanation: 'Uses vector of size 26 and all_of algorithm to check if all counts are zero.'
      }
    }
  },
  {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    description: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.',
    category: 'Array & Hashing',
    tags: ['Array', 'Hash Table', 'String', 'Sorting'],
    leetcodeLink: 'https://leetcode.com/problems/group-anagrams/',
    timeComplexity: 'O(n * k log k)',
    spaceComplexity: 'O(n * k)',
    approach: 'Hash Map with Sorted Keys',
    keyInsights: [
      'Anagrams have the same characters when sorted',
      'Use sorted string as key in hash map',
      'Group words with same sorted key together'
    ],
    solutions: {
      python: {
        code: `def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
    groups = {}
    for s in strs:
        key = ''.join(sorted(s))
        if key not in groups:
            groups[key] = []
        groups[key].append(s)
    return list(groups.values())

# Alternative using defaultdict
from collections import defaultdict
def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
    groups = defaultdict(list)
    for s in strs:
        groups[''.join(sorted(s))].append(s)
    return list(groups.values())`,
        explanation: 'Sort each string to create key, group by key using dictionary.'
      },
      javascript: {
        code: `var groupAnagrams = function(strs) {
    const groups = {};
    
    for (let str of strs) {
        const key = str.split('').sort().join('');
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(str);
    }
    
    return Object.values(groups);
};`,
        explanation: 'Create sorted key for each string and group by key using object.'
      },
      java: {
        code: `public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> groups = new HashMap<>();
    
    for (String str : strs) {
        char[] chars = str.toCharArray();
        Arrays.sort(chars);
        String key = new String(chars);
        
        groups.computeIfAbsent(key, k -> new ArrayList<>()).add(str);
    }
    
    return new ArrayList<>(groups.values());
}`,
        explanation: 'Sort character array to create key, use computeIfAbsent for clean grouping.'
      }
    }
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    category: 'Stack',
    tags: ['String', 'Stack'],
    leetcodeLink: 'https://leetcode.com/problems/valid-parentheses/',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    approach: 'Stack',
    keyInsights: [
      'Use stack to track opening brackets',
      'Match each closing bracket with most recent opening',
      'Stack should be empty at the end for valid string'
    ],
    solutions: {
      python: {
        code: `def isValid(self, s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    
    return not stack`,
        explanation: 'Use stack and mapping dictionary to match brackets. Clean and efficient.'
      },
      javascript: {
        code: `var isValid = function(s) {
    const stack = [];
    const mapping = {')': '(', '}': '{', ']': '['};
    
    for (let char of s) {
        if (char in mapping) {
            if (stack.length === 0 || stack.pop() !== mapping[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
};`,
        explanation: 'Stack-based approach with mapping object for bracket pairs.'
      },
      java: {
        code: `public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    Map<Character, Character> mapping = Map.of(
        ')', '(',
        '}', '{',
        ']', '['
    );
    
    for (char c : s.toCharArray()) {
        if (mapping.containsKey(c)) {
            if (stack.isEmpty() || stack.pop() != mapping.get(c)) {
                return false;
            }
        } else {
            stack.push(c);
        }
    }
    
    return stack.isEmpty();
}`,
                 explanation: 'Uses Stack class and Map.of for clean bracket matching logic.'
       }
     }
   },
   {
     id: 'maximum-subarray',
     title: 'Maximum Subarray',
     difficulty: 'Medium',
     description: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
     category: 'Dynamic Programming',
     tags: ['Array', 'Dynamic Programming', 'Divide and Conquer'],
     leetcodeLink: 'https://leetcode.com/problems/maximum-subarray/',
     timeComplexity: 'O(n)',
     spaceComplexity: 'O(1)',
     approach: 'Kadane\'s Algorithm',
     keyInsights: [
       'At each position, decide whether to extend existing subarray or start new one',
       'Keep track of maximum sum seen so far',
       'Reset current sum to 0 when it becomes negative'
     ],
     solutions: {
       python: {
         code: `def maxSubArray(self, nums: List[int]) -> int:
    max_sum = nums[0]
    current_sum = nums[0]
    
    for i in range(1, len(nums)):
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)
    
    return max_sum`,
         explanation: 'Kadane\'s algorithm - at each step, choose between starting new subarray or extending current one.'
       },
       javascript: {
         code: `var maxSubArray = function(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
};`,
         explanation: 'Dynamic programming approach that maintains running maximum subarray sum.'
       },
       java: {
         code: `public int maxSubArray(int[] nums) {
    int maxSum = nums[0];
    int currentSum = nums[0];
    
    for (int i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}`,
         explanation: 'Classic Kadane\'s algorithm implementation with optimal time and space complexity.'
       }
     }
   },
   {
     id: 'merge-two-sorted-lists',
     title: 'Merge Two Sorted Lists',
     difficulty: 'Easy',
     description: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.',
     category: 'Linked List',
     tags: ['Linked List', 'Recursion'],
     leetcodeLink: 'https://leetcode.com/problems/merge-two-sorted-lists/',
     timeComplexity: 'O(n + m)',
     spaceComplexity: 'O(1)',
     approach: 'Two Pointers',
     keyInsights: [
       'Use dummy node to simplify edge cases',
       'Compare values and advance appropriate pointer',
       'Handle remaining nodes after one list is exhausted'
     ],
     solutions: {
       python: {
         code: `def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    dummy = ListNode(0)
    current = dummy
    
    while list1 and list2:
        if list1.val <= list2.val:
            current.next = list1
            list1 = list1.next
        else:
            current.next = list2
            list2 = list2.next
        current = current.next
    
    current.next = list1 or list2
    return dummy.next`,
         explanation: 'Iterative approach using dummy node to handle edge cases cleanly.'
       },
       javascript: {
         code: `var mergeTwoLists = function(list1, list2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    current.next = list1 || list2;
    return dummy.next;
};`,
         explanation: 'Two-pointer technique with dummy head for simplified list construction.'
       }
     }
   },
   {
     id: 'climbing-stairs',
     title: 'Climbing Stairs',
     difficulty: 'Easy',
     description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
     category: 'Dynamic Programming',
     tags: ['Math', 'Dynamic Programming', 'Memoization'],
     leetcodeLink: 'https://leetcode.com/problems/climbing-stairs/',
     timeComplexity: 'O(n)',
     spaceComplexity: 'O(1)',
     approach: 'Fibonacci Pattern',
     keyInsights: [
       'Number of ways to reach step n = ways to reach (n-1) + ways to reach (n-2)',
       'This follows Fibonacci sequence pattern',
       'Can optimize space by storing only last two values'
     ],
     solutions: {
       python: {
         code: `def climbStairs(self, n: int) -> int:
    if n <= 2:
        return n
    
    prev2, prev1 = 1, 2
    for i in range(3, n + 1):
        current = prev1 + prev2
        prev2, prev1 = prev1, current
    
    return prev1`,
         explanation: 'Fibonacci-like DP with space optimization. Only store last two values.'
       },
       javascript: {
         code: `var climbStairs = function(n) {
    if (n <= 2) return n;
    
    let prev2 = 1, prev1 = 2;
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
};`,
         explanation: 'Space-optimized DP solution following Fibonacci pattern.'
       }
     }
   },
   {
     id: 'reverse-linked-list',
     title: 'Reverse Linked List',
     difficulty: 'Easy',
     description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
     category: 'Linked List',
     tags: ['Linked List', 'Recursion'],
     leetcodeLink: 'https://leetcode.com/problems/reverse-linked-list/',
     timeComplexity: 'O(n)',
     spaceComplexity: 'O(1)',
     approach: 'Three Pointers',
     keyInsights: [
       'Need to track previous, current, and next nodes',
       'Reverse the link direction at each step',
       'Handle null pointers carefully'
     ],
     solutions: {
       python: {
         code: `def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
    prev = None
    current = head
    
    while current:
        next_temp = current.next
        current.next = prev
        prev = current
        current = next_temp
    
    return prev`,
         explanation: 'Iterative three-pointer approach to reverse links one by one.'
       },
       javascript: {
         code: `var reverseList = function(head) {
    let prev = null;
    let current = head;
    
    while (current) {
        const nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }
    
    return prev;
};`,
         explanation: 'Classic iterative reversal using three pointers.'
       }
     }
   },
   {
     id: 'valid-palindrome',
     title: 'Valid Palindrome',
     difficulty: 'Easy',
     description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
     category: 'Two Pointers',
     tags: ['Two Pointers', 'String'],
     leetcodeLink: 'https://leetcode.com/problems/valid-palindrome/',
     timeComplexity: 'O(n)',
     spaceComplexity: 'O(1)',
     approach: 'Two Pointers',
     keyInsights: [
       'Use two pointers from start and end',
       'Skip non-alphanumeric characters',
       'Compare characters in case-insensitive manner'
     ],
     solutions: {
       python: {
         code: `def isPalindrome(self, s: str) -> bool:
    left, right = 0, len(s) - 1
    
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        
        if s[left].lower() != s[right].lower():
            return False
        
        left += 1
        right -= 1
    
    return True`,
         explanation: 'Two pointers approach with character validation and case normalization.'
       },
       javascript: {
         code: `var isPalindrome = function(s) {
    let left = 0, right = s.length - 1;
    
    while (left < right) {
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
};

function isAlphanumeric(char) {
    return /^[a-zA-Z0-9]$/.test(char);
}`,
         explanation: 'Two pointers with helper function for alphanumeric character checking.'
       }
     }
   },
   {
     id: 'product-of-array-except-self',
     title: 'Product of Array Except Self',
     difficulty: 'Medium',
     description: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].',
     category: 'Array & Hashing',
     tags: ['Array', 'Prefix Sum'],
     leetcodeLink: 'https://leetcode.com/problems/product-of-array-except-self/',
     timeComplexity: 'O(n)',
     spaceComplexity: 'O(1)',
     approach: 'Prefix and Suffix Products',
     keyInsights: [
       'Product except self = left products × right products',
       'First pass: calculate left products',
       'Second pass: calculate right products on the fly'
     ],
     solutions: {
       python: {
         code: `def productExceptSelf(self, nums: List[int]) -> List[int]:
    n = len(nums)
    result = [1] * n
    
    # Left pass
    for i in range(1, n):
        result[i] = result[i-1] * nums[i-1]
    
    # Right pass
    right_product = 1
    for i in range(n-1, -1, -1):
        result[i] *= right_product
        right_product *= nums[i]
    
    return result`,
         explanation: 'Two-pass approach: store left products in result, then multiply by right products.'
       },
       javascript: {
         code: `var productExceptSelf = function(nums) {
    const n = nums.length;
    const result = new Array(n).fill(1);
    
    // Left pass
    for (let i = 1; i < n; i++) {
        result[i] = result[i-1] * nums[i-1];
    }
    
    // Right pass
    let rightProduct = 1;
    for (let i = n-1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    
    return result;
};`,
         explanation: 'Space-optimized solution using result array to store intermediate products.'
       }
     }
   },
   {
     id: 'maximum-depth-binary-tree',
     title: 'Maximum Depth of Binary Tree',
     difficulty: 'Easy',
     description: 'Given the root of a binary tree, return its maximum depth.',
     category: 'Binary Tree',
     tags: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
     leetcodeLink: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
     timeComplexity: 'O(n)',
     spaceComplexity: 'O(h)',
     approach: 'Recursive DFS',
     keyInsights: [
       'Depth = 1 + max(left subtree depth, right subtree depth)',
       'Base case: null node has depth 0',
       'Can use DFS recursively or BFS iteratively'
     ],
     solutions: {
       python: {
         code: `def maxDepth(self, root: Optional[TreeNode]) -> int:
    if not root:
        return 0
    
    left_depth = self.maxDepth(root.left)
    right_depth = self.maxDepth(root.right)
    
    return 1 + max(left_depth, right_depth)

# Alternative BFS approach
from collections import deque
def maxDepth(self, root: Optional[TreeNode]) -> int:
    if not root:
        return 0
    
    queue = deque([(root, 1)])
    max_depth = 0
    
    while queue:
        node, depth = queue.popleft()
        max_depth = max(max_depth, depth)
        
        if node.left:
            queue.append((node.left, depth + 1))
        if node.right:
            queue.append((node.right, depth + 1))
    
    return max_depth`,
         explanation: 'Recursive DFS solution or iterative BFS with queue for level tracking.'
       },
       javascript: {
         code: `var maxDepth = function(root) {
    if (!root) return 0;
    
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    return 1 + Math.max(leftDepth, rightDepth);
};`,
         explanation: 'Clean recursive solution that builds depth from bottom up.'
       }
     }
   },
   {
     id: 'merge-intervals',
     title: 'Merge Intervals',
     difficulty: 'Medium',
     description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.',
     category: 'Intervals',
     tags: ['Array', 'Sorting'],
     leetcodeLink: 'https://leetcode.com/problems/merge-intervals/',
     timeComplexity: 'O(n log n)',
     spaceComplexity: 'O(1)',
     approach: 'Sort and Merge',
     keyInsights: [
       'Sort intervals by start time',
       'Merge overlapping intervals as you iterate',
       'Two intervals overlap if start of second ≤ end of first'
     ],
     solutions: {
       python: {
         code: `def merge(self, intervals: List[List[int]]) -> List[List[int]]:
    if not intervals:
        return []
    
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    
    for current in intervals[1:]:
        last = merged[-1]
        if current[0] <= last[1]:
            # Overlapping intervals, merge them
            last[1] = max(last[1], current[1])
        else:
            # Non-overlapping interval
            merged.append(current)
    
    return merged`,
         explanation: 'Sort by start time, then merge overlapping intervals by updating end time.'
       },
       javascript: {
         code: `var merge = function(intervals) {
    if (intervals.length === 0) return [];
    
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const last = merged[merged.length - 1];
        
        if (current[0] <= last[1]) {
            last[1] = Math.max(last[1], current[1]);
        } else {
            merged.push(current);
        }
    }
    
    return merged;
};`,
         explanation: 'Sort intervals then iterate to merge overlapping ones.'
       }
     }
   },
   {
     id: 'binary-tree-inorder-traversal',
     title: 'Binary Tree Inorder Traversal',
     difficulty: 'Easy',
     description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values.',
     category: 'Binary Tree',
     tags: ['Stack', 'Tree', 'Depth-First Search', 'Binary Tree'],
     leetcodeLink: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
     timeComplexity: 'O(n)',
     spaceComplexity: 'O(h)',
     approach: 'Recursive or Iterative',
     keyInsights: [
       'Inorder: Left → Root → Right',
       'Recursive solution is straightforward',
       'Iterative solution uses stack to simulate recursion'
     ],
     solutions: {
       python: {
         code: `def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
    result = []
    
    def inorder(node):
        if node:
            inorder(node.left)
            result.append(node.val)
            inorder(node.right)
    
    inorder(root)
    return result

# Iterative approach
def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
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
    
    return result`,
         explanation: 'Recursive helper function or iterative stack-based traversal.'
       },
       javascript: {
         code: `var inorderTraversal = function(root) {
    const result = [];
    
    function inorder(node) {
        if (node) {
            inorder(node.left);
            result.push(node.val);
            inorder(node.right);
        }
    }
    
    inorder(root);
    return result;
};`,
         explanation: 'Classic recursive inorder traversal with helper function.'
       }
     }
   },
   {
     id: 'longest-palindromic-substring',
     title: 'Longest Palindromic Substring',
     difficulty: 'Medium',
     description: 'Given a string s, return the longest palindromic substring in s.',
     category: 'Dynamic Programming',
     tags: ['String', 'Dynamic Programming'],
     leetcodeLink: 'https://leetcode.com/problems/longest-palindromic-substring/',
     timeComplexity: 'O(n²)',
     spaceComplexity: 'O(1)',
     approach: 'Expand Around Centers',
     keyInsights: [
       'Palindrome can have odd or even length',
       'For each position, try expanding around center',
       'Keep track of longest palindrome found so far'
     ],
     solutions: {
       python: {
         code: `def longestPalindrome(self, s: str) -> str:
    if not s:
        return ""
    
    start = 0
    max_len = 1
    
    def expand_around_center(left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return right - left - 1
    
    for i in range(len(s)):
        # Odd length palindromes (center at i)
        len1 = expand_around_center(i, i)
        # Even length palindromes (center between i and i+1)
        len2 = expand_around_center(i, i + 1)
        
        current_max = max(len1, len2)
        if current_max > max_len:
            max_len = current_max
            start = i - (current_max - 1) // 2
    
    return s[start:start + max_len]`,
         explanation: 'Expand around each possible center (odd/even length) to find longest palindrome.'
       },
       javascript: {
         code: `var longestPalindrome = function(s) {
    if (!s) return "";
    
    let start = 0, maxLen = 1;
    
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }
    
    for (let i = 0; i < s.length; i++) {
        const len1 = expandAroundCenter(i, i);
        const len2 = expandAroundCenter(i, i + 1);
        const currentMax = Math.max(len1, len2);
        
        if (currentMax > maxLen) {
            maxLen = currentMax;
            start = i - Math.floor((currentMax - 1) / 2);
        }
    }
    
    return s.substring(start, start + maxLen);
};`,
         explanation: 'Expand around centers approach covering both odd and even length palindromes.'
       }
     }
   },
   {
     id: '3sum',
     title: '3Sum',
     difficulty: 'Medium',
     description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
     category: 'Two Pointers',
     tags: ['Array', 'Two Pointers', 'Sorting'],
     leetcodeLink: 'https://leetcode.com/problems/3sum/',
     timeComplexity: 'O(n²)',
     spaceComplexity: 'O(1)',
     approach: 'Sort and Two Pointers',
     keyInsights: [
       'Sort array first to enable two-pointer technique',
       'Fix first element, use two pointers for remaining sum',
       'Skip duplicates to avoid duplicate triplets'
     ],
     solutions: {
       python: {
         code: `def threeSum(self, nums: List[int]) -> List[List[int]]:
    nums.sort()
    result = []
    
    for i in range(len(nums) - 2):
        # Skip duplicates for first element
        if i > 0 and nums[i] == nums[i-1]:
            continue
        
        left, right = i + 1, len(nums) - 1
        
        while left < right:
            current_sum = nums[i] + nums[left] + nums[right]
            
            if current_sum == 0:
                result.append([nums[i], nums[left], nums[right]])
                
                # Skip duplicates
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                
                left += 1
                right -= 1
            elif current_sum < 0:
                left += 1
            else:
                right -= 1
    
    return result`,
         explanation: 'Sort array, fix first element, use two pointers to find target sum while avoiding duplicates.'
       },
       javascript: {
         code: `var threeSum = function(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i-1]) continue;
        
        let left = i + 1, right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
};`,
         explanation: 'Classic 3Sum solution using sorting and two pointers with duplicate handling.'
       }
     }
   },
   {
     id: 'longest-substring-without-repeating-characters',
     title: 'Longest Substring Without Repeating Characters',
     difficulty: 'Medium',
     description: 'Given a string s, find the length of the longest substring without repeating characters.',
     category: 'Sliding Window',
     tags: ['Hash Table', 'String', 'Sliding Window'],
     leetcodeLink: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
     timeComplexity: 'O(n)',
     spaceComplexity: 'O(min(m,n))',
     approach: 'Sliding Window',
     keyInsights: [
       'Use sliding window with two pointers',
       'Track characters in current window using set/map',
       'Expand window when no duplicates, shrink when duplicate found'
     ],
     solutions: {
       python: {
         code: `def lengthOfLongestSubstring(self, s: str) -> int:
    char_set = set()
    left = 0
    max_length = 0
    
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)
    
    return max_length

# Alternative with character index tracking
def lengthOfLongestSubstring(self, s: str) -> int:
    char_index = {}
    left = 0
    max_length = 0
    
    for right in range(len(s)):
        if s[right] in char_index and char_index[s[right]] >= left:
            left = char_index[s[right]] + 1
        
        char_index[s[right]] = right
        max_length = max(max_length, right - left + 1)
    
    return max_length`,
         explanation: 'Sliding window with set for character tracking or map for index optimization.'
       },
       javascript: {
         code: `var lengthOfLongestSubstring = function(s) {
    const charSet = new Set();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
};`,
         explanation: 'Sliding window technique with Set to track unique characters in current window.'
       }
     }
   },
   {
     id: 'container-with-most-water',
     title: 'Container With Most Water',
     difficulty: 'Medium',
     description: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container that can hold the most water.',
     category: 'Two Pointers',
     tags: ['Array', 'Two Pointers', 'Greedy'],
     leetcodeLink: 'https://leetcode.com/problems/container-with-most-water/',
     timeComplexity: 'O(n)',
     spaceComplexity: 'O(1)',
     approach: 'Two Pointers',
     keyInsights: [
       'Water amount = min(height[left], height[right]) × (right - left)',
       'Move pointer with smaller height to potentially find larger area',
       'Greedy approach: always move the shorter line'
     ],
     solutions: {
       python: {
         code: `def maxArea(self, height: List[int]) -> int:
    left, right = 0, len(height) - 1
    max_area = 0
    
    while left < right:
        width = right - left
        current_area = min(height[left], height[right]) * width
        max_area = max(max_area, current_area)
        
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_area`,
         explanation: 'Two pointers approach - move the pointer with smaller height to maximize potential area.'
       },
       javascript: {
         code: `var maxArea = function(height) {
    let left = 0, right = height.length - 1;
    let maxArea = 0;
    
    while (left < right) {
        const width = right - left;
        const currentArea = Math.min(height[left], height[right]) * width;
        maxArea = Math.max(maxArea, currentArea);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxArea;
};`,
         explanation: 'Greedy two-pointer approach to find maximum water container area.'
       }
     }
   },
   {
     id: 'search-in-rotated-sorted-array',
     title: 'Search in Rotated Sorted Array',
     difficulty: 'Medium',
     description: 'There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index. Given the array after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.',
     category: 'Binary Search',
     tags: ['Array', 'Binary Search'],
     leetcodeLink: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
     timeComplexity: 'O(log n)',
     spaceComplexity: 'O(1)',
     approach: 'Modified Binary Search',
     keyInsights: [
       'One half of array is always sorted',
       'Determine which half is sorted, then check if target is in that half',
       'Apply binary search logic based on sorted half'
     ],
     solutions: {
       python: {
         code: `def search(self, nums: List[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if nums[mid] == target:
            return mid
        
        # Left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Right half is sorted
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1`,
         explanation: 'Modified binary search - identify sorted half and check if target lies within it.'
       },
       javascript: {
         code: `var search = function(nums, target) {
    let left = 0, right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) return mid;
        
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
};`,
         explanation: 'Binary search adaptation for rotated array by checking which half is sorted.'
       }
     }
   },
   {
     id: 'same-tree',
     title: 'Same Tree',
     difficulty: 'Easy',
     description: 'Given the roots of two binary trees p and q, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.',
     category: 'Binary Tree',
     tags: ['Tree', 'Depth-First Search', 'Binary Tree'],
     leetcodeLink: 'https://leetcode.com/problems/same-tree/',
     timeComplexity: 'O(n)',
     spaceComplexity: 'O(h)',
     approach: 'Recursive DFS',
     keyInsights: [
       'Compare trees recursively',
       'Base cases: both null (true), one null (false), values different (false)',
       'Recursively check left and right subtrees'
     ],
     solutions: {
       python: {
         code: `def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
    # Base cases
    if not p and not q:
        return True
    if not p or not q:
        return False
    if p.val != q.val:
        return False
    
    # Recursively check left and right subtrees
    return (self.isSameTree(p.left, q.left) and 
            self.isSameTree(p.right, q.right))`,
         explanation: 'Recursive comparison of tree structure and node values.'
       },
       javascript: {
         code: `var isSameTree = function(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    if (p.val !== q.val) return false;
    
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};`,
         explanation: 'Simple recursive solution comparing nodes and subtrees simultaneously.'
       }
     }
   },
   {
     id: 'symmetric-tree',
     title: 'Symmetric Tree',
     difficulty: 'Easy',
     description: 'Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).',
     category: 'Binary Tree',
     tags: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
     leetcodeLink: 'https://leetcode.com/problems/symmetric-tree/',
     timeComplexity: 'O(n)',
     spaceComplexity: 'O(h)',
     approach: 'Recursive Helper',
     keyInsights: [
       'Check if left subtree is mirror of right subtree',
       'For symmetry: left.left == right.right and left.right == right.left',
       'Use helper function to compare two nodes'
     ],
     solutions: {
       python: {
         code: `def isSymmetric(self, root: Optional[TreeNode]) -> bool:
    def is_mirror(left, right):
        if not left and not right:
            return True
        if not left or not right:
            return False
        
        return (left.val == right.val and
                is_mirror(left.left, right.right) and
                is_mirror(left.right, right.left))
    
    return is_mirror(root.left, root.right) if root else True`,
         explanation: 'Helper function to check if two subtrees are mirrors of each other.'
       },
       javascript: {
         code: `var isSymmetric = function(root) {
    function isMirror(left, right) {
        if (!left && !right) return true;
        if (!left || !right) return false;
        
        return left.val === right.val &&
               isMirror(left.left, right.right) &&
               isMirror(left.right, right.left);
    }
    
    return root ? isMirror(root.left, root.right) : true;
};`,
         explanation: 'Recursive helper to check mirror property between left and right subtrees.'
       }
     }
   },
   {
     id: 'number-of-islands',
     title: 'Number of Islands',
     difficulty: 'Medium',
     description: 'Given an m x n 2D binary grid grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands.',
     category: 'Graph',
     tags: ['Array', 'Depth-First Search', 'Breadth-First Search', 'Union Find', 'Matrix'],
     leetcodeLink: 'https://leetcode.com/problems/number-of-islands/',
     timeComplexity: 'O(m × n)',
     spaceComplexity: 'O(m × n)',
     approach: 'DFS/BFS',
     keyInsights: [
       'Iterate through grid, start DFS/BFS when land found',
       'Mark visited cells to avoid counting same island twice',
       'Each DFS/BFS traversal represents one complete island'
     ],
     solutions: {
       python: {
         code: `def numIslands(self, grid: List[List[str]]) -> int:
    if not grid:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    islands = 0
    
    def dfs(r, c):
        if (r < 0 or r >= rows or c < 0 or c >= cols or 
            grid[r][c] != '1'):
            return
        
        grid[r][c] = '0'  # Mark as visited
        
        # Explore all 4 directions
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                islands += 1
                dfs(r, c)
    
    return islands`,
         explanation: 'DFS to explore each island completely and mark visited cells as water.'
       },
       javascript: {
         code: `var numIslands = function(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let islands = 0;
    
    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') {
            return;
        }
        
        grid[r][c] = '0';
        
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                islands++;
                dfs(r, c);
            }
        }
    }
    
    return islands;
};`,
         explanation: 'Grid traversal with DFS to count connected components (islands).'
       }
     }
   },
   {
     id: 'course-schedule',
     title: 'Course Schedule',
     difficulty: 'Medium',
     description: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses. Otherwise, return false.',
     category: 'Graph',
     tags: ['Depth-First Search', 'Breadth-First Search', 'Graph', 'Topological Sort'],
     leetcodeLink: 'https://leetcode.com/problems/course-schedule/',
     timeComplexity: 'O(V + E)',
     spaceComplexity: 'O(V + E)',
     approach: 'Cycle Detection',
     keyInsights: [
       'Model as directed graph with courses as nodes',
       'Detect cycle in graph - if cycle exists, impossible to complete',
       'Use DFS with three states: unvisited, visiting, visited'
     ],
     solutions: {
       python: {
         code: `def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
    # Build adjacency list
    graph = {i: [] for i in range(numCourses)}
    for course, prereq in prerequisites:
        graph[course].append(prereq)
    
    # 0: unvisited, 1: visiting, 2: visited
    state = [0] * numCourses
    
    def has_cycle(course):
        if state[course] == 1:  # Currently visiting - cycle detected
            return True
        if state[course] == 2:  # Already visited
            return False
        
        state[course] = 1  # Mark as visiting
        
        for prereq in graph[course]:
            if has_cycle(prereq):
                return True
        
        state[course] = 2  # Mark as visited
        return False
    
    for course in range(numCourses):
        if has_cycle(course):
            return False
    
    return True`,
         explanation: 'DFS-based cycle detection using three-state tracking for topological sort validation.'
       },
       javascript: {
         code: `var canFinish = function(numCourses, prerequisites) {
    const graph = Array.from({length: numCourses}, () => []);
    for (const [course, prereq] of prerequisites) {
        graph[course].push(prereq);
    }
    
    const state = new Array(numCourses).fill(0);
    
    function hasCycle(course) {
        if (state[course] === 1) return true;
        if (state[course] === 2) return false;
        
        state[course] = 1;
        
        for (const prereq of graph[course]) {
            if (hasCycle(prereq)) return true;
        }
        
        state[course] = 2;
        return false;
    }
    
    for (let i = 0; i < numCourses; i++) {
        if (hasCycle(i)) return false;
    }
    
    return true;
};`,
         explanation: 'Graph cycle detection to determine if topological ordering is possible.'
       }
     }
   },
   {
     id: 'house-robber',
     title: 'House Robber',
     difficulty: 'Medium',
     description: 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.',
     category: 'Dynamic Programming',
     tags: ['Array', 'Dynamic Programming'],
     leetcodeLink: 'https://leetcode.com/problems/house-robber/',
     timeComplexity: 'O(n)',
     spaceComplexity: 'O(1)',
     approach: 'Dynamic Programming',
     keyInsights: [
       'At each house, choose between robbing current house or not',
       'If rob current: add to max money from house before previous',
       'If skip current: take max money up to previous house'
     ],
     solutions: {
       python: {
         code: `def rob(self, nums: List[int]) -> int:
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    
    prev2 = nums[0]  # Max money up to house i-2
    prev1 = max(nums[0], nums[1])  # Max money up to house i-1
    
    for i in range(2, len(nums)):
        current = max(prev1, prev2 + nums[i])
        prev2 = prev1
        prev1 = current
    
    return prev1

# Alternative with clear DP logic
def rob(self, nums: List[int]) -> int:
    prev_rob = prev_not_rob = 0
    
    for money in nums:
        current_rob = prev_not_rob + money
        current_not_rob = max(prev_rob, prev_not_rob)
        prev_rob, prev_not_rob = current_rob, current_not_rob
    
    return max(prev_rob, prev_not_rob)`,
         explanation: 'Space-optimized DP tracking max money with/without robbing previous house.'
       },
       javascript: {
         code: `var rob = function(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    let prev2 = nums[0];
    let prev1 = Math.max(nums[0], nums[1]);
    
    for (let i = 2; i < nums.length; i++) {
        const current = Math.max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
};`,
         explanation: 'Bottom-up DP with space optimization using only two variables.'
       }
     }
   },
   {
     id: 'coin-change',
     title: 'Coin Change',
     difficulty: 'Medium',
     description: 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.',
     category: 'Dynamic Programming',
     tags: ['Array', 'Dynamic Programming', 'Breadth-First Search'],
     leetcodeLink: 'https://leetcode.com/problems/coin-change/',
     timeComplexity: 'O(amount × coins)',
     spaceComplexity: 'O(amount)',
     approach: 'Dynamic Programming',
     keyInsights: [
       'Build up solution from smaller amounts',
       'For each amount, try all coins and take minimum',
       'Use DP array where dp[i] = min coins needed for amount i'
     ],
     solutions: {
       python: {
         code: `def coinChange(self, coins: List[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for coin in coins:
        for curr_amount in range(coin, amount + 1):
            dp[curr_amount] = min(dp[curr_amount], 
                                dp[curr_amount - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1

# Alternative bottom-up approach
def coinChange(self, coins: List[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for curr_amount in range(1, amount + 1):
        for coin in coins:
            if coin <= curr_amount:
                dp[curr_amount] = min(dp[curr_amount], 
                                    dp[curr_amount - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1`,
         explanation: 'Bottom-up DP building minimum coins needed for each amount from 0 to target.'
       },
       javascript: {
         code: `var coinChange = function(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (const coin of coins) {
        for (let currAmount = coin; currAmount <= amount; currAmount++) {
            dp[currAmount] = Math.min(dp[currAmount], dp[currAmount - coin] + 1);
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
};`,
         explanation: 'Classic DP solution for minimum coin change problem with optimal substructure.'
       }
     }
   },
   {
     id: 'trapping-rain-water',
     title: 'Trapping Rain Water',
     difficulty: 'Hard',
     description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
     category: 'Two Pointers',
     tags: ['Array', 'Two Pointers', 'Dynamic Programming', 'Stack', 'Monotonic Stack'],
     leetcodeLink: 'https://leetcode.com/problems/trapping-rain-water/',
     timeComplexity: 'O(n)',
     spaceComplexity: 'O(1)',
     approach: 'Two Pointers',
     keyInsights: [
       'Water level at any position is min(max_left, max_right) - height[i]',
       'Use two pointers moving towards each other',
       'Track maximum heights seen from both sides'
     ],
     solutions: {
       python: {
         code: `def trap(self, height: List[int]) -> int:
    if not height:
        return 0
    
    left, right = 0, len(height) - 1
    left_max = right_max = 0
    water = 0
    
    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                water += right_max - height[right]
            right -= 1
    
    return water`,
         explanation: 'Two pointers approach with O(1) space - move pointer with smaller height and track water trapped.'
       },
       javascript: {
         code: `var trap = function(height) {
    if (height.length === 0) return 0;
    
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    
    return water;
};`,
         explanation: 'Optimal two-pointer solution that processes array in single pass with constant space.'
       }
     }
   },
   {
     id: 'median-of-two-sorted-arrays',
     title: 'Median of Two Sorted Arrays',
     difficulty: 'Hard',
     description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
     category: 'Binary Search',
     tags: ['Array', 'Binary Search', 'Divide and Conquer'],
     leetcodeLink: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
     timeComplexity: 'O(log(min(m,n)))',
     spaceComplexity: 'O(1)',
     approach: 'Binary Search on Partitions',
     keyInsights: [
       'Partition both arrays such that left half has same size as right half',
       'Ensure max(left) ≤ min(right) for valid partition',
       'Binary search on smaller array for efficiency'
     ],
     solutions: {
       python: {
         code: `def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
    # Ensure nums1 is the smaller array
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    
    m, n = len(nums1), len(nums2)
    left, right = 0, m
    
    while left <= right:
        partition1 = (left + right) // 2
        partition2 = (m + n + 1) // 2 - partition1
        
        max_left1 = float('-inf') if partition1 == 0 else nums1[partition1 - 1]
        min_right1 = float('inf') if partition1 == m else nums1[partition1]
        
        max_left2 = float('-inf') if partition2 == 0 else nums2[partition2 - 1]
        min_right2 = float('inf') if partition2 == n else nums2[partition2]
        
        if max_left1 <= min_right2 and max_left2 <= min_right1:
            if (m + n) % 2 == 0:
                return (max(max_left1, max_left2) + min(min_right1, min_right2)) / 2
            else:
                return max(max_left1, max_left2)
        elif max_left1 > min_right2:
            right = partition1 - 1
        else:
            left = partition1 + 1`,
         explanation: 'Binary search on partitions to find correct split ensuring balanced and valid median.'
       },
       javascript: {
         code: `var findMedianSortedArrays = function(nums1, nums2) {
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    const m = nums1.length;
    const n = nums2.length;
    let left = 0, right = m;
    
    while (left <= right) {
        const partition1 = Math.floor((left + right) / 2);
        const partition2 = Math.floor((m + n + 1) / 2) - partition1;
        
        const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
        const minRight1 = partition1 === m ? Infinity : nums1[partition1];
        
        const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
        const minRight2 = partition2 === n ? Infinity : nums2[partition2];
        
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
            } else {
                return Math.max(maxLeft1, maxLeft2);
            }
        } else if (maxLeft1 > minRight2) {
            right = partition1 - 1;
        } else {
            left = partition1 + 1;
        }
    }
};`,
         explanation: 'Logarithmic solution using binary search to find optimal partition point.'
       }
     }
   },
   {
     id: 'linked-list-cycle',
     title: 'Linked List Cycle',
     difficulty: 'Easy',
     description: 'Given head, the head of a linked list, determine if the linked list has a cycle in it.',
     category: 'Linked List',
     tags: ['Hash Table', 'Linked List', 'Two Pointers'],
     leetcodeLink: 'https://leetcode.com/problems/linked-list-cycle/',
     timeComplexity: 'O(n)',
     spaceComplexity: 'O(1)',
     approach: 'Floyd\'s Cycle Detection',
     keyInsights: [
       'Use two pointers: slow (1 step) and fast (2 steps)',
       'If cycle exists, fast will eventually meet slow',
       'If no cycle, fast will reach null'
     ],
     solutions: {
       python: {
         code: `def hasCycle(self, head: Optional[ListNode]) -> bool:
    if not head or not head.next:
        return False
    
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        if slow == fast:
            return True
    
    return False`,
         explanation: 'Floyd\'s tortoise and hare algorithm - if there\'s a cycle, fast and slow pointers will meet.'
       },
       javascript: {
         code: `var hasCycle = function(head) {
    if (!head || !head.next) return false;
    
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) return true;
    }
    
    return false;
};`,
         explanation: 'Classic two-pointer technique for cycle detection with O(1) space complexity.'
       }
     }
   },
   {
     id: 'remove-nth-node-from-end',
     title: 'Remove Nth Node From End of List',
     difficulty: 'Medium',
     description: 'Given the head of a linked list, remove the nth node from the end of the list and return its head.',
     category: 'Linked List',
     tags: ['Linked List', 'Two Pointers'],
     leetcodeLink: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
     timeComplexity: 'O(n)',
     spaceComplexity: 'O(1)',
     approach: 'Two Pointers',
     keyInsights: [
       'Use two pointers with n+1 gap between them',
       'When fast reaches end, slow is at node before target',
       'Use dummy node to handle edge cases'
     ],
     solutions: {
       python: {
         code: `def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
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
    
    # Remove the nth node
    second.next = second.next.next
    
    return dummy.next`,
         explanation: 'Two-pointer technique with dummy node for clean edge case handling.'
       },
       javascript: {
         code: `var removeNthFromEnd = function(head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let first = dummy;
    let second = dummy;
    
    // Move first pointer n+1 steps ahead
    for (let i = 0; i <= n; i++) {
        first = first.next;
    }
    
    // Move both pointers until first reaches end
    while (first) {
        first = first.next;
        second = second.next;
    }
    
    // Remove the nth node
    second.next = second.next.next;
    
    return dummy.next;
};`,
         explanation: 'Single-pass solution using two pointers with appropriate gap.'
       }
     }
   },
   {
     id: 'word-search',
     title: 'Word Search',
     difficulty: 'Medium',
     description: 'Given an m x n grid of characters board and a string word, return true if word exists in the grid.',
     category: 'Backtracking',
     tags: ['Array', 'Backtracking', 'Matrix'],
     leetcodeLink: 'https://leetcode.com/problems/word-search/',
     timeComplexity: 'O(m × n × 4^L)',
     spaceComplexity: 'O(L)',
     approach: 'DFS Backtracking',
     keyInsights: [
       'Try starting DFS from every cell in the grid',
       'Use backtracking to explore all possible paths',
       'Mark visited cells temporarily during search'
     ],
     solutions: {
       python: {
         code: `def exist(self, board: List[List[str]], word: str) -> bool:
    if not board or not board[0]:
        return False
    
    rows, cols = len(board), len(board[0])
    
    def backtrack(r, c, index):
        if index == len(word):
            return True
        
        if (r < 0 or r >= rows or c < 0 or c >= cols or 
            board[r][c] != word[index]):
            return False
        
        # Mark as visited
        temp = board[r][c]
        board[r][c] = '#'
        
        # Explore all 4 directions
        found = (backtrack(r + 1, c, index + 1) or
                backtrack(r - 1, c, index + 1) or
                backtrack(r, c + 1, index + 1) or
                backtrack(r, c - 1, index + 1))
        
        # Restore the cell
        board[r][c] = temp
        
        return found
    
    for r in range(rows):
        for c in range(cols):
            if backtrack(r, c, 0):
                return True
    
    return False`,
         explanation: 'DFS backtracking with temporary marking to avoid revisiting cells in current path.'
       },
       javascript: {
         code: `var exist = function(board, word) {
    if (!board || board.length === 0) return false;
    
    const rows = board.length;
    const cols = board[0].length;
    
    function backtrack(r, c, index) {
        if (index === word.length) return true;
        
        if (r < 0 || r >= rows || c < 0 || c >= cols || 
            board[r][c] !== word[index]) {
            return false;
        }
        
        const temp = board[r][c];
        board[r][c] = '#';
        
        const found = backtrack(r + 1, c, index + 1) ||
                     backtrack(r - 1, c, index + 1) ||
                     backtrack(r, c + 1, index + 1) ||
                     backtrack(r, c - 1, index + 1);
        
        board[r][c] = temp;
        
        return found;
    }
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (backtrack(r, c, 0)) return true;
        }
    }
    
    return false;
};`,
         explanation: 'Grid-based DFS with backtracking to find word path through adjacent cells.'
       }
     }
   },
   {
     id: 'generate-parentheses',
     title: 'Generate Parentheses',
     difficulty: 'Medium',
     description: 'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
     category: 'Backtracking',
     tags: ['String', 'Dynamic Programming', 'Backtracking'],
     leetcodeLink: 'https://leetcode.com/problems/generate-parentheses/',
     timeComplexity: 'O(4^n / √n)',
     spaceComplexity: 'O(n)',
     approach: 'Recursive Backtracking',
     keyInsights: [
       'Add opening parenthesis if count < n',
       'Add closing parenthesis if it doesn\'t exceed opening count',
       'Base case: when string length equals 2*n'
     ],
     solutions: {
       python: {
         code: `def generateParenthesis(self, n: int) -> List[str]:
    result = []
    
    def backtrack(current, open_count, close_count):
        if len(current) == 2 * n:
            result.append(current)
            return
        
        if open_count < n:
            backtrack(current + '(', open_count + 1, close_count)
        
        if close_count < open_count:
            backtrack(current + ')', open_count, close_count + 1)
    
    backtrack('', 0, 0)
    return result`,
         explanation: 'Recursive backtracking ensuring valid parentheses by tracking open/close counts.'
       },
       javascript: {
         code: `var generateParenthesis = function(n) {
    const result = [];
    
    function backtrack(current, openCount, closeCount) {
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }
        
        if (openCount < n) {
            backtrack(current + '(', openCount + 1, closeCount);
        }
        
        if (closeCount < openCount) {
            backtrack(current + ')', openCount, closeCount + 1);
        }
    }
    
    backtrack('', 0, 0);
    return result;
};`,
         explanation: 'Backtracking solution building valid parentheses combinations incrementally.'
       }
     }
   },
   {
     id: 'combination-sum',
     title: 'Combination Sum',
     difficulty: 'Medium',
     description: 'Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target.',
     category: 'Backtracking',
     tags: ['Array', 'Backtracking'],
     leetcodeLink: 'https://leetcode.com/problems/combination-sum/',
     timeComplexity: 'O(N^(T/M))',
     spaceComplexity: 'O(T/M)',
     approach: 'Backtracking with Reuse',
     keyInsights: [
       'Allow reusing same number multiple times',
       'Use index to avoid duplicate combinations',
       'Prune when current sum exceeds target'
     ],
     solutions: {
       python: {
         code: `def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
    result = []
    
    def backtrack(start, current_combination, remaining):
        if remaining == 0:
            result.append(current_combination[:])
            return
        
        if remaining < 0:
            return
        
        for i in range(start, len(candidates)):
            current_combination.append(candidates[i])
            backtrack(i, current_combination, remaining - candidates[i])
            current_combination.pop()
    
    backtrack(0, [], target)
    return result`,
         explanation: 'Backtracking with reuse allowed - start index prevents duplicate combinations.'
       },
       javascript: {
         code: `var combinationSum = function(candidates, target) {
    const result = [];
    
    function backtrack(start, currentCombination, remaining) {
        if (remaining === 0) {
            result.push([...currentCombination]);
            return;
        }
        
        if (remaining < 0) return;
        
        for (let i = start; i < candidates.length; i++) {
            currentCombination.push(candidates[i]);
            backtrack(i, currentCombination, remaining - candidates[i]);
            currentCombination.pop();
        }
    }
    
    backtrack(0, [], target);
    return result;
};`,
         explanation: 'Recursive backtracking allowing number reuse to find all valid combinations.'
       }
     }
   },
   {
     id: 'spiral-matrix',
     title: 'Spiral Matrix',
     difficulty: 'Medium',
     description: 'Given an m x n matrix, return all elements of the matrix in spiral order.',
     category: 'Matrix',
     tags: ['Array', 'Matrix', 'Simulation'],
     leetcodeLink: 'https://leetcode.com/problems/spiral-matrix/',
     timeComplexity: 'O(m × n)',
     spaceComplexity: 'O(1)',
     approach: 'Layer by Layer',
     keyInsights: [
       'Process matrix layer by layer from outside to inside',
       'For each layer: right → down → left → up',
       'Update boundaries after each direction'
     ],
     solutions: {
       python: {
         code: `def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
    if not matrix or not matrix[0]:
        return []
    
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    
    while top <= bottom and left <= right:
        # Traverse right
        for col in range(left, right + 1):
            result.append(matrix[top][col])
        top += 1
        
        # Traverse down
        for row in range(top, bottom + 1):
            result.append(matrix[row][right])
        right -= 1
        
        # Traverse left (if we still have rows)
        if top <= bottom:
            for col in range(right, left - 1, -1):
                result.append(matrix[bottom][col])
            bottom -= 1
        
        # Traverse up (if we still have columns)
        if left <= right:
            for row in range(bottom, top - 1, -1):
                result.append(matrix[row][left])
            left += 1
    
    return result`,
         explanation: 'Layer-by-layer traversal with boundary management for spiral pattern.'
       },
       javascript: {
         code: `var spiralOrder = function(matrix) {
    if (!matrix || matrix.length === 0) return [];
    
    const result = [];
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;
    
    while (top <= bottom && left <= right) {
        // Traverse right
        for (let col = left; col <= right; col++) {
            result.push(matrix[top][col]);
        }
        top++;
        
        // Traverse down
        for (let row = top; row <= bottom; row++) {
            result.push(matrix[row][right]);
        }
        right--;
        
        // Traverse left
        if (top <= bottom) {
            for (let col = right; col >= left; col--) {
                result.push(matrix[bottom][col]);
            }
            bottom--;
        }
        
        // Traverse up
        if (left <= right) {
            for (let row = bottom; row >= top; row--) {
                result.push(matrix[row][left]);
            }
            left++;
        }
    }
    
    return result;
};`,
         explanation: 'Simulation of spiral traversal using four directional movements with bounds.'
       }
     }
   },
   {
     id: 'rotate-image',
     title: 'Rotate Image',
     difficulty: 'Medium',
     description: 'You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).',
     category: 'Matrix',
     tags: ['Array', 'Math', 'Matrix'],
     leetcodeLink: 'https://leetcode.com/problems/rotate-image/',
     timeComplexity: 'O(n²)',
     spaceComplexity: 'O(1)',
     approach: 'Transpose and Reverse',
     keyInsights: [
       'Rotate 90° clockwise = transpose + reverse each row',
       'Or rotate elements in groups of 4',
       'In-place transformation without extra space'
     ],
     solutions: {
       python: {
         code: `def rotate(self, matrix: List[List[int]]) -> None:
    n = len(matrix)
    
    # Transpose the matrix
    for i in range(n):
        for j in range(i, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    
    # Reverse each row
    for i in range(n):
        matrix[i].reverse()

# Alternative: Rotate in groups of 4
def rotate(self, matrix: List[List[int]]) -> None:
    n = len(matrix)
    
    for i in range(n // 2):
        for j in range(i, n - i - 1):
            temp = matrix[i][j]
            matrix[i][j] = matrix[n - 1 - j][i]
            matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j]
            matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i]
            matrix[j][n - 1 - i] = temp`,
         explanation: 'Two approaches: transpose+reverse or 4-element rotation. Both are in-place O(1) space.'
       },
       javascript: {
         code: `var rotate = function(matrix) {
    const n = matrix.length;
    
    // Transpose the matrix
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    
    // Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
};`,
         explanation: 'Clean two-step approach: transpose matrix then reverse each row for 90° rotation.'
       }
     }
   },
   {
     id: 'find-minimum-in-rotated-sorted-array',
     title: 'Find Minimum in Rotated Sorted Array',
     difficulty: 'Medium',
     description: 'Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array.',
     category: 'Binary Search',
     tags: ['Array', 'Binary Search'],
     leetcodeLink: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
     timeComplexity: 'O(log n)',
     spaceComplexity: 'O(1)',
     approach: 'Binary Search',
     keyInsights: [
       'Minimum is always in the unsorted half',
       'If nums[mid] > nums[right], minimum is in right half',
       'If nums[mid] < nums[right], minimum is in left half including mid'
     ],
     solutions: {
       python: {
         code: `def findMin(self, nums: List[int]) -> int:
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = (left + right) // 2
        
        if nums[mid] > nums[right]:
            # Minimum is in right half
            left = mid + 1
        else:
            # Minimum is in left half (including mid)
            right = mid
    
    return nums[left]`,
         explanation: 'Binary search comparing middle with right boundary to find rotation point.'
       },
       javascript: {
         code: `var findMin = function(nums) {
    let left = 0, right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return nums[left];
};`,
         explanation: 'Logarithmic search to locate minimum element in rotated sorted array.'
       }
     }
   }
];

export const getProblemsByCategory = (): Record<string, SolvedProblem[]> => {
  return SOLVED_PROBLEMS.reduce((acc, problem) => {
    if (!acc[problem.category]) {
      acc[problem.category] = [];
    }
    acc[problem.category].push(problem);
    return acc;
  }, {} as Record<string, SolvedProblem[]>);
};

export const getProblemById = (id: string): SolvedProblem | undefined => {
  return SOLVED_PROBLEMS.find(problem => problem.id === id);
};

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'text-green-600 dark:text-green-400';
    case 'medium': return 'text-yellow-600 dark:text-yellow-400';
    case 'hard': return 'text-red-600 dark:text-red-400';
    default: return 'text-gray-600 dark:text-gray-400';
  }
};

export const getRelatedProblems = (currentProblem: SolvedProblem, limit: number = 4): SolvedProblem[] => {
  // Get problems from the same category first
  const sameCategory = SOLVED_PROBLEMS.filter(
    problem => problem.id !== currentProblem.id && problem.category === currentProblem.category
  );

  // Get problems with similar tags
  const similarTags = SOLVED_PROBLEMS.filter(
    problem => 
      problem.id !== currentProblem.id && 
      problem.category !== currentProblem.category &&
      problem.tags.some(tag => currentProblem.tags.includes(tag))
  );

  // Combine and sort by relevance (same category first, then similar tags)
  const related = [...sameCategory, ...similarTags];

  // Remove duplicates and limit results
  const uniqueRelated = related.filter((problem, index, self) => 
    index === self.findIndex(p => p.id === problem.id)
  );

  return uniqueRelated.slice(0, limit);
};
