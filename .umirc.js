// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

import path from 'path'

const alias = arr => {
  let obj = {}
  arr.map(i => {
    obj[i] = path.resolve(__dirname, `./src/${i}`)
  } )
  return obj
}

export default {
  alias: alias(['utils', 'components' ]) ,
  plugins: ['umi-plugin-dva', 'umi-plugin-polyfill' ],
}
