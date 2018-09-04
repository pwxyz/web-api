

import React from 'react'
import { Select } from 'antd'
import { methodArr } from './constants'

const Option = Select.Option

const Method = ({ method, getInputValue }) => {
  return (
    <div>
      <span style={{ display:'inline-block', margin:10 }} >method</span>
      <Select defaultValue={ method ? method : methodArr[0] } style={{ width:120 }} onChange={ value => getInputValue('method', value) } >
        {
          methodArr.map((i, index) => 
              <Option key={ methodArr[index] }  >{ i }</Option>)
        }
      </Select>
    </div>
  )
}

export default Method