"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileText, Download, Eye, Upload, AlertCircle, FolderOpen } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import dynamic from 'next/dynamic'

// Dynamically import PDF viewer to avoid SSR issues
const PDFViewer = dynamic(() => import('./PDFViewer'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64">Loading PDF viewer...</div>
})

const DOCXViewer = dynamic(() => import('./DOCXViewer'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64">Loading document viewer...</div>
})

// Available documents in public folder
const PUBLIC_DOCUMENTS = [
  { name: 'DSA Documentation (DOCX)', path: '/dsa.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
  { name: 'DSA Documentation (TXT)', path: '/dsa.txt', type: 'text/plain' },
  { name: 'Sorting Notes', path: '/sample-docs/sorting-notes.txt', type: 'text/plain' },
]

interface DocumentViewerProps {
  fileUrl?: string
  fileName?: string
  fileType?: string
  onFileSelect?: (file: File) => void
  className?: string
}

export default function DocumentViewer({
  fileUrl,
  fileName,
  fileType,
  onFileSelect,
  className = ""
}: DocumentViewerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileData, setFileData] = useState<string | ArrayBuffer | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentFileType, setCurrentFileType] = useState<string>('')
  const [selectedDocument, setSelectedDocument] = useState<string>('')
  const [currentFileName, setCurrentFileName] = useState<string>('')
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  // Load default document on component mount
  useEffect(() => {
    if (PUBLIC_DOCUMENTS.length > 0 && !selectedDocument && !fileUrl && !isInitialized) {
      const defaultDoc = PUBLIC_DOCUMENTS[0]
      setSelectedDocument(defaultDoc.path)
      setIsInitialized(true)
      loadDocumentFromPublic(defaultDoc.path, defaultDoc.type, defaultDoc.name)
    }
  }, [selectedDocument, fileUrl, isInitialized])

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setCurrentFileType(file.type)
      setCurrentFileName(file.name)
      setSelectedDocument('')
      onFileSelect?.(file)
      loadFile(file)
    }
  }

  // Handle document selection from public folder
  const handleDocumentSelect = (documentPath: string) => {
    const document = PUBLIC_DOCUMENTS.find(doc => doc.path === documentPath)
    if (document) {
      setSelectedDocument(documentPath)
      setSelectedFile(null)
      loadDocumentFromPublic(document.path, document.type, document.name)
    }
  }

  // Load file data
  const loadFile = async (file: File) => {
    setIsLoading(true)
    setError(null)
    
    try {
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer()
        setFileData(arrayBuffer)
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const arrayBuffer = await file.arrayBuffer()
        setFileData(arrayBuffer)
      } else if (file.type.startsWith('text/')) {
        const text = await file.text()
        setFileData(text)
      } else {
        throw new Error('Unsupported file type')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load file')
    } finally {
      setIsLoading(false)
    }
  }

  // Load document from public folder
  const loadDocumentFromPublic = async (documentPath: string, documentType: string, documentName: string) => {
    setIsLoading(true)
    setError(null)
    setCurrentFileType(documentType)
    setCurrentFileName(documentName)
    
    try {
      const response = await fetch(documentPath)
      if (!response.ok) throw new Error('Failed to fetch document')
      
      let data: string | ArrayBuffer
      if (documentType === 'application/pdf' || documentType.includes('document')) {
        data = await response.arrayBuffer()
      } else {
        data = await response.text()
      }
      
      setFileData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load document')
    } finally {
      setIsLoading(false)
    }
  }

  // Load file from URL (existing functionality)
  useEffect(() => {
    if (fileUrl && fileType) {
      setIsLoading(true)
      setError(null)
      setCurrentFileName(fileName || 'Unknown')
      
      fetch(fileUrl)
        .then(async response => {
          if (!response.ok) throw new Error('Failed to fetch file')
          return fileType === 'application/pdf' || fileType.includes('document') 
            ? await response.arrayBuffer()
            : await response.text()
        })
        .then(data => {
          setFileData(data)
          setCurrentFileType(fileType)
        })
        .catch(err => setError(err.message))
        .finally(() => setIsLoading(false))
    }
  }, [fileUrl, fileType, fileName])

  // Get file type icon
  const getFileIcon = (type: string) => {
    if (type === 'application/pdf') return '📄'
    if (type.includes('document') || type.includes('word')) return '📝'
    if (type.startsWith('text/')) return '📄'
    return '📎'
  }

  // Render file content
  const renderFileContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading document...</p>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <Alert className="m-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )
    }

    if (!fileData) {
      return (
        <div className="flex items-center justify-center h-64 text-center">
          <div>
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No document selected</p>
          </div>
        </div>
      )
    }

    // Render based on file type
    if (currentFileType === 'application/pdf') {
      return <PDFViewer fileData={fileData as ArrayBuffer} />
    } else if (currentFileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return <DOCXViewer fileData={fileData as ArrayBuffer} />
    } else if (currentFileType.startsWith('text/')) {
      return (
        <div className="p-4 bg-background rounded-lg border">
          <pre className="whitespace-pre-wrap text-sm font-mono">
            {fileData as string}
          </pre>
        </div>
      )
    }

    return (
      <Alert className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Unsupported file type: {currentFileType}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Viewer
          </CardTitle>
          <div className="flex items-center gap-2">
            {currentFileName && (
              <Badge variant="outline" className="flex items-center gap-1">
                <span>{getFileIcon(currentFileType)}</span>
                <span className="text-xs truncate max-w-32">
                  {currentFileName}
                </span>
              </Badge>
            )}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="document-upload" className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-1" />
                  Upload
                </label>
              </Button>
              {fileData && (
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Document selector for public documents */}
        <div className="flex items-center gap-2 mt-4">
          <FolderOpen className="h-4 w-4" />
          <Select value={selectedDocument} onValueChange={handleDocumentSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a document from library..." />
            </SelectTrigger>
            <SelectContent>
              {PUBLIC_DOCUMENTS.map((doc) => (
                <SelectItem key={doc.path} value={doc.path}>
                  <div className="flex items-center gap-2">
                    <span>{getFileIcon(doc.type)}</span>
                    <span>{doc.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <input
          id="document-upload"
          type="file"
          accept=".pdf,.docx,.doc,.txt,.md"
          onChange={handleFileSelect}
          className="hidden"
        />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="viewer" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="viewer">
              <Eye className="h-4 w-4 mr-1" />
              Viewer
            </TabsTrigger>
            <TabsTrigger value="info">
              <FileText className="h-4 w-4 mr-1" />
              Info
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="viewer" className="mt-4">
            <div className="border rounded-lg min-h-[400px] bg-muted/10">
              {renderFileContent()}
            </div>
          </TabsContent>
          
          <TabsContent value="info" className="mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">File Name</label>
                  <p className="text-sm">{currentFileName || 'No file selected'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">File Type</label>
                  <p className="text-sm">{currentFileType || 'Unknown'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Source</label>
                  <p className="text-sm">
                    {selectedDocument ? 'Document Library' : selectedFile ? 'Uploaded File' : fileUrl ? 'External URL' : 'Unknown'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">File Size</label>
                  <p className="text-sm">
                    {selectedFile?.size ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : 'Unknown'}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="text-sm font-medium text-muted-foreground">Available Documents</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {PUBLIC_DOCUMENTS.map((doc) => (
                    <Badge 
                      key={doc.path} 
                      variant={selectedDocument === doc.path ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => handleDocumentSelect(doc.path)}
                    >
                      {getFileIcon(doc.type)} {doc.name}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mt-4">
                <label className="text-sm font-medium text-muted-foreground">Supported Formats</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">PDF</Badge>
                  <Badge variant="secondary">DOCX</Badge>
                  <Badge variant="secondary">DOC</Badge>
                  <Badge variant="secondary">TXT</Badge>
                  <Badge variant="secondary">MD</Badge>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 