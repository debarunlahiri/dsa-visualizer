import type { Metadata } from 'next'

export interface MetadataProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  path?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
}

const defaultKeywords = [
  'data structures',
  'algorithms',
  'programming',
  'computer science',
  'coding',
  'software engineering',
  'interview preparation',
  'leetcode',
  'hackerrank',
  'DSA',
  'algorithm visualization',
  'sorting algorithms',
  'searching algorithms',
  'binary tree',
  'graph algorithms',
  'dynamic programming',
  'greedy algorithms',
  'time complexity',
  'space complexity',
  'big o notation',
  'coding practice',
  'programming problems',
  'technical interview',
  'software developer',
  'computer programming'
]

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dsa.summitcodeworks.com'
const siteName = 'DSA Visualizer'
const siteDescription = 'Master Data Structures and Algorithms through interactive visualizations, coding practice, and comprehensive learning resources. Perfect for interview preparation and skill development.'

export function generateMetadata({
  title,
  description = siteDescription,
  keywords = [],
  image = '/og-image.png',
  path = '',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'DSA Visualizer Team',
  section
}: MetadataProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Interactive Algorithm Learning Platform`
  const url = `${baseUrl}${path}`
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`
  
  const allKeywords = [...new Set([...defaultKeywords, ...keywords])]

  return {
    title: fullTitle,
    description,
    keywords: allKeywords.join(', '),
    authors: [{ name: author }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
      locale: 'en_US',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@dsavisualizer',
      site: '@dsavisualizer',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      bing: process.env.BING_VERIFICATION,
    },
  }
}

export function generateStructuredData({
  title,
  description = siteDescription,
  path = '',
  type = 'WebSite',
  datePublished,
  dateModified,
  author = 'DSA Visualizer Team',
}: {
  title?: string
  description?: string
  path?: string
  type?: 'WebSite' | 'Article' | 'Course' | 'LearningResource'
  datePublished?: string
  dateModified?: string
  author?: string
} = {}) {
  const url = `${baseUrl}${path}`
  const name = title ? `${title} | ${siteName}` : siteName

  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
  }

  if (type === 'WebSite') {
    return {
      ...baseStructuredData,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/problems?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    }
  }

  if (type === 'Course' || type === 'LearningResource') {
    return {
      ...baseStructuredData,
      '@type': 'Course',
      educationalLevel: 'Intermediate',
      teaches: [
        'Data Structures',
        'Algorithms',
        'Programming',
        'Computer Science',
        'Problem Solving',
      ],
      provider: {
        '@type': 'Organization',
        name: siteName,
      },
      ...(datePublished && { datePublished }),
      ...(dateModified && { dateModified }),
    }
  }

  if (type === 'Article') {
    return {
      ...baseStructuredData,
      '@type': 'TechArticle',
      headline: title,
      ...(datePublished && { datePublished }),
      ...(dateModified && { dateModified }),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
    }
  }

  return baseStructuredData
} 