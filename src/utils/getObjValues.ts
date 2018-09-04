

const getObjValue = (obj:object, str: string):string =>{
  let isHaveRadio = str.indexOf('.') !==-1
  if(!isHaveRadio){
    return obj[str]
  }
  else {
    let arr = str.split('.')
    let objs = obj
    arr.map(i => {
      objs = objs[i]
    } )
    // return obj[arr[0]][arr[1]]
    return objs + ''
  }
}

export default getObjValue