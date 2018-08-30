

import React from 'react'
import pathObjArr from 'utils/pathObjToArr'
import { Table, Popover, Input } from 'antd'
import JsonView from 'components/JsonView'
const css = require('./index.less')

import definitionsToObj from 'utils/definitionsToObj'

const columns = [
  { title: '路径', dataIndex: 'router', className: css['col']   },
  { title: '方法', dataIndex: 'method', className: css['col'] },
  { title: '描述', dataIndex: 'description', className: css['col'] },
  { title: '标签', dataIndex: 'tags', className: css['col'] },
  { title: '参数', dataIndex: 'parameters', render: text => <Item text={ text } />, className: css['col'] },
  { title: '返回数据格式', dataIndex: 'responses', render: text => <Item text={ text } />, className: css['col'] },
]


const Content = ({ json }) => {
    return (
      <div style={{ maxHeight:300, overflow:'scroll' }} >
        <JsonView json={ json }  />
      </div>
      
    )

}
  

const Item = ({ text }) => 
  <Popover content={ <Content json={ JSON.stringify(text, null, 2) } /> } autoAdjustOverflow  placement='bottom'>
    <div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'  }} >{JSON.stringify(text)}</div>
  </Popover >

const PathTable = ({ obj, definitions }) => {
  let objs = definitionsToObj(obj, definitions )
  let data = pathObjArr(objs)
  return(
    <div id='xx'  >
      <Table columns={ columns } dataSource={ data }  />
    </div>
  )
}

export default PathTable