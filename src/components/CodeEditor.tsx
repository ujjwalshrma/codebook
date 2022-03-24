import './CodeEditor.css'
import { useRef } from 'react'
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react'
// import prettier from 'prettier'
// import parser from 'prettier/parser-babel'

interface CodeEditorProps {
  initialValue: string
  onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>()

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue())
    })

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 })
  }

  // const onClickFormat = () => {
  //   const unformattedCode = editorRef.current.getModel().getValue()

  //   // const formattedCode = prettier.format(unformattedCode, {
  //   //   parser: 'babel',
  //   //   plugins: [parser],
  //   //   useTabs: false,
  //   //   semi: true,
  //   //   singleQuote: true,
  //   // })

  //   editorRef.current.setValue()
  // }

  return (
    <div className="editor-wrapper">
      {/* <button onClick={onClickFormat}>Format</button> */}
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme="dark"
        language="javascript"
        height="100%"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 18,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  )
}

export default CodeEditor
