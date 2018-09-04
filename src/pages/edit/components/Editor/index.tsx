
//此组件可以设置initvalue, 但是不能通过props.onChange来传值
import React from 'react';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';
import { connect } from 'dva'


interface props{
  initValue: string
  type: string
}

interface state{
  type: string
  code: string
}

const getValue = value => {
  console.log('value', value)
  return value
}

class App extends React.Component <props, state>{
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.initValue||  '// type your code...',
      type: this.props.type || 'example/editorChange'
    }
  }

  ref=null

  editorDidMount(editor, monaco) {
    let  { dispatch }= window['g_app']._store
    // console.log(dispatch)
  }

  onChange = value => {
    let  { dispatch }= window['g_app']._store
    console.log( this.state.type)
    dispatch({ type: 'home/resChange', payload: { res: value } })
  }

  render() {
    const code = this.state['code']
    const options = {
      // selectOnLineNumbers: true
    }
    return (
      <MonacoEditor
        // width={800}
        // height={ 500 }
        ref="monaco"
        language="json"
        theme="vs"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}


export default App


