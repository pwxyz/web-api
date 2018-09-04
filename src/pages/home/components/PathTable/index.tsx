

import React from 'react'
import pathObjArr from 'utils/pathObjToArr'
import { Table, Popover, Button } from 'antd'
import JsonView from 'components/JsonView'
const css = require('./index.less')

import definitionsToObj from 'utils/definitionsToObj'


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

const PathTable = ({ obj, definitions, filter, delRouter, editRouter }) => {

  const columns = [
    { title: '操作', dataIndex: 'action', className: css['col'], render:(text, record) => 
      <div>
        <Button type='primary' style={{ margin:5 }} onClick={ () => editRouter(record)  } >编辑</Button>
        <Button type='danger' style={{ margin:5 }} onClick={ () => delRouter(record.router, record.method) }>删除</Button>
      </div>  },
    { title: '路径', dataIndex: 'router', className: css['col']   },
    { title: '方法', dataIndex: 'method', className: css['col'] },
    { title: '描述', dataIndex: 'description', className: css['col'] },
    { title: '标签', dataIndex: 'tags', className: css['col'] },
    { title: '参数', dataIndex: 'parameters', render: text => <Item text={ text } />, className: css['col'] },
    { title: '返回数据格式', dataIndex: 'responses', render: text => <Item text={ text } />, className: css['col'] },
  ]

  let objs = definitionsToObj(obj, definitions )
  let data = pathObjArr(objs).filter(i => i&&i['router']&&i['router'].includes(filter) )
  return(
    <div className={ css['table'] }  >
      <Table columns={ columns } dataSource={ data }  />
    </div>
  )
}

export default PathTable