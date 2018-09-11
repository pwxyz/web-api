

import React from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/json'
import 'brace/theme/monokai'

interface props{
  value: string
  // type: string
  width?: number|string
  height?: number|string
}

interface state{

}

export default  class CodeEditor extends React.Component<props, state>{
  onChange = value => {
    let { dispatch }  = window['g_app']._store
    dispatch({ type: 'home/resChange', payload: value })
  }
  render(){
    const { width=800, height=500 } = this.props
    return (
      <AceEditor 
        mode='json'
        theme='monokai'
        onChange={ this.onChange }
        style = { { width, height } }
        value={ this.props.value }
        editorProps={{$blockScrolling: true}}
        fontSize={16}
        setOptions={{
          // enableBasicAutocompletion: false,
          // enableLiveAutocompletion: false,
          // enableSnippets: false,
          // showLineNumbers: true, 
          tabSize: 2,
          }}
         />

    )
  }
}