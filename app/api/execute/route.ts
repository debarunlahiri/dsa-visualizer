import { NextRequest, NextResponse } from 'next/server';
import * as vm from 'vm';
import { spawn } from 'child_process';

interface ExecuteRequest {
  code: string;
  language: string;
}

interface ExecuteResponse {
  output?: string;
  error?: string;
}

// Security: Timeout for code execution (5 seconds)
const EXECUTION_TIMEOUT = 5000;

// Security: Memory limit for VM (64MB)
const MEMORY_LIMIT = 64 * 1024 * 1024;

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

    const supportedLanguages = ['javascript', 'python', 'java', 'cpp'];
    if (!language || !supportedLanguages.includes(language)) {
      return NextResponse.json(
        { error: `Language '${language}' is not supported. Supported languages: ${supportedLanguages.join(', ')}` },
        { status: 400 }
      );
    }

    // Check if Java/C++ are available in deployment environment
    // Vercel sets multiple environment variables we can check
    const isVercel = process.env.VERCEL || process.env.VERCEL_ENV || process.env.VERCEL_URL;
    
    if ((language === 'java' || language === 'cpp') && isVercel) {
      return NextResponse.json(
        { error: `${language.toUpperCase()} execution is not available in the current deployment environment. Please try JavaScript instead.` },
        { status: 400 }
      );
    }

    // Security: Check for potentially dangerous patterns
    const dangerousPatterns = [
      /require\s*\(\s*['"`]fs['"`]\s*\)/,
      /require\s*\(\s*['"`]child_process['"`]\s*\)/,
      /require\s*\(\s*['"`]os['"`]\s*\)/,
      /require\s*\(\s*['"`]path['"`]\s*\)/,
      /require\s*\(\s*['"`]http['"`]\s*\)/,
      /require\s*\(\s*['"`]https['"`]\s*\)/,
      /require\s*\(\s*['"`]net['"`]\s*\)/,
      /process\./,
      /global\./,
      /__dirname/,
      /__filename/,
      /eval\s*\(/,
      /Function\s*\(/,
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(code)) {
        return NextResponse.json(
          { error: 'Code contains potentially unsafe operations' },
          { status: 400 }
        );
      }
    }

    // Execute code based on language
    let result: ExecuteResponse;
    switch (language) {
      case 'javascript':
        result = await executeJavaScript(code);
        break;
      case 'python':
        // Redirect to native Python runtime
        try {
          const pythonResponse = await fetch(`${request.url.replace('/api/execute', '/api/python-execute')}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });
          result = await pythonResponse.json();
        } catch (error) {
          result = { error: 'Failed to execute Python code using native runtime' };
        }
        break;
      case 'java':
      case 'cpp':
        // Redirect to external execution service
        try {
          const externalResponse = await fetch(`${request.url.replace('/api/execute', '/api/external-execute')}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, language }),
          });
          result = await externalResponse.json();
        } catch (error) {
          result = await executeJava(code); // Fallback to original (will show error message)
        }
        break;
      default:
        result = { error: `Unsupported language: ${language}` };
    }
    
    return NextResponse.json(result);

  } catch (error) {
    console.error('Execution error:', error);
    return NextResponse.json(
      { error: 'Internal server error during code execution' },
      { status: 500 }
    );
  }
}

async function executeJavaScript(code: string): Promise<ExecuteResponse> {
  return new Promise((resolve) => {
    const output: string[] = [];
    const errors: string[] = [];

    try {
      // Create a sandbox context with limited access
      const sandbox = {
        // Provide a custom console that captures output
        console: {
          log: (...args: any[]) => {
            output.push(args.map(arg => {
              if (typeof arg === 'object' && arg !== null) {
                if (Array.isArray(arg)) {
                  // Format arrays in a compact, readable way
                  return `[${arg.join(', ')}]`;
                } else {
                  // Format objects without extra spacing
                  return JSON.stringify(arg);
                }
              }
              return String(arg);
            }).join(' '));
          },
          error: (...args: any[]) => {
            errors.push(args.map(arg => {
              if (typeof arg === 'object' && arg !== null) {
                if (Array.isArray(arg)) {
                  return `[${arg.join(', ')}]`;
                } else {
                  return JSON.stringify(arg);
                }
              }
              return String(arg);
            }).join(' '));
          },
          warn: (...args: any[]) => {
            output.push('⚠️ ' + args.map(arg => {
              if (typeof arg === 'object' && arg !== null) {
                if (Array.isArray(arg)) {
                  return `[${arg.join(', ')}]`;
                } else {
                  return JSON.stringify(arg);
                }
              }
              return String(arg);
            }).join(' '));
          },
          info: (...args: any[]) => {
            output.push('ℹ️ ' + args.map(arg => {
              if (typeof arg === 'object' && arg !== null) {
                if (Array.isArray(arg)) {
                  return `[${arg.join(', ')}]`;
                } else {
                  return JSON.stringify(arg);
                }
              }
              return String(arg);
            }).join(' '));
          },
        },
        // Provide some safe built-in functions
        setTimeout: (fn: Function, delay: number) => {
          if (delay > 1000) throw new Error('setTimeout delay too long');
          return setTimeout(fn, Math.min(delay, 1000));
        },
        setInterval: () => {
          throw new Error('setInterval is not allowed');
        },
        // Math object
        Math: Math,
        // Date object (limited)
        Date: Date,
        // JSON object
        JSON: JSON,
        // Array and Object constructors
        Array: Array,
        Object: Object,
        String: String,
        Number: Number,
        Boolean: Boolean,
        RegExp: RegExp,
        // Module system (limited)
        module: {
          exports: {}
        },
        exports: {},
        // Global reference
        global: undefined,
        window: undefined,
      };

      // Create VM context
      const context = vm.createContext(sandbox);

      // Set up timeout for execution
      const timeoutId = setTimeout(() => {
        throw new Error('Code execution timed out (5 second limit)');
      }, EXECUTION_TIMEOUT);

      try {
        // Execute the code with timeout
        const result = vm.runInContext(code, context, {
          timeout: EXECUTION_TIMEOUT,
          displayErrors: true,
        });
        
        clearTimeout(timeoutId);
        
        // Check if something was exported via module.exports
        const moduleExports = context.module.exports;
        if (moduleExports && Object.keys(moduleExports).length > 0) {
          const formattedExports = typeof moduleExports === 'object' && moduleExports !== null
            ? (Array.isArray(moduleExports) ? `[${moduleExports.join(', ')}]` : JSON.stringify(moduleExports))
            : String(moduleExports);
          output.push(`Module exports: ${formattedExports}`);
        } else if (moduleExports && typeof moduleExports === 'function') {
          output.push(`Exported function: ${moduleExports.name || 'anonymous'}`);
        }
        
        // If the code returns a value, add it to output
        if (result !== undefined) {
          const formattedResult = typeof result === 'object' && result !== null
            ? (Array.isArray(result) ? `[${result.join(', ')}]` : JSON.stringify(result))
            : String(result);
          output.push(`Return value: ${formattedResult}`);
        }

        resolve({
          output: output.length > 0 ? output.join('\n') : 'Code executed successfully (no output)',
          error: errors.length > 0 ? errors.join('\n') : undefined,
        });
      } catch (vmError) {
        clearTimeout(timeoutId);
        throw vmError;
      }

    } catch (error) {
      let errorMessage = 'Unknown error occurred';
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Handle specific VM errors
        if (errorMessage.includes('Script execution timed out') || errorMessage.includes('timed out')) {
          errorMessage = 'Code execution timed out (5 second limit)';
        } else if (errorMessage.includes('out of memory')) {
          errorMessage = 'Code execution exceeded memory limit';
        } else if (errorMessage.includes('ReferenceError')) {
          errorMessage = `Reference Error: ${errorMessage}`;
        } else if (errorMessage.includes('SyntaxError')) {
          errorMessage = `Syntax Error: ${errorMessage}`;
        } else if (errorMessage.includes('TypeError')) {
          errorMessage = `Type Error: ${errorMessage}`;
        }
      }

      resolve({
        output: output.length > 0 ? output.join('\n') : undefined,
        error: errorMessage,
      });
    }
  });
}

// Python execution function
async function executePython(code: string): Promise<ExecuteResponse> {
  return new Promise((resolve) => {
    try {
      // Check if Python is available in the environment
      const { execSync } = require('child_process');
      
      try {
        execSync('python3 --version', { stdio: 'ignore' });
      } catch (error) {
        resolve({
          error: 'Python interpreter is not available in this environment. For full Python support, consider using Vercel\'s native Python runtime by creating Python functions in the /api directory.',
        });
        return;
      }

      const output: string[] = [];
      const errors: string[] = [];

      // Use spawn to run Python directly
      const python = spawn('python3', ['-c', code], {
        stdio: ['pipe', 'pipe', 'pipe'],
        timeout: EXECUTION_TIMEOUT,
      });

      python.stdout.on('data', (data) => {
        output.push(data.toString());
      });

      python.stderr.on('data', (data) => {
        errors.push(data.toString());
      });

      python.on('close', (code) => {
        resolve({
          output: output.length > 0 ? output.join('\n').trim() : 'Code executed successfully (no output)',
          error: errors.length > 0 ? errors.join('\n') : undefined,
        });
      });

      python.on('error', (error) => {
        resolve({
          error: `Python execution error: ${error.message}`,
        });
      });

    } catch (error) {
      resolve({
        error: `Python setup error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  });
}

// Java execution function
async function executeJava(code: string): Promise<ExecuteResponse> {
  return new Promise((resolve) => {
    try {
      // Double-check if we're in a serverless environment
      const isServerless = process.env.VERCEL || process.env.VERCEL_ENV || process.env.VERCEL_URL || 
                           process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY;
      
      if (isServerless) {
        resolve({
          error: 'Java execution is not available in serverless environments. Please try JavaScript instead.',
        });
        return;
      }

      // Check if Java is available in the environment
      const { execSync } = require('child_process');
      
      try {
        execSync('javac -version', { stdio: 'ignore' });
      } catch (error) {
        resolve({
          error: 'Java compiler (javac) is not available in this environment. Java execution is not supported on this deployment platform.',
        });
        return;
      }

      const fs = require('fs');
      const path = require('path');
      const os = require('os');
      
      // Extract class name from code
      const classMatch = code.match(/public\s+class\s+(\w+)/);
      const className = classMatch ? classMatch[1] : 'Main';
      
      // Ensure the code has a proper class structure
      let javaCode = code;
      if (!code.includes('public class')) {
        javaCode = `public class Main {\n    public static void main(String[] args) {\n        ${code}\n    }\n}`;
      }

      // Create temporary directory and file
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'java-'));
      const javaFile = path.join(tempDir, `${className}.java`);
      const classFile = path.join(tempDir, `${className}.class`);

      // Write Java code to temporary file
      fs.writeFileSync(javaFile, javaCode);

      const output: string[] = [];
      const errors: string[] = [];

      // Compile Java code
      const javac = spawn('javac', [javaFile], {
        stdio: ['pipe', 'pipe', 'pipe'],
        timeout: EXECUTION_TIMEOUT,
        cwd: tempDir,
      });

      javac.stdout.on('data', (data) => {
        output.push(data.toString());
      });

      javac.stderr.on('data', (data) => {
        errors.push(data.toString());
      });

      javac.on('close', (code) => {
        if (code !== 0) {
          // Cleanup
          try {
            fs.unlinkSync(javaFile);
            fs.rmdirSync(tempDir);
          } catch (e) {
            // Ignore cleanup errors
          }
          
          resolve({
            error: `Java compilation failed:\n${errors.join('\n')}`,
          });
          return;
        }

        // Run the compiled Java code
        const java = spawn('java', ['-cp', tempDir, className], {
          stdio: ['pipe', 'pipe', 'pipe'],
          timeout: EXECUTION_TIMEOUT,
        });

        const runOutput: string[] = [];
        const runErrors: string[] = [];

        java.stdout.on('data', (data) => {
          runOutput.push(data.toString());
        });

        java.stderr.on('data', (data) => {
          runErrors.push(data.toString());
        });

        java.on('close', (runCode) => {
          // Cleanup temporary files
          try {
            fs.unlinkSync(javaFile);
            if (fs.existsSync(classFile)) {
              fs.unlinkSync(classFile);
            }
            fs.rmdirSync(tempDir);
          } catch (e) {
            // Ignore cleanup errors
          }

          resolve({
            output: runOutput.length > 0 ? runOutput.join('\n').trim() : 'Code executed successfully (no output)',
            error: runErrors.length > 0 ? runErrors.join('\n') : undefined,
          });
        });

        java.on('error', (error) => {
          // Cleanup on error
          try {
            fs.unlinkSync(javaFile);
            if (fs.existsSync(classFile)) {
              fs.unlinkSync(classFile);
            }
            fs.rmdirSync(tempDir);
          } catch (e) {
            // Ignore cleanup errors
          }

          resolve({
            error: `Java execution error: ${error.message}`,
          });
        });
      });

      javac.on('error', (error) => {
        // Cleanup on error
        try {
          fs.unlinkSync(javaFile);
          fs.rmdirSync(tempDir);
        } catch (e) {
          // Ignore cleanup errors
        }

        resolve({
          error: `Java compilation error: ${error.message}`,
        });
      });

    } catch (error) {
      resolve({
        error: `Java setup error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  });
}

// C++ execution function
async function executeCpp(code: string): Promise<ExecuteResponse> {
  return new Promise((resolve) => {
    try {
      // Double-check if we're in a serverless environment
      const isServerless = process.env.VERCEL || process.env.VERCEL_ENV || process.env.VERCEL_URL || 
                           process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY;
      
      if (isServerless) {
        resolve({
          error: 'C++ execution is not available in serverless environments. Please try JavaScript instead.',
        });
        return;
      }

      // Check if C++ compiler is available in the environment
      const { execSync } = require('child_process');
      
      try {
        execSync('g++ --version', { stdio: 'ignore' });
      } catch (error) {
        resolve({
          error: 'C++ compiler (g++) is not available in this environment. C++ execution is not supported on this deployment platform.',
        });
        return;
      }

      const fs = require('fs');
      const path = require('path');
      const os = require('os');
      
      // Add necessary headers if not present
      let cppCode = code;
      if (!code.includes('#include')) {
        cppCode = `#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\n${code}`;
      }
      if (!code.includes('int main')) {
        cppCode = `${cppCode}\n\nint main() {\n    // Your code here\n    return 0;\n}`;
      }

      // Create temporary directory and files
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cpp-'));
      const cppFile = path.join(tempDir, 'program.cpp');
      const execFile = path.join(tempDir, 'program');

      // Write C++ code to temporary file
      fs.writeFileSync(cppFile, cppCode);

      const output: string[] = [];
      const errors: string[] = [];

      // Compile C++ code
      const gpp = spawn('g++', ['-o', execFile, cppFile], {
        stdio: ['pipe', 'pipe', 'pipe'],
        timeout: EXECUTION_TIMEOUT,
        cwd: tempDir,
      });

      gpp.stdout.on('data', (data) => {
        output.push(data.toString());
      });

      gpp.stderr.on('data', (data) => {
        errors.push(data.toString());
      });

      gpp.on('close', (code) => {
        if (code !== 0) {
          // Cleanup
          try {
            fs.unlinkSync(cppFile);
            fs.rmdirSync(tempDir);
          } catch (e) {
            // Ignore cleanup errors
          }
          
          resolve({
            error: `C++ compilation failed:\n${errors.join('\n')}`,
          });
          return;
        }

        // Run the compiled C++ program
        const program = spawn(execFile, [], {
          stdio: ['pipe', 'pipe', 'pipe'],
          timeout: EXECUTION_TIMEOUT,
        });

        const runOutput: string[] = [];
        const runErrors: string[] = [];

        program.stdout.on('data', (data) => {
          runOutput.push(data.toString());
        });

        program.stderr.on('data', (data) => {
          runErrors.push(data.toString());
        });

        program.on('close', (runCode) => {
          // Cleanup temporary files
          try {
            fs.unlinkSync(cppFile);
            if (fs.existsSync(execFile)) {
              fs.unlinkSync(execFile);
            }
            fs.rmdirSync(tempDir);
          } catch (e) {
            // Ignore cleanup errors
          }

          resolve({
            output: runOutput.length > 0 ? runOutput.join('\n').trim() : 'Code executed successfully (no output)',
            error: runErrors.length > 0 ? runErrors.join('\n') : undefined,
          });
        });

        program.on('error', (error) => {
          // Cleanup on error
          try {
            fs.unlinkSync(cppFile);
            if (fs.existsSync(execFile)) {
              fs.unlinkSync(execFile);
            }
            fs.rmdirSync(tempDir);
          } catch (e) {
            // Ignore cleanup errors
          }

          resolve({
            error: `C++ execution error: ${error.message}`,
          });
        });
      });

      gpp.on('error', (error) => {
        // Cleanup on error
        try {
          fs.unlinkSync(cppFile);
          fs.rmdirSync(tempDir);
        } catch (e) {
          // Ignore cleanup errors
        }

        resolve({
          error: `C++ compilation error: ${error.message}`,
        });
      });

    } catch (error) {
      resolve({
        error: `C++ setup error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  });
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to execute code.' },
    { status: 405 }
  );
} 