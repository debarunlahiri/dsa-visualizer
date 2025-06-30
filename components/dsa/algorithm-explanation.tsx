import React from "react"
import { cn } from "@/lib/utils"
import { Math } from "@/components/ui/math"

interface AlgorithmExplanationProps {
  children: React.ReactNode
  className?: string
}

// Function to process text and convert $$...$$ to Math components
function processTextWithMath(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const mathRegex = /\$\$(.*?)\$\$/g
  let lastIndex = 0
  let match

  while ((match = mathRegex.exec(text)) !== null) {
    // Add text before the math
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    
    // Add the math component
    parts.push(<Math key={match.index}>{match[1]}</Math>)
    
    lastIndex = match.index + match[0].length
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }
  
  return parts.length > 0 ? parts : [text]
}

// Recursively process React nodes to find and convert math expressions
function processChildren(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child, index) => {
    if (typeof child === 'string') {
      const processed = processTextWithMath(child)
      return processed.length === 1 ? processed[0] : <span key={index}>{processed}</span>
    }
    
    if (React.isValidElement(child) && child.props && typeof child.props === 'object' && 'children' in child.props) {
      const childProps = child.props as { children: React.ReactNode }
      return React.cloneElement(child as React.ReactElement<any>, {
        children: processChildren(childProps.children)
      })
    }
    
    return child
  })
}

export function AlgorithmExplanation({ children, className }: AlgorithmExplanationProps) {
  const processedChildren = processChildren(children)
  
  return (
    <div
      className={cn(
        "prose prose-sm sm:prose-base lg:prose-lg prose-invert max-w-none",
        "prose-headings:text-blue-400 prose-h2:mb-3 prose-h2:mt-6 prose-h3:text-blue-300 prose-h3:mb-2 prose-h3:mt-5",
        "prose-p:text-gray-300 prose-p:leading-relaxed",
        "prose-li:text-gray-300 prose-ol:text-gray-300 prose-ul:text-gray-300",
        "prose-a:text-blue-400 hover:prose-a:text-blue-300",
        "prose-strong:text-white",
        "prose-code:text-amber-400 prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-xs",
        "prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-md prose-pre:p-0",
        "p-4 md:p-6 mb-6 md:mb-8",
        // Text styling for the new dark theme
        "[&_*]:text-gray-300 [&_h2]:text-blue-400 [&_h3]:text-blue-300 [&_strong]:text-white",
        "[&_li]:text-gray-300 [&_ol]:text-gray-300 [&_ul]:text-gray-300 [&_p]:text-gray-300",
        className,
      )}
    >
      {processedChildren}
    </div>
  )
}
