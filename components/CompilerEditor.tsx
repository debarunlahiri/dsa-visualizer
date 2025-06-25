'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

// Dynamically import Monaco Editor to avoid SSR issues
const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-white dark:bg-[#2B2B2B] text-gray-600 dark:text-gray-400">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
        <p>Loading Editor...</p>
      </div>
    </div>
  ),
});

interface CompilerEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  onKeyDown?: (event: KeyboardEvent) => void;
}

export function CompilerEditor({ value, onChange, language, onKeyDown }: CompilerEditorProps) {
  const editorRef = useRef<any>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle editor mount
  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // Define themes first
    defineThemes(monaco);

    // Set the correct theme immediately
    const currentTheme = getEditorTheme();
    monaco.editor.setTheme(currentTheme);

    // Configure IntelliJ-like keybindings
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      // Trigger the onKeyDown callback for Ctrl+Enter
      if (onKeyDown) {
        const event = new KeyboardEvent('keydown', {
          key: 'Enter',
          ctrlKey: true,
          metaKey: navigator.platform.includes('Mac'),
        });
        onKeyDown(event);
      }
    });

    // Add other IntelliJ-like shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyD, () => {
      // Duplicate line (IntelliJ: Ctrl+D)
      editor.trigger('keyboard', 'editor.action.duplicateSelection', {});
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyY, () => {
      // Delete line (IntelliJ: Ctrl+Y)
      editor.trigger('keyboard', 'editor.action.deleteLines', {});
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.UpArrow, () => {
      // Move line up (IntelliJ: Ctrl+Shift+Up)
      editor.trigger('keyboard', 'editor.action.moveLinesUpAction', {});
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.DownArrow, () => {
      // Move line down (IntelliJ: Ctrl+Shift+Down)
      editor.trigger('keyboard', 'editor.action.moveLinesDownAction', {});
    });

    // Focus the editor
    editor.focus();
  };

  // Update theme when it changes
  useEffect(() => {
    if (editorRef.current && mounted) {
      const currentTheme = getEditorTheme();
      // Use Monaco's setTheme method to update the theme
      if ((window as any).monaco) {
        (window as any).monaco.editor.setTheme(currentTheme);
      }
    }
  }, [theme, resolvedTheme, mounted]);

  // Configure editor options
  const editorOptions = {
    fontSize: 14,
    fontFamily: 'JetBrains Mono, Consolas, Monaco, "Courier New", monospace',
    lineNumbers: 'on' as const,
    glyphMargin: true,
    roundedSelection: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    minimap: {
      enabled: true,
    },
    wordWrap: 'on' as const,
    tabSize: 2,
    insertSpaces: true,
    detectIndentation: true,
    contextmenu: true,
    mouseWheelZoom: true,
    cursorBlinking: 'blink' as const,
    cursorStyle: 'line' as const,
    renderWhitespace: 'selection' as const,
    renderControlCharacters: false,
    colorDecorators: true,
    codeLens: false,
    lineNumbersMinChars: 4,
    lineDecorationsWidth: 20,
    folding: true,
    foldingStrategy: 'indentation' as const,
    showFoldingControls: 'always' as const,
    padding: {
      left: 20,
      right: 16,
      top: 8,
      bottom: 8,
    },
  };

  // Set up global keyboard listener for shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (onKeyDown && editorRef.current?.hasTextFocus()) {
        onKeyDown(event);
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [onKeyDown]);

  // Define themes when Monaco is available
  const defineThemes = (monaco: any) => {
    // Make monaco globally available for theme updates
    if (typeof window !== 'undefined') {
      (window as any).monaco = monaco;
    }

    // Define custom IntelliJ-like dark theme
    monaco.editor?.defineTheme('intellij-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '808080', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'CC7832' },
        { token: 'string', foreground: '6A8759' },
        { token: 'number', foreground: '6897BB' },
        { token: 'regexp', foreground: '364135' },
        { token: 'operator', foreground: 'A9B7C6' },
        { token: 'namespace', foreground: 'FFC66D' },
        { token: 'type', foreground: 'FFC66D' },
        { token: 'struct', foreground: 'FFC66D' },
        { token: 'class', foreground: 'FFC66D' },
        { token: 'interface', foreground: 'FFC66D' },
        { token: 'enum', foreground: 'FFC66D' },
        { token: 'typeParameter', foreground: 'FFC66D' },
        { token: 'function', foreground: 'FFC66D' },
        { token: 'method', foreground: 'FFC66D' },
        { token: 'decorator', foreground: 'BBB529' },
        { token: 'macro', foreground: 'BBB529' },
        { token: 'variable', foreground: 'A9B7C6' },
        { token: 'variable.predefined', foreground: 'A9B7C6' },
        { token: 'constant', foreground: '9876AA' },
        { token: 'property', foreground: 'A9B7C6' },
        { token: 'label', foreground: 'A9B7C6' },
      ],
      colors: {
        'editor.background': '#2B2B2B',
        'editor.foreground': '#A9B7C6',
        'editorLineNumber.foreground': '#606366',
        'editorLineNumber.activeForeground': '#A9B7C6',
        'editor.selectionBackground': '#214283',
        'editor.selectionHighlightBackground': '#214283',
        'editor.findMatchBackground': '#32593D',
        'editor.findMatchHighlightBackground': '#32593D',
        'editor.hoverHighlightBackground': '#264F78',
        'editorCursor.foreground': '#FFFFFF',
        'editorWhitespace.foreground': '#3C3F41',
        'editorIndentGuide.background': '#3C3F41',
        'editorIndentGuide.activeBackground': '#707070',
        'editor.lineHighlightBackground': '#323232',
        'editorGutter.background': '#2B2B2B',
        'editorGutter.width': '80px',
        'editorGutter.modifiedBackground': '#1B81A8',
        'editorGutter.addedBackground': '#629755',
        'editorGutter.deletedBackground': '#CC7832',
        'scrollbarSlider.background': '#616263',
        'scrollbarSlider.hoverBackground': '#7C7C7C',
        'scrollbarSlider.activeBackground': '#A6A6A6',
      },
    });

    // Define custom IntelliJ-like light theme
    monaco.editor?.defineTheme('intellij-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '808080', fontStyle: 'italic' },
        { token: 'keyword', foreground: '000080' },
        { token: 'string', foreground: '008000' },
        { token: 'number', foreground: '0000FF' },
        { token: 'regexp', foreground: '800000' },
        { token: 'operator', foreground: '000000' },
        { token: 'namespace', foreground: '795E26' },
        { token: 'type', foreground: '795E26' },
        { token: 'struct', foreground: '795E26' },
        { token: 'class', foreground: '795E26' },
        { token: 'interface', foreground: '795E26' },
        { token: 'enum', foreground: '795E26' },
        { token: 'typeParameter', foreground: '795E26' },
        { token: 'function', foreground: '795E26' },
        { token: 'method', foreground: '795E26' },
        { token: 'decorator', foreground: '800000' },
        { token: 'macro', foreground: '800000' },
        { token: 'variable', foreground: '001080' },
        { token: 'variable.predefined', foreground: '001080' },
        { token: 'constant', foreground: '811F3F' },
        { token: 'property', foreground: '001080' },
        { token: 'label', foreground: '001080' },
      ],
      colors: {
        'editor.background': '#FFFFFF',
        'editor.foreground': '#000000',
        'editorLineNumber.foreground': '#237893',
        'editorLineNumber.activeForeground': '#0B216F',
        'editor.selectionBackground': '#ADD6FF',
        'editor.selectionHighlightBackground': '#ADD6FF',
        'editor.findMatchBackground': '#A8AC94',
        'editor.findMatchHighlightBackground': '#A8AC94',
        'editor.hoverHighlightBackground': '#B3D4FC',
        'editorCursor.foreground': '#000000',
        'editorWhitespace.foreground': '#BFBFBF',
        'editorIndentGuide.background': '#D3D3D3',
        'editorIndentGuide.activeBackground': '#939393',
        'editor.lineHighlightBackground': '#F0F0F0',
        'editorGutter.background': '#FFFFFF',
        'editorGutter.width': '80px',
        'editorGutter.modifiedBackground': '#1B81A8',
        'editorGutter.addedBackground': '#629755',
        'editorGutter.deletedBackground': '#CC7832',
        'scrollbarSlider.background': '#C1C1C1',
        'scrollbarSlider.hoverBackground': '#A6A6A6',
        'scrollbarSlider.activeBackground': '#8C8C8C',
      },
    });
  };

  // Get the appropriate theme
  const getEditorTheme = () => {
    // Use resolvedTheme for more accurate theme detection
    const currentTheme = resolvedTheme || theme;
    if (currentTheme === 'light') return 'intellij-light';
    if (currentTheme === 'dark') return 'intellij-dark';
    // Default to dark theme to match the overall app theme
    return 'intellij-dark';
  };

  // Show loading with correct background color
  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-full bg-white dark:bg-[#2B2B2B] text-gray-600 dark:text-gray-400">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p>Loading Editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-white dark:bg-[#2B2B2B]">
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={(newValue) => onChange(newValue || '')}
        onMount={handleEditorDidMount}
        theme={getEditorTheme()} // Set theme directly on the Editor component
        options={{
          ...editorOptions,
        }}
        loading={
          <div className="flex items-center justify-center h-full bg-white dark:bg-[#2B2B2B] text-gray-600 dark:text-gray-400">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p>Loading Editor...</p>
            </div>
          </div>
        }
      />
    </div>
  );
} 