
import copy from './copy'
import { initToken } from '../pages/home/constants'

const reqToParameters = (arr:Array<object>, method: string, needToken:boolean) => {
  let arrs = copy(arr)
  let array = arrs.map(i =>  {
    // if(i['name']!=='access-token') {
      i['in'] = method==='get' ? 'query' : 'body'
    // }
    delete i['key']
    return i
  })
  array = needToken ? array.concat(initToken) : array

  return array
}

export default reqToParameters