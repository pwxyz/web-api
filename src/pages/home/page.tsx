

import React from 'react'
// import { connect } from 'dva'
import Content from './components/Content'
import { Button } from 'antd'

interface props {

}

interface state{
  sourceObj: object
}


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
    let that = this
    reader.readAsText(file, 'UTF-8')
    reader.onload = function () {
        let str = reader.result
        let sourceObj = JSON.parse(str) 
        that.setState({ sourceObj })
    }
  }



  render(){
    console.log(this.state.sourceObj)
    return(
      <div>
        <input type='file' accept={ 'application/json' }  onChange={ this.getFile } ref={ file => this.refss = file }  />
        <Content />
      </div>
    )
  }
}

export default Home