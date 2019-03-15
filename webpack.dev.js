const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {

  devtool: 'eval-cheap-module-source-map',

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: './src/main.js'
  },

  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 8080
  },

  module: {
    rules: [

      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
          // Please note we are not running postcss here
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ],
        exclude: path.resolve(__dirname, './src/index.html')
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // On development we want to see where the file is coming from, hence we preserve the [path]
              name: '[path][name].[ext]?hash=[hash:20]',
              limit: 8192
            }
          }
        ]
      }
    ],
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};