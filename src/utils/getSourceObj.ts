import getValueType from './getValueType'


const getObjAllKeys = obj => {
 
  let arr = Object.keys(obj)
  arr = arr.map(i => i+'&'+ getValueType (obj[i]) )

  for(let i = 0; i<arr.length; i++){
    let key = arr[i].split('&')[0] 
    
    if( getValueType( obj[key] )==='array') {
      if( typeof obj[key][0] === 'object'&&!Array.isArray(obj[key][0])){
        arr= arr.concat( getObjAllKeys(obj[key][0]) )
      }
    }
    if(getValueType( obj[key] )==='object' ){
      arr= arr.concat( getObjAllKeys(obj[key][0]) )
    }
  }
  
  return arr 
}

// const getValueType = (key, obj) => {

// }

const isHave = str => str.includes('|')

const getSourceObj = str => {
  const initObj = {
    description: [],
    name:[],
    type:[],
  }
  try {

    let obj = JSON.parse(str)

    if(obj.payload){

      let arr = getObjAllKeys(obj.payload)

      initObj.description = arr.map(i =>isHave(i) ? i.split('|')[1].split('&')[0] : '暂无' )
      initObj.name = arr.map(i => isHave(i) ? i.split('|')[0] : i.split('&')[0] )
      initObj.type = arr.map(i => isHave(i) ?  i.split('|')[1].split('&')[1] : i.split('&')[1] )

      return initObj
    }
    return initObj
  }
  catch(err){
    // console.warn('input schema is err \n', err)
    console.warn('input schema is err')
    return initObj
  }
}

export default getSourceObj