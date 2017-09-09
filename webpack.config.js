
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports = module.exports = {
  entry: path.resolve('./client/index.js'),
  output: {
    path: path.resolve('./public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9'
                ]
              }]
            ]
          }
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'remote screenshot',
      inject: 'body',
      template: path.resolve('./client/index.html')
    })
  ]
};
