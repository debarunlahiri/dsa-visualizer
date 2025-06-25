import { NextRequest, NextResponse } from 'next/server';
import { LANGUAGES } from '@/lib/constants';
import { getProblem } from '@/lib/problems';
import { TestCaseResult } from '@/lib/types';

interface RunTestsRequest {
  code: string;
  language_id: number;
  problemId: string;
}

interface RunTestsResponse {
  testResults: TestCaseResult[];
  totalTests: number;
  passedTests: number;
  status: {
    description: string;
  };
  time: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<RunTestsResponse>> {
  try {
    const body: RunTestsRequest = await request.json();
    const { code, language_id, problemId } = body;

    // Validate input
    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        {
          testResults: [],
          totalTests: 0,
          passedTests: 0,
          status: { description: 'Invalid code provided' },
          time: '0ms'
        },
        { status: 400 }
      );
    }

    // Get problem and its test cases
    const problem = getProblem(problemId);
    if (!problem) {
      return NextResponse.json(
        {
          testResults: [],
          totalTests: 0,
          passedTests: 0,
          status: { description: 'Problem not found' },
          time: '0ms'
        },
        { status: 404 }
      );
    }

    // Find language by ID
    const language = LANGUAGES.find(lang => lang.id === language_id);
    if (!language) {
      return NextResponse.json(
        {
          testResults: [],
          totalTests: 0,
          passedTests: 0,
          status: { description: `Language with ID ${language_id} is not supported` },
          time: '0ms'
        },
        { status: 400 }
      );
    }

    // Map language names to what the execute API expects
    const languageMap: Record<string, string> = {
      'JavaScript': 'javascript',
      'Python': 'python',
      'Java': 'java',
      'C++': 'cpp'
    };

    const mappedLanguage = languageMap[language.name];
    if (!mappedLanguage) {
      return NextResponse.json(
        {
          testResults: [],
          totalTests: 0,
          passedTests: 0,
          status: { description: `Language ${language.name} is not supported` },
          time: '0ms'
        },
        { status: 400 }
      );
    }

    const testResults: TestCaseResult[] = [];
    let totalExecutionTime = 0;
    let passedTests = 0;

    // Run each test case
    for (const testCase of problem.testCases) {
      try {
        // Prepare code with test input
        let testCode = code;
        if (testCase.input && testCase.input.trim()) {
          if (mappedLanguage === 'javascript') {
            // For JavaScript, add input handling
            testCode = `
const input = \`${testCase.input.replace(/`/g, '\\`')}\`;
const inputLines = input.trim().split('\\n');
let inputIndex = 0;
function readLine() { return inputLines[inputIndex++] || ''; }

${code}

// Auto-execute for testing
try {
  let result;
  if (typeof twoSum === 'function') {
    const lines = input.trim().split('\\n');
    const nums = JSON.parse(lines[0]);
    const target = parseInt(lines[1]);
    result = twoSum(nums, target);
  } else if (typeof addTwoNumbers === 'function') {
    // Handle linked list input - simplified for testing
    const lines = input.trim().split('\\n');
    const l1Array = JSON.parse(lines[0]);
    const l2Array = JSON.parse(lines[1]);
    // Convert arrays to linked lists (simplified)
    function arrayToList(arr) {
      let head = null;
      let current = null;
      for (let val of arr) {
        const node = { val, next: null };
        if (!head) {
          head = node;
          current = node;
        } else {
          current.next = node;
          current = node;
        }
      }
      return head;
    }
    function listToArray(head) {
      const result = [];
      let current = head;
      while (current) {
        result.push(current.val);
        current = current.next;
      }
      return result;
    }
    const l1 = arrayToList(l1Array);
    const l2 = arrayToList(l2Array);
    const resultList = addTwoNumbers(l1, l2);
    result = listToArray(resultList);
  } else if (typeof lengthOfLongestSubstring === 'function') {
    result = lengthOfLongestSubstring(input.trim());
  }
  console.log(JSON.stringify(result));
} catch (e) {
  console.error(e.message);
}
`;
          } else if (mappedLanguage === 'python') {
            // For Python, add input handling
            testCode = `
import sys
from io import StringIO
import json

sys.stdin = StringIO("""${testCase.input}""")

${code}

# Auto-execute for testing
try:
    lines = """${testCase.input}""".strip().split('\\n')
    solution = Solution()
    
    if hasattr(solution, 'twoSum'):
        nums = json.loads(lines[0])
        target = int(lines[1])
        result = solution.twoSum(nums, target)
    elif hasattr(solution, 'lengthOfLongestSubstring'):
        result = solution.lengthOfLongestSubstring(lines[0])
    else:
        result = "Method not found"
    
    print(json.dumps(result))
except Exception as e:
    print(f"Error: {e}")
`;
          }
        }

        // Call the existing execute API
        const executeResponse = await fetch(`${request.url.replace('/run-tests', '/execute')}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: testCode,
            language: mappedLanguage
          }),
        });

        const executeResult = await executeResponse.json();
        
        // Parse execution time
        if (executeResult.executionTime) {
          totalExecutionTime += executeResult.executionTime;
        }

        // Compare output with expected
        let actualOutput = '';
        let passed = false;

        if (executeResult.output) {
          actualOutput = executeResult.output.trim();
          // Normalize output for comparison
          const normalizedActual = actualOutput.replace(/\s+/g, '');
          const normalizedExpected = testCase.expectedOutput.replace(/\s+/g, '');
          passed = normalizedActual === normalizedExpected;
        }

        if (passed) {
          passedTests++;
        }

        testResults.push({
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: actualOutput || (executeResult.error || 'No output'),
          passed,
          hidden: testCase.hidden
        });

      } catch (error) {
        console.error('Test execution error:', error);
        testResults.push({
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: 'Execution failed',
          passed: false,
          hidden: testCase.hidden
        });
      }
    }

    const allPassed = passedTests === problem.testCases.length;
    const status = allPassed ? 'Accepted' : 
                   passedTests > 0 ? 'Wrong Answer' : 
                   'Runtime Error';

    return NextResponse.json({
      testResults,
      totalTests: problem.testCases.length,
      passedTests,
      status: { description: status },
      time: `${totalExecutionTime}ms`
    });

  } catch (error) {
    console.error('Run tests error:', error);
    return NextResponse.json(
      {
        testResults: [],
        totalTests: 0,
        passedTests: 0,
        status: { description: 'Internal Error' },
        time: '0ms'
      },
      { status: 500 }
    );
  }
} 