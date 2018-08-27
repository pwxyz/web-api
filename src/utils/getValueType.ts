


const getValueType = arg => {
  if(Array.isArray(arg)){
    return 'array'
  }
  let type = typeof arg 
  let types = type ==='number'? 'integer' : type
  return types

}

export default getValueType