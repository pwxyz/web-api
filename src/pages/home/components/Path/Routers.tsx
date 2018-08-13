

import React from 'react'
import { Input } from 'antd'

const Wrap = ({ children }) => <div style={{ margin:10 }} >{children}</div>

const Routers = ({ router, description, tag, getInputValue }) => {
  return (
    <div>
      {/* <span>{ router }</span>
      <span>{ description }</span>
      <span>{ tag }</span> */}
      <Wrap>
        <Input addonBefore={ '路径 *' } value={ router }
        placeholder='路径， 例如 /api/home' onChange={ e => getInputValue('router', e.target.value) } />
      </Wrap>
      <Wrap>
        <Input addonBefore={ '描述 *' } value={ description }
        placeholder='描述， 例如 这是一个测试' onChange={ e => getInputValue('description', e.target.value) } />
      </Wrap>
      <Wrap>
        <Input addonBefore={ '标签 *' } value={ tag }
        placeholder='标签， /api' onChange={ e => getInputValue('tag', e.target.value) }  />
      </Wrap>
    </div>
  )
}

export default Routers 