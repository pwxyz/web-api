const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports =(webpackConfig, env) => {

  webpackConfig.plugins.push(new MonacoWebpackPlugin())
  
  return webpackConfig
}