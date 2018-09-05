

import getValueType from './getValueType'
import getFirstUpper from './getFirstUpper'


const checkStr = str => {
  try{
    str&&JSON.parse(str)
    return true
  }
  catch(err){
    return false
  }
}

const checkKey = str => str.toLowerCase().includes('data')

const getArr = str => str.split('|')

const getReqKey = arr =>  arr.map(i => i.name )

const getColumns = (obj, arr) => {
  let array = getReqKey(arr)
  let objs = {}
  
  for(let key in obj){
    let columns = []
    let type = getValueType(obj[key])
    if(type==='array'&&checkKey(key)&&getValueType(obj[key][0]==='object')){
      let configObj = obj[key][0]
      
      for(let keys in configObj){
        
        let dataIndex = getArr(keys)[0]
        let title = getArr(keys).length ===2 ? getArr(keys)[1] : ''
        let obj = { dataIndex, title }
        if(array.includes(dataIndex)){
          obj['conditionType'] = 'selector'
          obj['filters'] = []
        }
        columns.push(obj)
      }
    }
    if(type==='object'){
      let inObj = getColumns(obj[key], arr)
      for(let i in inObj){
        objs[key.split('|')[0]+ getFirstUpper(i)] = inObj[i]
      }
      // objs[key] = getColumns(obj[key], arr)
    }
    if(columns.length){
        objs[key.split('|')[0]] = { columns }
      }  
    }
  return objs
}

const resToTableConfig = (str, array) => {
  if(!checkStr(str)){
    console.error('res can not JSON.parse to obj')
    return []
  }
  else {
    let obj = JSON.parse(str)

    if(obj['payload']){
      let objss= getColumns(obj['payload'], array)
      console.log('objss',objss)
      return objss
    }
  
  }

}

export default resToTableConfig