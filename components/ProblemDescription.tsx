'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Problem } from '@/lib/types';
import { DIFFICULTY_COLORS } from '@/lib/constants';

interface ProblemDescriptionProps {
  problem: Problem;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  const formatDescription = (text: string) => {
    // Simple markdown-like formatting
    return text
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  };

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-gray-900">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {problem.title}
            </h1>
            <Badge 
              variant="secondary" 
              className={`${DIFFICULTY_COLORS[problem.difficulty]} border-current`}
            >
              {problem.difficulty}
            </Badge>
          </div>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ 
                __html: formatDescription(problem.description) 
              }}
            />
          </CardContent>
        </Card>

        {/* Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {problem.examples.map((example, index) => (
              <div key={index} className="space-y-3">
                <div className="font-semibold text-gray-900 dark:text-gray-100">
                  Example {index + 1}:
                </div>
                
                <div className="space-y-2">
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Input:
                    </div>
                    <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm font-mono">
                      {example.input}
                    </code>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Output:
                    </div>
                    <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm font-mono">
                      {example.output}
                    </code>
                  </div>
                  
                  {example.explanation && (
                    <div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Explanation:
                      </div>
                      <div 
                        className="text-sm text-gray-600 dark:text-gray-400"
                        dangerouslySetInnerHTML={{ 
                          __html: formatDescription(example.explanation) 
                        }}
                      />
                    </div>
                  )}
                </div>
                
                {index < problem.examples.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Constraints */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Constraints</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {problem.constraints.map((constraint, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="mr-2">•</span>
                  <span 
                    dangerouslySetInnerHTML={{ 
                      __html: formatDescription(constraint) 
                    }}
                  />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 