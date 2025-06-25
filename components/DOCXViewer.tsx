"use client"

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Download, Printer, FileText, AlertCircle } from 'lucide-react'
import * as mammoth from 'mammoth'

interface DOCXViewerProps {
  fileData: ArrayBuffer
  className?: string
}

export default function DOCXViewer({ fileData, className = "" }: DOCXViewerProps) {
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [wordCount, setWordCount] = useState<number>(0)

  useEffect(() => {
    const convertDocxToHtml = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const result = await mammoth.convertToHtml({ arrayBuffer: fileData })
        
        if (result.value) {
          setHtmlContent(result.value)
          
          // Count words (rough estimation)
          const textContent = result.value.replace(/<[^>]*>/g, ' ').trim()
          const words = textContent.split(/\s+/).filter(word => word.length > 0)
          setWordCount(words.length)
        } else {
          throw new Error('Failed to convert document')
        }
        
        // Log any conversion messages/warnings
        if (result.messages && result.messages.length > 0) {
          console.warn('DOCX conversion messages:', result.messages)
        }
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load document')
      } finally {
        setIsLoading(false)
      }
    }

    if (fileData) {
      convertDocxToHtml()
    }
  }, [fileData])

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Document Print</title>
          <style>
            body { 
              font-family: 'Times New Roman', serif; 
              line-height: 1.6; 
              margin: 20px;
              color: #000;
              background: #fff;
            }
            h1, h2, h3, h4, h5, h6 { margin-top: 20px; margin-bottom: 10px; }
            p { margin-bottom: 10px; }
            @media print {
              body { margin: 0; }
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const downloadAsHtml = () => {
    const blob = new Blob([`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Document Export</title>
        <style>
          body { 
            font-family: 'Times New Roman', serif; 
            line-height: 1.6; 
            margin: 20px;
            max-width: 800px;
          }
          h1, h2, h3, h4, h5, h6 { margin-top: 20px; margin-bottom: 10px; }
          p { margin-bottom: 10px; }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `], { type: 'text/html' })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'document.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (error) {
    return (
      <Alert className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className={`docx-viewer-container ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border-b bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Document Viewer</span>
          {wordCount > 0 && (
            <Badge variant="outline" className="text-xs">
              {wordCount} words
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={downloadAsHtml}>
            <Download className="h-4 w-4 mr-1" />
            Export HTML
          </Button>
          
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
        </div>
      </div>

      {/* Document Content */}
      <ScrollArea className="h-[600px] w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Converting document...</p>
            </div>
          </div>
        ) : (
          <div className="p-6 max-w-4xl mx-auto">
            <div 
              className="prose prose-gray dark:prose-invert max-w-none document-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              style={{
                fontFamily: 'Times New Roman, serif',
                lineHeight: '1.6',
                fontSize: '14px'
              }}
            />
          </div>
        )}
      </ScrollArea>

      {/* Status Bar */}
      <div className="flex items-center justify-between p-2 border-t bg-muted/30 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          {wordCount > 0 && <span>{wordCount} words</span>}
          <span>Microsoft Word Document</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">DOCX</Badge>
        </div>
      </div>

      <style jsx global>{`
        .document-content h1,
        .document-content h2,
        .document-content h3,
        .document-content h4,
        .document-content h5,
        .document-content h6 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: bold;
        }
        
        .document-content h1 { font-size: 1.8em; }
        .document-content h2 { font-size: 1.5em; }
        .document-content h3 { font-size: 1.3em; }
        .document-content h4 { font-size: 1.1em; }
        .document-content h5 { font-size: 1em; }
        .document-content h6 { font-size: 0.9em; }
        
        .document-content p {
          margin-bottom: 1em;
          text-align: justify;
        }
        
        .document-content ul,
        .document-content ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        
        .document-content li {
          margin-bottom: 0.5em;
        }
        
        .document-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1em 0;
        }
        
        .document-content table,
        .document-content th,
        .document-content td {
          border: 1px solid #ccc;
        }
        
        .document-content th,
        .document-content td {
          padding: 8px;
          text-align: left;
        }
        
        .document-content th {
          background-color: #f5f5f5;
          font-weight: bold;
        }
        
        .document-content strong,
        .document-content b {
          font-weight: bold;
        }
        
        .document-content em,
        .document-content i {
          font-style: italic;
        }
        
        .document-content u {
          text-decoration: underline;
        }
        
        .document-content img {
          max-width: 100%;
          height: auto;
          margin: 1em 0;
        }
        
        .document-content blockquote {
          margin: 1em 0;
          padding-left: 1em;
          border-left: 3px solid #ccc;
          font-style: italic;
        }
      `}</style>
    </div>
  )
} 