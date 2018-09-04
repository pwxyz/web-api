
import { message } from 'antd'
import reqToParameters from './reqToParameters'
import resToResponses from './resToResponses'
import copy from './copy'

const consumes= [
  "application/json"
]
const produces= [
  "application/json"
]

const checkRouter = str => {

  let boolean= /^\/[a-zA-Z-/]+$/g.test(str)
  // console.log(boolean, str)
  return boolean
  }
  


const firstUpperCase = str => typeof str ==='string' ? str.substring(0,1).toUpperCase()+ str.substring(1) : str

const getRef = (router, method) => {
  // let arr = router.split('/').slice(1)
  // if(arr.length===1) {
  //   return arr[0]+ firstUpperCase(method) + 'Responses'
  // }
  // let str = arr[0] + arr.slice(1).map(i => firstUpperCase(i) )+ firstUpperCase(method)  + 'Responses'
  // return str
  const str = router.substr(1).replace(/\/[a-zA-Z]/g, match => match.substr(1).toLocaleUpperCase() )
  return str + method.replace(/[a-zA-z]/, match=> match.toLocaleUpperCase() ) + 'Responses'
}

const checkRef = ( ref, obj ) => {
  let isHave = false
  if(obj&&obj['definitions']&&obj['definitions'][ref]){
    isHave = true
  }
  return isHave
}

const checkArg = arg => !!arg

const checkRes = res => {
  try{
    JSON.parse(res)
    return true
  }
  catch(err){
    return false
  }
}

const addPathItem = state => {
  const { router,tags, description, method,  reqTable, res, needToken,  apiData, edit  } = state
  if(!checkRouter(router)){
    message.error('router 格式不正确，正确的格式为/xx或/xx/xx-xx, 其中只允许a-z、A-Z、/、-这些字符')
    return 
  }
  if(!checkArg(tags)||!checkArg(description)){
    let str = !checkArg(tags) ? 'tags' : 'description'
    message.error(str + '是必须的，请输入后再次尝试！！')
    return 
  }
  if(!checkRes(res)){
    message.error('res的JSON格式不正确，请修改后再次尝试！！')
    return 
  }
  let definitionsRef = getRef(router, method)
  if(checkRef(definitionsRef, apiData)){
    message.error(`在definitions中已经存在 ${definitionsRef}, 请修改后方法或者路由之后再来增加`)
    return 
  }
  let pathItem = {}
  pathItem[router] = {
    [method]:{
      tags: [ tags ],
      summary: description,
      description: description,
      consumes,
      produces,
      parameters: reqToParameters(reqTable, method, needToken),
      responses:{
        200:{
          description:"OK",
          schema:{
            $ref:'#/definitions/' + definitionsRef
          }
        }
      }
    }
  }

  let definitionsItem = {
    [definitionsRef]: {
      type: 'object',
      properties: resToResponses(res)
    }
  }

  let newApiData = copy(apiData)
  if(newApiData['paths'][router]){
    newApiData['paths'][router] = { ...newApiData.paths[router], ...pathItem[router] }
  }
  else if(!newApiData['paths'][router]) {
    newApiData['paths'] = { ...newApiData.paths, ...pathItem }
  }
  

  newApiData['definitions'] = { ...newApiData.definitions, ...definitionsItem }

  let str = edit ? '修改api成功': '新增api成功'
  message.success(str)

  return newApiData

}

export default addPathItem

