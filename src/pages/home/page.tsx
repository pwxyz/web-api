

import React from 'react'
import Editor from '../edit/components/Editor'

import MyEdit from './components/MyEdit'
import { Button } from 'antd'

interface props {

}

interface state{
  sourceObj: object
}


const initRes = 
`{
  "status|状态":1,
  "message|信息":"获取成功",
  "payload":{

  }
}`


class Home extends React.Component<props, state>{
  constructor(props){
    super(props)
    this.state={
      sourceObj:{}
    }
  }
  refss = null
  componentDidMount(){
  }

  getFile = e => {
    var reader = new FileReader();
    let file = this.refss.files[0]
    console.log(file)
    if(file.type!=="application/json") {
      this.refss = null
      return
    }
    let that = this
    reader.readAsText(file, 'UTF-8')
    reader.onload = function () {
        let str = reader.result +''
        let sourceObj = JSON.parse(str) 
        that.setState({ sourceObj })
    }
  }

  ref=null 

  getValue =e => {
    let value = e.target.value
    let obj = JSON.parse(value)

    console.log( JSON.parse(value) )
  
  }

  getRes = () => {
    console.log(this.ref.refs.monaco.editor.getModel().getValue())
  }

  render(){
    console.log(this.state.sourceObj)
    return(
      <div>
        <input type='file' accept={ 'application/json' }  onChange={ this.getFile } ref={ file => this.refss = file }  />
        
        <div style={{ width:800, height:400 }} id='json' >
          <span>res</span>
          <Editor initValue={ initRes }  ref={ ref=> this.ref = ref } />
        </div>
        <Button type='primary' onClick={ this.getRes } >提交</Button>
      </div>
    )
  }
}

export default Home


