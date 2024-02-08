const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const pages = fs
  .readdirSync(path.resolve(__dirname, 'src/views')) //디렉토리 읽어오기
  .filter(fileName => fileName.endsWith('.html'));

const viewsDir = path.resolve(__dirname, 'src', 'views');
const folders = fs
  .readdirSync(viewsDir)
  .filter(item => fs.statSync(path.join(viewsDir, item)).isDirectory()); //파일체크 및 폴더여부

const htmlPlugins = folders.flatMap(folder => {
  const folderPath = path.join(viewsDir, folder);
  const htmlFiles = fs
    .readdirSync(folderPath)
    .filter(file => file.endsWith('.html'));

  return htmlFiles.map(file => {
    return {
      filename: `views/${folder}/${file}`,
      template: `src/views/${folder}/${file}`,
      inject: true,
      chunks: []
    };
  });
});

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    filename: '[name]_bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    port: 2000,
    open: true,
    hot: true,
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true
      }
    }
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
        type: 'asset',
        generator: {
          filename: 'img/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    // views/index.html
    ...pages.map(
      page =>
        new HtmlWebpackPlugin({
          template: `src/views/${page}`,
          filename: `views/${page}`
        })
    ),
    // views/html/main_j.html
    ...htmlPlugins.map(htmlPlugins => new HtmlWebpackPlugin(htmlPlugins)),
    new MiniCssExtractPlugin({
      filename: 'common.css'
    }),
    new CopyPlugin({
      patterns: [{ from: './src/img', to: 'img' }]
    })
  ]
};
