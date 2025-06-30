"use client"

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Download, Printer, FileText, AlertCircle, FolderOpen, Maximize2, Minimize2 } from 'lucide-react'
import * as mammoth from 'mammoth'

// Available DOCX documents in public folder
const PUBLIC_DOCX_DOCUMENTS = [
  { name: 'DSA Documentation', path: '/dsa.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
]

interface DOCXViewerProps {
  fileData?: ArrayBuffer
  className?: string
}

export default function DOCXViewer({ fileData, className = "" }: DOCXViewerProps) {
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [wordCount, setWordCount] = useState<number>(0)
  const [selectedDocument, setSelectedDocument] = useState<string>('')
  const [currentFileData, setCurrentFileData] = useState<ArrayBuffer | null>(null)
  const [currentFileName, setCurrentFileName] = useState<string>('')
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [isFullView, setIsFullView] = useState<boolean>(false)

  // Load default document on component mount if no fileData provided
  useEffect(() => {
    if (!fileData && PUBLIC_DOCX_DOCUMENTS.length > 0 && !selectedDocument && !isInitialized) {
      const defaultDoc = PUBLIC_DOCX_DOCUMENTS[0]
      setSelectedDocument(defaultDoc.path)
      setIsInitialized(true)
      loadDocumentFromPublic(defaultDoc.path, defaultDoc.name)
    }
  }, [fileData, selectedDocument, isInitialized])

  // Handle document selection from public folder
  const handleDocumentSelect = (documentPath: string) => {
    const document = PUBLIC_DOCX_DOCUMENTS.find(doc => doc.path === documentPath)
    if (document) {
      setSelectedDocument(documentPath)
      loadDocumentFromPublic(document.path, document.name)
    }
  }

  // Load document from public folder
  const loadDocumentFromPublic = async (documentPath: string, documentName: string) => {
    setIsLoading(true)
    setError(null)
    setCurrentFileName(documentName)
    
    try {
      const response = await fetch(documentPath)
      if (!response.ok) throw new Error('Failed to fetch document')
      
      const arrayBuffer = await response.arrayBuffer()
      setCurrentFileData(arrayBuffer)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load document')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const convertDocxToHtml = async () => {
      const dataToProcess = fileData || currentFileData
      if (!dataToProcess) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)
      
      try {
        const result = await mammoth.convertToHtml({ arrayBuffer: dataToProcess })
        
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

    convertDocxToHtml()
  }, [fileData, currentFileData])

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

  const toggleFullView = () => {
    setIsFullView(!isFullView)
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
    <div className={`docx-viewer-container ${className} ${isFullView ? 'fixed inset-0 z-50 bg-background' : ''}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border-b bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">DOCX Viewer</span>
          {currentFileName && (
            <Badge variant="outline" className="text-xs">
              📝 {currentFileName}
            </Badge>
          )}
          {wordCount > 0 && (
            <Badge variant="outline" className="text-xs">
              {wordCount} words
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={toggleFullView}>
            {isFullView ? (
              <>
                <Minimize2 className="h-4 w-4 mr-1" />
                Exit Full View
              </>
            ) : (
              <>
                <Maximize2 className="h-4 w-4 mr-1" />
                Full View
              </>
            )}
          </Button>
          
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

      {/* Document selector for public documents */}
      {!fileData && !isFullView && (
        <div className="flex items-center gap-2 p-2 border-b bg-muted/20">
          <FolderOpen className="h-4 w-4" />
          <Select value={selectedDocument} onValueChange={handleDocumentSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a DOCX document from library..." />
            </SelectTrigger>
            <SelectContent>
              {PUBLIC_DOCX_DOCUMENTS.map((doc) => (
                <SelectItem key={doc.path} value={doc.path}>
                  <div className="flex items-center gap-2">
                    <span>📝</span>
                    <span>{doc.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Document Content */}
      <ScrollArea className={isFullView ? "h-[calc(100vh-120px)] w-full" : "h-[600px] w-full"}>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Converting document...</p>
            </div>
          </div>
        ) : htmlContent ? (
          <div className={`p-6 mx-auto ${isFullView ? 'max-w-5xl' : 'max-w-4xl'}`}>
            <div 
              className="prose prose-gray dark:prose-invert max-w-none document-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              style={{
                fontFamily: 'Times New Roman, serif',
                lineHeight: '1.6',
                fontSize: isFullView ? '15px' : '14px'
              }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-center">
            <div>
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No DOCX document selected</p>
              <p className="text-xs text-muted-foreground mt-1">
                Choose from library documents
              </p>
            </div>
          </div>
        )}
      </ScrollArea>

      {/* Status Bar - Hide in full view for more space */}
      {!isFullView && (
        <div className="flex items-center justify-between p-2 border-t bg-muted/30 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            {wordCount > 0 && <span>{wordCount} words</span>}
            <span>Microsoft Word Document</span>
            {selectedDocument && <span>From Library</span>}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">DOCX</Badge>
          </div>
        </div>
      )}

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