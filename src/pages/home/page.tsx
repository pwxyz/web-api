

import React from 'react'
import  commonProps from 'components/commonProps'
import ModalContent from './components/ModalContent'
import { Modal, Button } from 'antd'


interface props {
  dispatch?: (any:any) => void
  
}

interface state{
  visible: boolean
}



@commonProps()
class Home extends React.Component<props, state>{
  constructor(props){
    super(props)
    this.state={
      visible: false
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
        let apiData = JSON.parse(str) 
        // that.setState({ sourceObj })
        that.props.dispatch({ type: 'home/uploadJson', payload: apiData})
        localStorage.setItem( 'apiData', str )
    }
  }
  hideModal =() => {
    this.setState({ visible: false })
  }

  showModal = () => {
    this.setState({ visible: true })
  }


  render(){

    return(
      <div style={{ marginLeft:200 }} >
        <input type='file' accept={ 'application/json' }  onChange={ this.getFile } ref={ file => this.refss = file }  />
        <Button type='primary' onClick={ this.showModal } >新增路由</Button>
        <Modal
          visible={this.state.visible}
          keyboard={ false }
          maskClosable={ false }
          width={ 1100 }
          onCancel={this.hideModal}
          footer={ null }
        >
          <ModalContent />
        </Modal>
        
      </div>
    )
  }
}

export default Home


