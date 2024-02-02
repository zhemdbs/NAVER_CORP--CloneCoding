const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/js/main.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    port: 2000,
    open: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.tsx?$/i,
        use: ['ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        loader: 'file-loader',
        options: {
          publicPath: './',
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'NAVER',
      filename: 'index.html',
      template: './src/index.html',
      favicon: './src/favicon.ico'
    }),
    new CleanWebpackPlugin()
  ]
};
