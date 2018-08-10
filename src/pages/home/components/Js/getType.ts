

const getType = arg => {
  let type = typeof arg 
  let isArray = Array.isArray(arg)
  switch( type ){
    case 'number':
      return 'integer'
      break
    case 'object':
      return isArray ? 'array' : 'object'
      break
    default:
      return type
  }
}

// console.log(getType(2))

// export default getType
module.exports = getType

export default getType