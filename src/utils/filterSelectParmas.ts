
const copy = arg => JSON.parse(JSON.stringify(arg))


const filterSelectParmas = (obj, arr) => {
  try{
    let objs = copy(obj)
    let array = copy(arr)
    for(let key in objs){
      
      objs[key] = objs[key].filter(i => {
        let len = array.length
        
        let shouldHave = true
        for(let j = 0; j<len ; j++){
          if(array[j][key]===i){
            shouldHave = false
          }
        }
        return shouldHave
      } )
    }
    return objs
  }
  catch(err){
    console.error('数据格式不正确，已经返回原数据！！！')
    return obj
  }
}

export default filterSelectParmas