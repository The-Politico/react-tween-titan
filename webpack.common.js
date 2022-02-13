const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'react-tween-titan.js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this',
    library: {
      name: 'ReactTweenTitan',
      type: 'umd',
    },
  },
  externals: {
    react: {
       commonjs: 'react',
       commonjs2: 'react',
       amd: 'react',
       root: 'React',
     },
   },
};
