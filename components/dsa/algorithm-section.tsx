import type React from "react"
import { cn } from "@/lib/utils"

interface AlgorithmSectionProps {
  explanationSlot?: React.ReactNode // Optional now
  visualizerSlot: React.ReactNode
  codeTabsSlot?: React.ReactNode // Optional now
  id: string
  className?: string
  title?: string // For a potential section title if needed, distinct from visualizer title
}

export function AlgorithmSection({
  explanationSlot,
  visualizerSlot,
  codeTabsSlot,
  id,
  className,
  title,
}: AlgorithmSectionProps) {
  return (
    <section id={id} className={cn("py-6 md:py-10 border-b border-white/5 last:border-b-0", className)}>
      <div className="container mx-auto px-2 sm:px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 md:mb-8 text-center">{title}</h2>}
        {explanationSlot}
        <div className="my-6 md:my-8">{visualizerSlot}</div>
        {codeTabsSlot}
      </div>
    </section>
  )
}
