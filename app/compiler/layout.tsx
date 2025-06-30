import { generateMetadata as createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
  title: 'Online Code Compiler & IDE',
  description: 'Free online compiler and IDE for JavaScript, Python, Java, C++. Write, compile, and run code in your browser. Perfect for algorithm implementation and testing.',
  keywords: [
    'online compiler',
    'online IDE',
    'code editor',
    'javascript compiler',
    'python compiler',
    'java compiler',
    'c++ compiler',
    'code runner',
    'programming environment',
    'algorithm testing',
    'code execution',
    'browser IDE',
    'web compiler'
  ],
  path: '/compiler',
  type: 'website',
})

export default function CompilerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 