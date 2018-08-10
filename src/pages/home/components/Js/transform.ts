
let api = [
  {
    path:'/home',

  }
]


// const transform = arg => {
//   // let obj = {}

// }
import getType from './getType'

const transformReq = obj => {
  let type = getType(obj)
  let objs = {}
  if(type==='object'){
    for(let key in obj){
      let types = getType(obj[key])
      objs['name'] = key 
      objs['in'] = 'query'
      objs['required'] = false 
      objs['type'] = type
      objs['description'] = obj[key]
    }
  }
}

