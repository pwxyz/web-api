

import React from 'react'
import Routers from './Routers'
import { typeArr, methodArr, inArr } from './constants'
import Record from './Record'
import Method from './Method'
import Parameters from './Parameters'

const css = require('./index.less')


interface props{
  // getItemData: (any) => any
}

interface state {
  router: string
  description: string
  tag: string
  method: string
  isShow: boolean
  parameters: Array<params>
  res: object
}



interface params{
  name: string
  in: string
  type: string
  description: string
  required: boolean
}



const initState = {
  router:'',
  description:'',
  tag:'',
  method:'get',
  isShow: false,
  parameters:[
    {
      name: '',
      in: "query",
      required: false,
      type: 'string',
      description: "暂无"
    },
  ],
  
  res:{
    status:{
      type:'integer',
      description:'状态',
      enum:[1,-1]
    },
    message: {
      type: "string",
      example: "错误信息",
      description: "请求返回的status不为1时 该值为错误的信息内容"
    },
    payload:{
      
    }
  }
}

const responses = {
  200:{
    description:'ok',
    schema:{

    }
  }
}

class Path extends React.Component<props, state>{
  constructor(props){
    super(props)
    this.state={
      ...initState,
    }

    
  }

  getInputValue = (key:string, value:string) => {
    let state = { ...this.state, [key]: value }
      this.setState(state)
  }

  render(){
    const { router, description, tag, method, isShow, parameters, res } = this.state
    return(
      <div className={ css.content } >
        <Routers tag={ tag } description={ description } router={ router } getInputValue={ this.getInputValue } />
        {
          !isShow&&
            <div>
              <Method method={ method } getInputValue={ this.getInputValue } />
              <Parameters method={ method } getInputValue={ this.getInputValue } />
            </div>
        }
      </div>
    )
  }
}


export default Path