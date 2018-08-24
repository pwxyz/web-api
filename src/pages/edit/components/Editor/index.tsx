
//此组件可以设置initvalue, 但是不能通过props.onChange来传值
import React from 'react';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';
import { connect } from 'dva'

const mapDispatch = dispatch => dispatch
const mapState = state => state

interface props{
  initValue: string
}

interface state{

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
    }
  }

  ref=null

  editorDidMount(editor, monaco) {

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
        // onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}


export default App


