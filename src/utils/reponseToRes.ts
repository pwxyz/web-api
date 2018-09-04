

const reponseToRes = (obj:object) => {
  console.log(obj)
    let objs = transformObj(obj)
    return JSON.stringify(objs, null, 2)
}

const transformObj = obj => {
  let objs = {}
  for(let key in obj){
    
    let arr = [key ]
    let type = obj[key]['type']
    if(obj[key]['description']){
      arr.push(obj[key]['description'])
    }
    let keys = arr.join('|')
    if(['integer', 'string', 'boolean'].indexOf(type)!==-1){
      objs[keys] = obj[key]['example']||obj[key]['enum']&&obj[key]['enum'][0] || ''
    }
    else if(type==='object') {
      console.log( obj[key]['properties'], transformObj(obj[key])  ) 
      objs[keys] = {...transformObj(obj[key]['properties'])}
    }
    else if(type==='array'){
      console.log(obj[key]['items'])
      objs[keys] = [{...transformObj(obj[key]['items']['properties'])}]
    }
  }
  return objs
}

// const transformObj = obj =>{
//   let objs = {}
//   for(let key in obj){
//     let type = getValueType(obj[key])
//     if(['integer', 'string', 'boolean'].indexOf(type)!==-1){
//       objs[splitArr(key)[0]] = {
//         description: splitArr(key)[1]||'',
//         example:obj[key]||'',
//         type
//       }

//     }
//     else if(type==='array'){
//       objs[splitArr(key)[0]] = {
//         type,
//         items: transformObj(obj[key])[0]
//       }
//     }
//     else {
//       objs[splitArr(key)[0]] = {
//         type,
//         properties: transformObj(obj[key]),
//       }
//     }
//   }
//   return objs
// }

export default reponseToRes
