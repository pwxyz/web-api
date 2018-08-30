


const checkObjKey = (obj, key) => key in obj



const changeObj = (obj:object, value:string, str:string):object => {
  if(str.indexOf('.')===-1){
    return { ...obj, [str]: value }
  }
  let arr = str.split('.')
  let key  = arr[0]
  let strs = arr.slice(1).join('.')
  if(!checkObjKey(obj, key)){
    console.error(`${key} is not in ${obj}`)
    return obj
  }
  let objs = { ...obj, [key]: changeObj(obj[key], value, strs) }
  return objs

}


export default changeObj
