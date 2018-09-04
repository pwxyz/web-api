

import getValueType from './getValueType'


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
  console.log(arr)
  let array = getReqKey(arr)
  let columns = []
  for(let key in obj){
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
  }
  return columns
}

const resToTableConfig = (str, array) => {
  if(!checkStr(str)){
    console.error('res can not JSON.parse to obj')
    return []
  }
  else {
    let obj = JSON.parse(str)

    if(obj['payload']){
      let arr= getColumns(obj['payload'], array)

      return arr
    }
  
  }

}

export default resToTableConfig