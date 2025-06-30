import { CodingPracticeDashboard } from '@/components/CodingPracticeDashboard'
import { generateMetadata as createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
  title: 'Coding Practice & Compiler',
  description: 'Practice coding with our interactive online compiler. Write, run, and test your code in multiple programming languages. Perfect for algorithm implementation and debugging.',
  keywords: [
    'online compiler',
    'coding practice',
    'code editor',
    'programming practice',
    'algorithm implementation',
    'code testing',
    'debugging',
    'javascript compiler',
    'python compiler',
    'coding environment'
  ],
  path: '/practice',
  type: 'website',
})

export default function PracticePage() {
  return <CodingPracticeDashboard />
} 