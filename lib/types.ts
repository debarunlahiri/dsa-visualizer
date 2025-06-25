export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: {
    [key: string]: string; // language -> code
  };
  testCases: {
    input: string;
    expectedOutput: string;
    hidden?: boolean; // Some test cases can be hidden like in LeetCode
  }[];
}

export interface TestCaseResult {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  hidden?: boolean;
}

export interface SubmissionResult {
  stdout: string;
  stderr: string;
  compile_output: string;
  time: string;
  memory: number;
  status: {
    description: string;
  };
  testResults?: TestCaseResult[];
  totalTests?: number;
  passedTests?: number;
}

export interface ExecutionResult {
  output?: string;
  error?: string;
  executionTime?: number;
}

export interface Language {
  id: number;
  name: string;
  extension: string;
  monacoLanguage: string;
} 