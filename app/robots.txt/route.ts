import { NextResponse } from 'next/server'

export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dsa-animations.vercel.app'
  
  const robotsTxt = `User-agent: *
Allow: /

# Disallow admin or private routes if any
Disallow: /api/

# Allow important directories
Allow: /problems/
Allow: /practice/
Allow: /patterns/
Allow: /compiler/
Allow: /documents/

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for well-behaved bots
Crawl-delay: 1`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  })
} 