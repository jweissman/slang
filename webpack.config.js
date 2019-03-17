var path = require('path');

module.exports = {
  mode: 'development',
  entry: './lib/slang/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'slang.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ohm$/,
        loader: 'ohm-loader'
      }
    ]
  },
  node: {
    fs: "empty"
  }
};