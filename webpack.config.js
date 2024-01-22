const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, 'dist')
    }
  },
  watchOptions: {
    poll: true,
    ignored: ['node_modules', 'dist']
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true //빈칸 제거
      },
      hash: true,
      template: './src/index.html'
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 2000,
      files: ['./dist/*.html'], //해당 경로 내 html 파일이 자동으로 동기화 (이 부분이 없으면 html파일 변경사항은 자동 동기화 안됨)
      server: { baseDir: ['dist'] } // server의 Base 디렉토리를 dist로 지정
    })
  ]
};
