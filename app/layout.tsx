import type { Metadata } from 'next'
import './globals.css'
import 'katex/dist/katex.min.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { generateMetadata as createMetadata, generateStructuredData } from '@/lib/metadata'

export const metadata: Metadata = createMetadata({
  title: '',
  description: 'Master Data Structures and Algorithms through interactive visualizations, coding practice, and comprehensive learning resources. Perfect for technical interview preparation.',
  keywords: [
    'data structures and algorithms',
    'algorithm visualization',
    'coding interview preparation',
    'interactive learning',
    'programming tutorials',
    'DSA practice',
    'leetcode preparation',
    'software engineering',
    'computer science education'
  ],
  path: '',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = generateStructuredData({
    type: 'WebSite'
  })

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-black text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster 
            theme="dark"
            className="dark:bg-black dark:text-white dark:border-white/10"
            toastOptions={{
              className: "dark:bg-black/90 dark:text-white dark:border-white/20 backdrop-blur-lg",
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
