const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  entry: {
    main: path.resolve(__dirname, 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['last 2 versions'],
                  },
                  modules: false,
                },
              ],
            ],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: 3,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: '04 - Vanilla State Management | Web Components Demo',
      template: path.resolve(__dirname, 'index.html'),
      favicon: path.resolve(__dirname, 'favicon.ico'),
    }),
  ],
  devServer: {
    port: 3000,
    hot: true,
  },
  devtool: 'source-map',
};
