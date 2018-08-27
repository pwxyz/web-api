
import getSourceObj from 'utils/getSourceObj'

const initRes = 
`{
  "status|状态":1,
  "message|信息":"获取成功",
  "payload":{

  }
}`

const xx = 
`{
  "status|状态":1,
  "message|信息":"获取成功",
  "payload":{
    "data|表格":[{
      "name|名字":"bob",
      "age|年龄": 15,
      "like|爱好": "game"
    }]
  }
}`

const initParmas = [
  { text: '每页的数量', value: 'limit', type: 'integer' },
  { text: '页面', value: 'page', type: 'integer' },
  { text: '', value: 'limit', type: 'integer' },
]

const initReq = {
    type: 'string',
    required: true,
    description:'',
    name:''
}


export default {
  namespace: 'home',
  state: {
    path:'',
    description:'',
    method: '',
    req: initReq,
    parameters: [],
    res: xx,
    sourceObj: getSourceObj(xx)
  },

  subscriptions:{

  },

  effects: {

  },

  reducers: {
    resChange(state, action){
      console.log(getSourceObj(action.payload))
      let sourceObj = getSourceObj(action.payload)
      return { ...state, res: action.payload, sourceObj };
    },

    selectValue(state, action){     
      let sourceObj = state.sourceObj
      let obj = {}
      for(let key in sourceObj){
        obj[key] = sourceObj[key][action.payload]
      }
      // console.log('xx', obj)
      let req = {  ...state.req, ...obj  }
      // console.log('req', req)
      return { ...state, req }
    },

    setReqInput(state, action){
      console.log('setReqInput', action)
      let req = { ...state.req, ...action.payload }
      
      return { ...state, req }
    },

    addParams(state, action){
      let obj = { ...state.req, in: state.method!=='get' ? 'body': 'query'  }
      let parameters = state.parameters.concat([{ ...obj }])
      return { ...state, parameters }
    },

    deleteParams(state, action){
      let parameters = state.parameters
      parameters = parameters.filter((i, index) => index!== action.payload )
      return { ...state, parameters }
    }
  }
}


