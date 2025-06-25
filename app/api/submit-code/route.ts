import { NextRequest, NextResponse } from 'next/server';
import { LANGUAGES } from '@/lib/constants';
import { CodingPracticeService } from '@/lib/coding-practice-service';

interface SubmitCodeRequest {
  code: string;
  language_id: number;
  input: string;
  // Optional Supabase tracking fields
  user_id?: string;
  problem_slug?: string;
  problem_title?: string;
  test_cases_passed?: number;
  total_test_cases?: number;
}

interface SubmitCodeResponse {
  stdout: string;
  stderr: string;
  compile_output: string;
  time: string;
  memory: number;
  status: {
    description: string;
  };
}

export async function POST(request: NextRequest): Promise<NextResponse<SubmitCodeResponse>> {
  try {
    const body: SubmitCodeRequest = await request.json();
    const { 
      code, 
      language_id, 
      input, 
      user_id, 
      problem_slug, 
      problem_title,
      test_cases_passed = 0,
      total_test_cases = 1
    } = body;

    // Validate input
    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        {
          stdout: '',
          stderr: 'Invalid code provided',
          compile_output: '',
          time: '0ms',
          memory: 0,
          status: { description: 'Compilation Error' }
        },
        { status: 400 }
      );
    }

    // Find language by ID
    const language = LANGUAGES.find(lang => lang.id === language_id);
    if (!language) {
      return NextResponse.json(
        {
          stdout: '',
          stderr: `Language with ID ${language_id} is not supported`,
          compile_output: '',
          time: '0ms',
          memory: 0,
          status: { description: 'Compilation Error' }
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
          stdout: '',
          stderr: `Language ${language.name} is not supported`,
          compile_output: '',
          time: '0ms',
          memory: 0,
          status: { description: 'Compilation Error' }
        },
        { status: 400 }
      );
    }

    // Use code as-is for direct execution
    let finalCode = code;

    // Call the existing execute API
    const executeResponse = await fetch(`${request.url.replace('/submit-code', '/execute')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: finalCode,
        language: mappedLanguage
      }),
    });

    const executeResult = await executeResponse.json();

    // Transform the response to match Judge0-like format
    const submitResponse: SubmitCodeResponse = {
      stdout: executeResult.output || '',
      stderr: executeResult.error || '',
      compile_output: executeResult.error ? executeResult.error : '',
      time: executeResult.executionTime ? `${executeResult.executionTime}ms` : '0ms',
      memory: 0, // Not available from our execute API
      status: {
        description: executeResult.error ? 'Runtime Error' : 'Accepted'
      }
    };

    // Save to Supabase if tracking fields are provided
    if (user_id && problem_slug && problem_title) {
      try {
        const executionTime = executeResult.executionTime || 0;
        const status = executeResult.error ? 'failed' : 
                      test_cases_passed === total_test_cases ? 'completed' : 'attempted';

        await CodingPracticeService.savePractice({
          user_id,
          problem_slug,
          problem_title,
          language: language.name,
          code,
          status,
          execution_time: executionTime,
          test_cases_passed,
          total_test_cases
        });
      } catch (supabaseError) {
        // Log the error but don't fail the submission
        console.error('Failed to save practice to Supabase:', supabaseError);
      }
    }

    return NextResponse.json(submitResponse);

  } catch (error) {
    console.error('Submit code error:', error);
    return NextResponse.json(
      {
        stdout: '',
        stderr: 'Internal server error during code execution',
        compile_output: '',
        time: '0ms',
        memory: 0,
        status: { description: 'Internal Error' }
      },
      { status: 500 }
    );
  }
} 