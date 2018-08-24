

import React, { Component } from 'react'
import { InputItem, SelectItem } from './Item'
import { methodArr, typeArr } from './constants'
import { Select } from 'antd'


import getObjKey from 'utils/getObjKey'
import changeObjKey from 'utils/changeObjKey'


interface props{

}

interface state{
  obj : object
  path: Array<string>
}

const objs = {
  paths:{
    '/analyse/event-view': {
      get: {
        tags: [
          "analyse"
        ],
        "summary": "解释api的含义",
        "description": "解释api的含义",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "query",
            "name": "limit",
            "required": true,
            "type": "integer",
            "description": "分页查询是限制每页的数量 结合page计算出所需要的数据索引范围 例： limit=20 page=2 应返回第21到第40数据"
          },
          {
            "in": "query",
            "name": "page",
            "required": true,
            "type": "integer",
            "description": "分页查询是限制每页的数量 结合limit计算出所需要的数据索引范围 例： limit=20 page=2 应返回第21到第40数据"
          },
          {
            "name": "timestampRange",
            "in": "query",
            "required": false,
            "type": "array",
            "description": "筛选时间戳范围 时间戳范围 秒 [123456,123456] 若没有该参数则为全部？？？待定",
            "items": {
              "type": "integer"
            }
          },
          {
            "name": "threatBehavior",
            "in": "query",
            "type": "string",
            "description": "威胁行为 若没有该参数则表示全部？？待定"
          },
          {
            "name": "threatType",
            "in": "query",
            "type": "string",
            "description": "威胁类型 若没有该参数则表示全部？？待定"
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "object",
              "properties": {
                "status": {
                  "$ref": "#/definitions/status"
                },
                "message": {
                  "$ref": "#/definitions/message"
                },
                "payload": {
                  "type": "object",
                  "properties": {
                    "total": {
                      "$ref": "#/definitions/total"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "firstTime":{
                            "type":"string",
                            "description":"首次发现时间"
                          },
                          "latelyTime":{
                            "type":"string",
                            "description":"最近发现时间"
                          },
                          "threatBehavior":{
                            "type":"string",
                            "description":"威胁行为"
                          },
                          "detailDescription":{
                            "type":"string",
                            "description":"详细描述"
                          },
                          "threatType":{
                            "type":"string",
                            "description":"威胁类型"
                          },
                          "attackedIP":{
                            "type":"string",
                            "description":"被攻击主机ip"
                          },
                          "attackerIP":{
                            "type":"string",
                            "description":"攻击主机ip"
                          },
                          "assetStates":{
                            "type":"integer",
                            "description":"资产状态"
                          },
                          "level":{
                            "type":"string",
                            "description":"威胁等级"
                          },
                          "attackStage":{
                            "type":"string",
                            "description":"攻击阶段"
                          },
                          "details":{
                            "type":"array",
    "items":{
      "type":"object",
      "properties":{
        "name":{
          "type":"string",
          "description":"详情中的key值，为中文"
        },
        "value":{
          "type":"string",
          "description":"详情中的value值，为string或者array类型，array类型数据请放在本数组的后面"
        }
      }
    }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: [
          "analyse"
        ],
        "summary": "解释api的含义",
        "description": "解释api的含义",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "query",
            "name": "limit",
            "required": true,
            "type": "integer",
            "description": "分页查询是限制每页的数量 结合page计算出所需要的数据索引范围 例： limit=20 page=2 应返回第21到第40数据"
          },
          {
            "in": "query",
            "name": "page",
            "required": true,
            "type": "integer",
            "description": "分页查询是限制每页的数量 结合limit计算出所需要的数据索引范围 例： limit=20 page=2 应返回第21到第40数据"
          },
          {
            "name": "timestampRange",
            "in": "query",
            "required": false,
            "type": "array",
            "description": "筛选时间戳范围 时间戳范围 秒 [123456,123456] 若没有该参数则为全部？？？待定",
            "items": {
              "type": "integer"
            }
          },
          {
            "name": "threatBehavior",
            "in": "query",
            "type": "string",
            "description": "威胁行为 若没有该参数则表示全部？？待定"
          },
          {
            "name": "threatType",
            "in": "query",
            "type": "string",
            "description": "威胁类型 若没有该参数则表示全部？？待定"
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "object",
              "properties": {
                "status": {
                  "$ref": "#/definitions/status"
                },
                "message": {
                  "$ref": "#/definitions/message"
                },
                "payload": {
                  "type": "object",
                  "properties": {
                    "total": {
                      "$ref": "#/definitions/total"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "firstTime":{
                            "type":"string",
                            "description":"首次发现时间"
                          },
                          "latelyTime":{
                            "type":"string",
                            "description":"最近发现时间"
                          },
                          "threatBehavior":{
                            "type":"string",
                            "description":"威胁行为"
                          },
                          "detailDescription":{
                            "type":"string",
                            "description":"详细描述"
                          },
                          "threatType":{
                            "type":"string",
                            "description":"威胁类型"
                          },
                          "attackedIP":{
                            "type":"string",
                            "description":"被攻击主机ip"
                          },
                          "attackerIP":{
                            "type":"string",
                            "description":"攻击主机ip"
                          },
                          "assetStates":{
                            "type":"integer",
                            "description":"资产状态"
                          },
                          "level":{
                            "type":"string",
                            "description":"威胁等级"
                          },
                          "attackStage":{
                            "type":"string",
                            "description":"攻击阶段"
                          },
                          "details":{
                            "type":"array",
    "items":{
      "type":"object",
      "properties":{
        "name":{
          "type":"string",
          "description":"详情中的key值，为中文"
        },
        "value":{
          "type":"string",
          "description":"详情中的value值，为string或者array类型，array类型数据请放在本数组的后面"
        }
      }
    }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } 
  },
}



class MyEdit extends Component <props, state>{
  constructor(props){
    super(props)
    this.state={
      path: getObjKey(objs['paths'])||[],
      obj: objs
    }
  }

  componentDidMount(){

  }

  methodChange = (parent, oldValue, newValue ) => {
    let obj =  changeObjKey(parent, oldValue, newValue )
    this.setState({ obj })
    console.log(this.state.obj)
  }

  render(){
    const { path, obj } = this.state
    console.log('obj', obj)
    return (
      <div key={ + new Date() } >
      </div>
    )
  }
}




export default MyEdit

