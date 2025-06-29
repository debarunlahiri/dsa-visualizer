import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const stringBasicsExplanationContent = (
  <AlgorithmExplanation>
    <h2>String Algorithms - Playing with Words! 📝</h2>
    <p>
      Strings are everywhere! Your name, text messages, emails, web pages - they're all made of strings. 
      Learning how to work with strings is like learning magic tricks with words!
    </p>

    <h3>What are Strings?</h3>
    <p>
      A string is a sequence of characters - letters, numbers, symbols, and spaces all lined up together. 
      Think of it like beads on a string, where each bead is a character!
    </p>

    <h3>Common String Operations:</h3>
    <ul>
      <li><strong>Length:</strong> Count how many characters are in the string</li>
      <li><strong>Access:</strong> Get a specific character at a position</li>
      <li><strong>Concatenation:</strong> Join two strings together</li>
      <li><strong>Substring:</strong> Get a part of the string</li>
      <li><strong>Search:</strong> Find if a word or pattern exists</li>
      <li><strong>Replace:</strong> Change some characters with others</li>
    </ul>

    <h3>Cool String Algorithms:</h3>
    <ul>
      <li><strong>Palindrome Check:</strong> Does it read the same forwards and backwards?</li>
      <li><strong>Anagram Check:</strong> Do two words use the same letters?</li>
      <li><strong>String Reversal:</strong> Flip the text backwards</li>
      <li><strong>Character Frequency:</strong> Count how many times each letter appears</li>
      <li><strong>Pattern Matching:</strong> Find if a pattern exists in text</li>
      <li><strong>Longest Common Substring:</strong> Find what two strings have in common</li>
    </ul>

    <h3>Real-Life String Uses:</h3>
    <ul>
      <li><strong>Search Engines:</strong> Find web pages containing your search words</li>
      <li><strong>Spell Checkers:</strong> Find and suggest corrections for misspelled words</li>
      <li><strong>Text Messages:</strong> Auto-complete and emoji suggestions</li>
      <li><strong>Games:</strong> Word puzzles, Scrabble helpers, crossword solvers</li>
      <li><strong>DNA Analysis:</strong> Scientists use string algorithms to study genes!</li>
      <li><strong>Music Apps:</strong> Find songs by lyrics</li>
    </ul>

    <h3>String Algorithm Complexities:</h3>
    <ul>
      <li><strong>Access character:</strong> $$O(1)$$ - Super fast!</li>
      <li><strong>Length:</strong> $$O(1)$$ - Usually stored</li>
      <li><strong>Search (naive):</strong> $$O(n×m)$$ - Check every position</li>
      <li><strong>Search (KMP):</strong> $$O(n+m)$$ - Smart algorithm</li>
      <li><strong>Concatenation:</strong> $$O(n+m)$$ - Join two strings</li>
    </ul>

    <h3>Fun String Facts:</h3>
    <ul>
      <li>The longest word in English has 189,819 letters (it's a chemical name!)</li>
      <li>Your DNA is like a string with only 4 characters: A, T, G, C</li>
      <li>Computer passwords are strings that protect your accounts</li>
      <li>Every emoji is actually a special string of characters</li>
    </ul>

    <h3>When to Use String Algorithms:</h3>
    <ul>
      <li>When working with text processing</li>
      <li>When building search features</li>
      <li>When validating user input</li>
      <li>When parsing data or file formats</li>
      <li>When creating word games or puzzles</li>
    </ul>
  </AlgorithmExplanation>
)

export const stringBasicsCodeSnippets = {
  python: `# String Algorithms in Python - Fun Examples!

# Basic String Operations
text = "Hello World"
print(f"Original string: '{text}'")
print(f"Length: {len(text)}")
print(f"First character: '{text[0]}'")
print(f"Last character: '{text[-1]}'")

# String methods
print(f"Uppercase: '{text.upper()}'")
print(f"Lowercase: '{text.lower()}'")
print(f"Replace 'World' with 'Python': '{text.replace('World', 'Python')}'")

# 1. Palindrome Check (reads same forwards and backwards)
def is_palindrome(s):
    """Check if a string is a palindrome"""
    # Remove spaces and convert to lowercase
    s = s.replace(' ', '').lower()
    # Compare with its reverse
    return s == s[::-1]

# Test palindromes
words = ["racecar", "hello", "madam", "A man a plan a canal Panama"]
for word in words:
    result = "is" if is_palindrome(word) else "is not"
    print(f"'{word}' {result} a palindrome")

# 2. Character Frequency Counter
def count_characters(text):
    """Count how many times each character appears"""
    frequency = {}
    for char in text.lower():
        if char.isalpha():  # Only count letters
            frequency[char] = frequency.get(char, 0) + 1
    return frequency

text = "Hello World"
freq = count_characters(text)
print(f"\\nCharacter frequencies in '{text}':")
for char, count in sorted(freq.items()):
    print(f"'{char}': {count}")

# 3. Anagram Check (same letters, different order)
def are_anagrams(word1, word2):
    """Check if two words are anagrams"""
    # Remove spaces and convert to lowercase
    word1 = word1.replace(' ', '').lower()
    word2 = word2.replace(' ', '').lower()
    
    # Sort the characters and compare
    return sorted(word1) == sorted(word2)

# Test anagrams
pairs = [("listen", "silent"), ("hello", "world"), ("evil", "live")]
for word1, word2 in pairs:
    result = "are" if are_anagrams(word1, word2) else "are not"
    print(f"'{word1}' and '{word2}' {result} anagrams")

# 4. String Reversal (multiple ways)
def reverse_string(s):
    """Reverse a string using slicing"""
    return s[::-1]

def reverse_string_manual(s):
    """Reverse a string manually"""
    reversed_str = ""
    for i in range(len(s) - 1, -1, -1):
        reversed_str += s[i]
    return reversed_str

original = "Python"
print(f"\\nOriginal: '{original}'")
print(f"Reversed (slicing): '{reverse_string(original)}'")
print(f"Reversed (manual): '{reverse_string_manual(original)}'")

# 5. Pattern Search (find substring)
def find_pattern(text, pattern):
    """Find all positions where pattern occurs in text"""
    positions = []
    for i in range(len(text) - len(pattern) + 1):
        if text[i:i+len(pattern)] == pattern:
            positions.append(i)
    return positions

text = "the quick brown fox jumps over the lazy dog"
pattern = "the"
positions = find_pattern(text, pattern)
print(f"\\nPattern '{pattern}' found at positions: {positions}")

# 6. Longest Common Substring
def longest_common_substring(str1, str2):
    """Find the longest substring common to both strings"""
    longest = ""
    for i in range(len(str1)):
        for j in range(i + 1, len(str1) + 1):
            substring = str1[i:j]
            if substring in str2 and len(substring) > len(longest):
                longest = substring
    return longest

str1 = "programming"
str2 = "algorithm"
common = longest_common_substring(str1, str2)
print(f"\\nLongest common substring of '{str1}' and '{str2}': '{common}'")`,

  javascript: `// String Algorithms in JavaScript - Fun Examples!

// Basic String Operations
const text = "Hello World";
console.log(\`Original string: '\${text}'\`);
console.log(\`Length: \${text.length}\`);
console.log(\`First character: '\${text[0]}'\`);
console.log(\`Last character: '\${text[text.length - 1]}'\`);

// String methods
console.log(\`Uppercase: '\${text.toUpperCase()}'\`);
console.log(\`Lowercase: '\${text.toLowerCase()}'\`);
console.log(\`Replace 'World' with 'JavaScript': '\${text.replace('World', 'JavaScript')}'\`);

// 1. Palindrome Check
function isPalindrome(s) {
    // Remove spaces and convert to lowercase
    s = s.replace(/\\s/g, '').toLowerCase();
    // Compare with its reverse
    return s === s.split('').reverse().join('');
}

// Test palindromes
const words = ["racecar", "hello", "madam", "A man a plan a canal Panama"];
words.forEach(word => {
    const result = isPalindrome(word) ? "is" : "is not";
    console.log(\`'\${word}' \${result} a palindrome\`);
});

// 2. Character Frequency Counter
function countCharacters(text) {
    const frequency = {};
    for (const char of text.toLowerCase()) {
        if (char.match(/[a-z]/)) {  // Only count letters
            frequency[char] = (frequency[char] || 0) + 1;
        }
    }
    return frequency;
}

const testText = "Hello World";
const freq = countCharacters(testText);
console.log(\`\\nCharacter frequencies in '\${testText}':\`);
Object.keys(freq).sort().forEach(char => {
    console.log(\`'\${char}': \${freq[char]}\`);
});

// 3. Anagram Check
function areAnagrams(word1, word2) {
    // Remove spaces and convert to lowercase
    word1 = word1.replace(/\\s/g, '').toLowerCase();
    word2 = word2.replace(/\\s/g, '').toLowerCase();
    
    // Sort the characters and compare
    return word1.split('').sort().join('') === word2.split('').sort().join('');
}

// Test anagrams
const pairs = [["listen", "silent"], ["hello", "world"], ["evil", "live"]];
pairs.forEach(([word1, word2]) => {
    const result = areAnagrams(word1, word2) ? "are" : "are not";
    console.log(\`'\${word1}' and '\${word2}' \${result} anagrams\`);
});

// 4. String Reversal
function reverseString(s) {
    return s.split('').reverse().join('');
}

function reverseStringManual(s) {
    let reversed = "";
    for (let i = s.length - 1; i >= 0; i--) {
        reversed += s[i];
    }
    return reversed;
}

const original = "JavaScript";
console.log(\`\\nOriginal: '\${original}'\`);
console.log(\`Reversed (built-in): '\${reverseString(original)}'\`);
console.log(\`Reversed (manual): '\${reverseStringManual(original)}'\`);

// 5. Pattern Search
function findPattern(text, pattern) {
    const positions = [];
    for (let i = 0; i <= text.length - pattern.length; i++) {
        if (text.substring(i, i + pattern.length) === pattern) {
            positions.push(i);
        }
    }
    return positions;
}

const searchText = "the quick brown fox jumps over the lazy dog";
const searchPattern = "the";
const positions = findPattern(searchText, searchPattern);
console.log(\`\\nPattern '\${searchPattern}' found at positions: \${positions}\`);

// 6. Word Frequency in Sentence
function wordFrequency(sentence) {
    const words = sentence.toLowerCase().split(/\\s+/);
    const frequency = {};
    
    words.forEach(word => {
        // Remove punctuation
        word = word.replace(/[^a-z]/g, '');
        if (word) {
            frequency[word] = (frequency[word] || 0) + 1;
        }
    });
    
    return frequency;
}

const sentence = "the quick brown fox jumps over the lazy dog";
const wordFreq = wordFrequency(sentence);
console.log(\`\\nWord frequencies in '\${sentence}':\`);
Object.keys(wordFreq).sort().forEach(word => {
    console.log(\`'\${word}': \${wordFreq[word]}\`);
});`,

  java: `// String Algorithms in Java

import java.util.*;

public class StringAlgorithms {
    
    // 1. Palindrome Check
    public static boolean isPalindrome(String s) {
        // Remove spaces and convert to lowercase
        s = s.replaceAll("\\\\s", "").toLowerCase();
        
        // Compare with reverse
        StringBuilder reversed = new StringBuilder(s).reverse();
        return s.equals(reversed.toString());
    }
    
    // 2. Character Frequency Counter
    public static Map<Character, Integer> countCharacters(String text) {
        Map<Character, Integer> frequency = new HashMap<>();
        
        for (char c : text.toLowerCase().toCharArray()) {
            if (Character.isLetter(c)) {
                frequency.put(c, frequency.getOrDefault(c, 0) + 1);
            }
        }
        
        return frequency;
    }
    
    // 3. Anagram Check
    public static boolean areAnagrams(String word1, String word2) {
        // Remove spaces and convert to lowercase
        word1 = word1.replaceAll("\\\\s", "").toLowerCase();
        word2 = word2.replaceAll("\\\\s", "").toLowerCase();
        
        // Sort characters and compare
        char[] chars1 = word1.toCharArray();
        char[] chars2 = word2.toCharArray();
        Arrays.sort(chars1);
        Arrays.sort(chars2);
        
        return Arrays.equals(chars1, chars2);
    }
    
    // 4. String Reversal
    public static String reverseString(String s) {
        return new StringBuilder(s).reverse().toString();
    }
    
    public static String reverseStringManual(String s) {
        StringBuilder reversed = new StringBuilder();
        for (int i = s.length() - 1; i >= 0; i--) {
            reversed.append(s.charAt(i));
        }
        return reversed.toString();
    }
    
    // 5. Pattern Search
    public static List<Integer> findPattern(String text, String pattern) {
        List<Integer> positions = new ArrayList<>();
        
        for (int i = 0; i <= text.length() - pattern.length(); i++) {
            if (text.substring(i, i + pattern.length()).equals(pattern)) {
                positions.add(i);
            }
        }
        
        return positions;
    }
    
    public static void main(String[] args) {
        // Test palindromes
        String[] words = {"racecar", "hello", "madam"};
        System.out.println("=== Palindrome Tests ===");
        for (String word : words) {
            boolean result = isPalindrome(word);
            System.out.println("'" + word + "' is " + (result ? "" : "not ") + "a palindrome");
        }
        
        // Test character frequency
        System.out.println("\\n=== Character Frequency ===");
        String testText = "Hello World";
        Map<Character, Integer> freq = countCharacters(testText);
        System.out.println("Frequencies in '" + testText + "':");
        freq.entrySet().stream()
            .sorted(Map.Entry.comparingByKey())
            .forEach(entry -> System.out.println("'" + entry.getKey() + "': " + entry.getValue()));
        
        // Test anagrams
        System.out.println("\\n=== Anagram Tests ===");
        String[][] pairs = {{"listen", "silent"}, {"hello", "world"}, {"evil", "live"}};
        for (String[] pair : pairs) {
            boolean result = areAnagrams(pair[0], pair[1]);
            System.out.println("'" + pair[0] + "' and '" + pair[1] + "' are " + 
                             (result ? "" : "not ") + "anagrams");
        }
        
        // Test string reversal
        System.out.println("\\n=== String Reversal ===");
        String original = "Java";
        System.out.println("Original: '" + original + "'");
        System.out.println("Reversed: '" + reverseString(original) + "'");
    }
}`
} 