

import React from 'react'
import { Select } from 'antd'

const Option = Select.Option

const WithSelect = ({ value='', getInputValue, keys, arr }) => {
  return (
    <div>
      <span style={{ display:'inline-block', margin:10 }} >{ keys }</span>
      <Select defaultValue={ value ? value : arr[0] } style={{ width:120 }} onChange={ value => getInputValue(keys, value) } >
        {
          arr.map((i, index) => 
              <Option key={ arr[index] }  >{ i }</Option>)
        }
      </Select>
    </div>
  )
}

export default WithSelect