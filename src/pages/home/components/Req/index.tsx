
import React from 'react'
import { AutoComplete, Select, Switch, Button, message } from 'antd'
import commonProps from 'components/commonProps'

const Item = ({ text, onChange, value, type='input', initValue='', sourceObj={}, selectValue=any => any }) => 
  <div style={{ margin:10 }} >
    <span style={{ marginRight: 15 }} >{ text + '*:   ' }</span>
    {
      type==='input' ? <AutoComplete  onChange={ change => onChange({ [value]: change })  }
                                      dataSource={ sourceObj[value]||[] }
                                      filterOption={ (input, option) => {
                                        return (option.key+'').includes(input)
                                      }  }
                                      value={ initValue }
                                      onSelect = { select => selectValue(sourceObj[value].indexOf(select)) }   
                                      style={{ width:400, border: `1px solid ${initValue? 'rgba(0,0,0,0.0)' : 'red'  }`, borderRadius:4 }} 
                                      placeholder={ value } /> :
      type==='select' ?<Select value={ initValue } onChange={ value => onChange({ type: value })  } style={{ width:120 }} >
                          {
                            typeArr.map(i =>
                            <Select.Option key={ i }  >{i}</Select.Option>)
                          }
                      </Select> :
                      <Switch checked={  !!initValue } onChange={value =>onChange({ required: value })} />
    }
    
  </div>

const arr = [
  { text: '描述', value: 'description',   },
  { text: '值或key', value: 'name',   },
]

const typeArr = ['string', 'integer', 'object', 'array' ]

interface props{
  sourceObj: object
  state?:{
    home:{
      req: {
        type: string
        required: any
      }
    }
    
  }
  dispatch?: (any:object) => any 
}

interface state{
  req: {
    type: string
    required: any
  }
}

@commonProps()
class Req extends React.Component<props, state>{
  constructor(props){
    super(props)
  }

  onChange = obj => {
    this.props.dispatch({ type:'home/setReqInput', payload: obj })
  }

  selectValue = num => {
    console.log('num', num)
    this.props.dispatch({ type: 'home/selectValue', payload:num })
  }

  addParams = () => {
    let req = this.props.state.home.req
    console.log(req)
    if(this.chechObj(req)){
      this.props.dispatch({ type: 'home/addParams' })
    }
    else {
      message.error('存在未定义的选项，请输入后再增加参数！！！')
    }
  }

  chechObj = obj => {
    for(let key in obj){
      if(!obj[key]&&typeof obj[key]!=='boolean') return false 
    }
    return true
  }

  render(){
    
    const { sourceObj, state } = this.props
    console.log(state.home)
    return(
      <div>
        {
          arr.map(i =>
          <Item key={ i.value } text={ i.text } value={ i.value } onChange={ this.onChange } sourceObj={ sourceObj }
                selectValue = { this.selectValue } initValue={ state.home.req[i.value] } />)
        }
        <Item  text={ '类型' } value={ 'type' } onChange={ this.onChange } type='select' initValue={ state.home.req.type } />
        <Item  text={ 'required' } value={ 'required' } onChange={ this.onChange } type='required' initValue={ state.home.req.required } />
        <Button type='primary' onClick={ this.addParams } >新增参数</Button>   
      </div>
    )
  }
}


export default Req