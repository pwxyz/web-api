

import React from 'react'
import  commonProps from 'components/commonProps'
import ModalContent from './components/ModalContent'
import { Modal, Button, Input, notification  } from 'antd'
import Head from './components/Head'
import PathTable from './components/PathTable'
import downloadjs from 'downloadjs'
import pathObjArr from 'utils/pathObjToArr'
import copy from 'utils/copy'

import parametersToReq from 'utils/parametersToReq'
import reponseToRes from 'utils/reponseToRes'

interface props {
  dispatch?: (any:any) => void
  state:{
    home:{
      apiData: object
    }
  }
}

interface state{
  visible: boolean
  filter: string
}



@commonProps()
class Home extends React.Component<props, state>{
  constructor(props){
    super(props)
    this.state={
      visible: false,
      filter: ''
    }
  }
  refss = null
  componentDidMount(){
  }

  getFile = e => {
    var reader = new FileReader();
    let file = this.refss.files[0]
    // console.log('xx',file)
    if(!file) return
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
        that.props.dispatch({ type: 'home/uploadJson', payload: {apiData, name: file.name }})
        localStorage.setItem( 'apiData', str )
    }
  }
  hideModal =() => {
    this.setState({ visible: false })
  }

  showModal = () => {
    this.props.dispatch({ type:'home/showModal' })
    this.setState({ visible: true })
  }

  downloadJson =e => {
    const { home } = this.props.state
    downloadjs( JSON.stringify(home.apiData, null, 2), home['name'], "application/json")
  }

  filter =filter => {
    this.setState({ filter })
  }

  editRouter = ({router, method,tags, description, parameters, responses }) => {
    console.log(responses['200']['schema']['properties'], reponseToRes(responses['200']['schema']['properties']))
    let obj = {}
    let objs = this.props.state.home.apiData['paths'][router][method]
    obj['router'] = router 
    obj['method'] = method 
    obj['tags'] = tags[0]
    obj['description'] = description
    obj['reqTable'] = parametersToReq(parameters)
    obj['res'] =  reponseToRes(responses['200']['schema']['properties'])
    obj['edit'] = router+ '&' + method
    this.props.dispatch({ type: 'home/editRouter', payload: obj })
    this.setState({ visible: true })
  }

  delRouter = (router, method) => {
    let apiData = copy(this.props.state.home.apiData)
    
    let definKey = this.findDefines(apiData.paths[router][method])
    delete apiData.definitions[definKey]

    if(this.checkOnlyKey(apiData.paths[router], method)){
      delete apiData.paths[router]
      // if()
    }
    else {
      delete apiData.paths[router][method]
    }
    // console.log(router, method,apiData)
    this.props.dispatch({ type:'home/delRouter', payload: apiData })
    notification.success({
      message:'通知',
      description: `删除${router}-${method}成功`
    })
  }

  findDefines = obj => {
    let str = obj['responses']['200']['schema']['$ref']
    return str&&str.split('/')[2]
  }

  checkOnlyKey = (obj, key) => {
    let arr = Object.keys(obj)
    if(arr.length===1&&arr[0]===key){
      return true
    }
    else return false
  }

  render(){
    const { home } = this.props.state
    // console.log(home,pathObjArr(home.paths), )
    return(
      <div style={{ marginLeft:100, marginRight:100 }} >
        <input type='file' accept={ 'application/json' }  onChange={ this.getFile } ref={ file => this.refss = file }  />
        <Button type='primary' onClick={ this.showModal } >新增路由</Button>
        <Button type='primary' onClick={ this.downloadJson } style={{ marginLeft:40 }}  disabled={ !pathObjArr(home.apiData['paths']).length }  >
          下载
        </Button>
        <Head/>
        <Input addonBefore={ '路径筛选' }  onChange={e=> this.filter(e.target.value) } value={ this.state.filter } style={{ width:500, margin:10 }}  />
        <PathTable  obj={ home.apiData['paths'] ||{} } definitions={ home.apiData['definitions'] } filter={ this.state.filter }
                    delRouter={ this.delRouter } editRouter={ this.editRouter } />
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


