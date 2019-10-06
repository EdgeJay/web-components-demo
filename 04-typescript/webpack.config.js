const { createWebpackConfig } = require('../configs/webpack.base');

const base = createWebpackConfig({
  folder: __dirname,
  pageTitle: '04 - Typescript | Web Components Demo',
  htmlTemplate: '../04-typescript/templates/index.html',
  entryMain: 'index.ts',
});

module.exports = {
  ...base,
};
