# Document Viewer

The DSA Animations Site now includes a comprehensive document viewer that supports multiple file formats including PDF, DOCX, DOC, TXT, and Markdown files.

## Features

### 📄 PDF Viewer
- **Navigation**: Page-by-page navigation with jump-to-page functionality
- **Zoom Control**: Zoom in/out from 50% to 300% with reset functionality
- **Rotation**: Rotate documents 90 degrees at a time
- **Fullscreen Mode**: Immersive viewing experience
- **Print Support**: Direct printing from the browser
- **Download**: Save PDF files locally

### 📝 DOCX/DOC Viewer
- **Rich Text Rendering**: Preserves formatting, fonts, and styles
- **Tables & Lists**: Full support for complex document structures
- **Images**: Display embedded images and media
- **Word Count**: Real-time word count statistics
- **Export Options**: Convert to HTML format
- **Print Support**: Print documents with proper formatting

### 📄 Text File Viewer
- **Syntax Highlighting**: Support for various file types
- **Word Wrap**: Proper text formatting
- **Monospace Font**: Clean, readable text display
- **Fast Loading**: Instant display for text files

## Supported File Formats

| Format | Extension | Max Size | Features |
|--------|-----------|----------|----------|
| PDF | `.pdf` | 50MB | Full navigation, zoom, rotation |
| Word Document | `.docx`, `.doc` | 50MB | Rich text, tables, images |
| Text Files | `.txt` | 10MB | Plain text display |
| Markdown | `.md` | 10MB | Rendered markdown |

## Getting Started

### 1. Access the Document Viewer
Navigate to `/documents` in your application or click the "Documents" button in the navigation header.

### 2. Upload a Document
- Click the "Upload" button in the document viewer
- Select a supported file from your computer
- The document will automatically load and display

### 3. View Document Information
- Switch to the "Info" tab to see file details
- View file size, type, and modification date
- See supported formats and features

## Technical Implementation

### Dependencies
```json
{
  "react-pdf": "^7.5.1",
  "pdfjs-dist": "^3.11.174",
  "mammoth": "^1.6.0"
}
```

### Components Structure
```
components/
├── DocumentViewer.tsx      # Main document viewer component
├── PDFViewer.tsx          # PDF-specific viewer with controls
└── DOCXViewer.tsx         # DOCX/DOC viewer with conversion
```

### Usage Example

```tsx
import DocumentViewer from '@/components/DocumentViewer'

function MyComponent() {
  const handleFileSelect = (file: File) => {
    console.log('Selected file:', file.name)
  }

  return (
    <DocumentViewer 
      onFileSelect={handleFileSelect}
      className="w-full h-96"
    />
  )
}
```

### Props Interface

```typescript
interface DocumentViewerProps {
  fileUrl?: string           // URL to load document from
  fileName?: string          // Display name for the file
  fileType?: string          // MIME type of the file
  onFileSelect?: (file: File) => void  // Callback when file is selected
  className?: string         // Additional CSS classes
}
```

## Browser Support

| Browser | PDF | DOCX | TXT | Notes |
|---------|-----|------|-----|-------|
| Chrome | ✅ | ✅ | ✅ | Full support |
| Firefox | ✅ | ✅ | ✅ | Full support |
| Safari | ✅ | ✅ | ✅ | Full support |
| Edge | ✅ | ✅ | ✅ | Full support |

## Performance Considerations

### File Size Limits
- **PDF Files**: Maximum 50MB for optimal performance
- **DOCX Files**: Maximum 50MB for conversion
- **Text Files**: Maximum 10MB for instant loading

### Memory Usage
- PDF files are loaded into memory for rendering
- DOCX files are converted to HTML in memory
- Large files may impact browser performance

### Loading Optimization
- Components are lazy-loaded to reduce initial bundle size
- PDF.js worker is loaded asynchronously
- File processing happens client-side for privacy

## Security Features

### Client-Side Processing
- All file processing happens in the browser
- No files are uploaded to external servers
- Your documents remain private and secure

### File Validation
- File type validation before processing
- Size limits to prevent memory issues
- Error handling for corrupted files

## Troubleshooting

### Common Issues

**PDF not loading**
- Check if the file is a valid PDF
- Ensure file size is under 50MB
- Try refreshing the page

**DOCX formatting issues**
- Some complex formatting may not render perfectly
- Tables with complex layouts might appear simplified
- Custom fonts may fallback to system fonts

**Performance issues**
- Large files may take time to load
- Consider reducing file size for better performance
- Close other tabs to free up memory

### Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Unsupported file type" | Wrong file format | Use supported formats only |
| "File too large" | File exceeds size limit | Reduce file size |
| "Failed to load PDF" | Corrupted or invalid PDF | Try a different PDF file |
| "Failed to convert document" | Invalid DOCX file | Check file integrity |

## Future Enhancements

### Planned Features
- [ ] Annotation support for PDFs
- [ ] Text search within documents
- [ ] Thumbnail view for multi-page documents
- [ ] Document comparison tool
- [ ] Batch file processing
- [ ] Cloud storage integration

### API Enhancements
- [ ] RESTful API for document processing
- [ ] Webhook support for file uploads
- [ ] Document metadata extraction
- [ ] OCR for scanned documents

## Contributing

If you'd like to contribute to the document viewer:

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This document viewer is part of the DSA Animations Site and follows the same licensing terms as the main project. 