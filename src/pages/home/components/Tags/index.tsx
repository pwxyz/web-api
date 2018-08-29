

import React, { Component } from 'react'
import commonPorps from 'components/commonProps'
import { Input, Button, Table, message } from 'antd'
import copy from 'utils/copy'


interface props{
  dispatch?: ( any: any)=> void
  state?:{
    home:{
      tagsList?: Array<object>
    }
  }
}

interface state{
  tagItem:{
    name: string
    description: string
  }
}

const initTagItem = {
  name:'',
  description: ''
}

@commonPorps()
class Tags extends Component<props, state> {
  constructor(props){
    super(props)
    this.state={
      tagItem:initTagItem
    }
  }
  componentDidMount(){
    console.log(this.props)
  }

  onChange = obj => {
    let tagItem = { ...this.state.tagItem, ...obj }
    this.setState({ tagItem})
  }

  preAdd = () => {
    const tagItem = this.state.tagItem
    if(tagItem.name&&tagItem.description){
      this.props.dispatch({ type: 'home/addTags', payload: tagItem })
      this.setState({ tagItem: initTagItem })
    }
    else {
      let arr = [tagItem.name ? '':'name',  tagItem.description? '': 'description' ]
      console.log(arr.join('、') )
      let str ='请输入' + arr + '后再新增tags!!'  
      message.error(str)
    }
  }

  render(){

    const columns = [
      { title: 'name', dataIndex: 'name' },
      { title: 'description', dataIndex: 'description' },
    ]
    const { tagsList } = this.props.state.home
    let data = copy(tagsList).map((i, index) =>  {
      i['key'] = index
      return i
    })
    const { name, description } = this.state.tagItem
    return(
      <div>
        <Input addonBefore={ 'name*' } onChange={ e=> this.onChange({ name: e.target.value }) } style={{ width:300 }} value={ name }  />
        <Input addonBefore={ 'description*' } onChange={ e=> this.onChange({ description: e.target.value }) } style={{ width:300 }} value={ description } />
        <Button type='primary' onClick={ this.preAdd }  >新增tags</Button>
        <div style={{ marginTop:20 }} >Tags列表</div>
        <div style={{ width:400 }} >
          <Table columns={ columns } dataSource={ data } pagination={ false }  />
        </div>
      </div>
    )
  }
}

export default Tags