

import React from 'react'
import Editor from './components/Editor'
import { Button, Table } from 'antd'
import Req from './components/Req'

import  commonProps from 'components/commonProps'

interface props {
  state: {
    home:{
      res: string
      sourceObj: object
      parameters: Array<object>
    }
    
  }
  dispatch: (any:any) => void
}

interface state{
  sourceObj: object
}




@commonProps()
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

   columns = [
    { title: '描述', dataIndex: 'description' },
    { title: '值或者key', dataIndex: 'name' },
    { title: '类型', dataIndex: 'type' },
    { title: '必须', dataIndex: 'required', render: text => <div>{ text? '是' : '否' }</div>  },
    // { title: '参数所在位置', dataIndex: 'where'  },
    { title: '操作',  dataIndex:'action', render: ( text, record, index ) => <div style={{ color:'red', cursor:'pointer' }} 
                              onClick={e=> this.deleteParams(index) } >删除</div> }
  ]
  
  deleteParams = num => {
    this.props.dispatch({ type: 'home/deleteParams', payload: num })
  }

  getValue =e => {
    let value = e.target.value
    let obj = JSON.parse(value)

    console.log( JSON.parse(value) )
  
  }


  render(){
    // console.log(this.state.sourceObj)
    const { res, sourceObj, parameters } = this.props.state.home
    let data = parameters.map((i, index )=> { i['key'] = index; return i } )
    console.log(data)
    return(
      <div>
        <input type='file' accept={ 'application/json' }  onChange={ this.getFile } ref={ file => this.refss = file }  />

        <Req sourceObj={ sourceObj } />

        <Table columns={ this.columns } dataSource={ data } style={{ width:800 }}  />
        <div style={{ width:800, height:400 }} id='json' >
          <span style={{ margin:20, fontSize:20 }} >res</span>
          <Editor value={ res }   type='home/resChange'  />
        </div>
        <Button type='primary'  >提交</Button>
      </div>
    )
  }
}

export default Home


