
const fs = require('fs')

const obj = require('./test.json')

const path = '/home'

const method = 'get'

const tag = 'home'

const description = '这是一个测试'

const req = {
  page:1,
  limit:15,
  color:'red'
}

const payload = {
  data:[{
    time: '1979-1-3',
    kind:'asfa',
  }],
  total:53
}

const res = {
  status: 1,
  message:'获取成功',
  payload,
  arr:['sf']
}

const getType = arg => typeof arg === 'number' ? 'integer' : (typeof arg==='object'&&Array.isArray(arg)) ? 'array': typeof arg

const transformObj = obj => {
  let xx = {}
  for(let key in obj){
    let type = getType(obj[key])
    let kind = type==='object'? 'properties': type==='array'? 'items' : 'description'
    console.log(kind)
     let keys = {}
    keys[type] = type
    keys[kind] = kind==='object' ? transformObj(obj[key]) : obj[key]
    xx[key] = keys
  }
  return xx
}

const transformBasic = arg => {
  let obj = {}
  obj['type'] = getType(arg)
}

const transformArr = arr => {

}

const write = data => fs.writeFile('objxx.json', JSON.stringify(data),
       err => { 
         if(err){ console.log(err) }
          else { console.log('success') } 
        })
 write(transformObj(res))  



const getParmas = () => {
  let arr = []
  for(let key in req){
    let objs = {}
    objs['name'] = key
    objs["in"]= method==='get' ? "query" : "body" 
    objs['required'] = true
    objs['type'] = getType(req[key])
    objs["description"] = '暂无'
    arr.push(objs)
  }
  return arr
}



const getRes = (objss) => {
  let ooxx ={}
  for(let key in objss){
    let kind = getType(objss[key])
    ooxx[key] = {
      type: kind,
      description: '暂无'
    }
    if(kind==='array'||kind==='object'){
      ooxx[key] = { 
        ...ooxx[key],
        [kind==='object'
          ?'properties':'items']: getRes(objss[key])
        }
    }
  }
  return {
    type:"object",
    properties: ooxx
  }
}

const combinePath = () => {
  let objs = {
    [path]: {
      [method]:{
        tags:[ tag ],
        summary: description,
        description: description,
        consumes: [
          "application/json"
        ],
        produces: [
          "application/json"
        ],
        parameters:  getParmas() ,
        responses: {
          200: {
            description: 'ok',
            schema: getRes(res)
          }
        }
      }
    }
  }
  return objs
}

// const run = function run(){
//   obj.paths = {   ...combinePath() }
//   fs.writeFile('xxx.json', JSON.stringify(obj),err =>{
//     if(err){
//       console.log(err)
//     }
//     else console.log('success')
//   }) 
// }

// run()