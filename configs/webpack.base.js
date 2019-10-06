const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

function getBabelOptions(isBabelLoader = true) {
  const options = {
    babelrc: false,
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 2 versions'],
          },
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
  };

  if (isBabelLoader) {
    options.cacheDirectory = true;
  }

  return options;
}

function createWebpackConfig({
  folder,
  pageTitle,
  htmlTemplate = '../templates/index.html',
  entryMain = 'index.js',
}) {
  return {
    target: 'web',
    entry: {
      polyfill: path.resolve(__dirname, '../templates/polyfill.js'),
      main: path.resolve(folder, entryMain),
    },
    output: {
      path: path.resolve(folder, 'build'),
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader',
          options: {
            useBabel: true,
            babelOptions: getBabelOptions(false),
            babelCore: '@babel/core',
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: getBabelOptions(),
          },
        },
      ],
    },
    plugins: [
      new HTMLWebpackPlugin({
        title: pageTitle,
        template: path.resolve(__dirname, htmlTemplate),
        favicon: path.resolve(__dirname, '../templates/favicon.ico'),
      }),
    ],
    devServer: {
      port: 8080,
      hot: true,
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.js'],
    },
  };
}

module.exports = {
  createWebpackConfig,
};
