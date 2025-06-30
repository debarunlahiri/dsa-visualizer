import { notFound } from 'next/navigation';
import { getProblem } from '@/lib/problems';
import { ProblemSolver } from './ProblemSolver';
import { generateMetadata as createMetadata } from '@/lib/metadata';

interface ProblemPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProblemPageProps) {
  const { slug } = await params;
  const problem = getProblem(slug);
  
  if (!problem) {
    return createMetadata({
      title: 'Problem Not Found',
      description: 'The requested coding problem could not be found. Browse our collection of algorithm and data structure problems.',
      path: `/problem/${slug}`,
    });
  }

  // Create a clean description from the problem description
  const cleanDescription = problem.description
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
    .slice(0, 155) + (problem.description.length > 155 ? '...' : '');

  return createMetadata({
    title: `${problem.title} - Coding Problem`,
    description: cleanDescription,
    keywords: [
      'coding problem',
      'algorithm challenge',
      'programming problem',
      'leetcode style',
      problem.difficulty.toLowerCase(),
      'data structures',
      'algorithms',
      'problem solving',
      problem.title.toLowerCase().replace(/\s+/g, ' ')
    ],
    path: `/problem/${slug}`,
    type: 'article',
  });
}

export default async function ProblemPage({ params }: ProblemPageProps) {
  const { slug } = await params;
  const problem = getProblem(slug);

  if (!problem) {
    notFound();
  }

  return <ProblemSolver problem={problem} />;
}

// Generate static paths for known problems
export async function generateStaticParams() {
  return [
    { slug: 'two-sum' },
    { slug: 'add-two-numbers' },
    { slug: 'longest-substring-without-repeating-characters' },
  ];
} 