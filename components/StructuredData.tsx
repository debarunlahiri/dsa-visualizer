import { generateStructuredData } from '@/lib/metadata'

interface StructuredDataProps {
  data: {
    title?: string
    description?: string
    path?: string
    type?: 'WebSite' | 'Article' | 'Course' | 'LearningResource'
    datePublished?: string
    dateModified?: string
    author?: string
  }
}

export function StructuredData({ data }: StructuredDataProps) {
  const structuredData = generateStructuredData(data)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 