import { generateMetadata as createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
  title: 'Document Viewer - PDF, DOCX, TXT Reader',
  description: 'Universal document viewer for PDF, DOCX, DOC, TXT, and Markdown files. View documents directly in your browser with full-featured reading capabilities.',
  keywords: [
    'document viewer',
    'PDF viewer',
    'DOCX reader',
    'document reader',
    'file viewer',
    'browser document viewer',
    'online PDF reader',
    'text file viewer',
    'markdown viewer',
    'document preview',
    'web-based reader'
  ],
  path: '/documents',
  type: 'website',
})

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 