

import React from 'react'
import { Collapse, Input, Select, Table, Button } from 'antd'
import commonProps from 'components/commonProps'
import { methodArr } from '../../constants'
import Req from '../Req'
import Tags from '../Tags'
import Editor from '../Editor'


interface props {
  state?: {
    home:{
      res: string
      sourceObj: object
      method: string
      reqTable: Array<object>
      tagsList: Array<object>
      tags: string
      description: string 
      router: string
    }
    
  }
  dispatch?: (any:any) => void
}

interface state{
  sourceObj: object
}

@commonProps()
class ModalConent extends React.Component<props, state>{
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
  titleChange = obj => {
    this.props.dispatch({ type: 'home/titleChange', payload: obj })
  }

  addRouter = () => {
    this.props.dispatch({ type: 'home/addRouter' })
  }

  render(){
    const { res, sourceObj,  method, reqTable, tagsList, tags, router, description } = this.props.state.home
    let data = reqTable.map((i, index )=> { i['key'] = index; return i } )

    return(
      <div>
        <div style={{ width:1000 }} >
          <Collapse >
            <Collapse.Panel key={'1'} header='新增tags' >
              <Tags />  
            </Collapse.Panel>
          </Collapse>
        </div>
        <div style={{ marginTop:10 }} >
          <Input addonBefore={ '路由:*' }  placeholder='/home/edit' onChange={ e => this.titleChange({ router: e.target.value })  } style={{ width:300 }} value={ router } />
        </div>
        {/* <div style={{ marginTop:10 }} >
          <Input addonBefore={ 'tags:*' } placeholder='home' onChange={ e => this.titleChange({ tags: e.target.value })  } style={{ width:300 }} />
        </div> */}
        <div  style={{ marginTop:10 }} >
          <span style={{ marginRight:10 }}>tags:*</span>
          <Select style={{ width: 120 }}  onChange={ value => this.titleChange({ tags: value })  } value={ tags  } >
            {
              tagsList.map(i =>  
                <Select.Option key={ i['name'] } >{ i['name'] }</Select.Option>)
            }
          </Select>
        </div>
        <div  style={{ marginTop:10 }} >
          <Input  addonBefore={ '描述:*' } placeholder='这是一个用来描述本api作用的' onChange={ e => this.titleChange({ description: e.target.value })  } 
                  value={ description } style={{ width:300 }} />
        </div>
        <div  style={{ marginTop:10 }} >
          <span style={{ marginRight:10 }}>方法:*</span>
          <Select style={{ width: 120 }}  onChange={ value => this.titleChange({ method: value })  } value={ method} >
            {
              methodArr.map(i =>  
                <Select.Option key={ i } >{ i }</Select.Option>)
            }
          </Select>
        </div>

        <Req sourceObj={ sourceObj } reqTable={ reqTable } />

        <Table columns={ this.columns } dataSource={ data } style={{ width:800 }}  />
        <div  >
          <span style={{ margin:20, fontSize:20,  }} >res</span>
          <Editor value={ res }  width={ 800 } height={ 400 }  type='home/resChange'  />
          
        </div>
        <div style={{color:`${sourceObj['type'].length ? 'rgba(0,0,0,0)': 'red' }`  }} >JSON格式不正确!!!</div>
        <Button type='primary' onClick={ this.addRouter }  >提交</Button>
      </div>
    )
  }
}

export default ModalConent