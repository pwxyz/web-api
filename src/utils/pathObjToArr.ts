


const pathObjToArr = obj => {
  let arr = []
  for(let key in obj){
    if(!!key){
      let objs = {}
      // objs['router'] = key
      let method = Object.keys(obj[key])
      let array = method.map(i => {
        let item = {}
        item['method'] = i
        item['router'] = key
        item['tags'] = obj[key][i]['tags']
        item['description'] = obj[key][i]['description']
        item['parameters'] = obj[key][i]['parameters']
        item['responses'] = obj[key][i]['responses']
        item['key'] = i+key
        return item
      } )
      arr = arr.concat(array)
    }
    else {
      return arr
    }
  }
  return arr
}

export default pathObjToArr