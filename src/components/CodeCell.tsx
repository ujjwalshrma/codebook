import { useState, useEffect } from 'react'
import CodeEditor from './CodeEditor'
import Preview from './Preview'
import startService from '../bundler/index'
import Resizable from './Resizable'

const CodeCell = () => {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [input, setInput] = useState('')

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await startService(input)
      setCode(output.code)
      setError(output.err)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [input])


  return (
    <Resizable direction="veritcal">
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Resizable direction="horizontal">
          <CodeEditor onChange={(value) => setInput(value)} initialValue="" />
        </Resizable>
        <Preview code={code} bundlingStatus={error} />
      </div>
    </Resizable>
  )
}

export default CodeCell
