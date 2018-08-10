

import React from 'react'
import { Input, Select } from 'antd'
import Path from './Path'


const methodArr = ['get', 'post', 'put', 'delete' ]

const typeArr = ['string', 'integer', 'boolean', 'array', 'object' ]

const SelectItem = ({arr}) => 
  <Select defaultValue={ arr[0] } style={{ width: 120, textTransform:'uppercase' }}>
    {
      arr.map(( i, index ) => 
        <Select.Option value={ i } key={ index }  >
          <div style={{ textTransform:'uppercase' }} >{ i }</div>
        </Select.Option> )
    }
  </Select>

const InputItem = ({ name, placeholder }) => 
  <div>
    <span style={{ minWidth:80, display:'inline-block' }} >{`${name}:    `}</span><Input  style={{ width:300 }} placeholder={ placeholder } />
  </div>


const Content = () => {
  return (
    <div style={{ border:'1px solid rgba(0,0,0,0.3)', padding:15 }} >
      <InputItem  name={ 'path' } placeholder={ 'api地址' } />
      <InputItem  name={ 'description' }  placeholder={ '作用描述' } />
      <InputItem  name={ 'tag' }  placeholder={ '标签' } />
      <SelectItem arr={ methodArr } />
      <div>
        <div>Req</div>
        <Input addonBefore='name' style={{ width:200 }} />
        <Input addonBefore='description' style={{ width:200 }} />
        <SelectItem arr={ typeArr } />
      </div>
    </div>
  )
}

export default Content