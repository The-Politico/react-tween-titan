const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'react-tween-titan.development.js',
  },
  devServer: {
    static: './',
    open: ['/dev'],
  },
});
