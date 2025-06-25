import { NextRequest, NextResponse } from 'next/server';

interface ExecuteRequest {
  code: string;
  language: string;
}

interface ExecuteResponse {
  output?: string;
  error?: string;
}

// Judge0 language IDs
const LANGUAGE_IDS = {
  java: 62,    // Java (OpenJDK 13.0.1)
  cpp: 54,     // C++ (GCC 9.2.0)
  python: 71,  // Python (3.8.1)
  javascript: 63, // JavaScript (Node.js 12.14.0)
};

export async function POST(request: NextRequest): Promise<NextResponse<ExecuteResponse>> {
  try {
    const body: ExecuteRequest = await request.json();
    const { code, language } = body;

    // Validate input
    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Invalid code provided' },
        { status: 400 }
      );
    }

    if (!language || !Object.keys(LANGUAGE_IDS).includes(language)) {
      return NextResponse.json(
        { error: `Language '${language}' is not supported. Supported languages: ${Object.keys(LANGUAGE_IDS).join(', ')}` },
        { status: 400 }
      );
    }

    // Execute code using Judge0 API
    const result = await executeWithJudge0(code, language);
    return NextResponse.json(result);

  } catch (error) {
    console.error('External execution error:', error);
    return NextResponse.json(
      { error: 'Internal server error during code execution' },
      { status: 500 }
    );
  }
}

async function executeWithJudge0(code: string, language: string): Promise<ExecuteResponse> {
  try {
    // Judge0 API endpoint (you can use the free tier or deploy your own)
    const JUDGE0_API = 'https://judge0-ce.p.rapidapi.com';
    
    // Prepare the submission
    let sourceCode = code;
    
    // Add main method wrapper for Java if needed
    if (language === 'java' && !code.includes('public class')) {
      sourceCode = `
public class Main {
    public static void main(String[] args) {
        ${code}
    }
}`;
    }

    // Add main function wrapper for C++ if needed
    if (language === 'cpp' && !code.includes('int main')) {
      sourceCode = `
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    ${code}
    return 0;
}`;
    }

    // Submit code for execution
    const submissionResponse = await fetch(`${JUDGE0_API}/submissions?base64_encoded=false&wait=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || 'demo-key', // You'll need to set this
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      body: JSON.stringify({
        source_code: sourceCode,
        language_id: LANGUAGE_IDS[language as keyof typeof LANGUAGE_IDS],
        stdin: '',
        expected_output: ''
      })
    });

    if (!submissionResponse.ok) {
      // Fallback to local error message if Judge0 is not available
      return {
        error: `${language.toUpperCase()} execution requires external service setup. Please configure Judge0 API or use JavaScript instead.`
      };
    }

    const submissionResult = await submissionResponse.json();

    // Process the result
    if (submissionResult.status?.id === 3) { // Accepted
      return {
        output: submissionResult.stdout || 'Code executed successfully (no output)'
      };
    } else if (submissionResult.status?.id === 6) { // Compilation Error
      return {
        error: `Compilation Error:\n${submissionResult.compile_output || 'Unknown compilation error'}`
      };
    } else if (submissionResult.status?.id === 5) { // Time Limit Exceeded
      return {
        error: 'Code execution timed out'
      };
    } else if (submissionResult.status?.id === 4) { // Wrong Answer (Runtime Error)
      return {
        error: `Runtime Error:\n${submissionResult.stderr || submissionResult.message || 'Unknown runtime error'}`
      };
    } else {
      return {
        error: `Execution failed: ${submissionResult.status?.description || 'Unknown error'}`
      };
    }

  } catch (error) {
    // Fallback error handling
    return {
      error: `External execution service unavailable. ${language.toUpperCase()} execution requires additional setup.`
    };
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to execute code.' },
    { status: 405 }
  );
} 