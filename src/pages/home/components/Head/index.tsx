

import React, { Component } from 'react'
import { Input } from 'antd'
import commonProps from 'components/commonProps'
import getObjValues from 'utils/getObjValues'
import changeObj from 'utils/changeObj'
import Tags from '../Tags'

const css = require('./index.less')

interface props{
  dispatch?:(any:any) => void
  state?:{
    home:{
      apiData: object,
      name: string
    }
  }
}

interface state{
  foucs:object
}

const arr = [
  { value: 'info.title' },
  { value: 'info.description' },
  { value: 'info.version' },
  { value: 'host' },
  { value: 'basePath' },
]


@commonProps()
class Head extends Component<props,state>{
  constructor(props){
    super(props)
      this.state={
        foucs:{
          test: false
        }
      }
  }


  onChange = (value, str) => {
    let  apiData  = this.props.state.home.apiData
    apiData = changeObj(apiData, value, str)
    this.props.dispatch({ type:'home/changeHead', payload: apiData })
  }

  changeName = value => {
    this.props.dispatch({ type:'home/changeName', payload: value })
  }

  render(){
    const { apiData, name } = this.props.state.home
    // console.log(apiData)
    return(
      <div className={ css.input } >
        <Input  addonBefore={ '文件名' } value={ name } disabled={ false } 
                  onChange={ e => this.changeName(e.target.value)  }   />
        {
          arr.map(i =>
            <Input key={ i.value } addonBefore={ i.value } value={ getObjValues(apiData, i.value ) } disabled={ false } 
                  onChange={ e => this.onChange(e.target.value, i.value)  }   />  )
        }
        <Tags />
      </div>
    )
  }
}

export default Head