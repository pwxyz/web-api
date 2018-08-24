// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

import path from 'path'

export default {
  alias:{ "utils" : path.resolve(__dirname, './src/utils') },
  plugins: ['umi-plugin-dva', 'umi-plugin-polyfill' ],
}
