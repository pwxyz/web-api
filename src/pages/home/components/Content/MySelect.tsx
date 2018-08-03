

import React from 'react'
import { Select } from 'antd'

const methodArr = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
const Option = Select.Option;


const MySelect = () => 
  <div>
  <Select defaultValue={ methodArr[0] } style={{ width: 120 }} >
  {
    methodArr.map(i => 
      <Option value={ i } key={ i } >{ i }</Option>
    )
  }
  </Select>
  </div>

  export default MySelect