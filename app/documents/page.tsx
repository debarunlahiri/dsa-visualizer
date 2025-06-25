"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FileText, 
  Upload, 
  BookOpen, 
  Download,
  Eye,
  Zap,
  Shield,
  Smartphone
} from 'lucide-react'
import DocumentViewer from '@/components/DocumentViewer'
import Link from 'next/link'

export default function DocumentsPage() {
  const [demoFile, setDemoFile] = useState<File | null>(null)

  // Sample documents for demonstration
  const sampleDocuments = [
    {
      name: "Algorithm Complexity Guide.pdf",
      type: "application/pdf",
      size: "2.4 MB",
      description: "Comprehensive guide to Big O notation and algorithm analysis",
      url: "/sample-docs/algorithm-complexity.pdf"
    },
    {
      name: "Data Structures Handbook.docx",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: "1.8 MB",
      description: "Complete reference for arrays, linked lists, trees, and graphs",
      url: "/sample-docs/data-structures.docx"
    },
    {
      name: "Sorting Algorithms Notes.txt",
      type: "text/plain",
      size: "156 KB",
      description: "Quick reference notes for bubble sort, merge sort, and quicksort",
      url: "/sample-docs/sorting-notes.txt"
    }
  ]

  const features = [
    {
      icon: <Eye className="h-6 w-6 text-blue-500" />,
      title: "Universal Viewing",
      description: "View PDF, DOCX, DOC, TXT, and Markdown files directly in your browser"
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "Fast Loading",
      description: "Optimized rendering for quick document loading and smooth navigation"
    },
    {
      icon: <Shield className="h-6 w-6 text-green-500" />,
      title: "Secure Viewing",
      description: "Client-side processing ensures your documents stay private and secure"
    },
    {
      icon: <Smartphone className="h-6 w-6 text-purple-500" />,
      title: "Responsive Design",
      description: "Works perfectly on desktop, tablet, and mobile devices"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Document Viewer</h1>
              <p className="text-muted-foreground mt-2">
                View and interact with documents directly in your browser
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Back to DSA
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="viewer" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="viewer">Document Viewer</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="samples">Sample Documents</TabsTrigger>
          </TabsList>

          {/* Document Viewer Tab */}
          <TabsContent value="viewer" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Upload and View Documents
                  </CardTitle>
                  <CardDescription>
                    Support for PDF, DOCX, DOC, TXT, and Markdown files. 
                    Maximum file size: 50MB
                  </CardDescription>
                </CardHeader>
              </Card>

              <DocumentViewer 
                onFileSelect={setDemoFile}
                className="w-full"
              />
            </div>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                  <CardDescription>
                    Powerful document viewing capabilities built for modern web applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">PDF Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        Page navigation with jump-to-page
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        Zoom controls (50% - 300%)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        Document rotation
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        Fullscreen viewing mode
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        Print and download options
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">DOCX Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        Formatted text rendering
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        Tables and lists support
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        Images and media display
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        Word count statistics
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        Export to HTML format
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Sample Documents Tab */}
          <TabsContent value="samples" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sample Documents</CardTitle>
                  <CardDescription>
                    Try out the document viewer with these sample files
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {sampleDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            {doc.type === 'application/pdf' && <FileText className="h-8 w-8 text-red-500" />}
                            {doc.type.includes('document') && <FileText className="h-8 w-8 text-blue-500" />}
                            {doc.type === 'text/plain' && <FileText className="h-8 w-8 text-gray-500" />}
                          </div>
                          <div>
                            <h3 className="font-medium">{doc.name}</h3>
                            <p className="text-sm text-muted-foreground">{doc.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {doc.type.split('/')[1].toUpperCase()}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{doc.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upload Your Own</CardTitle>
                  <CardDescription>
                    Test the document viewer with your own files
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Drop files here</h3>
                    <p className="text-muted-foreground mb-4">
                      Or click the upload button in the Document Viewer tab
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports: PDF, DOCX, DOC, TXT, MD • Max size: 50MB
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 