# Online Compiler - IntelliJ IDEA Style

A modern, web-based code compiler that emulates the core features of JetBrains IntelliJ IDEA. Built with Next.js 14, TypeScript, and Monaco Editor.

## Features

### 🎨 IntelliJ-like Interface
- **Dark Theme**: Custom IntelliJ Darcula-inspired theme
- **Split Layout**: 70% code editor, 30% output console
- **Professional Toolbar**: Run button, language selector, and shortcuts
- **Responsive Design**: Optimized for desktop and tablet screens

### ⌨️ Advanced Code Editor
- **Monaco Editor**: VS Code-like editing experience with IntelliJ keybindings
- **Syntax Highlighting**: JavaScript syntax highlighting with IntelliJ color scheme
- **IntelliJ Shortcuts**:
  - `Ctrl+Enter` / `Cmd+Enter`: Run code
  - `Ctrl+D` / `Cmd+D`: Duplicate line
  - `Ctrl+Y` / `Cmd+Y`: Delete line
  - `Ctrl+Shift+↑/↓`: Move line up/down
- **Smart Features**: Auto-completion, bracket matching, code folding

### 🚀 Code Execution
- **Secure Execution**: Sandboxed JavaScript execution using Node.js VM
- **Real-time Output**: Live console output with formatted results
- **Error Handling**: Detailed error messages with stack traces
- **Performance Monitoring**: Execution time tracking
- **Security Features**: 5-second timeout, dangerous pattern detection

### 🎯 Console Features
- **Formatted Output**: Color-coded console messages
- **Error Highlighting**: Red-highlighted errors with stack traces
- **Execution Status**: Real-time status indicators
- **Auto-scroll**: Automatic scrolling to latest output

## Installation

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Setup Instructions

1. **Clone the repository** (if not already done):
   ```bash
   git clone <your-repo-url>
   cd your-project-name
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Install Monaco Editor** (if not already installed):
   ```bash
   npm install @monaco-editor/react monaco-editor
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open the compiler**:
   Navigate to `http://localhost:3000/compiler`

## Usage

### Basic Usage

1. **Open the Compiler**: Visit `/compiler` in your browser
2. **Write Code**: Use the Monaco editor on the left side
3. **Execute Code**: 
   - Click the green "Run" button, or
   - Press `Ctrl+Enter` (Windows/Linux) or `Cmd+Enter` (Mac)
4. **View Results**: Check the console panel on the right for output or errors

### Example Code

The compiler comes with a default JavaScript example:

```javascript
// Welcome to the Online Compiler
console.log("Hello, Compiler!");

// Try some JavaScript code:
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled numbers:", doubled);

// Calculate factorial
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log("Factorial of 5:", factorial(5));
```

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Enter` / `Cmd+Enter` | Run code |
| `Ctrl+D` / `Cmd+D` | Duplicate current line |
| `Ctrl+Y` / `Cmd+Y` | Delete current line |
| `Ctrl+Shift+↑` | Move line up |
| `Ctrl+Shift+↓` | Move line down |
| `Ctrl+/` / `Cmd+/` | Toggle comment |
| `Ctrl+F` / `Cmd+F` | Find |
| `Ctrl+H` / `Cmd+H` | Find and replace |

## Architecture

### File Structure

```
app/
├── compiler/
│   └── page.tsx              # Main compiler page
├── api/
│   └── execute/
│       └── route.ts          # Code execution API
components/
├── CompilerEditor.tsx        # Monaco editor component
└── OutputConsole.tsx         # Console output component
```

### Components

#### `CompilerEditor.tsx`
- Monaco Editor wrapper with IntelliJ theme
- Custom keybindings and shortcuts
- Syntax highlighting and auto-completion

#### `OutputConsole.tsx`
- Formatted output display
- Error highlighting and stack traces
- Execution status and timing

#### `app/api/execute/route.ts`
- Secure code execution using Node.js VM
- Input validation and security checks
- Output capture and error handling

## Security Features

### Code Execution Security
- **Sandboxed Environment**: Uses Node.js VM for isolated execution
- **Timeout Protection**: 5-second execution limit
- **Pattern Detection**: Blocks dangerous operations like file system access
- **Memory Limits**: Prevents memory exhaustion attacks

### Blocked Operations
- File system access (`fs` module)
- Process manipulation (`child_process`, `process`)
- Network operations (`http`, `https`, `net`)
- System information (`os` module)
- Dynamic code evaluation (`eval`, `Function`)

## Extending the Compiler

### Adding New Languages

1. **Update Language Selector** in `app/compiler/page.tsx`:
   ```typescript
   <SelectItem value="python">Python</SelectItem>
   ```

2. **Extend API Route** in `app/api/execute/route.ts`:
   ```typescript
   if (language === 'python') {
     return await executePython(code);
   }
   ```

3. **Add Language Support** in `CompilerEditor.tsx`:
   ```typescript
   language={language === 'python' ? 'python' : 'javascript'}
   ```

### Customizing Themes

Modify the theme in `CompilerEditor.tsx`:

```typescript
monaco.editor.defineTheme('custom-theme', {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: 'your-color' },
    // Add more token colors
  ],
  colors: {
    'editor.background': '#your-bg-color',
    // Add more UI colors
  },
});
```

## Troubleshooting

### Common Issues

1. **Monaco Editor not loading**:
   - Ensure `@monaco-editor/react` is installed
   - Check browser console for errors
   - Verify Next.js configuration

2. **Code execution fails**:
   - Check API route is accessible at `/api/execute`
   - Verify Node.js VM is working
   - Check for blocked security patterns

3. **Styling issues**:
   - Ensure Tailwind CSS is configured
   - Check for conflicting CSS classes
   - Verify custom theme is applied

### Performance Tips

- **Large Files**: Monaco Editor handles large files well, but consider pagination for very large outputs
- **Memory Usage**: The VM sandbox has built-in memory limits
- **Network**: API calls are optimized for quick execution

## Browser Support

- **Chrome**: Full support
- **Firefox**: Full support  
- **Safari**: Full support
- **Edge**: Full support
- **Mobile**: Limited support (shows warning message)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Enhancements

### Planned Features
- **Multi-language Support**: Python, Java, C++, etc.
- **File Management**: Save/load code files
- **Collaboration**: Real-time collaborative editing
- **Themes**: Multiple editor themes
- **Extensions**: Plugin system for additional features

### External Services Integration
For production use, consider integrating with:
- **Judge0**: Professional code execution service
- **CodeMirror**: Alternative editor option
- **WebAssembly**: Client-side code execution

---

**Happy Coding!** 🚀 