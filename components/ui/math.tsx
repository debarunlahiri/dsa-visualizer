"use client"

import { InlineMath, BlockMath } from 'react-katex'

interface MathProps {
  children: string
  block?: boolean
}

export function Math({ children, block = false }: MathProps) {
  // Remove $$ delimiters if present
  const cleanMath = children.replace(/^\$\$|\$\$$/g, '').replace(/^\$|\$$/g, '')
  
  if (block) {
    return <BlockMath math={cleanMath} />
  }
  
  return <InlineMath math={cleanMath} />
} 