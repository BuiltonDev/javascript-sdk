const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
require('core-js');

module.exports = {
  mode: 'production',
  entry: ['./src/main.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'ShareActor',
    filename: 'main.bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    ],
  },
  plugins: [
    new UglifyJSPlugin({
      uglifyOptions: { mangle: false },
    }),
  ],
};
