import { Language } from './types';

export const LANGUAGES: Language[] = [
  {
    id: 63,
    name: 'JavaScript',
    extension: 'js',
    monacoLanguage: 'javascript',
  },
  {
    id: 71,
    name: 'Python',
    extension: 'py',
    monacoLanguage: 'python',
  },
  {
    id: 62,
    name: 'Java',
    extension: 'java',
    monacoLanguage: 'java',
  },
  {
    id: 54,
    name: 'C++',
    extension: 'cpp',
    monacoLanguage: 'cpp',
  },
];

export const DEFAULT_LANGUAGE = LANGUAGES[0]; // JavaScript

export const DIFFICULTY_COLORS = {
  Easy: 'text-green-500',
  Medium: 'text-yellow-500',
  Hard: 'text-red-500',
} as const; 