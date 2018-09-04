
export const  methodArr = ['get', 'post', 'put', 'delete']


export const initToken = {
  type: 'string',
  required: true,
  description:'用户验证用户请求权限的密令',
  name:'access-token',
  in: 'header'
}

export const initApiData = {
  swagger:"2.0",
  info:{
    description:"",
    version:"v0.1.0",
    title:"example"
  },
  host:"localhost",
  basePath:"/",
  tags:[],
  schemes:["http"],
  paths:{},
  definitions:{},
}

const pathArr = [
  {
    path:'',
    description:'',
    tag:'',
    method:'',
    req:[
      {
        name:'',
        in:"query",
        type:'',
        description:'',
      }
    ],
    res:{
      message:{
        type:'string',
        description:'错误信息'
      }
    }
  }
]