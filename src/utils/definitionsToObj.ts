
import copy from './copy'
// import changeObjKey from './changeObjKey'
import getValueType from './getValueType'

const definitionsToObj = (obj, definitions) => {
  let objs = copy(obj)
  for(let key in objs){
    if(key ==='$ref'){
      let definitionsKey = objs['$ref'].split('/')[2]
      let value = definitions[definitionsKey]
      
      const type = getValueType(value)
      if(type ==='array'){
        // objs[key][0] = definitionsToObj(objs[key][0], definitions)
        let len = objs[key].length
        for( let i=0; i<len; i++){
          objs[key][i] = definitionsToObj(objs[key][i], definitions)
      }
      }
      else if (type === 'object'){
        value = definitionsToObj(value, definitions)
      }

      objs = { ...objs, ...value }
      delete objs['$ref']
    }
    const type = getValueType(objs[key])
    if(type ==='array'){
      // objs[key][0] = definitionsToObj(objs[key][0], definitions)
      let len = objs[key].length
      for( let i=0; i<len; i++){
        objs[key][i] = definitionsToObj(objs[key][i], definitions)
      }
    }
    else if (type === 'object'){
      objs[key] = definitionsToObj(objs[key], definitions)
    }
  }
  return objs

}

export default definitionsToObj