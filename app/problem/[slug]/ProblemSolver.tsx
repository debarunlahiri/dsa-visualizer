'use client';

import { useState, useEffect } from 'react';
import { ProblemDescription } from '@/components/ProblemDescription';
import { CodeEditor } from '@/components/CodeEditor';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Problem, Language } from '@/lib/types';
import { DEFAULT_LANGUAGE } from '@/lib/constants';

interface ProblemSolverProps {
  problem: Problem;
}

export function ProblemSolver({ problem }: ProblemSolverProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [code, setCode] = useState('');

  // Update code when language changes
  useEffect(() => {
    const languageKey = selectedLanguage.monacoLanguage;
    const starterCode = problem.starterCode[languageKey] || '';
    setCode(starterCode);
  }, [selectedLanguage, problem]);

  // Initialize with default language starter code
  useEffect(() => {
    const defaultLanguageKey = DEFAULT_LANGUAGE.monacoLanguage;
    const starterCode = problem.starterCode[defaultLanguageKey] || '';
    setCode(starterCode);
  }, [problem]);

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Mobile Layout - Stack Vertically */}
      <div className="md:hidden h-full flex flex-col">
        <div className="h-1/2 border-b border-gray-200 dark:border-gray-700">
          <ProblemDescription problem={problem} />
        </div>
        <div className="h-1/2">
          <CodeEditor
            initialCode={code}
            problem={problem}
            onLanguageChange={handleLanguageChange}
            onCodeChange={handleCodeChange}
          />
        </div>
      </div>

      {/* Desktop Layout - Split Screen */}
      <div className="hidden md:block h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} minSize={30}>
            <ProblemDescription problem={problem} />
          </ResizablePanel>
          <ResizableHandle className="w-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors" />
          <ResizablePanel defaultSize={50} minSize={30}>
            <CodeEditor
              initialCode={code}
              problem={problem}
              onLanguageChange={handleLanguageChange}
              onCodeChange={handleCodeChange}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
} 