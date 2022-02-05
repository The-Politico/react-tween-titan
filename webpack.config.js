const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'index.js',
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
  devServer: {
    static: './',
    open: ['/dev'],
  },
};
