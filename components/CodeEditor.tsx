'use client';

import { useState, useEffect } from 'react';
import { CompilerEditor } from './CompilerEditor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './ui/resizable';
import { Play, Send, Loader2, CheckCircle, XCircle, ArrowLeft, GripHorizontal } from 'lucide-react';
import { LANGUAGES, DEFAULT_LANGUAGE } from '@/lib/constants';
import { Language, SubmissionResult, Problem, TestCaseResult } from '@/lib/types';

interface CodeEditorProps {
  initialCode?: string;
  problem?: Problem;
  onLanguageChange?: (language: Language) => void;
  onCodeChange?: (code: string) => void;
  onSubmit?: (data: { code: string; language: string; languageId: number; input?: string }) => Promise<void>;
  onSave?: (data: { code: string; language: string; languageId: number }) => Promise<void>;
}

export function CodeEditor({ 
  initialCode = '', 
  problem,
  onLanguageChange,
  onCodeChange,
  onSubmit,
  onSave
}: CodeEditorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [testResults, setTestResults] = useState<TestCaseResult[]>([]);

  // Update code when initialCode changes
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  // Debug: Log when problem changes
  useEffect(() => {
    console.log('Problem received in CodeEditor:', problem);
  }, [problem]);

  const handleLanguageChange = (languageId: string) => {
    const language = LANGUAGES.find(lang => lang.id.toString() === languageId);
    if (language) {
      setSelectedLanguage(language);
      onLanguageChange?.(language);
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleRunCode = async () => {
    if (!code.trim() || !problem) return;

    setIsRunning(true);
    setResult(null);
    setTestResults([]);

    try {
      // Run predefined test cases
      const response = await fetch('/api/run-tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language_id: selectedLanguage.id,
          problemId: problem.id,
        }),
      });

      const data = await response.json();
      console.log('Test results received:', data);
      setTestResults(data.testResults || []);
      setResult({
        stdout: `${data.passedTests}/${data.totalTests} test cases passed`,
        stderr: '',
        compile_output: '',
        time: data.time,
        memory: 0,
        status: data.status,
        testResults: data.testResults,
        totalTests: data.totalTests,
        passedTests: data.passedTests
      });
    } catch (error) {
      console.error('Run code error:', error);
      setResult({
        stdout: '',
        stderr: 'Failed to execute code. Please try again.',
        compile_output: '',
        time: '0ms',
        memory: 0,
        status: { description: 'Internal Error' }
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSave = async () => {
    if (!code.trim() || !onSave) return;

    try {
      await onSave({
        code,
        language: selectedLanguage.name,
        languageId: selectedLanguage.id
      });
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) return;

    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit({
          code,
          language: selectedLanguage.name,
          languageId: selectedLanguage.id
        });
      } else {
        // Default behavior
        console.log('Submitting solution:', {
          language: selectedLanguage.name,
          code,
          timestamp: new Date().toISOString()
        });
        alert('Solution submitted! Check console for details.');
      }
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      handleRunCode();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#3C3F41]">
        <div className="flex items-center gap-4">
          <Link href="/problems">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <Select value={selectedLanguage.id.toString()} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((language) => (
                <SelectItem key={language.id} value={language.id.toString()}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleRunCode}
            disabled={isRunning || !code.trim() || !problem}
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            {isRunning ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            Run Tests
          </Button>
          {onSave && (
            <Button
              onClick={handleSave}
              disabled={!code.trim()}
              size="sm"
              variant="secondary"
            >
              Save Practice
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !code.trim()}
            size="sm"
            variant="outline"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            Submit
          </Button>
        </div>
      </div>

            {/* Code Editor with Resizable Test Results */}
      <div className="flex-1 min-h-0">
        {problem ? (
          <ResizablePanelGroup direction="vertical">
            {/* Code Editor Panel */}
            <ResizablePanel defaultSize={70} minSize={30}>
              <CompilerEditor
                value={code}
                onChange={handleCodeChange}
                language={selectedLanguage.monacoLanguage}
                onKeyDown={handleKeyDown}
              />
            </ResizablePanel>
            
            {/* Resizable Handle */}
            <ResizableHandle className="h-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                <GripHorizontal className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:text-gray-600 dark:group-hover:text-gray-400 transition-colors" />
              </div>
            </ResizableHandle>
            
            {/* Test Results Panel */}
            <ResizablePanel defaultSize={30} minSize={20} maxSize={70}>
              <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {isRunning ? 'Running Tests...' : 'Test Results'}
                      </h3>
                      {isRunning && (
                        <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                      )}
                      {result?.status && !isRunning && (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          result.status.description === 'Accepted' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {result.status.description}
                        </span>
                      )}
                    </div>
                    {!isRunning && result && (
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span>{result?.passedTests}/{result?.totalTests} passed</span>
                        {result?.time && (
                          <span>Runtime: {result.time}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-3">
                    {isRunning ? (
                      <div className="flex items-center justify-center py-8 text-gray-500 dark:text-gray-400">
                        <div className="text-center">
                          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                          <p className="text-sm">Running test cases...</p>
                        </div>
                      </div>
                    ) : testResults.length > 0 ? (
                      testResults.map((testResult, index) => (
                        <div key={index} className={`p-3 rounded-md border ${
                          testResult.passed 
                            ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' 
                            : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {testResult.passed ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-600" />
                              )}
                              <span className="text-sm font-medium">
                                Test Case {index + 1}
                                {testResult.hidden && (
                                  <span className="ml-2 text-xs text-gray-500">(Hidden)</span>
                                )}
                              </span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${
                              testResult.passed 
                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' 
                                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200'
                            }`}>
                              {testResult.passed ? 'Passed' : 'Failed'}
                            </span>
                          </div>
                          
                          {!testResult.hidden && (
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium text-gray-700 dark:text-gray-300">Input:</span>
                                <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">
                                  {testResult.input}
                                </pre>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700 dark:text-gray-300">Expected:</span>
                                <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">
                                  {testResult.expectedOutput}
                                </pre>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700 dark:text-gray-300">Your Output:</span>
                                <pre className={`mt-1 p-2 rounded text-xs font-mono ${
                                  testResult.passed 
                                    ? 'bg-green-100 dark:bg-green-900/30' 
                                    : 'bg-red-100 dark:bg-red-900/30'
                                }`}>
                                  {testResult.actualOutput}
                                </pre>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center py-8 text-gray-500 dark:text-gray-400">
                        <p className="text-sm">No test results yet. Click "Run Tests" to see results.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <CompilerEditor
            value={code}
            onChange={handleCodeChange}
            language={selectedLanguage.monacoLanguage}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>

    </div>
  );
} 