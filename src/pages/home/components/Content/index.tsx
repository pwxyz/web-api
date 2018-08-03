

import React from 'react'
import MySelect from './MySelect'
import Parmas from './Parmas'
import ReactJson from 'react-json-view'
import { Input } from 'antd'

const Path = () => (
    <div>
      /analyse/attacker-details-ip
    </div>
    )

const obj = {
  "status": 1,
  "message": "错误信息",
  "payload": {
    "data": [
      {
        "attackedFirstTime": "string",
        "attackedLatelyTime": "string",
        "attatcedAssetIp": "string",
        "attackedCount": "string",
        "assetStates": "string",
        "level": "string"
      },
      {
        "attackedFirstTime": "string",
        "attackedLatelyTime": "string",
        "attatcedAssetIp": "string",
        "attackedCount": "string",
        "assetStates": "string",
        "level": "string"
      },
    ],
    "total": 10
  }
}

const CreateTable = () => {
  return(
    <div></div>
  )
}

const Span = props => <span style={{ display:'inline-block', maxWidth: 300, minWidth:100 }}  >{props.children}</span>

const CreateColumns = () => {
  return(
    <div>
      <Span>标题</Span><Span><Input  /></Span>
      <Span>key</Span><Span><Input  /></Span>
      <Span>操作</Span>
        <Span>
          <MySelect />
        </Span>
    </div>
  )
}

const Content = () => {

  return (
    <div>
      <Path />
      <MySelect />
      {/* <Parmas obj={ obj } /> */}
      {/* <ReactJson src={ obj } />  */}
      <CreateColumns />
    </div>
  )
}

export default Content