import getValueType from './getValueType'

const resToResponses = (str: string) => {
  let obj = JSON.parse(str)
  return transformObj(obj)
}



const splitArr = str => str.split('|')

const transformObj = obj =>{
  let objs = {}
  for(let key in obj){
    let type = getValueType(obj[key])
    if(['integer', 'string', 'boolean'].indexOf(type)!==-1){
      objs[splitArr(key)[0]] = {
        description: splitArr(key)[1]||'',
        example:obj[key]||'',
        type
      }

    }
    else if(type==='array'){
      objs[splitArr(key)[0]] = {
        type,
        items: transformObj(obj[key])[0]
      }
    }
    else {
      objs[splitArr(key)[0]] = {
        type,
        properties: transformObj(obj[key]),
      }
    }
  }
  return objs
}

export default resToResponses

