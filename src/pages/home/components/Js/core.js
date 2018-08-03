
const fs = require('fs')

const obj = require('./test.json')

const path = '/home'

const method = 'get'

const tag = 'home'

const description = '这是一个测试'

const req = {
  page:1,
  limit:15,
  type:'red'
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
}

const getParmas = () => {
  let objs = {}
  for(let key in req){
    objs['name'] = key
    objs["in"]= method==='GET' ? "query" : "body" 
    objs['required'] = true
    objs['type'] = typeof req[key] ==='number' ? 'integer' : typeof req[key]
    objs["description"] = '暂无'
  }
  return objs
}

const getRes = (objss) => {
  let ooxx ={}
  for(let key in objss){
    ooxx[key] = {
      type: typeof objss[key],
      description: '暂无'
    }
  }
  return ooxx
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
        parameters: [ getParmas() ],
        responses: {
          200: {
            description: 'ok',
            schema: getRes
          }
        }
      }
    }
  }
  return objs
}

const run = function run(){
  obj.paths = {  ...obj.paths, ...combinePath() }
  fs.writeFile('xxx.json', JSON.stringify(obj),err =>{
    if(err){
      console.log(err)
    }
    else console.log('success')
  }) 
}

run()