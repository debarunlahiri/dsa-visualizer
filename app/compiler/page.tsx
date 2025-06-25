'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { CompilerEditor } from '@/components/CompilerEditor';
import { OutputConsole } from '@/components/OutputConsole';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Settings, ArrowLeft, Code2, Terminal, GripVertical } from 'lucide-react';
import Link from 'next/link';
import { SimpleThemeToggle } from '@/components/theme-toggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ExecutionResult {
  output?: string;
  error?: string;
  executionTime?: number;
}

export default function CompilerPage() {
  const getDefaultCode = (language: string) => {
    switch (language) {
      case 'javascript':
        return `// Welcome to the Online Compiler
console.log("Hello, Compiler!");

// Try some JavaScript code:
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled numbers:", doubled);

// Calculate factorial
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log("Factorial of 5:", factorial(5));`;

      case 'python':
        return `# Welcome to the Online Compiler
print("Hello, Compiler!")

# Try some Python code:
numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
print("Doubled numbers:", doubled)

# Calculate factorial
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print("Factorial of 5:", factorial(5))`;

      case 'java':
        return `// Welcome to the Online Compiler
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Compiler!");
        
        // Try some Java code:
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.print("Doubled numbers: [");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] * 2);
            if (i < numbers.length - 1) System.out.print(", ");
        }
        System.out.println("]");
        
        // Calculate factorial
        System.out.println("Factorial of 5: " + factorial(5));
    }
    
    public static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
}`;

      case 'cpp':
        return `// Welcome to the Online Compiler
#include <iostream>
#include <vector>
using namespace std;

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    cout << "Hello, Compiler!" << endl;
    
    // Try some C++ code:
    vector<int> numbers = {1, 2, 3, 4, 5};
    cout << "Doubled numbers: [";
    for (int i = 0; i < numbers.size(); i++) {
        cout << numbers[i] * 2;
        if (i < numbers.size() - 1) cout << ", ";
    }
    cout << "]" << endl;
    
    // Calculate factorial
    cout << "Factorial of 5: " << factorial(5) << endl;
    
    return 0;
}`;

      default:
        return '// Select a language to start coding';
    }
  };

  const [code, setCode] = useState(getDefaultCode('javascript'));
  const [output, setOutput] = useState<ExecutionResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  
  // Draggable resizer state
  const [leftWidth, setLeftWidth] = useState(60); // Percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load code from sessionStorage if available (from DSA algorithm pages)
  useEffect(() => {
    const storedCode = sessionStorage.getItem('compilerCode');
    const storedLanguage = sessionStorage.getItem('compilerLanguage');
    
    if (storedCode && storedLanguage) {
      setCode(storedCode);
      setSelectedLanguage(storedLanguage);
      
      // Clear the stored data after loading
      sessionStorage.removeItem('compilerCode');
      sessionStorage.removeItem('compilerLanguage');
    }
  }, []);

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
    setCode(getDefaultCode(newLanguage));
    setOutput(null); // Clear previous output
  };

  const executeCode = useCallback(async () => {
    if (!code.trim()) {
      setOutput({ error: 'No code to execute' });
      return;
    }

    setIsExecuting(true);
    setOutput(null);

    try {
      const startTime = Date.now();
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language: selectedLanguage,
        }),
      });

      const result = await response.json();
      const executionTime = Date.now() - startTime;

      if (!response.ok) {
        setOutput({
          error: result.error || 'Execution failed',
          executionTime,
        });
      } else {
        setOutput({
          output: result.output,
          error: result.error,
          executionTime,
        });
      }
    } catch (error) {
      setOutput({
        error: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setIsExecuting(false);
    }
  }, [code, selectedLanguage]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      executeCode();
    }
  }, [executeCode]);

  // Draggable resizer handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    // Constrain between 20% and 80%
    const constrainedWidth = Math.min(Math.max(newLeftWidth, 20), 80);
    setLeftWidth(constrainedWidth);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#2B2B2B] text-gray-900 dark:text-white">
      {/* Header */}
      <header className="bg-white dark:bg-[#1E1E1E] border-b border-gray-200 dark:border-gray-700 p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400">
                Online Compiler
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                Write, compile, and run code in multiple languages
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <SimpleThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* Mobile: Tabs Layout, Desktop: Side by side */}
        <div className="lg:hidden flex-1">
          <Tabs defaultValue="editor" className="h-full flex flex-col">
            <div className="border-b border-gray-200 dark:border-gray-700 p-2">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="editor" className="flex items-center space-x-2">
                  <Code2 className="h-4 w-4" />
                  <span>Editor</span>
                </TabsTrigger>
                <TabsTrigger value="output" className="flex items-center space-x-2">
                  <Terminal className="h-4 w-4" />
                  <span>Output</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="editor" className="flex-1 m-0">
              <div className="h-full flex flex-col">
                {/* Controls */}
                <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E1E1E]">
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      onClick={executeCode} 
                      disabled={isExecuting}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {isExecuting ? 'Running...' : 'Run Code'}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Press Ctrl+Enter (Cmd+Enter on Mac) to run code
                  </p>
                </div>
                
                {/* Editor */}
                <div className="flex-1">
                  <CompilerEditor
                    value={code}
                    language={selectedLanguage}
                    onChange={setCode}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="output" className="flex-1 m-0">
              <OutputConsole result={output} isExecuting={isExecuting} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop: Draggable Side by side layout */}
        <div className="hidden lg:flex flex-1" ref={containerRef}>
          {/* Left Panel - Editor */}
          <div 
            className="flex flex-col border-r border-gray-200 dark:border-gray-700"
            style={{ width: `${leftWidth}%` }}
          >
            {/* Controls */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E1E1E]">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Code Editor</h2>
                <div className="flex items-center space-x-3">
                  <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    onClick={executeCode} 
                    disabled={isExecuting}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    {isExecuting ? 'Running...' : 'Run Code'}
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Press Ctrl+Enter (Cmd+Enter on Mac) to run code
              </p>
            </div>
            
            {/* Editor */}
            <div className="flex-1">
              <CompilerEditor
                value={code}
                language={selectedLanguage}
                onChange={setCode}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          {/* Draggable Resizer */}
          <div 
            className={`w-1 bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-400 cursor-col-resize flex items-center justify-center transition-colors relative group ${
              isDragging ? 'bg-blue-500 dark:bg-blue-400' : ''
            }`}
            onMouseDown={handleMouseDown}
          >
            <div className="absolute inset-y-0 -left-1 -right-1 flex items-center justify-center">
              <GripVertical className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Right Panel - Output */}
          <div 
            className="flex flex-col"
            style={{ width: `${100 - leftWidth}%` }}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E1E1E]">
              <h2 className="text-lg font-semibold">Output Console</h2>
            </div>
            <div className="flex-1">
              <OutputConsole result={output} isExecuting={isExecuting} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 