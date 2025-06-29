import type { AlgorithmExplanation, CodeSnippet } from "../types"

export const kmpExplanationContent: AlgorithmExplanation = {
  introduction: (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-3">What is the KMP Algorithm?</h3>
        <p className="text-gray-700">
          The <strong>Knuth-Morris-Pratt (KMP) algorithm</strong> is an efficient string matching algorithm 
          that searches for occurrences of a pattern within a text. Developed by Donald Knuth, Vaughan Pratt, 
          and James Morris in 1977, it improves upon naive string matching by avoiding redundant comparisons 
          when a mismatch occurs.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Key Innovation</h3>
        <p className="text-gray-700 mb-3">
          The key insight is that when a mismatch occurs, we can use information about the pattern itself 
          to skip characters in the text, rather than starting over from the next position.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p><strong>Naive approach:</strong> O(nm) - check every position, backtrack on mismatch</p>
          <p><strong>KMP approach:</strong> O(n + m) - never backtrack in text, use failure function</p>
          <p className="text-sm text-gray-600 mt-2">where n = text length, m = pattern length</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">How It Works</h3>
        <div className="space-y-3">
          <div><strong>1. Preprocessing:</strong> Build failure function (LPS array) for the pattern</div>
          <div><strong>2. Matching:</strong> Scan text left to right, using failure function on mismatch</div>
          <div><strong>3. No backtracking:</strong> Never move backwards in the text</div>
          <div><strong>4. Skip intelligently:</strong> Use pattern's self-similarity to skip positions</div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Failure Function (LPS Array)</h3>
        <p className="text-gray-700 mb-3">
          The <strong>Longest Proper Prefix which is also Suffix (LPS)</strong> array is the heart of KMP:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>LPS[i]</strong> = length of longest proper prefix of pattern[0...i] that is also a suffix</li>
          <li><strong>Proper prefix</strong> = prefix that is not equal to the string itself</li>
          <li><strong>Example:</strong> "ABABCA" → LPS = [0, 0, 1, 2, 0, 1]</li>
          <li><strong>Usage:</strong> On mismatch at position i, skip to position LPS[i-1]</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Real-World Applications</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Text editors</strong> - Find and replace functionality</li>
          <li><strong>Search engines</strong> - Efficient text searching</li>
          <li><strong>Bioinformatics</strong> - DNA sequence matching</li>
          <li><strong>Plagiarism detection</strong> - Finding copied text</li>
          <li><strong>Data compression</strong> - Finding repeated patterns</li>
          <li><strong>Network security</strong> - Pattern matching in intrusion detection</li>
        </ul>
      </div>
    </div>
  ),
  
  concepts: [
    {
      title: "LPS Array Construction",
      content: (
        <div>
          <p className="mb-3">Building the failure function efficiently:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Two pointers</strong> - i (current position) and j (prefix length)</li>
            <li><strong>Match case</strong> - If pattern[i] == pattern[j], increment both and set LPS[i] = j</li>
            <li><strong>Mismatch case</strong> - If j &gt; 0, set j = LPS[j-1] and try again</li>
            <li><strong>Base case</strong> - If j == 0 and mismatch, set LPS[i] = 0</li>
          </ul>
        </div>
      )
    },
    {
      title: "Pattern Matching Process",
      content: (
        <div>
          <p className="mb-3">Using LPS array for efficient matching:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Two pointers</strong> - i (text index) and j (pattern index)</li>
            <li><strong>Match case</strong> - If text[i] == pattern[j], increment both</li>
            <li><strong>Complete match</strong> - If j == pattern length, found occurrence</li>
            <li><strong>Mismatch case</strong> - Use LPS[j-1] to skip characters intelligently</li>
          </ul>
        </div>
      )
    },
    {
      title: "Advantages over Naive Approach",
      content: (
        <div>
          <p className="mb-3">Why KMP is superior:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Linear time</strong> - O(n + m) vs O(nm) for naive approach</li>
            <li><strong>No backtracking</strong> - Never move backwards in text</li>
            <li><strong>Worst-case optimal</strong> - Always O(n + m) regardless of input</li>
            <li><strong>Online algorithm</strong> - Can process text as it arrives</li>
          </ul>
        </div>
      )
    }
  ]
}

