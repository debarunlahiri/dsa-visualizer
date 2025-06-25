"use client"

import { useState, useCallback, useRef, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight,
  Maximize2,
  Minimize2,
  Download,
  Printer
} from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface PDFViewerProps {
  fileData: ArrayBuffer
  className?: string
}

export default function PDFViewer({ fileData, className = "" }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.0)
  const [rotation, setRotation] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pageInput, setPageInput] = useState('1')
  const containerRef = useRef<HTMLDivElement>(null)

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setIsLoading(false)
    setError(null)
  }, [])

  const onDocumentLoadError = useCallback((error: Error) => {
    setError(`Failed to load PDF: ${error.message}`)
    setIsLoading(false)
  }, [])

  const onPageLoadSuccess = useCallback(() => {
    setIsLoading(false)
  }, [])

  const onPageLoadError = useCallback((error: Error) => {
    setError(`Failed to load page: ${error.message}`)
    setIsLoading(false)
  }, [])

  // Navigation functions
  const goToPrevPage = () => {
    if (pageNumber > 1) {
      const newPage = pageNumber - 1
      setPageNumber(newPage)
      setPageInput(newPage.toString())
    }
  }

  const goToNextPage = () => {
    if (numPages && pageNumber < numPages) {
      const newPage = pageNumber + 1
      setPageNumber(newPage)
      setPageInput(newPage.toString())
    }
  }

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value)
  }

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const page = parseInt(pageInput)
    if (page && page >= 1 && numPages && page <= numPages) {
      setPageNumber(page)
    } else {
      setPageInput(pageNumber.toString())
    }
  }

  // Zoom functions
  const zoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.25, 3.0))
  }

  const zoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.25, 0.5))
  }

  const resetZoom = () => {
    setScale(1.0)
  }

  // Rotation function
  const rotateDocument = () => {
    setRotation(prevRotation => (prevRotation + 90) % 360)
  }

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  // Handle fullscreen change
  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement)
  }

  // Add fullscreen event listener
  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  if (error) {
    return (
      <Alert className="m-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={`pdf-viewer-container ${className} ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border-b bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center gap-2">
          {/* Page Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pageNumber <= 1}
              onClick={goToPrevPage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <form onSubmit={handlePageInputSubmit} className="flex items-center gap-1">
              <Input
                type="text"
                value={pageInput}
                onChange={handlePageInputChange}
                className="w-12 h-8 text-center text-sm"
                onBlur={handlePageInputSubmit}
              />
              <span className="text-sm text-muted-foreground">
                / {numPages || '?'}
              </span>
            </form>
            
            <Button
              variant="outline"
              size="sm"
              disabled={!numPages || pageNumber >= numPages}
              onClick={goToNextPage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="h-4 w-px bg-border" />

          {/* Zoom Controls */}
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" onClick={zoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            
            <Badge variant="outline" className="cursor-pointer" onClick={resetZoom}>
              {Math.round(scale * 100)}%
            </Badge>
            
            <Button variant="outline" size="sm" onClick={zoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={rotateDocument}>
            <RotateCw className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="sm" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* PDF Content */}
      <ScrollArea className={`${isFullscreen ? 'h-[calc(100vh-60px)]' : 'h-[600px]'} w-full`}>
        <div className="flex justify-center p-4">
          {isLoading && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Loading PDF...</p>
              </div>
            </div>
          )}
          
          <Document
            file={fileData}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading=""
            error=""
            noData=""
            className="max-w-none"
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              rotate={rotation}
              onLoadSuccess={onPageLoadSuccess}
              onLoadError={onPageLoadError}
              loading=""
              error=""
              noData=""
              className="shadow-lg"
              canvasBackground="white"
            />
          </Document>
        </div>
      </ScrollArea>

      {/* Status Bar */}
      <div className="flex items-center justify-between p-2 border-t bg-muted/30 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>Page {pageNumber} of {numPages || '?'}</span>
          <span>Zoom: {Math.round(scale * 100)}%</span>
          {rotation > 0 && <span>Rotated: {rotation}°</span>}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">PDF</Badge>
        </div>
      </div>
    </div>
  )
} 