'use client';

import { useEffect, useRef } from 'react';
import { Terminal, Clock, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface ExecutionResult {
  output?: string;
  error?: string;
  executionTime?: number;
}

interface OutputConsoleProps {
  result: ExecutionResult | null;
  isExecuting: boolean;
  language?: string;
}

export function OutputConsole({ result, isExecuting, language = 'javascript' }: OutputConsoleProps) {
  const outputRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [result, isExecuting]);

  const formatOutput = (text: string) => {
    // Split by lines and format each line
    return text.split('\n').map((line, index) => {
      // Handle different types of console output
      if (line.startsWith('⚠️')) {
        return (
          <div key={index} className="flex items-start gap-2 text-yellow-400">
            <span className="text-yellow-400">⚠️</span>
            <span>{line.substring(2).trim()}</span>
          </div>
        );
      } else if (line.startsWith('ℹ️')) {
        return (
          <div key={index} className="flex items-start gap-2 text-blue-400">
            <span className="text-blue-400">ℹ️</span>
            <span>{line.substring(2).trim()}</span>
          </div>
        );
      } else if (line.startsWith('Return value:')) {
        return (
          <div key={index} className="flex items-start gap-2 text-purple-400">
            <span className="text-purple-400">→</span>
            <span>{line}</span>
          </div>
        );
      } else {
        return (
          <div key={index} className="flex items-start gap-2">
            <span className="text-gray-400 dark:text-gray-500 text-xs mt-0.5 font-mono">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-gray-800 dark:text-gray-200">{line || ' '}</span>
          </div>
        );
      }
    });
  };

  const formatError = (error: string) => {
    // Split error by lines and format stack trace
    const lines = error.split('\n');
    return lines.map((line, index) => {
      if (line.trim().startsWith('at ') || line.includes('(') && line.includes(')')) {
        // Stack trace line
        return (
          <div key={index} className="text-red-300 text-sm ml-4 opacity-80">
            {line}
          </div>
        );
      } else {
        // Error message
        return (
          <div key={index} className="text-red-400 font-medium">
            {line}
          </div>
        );
      }
    });
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-[#2B2B2B] border-l border-gray-200 dark:border-gray-700">
      {/* Console Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-[#3C3F41] border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Console</span>
        </div>
        
        {result?.executionTime && (
          <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
            <Clock className="w-3 h-3" />
            <span>{result.executionTime}ms</span>
          </div>
        )}
      </div>

      {/* Console Content */}
      <div 
        ref={outputRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-sm leading-relaxed bg-gray-50 dark:bg-[#2B2B2B]"
        style={{ 
          fontFamily: 'JetBrains Mono, Consolas, Monaco, "Courier New", monospace',
        }}
      >
        {/* Loading State */}
        {isExecuting && (
          <div className="flex items-center gap-3 text-blue-400 mb-4">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Executing code...</span>
          </div>
        )}

        {/* Execution Results */}
        {result && !isExecuting && (
          <div className="space-y-2">
            {/* Success Output */}
            {result.output && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Output:</span>
                </div>
                <div className="bg-gray-100 dark:bg-[#1E1E1E] rounded-md p-3 border border-gray-300 dark:border-gray-700">
                  <div className="space-y-1">
                    {formatOutput(result.output)}
                  </div>
                </div>
              </div>
            )}

            {/* Error Output */}
            {result.error && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-red-400 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="font-medium">Error:</span>
                </div>
                <div className="bg-red-50 dark:bg-[#2D1B1B] rounded-md p-3 border border-red-300 dark:border-red-800">
                  <div className="space-y-1">
                    {formatError(result.error)}
                  </div>
                </div>
              </div>
            )}

            {/* Execution Time */}
            {result.executionTime && (
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-3 pt-2 border-t border-gray-300 dark:border-gray-700">
                Execution completed in {result.executionTime}ms
              </div>
            )}
          </div>
        )}

        {/* Welcome Message */}
        {!result && !isExecuting && (
          <div className="text-gray-600 dark:text-gray-500 text-center py-8">
            <Terminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Welcome to the Console</p>
            <p className="text-sm">
              Click the <span className="text-green-400 font-medium">Run</span> button or press{' '}
              <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Ctrl+Enter</kbd>{' '}
              to execute your code.
            </p>
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-600">
              <p>• Output will appear here</p>
              <p>• Errors will be highlighted in red</p>
              <p>• Execution time will be displayed</p>
            </div>
          </div>
        )}
      </div>

      {/* Console Footer */}
      <div className="px-4 py-2 bg-white dark:bg-[#3C3F41] border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>
            {isExecuting ? 'Running...' : result ? 'Ready' : 'Waiting for execution'}
          </span>
          <div className="flex items-center gap-4">
            <span>{language.charAt(0).toUpperCase() + language.slice(1)} Runtime</span>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${
                isExecuting ? 'bg-yellow-400 animate-pulse' : 
                result?.error ? 'bg-red-400' : 
                result?.output ? 'bg-green-400' : 'bg-gray-500'
              }`} />
              <span className="text-xs">
                {isExecuting ? 'Executing' : 
                 result?.error ? 'Error' : 
                 result?.output ? 'Success' : 'Idle'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 