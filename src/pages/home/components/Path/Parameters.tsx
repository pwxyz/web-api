

import React from 'react'
import { Input, Switch, Button  } from 'antd'
import { typeArr, inArr }  from './constants'
import WithSelect from  './WithSelect'

interface props{
  getInputValue: (key: any, value:any) => any 
  method: string
}

interface state{
  parameters: Array<params>
}

interface params{
  name: string
  in: string
  type: string
  description: string
  required: boolean
}


const Item = ({ getValue, name, method, required, type, description }) => 
  <div style={{ margin:10 }} >
    <div style={{ marginTop:10 }} >
      <Input addonBefore='name' onChange={ e => getValue('name', e.target.value) } value={ name } />
    </div>
    <div style={{ marginTop:10 }} >
      <Input addonBefore='description' onChange={ e => getValue('description', e.target.value) } value={ description }  />
    </div>
    <div style={{ margin:10 }} >
      <span>in: &nbsp;&nbsp;&nbsp;&nbsp;{ method!=='get' ? inArr[1] :inArr[0] }</span>
    </div>
    <WithSelect value={ type } getInputValue={ getValue }  keys={ 'type' } arr={ typeArr } />
    <span style={{ display:'inline-block', margin:10 }} >required</span>
    <Switch  checked={ required } onChange={ isCheck => getValue('required', isCheck) }  />
    <Button style={{ marginLeft:30 }} >删除本列</Button>
    
  </div>

const initItem = {
  name: '',
  in: 'query',
  type: 'string',
  description: '',
  required: false
}

class Parameters extends React.Component<props, state>{
  constructor(props){
    super(props)
    this.state={
      parameters:[{...initItem}]
    }
  }

  getValue = (key, value, index) => {
    let parameters = this.state.parameters
    parameters[index] = { ...parameters[index], [key]:value }
    if(this.props.method!=='get'){parameters = parameters.map(i => {
      i.in = 'body'
      return i
    })}
    this.setState( { parameters } )
  }

  getArrValue = (index,key) => this.state.parameters[index][key]


  add = () => {
    let parameters = this.state.parameters
    this.setState({ parameters: parameters.concat(initItem) })
  } 

  render(){
    const { parameters } = this.state
    const { method } = this.props
    return(
      <div>
        {
          parameters.map((item, index) =>
            <Item getValue={ (key, value) => this.getValue(key, value, index) }
            name={ this.getArrValue(index, 'name') }
            // ins={ this.getArrValue(index, 'in') } 
            method={ method }
            required={ this.getArrValue(index, 'required') } 
            type={ this.getArrValue(index, 'type') } 
            description={ this.getArrValue(index, 'description') }
            key={ index }   />)
        }
        <div onClick={ this.add } >增加</div>
      </div>
    )
  }
}

export default Parameters 