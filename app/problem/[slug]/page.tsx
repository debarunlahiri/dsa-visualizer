import { notFound } from 'next/navigation';
import { getProblem } from '@/lib/problems';
import { ProblemSolver } from './ProblemSolver';

interface ProblemPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProblemPageProps) {
  const { slug } = await params;
  const problem = getProblem(slug);
  
  if (!problem) {
    return {
      title: 'Problem Not Found',
    };
  }

  return {
    title: `${problem.title} - Problem Solver`,
    description: problem.description.slice(0, 155) + '...',
  };
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