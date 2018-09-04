
import copy from './copy'
import { initToken } from '../pages/home/constants'


const checkObj = (arr:Array<object>) => {
  let isHave = false
  let len = arr.length 
  for(let i=0; i<len; i++ ){
    if(arr[i]['name']==='access-token'){
      isHave = true
    }
  }
  return isHave
}

const reqToParameters = (arr:Array<object>, method: string, needToken:boolean) => {
  let arrs = copy(arr)

  let array = arrs.map(i =>  {
    // if(i['name']!=='access-token') {
      i['in'] = method==='get' ? 'query' : 'body'
    // }
    delete i['key']
    return i
  })
  array = needToken&&checkObj(arrs) ? array.concat(initToken) : array

  return array
}

const getOtherObj = arr => {
  let obj = {}
  let len = arr.length 
  for(let i=0; i<len; i++){
    let key = arr[i]['name']
    let description = arr[i]['description']
    let type = arr[i]['type']
    obj[key] = {
      type,
      description
    }
  }
  return obj
}

//默认get、delete数据携带位置为query，即url上面，其余如post、put、patch等方法数据传参位置在body中
const reqToParametersx = (arr:Array<object>, method: string, needToken:boolean) => {
  let arrs = copy(arr)
  let array = []
  if(method==='get'|| method==='delete'){
    array = arrs.map(i => {
      i['in'] = 'query'
      delete i['key']
      return i
    } )
  }
  else {
    let obj ={
      in: "body",
      name: "body",
      description: "",
      required: true,
      schema:{
        type: "object",
        properties:getOtherObj(arrs)
      }
    }
    array = [{...obj}]
  }


  array = needToken&&!checkObj(arrs) ? array.concat(initToken) : array
  return array
}

export default reqToParametersx