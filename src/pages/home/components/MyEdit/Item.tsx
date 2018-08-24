
import React from 'react'
import { Input, Select, AutoComplete  } from 'antd'
const css = require('./index.less')

export  const InputItem = ({ onChange, text, value, dataSource=[] }) => {
  return (
    <div className={ css.item }>
      <span className={ css['item-left'] } >{ text + '  :' }</span>
      {/* <Input onChange={ e => onChange({ [value]: e.target.value }) } /> */}
      <AutoComplete
        dataSource={dataSource.map(i => i+'')}
        style={{ width: 400 }}
        onSelect={e => onChange({ [value]: e })}
        onChange={e => onChange({ [value]: e })}
        backfill
        filterOption={ (value, option) => {
          // console.log(value, option.key)
          // return true
          let a = (option.props.children+'').includes(value)
          // console.log(a)
          return a
        } }
        placeholder=""
      />
    </div>
  )
}


export const SelectItem = ({ onChange, text, value, arr }) => {
  if(Array.isArray(arr)&&arr.length)
  return (
    <div className={ css.item }>
      <span className={ css['item-left'] } >{ text + '  :' }</span>
      <Select onChange={ e =>  onChange({ [value]:e }) }  style={{ width:120 }} defaultValue={ arr[0] } >
        {
          arr.map(i => 
            <Select.Option key={ i } value={ i } >{ i }</Select.Option>  )
        }
      </Select>
    </div>
  )
}


