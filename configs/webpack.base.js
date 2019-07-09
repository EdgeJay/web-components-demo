const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

function createWebpackConfig({ folder, pageTitle, entryJS = 'index.js' }) {
  return {
    target: 'web',
    entry: {
      main: path.resolve(folder, entryJS),
    },
    output: {
      path: path.resolve(folder, 'build'),
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
        title: pageTitle,
        template: path.resolve(__dirname, '../templates/index.html'),
        favicon: path.resolve(__dirname, '../templates/favicon.ico'),
      }),
    ],
    devServer: {
      port: 8080,
      hot: true,
    },
    devtool: 'source-map',
  };
}

module.exports = {
  createWebpackConfig,
};
