
import getSourceObj from 'utils/getSourceObj'
import { methodArr, initApiData } from './constants'
import reqToParameters from  'utils/reqToParameters'
import addPathItem  from 'utils/addPathItem'

// import pathObjToArr from 'utils/pathObjToArr'

// import definitionsToObj from 'utils/definitionsToObj'

const initRes = 
`{
  "status|状态":1,
  "message|信息":"获取成功",
  "payload":{

  }
}`


const inintReqTable = [
  { description: '每页的数量', name: 'limit', type: 'integer', required: true },
  { description: '页面', name: 'page', type: 'integer', required: true },
]

const initReq = {
    type: 'string',
    required: false,
    description:'',
    name:''
}

const initState = {
  router:'',
  tags: '',
  description:'',
  req: initReq,
  res: initRes,
}


export default {
  namespace: 'home',
  state: {
    apiData:initApiData,
    router:'',
    tags: '',
    tagsList: initApiData.tags||[],
    description:'',
    method: methodArr[0],
    req: initReq,
    reqTable: inintReqTable,
    res: initRes,
    needToken: true,
    sourceObj: getSourceObj(initRes)
  },

  subscriptions:{

  },

  effects: {

  },

  reducers: {
    resChange(state, action){
      // console.log(getSourceObj(action.payload))
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
      let req = { ...state.req, ...action.payload }
      return { ...state, req }
    },

    addParams(state, action){
      let obj = { ...state.req, in: state.method!=='get' ? 'body': 'query'  }
      let reqTable = state.reqTable.concat([{ ...obj }])
      console.log(reqToParameters(reqTable, 'get', true))
      return { ...state, reqTable, req: initReq }
    },

    deleteParams(state, action){
      let reqTable = state.reqTable
      reqTable = reqTable.filter((i, index) => index!== action.payload )
      return { ...state, reqTable }
    },

    tokenChange(state, action){
      return { ...state, needToken: action.payload }
    },

    titleChange(state, action){
      return { ...state, ...action.payload }
    },

    addRouter(state, action){
      let apiData = addPathItem(state)
      console.log(!!apiData)
      if(!!apiData){
        return { ...state, apiData, ...initState }
      }
      else return { ...state }
    },

    addTags(state, action){
      let tagsList = state.tagsList.concat(action.payload)
      let  apiData = {  ...state.apiData, tags: tagsList }
      return { ...state, tagsList, apiData }
    },

    uploadJson(state, action){
      let apiData = action.payload
      let tagsList = apiData.tags
      // console.log(pathObjToArr(apiData.paths))
      // console.log(definitionsToObj(apiData.paths, apiData.definitions))
      return { ...state, apiData, tagsList }
    },

    changeHead(state, action){
      let apiData = action.payload
      return { ...state, apiData }
    }
  }
}