export const kmpCodeSnippets: CodeSnippet[] = [
  {
    title: "Complete KMP Implementation",
    language: "python",
    code: `def compute_lps(pattern):
    """
    Compute the Longest Proper Prefix which is also Suffix (LPS) array
    This is the failure function used by KMP algorithm
    """
    m = len(pattern)
    lps = [0] * m
    length = 0  # Length of previous longest prefix suffix
    i = 1
    
    while i < m:
        if pattern[i] == pattern[length]:
            # Characters match, extend the length
            length += 1
            lps[i] = length
            i += 1
        else:
            # Characters don't match
            if length != 0:
                # Use the previous LPS value to avoid unnecessary comparisons
                length = lps[length - 1]
                # Don't increment i here
            else:
                # length is 0, no prefix matches
                lps[i] = 0
                i += 1
    
    return lps

def kmp_search(text, pattern):
    """
    KMP string matching algorithm
    Returns list of starting indices where pattern occurs in text
    """
    n = len(text)
    m = len(pattern)
    
    if m == 0:
        return []
    
    # Preprocess pattern to get LPS array
    lps = compute_lps(pattern)
    
    matches = []
    i = 0  # Index for text
    j = 0  # Index for pattern
    
    while i < n:
        if pattern[j] == text[i]:
            # Characters match, move forward
            i += 1
            j += 1
        
        if j == m:
            # Found a complete match
            matches.append(i - j)
            j = lps[j - 1]  # Get next position to check using LPS
        elif i < n and pattern[j] != text[i]:
            # Mismatch after j matches
            if j != 0:
                # Use LPS to skip characters
                j = lps[j - 1]
            else:
                # j is 0, move to next character in text
                i += 1
    
    return matches

# Example usage and demonstration
def demonstrate_kmp():
    text = "ABABDABACDABABCABCABCABCABC"
    pattern = "ABABCABCABCABC"
    
    print(f"Text: {text}")
    print(f"Pattern: {pattern}")
    print()
    
    # Show LPS array construction
    lps = compute_lps(pattern)
    print("LPS Array construction:")
    print(f"Pattern:  {' '.join(pattern)}")
    print(f"Index:    {' '.join(str(i) for i in range(len(pattern)))}")
    print(f"LPS:      {' '.join(str(x) for x in lps)}")
    print()
    
    # Find matches
    matches = kmp_search(text, pattern)
    print(f"Pattern found at indices: {matches}")
    
    # Show matches in context
    for idx in matches:
        print(f"Match at index {idx}:")
        print(f"  {text}")
        print(f"  {' ' * idx}{pattern}")
        print()

demonstrate_kmp()`
  },
  {
    title: "KMP with Detailed Tracing",
    language: "python",
    code: `class KMPMatcher:
    def __init__(self, pattern):
        self.pattern = pattern
        self.lps = self.compute_lps_with_trace()
    
    def compute_lps_with_trace(self):
        """Compute LPS array with detailed tracing"""
        pattern = self.pattern
        m = len(pattern)
        lps = [0] * m
        length = 0
        i = 1
        
        print(f"Building LPS array for pattern: '{pattern}'")
        print(f"Position: {' '.join(f'{i:2d}' for i in range(m))}")
        print(f"Pattern:  {' '.join(f'{c:2s}' for c in pattern)}")
        
        while i < m:
            print(f"\\nStep: i={i}, length={length}")
            print(f"Comparing pattern[{i}]='{pattern[i]}' with pattern[{length}]='{pattern[length]}'")
            
            if pattern[i] == pattern[length]:
                length += 1
                lps[i] = length
                print(f"  Match! Set lps[{i}] = {length}")
                i += 1
            else:
                if length != 0:
                    length = lps[length - 1]
                    print(f"  Mismatch! Set length = lps[{length}] = {lps[length - 1]}")
                else:
                    lps[i] = 0
                    print(f"  Mismatch and length=0! Set lps[{i}] = 0")
                    i += 1
            
            print(f"Current LPS: {lps}")
        
        print(f"\\nFinal LPS array: {lps}")
        return lps
    
    def search_with_trace(self, text):
        """Search with detailed step-by-step tracing"""
        n = len(text)
        m = len(self.pattern)
        matches = []
        
        print(f"\\n{'='*50}")
        print(f"Searching for pattern '{self.pattern}' in text '{text}'")
        print(f"{'='*50}")
        
        i = j = 0
        step = 0
        
        while i < n:
            step += 1
            print(f"\\nStep {step}: i={i}, j={j}")
            print(f"Text:    {text}")
            print(f"         {' ' * i}^")
            print(f"Pattern: {' ' * (i - j)}{self.pattern}")
            print(f"         {' ' * (i - j + j)}^")
            
            if self.pattern[j] == text[i]:
                print(f"Match: text[{i}]='{text[i]}' == pattern[{j}]='{self.pattern[j]}'")
                i += 1
                j += 1
            
            if j == m:
                print(f"\\n*** COMPLETE MATCH FOUND at index {i - j} ***")
                matches.append(i - j)
                j = self.lps[j - 1]
                print(f"Reset j to lps[{m-1}] = {j}")
            elif i < n and self.pattern[j] != text[i]:
                print(f"Mismatch: text[{i}]='{text[i]}' != pattern[{j}]='{self.pattern[j]}'")
                if j != 0:
                    j = self.lps[j - 1]
                    print(f"Set j = lps[{j + len(self.lps[j - 1:j])}] = {j}")
                else:
                    print("j=0, advance text pointer")
                    i += 1
        
        print(f"\\nSearch complete. Matches found at: {matches}")
        return matches

# Demonstration
matcher = KMPMatcher("ABABCABABA")
matches = matcher.search_with_trace("ABABABABCABABAABABCABABAAB")`
  },
  {
    title: "KMP for Multiple Pattern Matching",
    language: "python",
    code: `class MultiPatternKMP:
    """KMP-based matcher for multiple patterns"""
    
    def __init__(self, patterns):
        self.patterns = patterns
        self.pattern_data = {}
        
        # Preprocess each pattern
        for i, pattern in enumerate(patterns):
            self.pattern_data[i] = {
                'pattern': pattern,
                'lps': self.compute_lps(pattern)
            }
    
    def compute_lps(self, pattern):
        """Standard LPS computation"""
        m = len(pattern)
        lps = [0] * m
        length = 0
        i = 1
        
        while i < m:
            if pattern[i] == pattern[length]:
                length += 1
                lps[i] = length
                i += 1
            else:
                if length != 0:
                    length = lps[length - 1]
                else:
                    lps[i] = 0
                    i += 1
        return lps
    
    def search_all(self, text):
        """Find all occurrences of all patterns in text"""
        all_matches = {}
        
        for pattern_id, data in self.pattern_data.items():
            pattern = data['pattern']
            lps = data['lps']
            matches = []
            
            n = len(text)
            m = len(pattern)
            i = j = 0
            
            while i < n:
                if pattern[j] == text[i]:
                    i += 1
                    j += 1
                
                if j == m:
                    matches.append(i - j)
                    j = lps[j - 1]
                elif i < n and pattern[j] != text[i]:
                    if j != 0:
                        j = lps[j - 1]
                    else:
                        i += 1
            
            all_matches[pattern] = matches
        
        return all_matches
    
    def find_overlapping_matches(self, text):
        """Find all matches and identify overlaps"""
        all_matches = self.search_all(text)
        
        # Create list of all matches with pattern info
        match_list = []
        for pattern, matches in all_matches.items():
            for start_pos in matches:
                match_list.append({
                    'pattern': pattern,
                    'start': start_pos,
                    'end': start_pos + len(pattern) - 1,
                    'length': len(pattern)
                })
        
        # Sort by start position
        match_list.sort(key=lambda x: x['start'])
        
        # Find overlaps
        overlaps = []
        for i in range(len(match_list)):
            for j in range(i + 1, len(match_list)):
                match1, match2 = match_list[i], match_list[j]
                if match1['end'] >= match2['start']:
                    overlaps.append((match1, match2))
                else:
                    break  # No more overlaps for match1
        
        return match_list, overlaps

# Example: DNA sequence analysis
dna_text = "ATCGATCGATCGTAGCTAGCTAGCATCGATCG"
patterns = ["ATCG", "GCTA", "TAGC", "CATC"]

matcher = MultiPatternKMP(patterns)
matches = matcher.search_all(dna_text)

print("DNA Sequence:", dna_text)
print("\\nPattern matches:")
for pattern, positions in matches.items():
    print(f"  {pattern}: {positions}")

# Show overlapping matches
all_matches, overlaps = matcher.find_overlapping_matches(dna_text)
print(f"\\nTotal matches found: {len(all_matches)}")
print(f"Overlapping matches: {len(overlaps)}")

for match1, match2 in overlaps:
    print(f"  '{match1['pattern']}' at {match1['start']}-{match1['end']} overlaps with")
    print(f"  '{match2['pattern']}' at {match2['start']}-{match2['end']}")`
  },
  {
    title: "JavaScript Implementation",
    language: "javascript",
    code: `class KMPStringMatcher {
    constructor(pattern) {
        this.pattern = pattern;
        this.lps = this.computeLPS(pattern);
    }
    
    computeLPS(pattern) {
        const m = pattern.length;
        const lps = new Array(m).fill(0);
        let length = 0;
        let i = 1;
        
        while (i < m) {
            if (pattern[i] === pattern[length]) {
                length++;
                lps[i] = length;
                i++;
            } else {
                if (length !== 0) {
                    length = lps[length - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        
        return lps;
    }
    
    search(text) {
        const n = text.length;
        const m = this.pattern.length;
        const matches = [];
        
        let i = 0; // index for text
        let j = 0; // index for pattern
        
        while (i < n) {
            if (this.pattern[j] === text[i]) {
                i++;
                j++;
            }
            
            if (j === m) {
                matches.push(i - j);
                j = this.lps[j - 1];
            } else if (i < n && this.pattern[j] !== text[i]) {
                if (j !== 0) {
                    j = this.lps[j - 1];
                } else {
                    i++;
                }
            }
        }
        
        return matches;
    }
    
    searchFirst(text) {
        // Find only the first occurrence
        const n = text.length;
        const m = this.pattern.length;
        
        let i = 0, j = 0;
        
        while (i < n) {
            if (this.pattern[j] === text[i]) {
                i++;
                j++;
            }
            
            if (j === m) {
                return i - j; // Return first match position
            } else if (i < n && this.pattern[j] !== text[i]) {
                if (j !== 0) {
                    j = this.lps[j - 1];
                } else {
                    i++;
                }
            }
        }
        
        return -1; // Not found
    }
    
    countOccurrences(text) {
        return this.search(text).length;
    }
    
    replaceAll(text, replacement) {
        const matches = this.search(text);
        if (matches.length === 0) return text;
        
        let result = '';
        let lastIndex = 0;
        
        for (const matchIndex of matches) {
            result += text.substring(lastIndex, matchIndex);
            result += replacement;
            lastIndex = matchIndex + this.pattern.length;
        }
        
        result += text.substring(lastIndex);
        return result;
    }
}

// Example usage
const text = "ABABDABACDABABCABCABCABCABC";
const pattern = "ABABCABCABCABC";

const matcher = new KMPStringMatcher(pattern);

console.log(\`Text: \${text}\`);
console.log(\`Pattern: \${pattern}\`);
console.log(\`LPS Array: [\${matcher.lps.join(', ')}]\`);

const matches = matcher.search(text);
console.log(\`Matches found at positions: [\${matches.join(', ')}]\`);

const firstMatch = matcher.searchFirst(text);
console.log(\`First match at position: \${firstMatch}\`);

const count = matcher.countOccurrences(text);
console.log(\`Total occurrences: \${count}\`);

// Text replacement example
const simpleText = "The cat in the hat sat on the mat";
const catMatcher = new KMPStringMatcher("cat");
const replaced = catMatcher.replaceAll(simpleText, "dog");
console.log(\`\\nOriginal: \${simpleText}\`);
console.log(\`Replaced: \${replaced}\`);

// Performance comparison with naive approach
function naiveSearch(text, pattern) {
    const matches = [];
    for (let i = 0; i <= text.length - pattern.length; i++) {
        let j = 0;
        while (j < pattern.length && text[i + j] === pattern[j]) {
            j++;
        }
        if (j === pattern.length) {
            matches.push(i);
        }
    }
    return matches;
}

// Compare performance
const longText = "A".repeat(10000) + "ABCDEFG" + "A".repeat(10000);
const searchPattern = "ABCDEFG";

console.time("KMP Search");
const kmpResult = new KMPStringMatcher(searchPattern).search(longText);
console.timeEnd("KMP Search");

console.time("Naive Search");
const naiveResult = naiveSearch(longText, searchPattern);
console.timeEnd("Naive Search");

console.log(\`Both methods found \${kmpResult.length} matches\`);`
  }
] 