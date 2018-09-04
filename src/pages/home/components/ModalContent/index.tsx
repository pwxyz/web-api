

import React from 'react'
import {  Input, Select, Table, Button } from 'antd'
import commonProps from 'components/commonProps'
import { methodArr } from '../../constants'
import Req from '../Req'
import Tags from '../Tags'
import Editor from '../Editor'
import resToTableConfig  from 'utils/resToTableConfig'
import downloadjs from 'downloadjs'
import { notification } from 'antd'
import checkRouterAndMethod from 'utils/checkRouterAndMethod'


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
      edit: string
      apiData: object
    }
    
  }
  dispatch?: (any:any) => void
}

interface state{
  // sourceObj: object
}

const checkRes = res => {
  try{
    JSON.parse(res)
    return true
  }
  catch(err){
    return false
  }
}



@commonProps()
class ModalConent extends React.Component<props, state>{
  constructor(props){
    super(props)
    this.state={
      // sourceObj:{}
    }
  }
  // refss = null
  componentDidMount(){
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

  downloadConfig = () => {
    const { res, router, reqTable } = this.props.state.home
    
    let arr = resToTableConfig(res, reqTable)
    let name = this.getConfigName(router)
    if(arr.length===0){
        notification.error({
          description:'payload中的一级目录下不存在key值包含data且数据类型为数组的字段',
          message:'错误提示'
        })
    }
    if(arr.length){
      // console.log(name)
      downloadjs(JSON.stringify({columns: arr},null, 2), name, "application/json" )
    }
  }

  getConfigName = router => {
    let routers = router[0]==='/'? router.substr(1) : router 
    return routers.replace(/\/[a-z]/g, match => match.substr(1).toLocaleUpperCase() )
  }

  resetModal = () => {
    this.props.dispatch({ type:'home/modalReset' })
  }


  render(){
    const { res, sourceObj,  method, reqTable, tagsList, tags, router, description, edit, apiData } = this.props.state.home
    let data = reqTable.map((i, index )=> { i['key'] = index; return i } )
    let isHave = checkRouterAndMethod(apiData, router, method)
    // console.log(isHave)
    return(
      <div>
        <div style={{ width:1000 }} >
          <Tags />  
        </div>
        <Button type='primary' disabled={ !!edit } onClick={ this.resetModal } style={{ marginTop:10 }} >重置</Button>
        <div style={{ marginTop:10 }} >
          <Input  addonBefore={ '路由:*' }  placeholder='/home/edit' onChange={ e => this.titleChange({ router: e.target.value })  } 
                  style={{ width:300 }} value={ router }  disabled={ !!edit } />
        </div>
        {/* <div style={{ marginTop:10 }} >
          <Input addonBefore={ 'tags:*' } placeholder='home' onChange={ e => this.titleChange({ tags: e.target.value })  } style={{ width:300 }} />
        </div> */}
        <div  style={{ marginTop:10 }} >
          <span style={{ marginRight:10 }}>tags:*</span>
          <Select style={{ width: 320 }}  onChange={ value => this.titleChange({ tags: value })  } value={ tags  }  >
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
          <Select style={{ width: 120 }}  onChange={ value => this.titleChange({ method: value })  } value={ method} disabled={!!edit} >
            {
              methodArr.map(i =>  
                <Select.Option key={ i } >{ i }</Select.Option>)
            }
          </Select>
          <span style={{ color:'red', marginLeft:30, display:`${isHave&&!edit ? 'inline-block':'none'}` }} >警告：在此api下，已有该方法，新增此api后，原方法将会被覆盖</span>
        </div>

        <Req sourceObj={ sourceObj } reqTable={ reqTable } />

        <Table columns={ this.columns } dataSource={ data } style={{ width:800 }}  />
        <Button disabled={ !checkRes(res) } onClick={ this.downloadConfig } type='primary' >下载tableConfig文件</Button>
        <div  >
          <span style={{ margin:20, fontSize:20,  }} >res*</span>
          <Editor value={ res }  width={ 800 } height={ 400 }  type='home/resChange'  />
          
        </div>
        <div style={{color:`${checkRes(res) ? 'rgba(0,0,0,0)': 'red' }`  }} >JSON格式不正确!!!</div>
        <Button type='primary' onClick={ this.addRouter }  disabled={ !checkRes(res) } >{ edit? '修改': '提交'  }</Button>
      </div>
    )
  }
}

export default ModalConent