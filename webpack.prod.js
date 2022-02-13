const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = {
  mode: 'production',
  output: {
    filename: 'react-tween-titan.production.js',
  },
};
