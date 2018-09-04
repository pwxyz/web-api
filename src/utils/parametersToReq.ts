import copy from './copy'


const checkBody = arr => {
  let len = arr.length
  let isHave = false
  for(let i=0; i<len; i++){
    if(arr[i]['name']==="body"){
      isHave = true
    }
  }
  return isHave
}

const filterToken = arr => arr.filter(i => i['name']!=='access-token' )

const checkArr = arr => Array.isArray(arr)

const parametersToReq = (arr:Array<object>)=>{
  if(!checkArr){
    console.error(`expect recived array, but ${ typeof arr }: \n ${arr}`)
    return arr
  }
  let array = copy(arr)
  array = filterToken(array)

  if(checkBody(array)){
   let obj = array.filter(i => i['name']==='body' )[0]
   let objs = obj&&obj['schema']['properties']
   let arrs = []
   for(let key in objs){
      let arrsItem = {}
      arrsItem['name'] = key
      arrsItem['description'] = objs[key]['description']
      arrsItem['type'] = objs[key]['type']
      arrsItem['required'] = false
      arrs.push(arrsItem)
   }
   return arrs
  }

  return array
}

export default parametersToReq